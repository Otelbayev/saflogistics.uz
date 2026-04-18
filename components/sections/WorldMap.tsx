"use client";

import { motion } from "framer-motion";
import type { Dictionary } from "@/lib/i18n";
import { siteConfig, type PartnerCountry } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";

type Props = { dict: Dictionary };

// Equirectangular projection (lng -180..180 → 0..W, lat 90..-90 → 0..H)
function project(lat: number, lng: number, w = 1000, h = 500) {
  return {
    x: ((lng + 180) / 360) * w,
    y: ((90 - lat) / 180) * h,
  };
}

// Low-res land mask (40x20) — each char is one cell; "#" = land, "." = sea.
// Derived from a simplified world map to keep the visual recognizable.
const LAND_MASK = [
  "........................................", // 90..81
  "........................................", // 81..72
  "...#########...##############...........", // 72..63
  "..#################################...#.", // 63..54
  "..############..######################..", // 54..45
  "..########.....#########################", // 45..36
  "...######....###########################", // 36..27
  "....####.....#########.########.####....", // 27..18
  ".....###.....########....######.........", // 18..9
  "......##......########.....####.........", // 9..0
  ".......#.....###########...##...........", // 0..-9
  ".......#....#############...............", // -9..-18
  ".......##....############...............", // -18..-27
  "........#....#######.####...............", // -27..-36
  "........#....######.....................", // -36..-45
  ".............####.......................", // -45..-54
  "........................................", // -54..-63
  "........................................", // -63..-72
  "........................................", // -72..-81
  "........................................", // -81..-90
];

type Dot = { x: number; y: number };
const landDots: Dot[] = (() => {
  const dots: Dot[] = [];
  const rows = LAND_MASK.length;
  const cols = LAND_MASK[0].length;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (LAND_MASK[r][c] === "#") {
        dots.push({
          x: (c + 0.5) * (1000 / cols),
          y: (r + 0.5) * (500 / rows),
        });
      }
    }
  }
  return dots;
})();

export function WorldMap({ dict }: Props) {
  const hub = siteConfig.partnerCountries.find((c) => c.hub) as PartnerCountry;
  const hubPt = project(hub.lat, hub.lng);
  const partners = siteConfig.partnerCountries.filter((c) => !c.hub);

  return (
    <section id="network" className="relative overflow-hidden py-28 sm:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 30%, color-mix(in oklab, var(--color-brand-500) 12%, transparent), transparent 70%)",
        }}
      />
      <Container>
        <SectionHeading
          eyebrow={dict.globe.subtitle}
          title={dict.globe.title}
          subtitle={dict.globe.description}
        />

        <div className="relative mt-14 overflow-hidden rounded-[2.5rem] border border-border bg-surface p-4 shadow-[var(--shadow-elevated)] sm:p-8">
          <div
            aria-hidden
            className="pointer-events-none absolute -left-20 top-10 h-80 w-80 rounded-full bg-brand-500/15 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-brand-800/15 blur-3xl"
          />

          <div className="relative">
            <svg
              viewBox="0 0 1000 500"
              className="h-auto w-full"
              role="img"
              aria-label="SAF Logistics — global partner network"
            >
              <defs>
                <radialGradient id="hubPulse" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#8cabff" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#8cabff" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="arcStroke" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0%" stopColor="var(--color-brand-300)" stopOpacity="0.9" />
                  <stop offset="60%" stopColor="var(--color-brand-500)" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="var(--color-brand-800)" stopOpacity="0.9" />
                </linearGradient>
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="4" result="b" />
                  <feMerge>
                    <feMergeNode in="b" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* land dots */}
              <g>
                {landDots.map((d, i) => (
                  <circle
                    key={i}
                    cx={d.x}
                    cy={d.y}
                    r={2.3}
                    fill="var(--color-brand-500)"
                    opacity="0.35"
                  />
                ))}
              </g>

              {/* arcs from hub to each partner */}
              {partners.map((c, i) => {
                const p = project(c.lat, c.lng);
                const dx = p.x - hubPt.x;
                const midX = (hubPt.x + p.x) / 2;
                const midY =
                  Math.min(hubPt.y, p.y) - Math.min(180, Math.abs(dx) * 0.35);
                const d = `M ${hubPt.x} ${hubPt.y} Q ${midX} ${midY}, ${p.x} ${p.y}`;
                return (
                  <g key={c.code}>
                    <motion.path
                      d={d}
                      fill="none"
                      stroke="url(#arcStroke)"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 0.9 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{
                        duration: 1.6,
                        delay: 0.1 + i * 0.06,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    />
                    <path
                      d={d}
                      fill="none"
                      stroke="var(--color-brand-300)"
                      strokeWidth="1"
                      strokeLinecap="round"
                      opacity="0.5"
                      className="route-line"
                    />
                  </g>
                );
              })}

              {/* partner markers */}
              {partners.map((c, i) => {
                const p = project(c.lat, c.lng);
                return (
                  <motion.g
                    key={c.code}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: 0.3 + i * 0.05, duration: 0.5 }}
                  >
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={4.5}
                      fill="var(--color-brand-500)"
                      stroke="#fff"
                      strokeWidth="1.5"
                      filter="url(#glow)"
                    />
                    <text
                      x={p.x + 9}
                      y={p.y + 4}
                      fontSize="12"
                      fontWeight="600"
                      fill="var(--foreground)"
                      style={{ paintOrder: "stroke" }}
                      stroke="var(--surface)"
                      strokeWidth="3"
                    >
                      {c.name}
                    </text>
                  </motion.g>
                );
              })}

              {/* hub */}
              <g>
                <circle
                  cx={hubPt.x}
                  cy={hubPt.y}
                  r={40}
                  fill="url(#hubPulse)"
                />
                <circle
                  cx={hubPt.x}
                  cy={hubPt.y}
                  r={10}
                  fill="var(--color-brand-300)"
                  opacity="0.55"
                  style={{
                    transformOrigin: `${hubPt.x}px ${hubPt.y}px`,
                    animation: "marker-pulse 2.4s ease-out infinite",
                  }}
                />
                <circle
                  cx={hubPt.x}
                  cy={hubPt.y}
                  r={7}
                  fill="var(--color-brand-300)"
                  stroke="#fff"
                  strokeWidth="2"
                  filter="url(#glow)"
                />
                <text
                  x={hubPt.x + 12}
                  y={hubPt.y - 10}
                  fontSize="14"
                  fontWeight="700"
                  fill="var(--foreground)"
                  style={{ paintOrder: "stroke" }}
                  stroke="var(--surface)"
                  strokeWidth="3"
                >
                  {hub.name} · HUB
                </text>
              </g>
            </svg>
          </div>

          <div className="relative mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
            <div className="flex items-center gap-3 text-sm">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-800 text-white shadow-[var(--shadow-soft)]">
                <Icon.Globe size={18} />
              </span>
              <span className="font-semibold text-foreground">
                {dict.globe.hub}
              </span>
            </div>
            <ul className="flex flex-wrap gap-2 text-xs">
              {siteConfig.partnerCountries.map((c) => (
                <li
                  key={c.code}
                  className={`rounded-full border px-3 py-1.5 font-medium ${
                    c.hub
                      ? "border-brand-500/40 bg-brand-500/10 text-brand-700 dark:text-brand-200"
                      : "border-border bg-background text-muted"
                  }`}
                >
                  {c.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
