"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
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

const PARTICLE_COUNT = 36;

export function Hero({ locale, dict }: Props) {
  const { open: openQuote } = useQuoteModal();

  const particles = useMemo(
    () =>
      Array.from({ length: PARTICLE_COUNT }, (_, i) => {
        const seed = i * 9301 + 49297;
        const r1 = ((seed * 233280 + 1) % 1000) / 1000;
        const r2 = ((seed * 16807 + 1) % 1000) / 1000;
        const r3 = ((seed * 65539 + 1) % 1000) / 1000;
        const r4 = ((seed * 1103515245 + 12345) % 1000) / 1000;
        const r5 = ((seed * 22695477 + 1) % 1000) / 1000;
        return {
          left: `${r1 * 100}%`,
          top: `${r2 * 100}%`,
          dur: `${6 + r3 * 9}s`,
          dx: `${(r4 - 0.5) * 80}px`,
          delay: `${r5 * 9}s`,
          size: `${1 + r3 * 2}px`,
        };
      }),
    [],
  );

  return (
    <section
      id="showcase"
      className="relative isolate flex min-h-svh w-full flex-col overflow-hidden pt-24 pb-20 sm:pt-28"
    >
      <video
        className="absolute inset-0 -z-30 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster="/images/semi-truck-port-sunset.jpg"
      >
        <source src="/videos/15373444_3840_2160_25fps.mp4" type="video/mp4" />
      </video>

      {/* Theme-aware video overlay */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20 dark:hidden"
        style={{
          background:
            "linear-gradient(135deg, rgba(247, 249, 255, 0.42) 0%, rgba(237, 241, 251, 0.32) 45%, rgba(3, 42, 125, 0.32) 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-20 hidden dark:block"
        style={{
          background:
            "linear-gradient(135deg, rgba(5,13,26,0.85) 0%, rgba(5,13,26,0.7) 45%, rgba(13,59,122,0.55) 70%, rgba(5,13,26,0.85) 100%)",
        }}
      />

      {/* Brand glow accents */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 60% at 18% 30%, color-mix(in oklab, var(--color-brand-800) 22%, transparent) 0%, transparent 65%), radial-gradient(40% 40% at 90% 80%, color-mix(in oklab, var(--color-brand-500) 18%, transparent) 0%, transparent 65%)",
        }}
      />

      {/* Animated grid */}
      <div
        aria-hidden
        className="showcase-grid pointer-events-none absolute inset-0 -z-10"
      />

      {/* Particles */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        {particles.map((p, i) => (
          <span
            key={i}
            className="showcase-particle"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              animationDuration: p.dur,
              animationDelay: p.delay,
              ["--dx" as string]: p.dx,
            }}
          />
        ))}
      </div>

      {/* 3D Cube + Orbits */}
      <div
        aria-hidden
        className="showcase-cube-wrap pointer-events-none absolute right-[5vw] top-1/2 hidden h-[420px] w-[420px] -translate-y-1/2 lg:block"
      >
        <div className="showcase-orbit h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2">
          <div className="showcase-orbit-dot" />
        </div>
        <div
          className="showcase-orbit h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2"
          style={{ animationDuration: "16s", animationDirection: "reverse" }}
        >
          <div className="showcase-orbit-dot" />
        </div>
        <div
          className="showcase-orbit h-[440px] w-[440px] -translate-x-1/2 -translate-y-1/2 opacity-60"
          style={{ animationDuration: "20s" }}
        >
          <div className="showcase-orbit-dot" />
        </div>
        <div className="showcase-cube">
          <div className="showcase-face showcase-face--front">
            <CubeIcon variant="cross" />
          </div>
          <div className="showcase-face showcase-face--back">
            <CubeIcon variant="grid" />
          </div>
          <div className="showcase-face showcase-face--left">
            <CubeIcon variant="triangle" />
          </div>
          <div className="showcase-face showcase-face--right">
            <CubeIcon variant="circles" />
          </div>
          <div className="showcase-face showcase-face--top" />
          <div className="showcase-face showcase-face--bottom" />
        </div>
      </div>

      {/* Floating info boxes */}
      <FloatBox
        className="right-[42%] bottom-[26%] hidden md:inline-flex"
        style={{ ["--dur" as string]: "3.4s" }}
      >
        <Icon.Sparkle size={12} /> {dict.hero.float1}
      </FloatBox>
      <FloatBox
        className="right-[26%] top-[24%] hidden md:inline-flex"
        style={{ ["--dur" as string]: "4.2s" }}
      >
        <Icon.Globe size={12} /> {dict.hero.float2}
      </FloatBox>

      <Container className="relative flex flex-1 flex-col justify-center">
        <div className="max-w-2xl">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-brand-700/30 bg-white/70 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-800 backdrop-blur dark:border-white/15 dark:bg-white/10 dark:text-brand-200"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-500/80" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-500 dark:bg-brand-300" />
            </span>
            {dict.hero.badge}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-brand-950 sm:text-6xl md:text-7xl dark:text-white"
          >
            {dict.hero.titleLine1}
            <span className="block">
              {dict.hero.titleLine2}{" "}
              <span className="bg-gradient-to-r from-brand-700 via-brand-500 to-brand-800 bg-clip-text text-transparent dark:from-brand-200 dark:via-white dark:to-brand-300">
                {dict.hero.titleAccent}
              </span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-brand-950/80 sm:mt-8 sm:text-lg dark:text-white/85"
          >
            {dict.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Button onClick={openQuote} size="lg">
              {dict.hero.ctaContact}
              <Icon.ArrowRight size={18} />
            </Button>
            <Button
              href={`/${locale}/services`}
              size="lg"
              variant="secondary"
              className="border-brand-700/30 bg-white/70 text-brand-900 backdrop-blur hover:bg-white dark:border-white/25 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
            >
              {dict.hero.ctaServices}
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-9 flex flex-wrap items-center gap-2.5 text-brand-950/85 dark:text-white/85"
          >
            <Pill>
              <Icon.Shield size={14} /> {dict.hero.badgeInsuredValue}
            </Pill>
            <Pill>
              <Icon.Lightning size={14} /> {dict.hero.badgeExpressValue}
            </Pill>
            <Pill>
              <Icon.Truck size={14} /> {dict.hero.routeValue}
            </Pill>
          </motion.div>
        </div>
      </Container>

      <Container className="relative mt-12">
        <motion.ul
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.08, delayChildren: 0.55 },
            },
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
              className="rounded-2xl border border-brand-700/20 bg-white/60 p-4 backdrop-blur-md dark:border-white/15 dark:bg-white/10"
            >
              <div className="text-3xl font-semibold text-brand-950 sm:text-4xl dark:text-white">
                {s.value}
              </div>
              <div className="mt-1 text-[10px] font-medium uppercase tracking-widest text-brand-900/75 sm:text-[11px] dark:text-white/75">
                {dict.hero.stats[s.key]}
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </Container>

      {/* Animated road accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-16 left-0 right-0 z-0 h-[2px]"
      >
        <div className="showcase-road h-full w-full" />
      </div>

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

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-brand-700/25 bg-white/65 px-3 py-1.5 text-xs backdrop-blur dark:border-white/20 dark:bg-white/10">
      {children}
    </span>
  );
}

function FloatBox({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`showcase-floatbox pointer-events-none absolute z-10 inline-flex items-center gap-1.5 whitespace-nowrap rounded-xl border border-brand-700/25 bg-white/70 px-3.5 py-2.5 text-xs font-medium text-brand-900 backdrop-blur dark:border-white/15 dark:bg-brand-900/40 dark:text-brand-100 ${className ?? ""}`}
      style={style}
    >
      {children}
    </div>
  );
}

function CubeIcon({
  variant,
}: {
  variant: "cross" | "grid" | "triangle" | "circles";
}) {
  const stroke = "currentColor";
  const props = {
    width: 70,
    height: 70,
    viewBox: "0 0 60 60",
    fill: "none",
    className: "text-brand-700 dark:text-cyan-300",
  } as const;
  if (variant === "cross") {
    return (
      <svg {...props}>
        <path
          d="M5 30 L55 30 M30 5 L30 55 M10 10 L50 50 M50 10 L10 50"
          stroke={stroke}
          strokeWidth={1.5}
          strokeLinecap="round"
        />
        <circle cx="30" cy="30" r="12" stroke={stroke} strokeWidth={1.5} />
        <circle cx="30" cy="30" r="22" stroke={stroke} strokeWidth={1} />
      </svg>
    );
  }
  if (variant === "grid") {
    return (
      <svg {...props}>
        <rect
          x="10"
          y="10"
          width="40"
          height="40"
          stroke={stroke}
          strokeWidth={1.5}
          rx={4}
        />
        <path
          d="M10 25 L50 25 M10 35 L50 35 M25 10 L25 50 M35 10 L35 50"
          stroke={stroke}
          strokeWidth={1}
        />
      </svg>
    );
  }
  if (variant === "triangle") {
    return (
      <svg {...props}>
        <polygon
          points="30,5 55,50 5,50"
          stroke={stroke}
          strokeWidth={1.5}
          fill="none"
        />
      </svg>
    );
  }
  return (
    <svg {...props}>
      <circle cx="30" cy="30" r="20" stroke={stroke} strokeWidth={1.5} />
      <circle cx="30" cy="30" r="5" fill={stroke} opacity={0.5} />
    </svg>
  );
}
