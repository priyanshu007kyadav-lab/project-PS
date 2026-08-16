import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { getAudioData } from "../../story/audioStore";

function createSparkleDustTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");

  // Core radial glow
  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
  gradient.addColorStop(0.25, "rgba(255, 255, 255, 0.85)");
  gradient.addColorStop(0.6, "rgba(255, 255, 255, 0.3)");
  gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);

  return new THREE.CanvasTexture(canvas);
}

export default function DeepSpaceDust() {
  const pointsRef = useRef();
  const dustTexture = useMemo(() => createSparkleDustTexture(), []);

  // 25,000 Multi-colored Stardust Motes pushed out to deep background space alongside background stars (radius 250 - 450)
  const { positions, colors, initialY, phases } = useMemo(() => {
    const count = 25000; // Increased count to 25,000 for ultra-dense background stardust
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const yArr = new Float32Array(count);
    const phArr = new Float32Array(count);

    const palette = [
      new THREE.Color("#ffd166"), // Golden stardust
      new THREE.Color("#4cc9f0"), // Cosmic cyan
      new THREE.Color("#ffb703"), // Warm amber
      new THREE.Color("#e0aaff"), // Soft lavender
      new THREE.Color("#ffffff"), // Pure diamond white
    ];

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const radius = 250 + Math.random() * 200;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.cos(phi);
      const z = radius * Math.sin(phi) * Math.sin(theta);

      pos[i3] = x;
      pos[i3 + 1] = y;
      pos[i3 + 2] = z;

      yArr[i] = y;
      phArr[i] = Math.random() * Math.PI * 2;

      const c = palette[i % palette.length];
      col[i3] = c.r;
      col[i3 + 1] = c.g;
      col[i3 + 2] = c.b;
    }

    return { positions: pos, colors: col, initialY: yArr, phases: phArr };
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const t = state.clock.getElapsedTime();
    const audio = getAudioData();

    // Celestial background rotation matching background stars
    pointsRef.current.rotation.y += delta * (0.003 + audio.bass * 0.005);
    pointsRef.current.rotation.x = Math.sin(t * 0.1) * 0.01;

    // Gentle particle vertical drift animation
    const posAttr = pointsRef.current.geometry.attributes.position;
    for (let i = 0; i < initialY.length; i += 12) {
      const i3 = i * 3;
      posAttr.array[i3 + 1] = initialY[i] + Math.sin(t * 0.8 + phases[i]) * 4.0;
    }
    posAttr.needsUpdate = true;

    // Audio-reactive size and opacity pulsing
    if (pointsRef.current.material) {
      pointsRef.current.material.size = 0.55 * (1.0 + audio.treble * 0.5 + audio.bass * 0.3);
      pointsRef.current.material.opacity = Math.min(0.95, 0.7 + audio.overall * 0.25);
    }
  });

  return (
    <points ref={pointsRef}>
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
        map={dustTexture}
        size={0.55}
        vertexColors
        transparent
        opacity={0.75}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}
