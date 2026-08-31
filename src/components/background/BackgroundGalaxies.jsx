import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { GALAXY_PHOTOS } from "../../story/galaxyPhotosData";
import { selectGalaxyPhoto, registerGalaxyRef } from "../../story/galaxyPhotoStore";

function createMiniGalaxyTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");

  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
  gradient.addColorStop(0.3, "rgba(255, 255, 255, 0.85)");
  gradient.addColorStop(0.65, "rgba(255, 255, 255, 0.25)");
  gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);

  return new THREE.CanvasTexture(canvas);
}

function generateMiniGalaxyData(count = 1000, colorHex, radiusScale = 4) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  const baseColor = new THREE.Color(colorHex);
  const coreColor = new THREE.Color("#ffffff");

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const r = Math.pow(Math.random(), 1.5) * radiusScale;
    const branches = 2 + (i % 2);
    const branchAngle = ((i % branches) / branches) * Math.PI * 2;
    const spinAngle = r * 1.5;

    const randomX = (Math.random() - 0.5) * 0.4 * r;
    const randomY = (Math.random() - 0.5) * 0.25 * r;
    const randomZ = (Math.random() - 0.5) * 0.4 * r;

    positions[i3] = Math.cos(branchAngle + spinAngle) * r + randomX;
    positions[i3 + 1] = randomY;
    positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * r + randomZ;

    const mix = coreColor.clone().lerp(baseColor, r / radiusScale);
    colors[i3] = mix.r;
    colors[i3 + 1] = mix.g;
    colors[i3 + 2] = mix.b;
  }

  return { positions, colors };
}

function InteractiveGalaxy({ photo, index, initialPosition, initialRotation, baseScale, colorHex }) {
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);
  const circleTexture = useMemo(() => createMiniGalaxyTexture(), []);
  const data = useMemo(() => generateMiniGalaxyData(900, colorHex, 4.5), [colorHex]);

  useEffect(() => {
    if (groupRef.current) {
      registerGalaxyRef(index, groupRef);
    }
  }, [index]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.02;

    // Hover scale animation
    const targetScale = hovered ? baseScale * 1.4 : baseScale;
    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
  });

  return (
    <group
      ref={groupRef}
      position={initialPosition}
      rotation={initialRotation}
      scale={[baseScale, baseScale, baseScale]}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
        document.body.style.cursor = "auto";
      }}
      onClick={(e) => {
        e.stopPropagation();
        if (groupRef.current) {
          const worldPos = new THREE.Vector3();
          groupRef.current.getWorldPosition(worldPos);
          selectGalaxyPhoto(photo, [worldPos.x, worldPos.y, worldPos.z]);
        }
      }}
    >
      {/* Invisible Raycast Click Target Sphere - generous hit area */}
      <mesh>
        <sphereGeometry args={[22, 16, 16]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* Galaxy Particle System */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={data.positions}
            count={data.positions.length / 3}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            array={data.colors}
            count={data.colors.length / 3}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          map={circleTexture}
          size={hovered ? 0.35 : 0.24}
          vertexColors
          transparent
          opacity={hovered ? 0.95 : 0.65}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>

      {/* Glow aura sprite when hovered */}
      {hovered && (
        <sprite scale={[12, 12, 1]}>
          <spriteMaterial
            map={circleTexture}
            color={colorHex}
            transparent
            opacity={0.4}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </sprite>
      )}
    </group>
  );
}

export default function BackgroundGalaxies() {
  const palette = [
    "#4cc9f0", "#7209b7", "#4361ee", "#ff9e00", "#e0aaff",
    "#ffffff", "#3a0ca3", "#48cae4", "#f72585", "#ffb703"
  ];

  // 17 Distant Galaxies distributed uniformly around 360° space using Fibonacci Golden Spiral spacing
  const galaxyList = useMemo(() => {
    const phiRatio = (1 + Math.sqrt(5)) / 2; // Golden Ratio

    return GALAXY_PHOTOS.map((photo, i) => {
      // Golden Spiral Fibonacci Sphere distribution for 17 points
      const y = 1 - (i / (GALAXY_PHOTOS.length - 1)) * 2; // Range from +1 to -1
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = (2 * Math.PI * i) / phiRatio;

      // Distance varies smoothly between 310 and 400 units out
      const distance = 310 + (i % 3) * 45;

      const x = Math.cos(theta) * radiusAtY * distance;
      const yPos = y * distance;
      const z = Math.sin(theta) * radiusAtY * distance;

      return {
        photo,
        index: i,
        position: [x, yPos, z],
        rotation: [Math.sin(i * 1.7) * Math.PI, Math.cos(i * 2.3) * Math.PI, Math.sin(i * 0.9) * Math.PI],
        scale: 1.1 + (i % 3) * 0.2,
        colorHex: palette[(i * 3 + 1) % palette.length],
      };
    });
  }, []);

  return (
    <group name="interactive-background-galaxies">
      {galaxyList.map((gal) => (
        <InteractiveGalaxy
          key={gal.photo.id}
          photo={gal.photo}
          index={gal.index}
          initialPosition={gal.position}
          initialRotation={gal.rotation}
          baseScale={gal.scale}
          colorHex={gal.colorHex}
        />
      ))}
    </group>
  );
}
