import { useEffect, useState } from "react";
import { subscribeTourStore } from "../../story/guidedTourStore";
import { glideCameraTo } from "../../story/CameraController";
import * as THREE from "three";

const FULL_TEXT = `And... we've finally reached the end.

I hope this small gift managed to make you smile, even just once.
If it did, then it has already become the best gift I could've given.

I don't know what the future holds or where life will take us. But I'm genuinely grateful that our paths crossed, because knowing you has made my world a little brighter.

I hope you always have a reason to smile, always find happiness in the little things, and always become the person you dream of being.

Happy Birthday, Prerna. ❤️
May this year bring you everything your heart quietly wishes for.`;

export default function FinaleScene() {
  const [tour, setTour] = useState({ phase: "IDLE" });
  const [charCount, setCharCount] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    return subscribeTourStore((state) => {
      setTour(state);
      if (state.phase === "COMPLETED") {
        setDismissed(false);
        setCharCount(0);
        setIsDone(false);
      }
    });
  }, []);

  useEffect(() => {
    if (tour.phase !== "COMPLETED" || dismissed) return;

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

    timeoutId = setTimeout(typeNextChar, 450);

    return () => clearTimeout(timeoutId);
  }, [tour.phase, dismissed]);

  if (tour.phase !== "COMPLETED" || dismissed) return null;

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
      {/* Floating Ultra-Translucent Apple iOS Liquid Glass Finale Card */}
      <div
        style={{
          position: "relative",
          pointerEvents: "auto",
          maxWidth: "560px",
          width: "100%",
          background: "linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.03) 50%, rgba(255, 255, 255, 0.08) 100%)",
          backdropFilter: "blur(28px) saturate(200%)",
          WebkitBackdropFilter: "blur(28px) saturate(200%)",
          border: "1px solid rgba(255, 255, 255, 0.32)",
          borderTop: "1px solid rgba(255, 255, 255, 0.65)",
          boxShadow: `
            0 30px 80px -15px rgba(0, 0, 0, 0.85),
            0 0 45px rgba(255, 255, 255, 0.15),
            inset 0 1.5px 2px rgba(255, 255, 255, 0.75),
            inset 0 -1.5px 2px rgba(0, 0, 0, 0.25)
          `,
          borderRadius: "28px",
          padding: "36px 34px",
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

        {/* Authentic iOS Close Button Top Right (Full Circle Inside Card) */}
        <button
          style={{
            position: "absolute",
            top: "14px",
            right: "14px",
            zIndex: 10,
            background: "rgba(120, 120, 128, 0.36)",
            border: "1px solid rgba(255, 255, 255, 0.28)",
            color: "#ffffff",
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            fontSize: "13px",
            fontWeight: 600,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            boxShadow: "0 6px 18px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.6)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.35)";
            e.currentTarget.style.transform = "scale(1.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(120, 120, 128, 0.36)";
            e.currentTarget.style.transform = "scale(1)";
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = "scale(0.95)";
          }}
          onClick={() => {
            setDismissed(true);
            // Smooth cinematic zoom-out to full galaxy overview
            glideCameraTo(
              new THREE.Vector3(0, 120, 380),
              new THREE.Vector3(0, 0, 0),
              5.0
            );
          }}
          title="Close"
        >
          ✕
        </button>

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
            minHeight: "240px",
          }}
        >
          {currentText}
          {!isDone && <span className="typing-cursor">|</span>}
        </div>
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