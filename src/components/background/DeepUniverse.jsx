import CosmicClouds from "./CosmicClouds";
import BackgroundGalaxies from "./BackgroundGalaxies";
import StarClusters from "./StarClusters";
import DeepSpaceDust from "./DeepSpaceDust";
import HeroStars from "./HeroStars";

export default function DeepUniverse() {
  return (
    <group name="deep-universe-environment">
      <CosmicClouds />
      <BackgroundGalaxies />
      <StarClusters />
      <DeepSpaceDust />
      <HeroStars />
    </group>
  );
}
