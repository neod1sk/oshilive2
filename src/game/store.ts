import { create } from "zustand";
import { persist } from "zustand/middleware";

import { KING_BLADE_ORDER, type LightColor, nextColor, prevColor } from "./colors";
import {
  DIFFICULTY_PRESETS,
  defaultConfig,
  generateTargetColor,
  checkColorMatch,
  SCORE_PER_CORRECT,
  type Difficulty,
  type GameConfig,
  type GameState
} from "./engine";

export interface GameSettings {
  difficulty: Difficulty;
  colorblindMode: boolean;
  enableVibration: boolean;
}

type StoreState = {
  config: GameConfig;
  state: GameState;
  settings: GameSettings;
  actions: {
    startGame: (override?: Partial<GameConfig>) => void;
    stopGame: () => void;
    changeColor: (direction: "next" | "prev") => void;
    checkMatch: () => void; // 色一致をチェック
    tick: (now: number) => void;
    setDifficulty: (difficulty: Difficulty) => void;
    toggleColorblindMode: (value: boolean) => void;
    setVibration: (value: boolean) => void;
  };
};

const createInitialState = (): GameState => ({
  currentColor: null, // 初期状態は消灯
  targetColor: generateTargetColor(),
  score: 0,
  correctCount: 0,
  startedAt: 0,
  playing: false,
  lastCorrectAt: undefined
});

export const useGameStore = create<StoreState>()(
  persist(
    (set, get) => ({
      config: defaultConfig,
      state: createInitialState(),
      settings: {
        difficulty: "NORMAL",
        colorblindMode: false,
        enableVibration: true
      },
      actions: {
        startGame: (override) => {
          const { settings } = get();
          const config = { ...DIFFICULTY_PRESETS[settings.difficulty], ...override };
          const now = performance.now();
          const initialState = createInitialState();

          set({
            config,
            state: {
              ...initialState,
              startedAt: now,
              playing: true
            }
          });
        },
        stopGame: () => {
          set((current) => ({
            state: {
              ...current.state,
              playing: false
            }
          }));
        },
        changeColor: (direction) => {
          set((current) => {
            // 消灯状態の場合は赤から始める
            if (current.state.currentColor === null) {
              return {
                ...current,
                state: {
                  ...current.state,
                  currentColor: "RED"
                }
              };
            }
            // 通常の色変更
            const next =
              direction === "next" ? nextColor(current.state.currentColor) : prevColor(current.state.currentColor);
            return {
              ...current,
              state: {
                ...current.state,
                currentColor: next
              }
            };
          });
          // 色変更時に自動的に一致チェック
          get().actions.checkMatch();
        },
        checkMatch: () => {
          set((current) => {
            const { state } = current;
            if (!state.playing || state.currentColor === null) return current;

            const isMatch = checkColorMatch(state.currentColor, state.targetColor);
            if (isMatch) {
              const now = performance.now();
              const newScore = state.score + SCORE_PER_CORRECT;
              const newTargetColor = generateTargetColor(); // 新しいお題を生成

              // バイブレーション
              if (
                typeof navigator !== "undefined" &&
                get().settings.enableVibration &&
                "vibrate" in navigator
              ) {
                navigator.vibrate?.(50);
              }

              return {
                ...current,
                state: {
                  ...state,
                  score: newScore,
                  correctCount: state.correctCount + 1,
                  targetColor: newTargetColor,
                  lastCorrectAt: now
                }
              };
            }
            return current;
          });
        },
        tick: (now) => {
          set((current) => {
            const { state, config } = current;
            if (!state.playing) return current;

            const elapsed = now - state.startedAt;
            // 制限時間を超えたらゲーム終了
            if (elapsed >= config.timeLimit) {
              return {
                ...current,
                state: {
                  ...state,
                  playing: false
                }
              };
            }

            return current;
          });
        },
        setDifficulty: (difficulty) => {
          set((current) => ({
            settings: {
              ...current.settings,
              difficulty
            }
          }));
        },
        toggleColorblindMode: (value) => {
          set((current) => ({
            settings: {
              ...current.settings,
              colorblindMode: value
            }
          }));
        },
        setVibration: (value) => {
          set((current) => ({
            settings: {
              ...current.settings,
              enableVibration: value
            }
          }));
        }
      }
    }),
    {
      name: "oshi-light-live-settings",
      partialize: (state) => ({
        settings: state.settings
      })
    }
  )
);

export const useGameActions = () => useGameStore((state) => state.actions);

export const useGameState = <T,>(selector: (state: StoreState["state"]) => T) =>
  useGameStore((store) => selector(store.state));

export const useGameConfig = () => useGameStore((state) => state.config);

export const useSettings = () => useGameStore((state) => state.settings);
