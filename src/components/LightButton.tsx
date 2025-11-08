import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

import { COLOR_HEX } from "../game/colors";
import { useGameActions, useGameState, useSettings } from "../game/store";
import { useTranslation } from "../hooks/useTranslation";
import { useColorName } from "../hooks/useColorName";

const HOLD_INTERVAL = 180;
const FEEDBACK_DURATION = 1000;

export const LightButton = () => {
  const currentColor = useGameState((s) => s.currentColor);
  const targetColor = useGameState((s) => s.targetColor);
  const playing = useGameState((s) => s.playing);
  const lastCorrectAt = useGameState((s) => s.lastCorrectAt);
  const { changeColor } = useGameActions();
  const settings = useSettings();
  const t = useTranslation();
  const getColorName = useColorName();

  const repeatRefA = useRef<number | null>(null);
  const repeatRefB = useRef<number | null>(null);
  const [showCorrect, setShowCorrect] = useState(false);

  const clearIntervalRef = (ref: React.MutableRefObject<number | null>) => {
    if (ref.current) {
      window.clearInterval(ref.current);
      ref.current = null;
    }
  };

  const handlePressStart = useCallback(
    (direction: "next" | "prev", ref: React.MutableRefObject<number | null>) => {
      changeColor(direction);
      if (ref.current) {
        window.clearInterval(ref.current);
      }
      ref.current = window.setInterval(() => changeColor(direction), HOLD_INTERVAL);
    },
    [changeColor]
  );

  useEffect(
    () => () => {
      clearIntervalRef(repeatRefA);
      clearIntervalRef(repeatRefB);
    },
    []
  );

  const colorHex = currentColor ? COLOR_HEX[currentColor] : "#000000";
  const isMatch = currentColor !== null && currentColor === targetColor;

  // 正解時のフィードバック
  useEffect(() => {
    if (lastCorrectAt) {
      setShowCorrect(true);
      const timer = window.setTimeout(() => {
        setShowCorrect(false);
      }, FEEDBACK_DURATION);
      return () => window.clearTimeout(timer);
    }
  }, [lastCorrectAt]);

  return (
    <div className="relative mt-[-56px] flex flex-col items-center gap-3">
      <div className="flex items-end justify-center gap-10 scale-[0.66] origin-bottom">
        <div className="flex flex-col items-center gap-2 pb-12">
          <motion.button
            className="flex h-32 w-32 items-center justify-center rounded-full border border-white/15 bg-white/5 shadow-[0_6px_14px_rgba(0,0,0,0.35)] backdrop-blur touch-manipulation"
            whileTap={{ scale: 0.9 }}
            onPointerDown={(event) => {
              event.preventDefault();
              handlePressStart("next", repeatRefA);
            }}
            onPointerUp={() => clearIntervalRef(repeatRefA)}
            onPointerLeave={() => clearIntervalRef(repeatRefA)}
            onPointerCancel={() => clearIntervalRef(repeatRefA)}
            onTouchStart={(event) => {
              event.preventDefault();
              handlePressStart("next", repeatRefA);
            }}
            onTouchEnd={() => clearIntervalRef(repeatRefA)}
            onTouchCancel={() => clearIntervalRef(repeatRefA)}
            onContextMenu={(e) => e.preventDefault()}
          >
            <svg width="80" height="80" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M14 24L32 13V35L14 24Z"
                fill="rgba(255,46,147,0.8)"
                stroke="rgba(255,46,147,0.6)"
                strokeWidth="1.5"
              />
            </svg>
          </motion.button>
          <span className="text-sm font-mono tracking-[0.3em] text-pink-200 uppercase">{t("switchA")}</span>
        </div>

        <motion.div
          className="relative flex select-none flex-col items-center"
          style={{ transformOrigin: "bottom center" }}
        >
          <div className="relative h-64 w-12 rounded-full border border-white/15 bg-white/60 shadow-[0_0_35px_rgba(255,255,255,0.35)]">
            {currentColor && (
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: `linear-gradient(180deg, ${colorHex}cc 0%, ${colorHex}88 45%, rgba(255,255,255,0.6) 90%)`,
                  boxShadow: `0 0 36px ${colorHex}44`
                }}
              />
            )}
            <AnimatePresence>
              {settings.colorblindMode && currentColor && (
                <motion.div
                  key={currentColor}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.9 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 rounded-full mix-blend-screen colorblind-pattern"
                  data-color={currentColor}
                />
              )}
            </AnimatePresence>
            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/40 via-transparent to-transparent" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-black/15 via-transparent to-transparent opacity-60" />
            <div className="absolute inset-x-0 top-0 h-2 rounded-t-full bg-white/70" />
            <div className="absolute inset-x-0 bottom-0 h-2 rounded-b-full bg-white/40" />
          </div>
          <div className="relative -mt-2 h-5 w-16 rounded-full bg-gradient-to-b from-white/60 to-gray-300/80 shadow-inner" />
          <div className="relative -mt-0.5 flex h-28 w-14 flex-col items-center justify-end rounded-full bg-gradient-to-b from-white via-white/95 to-white/80 shadow-[0_6px_18px_rgba(0,0,0,0.25)] py-5">
            <div className="absolute top-4 flex flex-col items-center gap-1 text-[10px] font-mono tracking-[0.45em] text-white/60 uppercase">
              <div className="flex items-center gap-1">
                <svg width="28" height="10" viewBox="0 0 28 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 5H26" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M22 2L26 5L22 8" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M6 2L2 5L6 8" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <svg width="22" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M5 16L3 10L8 8L12 3L16 8L21 10L19 16H5ZM5 16V19H19V16"
                  stroke="rgba(148,133,204,0.7)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <AnimatePresence>
            {showCorrect && (
              <motion.div
                key="correct"
                initial={{ opacity: 0, y: 18, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -14, scale: 0.92 }}
                transition={{ duration: 0.18 }}
                className="absolute -top-20 flex flex-col items-center rounded-full border border-green-300/50 bg-green-500/20 px-4 py-1.5 backdrop-blur"
                style={{
                  color: "#4ADE80",
                  boxShadow: "0 0 28px rgba(74, 222, 128, 0.6)"
                }}
              >
                <span className="text-lg font-display tracking-[0.4em] uppercase">{t("correct")}</span>
                <span className="text-[10px] font-mono tracking-[0.35em] text-white/80 uppercase">+10{t("points")}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <div className="flex flex-col items-center gap-2 pb-12">
          <motion.button
            className="flex h-32 w-32 items-center justify-center rounded-full border border-white/15 bg-white/5 shadow-[0_6px_14px_rgba(0,0,0,0.35)] backdrop-blur touch-manipulation"
            whileTap={{ scale: 0.9 }}
            onPointerDown={(event) => {
              event.preventDefault();
              handlePressStart("prev", repeatRefB);
            }}
            onPointerUp={() => clearIntervalRef(repeatRefB)}
            onPointerLeave={() => clearIntervalRef(repeatRefB)}
            onPointerCancel={() => clearIntervalRef(repeatRefB)}
            onTouchStart={(event) => {
              event.preventDefault();
              handlePressStart("prev", repeatRefB);
            }}
            onTouchEnd={() => clearIntervalRef(repeatRefB)}
            onTouchCancel={() => clearIntervalRef(repeatRefB)}
            onContextMenu={(e) => e.preventDefault()}
          >
            <svg width="80" height="80" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M34 24L16 13V35L34 24Z"
                fill="rgba(255,46,147,0.8)"
                stroke="rgba(255,46,147,0.6)"
                strokeWidth="1.5"
              />
            </svg>
          </motion.button>
          <span className="text-sm font-mono tracking-[0.3em] text-pink-200 uppercase">{t("switchB")}</span>
        </div>
      </div>

      <span className="text-sm font-display tracking-[0.35em] uppercase text-white/60">
        {currentColor ? getColorName(currentColor) : t("off")}
      </span>
      <AnimatePresence>
        {isMatch && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="text-xs font-mono tracking-[0.4em] text-green-300 uppercase"
            style={{
              textShadow: "0 0 12px rgba(74, 222, 128, 0.8)"
            }}
          >
            ✓ {t("colorMatch")}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
};

