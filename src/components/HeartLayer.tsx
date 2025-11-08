import { motion } from "framer-motion";

import { useGameActions, useGameStore } from "../game/store";

const HEART_COLORS = ["#FF6FAE", "#FF2E93", "#FFD400", "#7E5BEF"];

export const HeartLayer = () => {
  const hearts = useGameStore((state) => state.hearts);
  const { catchHeart } = useGameActions();

  return (
    <div className="absolute inset-0 pointer-events-none">
      {hearts.map((heart, idx) => {
        const left = `${heart.x * 100}%`;
        const bottom = `${heart.y * 100}%`;
        const color = HEART_COLORS[idx % HEART_COLORS.length];

        return (
          <motion.button
            key={heart.id}
            className="absolute h-12 w-12 -mt-6 -ml-6 pointer-events-auto select-none touch-manipulation"
            style={{
              left,
              bottom,
              color,
              transformOrigin: "50% 50%"
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
              catchHeart(heart.id);
            }}
            onTouchStart={(e) => {
              e.stopPropagation();
              catchHeart(heart.id);
            }}
            whileTap={{ scale: 0.75 }}
            animate={{
              rotate: (heart.rotation * 180) / Math.PI,
              scale: heart.scale
            }}
            transition={{ type: "spring", stiffness: 260, damping: 16 }}
          >
            <svg viewBox="0 0 64 64" className="h-full w-full drop-shadow-[0_0_12px_rgba(255,111,174,0.6)]">
              <path
                d="M32 58s-3.7-3.2-9.3-7.9C15.1 44 6 35.9 6 24.8 6 15.4 13.4 8 22.8 8c4.5 0 8.8 2.1 11.2 5.5C36.5 10.1 40.8 8 45.3 8 54.7 8 62 15.4 62 24.8c0 11.1-9.1 19.2-16.7 25.3C35.7 54.8 32 58 32 58z"
                fill={color}
                fillOpacity={0.9}
              />
            </svg>
          </motion.button>
        );
      })}
    </div>
  );
};

