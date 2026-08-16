import * as THREE from "three";
import { gsap } from "gsap";

let camera = null;

export const cameraTarget = new THREE.Vector3(0, 0, 150);
export const cameraLookAt = new THREE.Vector3(0, 0, 0);
export const isAnimatingCamera = { active: false };
export const cameraShake = { intensity: 0 };

export function registerCamera(cam) {
    camera = cam;
}

export function getCamera() {
    return camera;
}

export function glideCameraTo(targetPos, lookAtPos = new THREE.Vector3(0, 0, 0), duration = 3.2, onComplete) {
    isAnimatingCamera.active = true;

    // Use sine.inOut for velvet-smooth fluid camera acceleration & deceleration
    gsap.timeline()
        .to(cameraTarget, {
            x: targetPos.x,
            y: targetPos.y,
            z: targetPos.z,
            duration: duration,
            ease: "sine.inOut",
        }, 0)
        .to(cameraLookAt, {
            x: lookAtPos.x,
            y: lookAtPos.y,
            z: lookAtPos.z,
            duration: duration,
            ease: "sine.inOut",
        }, 0)
        .call(() => {
            isAnimatingCamera.active = false;
            onComplete?.();
        });
}