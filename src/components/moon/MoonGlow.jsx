import * as THREE from "three";

export default function MoonGlow() {

    return (

        <mesh scale={1.08}>

            <sphereGeometry args={[8, 64, 64]} />

            <meshBasicMaterial
                color="#79b8ff"
                transparent
                opacity={0.22}
                blending={THREE.AdditiveBlending}
                side={THREE.BackSide}
            />

        </mesh>

    );

}