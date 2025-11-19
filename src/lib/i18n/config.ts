export const LOCALES = ["zh", "en"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "zh";
export const LOCALE_COOKIE = "ai-gallery-locale";

export const LOCALE_LABELS: Record<Locale, string> = {
  zh: "中文",
  en: "English",
};

export function isLocale(value?: string | null): value is Locale {
  return value ? (LOCALES as readonly string[]).includes(value) : false;
}
