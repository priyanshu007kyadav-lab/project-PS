import { useEffect, useState } from "react";
import LetterCard from "./LetterCard";
import { fadeVolume } from "../../audio/AudioManager";

export default function LetterScene() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      fadeVolume("ambience", 0.18, 2);
      setVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return <LetterCard />;
}