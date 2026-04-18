import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { PASSWORD } from "../config";

export default function PasswordGate() {
  const [input, setInput] = useState("");
  const [shaking, setShaking] = useState(false);
  const [error, setError] = useState(false);
  const unlock = useAuthStore((s) => s.unlock);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const isDebug = new URLSearchParams(window.location.search).has("debug");
  const reset = useAuthStore((s) => s.reset);

  function submit() {
    if (input.trim().toLowerCase() === PASSWORD.toLowerCase()) {
      unlock();
      navigate("/loading");
    } else {
      setError(true);
      setShaking(true);
      setInput("");
      setTimeout(() => setShaking(false), 600);
      setTimeout(() => setError(false), 2000);
      inputRef.current?.focus();
    }
  }

  return (
    <div className="scanlines min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a] px-4">
      <div
        className="text-center"
        style={{ maxWidth: 480, width: "100%" }}
      >
        <h1
          className="glitch-text mb-2"
          style={{
            fontFamily: "'VT323', monospace",
            fontSize: "clamp(2rem, 8vw, 4.5rem)",
            color: "#00ffe1",
            letterSpacing: "0.05em",
            lineHeight: 1,
          }}
        >
          ★ ENTER PASSWORD ★
        </h1>

        <p
          style={{
            fontFamily: "'Special Elite', cursive",
            color: "#888",
            fontSize: "0.9rem",
            marginBottom: "2rem",
          }}
        >
          this site is 4 ur eyes only
        </p>

        <div
          className={shaking ? "shake" : ""}
          style={{
            border: `2px solid ${error ? "#ff003c" : "#333"}`,
            borderRadius: 4,
            padding: "0.75rem 1rem",
            display: "flex",
            alignItems: "center",
            background: "#111",
            transition: "border-color 0.2s",
          }}
        >
          <span style={{ color: "#00ffe1", fontFamily: "'VT323', monospace", fontSize: "1.4rem" }}>
            &gt;&nbsp;
          </span>
          <input
            ref={inputRef}
            type="password"
            autoFocus
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            style={{
              background: "transparent",
              border: "none",
              outline: "none",
              color: "#e0e0e0",
              fontFamily: "'VT323', monospace",
              fontSize: "1.4rem",
              flex: 1,
              caretColor: "#00ffe1",
            }}
          />
          <span className="blink" style={{ color: "#00ffe1", fontFamily: "'VT323', monospace", fontSize: "1.4rem" }}>
            _
          </span>
        </div>

        {error && (
          <p style={{ color: "#ff003c", fontFamily: "'VT323', monospace", fontSize: "1.1rem", marginTop: "0.5rem" }}>
            ACCESS DENIED. try again.
          </p>
        )}

        <button
          onClick={submit}
          style={{
            marginTop: "1.5rem",
            background: "#00ffe1",
            color: "#0a0a0a",
            fontFamily: "'VT323', monospace",
            fontSize: "1.4rem",
            border: "none",
            padding: "0.5rem 2rem",
            cursor: "pointer",
            letterSpacing: "0.1em",
          }}
        >
          ENTER →
        </button>
      </div>

      {isDebug && (
        <button
          onClick={() => { reset(); window.location.reload(); }}
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
