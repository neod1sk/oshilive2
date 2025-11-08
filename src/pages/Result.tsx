import { motion } from "framer-motion";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { LanguageSwitcher } from "../components/LanguageSwitcher";
import { useGameActions, useGameState } from "../game/store";
import { useTranslation } from "../hooks/useTranslation";
import { buildTweetIntent } from "../lib/share";

const rankTitles = [
  { threshold: 0, title: "BEGINNER" },
  { threshold: 10, title: "REGULAR" },
  { threshold: 20, title: "COLOR MASTER" },
  { threshold: 30, title: "色合わせの達人" },
  { threshold: 50, title: "カラーマエストロ" }
];

export const ResultPage = () => {
  const score = useGameState((s) => s.score);
  const correctCount = useGameState((s) => s.correctCount);
  const { startGame } = useGameActions();
  const navigate = useNavigate();
  const t = useTranslation();

  const rank = useMemo(() => rankTitles.filter((item) => correctCount >= item.threshold).at(-1) ?? rankTitles[0], [correctCount]);

  const handleRetry = () => {
    startGame();
    navigate("/play");
  };

  const shareUrl = buildTweetIntent({
    score,
    correctCount,
    appUrl: window.location.origin
  });

  return (
    <main className="relative min-h-screen overflow-hidden px-6 pb-20 pt-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(126,91,239,0.2),transparent_60%)]" />
      <div className="absolute top-4 right-4 z-20">
        <LanguageSwitcher />
      </div>
      <div className="relative z-10 mx-auto flex max-w-lg flex-col gap-8">
        <motion.div
          className="rounded-3xl border border-white/10 bg-black/40 px-6 py-8 backdrop-blur-xl shadow-[0_0_64px_rgba(126,91,239,0.25)]"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-sm font-mono tracking-[0.5em] text-white/60 uppercase">{t("otakuLevel")}</div>
          <div className="text-3xl font-display tracking-[0.35em] text-white mt-2">{rank.title}</div>
          <div className="mt-6 text-xs font-mono tracking-[0.4em] text-white/60 uppercase">{t("totalScore")}</div>
          <div className="text-5xl font-mono text-white drop-shadow-[0_0_24px_rgba(255,255,255,0.35)]">
            {score.toLocaleString()}
          </div>
        </motion.div>

        <div className="grid grid-cols-2 gap-3 text-sm font-mono tracking-[0.2em]">
          <StatCard label={t("correctCountLabel")} value={`${correctCount}${t("times")}`} accent="#4ADE80" />
          <StatCard label={t("scoreLabel")} value={`${score}${t("points")}`} accent="#7E5BEF" />
        </div>

        <div className="flex flex-col gap-3">
          <a
            href={shareUrl}
            target="_blank"
            rel="noreferrer"
            className="w-full rounded-full bg-gradient-to-r from-[#1DA1F2] to-violet-500 py-4 text-center text-sm font-mono tracking-[0.4em] uppercase shadow-[0_16px_32px_rgba(29,161,242,0.25)]"
          >
            {t("shareOnX")}
          </a>
          <button
            type="button"
            className="w-full rounded-full border border-white/20 bg-white/10 py-3 text-sm font-mono tracking-[0.4em] uppercase text-white/80"
            onClick={() => navigate("/ranking")}
          >
            {t("viewRankingResult")}
          </button>
          <button
            type="button"
            className="w-full rounded-full border border-pink-500/40 bg-pink-500/10 py-3 text-sm font-mono tracking-[0.4em] uppercase text-pink-200"
            onClick={handleRetry}
          >
            {t("playAgain")}
          </button>
          <button
            type="button"
            className="w-full rounded-full border border-white/10 py-3 text-sm font-mono tracking-[0.4em] uppercase text-white/60"
            onClick={() => navigate("/")}
          >
            {t("backToTitle")}
          </button>
        </div>
      </div>
    </main>
  );
};

type StatCardProps = {
  label: string;
  value: string;
  accent?: string;
};

const StatCard = ({ label, value, accent }: StatCardProps) => (
  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-center backdrop-blur">
    <div className="text-[10px] text-white/60 uppercase">{label}</div>
    <div
      className="mt-2 text-xl font-mono tracking-[0.3em] text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.25)]"
      style={accent ? { color: accent } : undefined}
    >
      {value}
    </div>
  </div>
);



