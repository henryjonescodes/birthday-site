import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EXPERIENCES, YOUR_NAME } from "../config";
import { useAuthStore } from "../store/authStore";

function ExperienceCard({
  exp,
  index,
  onSelect,
}: {
  exp: typeof EXPERIENCES[number];
  index: number;
  onSelect: (id: string) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const [exploding, setExploding] = useState(false);

  function handleClick() {
    setExploding(true);
    setTimeout(() => onSelect(exp.id), 520);
  }

  return (
    <div
      className="card-enter"
      style={{
        animationDelay: `${0.3 + index * 0.4}s`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Glitch burst overlay */}
      {exploding && (
        <div style={{
          position: "absolute",
          inset: 0,
          zIndex: 10,
          pointerEvents: "none",
          animation: "glitchBurst 0.5s forwards",
        }} />
      )}

      <button
        onClick={handleClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          width: "100%",
          background: hovered ? "rgba(0,255,225,0.07)" : "rgba(0,255,225,0.02)",
          border: `1px solid ${hovered ? "#00ffe1" : "#1e1e1e"}`,
          borderRadius: 0,
          padding: "0",
          cursor: "pointer",
          textAlign: "left",
          outline: "none",
          boxShadow: hovered ? "0 0 32px rgba(0,255,225,0.12), inset 0 0 40px rgba(0,255,225,0.03)" : "none",
          display: "block",
          position: "relative",
          filter: exploding ? "brightness(3) saturate(0)" : "none",
          transform: exploding ? "scale(1.03)" : "scale(1)",
          transition: exploding
            ? "filter 0.15s, transform 0.15s"
            : "border-color 0.15s, background 0.15s, box-shadow 0.15s, transform 0.15s",
        }}
      >
        {/* Number accent bar */}
        <div style={{
          position: "absolute",
          left: 0, top: 0, bottom: 0,
          width: 4,
          background: hovered ? "#00ffe1" : "#1e1e1e",
          transition: "background 0.15s",
          boxShadow: hovered ? "0 0 12px #00ffe1" : "none",
        }} />

        <div style={{ padding: "1.75rem 1.75rem 1.75rem 2rem" }}>
          {/* Index */}
          <div style={{
            fontFamily: "'VT323', monospace",
            fontSize: "0.85rem",
            color: hovered ? "#00ffe1" : "#444",
            letterSpacing: "0.2em",
            marginBottom: "0.5rem",
            transition: "color 0.15s",
          }}>
            OPTION {String(index + 1).padStart(2, "0")} / {EXPERIENCES.length}
          </div>

          {/* Title */}
          <h2 style={{
            fontFamily: "'VT323', monospace",
            fontSize: "clamp(2rem, 6vw, 3.2rem)",
            color: hovered ? "#fff" : "#d0d0d0",
            margin: "0 0 0.6rem",
            lineHeight: 1,
            letterSpacing: "0.02em",
            textShadow: hovered ? "0 0 20px rgba(0,255,225,0.3)" : "none",
            transition: "color 0.15s, text-shadow 0.15s",
          }}>
            {exp.title}
          </h2>

          {/* Description */}
          <p style={{
            fontFamily: "'Special Elite', cursive",
            color: hovered ? "#bbb" : "#666",
            fontSize: "0.92rem",
            lineHeight: 1.6,
            margin: "0 0 1rem",
            transition: "color 0.15s",
          }}>
            {exp.description}
          </p>

          {/* Footer row */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{
              fontFamily: "'Special Elite', cursive",
              color: "#444",
              fontSize: "0.78rem",
            }}>
              +1 if {YOUR_NAME} comes along
            </span>
            <span style={{
              fontFamily: "'VT323', monospace",
              fontSize: "1.1rem",
              color: hovered ? "#00ffe1" : "#333",
              letterSpacing: "0.1em",
              transition: "color 0.15s",
            }}>
              {exp.tickets} TICKETS {hovered ? "→" : ""}
            </span>
          </div>
        </div>

        {/* Hover scan line sweep */}
        {hovered && (
          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, transparent 0%, rgba(0,255,225,0.04) 50%, transparent 100%)",
            animation: "scanSweep 1.4s linear infinite",
            pointerEvents: "none",
          }} />
        )}
      </button>
    </div>
  );
}

export default function Landing() {
  const navigate = useNavigate();
  const reset = useAuthStore((s) => s.reset);
  const isDebug = new URLSearchParams(window.location.search).has("debug");

  return (
    <div
      className="scanlines"
      style={{ minHeight: "100vh", background: "#0a0a0a", padding: "3rem 1.5rem 4rem" }}
    >
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        {/* Header */}
        <div className="fade-in" style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div style={{
            fontFamily: "'VT323', monospace",
            color: "#333",
            fontSize: "0.85rem",
            letterSpacing: "0.3em",
            marginBottom: "0.75rem",
          }}>
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          </div>

          <h1
            className="glitch-text"
            style={{
              fontFamily: "'VT323', monospace",
              fontSize: "clamp(2.4rem, 9vw, 5.5rem)",
              color: "#00ffe1",
              lineHeight: 1,
              letterSpacing: "0.03em",
              margin: "0 0 1rem",
            }}
          >
            ★ HAPPY 18th BIRTHDAY ASHA ★
          </h1>

          <p style={{
            fontFamily: "'Special Elite', cursive",
            color: "#888",
            fontSize: "clamp(0.85rem, 2.5vw, 1rem)",
            lineHeight: 1.7,
            maxWidth: 420,
            margin: "0 auto 0.4rem",
          }}>
            ok so i couldn't just get you like... a candle or whatever
          </p>
          <p style={{
            fontFamily: "'Special Elite', cursive",
            color: "#444",
            fontSize: "0.82rem",
          }}>
            pick one. it's yours. each comes with 2 tickets.
          </p>

          <div style={{
            fontFamily: "'VT323', monospace",
            color: "#333",
            fontSize: "0.85rem",
            letterSpacing: "0.3em",
            marginTop: "0.75rem",
          }}>
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          </div>
        </div>

        {/* Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "#1a1a1a" }}>
          {EXPERIENCES.map((exp, i) => (
            <ExperienceCard
              key={exp.id}
              exp={exp}
              index={i}
              onSelect={(id) => navigate(`/${id}`)}
            />
          ))}
        </div>

        {/* Footer */}
        <p style={{
          fontFamily: "'VT323', monospace",
          color: "#2a2a2a",
          fontSize: "0.8rem",
          textAlign: "center",
          marginTop: "2.5rem",
          letterSpacing: "0.1em",
        }}>
          ASHA_BDAY_V18.EXE — BUILD 2026 — ALL RIGHTS RESERVED
        </p>
      </div>

      {isDebug && (
        <button
          onClick={() => { reset(); window.location.href = "/"; }}
          style={{
            position: "fixed",
            bottom: 16,
            right: 16,
            background: "#ff003c",
            color: "#fff",
            fontFamily: "'VT323', monospace",
            fontSize: "1.1rem",
            border: "none",
            padding: "0.4rem 1rem",
            cursor: "pointer",
            opacity: 0.8,
            zIndex: 9999,
          }}
        >
          [DEBUG] RESET AUTH
        </button>
      )}
    </div>
  );
}
