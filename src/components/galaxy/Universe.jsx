import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import BackgroundStars from "./BackgroundStars";
import Galaxy from "./Galaxy";
import Nebula from "../nebula/Nebula";
import ShootingStars from "./ShootingStars";
import IntroStar3D from "../intro/IntroStar3D";
import WarpTunnel from "./WarpTunnel";
import DeepUniverse from "../background/DeepUniverse";

import { registerUniverse, registerCosmos } from "../../story/UniverseController";

export default function Universe() {
    const group = useRef();
    const cosmosGroup = useRef();

    useEffect(() => {
        if (!group.current) return;

        registerUniverse(group);
        if (cosmosGroup.current) {
            registerCosmos(cosmosGroup);
            cosmosGroup.current.visible = false;
        }

        group.current.visible = true;
        group.current.scale.set(1, 1, 1);
        group.current.rotation.y = -0.15;
    }, []);

    useFrame((state, delta) => {
        if (!group.current) return;

        // Gentle floating motion after reveal
        group.current.rotation.y += delta * 0.01;
        group.current.position.y = Math.sin(state.clock.elapsedTime * 0.25) * 0.4;
    });

    return (
        <group ref={group}>
            <IntroStar3D />
            <WarpTunnel />
            <group ref={cosmosGroup}>
                <BackgroundStars />
                <DeepUniverse />
                <Nebula />
                <Galaxy />
                <ShootingStars />
            </group>
        </group>
    );
}