import { create } from "zustand";
import { persist } from "zustand/middleware";

type Language = "pt" | "en" | "es";

interface LanguageStore {
  language: Language;
  setLanguage: (language: Language) => void;
}

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set) => ({
      language: "pt",
      setLanguage: (language) => set({ language }),
    }),
    {
      name: "language-storage",
    }
  )
);
