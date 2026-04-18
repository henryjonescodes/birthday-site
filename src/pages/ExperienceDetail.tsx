import { useParams, useNavigate } from "react-router-dom";
import { EXPERIENCES, YOUR_NAME } from "../config";

export default function ExperienceDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const exp = EXPERIENCES.find((e) => e.id === id);

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
      <div
        style={{
          padding: "1rem 1.5rem",
          borderBottom: "1px solid #1a1a1a",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          flexShrink: 0,
        }}
      >
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
        <h2
          style={{
            fontFamily: "'VT323', monospace",
            color: "#e0e0e0",
            fontSize: "clamp(1.3rem, 4vw, 1.8rem)",
            margin: 0,
            lineHeight: 1,
          }}
        >
          {exp.title}
        </h2>
        <span
          style={{
            marginLeft: "auto",
            fontFamily: "'VT323', monospace",
            color: "#00ffe1",
            fontSize: "1rem",
            opacity: 0.7,
            whiteSpace: "nowrap",
          }}
        >
          {exp.tickets} tickets (+1 if {YOUR_NAME} comes)
        </span>
      </div>

      {/* Description */}
      <div
        className="fade-in"
        style={{
          padding: "1rem 1.5rem 0.75rem",
          borderBottom: "1px solid #1a1a1a",
          flexShrink: 0,
        }}
      >
        <p
          style={{
            fontFamily: "'Special Elite', cursive",
            color: "#aaa",
            fontSize: "0.9rem",
            margin: 0,
          }}
        >
          {exp.description}
        </p>
      </div>

      {/* Iframe */}
      <iframe
        src={exp.url}
        title={exp.title}
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        style={{
          flex: 1,
          width: "100%",
          border: "none",
          minHeight: "calc(100vh - 140px)",
        }}
      />
    </div>
  );
}
