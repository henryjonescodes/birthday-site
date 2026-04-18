import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { EXPERIENCES } from "../config";

// ─── Phase 1: XP-style chunky progress bar ───────────────────────────────────
const XP_STEPS = [
  "Initializing asha_bday.exe...",
  "Loading core memories...",
  "Calibrating vibes...",
  "Compiling 18 years of awesome...",
  "Almost done...",
  "DONE!",
];

function Phase1({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 3600;
    const stepMs = duration / XP_STEPS.length;

    const stepTimer = setInterval(() => setStep((s) => Math.min(s + 1, XP_STEPS.length - 1)), stepMs);
    const progTimer = setInterval(() => setProgress((p) => Math.min(p + 1.4, 100)), duration / 70);
    const done = setTimeout(onDone, duration + 300);

    return () => { clearInterval(stepTimer); clearInterval(progTimer); clearTimeout(done); };
  }, [onDone]);

  return (
    <div style={{ textAlign: "center", maxWidth: 520, width: "100%" }}>
      <div style={{
        background: "#000080",
        border: "2px solid #aaa",
        borderRadius: 0,
        padding: "2rem 2.5rem",
        boxShadow: "4px 4px 0 #000, inset 1px 1px 0 #fff, inset -1px -1px 0 #555",
      }}>
        {/* Title bar */}
        <div style={{
          background: "linear-gradient(90deg, #000080, #1084d0)",
          margin: "-2rem -2.5rem 1.5rem",
          padding: "0.3rem 0.75rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <span style={{ fontFamily: "'VT323', monospace", color: "#fff", fontSize: "1rem" }}>
            🎂 asha_birthday_v18.exe
          </span>
          <span style={{ fontFamily: "'VT323', monospace", color: "#fff", fontSize: "1rem", opacity: 0.6 }}>
            ✕
          </span>
        </div>

        <p style={{ fontFamily: "'Special Elite', cursive", color: "#c0c0ff", fontSize: "0.9rem", marginBottom: "1.25rem" }}>
          Please wait while your surprise is being prepared...
        </p>

        {/* XP-style segmented progress bar */}
        <div style={{
          width: "100%",
          height: 26,
          background: "#1a1a3e",
          border: "2px inset #555",
          overflow: "hidden",
          marginBottom: "0.75rem",
          position: "relative",
        }}>
          <div style={{
            height: "100%",
            width: `${progress}%`,
            background: "repeating-linear-gradient(90deg, #3a6bc4 0px, #3a6bc4 12px, #6090e0 12px, #6090e0 14px)",
            transition: "width 0.08s linear",
            boxShadow: "0 0 8px #6090e0aa",
          }} />
        </div>

        <p style={{ fontFamily: "'VT323', monospace", color: "#a0a0ff", fontSize: "1.1rem", minHeight: "1.4em" }}>
          {XP_STEPS[step]}
        </p>
        <p style={{ fontFamily: "'VT323', monospace", color: "#555", fontSize: "0.9rem", marginTop: "0.25rem" }}>
          {Math.round(progress)}%
        </p>
      </div>
    </div>
  );
}

// ─── Phase 2: Garbled preview + fake error ────────────────────────────────────
const GLITCH_CHARS = "█▓▒░▄▀■□▪▫◘◙◆◇○●★☆∆Ω∑∞≈≠∂∫∏√±×÷≤≥@#$%&*!?~^`|\\{}[]<>";

function scramble(str: string, amount = 0.6): string {
  return str.split("").map((c) =>
    c !== " " && Math.random() < amount
      ? GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
      : c
  ).join("");
}

function Phase2({ onDone }: { onDone: () => void }) {
  const [showError, setShowError] = useState(false);
  const [lines, setLines] = useState(() =>
    EXPERIENCES.map((e) => ({ title: scramble(e.title, 0.85), desc: scramble(e.description, 0.9) }))
  );

  useEffect(() => {
    const scrambleInterval = setInterval(() => {
      setLines(EXPERIENCES.map((e) => ({
        title: scramble(e.title, 0.6 + Math.random() * 0.3),
        desc: scramble(e.description, 0.7 + Math.random() * 0.25),
      })));
    }, 80);

    const errorTimer = setTimeout(() => {
      clearInterval(scrambleInterval);
      setShowError(true);
    }, 3000);

    const doneTimer = setTimeout(onDone, 5200);

    return () => { clearInterval(scrambleInterval); clearTimeout(errorTimer); clearTimeout(doneTimer); };
  }, [onDone]);

  if (showError) return <ErrorScreen />;

  return (
    <div style={{ textAlign: "left", maxWidth: 560, width: "100%", position: "relative" }}>
      {/* Fake landing preview */}
      <div style={{ opacity: 0.55, pointerEvents: "none", filter: "hue-rotate(30deg) saturate(0.7)" }}>
        <h1 style={{
          fontFamily: "'VT323', monospace",
          fontSize: "clamp(1.8rem, 6vw, 3.5rem)",
          color: "#00ffe1",
          lineHeight: 1.1,
          marginBottom: "0.5rem",
          textShadow: "3px 0 #ff003c, -3px 0 #00ffe1",
        }}>
          ★ {scramble("HAPPY 18th BIRTHDAY ASHA", 0.3)} ★
        </h1>
        <p style={{ fontFamily: "'Special Elite', cursive", color: "#aaa", fontSize: "0.8rem", marginBottom: "1.5rem" }}>
          {scramble("ok so i couldn't just get you like... a candle or whatever", 0.4)}
        </p>
        {lines.map((l, i) => (
          <div key={i} style={{
            background: "rgba(0,255,225,0.04)",
            border: "1px solid #222",
            borderRadius: 4,
            padding: "1rem 1.25rem",
            marginBottom: "0.75rem",
          }}>
            <div style={{ fontFamily: "'VT323', monospace", color: "#e0e0e0", fontSize: "1.4rem", lineHeight: 1 }}>
              {String(i + 1).padStart(2, "0")} / {l.title}
            </div>
            <p style={{ fontFamily: "'Special Elite', cursive", color: "#777", fontSize: "0.78rem", marginTop: "0.4rem" }}>
              {l.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Overlay glitch bars */}
      <div style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} style={{
            position: "absolute",
            left: 0, right: 0,
            height: `${4 + Math.random() * 8}px`,
            top: `${10 + i * 17}%`,
            background: `rgba(${Math.random() > 0.5 ? "0,255,225" : "255,0,60"},0.15)`,
            transform: `translateX(${(Math.random() - 0.5) * 20}px)`,
            animation: "glitchBar 0.15s infinite alternate",
          }} />
        ))}
      </div>

      <p style={{
        fontFamily: "'VT323', monospace",
        color: "#555",
        fontSize: "0.85rem",
        textAlign: "center",
        marginTop: "0.5rem",
      }}>
        RENDERING PREVIEW... DO NOT CLOSE WINDOW
      </p>
    </div>
  );
}

function ErrorScreen() {
  return (
    <div style={{
      background: "#0000aa",
      minHeight: "100vh",
      width: "100%",
      position: "fixed",
      inset: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 100,
      padding: "2rem",
    }}>
      <div style={{ maxWidth: 560, color: "#fff" }}>
        <p style={{ fontFamily: "'VT323', monospace", fontSize: "1.6rem", marginBottom: "1rem" }}>
          A fatal exception 0E has occurred at 0028:C0011E36 in VXD VMM(01) +
          00010E36. The current application will be terminated.
        </p>
        <p style={{ fontFamily: "'Special Elite', cursive", fontSize: "0.9rem", marginBottom: "2rem", lineHeight: 1.7 }}>
          * Press any key to terminate the current application.<br />
          * Press CTRL+ALT+DEL to restart your computer. You will<br />
          &nbsp;&nbsp;lose any unsaved information in all applications.<br />
          <br />
          Press any key to continue <span className="blink">_</span>
        </p>
        <p style={{
          fontFamily: "'VT323', monospace",
          fontSize: "1rem",
          color: "#aaaaff",
          borderTop: "1px solid #aaaaff",
          paddingTop: "0.75rem",
        }}>
          jk jk jk loading ur actual gift now...
        </p>
      </div>
    </div>
  );
}

// ─── Phase 3: Dial-up modem ASCII ────────────────────────────────────────────
const MODEM_LINES = [
  "ATDT 1-800-BIRTHDAY",
  "CONNECT 56000",
  "NO CARRIER",
  "REDIALING...",
  "ATDT 1-800-BIRTHDAY",
  "CONNECT 56000",
  "USER: asha",
  "PASS: ********",
  "Welcome to the SURPRISE.NET",
  "Downloading gift_data.zip......",
  "[##########----------] 48%",
  "[####################] 100%",
  "Unzipping... OK",
  "Mounting birthday filesystem...",
  "READY.",
];

function Phase3({ onDone }: { onDone: () => void }) {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let i = 0;
    const delays = MODEM_LINES.map(() => 180 + Math.random() * 200);

    function addLine() {
      if (i >= MODEM_LINES.length) {
        setTimeout(onDone, 900);
        return;
      }
      setVisibleLines((l) => [...l, MODEM_LINES[i]]);
      setTimeout(addLine, delays[i]);
      i++;
    }

    const t = setTimeout(addLine, 400);
    return () => clearTimeout(t);
  }, [onDone]);

  useEffect(() => {
    containerRef.current?.scrollTo(0, 9999);
  }, [visibleLines]);

  return (
    <div style={{ maxWidth: 520, width: "100%" }}>
      <div style={{
        background: "#000",
        border: "2px solid #333",
        borderRadius: 2,
        padding: "1.25rem 1.5rem",
        maxHeight: "70vh",
        overflowY: "auto",
        scrollbarWidth: "none",
      }} ref={containerRef}>
        {visibleLines.map((line, i) => (
          <div key={i} style={{
            fontFamily: "'VT323', monospace",
            fontSize: "1.05rem",
            color: line === "READY." ? "#00ff41" : "#00ffe1",
            lineHeight: 1.6,
            letterSpacing: "0.04em",
          }}>
            {line}
          </div>
        ))}
        <span className="blink" style={{ fontFamily: "'VT323', monospace", color: "#00ffe1", fontSize: "1.05rem" }}>█</span>
      </div>
    </div>
  );
}

// ─── Orchestrator ─────────────────────────────────────────────────────────────
export default function LoadingScreen() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<1 | 2 | 3>(1);
  const [fading, setFading] = useState(false);

  function goHome() {
    setFading(true);
    setTimeout(() => navigate("/home"), 700);
  }

  return (
    <div
      className="scanlines"
      style={{
        minHeight: "100vh",
        background: "#0a0a0a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        opacity: fading ? 0 : 1,
        transition: "opacity 0.7s ease",
      }}
    >
      {phase === 1 && <Phase1 onDone={() => setPhase(2)} />}
      {phase === 2 && <Phase2 onDone={() => setPhase(3)} />}
      {phase === 3 && <Phase3 onDone={goHome} />}
    </div>
  );
}
