import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/lib/i18n";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Globe3D } from "@/components/sections/Globe3D";
import { WhyUs } from "@/components/sections/WhyUs";
import { Founder } from "@/components/sections/Founder";
import { CtaBanner } from "@/components/sections/CtaBanner";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale);

  return (
    <>
      <Hero locale={locale} dict={dict} />
      <About dict={dict} />
      <Services locale={locale} dict={dict} />
      <Globe3D dict={dict} />
      <WhyUs dict={dict} />
      <Founder dict={dict} />
      <CtaBanner dict={dict} />
    </>
  );
}
