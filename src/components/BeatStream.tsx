import { motion } from "framer-motion";
import clsx from "clsx";

import { useGameState } from "../game/store";

type BeatStreamProps = {
  className?: string;
};

const HIT_LINE_POSITION = 0.75; // ヒットラインの位置（0-1、下から75%の位置）

export const BeatStream = ({ className }: BeatStreamProps) => {
  const playing = useGameState((s) => s.playing);

  if (!playing) return null;

  return (
    <div
      className={clsx(
        "pointer-events-none relative w-full h-full overflow-hidden",
        className
      )}
    >
      {/* 背景のリズムライン */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full max-w-md h-full flex items-center justify-center">
          {/* 中央のガイドライン */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent" />
          
          {/* ヒットライン（判定ライン） */}
          <motion.div
            className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent"
            style={{
              bottom: `${(1 - HIT_LINE_POSITION) * 100}%`,
              boxShadow: "0 0 16px rgba(34, 211, 238, 0.6), 0 0 32px rgba(34, 211, 238, 0.3)"
            }}
            animate={{
              opacity: [0.6, 1, 0.6],
              scaleX: [1, 1.05, 1]
            }}
            transition={{
              duration: 0.3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </div>
    </div>
  );
};
