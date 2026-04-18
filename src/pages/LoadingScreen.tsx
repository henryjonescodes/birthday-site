import { useEffect, useState, useRef } from "react";
import type { CSSProperties } from "react";
import { useNavigate } from "react-router-dom";

// ─── Phase 1a: XP loader — runs to ~52% then "crashes" ───────────────────────
const STEPS_A = [
  "Initializing asha_bday.exe...",
  "Loading core memories...",
  "Calibrating vibes...",
  "Compiling 18 years of awesome...",
];

function Phase1A({ onDone }: { onDone: (frozenAt: number) => void }) {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0);

  useEffect(() => {
    const TARGET = 52;
    const duration = 2800;
    const stepMs = duration / STEPS_A.length;

    const stepTimer = setInterval(
      () => setStep((s) => Math.min(s + 1, STEPS_A.length - 1)),
      stepMs,
    );

    const progTimer = setInterval(() => {
      const next = Math.min(progressRef.current + 1.3, TARGET);
      progressRef.current = next;
      setProgress(next);
      if (next >= TARGET) {
        clearInterval(progTimer);
        clearInterval(stepTimer);
        setTimeout(() => onDone(next), 400);
      }
    }, duration / 40);

    return () => { clearInterval(stepTimer); clearInterval(progTimer); };
  }, [onDone]);

  return <XPWindow step={STEPS_A[step]} progress={progress} />;
}

// ─── Phase 2: BSOD — lines print in ──────────────────────────────────────────
const BSOD_LINES: { text: string; style?: CSSProperties }[] = [
  { text: "A problem has been detected and Windows has been shut down to prevent damage to your birthday.", style: { fontSize: "1rem", marginBottom: "1rem" } },
  { text: "BIRTHDAY_INIT_EXCEPTION", style: { fontSize: "1.5rem", letterSpacing: "0.05em", marginBottom: "1rem" } },
  { text: "If this is the first time you've seen this error screen, restart your excitement." },
  { text: "If this screen appears again, follow these steps:" },
  { text: "" },
  { text: "Check to make sure any new hardware or software is properly installed." },
  { text: "If this is a new installation, ask your gift-giver for any updates you might need." },
  { text: "" },
  { text: "Technical information:" },
  { text: "*** STOP: 0x0000BDAY (0x00000018, 0xASHA0000, 0x48455259, 0x0000GIFT)", style: { color: "#fff" } },
  { text: "" },
  { text: "Running diagnostic repair... please wait", style: { color: "#aaa", fontSize: "0.9rem" } },
];

function PhaseBSOD({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let i = 0;
    const delays = [80, 300, 250, 200, 50, 220, 220, 50, 180, 300, 80, 500];

    function addLine() {
      if (i >= BSOD_LINES.length) {
        setTimeout(onDone, 900);
        return;
      }
      setCount(i + 1);
      setTimeout(addLine, delays[i] ?? 200);
      i++;
    }
    const t = setTimeout(addLine, 120);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "#0000aa",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "2.5rem",
    }}>
      <div style={{ maxWidth: 580, width: "100%", color: "#ccc", fontFamily: "'VT323', monospace", fontSize: "0.95rem", lineHeight: 1.7 }}>
        {BSOD_LINES.slice(0, count).map((l, i) =>
          l.text === "" ? <div key={i} style={{ height: "0.8rem" }} /> : (
            <div key={i} style={l.style}>{l.text}</div>
          )
        )}
      </div>
    </div>
  );
}

// ─── Phase 3: Repair terminal — deliberate pauses ────────────────────────────
const REPAIR_LINES: { text: string; delay: number }[] = [
  { text: "> DIAGNOSTIC INITIATED",                         delay: 300  },
  { text: "> Scanning birthday_core.dll...",                delay: 600  },
  { text: "> ERROR: vibes.sys corrupted at 0x52",           delay: 250  },
  { text: "> Isolating corrupt segment...",                  delay: 900  },
  { text: "> Downloading patch_v18.bin............",         delay: 1100 },
  { text: "> Checksum OK",                                  delay: 220  },
  { text: "> Patching memory blocks [===========] done",    delay: 950  },
  { text: "> Flushing vibes cache...",                      delay: 500  },
  { text: "> Restarting birthday sequence",                 delay: 400  },
  { text: "> REPAIR COMPLETE. Resuming.",                   delay: 200  },
];

function PhaseRepair({ onDone }: { onDone: () => void }) {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let i = 0;

    function addLine() {
      if (i >= REPAIR_LINES.length) {
        setTimeout(onDone, 800);
        return;
      }
      const { text, delay } = REPAIR_LINES[i];
      setVisibleLines((l) => [...l, text]);
      i++;
      setTimeout(addLine, delay);
    }

    const t = setTimeout(addLine, 400);
    return () => clearTimeout(t);
  }, [onDone]);

  useEffect(() => {
    containerRef.current?.scrollTo(0, 9999);
  }, [visibleLines]);

  return (
    <div style={{ maxWidth: 520, width: "100%" }}>
      <div
        ref={containerRef}
        style={{
          background: "#000",
          border: "2px solid #333",
          borderRadius: 2,
          padding: "1.25rem 1.5rem",
          maxHeight: "70vh",
          overflowY: "auto",
          scrollbarWidth: "none",
        }}
      >
        {visibleLines.map((line, i) => (
          <div key={i} style={{
            fontFamily: "'VT323', monospace",
            fontSize: "1.05rem",
            color: line.startsWith("> REPAIR") ? "#00ff41" : line.startsWith("> ERROR") ? "#ff4444" : "#00ffe1",
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

// ─── Phase 1b: XP loader resumed from ~52% ───────────────────────────────────
const STEPS_B = [
  "Resuming from checkpoint...",
  "Re-compiling 18 years of awesome...",
  "Almost done...",
  "DONE!",
];

function Phase1B({ startAt, onDone }: { startAt: number; onDone: () => void }) {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(startAt);
  const doneRef = useRef(false);

  useEffect(() => {
    const duration = 2800;
    const remaining = 100 - startAt;
    const stepMs = duration / STEPS_B.length;
    const tickMs = duration / (remaining / 1.4);

    const stepTimer = setInterval(
      () => setStep((s) => Math.min(s + 1, STEPS_B.length - 1)),
      stepMs,
    );
    const progTimer = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(p + 1.4, 100);
        if (next >= 100 && !doneRef.current) {
          doneRef.current = true;
          clearInterval(progTimer);
          clearInterval(stepTimer);
          setTimeout(onDone, 500);
        }
        return next;
      });
    }, tickMs);

    return () => { clearInterval(stepTimer); clearInterval(progTimer); };
  }, [onDone, startAt]);

  return <XPWindow step={STEPS_B[step]} progress={progress} resumed />;
}

// ─── Shared XP window UI ─────────────────────────────────────────────────────
function XPWindow({ step, progress, resumed }: { step: string; progress: number; resumed?: boolean }) {
  return (
    <div style={{ textAlign: "center", maxWidth: 520, width: "100%" }}>
      <div style={{
        background: "#000080",
        border: "2px solid #aaa",
        borderRadius: 0,
        padding: "2rem 2.5rem",
        boxShadow: "4px 4px 0 #000, inset 1px 1px 0 #fff, inset -1px -1px 0 #555",
      }}>
        <div style={{
          background: "linear-gradient(90deg, #000080, #1084d0)",
          margin: "-2rem -2.5rem 1.5rem",
          padding: "0.3rem 0.75rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <span style={{ fontFamily: "'VT323', monospace", color: "#fff", fontSize: "1rem" }}>
            🎂 asha_birthday_v18.exe{resumed ? " [recovered]" : ""}
          </span>
          <span style={{ fontFamily: "'VT323', monospace", color: "#fff", fontSize: "1rem", opacity: 0.6 }}>✕</span>
        </div>

        <p style={{ fontFamily: "'Special Elite', cursive", color: "#c0c0ff", fontSize: "0.9rem", marginBottom: "1.25rem" }}>
          {resumed ? "Repair successful. Resuming your surprise..." : "Please wait while your surprise is being prepared..."}
        </p>

        <div style={{
          width: "100%",
          height: 26,
          background: "#1a1a3e",
          border: "2px inset #555",
          overflow: "hidden",
          marginBottom: "0.75rem",
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
          {step}
        </p>
        <p style={{ fontFamily: "'VT323', monospace", color: "#555", fontSize: "0.9rem", marginTop: "0.25rem" }}>
          {Math.round(progress)}%
        </p>
      </div>
    </div>
  );
}

// ─── Orchestrator ─────────────────────────────────────────────────────────────
type Phase = "1a" | "bsod" | "repair" | "1b";

export default function LoadingScreen({ onDone }: { onDone?: () => void }) {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>("1a");
  const [frozenAt, setFrozenAt] = useState(52);

  function goHome() {
    if (onDone) onDone();
    else navigate("/home");
  }

  return (
    <div
      className="scanlines"
      style={{
        minHeight: "100vh",
        background: phase === "bsod" ? "#0000aa" : "#0a0a0a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        transition: "background 0.1s",
      }}
    >
      {phase === "1a"    && <Phase1A   onDone={(at) => { setFrozenAt(at); setPhase("bsod"); }} />}
      {phase === "bsod"  && <PhaseBSOD onDone={() => setPhase("repair")} />}
      {phase === "repair"&& <PhaseRepair onDone={() => setPhase("1b")} />}
      {phase === "1b"    && <Phase1B   startAt={frozenAt} onDone={goHome} />}
    </div>
  );
}
