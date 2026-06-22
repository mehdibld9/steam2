import { Download, ExternalLink, Sparkles } from "lucide-react";

export default function DownloadPage() {
  return (
    <div style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="grid-bg" />
      <div className="glow-orb" style={{ top: "-100px", left: "50%", transform: "translateX(-50%)" }} />

      <div className="page-enter" style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "2rem" }}>
        <div className="stagger-1" style={{ textAlign: "center", marginBottom: "0.5rem" }}>
          <Download size={36} style={{ color: "#3b82f6", margin: "0 auto 1rem" }} />
          <h1 style={{ fontSize: "1.1rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", margin: 0 }}>
            Download
          </h1>
        </div>

        <div className="stagger-2" style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "center" }}>
          <a
            href="https://www.mediafire.com/file/7yk3j8hvvykrju9/steam-ch-v1.2.rar/file"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-fancy btn-fancy-primary"
          >
            <ExternalLink size={16} />
            Link
          </a>

          <a
            href="https://mega.nz/folder/edsEzY4K#pglQl98gEWXCoIumZLymoA"
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

        <div className="stagger-3" style={{ marginTop: "0.5rem" }}>
          <button
            onClick={() => {}}
            className="btn-fancy-secondary"
            style={{ opacity: 0.5, cursor: "default", pointerEvents: "none", border: "none", background: "transparent" }}
          >
            <Sparkles size={15} />
            Make your own page
          </button>
        </div>
      </div>
    </div>
  );
}
