"use client";

import { motion } from "framer-motion";
import type { Dictionary } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { Flag } from "@/components/ui/Flag";

type Props = { dict: Dictionary };

const featuredCodes = ["CN", "UZ", "RU", "TR"] as const;

const VBW = 900;
const VBH = 560;
const CX = VBW / 2;
const CY = VBH / 2;
const RX = 320;
const RY = 200;

export function Globe3D({ dict }: Props) {
  const hub = siteConfig.partnerCountries.find((c) => c.hub)!;
  const partners = siteConfig.partnerCountries.filter((c) => !c.hub);

  const positions = partners.map((p, i) => {
    const angle = (i / partners.length) * Math.PI * 2 - Math.PI / 2;
    const x = CX + Math.cos(angle) * RX;
    const y = CY + Math.sin(angle) * RY;
    return {
      ...p,
      x,
      y,
      leftPct: (x / VBW) * 100,
      topPct: (y / VBH) * 100,
    };
  });

  const featured = featuredCodes
    .map((code) => siteConfig.partnerCountries.find((c) => c.code === code))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));
  const others = siteConfig.partnerCountries.filter(
    (c) => !(featuredCodes as readonly string[]).includes(c.code) && !c.hub,
  );

  return (
    <section id="network" className="relative overflow-hidden py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(55% 50% at 50% 40%, color-mix(in oklab, var(--color-brand-500) 14%, transparent), transparent 70%)",
        }}
      />
      <Container>
        <SectionHeading
          eyebrow={dict.globe.subtitle}
          title={dict.globe.title}
          subtitle={dict.globe.description}
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="relative mx-auto mt-14 max-w-6xl overflow-hidden rounded-3xl border border-border bg-surface p-5 shadow-(--shadow-soft) sm:p-10 dark:bg-brand-950/60"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-dots opacity-25 dark:opacity-40"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(45% 50% at 50% 50%, color-mix(in oklab, var(--color-brand-500) 18%, transparent), transparent 70%)",
            }}
          />

          {/* Top status bar */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-3 py-1.5 text-xs font-semibold text-foreground backdrop-blur dark:border-white/15 dark:bg-white/10 dark:text-white">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              {dict.globe.activeRoutes} · 24
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-3 py-1.5 text-xs font-semibold text-foreground backdrop-blur dark:border-white/15 dark:bg-white/10 dark:text-white">
              <Icon.Globe size={12} />
              {dict.globe.partners} · 15+
            </div>
          </div>

          {/* Network diagram */}
          <div
            className="relative z-10 mx-auto mt-6 w-full"
            style={{ aspectRatio: `${VBW} / ${VBH}` }}
          >
            <svg
              viewBox={`0 0 ${VBW} ${VBH}`}
              className="absolute inset-0 h-full w-full"
              aria-hidden
            >
              <defs>
                <radialGradient id="hub-glow" cx="50%" cy="50%" r="50%">
                  <stop
                    offset="0%"
                    stopColor="var(--color-brand-500)"
                    stopOpacity="0.55"
                  />
                  <stop
                    offset="60%"
                    stopColor="var(--color-brand-500)"
                    stopOpacity="0.15"
                  />
                  <stop
                    offset="100%"
                    stopColor="var(--color-brand-500)"
                    stopOpacity="0"
                  />
                </radialGradient>
                <linearGradient id="arc-grad" gradientUnits="userSpaceOnUse">
                  <stop
                    offset="0%"
                    stopColor="var(--color-brand-500)"
                    stopOpacity="0.85"
                  />
                  <stop
                    offset="100%"
                    stopColor="var(--color-brand-500)"
                    stopOpacity="0.25"
                  />
                </linearGradient>
              </defs>

              {/* Concentric guide rings */}
              <ellipse
                cx={CX}
                cy={CY}
                rx={RX + 40}
                ry={RY + 28}
                fill="none"
                stroke="currentColor"
                strokeOpacity="0.08"
                className="text-brand-700 dark:text-white"
              />
              <ellipse
                cx={CX}
                cy={CY}
                rx={RX}
                ry={RY}
                fill="none"
                stroke="currentColor"
                strokeOpacity="0.18"
                strokeDasharray="2 8"
                className="text-brand-700 dark:text-white"
              />
              <ellipse
                cx={CX}
                cy={CY}
                rx={RX - 90}
                ry={RY - 56}
                fill="none"
                stroke="currentColor"
                strokeOpacity="0.1"
                className="text-brand-700 dark:text-white"
              />

              {/* Hub glow */}
              <circle cx={CX} cy={CY} r="160" fill="url(#hub-glow)" />

              {/* Arcs */}
              {positions.map((p, i) => {
                const dx = p.x - CX;
                const dy = p.y - CY;
                const len = Math.hypot(dx, dy) || 1;
                const lift = 80;
                const midX = CX + dx * 0.5 - (dy / len) * lift * 0.3;
                const midY = CY + dy * 0.5 + (dx / len) * lift * 0.3 - lift;
                const path = `M ${CX} ${CY} Q ${midX} ${midY} ${p.x} ${p.y}`;
                return (
                  <g key={p.code}>
                    <path
                      d={path}
                      fill="none"
                      stroke="url(#arc-grad)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeDasharray="4 8"
                      className="route-line"
                      style={{ animationDelay: `${i * 0.12}s` }}
                    />
                  </g>
                );
              })}

              {/* Hub center */}
              <g>
                <circle
                  cx={CX}
                  cy={CY}
                  r="36"
                  className="fill-brand-700 dark:fill-brand-500"
                />
                <circle
                  cx={CX}
                  cy={CY}
                  r="36"
                  fill="none"
                  className="stroke-brand-500"
                  strokeOpacity="0.5"
                  strokeWidth="2"
                  strokeDasharray="3 5"
                >
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from={`0 ${CX} ${CY}`}
                    to={`360 ${CX} ${CY}`}
                    dur="20s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle
                  cx={CX}
                  cy={CY}
                  r="36"
                  fill="none"
                  className="stroke-brand-500"
                  strokeOpacity="0.4"
                >
                  <animate
                    attributeName="r"
                    values="36;52;36"
                    dur="2.4s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="stroke-opacity"
                    values="0.4;0;0.4"
                    dur="2.4s"
                    repeatCount="indefinite"
                  />
                </circle>
              </g>

              {/* Partner dots */}
              {positions.map((p) => (
                <g key={p.code}>
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r="14"
                    fill="none"
                    className="stroke-brand-500"
                    strokeOpacity="0.35"
                    strokeWidth="1"
                  >
                    <animate
                      attributeName="r"
                      values="14;22;14"
                      dur="2.6s"
                      begin={`${(positions.indexOf(p) * 0.18) % 2.6}s`}
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="stroke-opacity"
                      values="0.35;0;0.35"
                      dur="2.6s"
                      begin={`${(positions.indexOf(p) * 0.18) % 2.6}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r="9"
                    className="fill-brand-700 dark:fill-brand-300"
                  />
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r="3"
                    className="fill-white"
                  />
                </g>
              ))}
            </svg>

            {/* HTML overlay labels */}
            <div className="pointer-events-none absolute inset-0">
              {/* Hub label */}
              <div
                className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
                style={{ left: "50%", top: "50%" }}
              >
                <div className="flex flex-col items-center gap-2">
                  <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-brand-700 shadow-(--shadow-glow) dark:bg-brand-500">
                    <Flag code={hub.code} width={40} square />
                  </div>
                  <div className="rounded-full border border-brand-500/30 bg-background/90 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-800 backdrop-blur dark:border-white/20 dark:bg-white/10 dark:text-white">
                    {hub.name} · HUB
                  </div>
                </div>
              </div>

              {/* Partner labels */}
              {positions.map((p) => {
                const isLeft = p.leftPct < 50;
                return (
                  <div
                    key={p.code}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: `${p.leftPct}%`,
                      top: `${p.topPct}%`,
                    }}
                  >
                    <div
                      className={`flex items-center gap-1.5 ${isLeft ? "flex-row-reverse" : ""}`}
                    >
                      <span className="h-3 w-3 shrink-0 rounded-full" />
                      <div className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface/95 px-2 py-1 text-[10px] font-semibold text-foreground shadow-(--shadow-soft) backdrop-blur dark:border-white/15 dark:bg-white/10 dark:text-white">
                        <Flag code={p.code} width={14} />
                        <span className="uppercase tracking-wider">
                          {p.code}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* KPI strip */}
          <div className="relative z-10 mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Kpi
              icon={<Icon.Globe size={14} />}
              label={dict.globe.partners}
              value="15+"
            />
            <Kpi
              icon={<Icon.Truck size={14} />}
              label={dict.globe.activeRoutes}
              value="24"
            />
            <Kpi
              icon={<Icon.Lightning size={14} />}
              label={dict.hero.badgeExpressValue}
              value="7–14d"
            />
            <Kpi
              icon={<Icon.Shield size={14} />}
              label={dict.hero.badgeInsuredValue}
              value="100%"
            />
          </div>
        </motion.div>

        {/* Featured + others (kept) */}
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {featured.map((c, i) => {
            const isHub = !!c.hub;
            return (
              <motion.div
                key={c.code}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                className={`group relative overflow-hidden rounded-2xl border p-4 transition hover:-translate-y-0.5 ${
                  isHub
                    ? "border-brand-500/40 bg-linear-to-br from-brand-800 to-brand-950 text-white shadow-(--shadow-soft)"
                    : "border-border bg-surface hover:border-brand-500/40"
                }`}
              >
                <div className="flex items-center justify-between">
                  <Flag code={c.code} width={32} />
                  {isHub ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest backdrop-blur">
                      <Icon.MapPin size={10} />
                      {dict.globe.hubTag}
                    </span>
                  ) : (
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-border bg-background transition group-hover:bg-brand-500 group-hover:text-white">
                      <Icon.ArrowRight size={11} />
                    </span>
                  )}
                </div>
                <div
                  className={`mt-4 text-base font-semibold ${
                    isHub ? "text-white" : "text-foreground"
                  }`}
                >
                  {c.name}
                </div>
                <div
                  className={`text-[11px] uppercase tracking-widest ${
                    isHub ? "text-white/70" : "text-muted"
                  }`}
                >
                  {c.code}
                </div>
              </motion.div>
            );
          })}
        </div>

        {others.length > 0 && (
          <ul className="mt-6 flex flex-wrap justify-center gap-2 text-xs">
            {others.map((c) => (
              <li
                key={c.code}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 font-medium text-muted"
              >
                <Flag code={c.code} width={16} />
                {c.name}
              </li>
            ))}
          </ul>
        )}
      </Container>
    </section>
  );
}

function Kpi({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-background/60 p-3 backdrop-blur dark:border-white/10 dark:bg-white/5">
      <div className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-widest text-muted dark:text-white/65">
        <span className="text-brand-700 dark:text-brand-300">{icon}</span>
        {label}
      </div>
      <div className="mt-1.5 text-xl font-semibold text-foreground dark:text-white">
        {value}
      </div>
    </div>
  );
}
