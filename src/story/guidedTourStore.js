import { GALAXY_PHOTOS } from "./galaxyPhotosData";
import { selectGalaxyPhoto, closeGalaxyPhoto, getGalaxyPositionForIndex } from "./galaxyPhotoStore";
import { glideCameraTo } from "./CameraController";
import * as THREE from "three";

export const tourState = {
  phase: "IDLE", // "IDLE" | "WELCOME" | "TOUR" | "ZOOMING_TO_CORE" | "COMPLETED"
  currentIndex: 0,
};

const listeners = new Set();

export function subscribeTourStore(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function notify() {
  listeners.forEach((fn) => fn({ ...tourState }));
}

// Called when cinematic opening timeline completes
export function triggerWelcomeModal() {
  tourState.phase = "WELCOME";
  notify();
}

// Called when user clicks "Begin" on Welcome Modal
export function startGuidedTour() {
  tourState.phase = "TOUR";
  tourState.currentIndex = 0;
  notify();

  // Jump/Glide to Photo #1
  goToTourPhoto(0);
}

export function goToTourPhoto(index) {
  if (index < 0 || index >= GALAXY_PHOTOS.length) return;
  tourState.currentIndex = index;
  notify();

  const photo = GALAXY_PHOTOS[index];
  const galaxyPos = getGalaxyPositionForIndex(index);
  selectGalaxyPhoto(photo, galaxyPos);
}

export function nextTourPhoto() {
  if (tourState.currentIndex < GALAXY_PHOTOS.length - 1) {
    goToTourPhoto(tourState.currentIndex + 1);
  } else {
    // Finished last photo -> exit guided tour with cinematic galaxy core zoom
    exitGuidedTour();
  }
}

export function prevTourPhoto() {
  if (tourState.currentIndex > 0) {
    goToTourPhoto(tourState.currentIndex - 1);
  }
}

export function exitGuidedTour() {
  closeGalaxyPhoto();
  tourState.phase = "ZOOMING_TO_CORE";
  notify();

  // Smooth cinematic camera zoom into the main galaxy core
  glideCameraTo(
    new THREE.Vector3(0, 2, 10), // Deep inside galaxy core
    new THREE.Vector3(0, 0, 0),  // Looking directly at galactic core center
    2.8,                         // 2.8s smooth velvet glide duration
    () => {
      tourState.phase = "COMPLETED";
      notify();
    }
  );
}
