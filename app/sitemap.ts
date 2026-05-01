import type { MetadataRoute } from "next";
import { locales } from "@/lib/locales";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/services", "/contact"];
  const now = new Date();

  return locales.flatMap((locale) =>
    routes.map((route) => {
      const languages = Object.fromEntries(
        locales.map((l) => [l, `${siteConfig.url}/${l}${route}`]),
      );
      return {
        url: `${siteConfig.url}/${locale}${route}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: route === "" ? 1 : 0.8,
        alternates: {
          languages: {
            ...languages,
            "x-default": `${siteConfig.url}/uz${route}`,
          },
        },
      };
    }),
  );
}
