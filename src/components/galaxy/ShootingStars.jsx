import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function randomPosition() {
    return {
        x: THREE.MathUtils.randFloat(-120, 120),
        y: THREE.MathUtils.randFloat(30, 90),
        z: THREE.MathUtils.randFloat(-80, -20),
    };
}

export default function ShootingStars() {

    const starRef = useRef();

    const velocity = useRef(
        new THREE.Vector3(-1.2, -0.45, 0)
    );

    const nextSpawn = useRef(0);

    const start = useMemo(() => randomPosition(), []);

    useFrame((state) => {

        if (!starRef.current) return;

        const t = state.clock.getElapsedTime();

        // Wait until next spawn
        if (t < nextSpawn.current) {

            starRef.current.visible = false;
            return;

        }

        starRef.current.visible = true;

        starRef.current.position.x += velocity.current.x;
        starRef.current.position.y += velocity.current.y;

        // Respawn
        if (
            starRef.current.position.x < -160 ||
            starRef.current.position.y < -50
        ) {

            const p = randomPosition();

            starRef.current.position.set(
                p.x,
                p.y,
                p.z
            );

            nextSpawn.current =
                t + THREE.MathUtils.randFloat(8, 15);

        }

    });

    return (

        <mesh
            ref={starRef}
            position={[start.x, start.y, start.z]}
            rotation={[0, 0, -0.6]}
        >

            <sphereGeometry args={[0.18, 16, 16]} />

            <meshBasicMaterial
                color="#ffffff"
                toneMapped={false}
            />

        </mesh>

    );

}