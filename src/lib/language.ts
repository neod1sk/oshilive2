import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { Language } from "./i18n";

type LanguageState = {
  language: Language;
  setLanguage: (lang: Language) => void;
};

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: "ja",
      setLanguage: (lang) => set({ language: lang })
    }),
    {
      name: "oshi-light-live-language",
      partialize: (state) => ({ language: state.language })
    }
  )
);

export const useLanguage = () => useLanguageStore((state) => state.language);
export const useSetLanguage = () => useLanguageStore((state) => state.setLanguage);

