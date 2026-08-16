export default function Lighting() {
  return (
    <>
      <ambientLight intensity={0.12} />

      <directionalLight
        position={[15, 15, 10]}
        intensity={0.8}
        color="#ffffff"
      />

      <pointLight
        position={[0, 0, 0]}
        intensity={10}
        color="#6ec8ff"
        distance={40}
      />
    </>
  );
}