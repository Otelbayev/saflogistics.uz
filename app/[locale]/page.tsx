import { notFound } from "next/navigation";
import { getDictionary, hasLocale, pickDict, seoAlt } from "@/lib/i18n";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Philosophy } from "@/components/sections/Philosophy";
import { Services } from "@/components/sections/Services";
import { CompareTable } from "@/components/sections/CompareTable";
import { ProfitCalculator } from "@/components/sections/ProfitCalculator";
import { Tokens } from "@/components/sections/Tokens";
import { Route } from "@/components/sections/Route";
import { Ecosystem } from "@/components/sections/Ecosystem";
import { Individual } from "@/components/sections/Individual";
import { Guarantees } from "@/components/sections/Guarantees";
import { ForWhom } from "@/components/sections/ForWhom";
import { WhyUs } from "@/components/sections/WhyUs";
import { Founder } from "@/components/sections/Founder";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { HomePageJsonLd } from "@/components/seo/JsonLd";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale);

  return (
    <>
      <Hero locale={locale} dict={{ ...pickDict(dict, "hero"), ...seoAlt(dict) }} />
      <About dict={{ ...pickDict(dict, "about"), ...seoAlt(dict) }} />
      <Philosophy dict={pickDict(dict, "philosophy")} />
      <Services dict={pickDict(dict, "services")} />
      <CompareTable dict={pickDict(dict, "services")} />
      <ProfitCalculator dict={pickDict(dict, "calculator", "services")} />
      <Tokens dict={dict} />
      <Route dict={{ ...pickDict(dict, "route", "services"), ...seoAlt(dict) }} />
      <Ecosystem dict={dict} />
      <Individual dict={pickDict(dict, "individual")} />
      <Guarantees dict={pickDict(dict, "guarantees")} />
      <ForWhom dict={pickDict(dict, "forWhom")} />
      <WhyUs dict={pickDict(dict, "services", "why")} />
      <Founder dict={{ ...pickDict(dict, "founder"), ...seoAlt(dict) }} />
      <Faq locale={locale} dict={dict} />
      <Contact dict={dict} />
      <CtaBanner dict={pickDict(dict, "ctaBanner", "site")} />
      {/* Page-level structured data. Previously emitted by the layout, which
          meant every route claimed to be the landing page; it lives here now
          so the topic pages can describe themselves. Visible output for this
          page is unchanged. */}
      <HomePageJsonLd locale={locale} dict={dict} />
    </>
  );
}
