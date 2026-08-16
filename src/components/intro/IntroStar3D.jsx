import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { playCinematicOpeningTimeline } from "../../animations/cinematicOpeningTimeline";
import { useStory } from "../../story/StoryContext";
import { STORY } from "../../story/StoryState";
import { registerIntroStar } from "../../story/UniverseController";

let globalTriggerTunnel = null;
let autoTimerId = null;

export function triggerAutoStarTunnel(delayMs = 500) {
  if (autoTimerId) clearTimeout(autoTimerId);
  autoTimerId = setTimeout(() => {
    if (globalTriggerTunnel) {
      globalTriggerTunnel();
    }
  }, delayMs);
}

function createGlowTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");

  const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
  gradient.addColorStop(0.2, "rgba(180, 230, 255, 0.85)");
  gradient.addColorStop(0.5, "rgba(100, 180, 255, 0.4)");
  gradient.addColorStop(0.8, "rgba(60, 140, 255, 0.1)");
  gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 128, 128);

  return new THREE.CanvasTexture(canvas);
}

export default function IntroStar3D() {
  const groupRef = useRef();
  const coreRef = useRef();
  const auraRef = useRef();
  const lightRef = useRef();
  const [hovered, setHovered] = useState(false);
  const { setScene } = useStory();
  const [clicked, setClicked] = useState(false);
  const clickedRef = useRef(false);

  const glowTexture = useMemo(() => createGlowTexture(), []);

  useEffect(() => {
    if (groupRef.current) {
      registerIntroStar(groupRef);
    }
  }, []);

  const triggerTunnel = () => {
    if (clickedRef.current) return;
    clickedRef.current = true;
    setClicked(true);
    document.body.style.cursor = "auto";
    setScene(STORY.STAR_CLICKED);

    playCinematicOpeningTimeline(() => {
      setScene(STORY.MEMORIES);
    });
  };

  useEffect(() => {
    globalTriggerTunnel = triggerTunnel;
    return () => {
      globalTriggerTunnel = null;
    };
  }, []);

  useFrame((state, delta) => {
    if (!coreRef.current || clicked) return;

    const t = state.clock.getElapsedTime();

    // Pulse scale
    const pulse = 1 + Math.sin(t * 3) * 0.08 + (hovered ? 0.35 : 0);

    if (coreRef.current) {
      coreRef.current.scale.lerp(new THREE.Vector3(pulse, pulse, pulse), delta * 6);
    }

    if (auraRef.current) {
      const auraScale = (8 + pulse * 2.5) * (hovered ? 1.3 : 1.0);
      auraRef.current.scale.lerp(new THREE.Vector3(auraScale, auraScale, 1), delta * 6);
    }

    if (lightRef.current) {
      lightRef.current.intensity = THREE.MathUtils.lerp(
        lightRef.current.intensity,
        hovered ? 10 : 5,
        delta * 6
      );
    }
  });

  const handleClick = (e) => {
    if (e) e.stopPropagation();
    if (autoTimerId) clearTimeout(autoTimerId);
    triggerTunnel();
  };

  return (
    <group ref={groupRef} position={[0, 0, 0]} name="intro-star-3d">
      {/* Central Star Core */}
      <mesh
        ref={coreRef}
        onPointerOver={() => {
          document.body.style.cursor = "pointer";
          setHovered(true);
        }}
        onPointerOut={() => {
          document.body.style.cursor = "auto";
          setHovered(false);
        }}
        onClick={handleClick}
      >
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* Soft Billboard Glow Sprite (No Hard Ball Outline) */}
      <sprite ref={auraRef} scale={[10, 10, 1]}>
        <spriteMaterial
          map={glowTexture}
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </sprite>

      {/* Core Point Light */}
      <pointLight ref={lightRef} color="#70ccff" intensity={5} distance={60} />
    </group>
  );
}
