import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDictionary, hasLocale } from "@/lib/i18n";
import { defaultLocale, type Locale } from "@/lib/locales";
import { PageHero } from "@/components/sections/PageHero";
import { Services } from "@/components/sections/Services";
import { CompareTable } from "@/components/sections/CompareTable";
import { PricingCards } from "@/components/sections/PricingCards";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { WhyUs } from "@/components/sections/WhyUs";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/services">): Promise<Metadata> {
  const { locale } = await params;
  const safe: Locale = hasLocale(locale) ? locale : defaultLocale;
  const dict = await getDictionary(safe);
  return {
    title: dict.servicesPage.hero.title,
    description: dict.servicesPage.hero.description,
  };
}

export default async function ServicesPage({
  params,
}: PageProps<"/[locale]/services">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale);

  return (
    <>
      <PageHero
        eyebrow={dict.servicesPage.hero.subtitle}
        title={dict.servicesPage.hero.title}
        description={dict.servicesPage.hero.description}
        imageSrc="/images/large-cargo-truck-driving-rural-highway-with-trailer-logistics-freight-transport.jpg"
        imageAlt="Cargo truck on highway"
        videoSrc="/videos/15373444_3840_2160_25fps.mp4"
      />
      <Services locale={locale} dict={dict} />
      <CompareTable dict={dict} />
      <PricingCards locale={locale} dict={dict} />
      <WhyUs dict={dict} />
      <CtaBanner dict={dict} />
    </>
  );
}
