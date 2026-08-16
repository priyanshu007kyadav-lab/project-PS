import { useEffect, useState } from "react";
import { subscribeTourStore, startGuidedTour } from "../../story/guidedTourStore";

const FULL_TEXT = `God created a universe filled with billions of stars and countless galaxies.
Maybe every galaxy has its own Prerna.

But out of all those universes, the most special one was born here, on Earth.
And today, this little universe is celebrating her.

Happy Birthday, Prerna. ❤️`;

export default function WelcomeBirthdayModal() {
  const [tour, setTour] = useState({ phase: "IDLE" });
  const [charCount, setCharCount] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    return subscribeTourStore((state) => {
      setTour(state);
    });
  }, []);

  useEffect(() => {
    if (tour.phase !== "WELCOME") return;

    let idx = 0;
    let timeoutId = null;

    const typeNextChar = () => {
      if (idx < FULL_TEXT.length) {
        idx++;
        setCharCount(idx);

        const char = FULL_TEXT[idx - 1];
        let delay = 68; // Slower, thoughtful typing speed

        if (char === "." || char === "!" || char === "❤️") {
          delay = 420; // Emotional pause at sentence ends
        } else if (char === ",") {
          delay = 240; // Soft pause at commas
        } else if (char === "\n") {
          delay = 350; // Pause at line breaks
        }

        timeoutId = setTimeout(typeNextChar, delay);
      } else {
        setIsDone(true);
      }
    };

    timeoutId = setTimeout(typeNextChar, 350);

    return () => clearTimeout(timeoutId);
  }, [tour.phase]);

  if (tour.phase !== "WELCOME") return null;

  const currentText = FULL_TEXT.slice(0, charCount);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
        padding: "20px",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', sans-serif",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      {/* Floating Ultra-Translucent Apple iOS Liquid Glass Birthday Card */}
      <div
        style={{
          position: "relative",
          pointerEvents: "auto",
          maxWidth: "540px",
          width: "100%",
          background: "linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.03) 50%, rgba(255, 255, 255, 0.08) 100%)",
          backdropFilter: "blur(28px) saturate(200%)",
          WebkitBackdropFilter: "blur(28px) saturate(200%)",
          border: "1px solid rgba(255, 255, 255, 0.32)",
          borderTop: "1px solid rgba(255, 255, 255, 0.65)",
          boxShadow: `
            0 30px 80px -15px rgba(0, 0, 0, 0.8),
            0 0 45px rgba(255, 255, 255, 0.15),
            inset 0 1.5px 2px rgba(255, 255, 255, 0.75),
            inset 0 -1.5px 2px rgba(0, 0, 0, 0.25)
          `,
          borderRadius: "28px",
          padding: "34px 34px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: "22px",
          animation: "floatLiquidGlassIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
          overflow: "hidden",
        }}
      >
        {/* Top Specular Liquid Gloss Highlight */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "40%",
            background: "radial-gradient(ellipse at 50% 0%, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0) 75%)",
            pointerEvents: "none",
            borderRadius: "28px 28px 0 0",
          }}
        />

        {/* Live Typing Message Display */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            width: "100%",
            color: "rgba(255, 255, 255, 0.95)",
            fontSize: "1.03rem",
            lineHeight: 1.65,
            fontWeight: 400,
            letterSpacing: "-0.01em",
            whiteSpace: "pre-wrap",
            textAlign: "center",
            minHeight: "190px",
          }}
        >
          {currentText}
          {!isDone && <span className="typing-cursor">|</span>}
        </div>

        {/* Pure Liquid Glass Begin Journey / Skip Button */}
        <button
          style={{
            position: "relative",
            zIndex: 2,
            marginTop: "6px",
            background: "linear-gradient(180deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.08) 100%)",
            border: "1px solid rgba(255, 255, 255, 0.45)",
            color: "#ffffff",
            padding: "13px 44px",
            borderRadius: "9999px",
            fontWeight: 600,
            fontSize: "1.04rem",
            cursor: "pointer",
            letterSpacing: "-0.015em",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            boxShadow: "0 8px 25px rgba(0, 0, 0, 0.4), inset 0 1.5px 2px rgba(255, 255, 255, 0.85)",
            transition: "all 0.22s cubic-bezier(0.16, 1, 0.3, 1)",
            opacity: isDone ? 1 : 0.65,
            fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "linear-gradient(180deg, rgba(255, 255, 255, 0.38) 0%, rgba(255, 255, 255, 0.16) 100%)";
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "linear-gradient(180deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.08) 100%)";
            e.currentTarget.style.transform = "scale(1)";
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = "scale(0.96)";
          }}
          onClick={() => {
            if (!isDone) {
              setCharCount(FULL_TEXT.length);
              setIsDone(true);
            } else {
              startGuidedTour();
            }
          }}
        >
          {isDone ? "✨ Begin the Journey ✨" : "Skip ⏩"}
        </button>
      </div>

      <style>{`
        @keyframes floatLiquidGlassIn {
          0% {
            opacity: 0;
            transform: scale(0.92) translateY(20px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .typing-cursor {
          display: inline-block;
          margin-left: 2px;
          color: #74d7ff;
          font-weight: bold;
          animation: blinkCursor 0.8s infinite;
        }
        @keyframes blinkCursor {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
