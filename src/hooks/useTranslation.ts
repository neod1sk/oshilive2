import { useLanguage } from "../lib/language";
import { translations, type TranslationKey } from "../lib/i18n";

export const useTranslation = () => {
  const language = useLanguage();
  const t = translations[language];

  return (key: TranslationKey): string => {
    return t[key] || key;
  };
};

