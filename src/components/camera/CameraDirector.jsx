import { useFrame, useThree } from "@react-three/fiber";
import { cameraTarget, cameraLookAt, isAnimatingCamera, cameraShake } from "../../story/CameraController";
import { orbitControlsRef } from "./CameraRig";

export default function CameraDirector() {
  const { camera } = useThree();

  useFrame(() => {
    const controls = orbitControlsRef.current;

    if (isAnimatingCamera.active) {
      // Reliably disable OrbitControls during tunnel/camera animations
      if (controls && controls.enabled) {
        controls.enabled = false;
      }

      // Drive camera position directly from GSAP-animated cameraTarget
      camera.position.copy(cameraTarget);
      camera.lookAt(cameraLookAt);

      // Camera shake effect during warp
      if (cameraShake.intensity > 0.001) {
        const shakeX = (Math.random() - 0.5) * cameraShake.intensity;
        const shakeY = (Math.random() - 0.5) * cameraShake.intensity;
        camera.position.x += shakeX;
        camera.position.y += shakeY;
      }

      // Keep OrbitControls target in sync so it doesn't snap on re-enable
      if (controls) {
        controls.target.copy(cameraLookAt);
      }
    } else {
      // Animation finished – ensure clean state
      if (cameraShake.intensity !== 0) {
        cameraShake.intensity = 0;
      }
      // Re‑enable OrbitControls after a tiny defer to let GSAP finish
      if (controls && !controls.enabled) {
        // Align OrbitControls internal state with the final camera pose
        controls.object.position.copy(camera.position);
        controls.target.copy(cameraLookAt);
        controls.enabled = true;
        controls.update();
      }
    }
  });

  return null;
}