import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/lib/i18n";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Philosophy } from "@/components/sections/Philosophy";
import { Services } from "@/components/sections/Services";
import { CompareTable } from "@/components/sections/CompareTable";
import { ProfitCalculator } from "@/components/sections/ProfitCalculator";
import { Route } from "@/components/sections/Route";
import { Individual } from "@/components/sections/Individual";
import { Guarantees } from "@/components/sections/Guarantees";
import { ForWhom } from "@/components/sections/ForWhom";
import { WhyUs } from "@/components/sections/WhyUs";
import { Founder } from "@/components/sections/Founder";
import { Contact } from "@/components/sections/Contact";
import { CtaBanner } from "@/components/sections/CtaBanner";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale);

  return (
    <>
      <Hero locale={locale} dict={dict} />
      <About dict={dict} />
      <Philosophy dict={dict} />
      <Services dict={dict} />
      <CompareTable dict={dict} />
      <ProfitCalculator dict={dict} />
      <Route dict={dict} />
      <Individual dict={dict} />
      <Guarantees dict={dict} />
      <ForWhom dict={dict} />
      <WhyUs dict={dict} />
      <Founder dict={dict} />
      <Contact dict={dict} />
      <CtaBanner dict={dict} />
    </>
  );
}
