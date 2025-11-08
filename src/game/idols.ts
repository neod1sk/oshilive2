import type { LightColor } from "./colors";

export type Idol = {
  id: string;
  name: string;
  color: LightColor;
};

export const IDOLS: Idol[] = [
  { id: "i1", name: "AKANE", color: "RED" },
  { id: "i2", name: "HANA", color: "YELLOW" },
  { id: "i3", name: "AOI", color: "TURQUOISE" },
  { id: "i4", name: "SUMIRE", color: "VIOLET" }
];

export const idolById = (id: string | undefined) => IDOLS.find((idol) => idol.id === id);



