import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

import { COLOR_HEX } from "../game/colors";
import { useGameConfig, useGameState, useSettings } from "../game/store";
import { useTranslation } from "../hooks/useTranslation";
import { useColorName } from "../hooks/useColorName";
import { useLanguage } from "../lib/language";
import { translations } from "../lib/i18n";

export const Hud = () => {
  const score = useGameState((s) => s.score);
  const correctCount = useGameState((s) => s.correctCount);
  const currentColor = useGameState((s) => s.currentColor);
  const targetColor = useGameState((s) => s.targetColor);
  const startedAt = useGameState((s) => s.startedAt);
  const playing = useGameState((s) => s.playing);
  const config = useGameConfig();
  const settings = useSettings();
  const t = useTranslation();
  const language = useLanguage();
  const getColorName = useColorName();

  const [remainingSeconds, setRemainingSeconds] = useState(() => {
    if (!playing || !startedAt) return Math.ceil(config.timeLimit / 1000);
    const elapsed = performance.now() - startedAt;
    const remaining = Math.max(0, config.timeLimit - elapsed);
    return Math.ceil(remaining / 1000);
  });

  // 1秒ごとに残り時間を更新
  useEffect(() => {
    if (!playing || !startedAt) {
      setRemainingSeconds(Math.ceil(config.timeLimit / 1000));
      return;
    }

    const updateRemainingTime = () => {
      const elapsed = performance.now() - startedAt;
      const remaining = Math.max(0, config.timeLimit - elapsed);
      const seconds = Math.ceil(remaining / 1000);
      setRemainingSeconds(seconds);
    };

    // 即座に更新
    updateRemainingTime();

    // 1秒ごとに更新
    const interval = setInterval(updateRemainingTime, 1000);

    return () => clearInterval(interval);
  }, [playing, startedAt, config.timeLimit]);

  // 色が一致しているか
  const isMatch = currentColor !== null && currentColor === targetColor;

  return (
    <div className="w-full flex flex-col gap-4 px-4 pt-4">
      {/* 残り時間表示（中央上部） */}
      <div className="flex flex-col items-center gap-2 pt-2">
        <motion.div
          key={remainingSeconds}
          initial={{ scale: 1.1, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="flex flex-col items-center"
        >
          <div className="text-6xl font-mono font-bold text-white drop-shadow-[0_0_24px_rgba(255,255,255,0.5)]">
            {remainingSeconds}
          </div>
          <div className="text-lg font-mono tracking-[0.4em] text-white/80 uppercase">{t("remainingTime")}</div>
        </motion.div>
      </div>

      <div className="flex items-end justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-mono text-white/60 tracking-[0.4em] uppercase">{t("score")}</span>
          <span className="text-3xl font-mono text-white drop-shadow-lg">{score.toLocaleString()}</span>
        </div>

        <div className="flex flex-col items-center">
          <motion.div
            key={correctCount}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 320, damping: 20 }}
            className="text-5xl font-display tracking-[0.35em] text-white drop-shadow-[0_0_14px_rgba(255,255,255,0.4)]"
          >
            {correctCount}
          </motion.div>
          <span className="text-xs font-mono tracking-[0.4em] text-purple-200/80 uppercase">{t("correctCount")}</span>
        </div>
      </div>

      {/* お題色表示 */}
      <div className="flex flex-col items-center gap-3 py-4">
        <div className="text-xs font-mono tracking-[0.4em] text-white/60 uppercase">{t("targetColor")}</div>
        <motion.div
          key={targetColor}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="flex flex-col items-center gap-2 px-8 py-4 rounded-2xl border-2 border-white/20 bg-white/10 backdrop-blur"
          style={{
            boxShadow: `0 0 32px ${COLOR_HEX[targetColor]}44, 0 0 64px ${COLOR_HEX[targetColor]}22`
          }}
        >
          <div
            className="h-16 w-16 rounded-full border-2 border-white/30 shadow-lg"
            style={{
              backgroundColor: COLOR_HEX[targetColor],
              boxShadow: `0 0 24px ${COLOR_HEX[targetColor]}88, 0 0 48px ${COLOR_HEX[targetColor]}44`
            }}
          />
          <span className="text-lg font-display tracking-[0.3em] text-white uppercase">
            {getColorName(targetColor)}
          </span>
        </motion.div>
      </div>

      {/* 現在の色と一致状態 */}
      <div className="flex items-center justify-center gap-3 text-[10px] font-mono tracking-[0.4em] text-white/60 uppercase">
        {currentColor ? (
          <span className="flex items-center gap-2">
            <span
              className="h-3 w-3 rounded-full"
              style={{
                backgroundColor: COLOR_HEX[currentColor],
                boxShadow: `0 0 8px ${COLOR_HEX[currentColor]}88`
              }}
            />
            {t("current")}: {getColorName(currentColor)}
          </span>
        ) : (
          <span>{t("current")}: {t("off")}</span>
        )}
        <AnimatePresence>
          {isMatch && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-green-300 font-bold"
              style={{
                textShadow: "0 0 12px rgba(34, 211, 238, 0.8)"
              }}
            >
              ✓ {t("match")}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
