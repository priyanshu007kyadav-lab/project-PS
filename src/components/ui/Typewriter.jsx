import { useEffect, useState } from "react";

export default function Typewriter({
    text,
    speed = 55,
    delay = 0,
    onComplete,
}) {

    const [displayText, setDisplayText] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {

        setDisplayText("");

        let index = 0;
        let interval;

        const timeout = setTimeout(() => {

            setIsTyping(true);

            interval = setInterval(() => {

                index++;

                setDisplayText(text.slice(0, index));

                if (index >= text.length) {

                    clearInterval(interval);
                    setIsTyping(false);
                    onComplete?.();

                }

            }, speed);

        }, delay);

        return () => {

            clearTimeout(timeout);

            if (interval) {
                clearInterval(interval);
            }

        };

    }, [text, speed, delay, onComplete]);

    return (

        <div className="typewriter">

            {displayText}

            {isTyping && (
                <span className="typing-caret">|</span>
            )}

        </div>

    );

}