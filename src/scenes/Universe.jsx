import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";

import BackgroundStars from "./BackgroundStars";
import Galaxy from "./Galaxy";
import Nebula from "../nebula/Nebula";
import ShootingStars from "./ShootingStars";

import { registerUniverse } from "../../story/UniverseController";

export default function Universe() {

    const group = useRef();

    useEffect(() => {
        if (!group.current) return;

        registerUniverse(group);

        group.current.visible = false;
        group.current.scale.set(0.75, 0.75, 0.75);

    }, []);

    useFrame(() => {
        if (!group.current) return;
    });

    return (
        <group ref={group}>
            <BackgroundStars />
            <Nebula />
            <Galaxy />
            <ShootingStars />
        </group>
    );
}