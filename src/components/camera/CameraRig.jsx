import { OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { registerCamera } from "../../story/CameraController";

export default function CameraRig() {
  const { camera } = useThree();

  useEffect(() => {
    registerCamera(camera);
  }, [camera]);

  return (
    <OrbitControls
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