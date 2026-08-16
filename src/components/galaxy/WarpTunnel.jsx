import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const warpState = {
  speed: 0,
  opacity: 0,
  stretch: 1,
};

function createCircleTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");

  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
  gradient.addColorStop(0.4, "rgba(255, 255, 255, 0.85)");
  gradient.addColorStop(0.7, "rgba(255, 255, 255, 0.25)");
  gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);

  return new THREE.CanvasTexture(canvas);
}

export default function WarpTunnel() {
  const count = 3000;
  const meshRef = useRef();

  const circleTexture = useMemo(() => createCircleTexture(), []);

  const { positions, colors, velocities } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const vel = new Float32Array(count);

    const palette = [
      new THREE.Color("#ffffff"),
      new THREE.Color("#ffffff"),
      new THREE.Color("#00f0ff"),
      new THREE.Color("#aaddff"),
      new THREE.Color("#e0aaff"),
    ];

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const radius = 5 + Math.random() * 40;
      const angle = Math.random() * Math.PI * 2;

      pos[i3] = Math.cos(angle) * radius;
      pos[i3 + 1] = Math.sin(angle) * radius;
      pos[i3 + 2] = (Math.random() - 0.5) * 600;

      const color = palette[i % palette.length];
      col[i3] = color.r;
      col[i3 + 1] = color.g;
      col[i3 + 2] = color.b;

      vel[i] = 1.8 + Math.random() * 3.0;
    }

    return { positions: pos, colors: col, velocities: vel };
  }, []);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    const geo = meshRef.current.geometry;
    const posAttr = geo.attributes.position;
    const array = posAttr.array;

    if (warpState.opacity <= 0.01 && warpState.speed <= 0.01) {
      meshRef.current.visible = false;
      return;
    }

    meshRef.current.visible = true;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      array[i3 + 2] += delta * warpState.speed * 220 * velocities[i];

      // Wrap around when moving past camera
      if (array[i3 + 2] > 250) {
        array[i3 + 2] = -450;
      }
    }

    posAttr.needsUpdate = true;
    meshRef.current.material.opacity = warpState.opacity;
    meshRef.current.scale.z = warpState.stretch;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={count}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          array={colors}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        map={circleTexture}
        size={1.6}
        vertexColors
        transparent
        opacity={0}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}
