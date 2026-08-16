export default function MemoryPlanet({
  position,
}) {
  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial
          color="#88ccff"
          emissive="#4488ff"
          emissiveIntensity={2}
        />
      </mesh>
    </group>
  );
}