import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function createDiamondFlareTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");

  // Center radial core
  const radial = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  radial.addColorStop(0, "rgba(255, 255, 255, 1)");
  radial.addColorStop(0.2, "rgba(200, 240, 255, 0.8)");
  radial.addColorStop(0.5, "rgba(100, 180, 255, 0.2)");
  radial.addColorStop(1, "rgba(0, 0, 0, 0)");

  ctx.fillStyle = radial;
  ctx.fillRect(0, 0, 128, 128);

  // Horizontal flare beam
  const horiz = ctx.createLinearGradient(0, 64, 128, 64);
  horiz.addColorStop(0, "rgba(255, 255, 255, 0)");
  horiz.addColorStop(0.5, "rgba(255, 255, 255, 0.9)");
  horiz.addColorStop(1, "rgba(255, 255, 255, 0)");
  ctx.fillStyle = horiz;
  ctx.fillRect(0, 62, 128, 4);

  // Vertical flare beam
  const vert = ctx.createLinearGradient(64, 0, 64, 128);
  vert.addColorStop(0, "rgba(255, 255, 255, 0)");
  vert.addColorStop(0.5, "rgba(255, 255, 255, 0.9)");
  vert.addColorStop(1, "rgba(255, 255, 255, 0)");
  ctx.fillStyle = vert;
  ctx.fillRect(62, 0, 4, 128);

  return new THREE.CanvasTexture(canvas);
}

export default function GalaxyBrightStar() {
  const spriteRef = useRef();
  const flareTexture = useMemo(() => createDiamondFlareTexture(), []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (spriteRef.current) {
      const pulse = 6 + Math.sin(t * 2) * 0.4;
      spriteRef.current.scale.set(pulse, pulse, 1);
    }
  });

  return (
    <group position={[16, 2, 2]}>
      {/* 4-Point Diamond Cross Flare Star */}
      <sprite ref={spriteRef} scale={[6, 6, 1]}>
        <spriteMaterial
          map={flareTexture}
          transparent
          opacity={0.95}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </sprite>

      {/* Point Light for Local Illumination */}
      <pointLight color="#ffffff" intensity={4} distance={30} />
    </group>
  );
}
