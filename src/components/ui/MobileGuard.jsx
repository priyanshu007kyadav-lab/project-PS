import { useEffect, useState } from "react";

export default function MobileGuard() {
  const [isMobile, setIsMobile] = useState(false);
  const [bypassed, setBypassed] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const isMobileWidth = window.innerWidth < 768;
      const isMobileAgent =
        /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        ) && window.innerWidth < 768;
      setIsMobile(isMobileWidth || isMobileAgent);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!isMobile || bypassed) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 999999,
        background: "rgba(1, 3, 12, 0.94)",
        backdropFilter: "blur(32px) saturate(200%)",
        WebkitBackdropFilter: "blur(32px) saturate(200%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', sans-serif",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      {/* Floating Ultra-Translucent Apple iOS Liquid Glass Mobile Guard Card */}
      <div
        style={{
          position: "relative",
          maxWidth: "400px",
          width: "100%",
          background: "linear-gradient(180deg, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0.04) 50%, rgba(255, 255, 255, 0.09) 100%)",
          border: "1px solid rgba(255, 255, 255, 0.35)",
          borderTop: "1px solid rgba(255, 255, 255, 0.7)",
          boxShadow: `
            0 30px 80px -15px rgba(0, 0, 0, 0.85),
            0 0 45px rgba(255, 255, 255, 0.15),
            inset 0 1.5px 2px rgba(255, 255, 255, 0.8)
          `,
          borderRadius: "28px",
          padding: "32px 26px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: "16px",
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
            height: "40%",
            background: "radial-gradient(ellipse at 50% 0%, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0) 75%)",
            pointerEvents: "none",
            borderRadius: "28px 28px 0 0",
          }}
        />

        {/* Laptop Badge */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            background: "linear-gradient(180deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.06) 100%)",
            border: "1px solid rgba(255, 255, 255, 0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "26px",
            boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.7)",
          }}
        >
          💻
        </div>

        {/* Concise Body Message */}
        <p
          style={{
            position: "relative",
            zIndex: 2,
            margin: 0,
            color: "#ffffff",
            fontSize: "1.08rem",
            lineHeight: 1.55,
            fontWeight: 500,
            letterSpacing: "-0.01em",
          }}
        >
          For a better experience, please open this link on a big screen device... ❤️
        </p>

        {/* Optional Bypass Button */}
        <button
          style={{
            position: "relative",
            zIndex: 2,
            marginTop: "4px",
            background: "linear-gradient(180deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.08) 100%)",
            border: "1px solid rgba(255, 255, 255, 0.45)",
            color: "#ffffff",
            padding: "11px 30px",
            borderRadius: "9999px",
            fontWeight: 600,
            fontSize: "0.94rem",
            cursor: "pointer",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            boxShadow: "0 8px 25px rgba(0, 0, 0, 0.4), inset 0 1.5px 2px rgba(255, 255, 255, 0.85)",
            transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "linear-gradient(180deg, rgba(255, 255, 255, 0.38) 0%, rgba(255, 255, 255, 0.16) 100%)";
            e.currentTarget.style.transform = "scale(1.04)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "linear-gradient(180deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.08) 100%)";
            e.currentTarget.style.transform = "scale(1)";
          }}
          onClick={() => setBypassed(true)}
        >
          Preview on Mobile 📱
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
      `}</style>
    </div>
  );
}
