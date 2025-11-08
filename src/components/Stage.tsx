import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";

import { COLOR_HEX } from "../game/colors";
import { useCenterIdol, useGameStore } from "../game/store";
import { useColorName } from "../hooks/useColorName";
import type { Idol } from "../game/idols";
import { BeatStream } from "./BeatStream";
import { HeartLayer } from "./HeartLayer";

const DANCER_SLOTS = [10, 35, 60, 85];

type IdolVisual = {
  src: string;
  className?: string;
};

const IDOL_VISUALS: Record<string, IdolVisual | undefined> = {
  i3: {
    src: "/assets/idol-aoi-hero.png",
    className: "h-40 w-auto object-contain drop-shadow-[0_16px_26px_rgba(0,0,0,0.45)]"
  }
};

const createRng = (seed: number) => () => {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
};

const buildDanceFrames = (seed: number) => {
  const rand = createRng(seed);
  const x1 = (rand() - 0.5) * 42;
  const x2 = (rand() - 0.5) * 36;
  const y1 = (rand() - 0.5) * 28;
  const y2 = (rand() - 0.5) * 24;
  const rot1 = (rand() - 0.5) * 6;
  const rot2 = (rand() - 0.5) * 4;
  const duration = 6 + rand() * 4;

  return {
    keyframes: {
      x: [0, x1, x2, -x1 / 1.2, 0],
      y: [0, y1, -y2, y1 / 2, 0],
      rotate: [0, rot1, rot2, -rot1 / 2, 0]
    },
    duration
  };
};

const buildPulseFrames = (seed: number) => {
  const rand = createRng(seed);
  const duration = 1.8 + rand() * 1.2;
  const amp = 0.06 + rand() * 0.05;
  return {
    keyframes: {
      scaleY: [1, 1 + amp, 1 - amp * 0.8, 1 + amp * 0.5, 1],
      scaleX: [1, 1 - amp * 0.4, 1 + amp * 0.3, 1 - amp * 0.2, 1]
    },
    duration
  };
};

const Dancer = ({ idol, slotIndex, isCenter }: { idol: Idol; slotIndex: number; isCenter: boolean }) => {
  const colorHex = COLOR_HEX[idol.color];
  const customVisual = IDOL_VISUALS[idol.id];
  const [seed] = useState(() => Math.random() * 1000 + slotIndex * 17);
  const dance = useMemo(() => buildDanceFrames(seed), [seed]);
  const pulse = useMemo(() => buildPulseFrames(seed + 1), [seed]);
  const left = DANCER_SLOTS[slotIndex % DANCER_SLOTS.length];
  const delay = 0.4 * slotIndex;

  return (
    <motion.div
      className="absolute flex w-[96px] flex-col items-center text-center"
      style={{ left: `calc(${left}% - 48px)`, bottom: "10%" }}
      animate={dance.keyframes}
      transition={{
        duration: dance.duration,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "mirror",
        delay
      }}
    >
      <AnimatePresence>
        {isCenter && (
          <motion.div
            key={`${idol.id}-spotlight`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.55, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.6 }}
            className="absolute -top-24 inset-x-[-80px] h-[260px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.68),rgba(255,255,255,0.05)_70%)] blur-3xl"
          />
        )}
      </AnimatePresence>
      <motion.div
        className="relative flex flex-col items-center gap-3"
        animate={{
          scale: isCenter ? 1.3 : 0.85,
          filter: isCenter ? "brightness(1.25)" : "brightness(0.78)",
          zIndex: isCenter ? 3 : 1,
          boxShadow: isCenter
            ? `0 0 48px ${colorHex}88, 0 0 18px ${colorHex}66`
            : "0 10px 24px rgba(0,0,0,0.35)"
        }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
      >
        {customVisual ? (
          <motion.img
            src={customVisual.src}
            alt={idol.name}
            className={customVisual.className ?? "h-36 w-auto object-contain drop-shadow-[0_18px_28px_rgba(0,0,0,0.45)]"}
            animate={pulse.keyframes}
            transition={{
              duration: pulse.duration,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut"
            }}
          />
        ) : (
          <>
            <motion.div
              className="relative h-30 w-22 rounded-[50%] border border-white/20 bg-white/15 shadow-[0_14px_24px_rgba(0,0,0,0.35)] backdrop-blur"
              animate={pulse.keyframes}
              transition={{
                duration: pulse.duration,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut"
              }}
              style={{
                background: `linear-gradient(180deg, ${colorHex}dd 0%, ${colorHex}88 60%, rgba(255,255,255,0.4) 100%)`,
                boxShadow: `0 0 36px ${colorHex}55`
              }}
            >
              <div className="absolute inset-x-2 top-3 h-7 rounded-full bg-white/65 blur-sm" />
              <div className="absolute inset-x-4 bottom-3 h-8 rounded-full bg-white/20 backdrop-blur-sm" />
              <div className="absolute left-[-16px] top-12 h-12 w-5 rounded-full bg-gradient-to-b from-white/30 to-transparent" />
              <div className="absolute right-[-16px] top-10 h-14 w-5 rounded-full bg-gradient-to-b from-white/30 to-transparent" />
            </motion.div>
            <motion.div
              className="relative h-10 w-16 rounded-full bg-white/60 shadow-inner"
              animate={{
                rotate: [-6, 4, -4, 6, 0]
              }}
              transition={{
                duration: 3 + (seed % 1.2),
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut"
              }}
            >
              <div className="absolute inset-0 rounded-full border border-white/30 bg-gradient-to-b from-white/70 to-white/40" />
            </motion.div>
          </>
        )}
      </motion.div>
      <div className="mt-3 flex flex-col items-center gap-1">
        <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-mono uppercase tracking-[0.35em] text-white/70">
          {idol.name}
        </span>
        <span
          className="rounded-full border border-white/15 bg-black/30 px-2 py-1 text-[10px] font-mono tracking-[0.4em] text-white/65 uppercase"
          style={{ color: colorHex }}
        >
          {idol.color}
        </span>
      </div>
    </motion.div>
  );
};

export const Stage = () => {
  const idols = useGameStore((store) => store.idols);
  const centerId = useGameStore((store) => store.state.centerIdolId);
  const center = useCenterIdol();
  const getColorName = useColorName();

  return (
    <div className="relative w-full aspect-[16/9] max-h-[340px] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-surface via-[#11121d] to-[#07070c] shadow-[0_0_64px_rgba(125,91,239,0.25)]">
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.35),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_0%,rgba(29,161,242,0.18),transparent_55%)] mix-blend-screen" />
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

      <BeatStream />

      <div className="relative z-10 h-full w-full px-6">
        {idols.map((idol, index) => (
          <Dancer key={idol.id} idol={idol} slotIndex={index} isCenter={idol.id === centerId} />
        ))}
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <HeartLayer />
      </div>

      <div className="absolute left-3 bottom-3 flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-2 backdrop-blur">
        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: COLOR_HEX[center.color] }} />
        <div className="text-[11px] uppercase tracking-[0.3em] text-white/70 font-mono">CENTER</div>
        <div className="text-xs font-display tracking-widest text-white">{center.name}</div>
        <span className="text-[10px] font-mono tracking-[0.3em] text-white/50 uppercase">
          {getColorName(center.color)}
        </span>
      </div>
    </div>
  );
};

