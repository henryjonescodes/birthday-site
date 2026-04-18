import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom"; // fallback when used standalone

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
export default function LoadingScreen({ onDone }: { onDone?: () => void }) {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<1 | 3>(1);

  function goHome() {
    if (onDone) {
      onDone();
    } else {
      navigate("/home");
    }
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
      }}
    >
      {phase === 1 && <Phase1 onDone={() => setPhase(3)} />}
      {phase === 3 && <Phase3 onDone={goHome} />}
    </div>
  );
}
