import * as THREE from "three";
import { glideCameraTo } from "./CameraController";
import { GALAXY_PHOTOS } from "./galaxyPhotosData";

let activePhoto = null;
const listeners = new Set();
const galaxyRefsMap = new Map();

export function registerGalaxyRef(index, groupRef) {
  galaxyRefsMap.set(index, groupRef);
}

export function getGalaxyPositionForIndex(index) {
  const ref = galaxyRefsMap.get(index);
  if (ref?.current) {
    const worldPos = new THREE.Vector3();
    ref.current.getWorldPosition(worldPos);
    return [worldPos.x, worldPos.y, worldPos.z];
  }
  return [0, 0, 0];
}

export function subscribePhotoStore(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getActivePhoto() {
  return activePhoto;
}

export function selectGalaxyPhoto(photo, galaxyPos) {
  // 1. Immediately hide/fade out active photo modal so ONLY 3D space camera movement is visible!
  activePhoto = null;
  listeners.forEach((fn) => fn(null));

  // 2. Real-time 3D world position of the target galaxy
  const galaxyWorldPos = new THREE.Vector3(...galaxyPos);

  // Line-of-sight unit vector from celestial center to galaxy
  const dirFromOrigin = galaxyWorldPos.clone().normalize();

  // Position camera 35 units directly in front of the target galaxy
  const targetCameraPos = galaxyWorldPos.clone().sub(dirFromOrigin.multiplyScalar(35));
  targetCameraPos.y += 3; // Subtle comfortable elevation

  // 3. Smooth, majestic 3.2s camera glide through 3D space between galaxies
  glideCameraTo(targetCameraPos, galaxyWorldPos, 3.2, () => {
    // 4. AFTER camera completes arrival at target galaxy, set new photo and fade in!
    activePhoto = { ...photo, position: galaxyPos };
    listeners.forEach((fn) => fn(activePhoto));
  });
}

export function closeGalaxyPhoto() {
  activePhoto = null;
  // Immediately close modal window
  listeners.forEach((fn) => fn(null));

  // Smoothly glide camera back home to universe overview position [0, 80, 200] looking at [0, 0, 0]
  glideCameraTo(new THREE.Vector3(0, 120, 380), new THREE.Vector3(0, 0, 0), 2.8);
}
