import { useStory } from "./StoryContext";
import { STORY } from "./StoryState";
import JourneyScene from "../components/journey/JourneyScene";
import IntroOverlay from "../components/intro/IntroOverlay";
import QuoteSequence from "../components/intro/QuoteSequence";
import LetterScene from "../components/letter/LetterScene";
import MemoriesScene from "../components/memories/MemoriesScene";
import FinaleScene from "../components/final/FinaleScene";

export default function StoryManager() {
    const { scene } = useStory();

    switch (scene) {
        case STORY.INTRO:
            return <IntroOverlay />;

        case STORY.STAR_CLICKED:
            return <IntroOverlay />;

        case STORY.UNIVERSE_BIRTH:
            return null;

        case STORY.QUOTE:
            return <QuoteSequence />;

        case STORY.BEGIN_JOURNEY:
            return <JourneyScene />;

        case STORY.LETTER:
            return <LetterScene />;

        case STORY.MEMORIES:
            return <MemoriesScene />;

        case STORY.FINALE:
            return <FinaleScene />;

        default:
            return null;
    }
}