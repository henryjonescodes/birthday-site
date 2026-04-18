import { useNavigate } from "react-router-dom";
import { EXPERIENCES, YOUR_NAME } from "../config";
import { useAuthStore } from "../store/authStore";

export default function Landing() {
  const navigate = useNavigate();
  const reset = useAuthStore((s) => s.reset);
  const isDebug = new URLSearchParams(window.location.search).has("debug");

  return (
    <div className="scanlines min-h-screen flex flex-col items-center bg-[#0a0a0a] px-4 py-12">
      {/* Header */}
      <div className="fade-in text-center mb-4">
        <h1
          className="glitch-text"
          style={{
            fontFamily: "'VT323', monospace",
            fontSize: "clamp(2.2rem, 8vw, 5rem)",
            color: "#00ffe1",
            lineHeight: 1.1,
            letterSpacing: "0.03em",
            margin: 0,
          }}
        >
          ★ HAPPY 18th BIRTHDAY ASHA ★
        </h1>
        <p
          style={{
            fontFamily: "'Special Elite', cursive",
            color: "#aaa",
            fontSize: "clamp(0.85rem, 2.5vw, 1.1rem)",
            marginTop: "0.75rem",
          }}
        >
          ok so i couldn't just get you like... a candle or whatever
        </p>
        <p
          style={{
            fontFamily: "'Special Elite', cursive",
            color: "#666",
            fontSize: "0.85rem",
            marginTop: "0.25rem",
          }}
        >
          pick your gift. each one comes with 2 tickets — and if i come with you, +1 more.
        </p>
      </div>

      <div
        style={{
          width: "100%",
          height: 1,
          background: "linear-gradient(90deg, transparent, #333, transparent)",
          margin: "1.5rem 0",
        }}
      />

      {/* Experience cards */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem",
          width: "100%",
          maxWidth: 600,
        }}
      >
        {EXPERIENCES.map((exp, i) => (
          <button
            key={exp.id}
            className="card-enter"
            onClick={() => navigate(`/${exp.id}`)}
            style={{
              animationDelay: `${0.4 + i * 0.35}s`,
              background: "rgba(0,255,225,0.04)",
              border: "1px solid #222",
              borderRadius: 4,
              padding: "1.25rem 1.5rem",
              cursor: "pointer",
              textAlign: "left",
              transition: "border-color 0.2s, box-shadow 0.2s, background 0.2s",
              outline: "none",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLButtonElement;
              el.style.borderColor = "#00ffe1";
              el.style.boxShadow = "0 0 18px rgba(0,255,225,0.15)";
              el.style.background = "rgba(0,255,225,0.08)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLButtonElement;
              el.style.borderColor = "#222";
              el.style.boxShadow = "none";
              el.style.background = "rgba(0,255,225,0.04)";
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}>
              <span
                style={{
                  fontFamily: "'VT323', monospace",
                  fontSize: "clamp(1.4rem, 4vw, 1.9rem)",
                  color: "#e0e0e0",
                  lineHeight: 1,
                }}
              >
                {String(i + 1).padStart(2, "0")} / {exp.title}
              </span>
              <span
                style={{
                  fontFamily: "'VT323', monospace",
                  fontSize: "1rem",
                  color: "#00ffe1",
                  whiteSpace: "nowrap",
                  opacity: 0.7,
                }}
              >
                {exp.tickets} tickets
              </span>
            </div>
            <p
              style={{
                fontFamily: "'Special Elite', cursive",
                color: "#777",
                fontSize: "0.82rem",
                marginTop: "0.5rem",
              }}
            >
              {exp.description}
            </p>
            <p
              style={{
                fontFamily: "'Special Elite', cursive",
                color: "#444",
                fontSize: "0.75rem",
                marginTop: "0.35rem",
              }}
            >
              +1 if {YOUR_NAME} comes along →
            </p>
          </button>
        ))}
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
          }}
        >
          [DEBUG] RESET AUTH
        </button>
      )}
    </div>
  );
}
