import { gsap } from "gsap";
import { cameraTarget, cameraLookAt, isAnimatingCamera, cameraShake } from "../story/CameraController";
import { getUniverse, getCosmos, getIntroStar } from "../story/UniverseController";
import { warpState } from "../components/galaxy/WarpTunnel";
import { triggerWelcomeModal } from "../story/guidedTourStore";
import { playBackgroundAudio } from "../story/audioStore";

export function playCinematicOpeningTimeline(onComplete) {
  isAnimatingCamera.active = true;
  cameraTarget.set(0, 0, 150);
  cameraLookAt.set(0, 0, 0);

  const universe = getUniverse();
  const tl = gsap.timeline({
    defaults: {
      ease: "power2.inOut",
    },
  });

  // Ensure universe is visible
  if (universe?.current) {
    universe.current.visible = true;
  }

  // --- Two-Stage Cinematic Opening Sequence ---
  // Stage 1: Straight speed travel inside the tunnel (0s -> 3.2s) along [0, 0, 80]
  tl.to(cameraTarget, {
    x: 0,
    y: 0,
    z: 80,
    duration: 3.2,
    ease: "power1.in",
  }, 0)

  // Stage 2: As tunnel dissolves, elevate camera to original beautiful overview angle [0, 15, 60] (3.2s -> 6.0s)
  .to(cameraTarget, {
    x: 0,
    y: 15,
    z: 60,
    duration: 2.8,
    ease: "power2.out",
  }, 3.2)

  // Warp tunnel effects
  .to(
    warpState,
    {
      opacity: 0.95,
      speed: 2.2,
      stretch: 3.8,
      duration: 2.2,
      ease: "power2.in",
    },
    0
  )
  .to(
    cameraShake,
    {
      intensity: 0.5, // Subtle shake during tunnel acceleration
      duration: 1.8,
      ease: "power2.in",
    },
    0.3
  )
  .call(
    () => {
      const star = getIntroStar();
      if (star?.current) {
        star.current.visible = false;
      }
    },
    null,
    1.2
  )

  // --- 2. START BACKGROUND SONG WITH 2-SECOND DELAY ---
  .call(
    () => {
      playBackgroundAudio();
    },
    null,
    2.0
  )

  // 3. High-speed cruising through deep hyperspace tunnel
  .to(
    warpState,
    {
      speed: 2.8,
      stretch: 4.5,
      duration: 1.5,
    },
    2.2
  )
  .call(
    () => {
      const cosmos = getCosmos();
      if (cosmos?.current) {
        cosmos.current.visible = true;
      }
    },
    null,
    3.2
  )

  // --- 4. SPECIALLY ENHANCED TUNNEL EXIT SHAKE BURST ---
  .to(
    cameraShake,
    {
      intensity: 1.1, // Camera shake burst at tunnel exit threshold
      duration: 0.6,
      ease: "power3.in",
    },
    3.0
  )
  .to(
    cameraShake,
    {
      intensity: 0, // Smooth camera stabilization upon breaking out into cosmos
      duration: 1.8,
      ease: "power2.out",
    },
    3.6
  )
  .to(
    warpState,
    {
      opacity: 0,
      speed: 0,
      stretch: 1.0,
      duration: 2.2,
      ease: "power3.out",
    },
    3.6
  )

  .call(() => {
    // Reset tunnel state to avoid lingering visual offsets
    warpState.opacity = 0;
    warpState.speed = 0;
    warpState.stretch = 1;
  }, null, 6.0)
  .call(() => {
    isAnimatingCamera.active = false;
    triggerWelcomeModal(); // Triggers the bottom Explore button!
    onComplete?.();
  }, null, 6.0);

  return tl;
}
