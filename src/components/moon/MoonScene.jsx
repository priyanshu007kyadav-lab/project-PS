import { useEffect, useRef } from "react";
import { playJourneyTimeline } from "../../animations/journeyTimeline";

export default function MoonScene() {

    const timeline = useRef();

    useEffect(() => {

        timeline.current = playJourneyTimeline();

        return () => {

            timeline.current?.kill();

        };

    }, []);

    return null;
}