"use client";

import { motion } from "framer-motion";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/locales";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

type Props = { locale: Locale; dict: Dictionary };

export function PricingCards({ locale, dict }: Props) {
  const tiers = [
    {
      key: "standard" as const,
      price: "From $2.8/kg",
      accent: "from-brand-700 to-brand-900",
    },
    {
      key: "express" as const,
      price: "From $5.9/kg",
      accent: "from-brand-500 to-brand-800",
      featured: true,
    },
  ];

  return (
    <section className="py-24">
      <Container>
        <SectionHeading
          eyebrow={dict.servicesPage.pricing.subtitle}
          title={dict.servicesPage.pricing.title}
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {tiers.map((t, i) => {
            const tier = dict.services[t.key];
            return (
              <motion.div
                key={t.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15, margin: "0px 0px -80px 0px" }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className={`relative overflow-hidden rounded-3xl border bg-surface p-8 ${
                  t.featured
                    ? "border-brand-500/40 ring-1 ring-brand-500/30"
                    : "border-border"
                }`}
              >
                <div
                  aria-hidden
                  className={`pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-linear-to-br ${t.accent} opacity-20 blur-3xl`}
                />
                {t.featured ? (
                  <span className="absolute right-6 top-6 inline-flex items-center gap-1 rounded-full border border-brand-500/40 bg-brand-500/10 px-3 py-1 text-xs uppercase tracking-widest text-brand-600 dark:text-brand-200">
                    <Icon.Lightning size={12} />
                    {dict.servicesPage.pricing.popular}
                  </span>
                ) : null}
                <h3 className="text-2xl font-semibold text-foreground">
                  {tier.name}
                </h3>
                <p className="mt-2 text-sm text-muted">{tier.description}</p>
                <div className="mt-6 text-4xl font-semibold text-foreground">
                  {t.price}
                </div>
                <div className="mt-1 text-sm text-muted">
                  {dict.servicesPage.pricing.month} · {tier.duration}
                </div>
                <ul className="mt-6 space-y-3 text-sm text-foreground/90">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-brand-800 text-white">
                        <Icon.Check size={12} />
                      </span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  href={`/${locale}/contact`}
                  variant={t.featured ? "primary" : "outline"}
                  className="mt-8 w-full"
                >
                  {dict.servicesPage.pricing.cta}
                  <Icon.ArrowRight size={16} />
                </Button>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
