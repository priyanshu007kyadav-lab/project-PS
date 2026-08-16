import { useEffect, useState } from "react";
import { subscribePhotoStore } from "../../story/galaxyPhotoStore";
import {
  subscribeTourStore,
  nextTourPhoto,
  prevTourPhoto,
  exitGuidedTour,
  tourState,
} from "../../story/guidedTourStore";
import { GALAXY_PHOTOS } from "../../story/galaxyPhotosData";

export default function GalaxyPhotoModal() {
  const [photo, setPhoto] = useState(null);
  const [tour, setTour] = useState({ phase: tourState.phase, currentIndex: tourState.currentIndex });

  useEffect(() => {
    const unsubPhoto = subscribePhotoStore((activePhoto) => {
      setPhoto(activePhoto);
    });
    const unsubTour = subscribeTourStore((state) => {
      setTour(state);
    });
    return () => {
      unsubPhoto();
      unsubTour();
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!photo) return;
      if (e.key === "Escape") {
        exitGuidedTour();
      } else if (e.key === "ArrowRight") {
        nextTourPhoto();
      } else if (e.key === "ArrowLeft") {
        prevTourPhoto();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [photo]);

  if (!photo) return null;

  const isFirst = tour.currentIndex === 0;
  const progressPercent = ((tour.currentIndex + 1) / GALAXY_PHOTOS.length) * 100;

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
      {/* Floating Ultra-Translucent Apple iOS Liquid Glass Frame */}
      <div
        style={{
          position: "relative",
          pointerEvents: "auto",
          maxWidth: "85vw",
          maxHeight: "85vh",
          width: "auto",
          background: "linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 40%, rgba(255, 255, 255, 0.05) 100%)",
          backdropFilter: "blur(24px) saturate(190%)",
          WebkitBackdropFilter: "blur(24px) saturate(190%)",
          border: "1px solid rgba(255, 255, 255, 0.28)",
          borderTop: "1px solid rgba(255, 255, 255, 0.55)",
          boxShadow: `
            0 30px 80px -15px rgba(0, 0, 0, 0.7),
            inset 0 1.5px 2px rgba(255, 255, 255, 0.65),
            inset 0 -1.5px 2px rgba(0, 0, 0, 0.25)
          `,
          borderRadius: "28px",
          padding: "14px 14px 18px 14px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "14px",
          animation: "floatLiquidGlassIn 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards",
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
            height: "38%",
            background: "radial-gradient(ellipse at 50% 0%, rgba(255, 255, 255, 0.28) 0%, rgba(255, 255, 255, 0) 75%)",
            pointerEvents: "none",
            borderRadius: "28px 28px 0 0",
          }}
        />

        {/* Authentic iOS Close Button Top Right (Full Circle Inside Card) */}
        <button
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
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
          onClick={exitGuidedTour}
          title="Exit tour / Close"
        >
          ✕
        </button>

        {/* High-res Image */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: "76vw",
            maxHeight: "68vh",
            borderRadius: "20px",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
            border: "1px solid rgba(255, 255, 255, 0.18)",
          }}
        >
          <img
            src={photo.src}
            alt="Galaxy Memory"
            style={{
              maxWidth: "76vw",
              maxHeight: "68vh",
              objectFit: "contain",
              display: "block",
              borderRadius: "20px",
            }}
          />
        </div>

        {/* Pure Liquid Glass Navigation Toolbar */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            padding: "4px 8px 0 8px",
            gap: "14px",
          }}
        >
          {/* Pure Liquid Glass Prev Button */}
          <button
            disabled={isFirst}
            style={{
              background: isFirst
                ? "rgba(255, 255, 255, 0.03)"
                : "linear-gradient(180deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.06) 100%)",
              border: isFirst ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(255, 255, 255, 0.35)",
              color: isFirst ? "rgba(255, 255, 255, 0.25)" : "#ffffff",
              padding: "9px 22px",
              borderRadius: "9999px",
              fontSize: "0.92rem",
              fontWeight: 600,
              letterSpacing: "-0.01em",
              cursor: isFirst ? "not-allowed" : "pointer",
              transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
              backdropFilter: "blur(16px)",
              boxShadow: isFirst ? "none" : "0 6px 20px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.65)",
              fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
            }}
            onMouseEnter={(e) => {
              if (!isFirst) {
                e.currentTarget.style.background = "linear-gradient(180deg, rgba(255, 255, 255, 0.32) 0%, rgba(255, 255, 255, 0.12) 100%)";
                e.currentTarget.style.transform = "scale(1.03)";
              }
            }}
            onMouseLeave={(e) => {
              if (!isFirst) {
                e.currentTarget.style.background = "linear-gradient(180deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.06) 100%)";
                e.currentTarget.style.transform = "scale(1)";
              }
            }}
            onMouseDown={(e) => {
              if (!isFirst) {
                e.currentTarget.style.transform = "scale(0.96)";
              }
            }}
            onClick={prevTourPhoto}
          >
            ← Prev
          </button>

          {/* Authentic iOS Liquid Glass Progress Bar Pill */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              background: "linear-gradient(180deg, rgba(0, 0, 0, 0.35) 0%, rgba(255, 255, 255, 0.06) 100%)",
              padding: "9px 18px",
              borderRadius: "9999px",
              border: "1px solid rgba(255, 255, 255, 0.22)",
              boxShadow: "inset 0 1px 1px rgba(255, 255, 255, 0.35), 0 4px 15px rgba(0, 0, 0, 0.25)",
              backdropFilter: "blur(12px)",
            }}
          >
            {/* Track */}
            <div
              style={{
                width: "120px",
                height: "6px",
                borderRadius: "9999px",
                background: "rgba(255, 255, 255, 0.16)",
                overflow: "hidden",
                position: "relative",
                boxShadow: "inset 0 1px 2px rgba(0, 0, 0, 0.4)",
              }}
            >
              {/* Fill */}
              <div
                style={{
                  width: `${progressPercent}%`,
                  height: "100%",
                  borderRadius: "9999px",
                  background: "linear-gradient(90deg, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 0.98) 100%)",
                  boxShadow: "0 0 10px rgba(255, 255, 255, 0.7)",
                  transition: "width 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              />
            </div>
          </div>

          {/* Pure Liquid Glass Next Button */}
          <button
            style={{
              background: "linear-gradient(180deg, rgba(255, 255, 255, 0.24) 0%, rgba(255, 255, 255, 0.08) 100%)",
              border: "1px solid rgba(255, 255, 255, 0.45)",
              borderTop: "1px solid rgba(255, 255, 255, 0.7)",
              color: "#ffffff",
              padding: "9px 24px",
              borderRadius: "9999px",
              fontSize: "0.92rem",
              fontWeight: 600,
              letterSpacing: "-0.01em",
              cursor: "pointer",
              transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              boxShadow: "0 6px 22px rgba(0, 0, 0, 0.35), inset 0 1.5px 2px rgba(255, 255, 255, 0.85)",
              fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "linear-gradient(180deg, rgba(255, 255, 255, 0.38) 0%, rgba(255, 255, 255, 0.16) 100%)";
              e.currentTarget.style.transform = "scale(1.04)";
              e.currentTarget.style.boxShadow = "0 10px 28px rgba(0, 0, 0, 0.5), inset 0 1.5px 2px rgba(255, 255, 255, 0.95)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "linear-gradient(180deg, rgba(255, 255, 255, 0.24) 0%, rgba(255, 255, 255, 0.08) 100%)";
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 6px 22px rgba(0, 0, 0, 0.35), inset 0 1.5px 2px rgba(255, 255, 255, 0.85)";
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = "scale(0.96)";
            }}
            onClick={nextTourPhoto}
          >
            Next →
          </button>
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
      `}</style>
    </div>
  );
}
