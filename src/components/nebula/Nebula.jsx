import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import config from "./nebulaConfig";

function createCircleTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");

  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
  gradient.addColorStop(0.4, "rgba(255, 255, 255, 0.8)");
  gradient.addColorStop(0.7, "rgba(255, 255, 255, 0.2)");
  gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);

  return new THREE.CanvasTexture(canvas);
}

export default function Nebula() {
    const ref = useRef();
    const circleTexture = useMemo(() => createCircleTexture(), []);

    const positions = useMemo(() => {
        const array = new Float32Array(config.count * 3);

        for (let i = 0; i < config.count; i++) {
            const i3 = i * 3;
            const r = Math.random() * config.radius;
            const angle = Math.random() * Math.PI * 2;

            array[i3] = Math.cos(angle) * r;
            array[i3 + 1] = (Math.random() - 0.5) * config.height;
            array[i3 + 2] = Math.sin(angle) * r;
        }

        return array;
    }, []);

    useFrame((state) => {
        if (!ref.current) return;

        const time = state.clock.getElapsedTime();

        // Slow rotation
        ref.current.rotation.y += config.rotationSpeed;

        // Gentle drifting
        ref.current.position.x = Math.sin(time * 0.05) * 1.5;
        ref.current.position.y = Math.sin(time * 0.08) * 0.6;
        ref.current.rotation.z = Math.sin(time * 0.04) * 0.02;
    });

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    array={positions}
                    count={positions.length / 3}
                    itemSize={3}
                />
            </bufferGeometry>

            <pointsMaterial
                map={circleTexture}
                color={config.color}
                size={config.size}
                transparent
                opacity={config.opacity}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
                sizeAttenuation
            />
        </points>
    );
}