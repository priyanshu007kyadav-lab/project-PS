import { gsap } from "gsap";

import { cameraTarget } from "../story/CameraController";
import { showMoon } from "../story/MoonController";

export function playMoonJourney(onComplete) {

    const tl = gsap.timeline();

    // Small pause after the quote
    tl.to({}, {
        duration: 0.5
    })

    // Reveal the moon
    .call(() => {
        showMoon();
    })

    // Camera flies toward the moon
    .to(cameraTarget, {

        x: 0,
        y: 18,
        z: 45,

        duration: 8,

        ease: "power2.inOut"

    })

    .call(() => {

        onComplete?.();

    });

    return tl;
}