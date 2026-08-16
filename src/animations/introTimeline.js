import { gsap } from "gsap";
import { getUniverse } from "../story/UniverseController";
import { cameraTarget } from "../story/CameraController";

export function playIntroTimeline(onComplete) {

    const universe = getUniverse();

    const tl = gsap.timeline({
        defaults: {
            ease: "power2.out"
        }
    });

    // Star expands
    tl.to(".intro-star", {
        scale: 8,
        opacity: 0,
        duration: 1.2,
        ease: "power3.inOut"
    })

    // White flash
    .to(".white-flash", {
        opacity: 1,
        duration: 0.18
    }, "-=0.35")

    // Reveal universe while flash is active
    .call(() => {

        if (universe?.current) {
            universe.current.visible = true;
        }

    })

    // Camera fly
    .fromTo(
        cameraTarget,
        {
            x: 0,
            y: 54,
            z: 185
        },
        {
            x: 0,
            y: 50,
            z: 140,
            duration: 4,
            ease: "power2.inOut"
        },
        "<"
    )

    // Universe grows
    .fromTo(
        universe.current.scale,
        {
            x: 0.75,
            y: 0.75,
            z: 0.75
        },
        {
            x: 1,
            y: 1,
            z: 1,
            duration: 2.5,
            ease: "power3.out"
        },
        "<"
    )

    // Flash fades revealing universe
    .to(".white-flash", {
        opacity: 0,
        duration: 0.8
    }, "<")

    // Background color
    .to("body", {
        backgroundColor: "#020613",
        duration: 1
    }, "<")

    // Small pause before quote
    .to({}, {
        duration: 0.4
    })

    // Show quote
    .call(() => {
        onComplete?.();
    });

    return tl;
}