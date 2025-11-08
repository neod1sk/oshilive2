import { KING_BLADE_ORDER, type LightColor, nextColor, prevColor } from "./colors";

export type Difficulty = "EASY" | "NORMAL" | "HARD";

export interface GameConfig {
  difficulty: Difficulty;
  timeLimit: number; // 制限時間（ミリ秒）
}

export interface GameState {
  currentColor: LightColor | null; // null = 消灯状態
  targetColor: LightColor; // お題色
  score: number;
  correctCount: number; // 正解回数
  startedAt: number;
  playing: boolean;
  lastCorrectAt?: number; // 最後に正解した時刻
}

export const SCORE_PER_CORRECT = 10; // 1回正解ごとのスコア

export const defaultConfig: GameConfig = {
  difficulty: "NORMAL",
  timeLimit: 60 * 1000 // 1分
};

export const DIFFICULTY_PRESETS: Record<Difficulty, GameConfig> = {
  EASY: { difficulty: "EASY", timeLimit: 90 * 1000 }, // 1分30秒
  NORMAL: { difficulty: "NORMAL", timeLimit: 60 * 1000 }, // 1分
  HARD: { difficulty: "HARD", timeLimit: 45 * 1000 } // 45秒
};

// ランダムなお題色を生成
export const generateTargetColor = (): LightColor => {
  const randomIndex = Math.floor(Math.random() * KING_BLADE_ORDER.length);
  return KING_BLADE_ORDER[randomIndex];
};

// 色が一致しているか判定
export const checkColorMatch = (current: LightColor, target: LightColor): boolean => {
  return current === target;
};

