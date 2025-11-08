export type LightColor =
  | "RED"
  | "BLUE"
  | "WHITE"
  | "ORANGE"
  | "GREEN"
  | "PURPLE"
  | "PINK"
  | "YELLOW"
  | "LIGHT_GREEN"
  | "LIGHT_BLUE"
  | "LIGHT_PINK"
  | "VIOLET"
  | "LIME"
  | "TURQUOISE"
  | "HOT_PINK"
  | "SHINE_OCEAN"
  | "EMERALD_GREEN"
  | "PURE_WHITE";

export const KING_BLADE_ORDER: LightColor[] = [
  "RED",
  "BLUE",
  "WHITE",
  "ORANGE",
  "GREEN",
  "PURPLE",
  "PINK",
  "YELLOW",
  "LIGHT_GREEN",
  "LIGHT_BLUE",
  "LIGHT_PINK",
  "VIOLET",
  "LIME",
  "TURQUOISE",
  "HOT_PINK"
];

export const COLOR_HEX: Record<LightColor, string> = {
  RED: "#FF2D55",
  BLUE: "#1DA1F2",
  WHITE: "#FFFFFF",
  ORANGE: "#FF8A00",
  GREEN: "#27AE60",
  PURPLE: "#8E44AD",
  PINK: "#FF6FAE",
  YELLOW: "#FFD400",
  LIGHT_GREEN: "#A3EE68",
  LIGHT_BLUE: "#95E8FF",
  LIGHT_PINK: "#FFC7E3",
  VIOLET: "#7E5BEF",
  LIME: "#BCFF00",
  TURQUOISE: "#00D2D3",
  HOT_PINK: "#FF2E93",
  SHINE_OCEAN: "#00B3FF",
  EMERALD_GREEN: "#00C27A",
  PURE_WHITE: "#F7F7F7"
};

export const COLOR_NAMES_JA: Record<LightColor, string> = {
  RED: "レッド",
  BLUE: "ブルー",
  WHITE: "ホワイト",
  ORANGE: "オレンジ",
  GREEN: "グリーン",
  PURPLE: "パープル",
  PINK: "ピンク",
  YELLOW: "イエロー",
  LIGHT_GREEN: "ライトグリーン",
  LIGHT_BLUE: "ライトブルー",
  LIGHT_PINK: "ライトピンク",
  VIOLET: "バイオレット",
  LIME: "ライム",
  TURQUOISE: "ターコイズ",
  HOT_PINK: "ホットピンク",
  SHINE_OCEAN: "シャインオーシャン",
  EMERALD_GREEN: "エメラルドグリーン",
  PURE_WHITE: "ピュアホワイト"
};

export const COLOR_NAMES_KO: Record<LightColor, string> = {
  RED: "레드",
  BLUE: "블루",
  WHITE: "화이트",
  ORANGE: "오렌지",
  GREEN: "그린",
  PURPLE: "퍼플",
  PINK: "핑크",
  YELLOW: "옐로우",
  LIGHT_GREEN: "라이트 그린",
  LIGHT_BLUE: "라이트 블루",
  LIGHT_PINK: "라이트 핑크",
  VIOLET: "바이올렛",
  LIME: "라임",
  TURQUOISE: "터키석",
  HOT_PINK: "핫핑크",
  SHINE_OCEAN: "샤인 오션",
  EMERALD_GREEN: "에메랄드 그린",
  PURE_WHITE: "퓨어 화이트"
};

export const COLOR_NAMES_EN: Record<LightColor, string> = {
  RED: "Red",
  BLUE: "Blue",
  WHITE: "White",
  ORANGE: "Orange",
  GREEN: "Green",
  PURPLE: "Purple",
  PINK: "Pink",
  YELLOW: "Yellow",
  LIGHT_GREEN: "Light Green",
  LIGHT_BLUE: "Light Blue",
  LIGHT_PINK: "Light Pink",
  VIOLET: "Violet",
  LIME: "Lime",
  TURQUOISE: "Turquoise",
  HOT_PINK: "Hot Pink",
  SHINE_OCEAN: "Shine Ocean",
  EMERALD_GREEN: "Emerald Green",
  PURE_WHITE: "Pure White"
};

// 後方互換性のため
export const COLOR_NAMES = COLOR_NAMES_JA;

export const nextColor = (color: LightColor): LightColor => {
  const index = KING_BLADE_ORDER.indexOf(color);
  if (index === -1) return KING_BLADE_ORDER[0];
  return KING_BLADE_ORDER[(index + 1) % KING_BLADE_ORDER.length];
};

export const prevColor = (color: LightColor): LightColor => {
  const index = KING_BLADE_ORDER.indexOf(color);
  if (index === -1) return KING_BLADE_ORDER[0];
  return KING_BLADE_ORDER[(index - 1 + KING_BLADE_ORDER.length) % KING_BLADE_ORDER.length];
};


