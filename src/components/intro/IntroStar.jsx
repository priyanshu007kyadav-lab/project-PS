import { useState } from "react";
import { useStory } from "../../story/StoryContext";
import { STORY } from "../../story/StoryState";
import { playIntroTimeline } from "../../animations/introTimeline";

export default function IntroStar() {

    const [hover, setHover] = useState(false);

    const { setScene } = useStory();

    function handleClick() {
        playIntroTimeline(() => {
            setScene(STORY.BEGIN_JOURNEY);
        });
    }

    return (

        <div

            className={`intro-star ${hover ? " hover" : ""}`}

            onMouseEnter={() => setHover(true)}

            onMouseLeave={() => setHover(false)}

            onClick={handleClick}

        />

    );

}