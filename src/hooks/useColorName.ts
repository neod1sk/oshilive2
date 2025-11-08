import { useLanguage } from "../lib/language";
import { COLOR_NAMES_EN, COLOR_NAMES_JA, COLOR_NAMES_KO, type LightColor } from "../game/colors";

export const useColorName = () => {
  const language = useLanguage();
  
  return (color: LightColor): string => {
    switch (language) {
      case "ko":
        return COLOR_NAMES_KO[color];
      case "en":
        return COLOR_NAMES_EN[color];
      case "ja":
      default:
        return COLOR_NAMES_JA[color];
    }
  };
};

