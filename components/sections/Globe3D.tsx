"use client";

import { useEffect, useRef, useState } from "react";
import createGlobe, { type COBEOptions } from "cobe";
import { motion } from "framer-motion";
import type { Dictionary } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";

type Props = { dict: Dictionary };

const featuredCodes = ["CN", "UZ", "RU", "TR"] as const;
const flags: Record<string, string> = {
  CN: "🇨🇳",
  UZ: "🇺🇿",
  RU: "🇷🇺",
  TR: "🇹🇷",
  KZ: "🇰🇿",
  KR: "🇰🇷",
  DE: "🇩🇪",
  US: "🇺🇸",
};

export function Globe3D({ dict }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const check = () =>
      setIsDark(document.documentElement.classList.contains("dark"));
    check();
    const mo = new MutationObserver(check);
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => mo.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const hub = siteConfig.partnerCountries.find((c) => c.hub)!;
    const partners = siteConfig.partnerCountries.filter((c) => !c.hub);

    const markers = [
      { location: [hub.lat, hub.lng] as [number, number], size: 0.14 },
      ...partners.map((c) => ({
        location: [c.lat, c.lng] as [number, number],
        size: 0.06,
      })),
    ];

    const arcs = partners.map((c) => ({
      from: [hub.lat, hub.lng] as [number, number],
      to: [c.lat, c.lng] as [number, number],
    }));

    let size = Math.max(container.clientWidth, 1);
    let phi = -(hub.lng * Math.PI) / 180;

    const options: COBEOptions & {
      onRender: (state: Record<string, number | number[]>) => void;
    } = {
      devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
      width: size * 2,
      height: size * 2,
      phi: 0,
      theta: 0.25,
      dark: isDark ? 1 : 0,
      diffuse: 1.2,
      mapSamples: 18000,
      mapBrightness: isDark ? 6 : 5,
      baseColor: isDark ? [0.35, 0.45, 0.75] : [0.55, 0.65, 0.88],
      markerColor: [0.25, 0.45, 1],
      glowColor: isDark ? [0.25, 0.35, 0.7] : [0.6, 0.7, 0.95],
      markers,
      arcs,
      arcColor: [0.35, 0.55, 1],
      arcWidth: 0.7,
      arcHeight: 0.45,
      onRender: (state) => {
        state.phi = phi;
        phi += 0.0022;
        state.width = size * 2;
        state.height = size * 2;
      },
    };

    const globe = createGlobe(canvas, options);

    const ro = new ResizeObserver(() => {
      size = Math.max(container.clientWidth, 1);
    });
    ro.observe(container);

    return () => {
      globe.destroy();
      ro.disconnect();
    };
  }, [isDark]);

  const featured = featuredCodes
    .map((code) => siteConfig.partnerCountries.find((c) => c.code === code))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));
  const others = siteConfig.partnerCountries.filter(
    (c) => !(featuredCodes as readonly string[]).includes(c.code) && !c.hub,
  );
  const hub = siteConfig.partnerCountries.find((c) => c.hub)!;

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

        <div className="relative mx-auto mt-14 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            ref={containerRef}
            className="relative mx-auto aspect-square w-full max-w-170"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10 rounded-full"
              style={{
                background:
                  "radial-gradient(50% 50% at 50% 50%, color-mix(in oklab, var(--color-brand-500) 28%, transparent), transparent 70%)",
                filter: "blur(50px)",
              }}
            />
            <canvas
              ref={canvasRef}
              style={{
                width: "100%",
                height: "100%",
                aspectRatio: "1 / 1",
                cursor: "grab",
                contain: "layout paint size",
              }}
            />

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="absolute left-2 top-2 flex items-center gap-2 rounded-full border border-border bg-surface/90 px-3 py-1.5 text-xs font-semibold text-foreground shadow-(--shadow-soft) backdrop-blur sm:left-6 sm:top-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-500/70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-500" />
              </span>
              {flags[hub.code]} {hub.name}
              <span className="rounded-full bg-brand-800 px-2 py-0.5 text-[10px] uppercase tracking-widest text-white">
                {dict.globe.hubTag}
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.55, duration: 0.6 }}
              className="absolute right-2 bottom-2 flex items-center gap-2 rounded-2xl border border-border bg-surface/90 px-3 py-2 text-xs shadow-(--shadow-soft) backdrop-blur sm:right-6 sm:bottom-6"
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-linear-to-br from-brand-700 to-brand-900 text-white">
                <Icon.Truck size={14} />
              </span>
              <div>
                <div className="text-[10px] font-medium uppercase tracking-widest text-muted">
                  {dict.globe.activeRoutes}
                </div>
                <div className="text-sm font-semibold text-foreground">
                  24 · 15+
                </div>
              </div>
            </motion.div>
          </motion.div>

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
                    <span className="text-2xl" aria-hidden>
                      {flags[c.code] ?? "🌐"}
                    </span>
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
                  className="rounded-full border border-border bg-surface px-3 py-1.5 font-medium text-muted"
                >
                  {flags[c.code] ?? "🌐"} {c.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </Container>
    </section>
  );
}
