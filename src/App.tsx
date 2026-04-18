import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import { useAuthStore } from "./store/authStore";
import PasswordGate from "./pages/PasswordGate";
import LoadingScreen from "./pages/LoadingScreen";
import Landing from "./pages/Landing";
import ExperienceDetail from "./pages/ExperienceDetail";

function RequireAuth({ children }: { children: React.ReactNode }) {
  const unlocked = useAuthStore((s) => s.unlocked);
  return unlocked ? <>{children}</> : <Navigate to="/" replace />;
}

// Renders Landing in background while loader sits on top — no navigation on done,
// just fade the loader out to reveal the already-loaded Landing underneath.
function LoadingWithPreload() {
  const [loaderGone, setLoaderGone] = useState(false);
  const [loaderFading, setLoaderFading] = useState(false);

  function onLoadingDone() {
    setLoaderFading(true);
    setTimeout(() => setLoaderGone(true), 700);
  }

  return (
    <div style={{ position: "fixed", inset: 0 }}>
      {/* Landing always mounted and rendered — iframes preload immediately */}
      <div style={{ position: "absolute", inset: 0, visibility: loaderGone ? "visible" : "hidden" }}>
        <Landing />
      </div>

      {/* Loader overlaid on top, fades out then unmounts */}
      {!loaderGone && (
        <div style={{
          position: "absolute",
          inset: 0,
          zIndex: 10,
          opacity: loaderFading ? 0 : 1,
          transition: "opacity 0.7s ease",
        }}>
          <LoadingScreen onDone={onLoadingDone} />
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PasswordGate />} />
        <Route
          path="/loading"
          element={
            <RequireAuth>
              <LoadingWithPreload />
            </RequireAuth>
          }
        />
        <Route
          path="/home"
          element={
            <RequireAuth>
              <Landing />
            </RequireAuth>
          }
        />
        <Route
          path="/:id"
          element={
            <RequireAuth>
              <ExperienceDetail />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
