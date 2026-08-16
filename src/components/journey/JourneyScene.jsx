import { useEffect } from "react";
import { playJourneyTimeline } from "../../animations/journeyTimeline";
import { STORY } from "../../story/StoryState";
import { useStory } from "../../story/StoryContext";

export default function JourneyScene() {
  const { setScene } = useStory();

  useEffect(() => {
    // Start journey
    const timeline = playJourneyTimeline(() => {
      setScene(STORY.MEMORIES);
    });

    // Cleanup
    return () => {
      timeline?.kill();
    };
  }, [setScene]);

  return null;
}