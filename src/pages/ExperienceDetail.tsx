import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { EXPERIENCES, YOUR_NAME } from "../config";

export default function ExperienceDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const exp = EXPERIENCES.find((e) => e.id === id);
  const [hovered, setHovered] = useState(false);

  if (!exp) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a]">
        <p style={{ fontFamily: "'VT323', monospace", color: "#ff003c", fontSize: "2rem" }}>
          404 — experience not found
        </p>
        <button
          onClick={() => navigate("/home")}
          style={{ fontFamily: "'VT323', monospace", color: "#00ffe1", background: "none", border: "none", cursor: "pointer", fontSize: "1.2rem", marginTop: "1rem" }}
        >
          ← back
        </button>
      </div>
    );
  }

  // Derive the real external URL for the "open in new tab" fallback
  const externalUrl = exp.url.startsWith("/proxy?url=")
    ? decodeURIComponent(exp.url.replace("/proxy?url=", ""))
    : exp.url;

  return (
    <div className="scanlines min-h-screen flex flex-col bg-[#0a0a0a]">
      {/* Top bar */}
      <div style={{
        padding: "0.75rem 1.5rem",
        borderBottom: `1px solid ${exp.accent}22`,
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        flexShrink: 0,
        background: "#0a0a0a",
        zIndex: 2,
      }}>
        <button
          onClick={() => navigate("/home")}
          style={{
            fontFamily: "'VT323', monospace",
            color: exp.accent,
            background: "none",
            border: `1px solid ${exp.accent}44`,
            padding: "0.2rem 0.75rem",
            cursor: "pointer",
            fontSize: "1.1rem",
          }}
        >
          ← back
        </button>
        <h2 style={{
          fontFamily: "'VT323', monospace",
          color: "#e0e0e0",
          fontSize: "clamp(1.2rem, 3vw, 1.6rem)",
          margin: 0,
          lineHeight: 1,
        }}>
          {exp.title} <span style={{ color: exp.accent, opacity: 0.6, fontSize: "0.7em" }}>{exp.subtitle}</span>
        </h2>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "1rem" }}>
          <span style={{
            fontFamily: "'VT323', monospace",
            color: exp.accent,
            fontSize: "0.95rem",
            opacity: 0.6,
            whiteSpace: "nowrap",
          }}>
            {exp.tickets} tickets (+1 if {YOUR_NAME} comes)
          </span>
          <a
            href={externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
              fontFamily: "'VT323', monospace",
              fontSize: "1rem",
              color: hovered ? "#0a0a0a" : exp.accent,
              background: hovered ? exp.accent : "transparent",
              border: `1px solid ${exp.accent}`,
              padding: "0.2rem 0.75rem",
              textDecoration: "none",
              whiteSpace: "nowrap",
              transition: "background 0.15s, color 0.15s",
              letterSpacing: "0.05em",
            }}
          >
            ↗ OPEN IN NEW TAB
          </a>
        </div>
      </div>

      {/* Iframe */}
      <iframe
        src={exp.url}
        title={exp.title}
        style={{
          flex: 1,
          width: "100%",
          border: "none",
          minHeight: "calc(100vh - 56px)",
        }}
      />
    </div>
  );
}
