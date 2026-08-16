import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function createCoreGlowTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");

  const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  gradient.addColorStop(0, "rgba(255, 255, 255, 0.7)");
  gradient.addColorStop(0.15, "rgba(255, 235, 180, 0.6)");
  gradient.addColorStop(0.4, "rgba(0, 229, 255, 0.35)");
  gradient.addColorStop(0.7, "rgba(157, 78, 221, 0.12)");
  gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 128, 128);

  return new THREE.CanvasTexture(canvas);
}

export default function GalacticCore() {
  const spriteRef = useRef();
  const lightRef = useRef();
  const texture = useMemo(() => createCoreGlowTexture(), []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (spriteRef.current) {
      const scale = 44 + Math.sin(t * 1.5) * 3.0;
      spriteRef.current.scale.set(scale, scale, 1);
    }

    if (lightRef.current) {
      lightRef.current.intensity = 4.5 + Math.sin(t * 2) * 1.0;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Galactic Core Soft Glow Sprite (Reduced brightness opacity 0.55) */}
      <sprite ref={spriteRef} scale={[44, 44, 1]}>
        <spriteMaterial
          map={texture}
          transparent
          opacity={0.55}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </sprite>

      {/* Gentle Center Point Light */}
      <pointLight ref={lightRef} color="#ffe5a0" intensity={4.5} distance={150} />
    </group>
  );
}
