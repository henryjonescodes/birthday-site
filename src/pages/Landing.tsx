import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { EXPERIENCES, YOUR_NAME } from "../config";
import { useAuthStore } from "../store/authStore";

const SLIDE_W = "100vw";

export default function Landing() {
  const navigate = useNavigate();
  const reset = useAuthStore((s) => s.reset);
  const isDebug = new URLSearchParams(window.location.search).has("debug");
  const [active, setActive] = useState(0);
  const [exploding, setExploding] = useState(false);

  const prev = useCallback(
    () => setActive((i) => (i - 1 + EXPERIENCES.length) % EXPERIENCES.length),
    [],
  );
  const next = useCallback(
    () => setActive((i) => (i + 1) % EXPERIENCES.length),
    [],
  );

  function handleSelect() {
    setExploding(true);
    setTimeout(() => navigate(`/${EXPERIENCES[active].id}`), 520);
  }

  const exp = EXPERIENCES[active];

  return (
    <div
      className="scanlines"
      style={{
        position: "fixed",
        inset: 0,
        background: "#0a0a0a",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header strip */}
      <div
        className="fade-in"
        style={{
          flexShrink: 0,
          textAlign: "center",
          padding: "1.5rem 1rem 0.75rem",
          borderBottom: "1px solid #111",
          position: "relative",
          zIndex: 2,
        }}
      >
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
        <p
          style={{
            fontFamily: "'Special Elite', cursive",
            color: "#555",
            fontSize: "0.78rem",
            marginTop: "0.3rem",
          }}
        >
          pick one experience — {EXPERIENCES.length} options — use arrows to
          navigate
        </p>
      </div>

      {/* Carousel viewport */}
      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        {/* Slides */}
        <div
          style={{
            display: "flex",
            width: `${EXPERIENCES.length * 100}%`,
            height: "100%",
            transform: `translateX(-${active * (100 / EXPERIENCES.length)}%)`,
            transition: "transform 0.45s cubic-bezier(0.77,0,0.18,1)",
            willChange: "transform",
          }}
        >
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
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = exp.accent;
            e.currentTarget.style.boxShadow = `0 0 12px ${exp.accent}55`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = `${exp.accent}44`;
            e.currentTarget.style.boxShadow = "none";
          }}
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
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = exp.accent;
            e.currentTarget.style.boxShadow = `0 0 12px ${exp.accent}55`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = `${exp.accent}44`;
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          →
        </button>
      </div>

      {/* Dot nav + counter */}
      <div
        style={{
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.75rem",
          padding: "0.75rem",
          borderTop: "1px solid #111",
          zIndex: 2,
        }}
      >
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
        <span
          style={{
            fontFamily: "'VT323', monospace",
            color: "#444",
            fontSize: "0.85rem",
            marginLeft: "0.5rem",
          }}
        >
          {active + 1} / {EXPERIENCES.length}
        </span>
      </div>

      {isDebug && (
        <button
          onClick={() => {
            reset();
            window.location.href = "/";
          }}
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
  exp: (typeof EXPERIENCES)[number];
  index: number;
  isActive: boolean;
  exploding: boolean;
  onSelect: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        width: SLIDE_W,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      {/* Accent glow background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at 50% 40%, ${exp.accent}12 0%, transparent 60%)`,
          pointerEvents: "none",
          opacity: isActive ? 1 : 0,
          transition: "opacity 0.4s",
        }}
      />

      {/* 3D model — top, full width */}
      <div
        style={{
          width: "100%",
          flex: "1 1 0",
          minHeight: 0,
          position: "relative",
        }}
      >
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
            visibility: isActive ? "visible" : "hidden",
          }}
        />

        {/* Glitch burst on click */}
        {exploding && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 10,
              pointerEvents: "none",
              animation: "glitchBurst 0.5s forwards",
            }}
          />
        )}
      </div>

      {/* Text + CTA row — below model */}
      <div
        style={{
          width: "60%",
          alignSelf: "center",
          flexShrink: 0,
          padding: "1rem 0 1.25rem",
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-end",
          gap: "2rem",
          borderTop: `1px solid ${exp.accent}22`,
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Left accent bar */}
        <div
          style={{
            width: 3,
            alignSelf: "stretch",
            background: exp.accent,
            boxShadow: `0 0 10px ${exp.accent}`,
            borderRadius: 2,
            flexShrink: 0,
          }}
        />

        {/* Text block */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontFamily: "'VT323', monospace",
              color: exp.accent,
              fontSize: "0.75rem",
              letterSpacing: "0.25em",
              opacity: 0.7,
              marginBottom: "0.2rem",
            }}
          >
            OPTION {String(index + 1).padStart(2, "0")} — {exp.tickets} TICKETS
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "0.75rem",
              flexWrap: "wrap",
            }}
          >
            <h2
              style={{
                fontFamily: "'VT323', monospace",
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                color: "#fff",
                lineHeight: 1,
                margin: 0,
                textShadow: isActive ? `0 0 30px ${exp.accent}44` : "none",
                transition: "text-shadow 0.4s",
              }}
            >
              {exp.title}
            </h2>
            <span
              style={{
                fontFamily: "'VT323', monospace",
                color: exp.accent,
                fontSize: "clamp(1rem, 1.8vw, 1.4rem)",
                opacity: 0.7,
                letterSpacing: "0.06em",
              }}
            >
              {exp.subtitle}
            </span>
          </div>

          <p
            style={{
              fontFamily: "'Special Elite', cursive",
              color: "#888",
              fontSize: "clamp(0.75rem, 1.1vw, 0.88rem)",
              lineHeight: 1.6,
              margin: "0.4rem 0 0",
            }}
          >
            {exp.description}
            <span style={{ color: "#3a3a3a", marginLeft: "0.5rem" }}>
              + {YOUR_NAME}
            </span>
          </p>
        </div>

        {/* CTA */}
        <button
          onClick={onSelect}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            flexShrink: 0,
            alignSelf: "center",
            background: hovered ? exp.accent : "transparent",
            color: hovered ? "#0a0a0a" : exp.accent,
            fontFamily: "'VT323', monospace",
            fontSize: "1.3rem",
            border: `2px solid ${exp.accent}`,
            padding: "0.45rem 1.5rem",
            cursor: "pointer",
            letterSpacing: "0.1em",
            transition: "background 0.15s, color 0.15s, box-shadow 0.15s",
            boxShadow: hovered ? `0 0 20px ${exp.accent}88` : "none",
            filter: exploding ? "brightness(4) saturate(0)" : "none",
            whiteSpace: "nowrap",
          }}
        >
          PICK THIS →
        </button>
      </div>
    </div>
  );
}
