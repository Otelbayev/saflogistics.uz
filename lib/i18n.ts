import "server-only";
import type { Locale } from "./locales";
import { locales } from "./locales";

const dictionaries = {
  uz: () => import("../messages/uz.json").then((m) => m.default),
  ru: () => import("../messages/ru.json").then((m) => m.default),
  en: () => import("../messages/en.json").then((m) => m.default),
} as const;

export type Dictionary = Awaited<ReturnType<typeof dictionaries.uz>>;

export const hasLocale = (locale: string): locale is Locale =>
  (locales as readonly string[]).includes(locale);

export const getDictionary = async (locale: Locale): Promise<Dictionary> =>
  dictionaries[locale]();

/**
 * Client components get only the dictionary slices they read. Every prop that
 * crosses the server→client boundary is serialised into the page's RSC
 * payload, so handing each section the whole 60 KB dictionary bloated the HTML.
 */
export type DictSlice<K extends keyof Dictionary> = Pick<Dictionary, K>;

/** Image captions only — the rest of `seo` (keywords etc.) stays on the server. */
export type SeoAlt = { seo: Pick<Dictionary["seo"], "alt"> };

export function pickDict<K extends keyof Dictionary>(
  dict: Dictionary,
  ...keys: K[]
): DictSlice<K> {
  const out = {} as DictSlice<K>;
  for (const k of keys) out[k] = dict[k];
  return out;
}

export const seoAlt = (dict: Dictionary): SeoAlt => ({
  seo: { alt: dict.seo.alt },
});
