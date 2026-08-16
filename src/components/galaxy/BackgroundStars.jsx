import { Points, PointMaterial } from "@react-three/drei";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function createCircleTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");

  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
  gradient.addColorStop(0.35, "rgba(255, 255, 255, 0.9)");
  gradient.addColorStop(0.7, "rgba(255, 255, 255, 0.3)");
  gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);

  return new THREE.CanvasTexture(canvas);
}

export default function BackgroundStars() {
  const starsRef = useRef();
  const circleTexture = useMemo(() => createCircleTexture(), []);

  const positions = useMemo(() => {
    const count = 60000; // Increased star count to 60,000 for ultra-dense starlight field
    const stars = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const radius = 250 + Math.random() * 150;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      stars[i3] = radius * Math.sin(phi) * Math.cos(theta);
      stars[i3 + 1] = radius * Math.cos(phi);
      stars[i3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
    }

    return stars;
  }, []);

  useFrame((state) => {
    if (!starsRef.current) return;

    const t = state.clock.getElapsedTime();

    // Very slow celestial rotation
    starsRef.current.rotation.y = t * 0.003;

    // Tiny breathing motion
    const scale = 1 + Math.sin(t * 0.15) * 0.003;
    starsRef.current.scale.setScalar(scale);

    // Brighter global twinkle
    starsRef.current.material.opacity = 0.75 + Math.sin(t * 0.35) * 0.15;
  });

  return (
    <Points
      ref={starsRef}
      positions={positions}
      stride={3}
      frustumCulled={false}
    >
      <PointMaterial
        map={circleTexture}
        color="#ffffff"
        size={0.28}
        transparent
        opacity={0.85}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </Points>
  );
}