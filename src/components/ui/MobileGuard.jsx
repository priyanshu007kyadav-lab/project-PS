import { useEffect, useState } from "react";

export default function MobileGuard() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const isMobileWidth = window.innerWidth < 768;
      const isMobileAgent =
        /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );
      const isTouch = "ontouchstart" in window && window.innerWidth < 768;
      setIsMobile(isMobileWidth || isMobileAgent || isTouch);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    window.addEventListener("orientationchange", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("orientationchange", checkMobile);
    };
  }, []);

  if (!isMobile) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999999,
        background: "#01030c",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', sans-serif",
        WebkitFontSmoothing: "antialiased",
        touchAction: "none",
        userSelect: "none",
      }}
    >
      {/* Background Star Ambience */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at 50% 40%, rgba(30, 70, 160, 0.25) 0%, rgba(1, 3, 12, 0.95) 75%)",
          pointerEvents: "none",
        }}
      />

      {/* Ultra-Translucent Apple iOS Liquid Glass Restricted Card */}
      <div
        style={{
          position: "relative",
          maxWidth: "380px",
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
          padding: "38px 28px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: "18px",
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

        {/* Laptop Badge Icon */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            width: "68px",
            height: "68px",
            borderRadius: "50%",
            background: "linear-gradient(180deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.06) 100%)",
            border: "1px solid rgba(255, 255, 255, 0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "30px",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.4), inset 0 1.5px 2px rgba(255, 255, 255, 0.8)",
          }}
        >
          💻
        </div>

        {/* Header */}
        <h2
          style={{
            position: "relative",
            zIndex: 2,
            margin: 0,
            color: "#ffffff",
            fontSize: "1.25rem",
            fontWeight: 600,
            letterSpacing: "-0.02em",
          }}
        >
          Desktop & Laptop Only
        </h2>

        {/* Informative Message */}
        <p
          style={{
            position: "relative",
            zIndex: 2,
            margin: 0,
            color: "rgba(255, 255, 255, 0.9)",
            fontSize: "1.02rem",
            lineHeight: 1.6,
            fontWeight: 400,
            letterSpacing: "-0.01em",
          }}
        >
          This universe is crafted exclusively for big screen devices.
          <br /><br />
          Please open this link on a <strong>laptop or PC</strong> to experience the journey... ❤️
        </p>
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
