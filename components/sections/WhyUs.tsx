"use client";

import type { Dictionary } from "@/lib/i18n";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";

type Props = { dict: Dictionary };

const items = [
  { key: "fast" as const, icon: Icon.Truck },
  { key: "secure" as const, icon: Icon.Shield },
  { key: "price" as const, icon: Icon.Tag },
  { key: "support" as const, icon: Icon.Headset },
  { key: "expert" as const, icon: Icon.Globe },
  { key: "tech" as const, icon: Icon.Cpu },
];

export function WhyUs({ dict }: Props) {
  return (
    <section id="why" className="relative py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow={dict.why.subtitle}
          title={dict.why.title}
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => {
            const Ico = item.icon;
            return (
              <Reveal
                key={item.key}
                delay={(i % 3) * 0.08}
                className="group relative overflow-hidden rounded-3xl border border-border bg-surface p-7 transition duration-500 hover:-translate-y-1 hover:border-brand-500/30 hover:shadow-(--shadow-glow)"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand-500/10 blur-3xl opacity-0 transition duration-500 group-hover:opacity-100"
                />
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-brand-700 to-brand-900 text-white shadow-(--shadow-soft)">
                  <Ico size={22} />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-foreground">
                  {dict.why.items[item.key].title}
                </h3>
                <p className="mt-2 text-sm text-muted">
                  {dict.why.items[item.key].desc}
                </p>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
