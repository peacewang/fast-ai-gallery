import { DEFAULT_LOCALE, type Locale } from "./config";
import type { Dictionary } from "./types";
import { zhDictionary } from "./locales/zh";
import { enDictionary } from "./locales/en";

const dictionaries: Record<Locale, Dictionary> = {
  zh: zhDictionary,
  en: enDictionary,
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries[DEFAULT_LOCALE];
}
