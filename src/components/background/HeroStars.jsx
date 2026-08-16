import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { getAudioData } from "../../story/audioStore";

function createHeroStarTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");

  // Center radial glow
  const radial = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  radial.addColorStop(0, "rgba(255, 255, 255, 1)");
  radial.addColorStop(0.2, "rgba(255, 255, 255, 0.8)");
  radial.addColorStop(0.5, "rgba(255, 255, 255, 0.2)");
  radial.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = radial;
  ctx.fillRect(0, 0, 128, 128);

  // Cross flare lines
  ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
  ctx.fillRect(0, 63, 128, 2);
  ctx.fillRect(63, 0, 2, 128);

  return new THREE.CanvasTexture(canvas);
}

export default function HeroStars() {
  const groupRef = useRef();
  const starTexture = useMemo(() => createHeroStarTexture(), []);

  // 25 Bright Hero Stars pushed far into deep space (distance 350 - 550)
  const heroStars = useMemo(() => {
    const palette = ["#ffffff", "#bde0fe", "#ffea00", "#d8b4fe", "#48cae4", "#ffd166"];
    const list = [];

    for (let i = 0; i < 25; i++) {
      const distance = 350 + Math.random() * 200;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      const x = distance * Math.sin(phi) * Math.cos(theta);
      const y = distance * Math.cos(phi);
      const z = distance * Math.sin(phi) * Math.sin(theta);

      list.push({
        position: [x, y, z],
        color: palette[i % palette.length],
        baseScale: 3.5 + Math.random() * 3.0,
        twinkleSpeed: 1.5 + Math.random() * 3.0,
        phase: Math.random() * Math.PI * 2,
        ref: { current: null },
      });
    }

    return list;
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const audio = getAudioData();

    heroStars.forEach((star, i) => {
      if (star.ref.current) {
        const pulse = Math.sin(t * star.twinkleSpeed + star.phase);
        // Combine twinkle pulse with real-time music bass & treble hits!
        const audioBoost = 1.0 + audio.bass * 0.75 + (i % 2 === 0 ? audio.treble * 0.4 : 0);
        const scale = star.baseScale * (0.85 + pulse * 0.25) * audioBoost;
        star.ref.current.scale.set(scale, scale, 1);
        star.ref.current.material.opacity = Math.min(1.0, (0.7 + pulse * 0.25) * (1.0 + audio.bass * 0.35));
      }
    });
  });

  return (
    <group ref={groupRef}>
      {heroStars.map((star, idx) => (
        <sprite key={idx} ref={star.ref} position={star.position} scale={[star.baseScale, star.baseScale, 1]}>
          <spriteMaterial
            map={starTexture}
            color={star.color}
            transparent
            opacity={0.85}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </sprite>
      ))}
    </group>
  );
}
