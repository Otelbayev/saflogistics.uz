"use client";

import { motion } from "framer-motion";
import type { Dictionary } from "@/lib/i18n";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { Flag } from "@/components/ui/Flag";
import { VideoBackdrop } from "@/components/ui/VideoBackdrop";
import { route, tariffKeys, tariffs } from "@/lib/site";

type Props = { dict: Dictionary };

function Endpoint({
  code,
  label,
  place,
  hubTag,
  align,
}: {
  code: string;
  label: string;
  place: string;
  hubTag?: string;
  align: "start" | "end";
}) {
  return (
    <div
      className={`flex items-center gap-4 rounded-3xl border border-white/20 bg-brand-950/50 p-5 backdrop-blur-md ${
        align === "end" ? "md:flex-row-reverse md:text-right" : ""
      }`}
    >
      <Flag code={code} width={44} square className="h-11 w-11" />
      <div className="min-w-0">
        <div
          className={`flex items-center gap-2 ${align === "end" ? "md:justify-end" : ""}`}
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">
            {label}
          </span>
          {hubTag ? (
            <span className="rounded-full border border-brand-300/50 bg-brand-500/20 px-2 py-0.5 text-[10px] font-semibold tracking-widest text-brand-100">
              {hubTag}
            </span>
          ) : null}
        </div>
        <div className="mt-1 truncate text-lg font-semibold text-white">
          {place}
        </div>
      </div>
    </div>
  );
}

export function Route({ dict }: Props) {
  return (
    <section id="route" className="relative overflow-hidden py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow={dict.route.subtitle}
          title={dict.route.title}
          subtitle={dict.route.description}
        />

        <Reveal
          from="zoom"
          className="relative isolate mx-auto mt-14 max-w-6xl overflow-hidden rounded-4xl border border-border shadow-(--shadow-elevated)"
        >
          <VideoBackdrop
            src="/videos/5secondtuck.mp4"
            poster="/images/5secondtuck-poster.png"
            grade="duotone"
            className="-z-10"
          />
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-grid opacity-[0.1]"
          />
          <div aria-hidden className="sheen -z-10 left-0" />

          {/* Status chips */}
          <div className="relative flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-4 sm:px-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              {dict.route.doorToDoor}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
              <Icon.Truck size={12} />
              {dict.route.transportLabel} · {dict.route.transportValue}
            </span>
          </div>

          {/* Corridor endpoints */}
          <div className="relative p-5 sm:p-8">
            <div className="grid items-center gap-5 md:grid-cols-[1fr_auto_1fr]">
              <Endpoint
                code={route.origin.code}
                label={dict.route.originLabel}
                place={dict.route.origin}
                hubTag={dict.route.hubTag}
                align="start"
              />

              <div className="relative h-14 md:h-20 md:w-32">
                <svg
                  viewBox="0 0 128 80"
                  className="absolute inset-0 h-full w-full text-brand-300"
                  aria-hidden
                >
                  <path
                    d="M4 40 H124"
                    fill="none"
                    stroke="currentColor"
                    strokeOpacity="0.35"
                    strokeWidth="2"
                    strokeDasharray="7 7"
                    strokeLinecap="round"
                  />
                  <motion.circle
                    r="4"
                    cy="40"
                    fill="currentColor"
                    initial={{ cx: 4, opacity: 0 }}
                    animate={{ cx: 124, opacity: [0, 1, 1, 0] }}
                    transition={{
                      duration: 2.4,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                </svg>
              </div>

              <Endpoint
                code={route.destination.code}
                label={dict.route.destinationLabel}
                place={dict.route.destination}
                align="end"
              />
            </div>

            {/* Transit time per tariff */}
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {tariffKeys.map((key) => (
                <div
                  key={key}
                  className={`rounded-2xl border p-4 text-center backdrop-blur-md ${
                    tariffs[key].featured
                      ? "border-brand-300/50 bg-brand-400/20"
                      : "border-white/15 bg-brand-950/50"
                  }`}
                >
                  <div className="text-xs font-semibold uppercase tracking-widest text-white/60">
                    {dict.services[key].name}
                  </div>
                  <div className="mt-1 text-2xl font-semibold text-white">
                    {tariffs[key].min}–{tariffs[key].max}{" "}
                    <span className="text-base font-normal text-white/60">
                      {dict.services.daysLabel}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
