import { useEffect, useState } from "react";

export default function MobileGuard() {
  const [isPhone, setIsPhone] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const minDimension = Math.min(window.innerWidth, window.innerHeight);
      const isPhoneAgent = /iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
      const isAndroidPhone =
        /Android/i.test(navigator.userAgent) && /Mobile/i.test(navigator.userAgent);

      // Tablets have minDimension >= 600px (e.g., iPad is 768px+)
      // Mobile phones have minDimension < 600px (usually 360px - 430px)
      const isPhoneScreen = minDimension < 600;

      setIsPhone(isPhoneScreen || isPhoneAgent || isAndroidPhone);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);
    window.addEventListener("orientationchange", checkDevice);
    return () => {
      window.removeEventListener("resize", checkDevice);
      window.removeEventListener("orientationchange", checkDevice);
    };
  }, []);

  if (!isPhone) return null;

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

      {/* Ultra-Translucent Apple iOS Liquid Glass Phone Guard Card */}
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
          Larger Screens Only
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
          This website is crafted for larger screens.
          <br /><br />
          Please open this link on a <strong>laptop, PC, or tablet / iPad</strong> 
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
