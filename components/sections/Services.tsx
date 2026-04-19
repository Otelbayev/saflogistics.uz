"use client";

import { motion } from "framer-motion";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/locales";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

type Props = { locale: Locale; dict: Dictionary };

export function Services({ locale, dict }: Props) {
  const tiers = [
    {
      key: "standard" as const,
      icon: <Icon.Ship size={22} />,
      accent: "from-brand-700 to-brand-900",
    },
    {
      key: "express" as const,
      icon: <Icon.Plane size={22} />,
      accent: "from-brand-500 to-brand-800",
      featured: true,
    },
  ];

  return (
    <section id="services" className="relative py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow={dict.services.subtitle}
          title={dict.services.title}
          subtitle={dict.services.description}
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {tiers.map((t, i) => {
            const tier = dict.services[t.key];
            return (
              <motion.article
                key={t.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className={`group relative overflow-hidden rounded-3xl border bg-surface p-8 transition-all duration-500 hover:-translate-y-2 ${
                  t.featured
                    ? "border-brand-500/40 ring-1 ring-brand-500/30"
                    : "border-border"
                }`}
              >
                <div
                  aria-hidden
                  className={`pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-linear-to-br ${t.accent} opacity-20 blur-3xl transition duration-700 group-hover:opacity-40`}
                />
                {t.featured ? (
                  <span className="absolute right-6 top-6 inline-flex items-center gap-1 rounded-full border border-brand-500/40 bg-brand-500/10 px-3 py-1 text-xs font-medium uppercase tracking-widest text-brand-600 dark:text-brand-200">
                    <Icon.Lightning size={12} />
                    {dict.servicesPage.pricing.popular}
                  </span>
                ) : null}
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-800 text-white">
                  {t.icon}
                </div>
                <h3 className="mt-6 text-2xl font-semibold text-foreground">
                  {tier.name}
                </h3>
                <p className="mt-2 text-sm text-muted">{tier.description}</p>
                <div className="mt-6 flex items-baseline gap-3">
                  <span className="text-3xl font-semibold text-foreground">
                    {tier.price}
                  </span>
                  <span className="text-sm text-muted">· {tier.duration}</span>
                </div>
                <ul className="mt-8 space-y-4 text-base text-foreground">
                  {tier.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-4 rounded-2xl border border-border bg-background/60 px-4 py-3.5 transition hover:border-brand-500/40 hover:bg-background"
                    >
                      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-800 text-white shadow-(--shadow-soft)">
                        <Icon.Check size={16} />
                      </span>
                      <span className="font-medium">{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Button
                    href={`/${locale}/contact`}
                    variant={t.featured ? "primary" : "outline"}
                    className="w-full"
                  >
                    {dict.services.cta}
                    <Icon.ArrowRight size={16} />
                  </Button>
                </div>
              </motion.article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
