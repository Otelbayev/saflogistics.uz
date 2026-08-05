import type { Metadata } from "next";
import "./globals.css";
import { defaultLocale } from "@/lib/locales";
import { localeHtmlLang, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: "404 — SAF Logistics",
  robots: { index: false, follow: true },
};

/**
 * The root layout now lives under `app/[locale]`, so this page sits outside it
 * and has to bring its own <html>/<body>.
 */
export default function NotFound() {
  return (
    <html lang={localeHtmlLang[defaultLocale]}>
      <body className="antialiased">
        <main className="flex min-h-svh flex-col items-center justify-center gap-6 px-6 text-center">
          <p className="text-6xl font-semibold tracking-tight text-brand-800 sm:text-8xl dark:text-brand-200">
            404
          </p>
          <p className="max-w-md text-base text-muted">
            Sahifa topilmadi · Страница не найдена · Page not found
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <a
              href={`/${defaultLocale}`}
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-brand-800 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
            >
              Bosh sahifa
            </a>
            <a
              href={`tel:${siteConfig.phones[0]}`}
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition hover:bg-surface-2"
            >
              {siteConfig.phones[0]}
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
