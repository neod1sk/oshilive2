import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { LanguageSwitcher } from "../components/LanguageSwitcher";
import { useGameActions, useSettings } from "../game/store";
import { useTranslation } from "../hooks/useTranslation";
import { useLanguage } from "../lib/language";
import { translations } from "../lib/i18n";

export const TitlePage = () => {
  const navigate = useNavigate();
  const { startGame } = useGameActions();
  const settings = useSettings();
  const t = useTranslation();
  const language = useLanguage();
  const phrases = translations[language].phrases;

  const handleStart = () => {
    startGame();
    navigate("/play");
  };

  return (
    <main className="relative min-h-screen overflow-hidden px-6 pb-12 pt-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,46,147,0.25),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(126,91,239,0.2),transparent_60%)]" />
      <div className="absolute top-4 right-4 z-20">
        <LanguageSwitcher />
      </div>
      <div className="relative z-10 mx-auto flex max-w-lg flex-col items-center text-center gap-10">
        <motion.h1
          className="text-4xl font-display tracking-[0.35em] uppercase text-white drop-shadow-[0_0_24px_rgba(255,255,255,0.35)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 24 }}
        >
          {t("title")}
          <span className="block text-[42px] text-pink-200">{t("titleSub")}</span>
        </motion.h1>

        <motion.p
          className="text-sm leading-relaxed text-white/80 font-body"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          {phrases[Math.floor(Math.random() * phrases.length)]}
        </motion.p>

        <div className="flex flex-col gap-4 w-full">
          <motion.button
            className="w-full rounded-full bg-gradient-to-r from-pink-500 to-violet-500 py-4 text-lg font-display tracking-[0.4em] uppercase shadow-[0_20px_40px_rgba(255,46,147,0.35)]"
            whileTap={{ scale: 0.95 }}
            onClick={handleStart}
          >
            {t("start")}
          </motion.button>
          <motion.button
            className="w-full rounded-full border border-white/30 py-3 text-sm font-mono tracking-[0.4em] uppercase text-white/80"
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/settings")}
          >
            {t("settings")} ({settings.difficulty})
          </motion.button>
          <motion.button
            className="w-full rounded-full border border-white/20 py-3 text-sm font-mono tracking-[0.4em] uppercase text-white/80"
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/ranking")}
          >
            {t("viewRanking")}
          </motion.button>
        </div>
      </div>
    </main>
  );
};


