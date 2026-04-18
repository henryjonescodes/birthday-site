import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { EXPERIENCES, YOUR_NAME } from "../config";
import { useAuthStore } from "../store/authStore";

const SLIDE_W = "100vw";

function useSwipe(onLeft: () => void, onRight: () => void) {
  const startX = useRef<number | null>(null);

  return {
    onTouchStart: (e: React.TouchEvent) => { startX.current = e.touches[0].clientX; },
    onTouchEnd: (e: React.TouchEvent) => {
      if (startX.current === null) return;
      const dx = e.changedTouches[0].clientX - startX.current;
      if (Math.abs(dx) > 40) dx < 0 ? onLeft() : onRight();
      startX.current = null;
    },
  };
}

export default function Landing() {
  const navigate = useNavigate();
  const reset = useAuthStore((s) => s.reset);
  const isDebug = new URLSearchParams(window.location.search).has("debug");
  const [active, setActive] = useState(0);
  const [exploding, setExploding] = useState(false);

  const prev = useCallback(() => setActive((i) => (i - 1 + EXPERIENCES.length) % EXPERIENCES.length), []);
  const next = useCallback(() => setActive((i) => (i + 1) % EXPERIENCES.length), []);
  const swipe = useSwipe(next, prev);

  function handleSelect() {
    setExploding(true);
    setTimeout(() => navigate(`/${EXPERIENCES[active].id}`), 520);
  }

  const exp = EXPERIENCES[active];

  return (
    <div
      className="scanlines"
      style={{ position: "fixed", inset: 0, background: "#0a0a0a", overflow: "hidden", display: "flex", flexDirection: "column" }}
      {...swipe}
    >
      {/* Header strip */}
      <div className="fade-in" style={{
        flexShrink: 0,
        textAlign: "center",
        padding: "1.5rem 1rem 0.75rem",
        borderBottom: "1px solid #111",
        position: "relative",
        zIndex: 2,
      }}>
        <h1
          className="glitch-text"
          style={{
            fontFamily: "'VT323', monospace",
            fontSize: "clamp(1.6rem, 5vw, 3rem)",
            color: "#00ffe1",
            lineHeight: 1,
            margin: 0,
            letterSpacing: "0.04em",
          }}
        >
          ★ HAPPY 18th BIRTHDAY ASHA ★
        </h1>
        <p style={{ fontFamily: "'Special Elite', cursive", color: "#555", fontSize: "0.78rem", marginTop: "0.3rem" }}>
          pick your gift — {EXPERIENCES.length} options — swipe or use arrows
        </p>
      </div>

      {/* Carousel viewport */}
      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        {/* Slides */}
        <div style={{
          display: "flex",
          width: `${EXPERIENCES.length * 100}%`,
          height: "100%",
          transform: `translateX(-${active * (100 / EXPERIENCES.length)}%)`,
          transition: "transform 0.45s cubic-bezier(0.77,0,0.18,1)",
          willChange: "transform",
        }}>
          {EXPERIENCES.map((e, i) => (
            <Slide
              key={e.id}
              exp={e}
              index={i}
              isActive={i === active}
              exploding={exploding && i === active}
              onSelect={handleSelect}
            />
          ))}
        </div>

        {/* Prev arrow */}
        <button
          onClick={prev}
          aria-label="Previous"
          style={{
            position: "absolute",
            left: 12,
            top: "50%",
            transform: "translateY(-50%)",
            background: "rgba(0,0,0,0.7)",
            border: `1px solid ${exp.accent}44`,
            color: exp.accent,
            fontFamily: "'VT323', monospace",
            fontSize: "2rem",
            padding: "0.5rem 0.85rem",
            cursor: "pointer",
            zIndex: 5,
            lineHeight: 1,
            transition: "border-color 0.15s, box-shadow 0.15s",
            backdropFilter: "blur(4px)",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = exp.accent; e.currentTarget.style.boxShadow = `0 0 12px ${exp.accent}55`; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = `${exp.accent}44`; e.currentTarget.style.boxShadow = "none"; }}
        >
          ←
        </button>

        {/* Next arrow */}
        <button
          onClick={next}
          aria-label="Next"
          style={{
            position: "absolute",
            right: 12,
            top: "50%",
            transform: "translateY(-50%)",
            background: "rgba(0,0,0,0.7)",
            border: `1px solid ${exp.accent}44`,
            color: exp.accent,
            fontFamily: "'VT323', monospace",
            fontSize: "2rem",
            padding: "0.5rem 0.85rem",
            cursor: "pointer",
            zIndex: 5,
            lineHeight: 1,
            transition: "border-color 0.15s, box-shadow 0.15s",
            backdropFilter: "blur(4px)",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = exp.accent; e.currentTarget.style.boxShadow = `0 0 12px ${exp.accent}55`; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = `${exp.accent}44`; e.currentTarget.style.boxShadow = "none"; }}
        >
          →
        </button>
      </div>

      {/* Dot nav + counter */}
      <div style={{
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.75rem",
        padding: "0.75rem",
        borderTop: "1px solid #111",
        zIndex: 2,
      }}>
        {EXPERIENCES.map((e, i) => (
          <button
            key={e.id}
            onClick={() => setActive(i)}
            style={{
              width: i === active ? 28 : 8,
              height: 8,
              borderRadius: 4,
              background: i === active ? exp.accent : "#2a2a2a",
              border: "none",
              cursor: "pointer",
              padding: 0,
              transition: "width 0.3s, background 0.3s",
              boxShadow: i === active ? `0 0 8px ${exp.accent}88` : "none",
            }}
          />
        ))}
        <span style={{
          fontFamily: "'VT323', monospace",
          color: "#444",
          fontSize: "0.85rem",
          marginLeft: "0.5rem",
        }}>
          {active + 1} / {EXPERIENCES.length}
        </span>
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
            zIndex: 9999,
          }}
        >
          [DEBUG] RESET AUTH
        </button>
      )}
    </div>
  );
}

function Slide({
  exp,
  index,
  isActive,
  exploding,
  onSelect,
}: {
  exp: typeof EXPERIENCES[number];
  index: number;
  isActive: boolean;
  exploding: boolean;
  onSelect: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div style={{
      width: SLIDE_W,
      height: "100%",
      display: "flex",
      flexDirection: "row",
      position: "relative",
      overflow: "hidden",
      flexShrink: 0,
    }}>
      {/* Accent glow background */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: `radial-gradient(ellipse at 65% 50%, ${exp.accent}0d 0%, transparent 65%)`,
        pointerEvents: "none",
        transition: "opacity 0.4s",
        opacity: isActive ? 1 : 0,
      }} />

      {/* Left: info panel */}
      <div style={{
        width: "45%",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "2rem 2rem 2rem 3rem",
        position: "relative",
        zIndex: 2,
      }}>
        {/* Accent bar */}
        <div style={{
          width: 3,
          height: 48,
          background: exp.accent,
          boxShadow: `0 0 16px ${exp.accent}`,
          marginBottom: "1.25rem",
          borderRadius: 2,
        }} />

        <div style={{
          fontFamily: "'VT323', monospace",
          color: exp.accent,
          fontSize: "0.8rem",
          letterSpacing: "0.25em",
          marginBottom: "0.4rem",
          opacity: 0.8,
        }}>
          OPTION {String(index + 1).padStart(2, "0")} — {exp.tickets} TICKETS
        </div>

        <h2 style={{
          fontFamily: "'VT323', monospace",
          fontSize: "clamp(2.8rem, 6vw, 5rem)",
          color: "#fff",
          lineHeight: 0.95,
          margin: "0 0 0.1rem",
          letterSpacing: "0.01em",
          textShadow: isActive ? `0 0 40px ${exp.accent}44` : "none",
          transition: "text-shadow 0.4s",
        }}>
          {exp.title}
        </h2>

        <div style={{
          fontFamily: "'VT323', monospace",
          color: exp.accent,
          fontSize: "clamp(1.1rem, 2vw, 1.6rem)",
          letterSpacing: "0.08em",
          marginBottom: "1.25rem",
          opacity: 0.75,
        }}>
          {exp.subtitle}
        </div>

        <p style={{
          fontFamily: "'Special Elite', cursive",
          color: "#999",
          fontSize: "clamp(0.8rem, 1.3vw, 0.95rem)",
          lineHeight: 1.7,
          marginBottom: "1.75rem",
          maxWidth: 340,
        }}>
          {exp.description}
        </p>

        <p style={{
          fontFamily: "'Special Elite', cursive",
          color: "#444",
          fontSize: "0.78rem",
          marginBottom: "1.5rem",
        }}>
          +1 ticket if {YOUR_NAME} comes along
        </p>

        {/* CTA */}
        <button
          onClick={onSelect}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            alignSelf: "flex-start",
            background: hovered ? exp.accent : "transparent",
            color: hovered ? "#0a0a0a" : exp.accent,
            fontFamily: "'VT323', monospace",
            fontSize: "1.4rem",
            border: `2px solid ${exp.accent}`,
            padding: "0.5rem 1.75rem",
            cursor: "pointer",
            letterSpacing: "0.1em",
            transition: "background 0.15s, color 0.15s, box-shadow 0.15s",
            boxShadow: hovered ? `0 0 24px ${exp.accent}88` : "none",
            filter: exploding ? "brightness(4) saturate(0)" : "none",
          }}
        >
          PICK THIS ONE →
        </button>
      </div>

      {/* Right: 3D model */}
      <div style={{
        flex: 1,
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}>
        {/* Only render iframe for active + neighbors to avoid 3 simultaneous loads */}
        {isActive && (
          <iframe
            title={exp.sketchfabTitle}
            src={exp.sketchfabSrc}
            frameBorder="0"
            allowFullScreen
            allow="autoplay; fullscreen; xr-spatial-tracking"
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              opacity: isActive ? 1 : 0,
              transition: "opacity 0.5s",
            }}
          />
        )}

        {/* Dim overlay when not active */}
        {!isActive && (
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.6)" }} />
        )}

        {/* Glitch burst overlay on click */}
        {exploding && (
          <div style={{
            position: "absolute",
            inset: 0,
            zIndex: 10,
            pointerEvents: "none",
            animation: "glitchBurst 0.5s forwards",
          }} />
        )}
      </div>

      {/* Vertical divider */}
      <div style={{
        position: "absolute",
        left: "45%",
        top: "10%",
        bottom: "10%",
        width: 1,
        background: `linear-gradient(180deg, transparent, ${exp.accent}33, transparent)`,
        pointerEvents: "none",
      }} />
    </div>
  );
}
