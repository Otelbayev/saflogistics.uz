"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  imageSrc: string;
  imageAlt: string;
  videoSrc?: string;
};

export function PageHero({
  eyebrow,
  title,
  description,
  imageSrc,
  imageAlt,
  videoSrc,
}: Props) {
  return (
    <section className="relative isolate overflow-hidden pb-20 pt-36 sm:pt-44">
      {videoSrc ? (
        <video
          className="absolute inset-0 -z-30 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={imageSrc}
          aria-label={imageAlt}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : (
        <div className="absolute inset-0 -z-30">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      )}

      {/* Light overlay */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20 dark:hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(247, 249, 255, 0.55) 0%, rgba(3, 42, 125, 0.45) 60%, var(--background) 100%)",
        }}
      />
      {/* Dark overlay */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20 hidden dark:block"
        style={{
          background:
            "linear-gradient(180deg, color-mix(in oklab, var(--color-brand-950) 80%, transparent) 0%, color-mix(in oklab, var(--color-brand-950) 90%, transparent) 60%, var(--background) 100%)",
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-25 dark:opacity-30"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(50% 60% at 15% 30%, color-mix(in oklab, var(--color-brand-500) 18%, transparent) 0%, transparent 60%)",
        }}
      />

      <Container className="relative">
        {eyebrow ? (
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center rounded-full border border-brand-700/30 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-brand-800 backdrop-blur dark:border-white/20 dark:bg-white/10 dark:text-white/85"
          >
            {eyebrow}
          </motion.span>
        ) : null}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-5 max-w-3xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-brand-950 sm:text-5xl md:text-6xl dark:text-white"
        >
          {title}
        </motion.h1>
        {description ? (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-5 max-w-2xl text-base text-brand-950/85 sm:text-lg dark:text-white/85"
          >
            {description}
          </motion.p>
        ) : null}
      </Container>
    </section>
  );
}
