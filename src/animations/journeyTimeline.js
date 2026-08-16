import { gsap } from "gsap";
import { cameraTarget } from "../story/CameraController";

export function playJourneyTimeline(onComplete) {
  const tl = gsap.timeline();

  // Small pause
  tl.to({}, { duration: 0.3 })

    // Camera movement - cinematic approach
    .to(
      cameraTarget,
      {
        x: 8,
        y: 28,
        z: 80,
        duration: 3,
        ease: "power2.in",
      }
    )

    .to(
      cameraTarget,
      {
        x: 2,
        y: 22,
        z: 55,
        duration: 3,
        ease: "power2.out",
      }
    )

    .to(
      cameraTarget,
      {
        x: 0,
        y: 18,
        z: 35,
        duration: 2,
        ease: "power3.out",
      },
      "<"
    );

  // Callback
  tl.call(() => {
    onComplete?.();
  });

  return tl;
}