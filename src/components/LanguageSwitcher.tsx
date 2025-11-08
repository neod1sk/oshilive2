import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useLanguage, useSetLanguage } from "../lib/language";
import type { Language } from "../lib/i18n";

const languages: { code: Language; label: string; flag: string }[] = [
  { code: "ja", label: "日本語", flag: "🇯🇵" },
  { code: "ko", label: "한국어", flag: "🇰🇷" },
  { code: "en", label: "English", flag: "🇺🇸" }
];

export const LanguageSwitcher = () => {
  const currentLanguage = useLanguage();
  const setLanguage = useSetLanguage();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <motion.button
        className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-2 text-xs font-mono tracking-[0.2em] text-white/80 backdrop-blur"
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{languages.find((l) => l.code === currentLanguage)?.flag}</span>
        <span>{languages.find((l) => l.code === currentLanguage)?.label}</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 top-full mt-2 z-50 rounded-2xl border border-white/20 bg-black/80 backdrop-blur-lg shadow-lg overflow-hidden"
            >
            {languages.map((lang) => (
              <button
                key={lang.code}
                type="button"
                onClick={() => {
                  setLanguage(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-2 text-left text-xs font-mono tracking-[0.2em] transition ${
                  currentLanguage === lang.code
                    ? "bg-white/20 text-white"
                    : "text-white/70 hover:bg-white/10"
                }`}
              >
                <span className="mr-2">{lang.flag}</span>
                {lang.label}
              </button>
            ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

