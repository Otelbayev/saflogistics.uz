"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/locales";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { useQuoteModal } from "@/components/ui/QuoteModal";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

const stats = [
  { key: "years", value: "5+" },
  { key: "projects", value: "500+" },
  { key: "countries", value: "15+" },
  { key: "clients", value: "120+" },
] as const;

export function Hero({ locale, dict }: Props) {
  const { open: openQuote } = useQuoteModal();

  return (
    <section className="relative isolate overflow-hidden pb-24 pt-28 sm:pt-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(55% 55% at 15% 20%, color-mix(in oklab, var(--color-brand-500) 18%, transparent) 0%, transparent 60%), radial-gradient(45% 45% at 90% 10%, color-mix(in oklab, var(--color-brand-800) 22%, transparent) 0%, transparent 60%)",
        }}
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-grid opacity-40" />

      <Container className="relative grid gap-12 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-6">
          <motion.span
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-brand-700 dark:text-brand-200"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-500/70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-500" />
            </span>
            {dict.hero.badge}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-6 text-balance text-6xl font-semibold leading-[1.02] tracking-tight sm:text-7xl md:text-8xl"
          >
            {dict.site.name}
            <span className="block text-gradient">{dict.site.tagline}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-7 max-w-xl text-lg leading-relaxed text-muted sm:text-xl"
          >
            {dict.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <Button onClick={openQuote} size="lg">
              {dict.hero.ctaContact}
              <Icon.ArrowRight size={18} />
            </Button>
            <Button
              href={`/${locale}/services`}
              size="lg"
              variant="secondary"
            >
              {dict.hero.ctaServices}
            </Button>
          </motion.div>

          <motion.ul
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08, delayChildren: 0.5 } },
            }}
            className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4"
          >
            {stats.map((s) => (
              <motion.li
                key={s.key}
                variants={{
                  hidden: { opacity: 0, y: 18 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="rounded-2xl border border-border bg-surface/80 p-4 backdrop-blur"
              >
                <div className="text-3xl font-semibold text-foreground sm:text-4xl">
                  {s.value}
                </div>
                <div className="mt-1 text-[11px] font-medium uppercase tracking-widest text-muted">
                  {dict.hero.stats[s.key]}
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="relative lg:col-span-6"
        >
          <div className="relative grid h-[640px] grid-cols-6 grid-rows-6 gap-3">
            <div className="relative col-span-6 row-span-4 overflow-hidden rounded-[2rem] border border-border shadow-[var(--shadow-elevated)]">
              <video
                className="absolute inset-0 h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                poster="/images/semi-truck-port-sunset.jpg"
              >
                <source
                  src="/videos/a-large-white-semi-truck-is-driving-down-a-highway-free-video.mp4"
                  type="video/mp4"
                />
              </video>
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(3,15,49,0) 40%, rgba(3,15,49,0.75) 100%)",
                }}
              />
              <div className="absolute inset-x-6 bottom-6 flex items-end justify-between gap-4 text-white">
                <div>
                  <div className="text-xs uppercase tracking-widest text-white/80">
                    Guangzhou → Tashkent
                  </div>
                  <div className="mt-1 text-2xl font-semibold">
                    End-to-end freight
                  </div>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs backdrop-blur">
                  <Icon.Truck size={14} /> Live
                </span>
              </div>
            </div>

            <div className="relative col-span-3 row-span-2 overflow-hidden rounded-[1.75rem] border border-border shadow-[var(--shadow-soft)]">
              <video
                className="absolute inset-0 h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                poster="/images/large-cargo-truck-driving-rural-highway-with-trailer-logistics-freight-transport.jpg"
              >
                <source
                  src="/videos/vecteezy_cargo-truck-with-cargo-trailer-is-driving-on-the-highway_47880046.mp4"
                  type="video/mp4"
                />
              </video>
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(3,15,49,0) 40%, rgba(3,15,49,0.6) 100%)",
                }}
              />
            </div>
            <div className="relative col-span-3 row-span-2 overflow-hidden rounded-[1.75rem] border border-border shadow-[var(--shadow-soft)]">
              <Image
                src="/images/industrial-port-container-yard.jpg"
                alt="Port"
                fill
                sizes="(min-width: 1024px) 320px, 50vw"
                className="object-cover"
                priority
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(3,42,125,0.45) 0%, rgba(3,15,49,0.2) 100%)",
                }}
              />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
            className="absolute -left-4 top-6 hidden rounded-2xl border border-border bg-surface/90 p-4 shadow-[var(--shadow-soft)] backdrop-blur md:flex md:items-center md:gap-3"
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-800 text-white">
              <Icon.Shield size={18} />
            </span>
            <div>
              <div className="text-xs text-muted">Insured freight</div>
              <div className="text-sm font-semibold text-foreground">
                100% protected
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            className="absolute -right-4 bottom-24 hidden rounded-2xl border border-border bg-surface/90 p-4 shadow-[var(--shadow-soft)] backdrop-blur md:flex md:items-center md:gap-3"
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500 text-white">
              <Icon.Lightning size={18} />
            </span>
            <div>
              <div className="text-xs text-muted">Express tariff</div>
              <div className="text-sm font-semibold text-foreground">
                7–14 days
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>

      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 right-0 -z-10 h-32"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, var(--background) 100%)",
        }}
      />
    </section>
  );
}
