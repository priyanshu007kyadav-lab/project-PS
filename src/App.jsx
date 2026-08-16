import { Canvas } from "@react-three/fiber";
import HUD from "./components/ui/HUD";
import Universe from "./components/galaxy/Universe";
import CameraRig from "./components/camera/CameraRig";
import Lighting from "./components/effects/Lighting";
import PostProcessing from "./components/effects/PostProcessing";
import CameraDirector from "./components/camera/CameraDirector";
import StoryManager from "./story/StoryManager";
import BackgroundAudio from "./components/audio/BackgroundAudio";
import GalaxyPhotoModal from "./components/ui/GalaxyPhotoModal";
import WelcomeBirthdayModal from "./components/ui/WelcomeBirthdayModal";
import FinaleScene from "./components/final/FinaleScene";
import MobileGuard from "./components/ui/MobileGuard";

export default function App() {
  return (
    <>
      <Canvas
        camera={{
          position: [0, 0, 150],
          fov: 55,
        }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
        }}
      >
        <color attach="background" args={["#01030c"]} />

        <Lighting />

        <Universe />

        <CameraDirector />

        <CameraRig />

        <PostProcessing />
      </Canvas>

      <StoryManager />
      <HUD />
      <BackgroundAudio />
      <WelcomeBirthdayModal />
      <GalaxyPhotoModal />
      <FinaleScene />
      <MobileGuard />
    </>
  );
}