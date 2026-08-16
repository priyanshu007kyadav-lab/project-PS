import { gsap } from "gsap";

export function playQuoteSequence() {
    const tl = gsap.timeline();

    tl.fromTo(
        ".journey-btn",
        {
            opacity: 0,
            y: 25,
            scale: 0.92
        },
        {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "back.out(1.6)"
        }
    );

    return tl;
}