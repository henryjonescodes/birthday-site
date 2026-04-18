import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { EXPERIENCES, YOUR_NAME } from "../config";

const isDesktop = () => window.innerWidth >= 768;

export default function ExperienceDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const exp = EXPERIENCES.find((e) => e.id === id);
  const [hovered, setHovered] = useState(false);
  const desktop = isDesktop();

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
        padding: "0.75rem 1rem",
        borderBottom: `1px solid ${exp.accent}22`,
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
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
            flexShrink: 0,
          }}
        >
          ← back
        </button>

        {/* Title — always visible */}
        <h2 className="detail-title" style={{
          fontFamily: "'VT323', monospace",
          color: "#e0e0e0",
          fontSize: "clamp(1rem, 4vw, 1.6rem)",
          margin: 0,
          lineHeight: 1,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          minWidth: 0,
        }}>
          {exp.title} <span style={{ color: exp.accent, opacity: 0.6, fontSize: "0.7em" }}>{exp.subtitle}</span>
        </h2>

        {/* Desktop-only: ticket count + open button */}
        {desktop && <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "0.75rem", flexShrink: 0 }}>
          <span style={{
            fontFamily: "'VT323', monospace",
            color: exp.accent,
            fontSize: "0.95rem",
            opacity: 0.6,
            whiteSpace: "nowrap",
          }}>
            {exp.tickets} tickets (+ {YOUR_NAME})
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
              padding: "0.2rem 0.6rem",
              textDecoration: "none",
              whiteSpace: "nowrap",
              transition: "background 0.15s, color 0.15s",
              letterSpacing: "0.05em",
            }}
          >
            ↗ OPEN
          </a>
        </div>}
      </div>

      {/* Hero body */}
      <div className="fade-in" style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "3rem 2rem",
        gap: "2rem",
        position: "relative",
      }}>
        {/* Accent glow */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at 50% 40%, ${exp.accent}0e 0%, transparent 60%)`,
          pointerEvents: "none",
        }} />

        <div style={{ textAlign: "center", position: "relative" }}>
          <div style={{
            width: 40,
            height: 3,
            background: exp.accent,
            boxShadow: `0 0 12px ${exp.accent}`,
            margin: "0 auto 1.25rem",
            borderRadius: 2,
          }} />
          <h1 style={{
            fontFamily: "'VT323', monospace",
            fontSize: "clamp(3rem, 8vw, 6rem)",
            color: "#fff",
            margin: "0 0 0.15rem",
            lineHeight: 1,
            textShadow: `0 0 40px ${exp.accent}44`,
          }}>
            {exp.title}
          </h1>
          <div style={{
            fontFamily: "'VT323', monospace",
            color: exp.accent,
            fontSize: "1.4rem",
            letterSpacing: "0.1em",
            opacity: 0.75,
          }}>
            {exp.subtitle}
          </div>
        </div>

        <p style={{
          fontFamily: "'Special Elite', cursive",
          color: "#999",
          fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)",
          lineHeight: 1.8,
          maxWidth: 520,
          textAlign: "center",
          margin: 0,
        }}>
          {exp.description}
        </p>

        <div style={{
          fontFamily: "'VT323', monospace",
          color: "#444",
          fontSize: "1rem",
          letterSpacing: "0.1em",
          textAlign: "center",
        }}>
          {exp.tickets} TICKETS &nbsp;·&nbsp; + {YOUR_NAME.toUpperCase()}
        </div>

        <a
          href={exp.url}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.background = exp.accent;
            el.style.color = "#0a0a0a";
            el.style.boxShadow = `0 0 28px ${exp.accent}88`;
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.background = "transparent";
            el.style.color = exp.accent;
            el.style.boxShadow = "none";
          }}
          style={{
            display: "inline-block",
            background: "transparent",
            color: exp.accent,
            fontFamily: "'VT323', monospace",
            fontSize: "1.6rem",
            border: `2px solid ${exp.accent}`,
            padding: "0.6rem 2.5rem",
            cursor: "pointer",
            letterSpacing: "0.12em",
            textDecoration: "none",
            transition: "background 0.15s, color 0.15s, box-shadow 0.15s",
          }}
        >
          {exp.ctaLabel} →
        </a>

      </div>
    </div>
  );
}
