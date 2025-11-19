"use server";

import { cookies } from "next/headers";
import { DEFAULT_LOCALE, LOCALE_COOKIE, isLocale, type Locale } from "./config";

export async function getCurrentLocale(): Promise<Locale> {
  try {
    const cookieStore = await cookies();
    const stored = cookieStore?.get?.(LOCALE_COOKIE)?.value;
    if (isLocale(stored)) {
      return stored;
    }
  } catch {
    // cookies() may throw or return a partial object when executed outside
    // a request scope. In those cases we simply fall back to the default.
  }
  return DEFAULT_LOCALE;
}
