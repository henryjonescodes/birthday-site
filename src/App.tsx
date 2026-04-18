import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/authStore";
import PasswordGate from "./pages/PasswordGate";
import LoadingScreen from "./pages/LoadingScreen";
import Landing from "./pages/Landing";
import ExperienceDetail from "./pages/ExperienceDetail";

function RequireAuth({ children }: { children: React.ReactNode }) {
  const unlocked = useAuthStore((s) => s.unlocked);
  return unlocked ? <>{children}</> : <Navigate to="/" replace />;
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
              <LoadingScreen />
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
