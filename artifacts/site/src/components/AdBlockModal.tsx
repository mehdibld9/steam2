import { ShieldX, RefreshCw } from "lucide-react";

interface AdBlockModalProps {
  onDismiss?: () => void;
}

export default function AdBlockModal({ onDismiss }: AdBlockModalProps) {
  return (
    <div style={{
      position: "fixed",
      inset: 0,
      zIndex: 9999,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "rgba(0,0,0,0.85)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      animation: "fade-in-scale 0.35s cubic-bezier(0.16,1,0.3,1) both",
    }}>
      {/* Glow behind card */}
      <div style={{
        position: "absolute",
        width: 500,
        height: 500,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(239,68,68,0.12) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{
        position: "relative",
        maxWidth: 420,
        width: "90%",
        background: "rgba(10,10,15,0.95)",
        border: "1px solid rgba(239,68,68,0.25)",
        borderRadius: "1rem",
        padding: "2.5rem 2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1.25rem",
        boxShadow: "0 0 60px 8px rgba(239,68,68,0.08), 0 20px 60px rgba(0,0,0,0.6)",
      }}>
        {/* Icon */}
        <div style={{
          width: 64,
          height: 64,
          borderRadius: "50%",
          background: "rgba(239,68,68,0.1)",
          border: "1px solid rgba(239,68,68,0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          animation: "pulse-glow 2.5s ease-in-out infinite",
          "--glow-color": "rgba(239,68,68,0.3)",
        } as React.CSSProperties}>
          <ShieldX size={28} style={{ color: "#f87171" }} />
        </div>

        {/* Text */}
        <div style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <h2 style={{
            margin: 0,
            fontSize: "1.15rem",
            fontWeight: 700,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "#f87171",
          }}>
            Ad Blocker Detected
          </h2>
          <p style={{
            margin: 0,
            fontSize: "0.875rem",
            color: "rgba(255,255,255,0.45)",
            lineHeight: 1.6,
            letterSpacing: "0.01em",
          }}>
            Please disable your ad blocker to access the download and key links. We rely on ads to keep this service free.
          </p>
        </div>

        {/* Divider */}
        <div style={{ width: "100%", height: 1, background: "rgba(255,255,255,0.07)" }} />

        {/* Instructions */}
        <ol style={{
          margin: 0,
          padding: "0 0 0 1.2rem",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}>
          {[
            "Click your ad blocker icon in the browser toolbar",
            "Select \"Disable\" or \"Pause\" for this site",
            "Refresh the page",
          ].map((step, i) => (
            <li key={i} style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.5 }}>
              {step}
            </li>
          ))}
        </ol>

        {/* Buttons */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", width: "100%", marginTop: "0.25rem" }}>
          <button
            onClick={() => window.location.reload()}
            className="btn-fancy btn-fancy-primary"
            style={{ width: "100%", background: "transparent", border: "none", cursor: "pointer" }}
          >
            <RefreshCw size={15} />
            I&apos;ve disabled it — Reload
          </button>

          {onDismiss && (
            <button
              onClick={onDismiss}
              className="btn-fancy-secondary"
              style={{ width: "100%", cursor: "pointer", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              Continue anyway
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
