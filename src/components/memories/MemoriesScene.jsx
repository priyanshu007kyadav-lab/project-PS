import MemoryPlanet from "./MemoryPlanet";
import { memories } from "./MemoryData";

export default function MemoryScene() {
  return (
    <>
      {memories.map((memory, index) => (
        <MemoryPlanet
          key={memory.id}
          position={[0, index * 4, -index * 8]}
          title={memory.title}
          caption={memory.caption}
        />
      ))}
    </>
  );
}