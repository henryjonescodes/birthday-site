import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  unlocked: boolean;
  unlock: () => void;
  reset: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      unlocked: false,
      unlock: () => set({ unlocked: true }),
      reset: () => set({ unlocked: false }),
    }),
    { name: "asha-auth" }
  )
);
