import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { PASSWORD } from "../config";

const PALETTE = ["#00ffe1", "#ff003c", "#ffe600", "#ff6ec7", "#00ff41", "#a259ff"];

function useDVD(boxW: number, boxH: number) {
  const [pos, setPos] = useState({ x: 120, y: 80 });

  const [color, setColor] = useState(PALETTE[0]);
  const posRef = useRef({ x: 120, y: 80 });
  const velRef = useRef({ x: 2.2, y: 1.7 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (boxW === 0 || boxH === 0) return;
    let lastColor = PALETTE[0];

    function tick() {
      const p = posRef.current;
      const v = velRef.current;
      let nx = p.x + v.x;
      let ny = p.y + v.y;
      let nvx = v.x;
      let nvy = v.y;
      let bounced = false;

      if (nx <= 0 || nx + boxW >= window.innerWidth) {
        nvx = -nvx;
        nx = Math.max(0, Math.min(nx, window.innerWidth - boxW));
        bounced = true;
      }
      if (ny <= 0 || ny + boxH >= window.innerHeight) {
        nvy = -nvy;
        ny = Math.max(0, Math.min(ny, window.innerHeight - boxH));
        bounced = true;
      }

      if (bounced) {
        const remaining = PALETTE.filter((c) => c !== lastColor);
        lastColor = remaining[Math.floor(Math.random() * remaining.length)];
        setColor(lastColor);
      }

      posRef.current = { x: nx, y: ny };
      velRef.current = { x: nvx, y: nvy };
      setPos({ x: nx, y: ny });
      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [boxW, boxH]);

  return { pos, color };
}

const isMobile = () => window.innerWidth < 640;

export default function PasswordGate() {
  const [input, setInput] = useState("");
  const [shaking, setShaking] = useState(false);
  const [error, setError] = useState(false);
  const unlock = useAuthStore((s) => s.unlock);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [boxSize, setBoxSize] = useState({ w: 0, h: 0 });
  const mobile = isMobile();
  const BOX_W = mobile ? 272 : 340;

  const isDebug = new URLSearchParams(window.location.search).has("debug");
  const reset = useAuthStore((s) => s.reset);

  useEffect(() => {
    if (!boxRef.current) return;
    const { offsetWidth: w, offsetHeight: h } = boxRef.current;
    setBoxSize({ w, h });
  }, [BOX_W]);

  const { pos, color } = useDVD(boxSize.w, boxSize.h);

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
    <div
      className="scanlines"
      style={{ position: "fixed", inset: 0, background: "#0a0a0a", overflow: "hidden" }}
    >
      {/* Bouncing block */}
      <div
        ref={boxRef}
        className={shaking ? "shake" : ""}
        style={{
          position: "absolute",
          left: pos.x,
          top: pos.y,
          width: BOX_W,
          padding: mobile ? "1.1rem" : "1.5rem",
          background: "rgba(10,10,10,0.92)",
          border: `2px solid ${color}`,
          boxShadow: `0 0 24px ${color}55, 0 0 6px ${color}33`,
          textAlign: "center",
          transition: "border-color 0.15s, box-shadow 0.15s",
          willChange: "transform",
        }}
      >
        <h1
          className="glitch-text"
          style={{
            fontFamily: "'VT323', monospace",
            fontSize: mobile ? "1.5rem" : "1.9rem",
            color,
            letterSpacing: "0.05em",
            lineHeight: 1,
            margin: "0 0 0.35rem",
            transition: "color 0.15s",
          }}
        >
          ★ ENTER PASSWORD ★
        </h1>

        <p style={{ fontFamily: "'Special Elite', cursive", color: "#777", fontSize: "0.75rem", marginBottom: "1rem" }}>
          this site is 4 ur eyes only
        </p>

        <div
          style={{
            border: `1px solid ${error ? "#ff003c" : "#333"}`,
            borderRadius: 2,
            padding: "0.5rem 0.75rem",
            display: "flex",
            alignItems: "center",
            background: "#111",
            transition: "border-color 0.2s",
          }}
        >
          <span style={{ color, fontFamily: "'VT323', monospace", fontSize: "1.3rem", transition: "color 0.15s" }}>
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
              fontSize: "1.3rem",
              flex: 1,
              caretColor: color,
              width: 0,
            }}
          />
          <span className="blink" style={{ color, fontFamily: "'VT323', monospace", fontSize: "1.3rem", transition: "color 0.15s" }}>_</span>
        </div>

        {error && (
          <p style={{ color: "#ff003c", fontFamily: "'VT323', monospace", fontSize: "1rem", marginTop: "0.4rem" }}>
            ACCESS DENIED. try again.
          </p>
        )}

        <button
          onClick={submit}
          style={{
            marginTop: "1rem",
            background: color,
            color: "#0a0a0a",
            fontFamily: "'VT323', monospace",
            fontSize: "1.3rem",
            border: "none",
            padding: "0.4rem 1.75rem",
            cursor: "pointer",
            letterSpacing: "0.1em",
            transition: "background 0.15s",
            width: "100%",
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
            zIndex: 9999,
          }}
        >
          [DEBUG] RESET AUTH
        </button>
      )}
    </div>
  );
}
