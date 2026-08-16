import { useEffect, useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

import moonColor from "../../assets/textures/moon/moon_color.jpg";
import moonNormal from "../../assets/textures/moon/moon_normal.jpg";
import MoonParticles from "./MoonParticles";
import MoonGlow from "./MoonGlow";
import { registerMoon } from "../../story/MoonController";

export default function Moon() {

    const moonRef = useRef();

    const colorMap = useLoader(TextureLoader, moonColor);
    const normalMap = useLoader(TextureLoader, moonNormal);

    useEffect(() => {

        if (!moonRef.current) return;

        registerMoon(moonRef);

        moonRef.current.visible = true;

    }, []);

    useFrame((state, delta) => {

        if (!moonRef.current) return;

        moonRef.current.rotation.y += delta * 0.015;

    });

    return (

        <group
            ref={moonRef}
            position={[0, 18, -220]}
        >

            <mesh>

                <sphereGeometry args={[8, 128, 128]} />

                <meshStandardMaterial
                    map={colorMap}
                    normalMap={normalMap}
                    roughness={0.95}
                    metalness={0}
                />

            </mesh>

            <MoonGlow />

            <MoonParticles />

        </group>

    );

}