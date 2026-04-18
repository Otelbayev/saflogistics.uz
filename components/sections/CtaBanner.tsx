"use client";

import { motion } from "framer-motion";
import type { Dictionary } from "@/lib/i18n";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { useQuoteModal } from "@/components/ui/QuoteModal";

type Props = { dict: Dictionary };

export function CtaBanner({ dict }: Props) {
  const { open } = useQuoteModal();

  return (
    <section className="relative py-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="relative isolate overflow-hidden rounded-[2.5rem] border border-border shadow-[var(--shadow-elevated)]"
        >
          <video
            className="absolute inset-0 -z-20 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster="/images/semi-truck-port-sunset.jpg"
          >
            <source
              src="/videos/vecteezy_cargo-truck-with-cargo-trailer-is-driving-on-the-highway_47880046.mp4"
              type="video/mp4"
            />
          </video>
          <div
            aria-hidden
            className="absolute inset-0 -z-10"
            style={{
              background:
                "linear-gradient(115deg, rgba(3,15,49,0.92) 0%, rgba(3,42,125,0.78) 50%, rgba(3,15,49,0.55) 100%)",
            }}
          />
          <div aria-hidden className="absolute inset-0 -z-10 bg-grid opacity-20" />

          <div className="relative flex flex-col items-start justify-between gap-8 p-10 text-white sm:p-14 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-widest text-white/85 backdrop-blur">
                <Icon.Lightning size={12} />
                {dict.site.name}
              </span>
              <h3 className="mt-5 text-balance text-3xl font-semibold leading-tight sm:text-5xl">
                {dict.ctaBanner.title}
              </h3>
              <p className="mt-4 text-base text-white/85 sm:text-lg">
                {dict.ctaBanner.subtitle}
              </p>
            </div>
            <Button
              onClick={open}
              size="lg"
              className="shrink-0 bg-white text-brand-950 hover:bg-white/90"
            >
              {dict.ctaBanner.button}
              <Icon.ArrowRight size={18} />
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
