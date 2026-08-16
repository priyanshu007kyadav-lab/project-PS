import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import galaxyConfig from "./galaxyConfig";
import { generateGalaxy } from "./galaxyUtils";

function createCircleTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");

  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, "rgba(255, 255, 255, 0.75)");
  gradient.addColorStop(0.4, "rgba(255, 255, 255, 0.5)");
  gradient.addColorStop(0.7, "rgba(255, 255, 255, 0.12)");
  gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);

  return new THREE.CanvasTexture(canvas);
}

export default function Galaxy() {
  const galaxyRef = useRef();

  const circleTexture = useMemo(() => createCircleTexture(), []);

  const { positions, colors } = useMemo(() => {
    return generateGalaxy(galaxyConfig);
  }, []);

  useFrame((state, delta) => {
    if (!galaxyRef.current) return;

    const t = state.clock.elapsedTime;

    // Smooth frame-rate independent rotation
    galaxyRef.current.rotation.y += delta * 0.02;

    // Very subtle breathing
    const breathe = 1 + Math.sin(t * 0.55) * 0.012;

    galaxyRef.current.scale.setScalar(breathe);

    // Floating movement
    galaxyRef.current.position.y = Math.sin(t * 0.18) * 0.18;
    galaxyRef.current.position.x = Math.sin(t * 0.12) * 0.08;
    galaxyRef.current.rotation.z = Math.sin(t * 0.08) * 0.01;
  });

  return (
    <points ref={galaxyRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />

        <bufferAttribute
          attach="attributes-color"
          array={colors}
          count={colors.length / 3}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        map={circleTexture}
        size={galaxyConfig.size}
        vertexColors
        transparent
        opacity={0.65} // Reduced main galaxy points opacity (0.95 -> 0.65)
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}