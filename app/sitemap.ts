import type { MetadataRoute } from "next";
import { getDictionary } from "@/lib/i18n";
import { locales } from "@/lib/locales";
import { indexableImages, indexableVideos, siteConfig } from "@/lib/site";

const abs = (path: string) => `${siteConfig.url}${path}`;

/**
 * The site is a single landing page in three languages, so it has exactly
 * three canonical URLs. Rather than padding that with thin pages, each URL
 * carries the full image and video sitemap extensions — that is what actually
 * gets the photography into Google Images and the clips into Video search.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const dicts = Object.fromEntries(
    await Promise.all(
      locales.map(async (l) => [l, await getDictionary(l)] as const),
    ),
  ) as Record<(typeof locales)[number], Awaited<ReturnType<typeof getDictionary>>>;

  const languages = Object.fromEntries(
    locales.map((l) => [l, `${siteConfig.url}/${l}`]),
  );

  return locales.map((locale) => {
    const dict = dicts[locale];

    return {
      url: `${siteConfig.url}/${locale}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: locale === "uz" ? 1 : 0.9,
      alternates: {
        languages: {
          ...languages,
          "x-default": `${siteConfig.url}/uz`,
        },
      },
      images: indexableImages.map((img) => abs(img.path)),
      videos: indexableVideos.map((v) => ({
        title: dict.seo.video[v.titleKey].title,
        description: dict.seo.video[v.titleKey].description,
        thumbnail_loc: abs(v.thumbnail),
        content_loc: abs(v.path),
        family_friendly: "yes" as const,
        live: "no" as const,
        publication_date: "2026-08-05",
        uploader: { info: siteConfig.url, content: siteConfig.name },
      })),
    };
  });
}
