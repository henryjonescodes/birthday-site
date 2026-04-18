import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const STEPS = [
  "loading memories...",
  "compiling awesome...",
  "unzipping birthday.zip...",
  "almost there...",
  "done!!",
];

export default function LoadingScreen() {
  const navigate = useNavigate();
  const [stepIndex, setStepIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const total = 3200;
    const stepInterval = total / STEPS.length;

    const stepTimer = setInterval(() => {
      setStepIndex((i) => Math.min(i + 1, STEPS.length - 1));
    }, stepInterval);

    const progTimer = setInterval(() => {
      setProgress((p) => Math.min(p + 2, 100));
    }, total / 50);

    const doneTimer = setTimeout(() => {
      setFading(true);
      setTimeout(() => navigate("/home"), 600);
    }, total + 400);

    return () => {
      clearInterval(stepTimer);
      clearInterval(progTimer);
      clearTimeout(doneTimer);
    };
  }, [navigate]);

  return (
    <div
      className="scanlines min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a] px-4"
      style={{ opacity: fading ? 0 : 1, transition: "opacity 0.6s ease" }}
    >
      <div style={{ maxWidth: 480, width: "100%", textAlign: "center" }}>
        <h2
          style={{
            fontFamily: "'VT323', monospace",
            fontSize: "clamp(1.5rem, 5vw, 2.5rem)",
            color: "#00ffe1",
            marginBottom: "2rem",
            letterSpacing: "0.05em",
          }}
        >
          LOADING...
        </h2>

        {/* progress bar container */}
        <div
          style={{
            width: "100%",
            height: 28,
            background: "#111",
            border: "2px solid #333",
            borderRadius: 2,
            overflow: "hidden",
            marginBottom: "1.25rem",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${progress}%`,
              background: "linear-gradient(90deg, #00ffe1, #00b8a9)",
              transition: "width 0.1s linear",
              boxShadow: "0 0 10px #00ffe1aa",
            }}
          />
        </div>

        <p
          style={{
            fontFamily: "'Special Elite', cursive",
            color: "#777",
            fontSize: "0.85rem",
            minHeight: "1.4em",
          }}
        >
          {STEPS[stepIndex]}
        </p>

        <p
          style={{
            fontFamily: "'VT323', monospace",
            color: "#444",
            fontSize: "1.1rem",
            marginTop: "2rem",
          }}
        >
          {progress}%
        </p>
      </div>
    </div>
  );
}
