import { useEffect, useState } from "react";
import { subscribeAudioStore, toggleAudioMute } from "../../story/audioStore";

export default function BackgroundAudio() {
  const [audioState, setAudioState] = useState({ isMuted: false, isPlaying: false });

  useEffect(() => {
    return subscribeAudioStore((state) => {
      setAudioState(state);
    });
  }, []);

  if (!audioState.isPlaying) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "24px",
        right: "24px",
        zIndex: 9999,
        pointerEvents: "auto",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
      }}
    >
      {/* Floating Apple iOS Liquid Glass Mute Toggle Button */}
      <button
        onClick={toggleAudioMute}
        style={{
          width: "44px",
          height: "44px",
          borderRadius: "50%",
          background: "linear-gradient(180deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.05) 100%)",
          backdropFilter: "blur(24px) saturate(190%)",
          WebkitBackdropFilter: "blur(24px) saturate(190%)",
          border: "1px solid rgba(255, 255, 255, 0.32)",
          borderTop: "1px solid rgba(255, 255, 255, 0.65)",
          boxShadow: `
            0 12px 30px rgba(0, 0, 0, 0.5),
            inset 0 1.5px 2px rgba(255, 255, 255, 0.8),
            inset 0 -1.5px 2px rgba(0, 0, 0, 0.2)
          `,
          color: "#ffffff",
          fontSize: "1.1rem",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.22s cubic-bezier(0.16, 1, 0.3, 1)",
          animation: "floatMuteBtnIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "linear-gradient(180deg, rgba(255, 255, 255, 0.32) 0%, rgba(255, 255, 255, 0.12) 100%)";
          e.currentTarget.style.transform = "scale(1.08)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "linear-gradient(180deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.05) 100%)";
          e.currentTarget.style.transform = "scale(1)";
        }}
        onMouseDown={(e) => {
          e.currentTarget.style.transform = "scale(0.94)";
        }}
        title={audioState.isMuted ? "Unmute Music" : "Mute Music"}
      >
        {audioState.isMuted ? "🔇" : "🎵"}
      </button>

      <style>{`
        @keyframes floatMuteBtnIn {
          0% {
            opacity: 0;
            transform: scale(0.8) translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  );
}