import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { hasLocale, getDictionary } from "@/lib/i18n";
import { defaultLocale, locales, type Locale } from "@/lib/locales";
import { localeHtmlLang, siteConfig } from "@/lib/site";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BusinessJsonLd } from "@/components/seo/JsonLd";
import { QuoteModalProvider } from "@/components/ui/QuoteModal";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale: Locale = hasLocale(locale) ? locale : defaultLocale;
  const dict = await getDictionary(safeLocale);
  const url = `${siteConfig.url}/${safeLocale}`;

  return {
    title: {
      default: dict.seo.homeTitle,
      template: `%s · ${dict.site.name}`,
    },
    description: dict.seo.homeDescription,
    keywords: dict.seo.keywords,
    applicationName: dict.site.name,
    authors: [{ name: siteConfig.founder }],
    creator: siteConfig.founder,
    publisher: dict.site.name,
    category: "Logistics",
    alternates: {
      canonical: url,
      languages: {
        uz: `${siteConfig.url}/uz`,
        ru: `${siteConfig.url}/ru`,
        en: `${siteConfig.url}/en`,
        "x-default": `${siteConfig.url}/uz`,
      },
    },
    openGraph: {
      type: "website",
      url,
      siteName: dict.site.name,
      title: dict.seo.homeTitle,
      description: dict.seo.homeDescription,
      locale: localeHtmlLang[safeLocale],
      images: [
        {
          url: "/images/semi-truck-port-sunset.jpg",
          width: 1200,
          height: 630,
          alt: dict.site.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.seo.homeTitle,
      description: dict.seo.homeDescription,
      images: ["/images/semi-truck-port-sunset.jpg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  const dict = await getDictionary(locale);

  return (
    <ThemeProvider>
      <QuoteModalProvider dict={dict}>
        <div lang={localeHtmlLang[locale]} className="relative">
          <Navbar locale={locale} dict={dict} />
          <main className="min-h-[70vh]">{children}</main>
          <Footer locale={locale} dict={dict} />
          <BusinessJsonLd locale={locale} dict={dict} />
        </div>
      </QuoteModalProvider>
    </ThemeProvider>
  );
}
