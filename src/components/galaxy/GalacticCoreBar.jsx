import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function createBarGlowTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");

  const gradient = ctx.createRadialGradient(128, 64, 0, 128, 64, 128);
  gradient.addColorStop(0, "rgba(255, 245, 200, 0.65)");
  gradient.addColorStop(0.3, "rgba(255, 180, 100, 0.4)");
  gradient.addColorStop(0.65, "rgba(0, 229, 255, 0.15)");
  gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 256, 128);

  return new THREE.CanvasTexture(canvas);
}

export default function GalacticCoreBar() {
  const spriteRef = useRef();
  const lightRef = useRef();
  const texture = useMemo(() => createBarGlowTexture(), []);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    if (spriteRef.current) {
      spriteRef.current.rotation.z += delta * 0.02;

      const scaleX = 44 + Math.sin(t * 1.2) * 2.5;
      const scaleY = 18 + Math.cos(t * 1.2) * 1.5;
      spriteRef.current.scale.set(scaleX, scaleY, 1);
    }

    if (lightRef.current) {
      lightRef.current.intensity = 3.5 + Math.sin(t * 1.8) * 0.8;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Galactic Central Bar Sprite (Reduced brightness opacity 0.50) */}
      <sprite ref={spriteRef} scale={[44, 18, 1]}>
        <spriteMaterial
          map={texture}
          transparent
          opacity={0.50}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </sprite>

      {/* Warm Bar Point Light */}
      <pointLight ref={lightRef} color="#ffc107" intensity={3.5} distance={120} />
    </group>
  );
}
