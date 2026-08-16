import { useEffect, useState } from "react";

export default function Typewriter({
  text,
  speed = 35,
  delay = 800,
  onComplete,
}) {
  const [output, setOutput] = useState("");

  useEffect(() => {
    let index = 0;
    let interval;

    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        index++;

        setOutput(text.slice(0, index));

        if (index >= text.length) {
          clearInterval(interval);
          onComplete?.();
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, speed, delay, onComplete]);

  return (
    <p
      style={{
        whiteSpace: "pre-line",
        lineHeight: 1.8,
      }}
    >
      {output}
    </p>
  );
}