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

  return (
    <div className="scanlines min-h-screen flex flex-col bg-[#0a0a0a]">
      {/* Top bar */}
      <div style={{
        padding: "1rem 1.5rem",
        borderBottom: "1px solid #1a1a1a",
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        flexShrink: 0,
      }}>
        <button
          onClick={() => navigate("/home")}
          style={{
            fontFamily: "'VT323', monospace",
            color: "#00ffe1",
            background: "none",
            border: "1px solid #333",
            padding: "0.25rem 0.75rem",
            cursor: "pointer",
            fontSize: "1.1rem",
          }}
        >
          ← back
        </button>
        <h2 style={{
          fontFamily: "'VT323', monospace",
          color: "#e0e0e0",
          fontSize: "clamp(1.3rem, 4vw, 1.8rem)",
          margin: 0,
          lineHeight: 1,
        }}>
          {exp.title}
        </h2>
        <span style={{
          marginLeft: "auto",
          fontFamily: "'VT323', monospace",
          color: exp.accent,
          fontSize: "1rem",
          opacity: 0.7,
          whiteSpace: "nowrap",
        }}>
          {exp.tickets} tickets (+1 if {YOUR_NAME} comes)
        </span>
      </div>

      {/* Main content */}
      <div className="fade-in" style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "3rem 2rem",
        gap: "2.5rem",
        position: "relative",
      }}>
        {/* Accent glow */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at 50% 40%, ${exp.accent}0e 0%, transparent 60%)`,
          pointerEvents: "none",
        }} />

        {/* Accent bar + title block */}
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

        {/* Description */}
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

        {/* Ticket info */}
        <div style={{
          fontFamily: "'VT323', monospace",
          color: "#444",
          fontSize: "1rem",
          letterSpacing: "0.1em",
          textAlign: "center",
        }}>
          {exp.tickets} TICKETS &nbsp;·&nbsp; +1 IF {YOUR_NAME.toUpperCase()} COMES
        </div>

        {/* CTA */}
        <a
          href={exp.url}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            display: "inline-block",
            background: hovered ? exp.accent : "transparent",
            color: hovered ? "#0a0a0a" : exp.accent,
            fontFamily: "'VT323', monospace",
            fontSize: "1.6rem",
            border: `2px solid ${exp.accent}`,
            padding: "0.6rem 2.5rem",
            cursor: "pointer",
            letterSpacing: "0.12em",
            textDecoration: "none",
            transition: "background 0.15s, color 0.15s, box-shadow 0.15s",
            boxShadow: hovered ? `0 0 28px ${exp.accent}88` : "none",
          }}
        >
          VISIT SITE →
        </a>

        <p style={{
          fontFamily: "'Special Elite', cursive",
          color: "#2a2a2a",
          fontSize: "0.7rem",
          margin: 0,
        }}>
          opens in a new tab
        </p>
      </div>
    </div>
  );
}
