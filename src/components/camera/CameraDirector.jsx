import { useFrame, useThree } from "@react-three/fiber";
import { cameraTarget, cameraLookAt, isAnimatingCamera, cameraShake } from "../../story/CameraController";

export default function CameraDirector() {
  const { camera, controls } = useThree();

  useFrame(() => {
    if (isAnimatingCamera.active) {
      // Disable mouse control during camera animations to prevent tunnel view distortion
      if (controls && controls.enabled) {
        controls.enabled = false;
      }

      // 1. Direct copy of GSAP's smooth easing vector (eliminates double-lerp lag & micro-stutter)
      camera.position.copy(cameraTarget);
      camera.lookAt(cameraLookAt);

      // 2. High-speed lightspeed camera shake effect when active
      if (cameraShake.intensity > 0.001) {
        const shakeX = (Math.random() - 0.5) * cameraShake.intensity;
        const shakeY = (Math.random() - 0.5) * cameraShake.intensity;
        camera.position.x += shakeX;
        camera.position.y += shakeY;
      }

      // 3. Keep OrbitControls target perfectly synchronized in real-time
      if (controls) {
        controls.target.copy(cameraLookAt);
        controls.update();
      }
    } else if (controls && !controls.enabled) {
      // Re-enable OrbitControls after animation completes for 3D exploration
      controls.enabled = true;
    }
  });

  return null;
}