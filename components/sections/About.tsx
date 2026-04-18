"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Dictionary } from "@/lib/i18n";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";

type Props = { dict: Dictionary };

const featureKeys = ["experience", "b2b", "projects"] as const;
const featureIcons = {
  experience: Icon.Sparkle,
  b2b: Icon.Truck,
  projects: Icon.Shield,
} as const;

export function About({ dict }: Props) {
  return (
    <section id="about" className="relative py-28 sm:py-36">
      <Container className="grid items-center gap-16 lg:grid-cols-2">
        <div>
          <SectionHeading
            align="left"
            eyebrow={dict.about.subtitle}
            title={dict.about.title}
            subtitle={dict.about.description}
          />
          <div className="mt-12 grid gap-5">
            {featureKeys.map((k, i) => {
              const IconEl = featureIcons[k];
              return (
                <Reveal
                  key={k}
                  delay={i * 0.1}
                  className="group flex items-start gap-5 rounded-2xl border border-border bg-surface p-6 transition hover:-translate-y-0.5 hover:border-brand-500/40 hover:shadow-[var(--shadow-glow)]"
                >
                  <div className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-700 to-brand-900 text-white shadow-[var(--shadow-soft)]">
                    <IconEl size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {dict.about.features[k].title}
                    </h3>
                    <p className="mt-1.5 text-base text-muted">
                      {dict.about.features[k].desc}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        <Reveal className="relative">
          <div className="grid gap-4 sm:grid-cols-5">
            <div className="relative col-span-3 aspect-[3/4] overflow-hidden rounded-[2rem] border border-border shadow-[var(--shadow-elevated)]">
              <Image
                src="/images/industrial-port-container-yard.jpg"
                alt="Container yard"
                fill
                sizes="(min-width: 1024px) 30vw, 60vw"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 40%, color-mix(in oklab, var(--color-brand-950) 65%, transparent) 100%)",
                }}
              />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/20 bg-white/10 p-4 text-white backdrop-blur"
              >
                <div className="text-[11px] uppercase tracking-widest text-white/85">
                  Main hub
                </div>
                <div className="mt-1 text-lg font-semibold">
                  Guangzhou, China
                </div>
              </motion.div>
            </div>

            <div className="col-span-2 flex flex-col gap-4">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-border shadow-[var(--shadow-soft)]">
                <video
                  className="absolute inset-0 h-full w-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster="/images/emerald-green-truck-forest-highway-modern-power-transport.jpg"
                >
                  <source src="/videos/5secondtuck.mp4" type="video/mp4" />
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
              <div className="rounded-[1.75rem] border border-border bg-gradient-brand p-5 text-white shadow-[var(--shadow-soft)]">
                <div className="text-xs uppercase tracking-widest text-white/80">
                  Since 2019
                </div>
                <div className="mt-2 text-4xl font-semibold leading-none">
                  500+
                </div>
                <div className="mt-2 text-sm text-white/85">
                  shipments delivered on time
                </div>
              </div>
            </div>
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute -right-8 -top-10 -z-10 h-44 w-44 rounded-full bg-brand-500/25 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-10 -left-10 -z-10 h-56 w-56 rounded-full bg-brand-800/25 blur-3xl"
          />
        </Reveal>
      </Container>
    </section>
  );
}
