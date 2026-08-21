import { OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { registerCamera } from "../../story/CameraController";

// Shared ref so CameraDirector can directly lock/unlock OrbitControls
export let orbitControlsRef = { current: null };

export default function CameraRig() {
  const { camera } = useThree();
  const controlsRef = useRef();

  useEffect(() => {
    registerCamera(camera);
  }, [camera]);

  useEffect(() => {
    // Share the OrbitControls instance globally for CameraDirector to access
    orbitControlsRef.current = controlsRef.current;
    return () => {
      orbitControlsRef.current = null;
    };
  }, []);

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      enablePan={true}
      enableZoom={true}
      enableRotate={true}
      enableDamping={true}
      dampingFactor={0.05}
      minDistance={5}
      maxDistance={500}
      rotateSpeed={0.8}
      zoomSpeed={1.2}
    />
  );
}