import { Key, ExternalLink } from "lucide-react";

export default function KeyPage() {
  return (
    <div style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="grid-bg" />
      <div className="glow-orb" style={{ bottom: "-100px", right: "20%", background: "radial-gradient(circle, rgba(129, 140, 248, 0.1) 0%, transparent 70%)" }} />

      <div className="page-enter" style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "2rem" }}>
        <div className="stagger-1" style={{ textAlign: "center", marginBottom: "0.5rem" }}>
          <Key size={36} style={{ color: "#818cf8", margin: "0 auto 1rem" }} />
          <h1 style={{ fontSize: "1.1rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", margin: 0 }}>
            Get Key
          </h1>
        </div>

        <div className="stagger-2" style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "center" }}>
          <a
            href="https://link-hub.net/1058391/XKcipSsYUiJs"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-fancy btn-fancy-primary"
            style={{ "--glow-color": "rgba(129, 140, 248, 0.4)" } as React.CSSProperties}
          >
            <ExternalLink size={16} />
            Link
          </a>

          <a
            href="https://tpi.li/zcKcgIA02v"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-fancy-secondary"
          >
            <ExternalLink size={16} />
            Mirror
          </a>
        </div>

        <div className="stagger-3" style={{ fontSize: "0.72rem", letterSpacing: "0.08em", color: "rgba(255,255,255,0.18)", textTransform: "uppercase", marginTop: "0.5rem" }}>
          Choose your preferred source
        </div>
      </div>
    </div>
  );
}
