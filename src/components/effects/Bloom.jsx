import { Bloom, EffectComposer } from "@react-three/postprocessing";

export default function PostProcessing() {
  return (
    <EffectComposer>

      <Bloom
        mipmapBlur
        intensity={2.5}
        luminanceThreshold={0.08}
        luminanceSmoothing={0.9}
      />

    </EffectComposer>
  );
}