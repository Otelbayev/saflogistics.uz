"use client";

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
    <section className="relative isolate flex min-h-svh w-full flex-col overflow-hidden pt-24 pb-16 sm:pt-28 sm:pb-20">
      <video
        className="absolute inset-0 -z-20 h-full w-full object-cover"
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
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(3,15,49,0.78) 0%, rgba(3,15,49,0.55) 45%, rgba(3,15,49,0.92) 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 60% at 20% 30%, color-mix(in oklab, var(--color-brand-500) 28%, transparent) 0%, transparent 65%)",
        }}
      />

      <Container className="relative flex flex-1 flex-col justify-center">
        <div className="max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400/80" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-300" />
            </span>
            {dict.hero.badge}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl"
          >
            {dict.hero.titleLine1}
            <span className="block">
              {dict.hero.titleLine2}{" "}
              <span className="bg-linear-to-r from-brand-200 via-white to-brand-300 bg-clip-text text-transparent">
                {dict.hero.titleAccent}
              </span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 max-w-2xl text-base leading-relaxed text-white/85 sm:mt-8 sm:text-xl"
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
              className="border-white/30 bg-white/10 text-white backdrop-blur hover:bg-white/20"
            >
              {dict.hero.ctaServices}
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-10 flex flex-wrap items-center gap-3 text-white/85"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs backdrop-blur">
              <Icon.Shield size={14} /> {dict.hero.badgeInsuredValue}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs backdrop-blur">
              <Icon.Lightning size={14} /> {dict.hero.badgeExpressValue}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs backdrop-blur">
              <Icon.Truck size={14} /> {dict.hero.routeValue}
            </span>
          </motion.div>
        </div>
      </Container>

      <Container className="relative mt-10">
        <motion.ul
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08, delayChildren: 0.6 } },
          }}
          className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4"
        >
          {stats.map((s) => (
            <motion.li
              key={s.key}
              variants={{
                hidden: { opacity: 0, y: 18 },
                visible: { opacity: 1, y: 0 },
              }}
              className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md"
            >
              <div className="text-3xl font-semibold text-white sm:text-4xl">
                {s.value}
              </div>
              <div className="mt-1 text-[10px] font-medium uppercase tracking-widest text-white/75 sm:text-[11px]">
                {dict.hero.stats[s.key]}
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </Container>

      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-28"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, var(--background) 100%)",
        }}
      />
    </section>
  );
}
