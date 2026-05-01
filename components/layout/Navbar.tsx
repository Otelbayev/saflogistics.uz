"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/locales";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { useQuoteModal } from "@/components/ui/QuoteModal";
import { siteConfig } from "@/lib/site";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

export function Navbar({ locale, dict }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { open: openQuote } = useQuoteModal();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // iOS-safe scroll lock: position:fixed on <body> with preserved scroll Y
  useEffect(() => {
    if (!mobileOpen) return;
    const scrollY = window.scrollY;
    const html = document.documentElement;
    const body = document.body;
    const prev = {
      htmlOverflow: html.style.overflow,
      bodyOverflow: body.style.overflow,
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyLeft: body.style.left,
      bodyRight: body.style.right,
      bodyWidth: body.style.width,
    };
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";

    return () => {
      html.style.overflow = prev.htmlOverflow;
      body.style.overflow = prev.bodyOverflow;
      body.style.position = prev.bodyPosition;
      body.style.top = prev.bodyTop;
      body.style.left = prev.bodyLeft;
      body.style.right = prev.bodyRight;
      body.style.width = prev.bodyWidth;
      window.scrollTo(0, scrollY);
    };
  }, [mobileOpen]);

  const links = [
    { href: `/${locale}`, label: dict.nav.home, icon: Icon.Sparkle },
    { href: `/${locale}/services`, label: dict.nav.services, icon: Icon.Truck },
    { href: `/${locale}#network`, label: dict.nav.track, icon: Icon.Globe },
    { href: `/${locale}/contact`, label: dict.nav.contact, icon: Icon.Phone },
  ];

  return (
    <>
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-90 w-full transition-all duration-300",
        scrolled
          ? "backdrop-blur-xl bg-[color-mix(in_oklab,var(--background)_88%,transparent)] border-b border-border"
          : "backdrop-blur-md bg-[color-mix(in_oklab,var(--background)_60%,transparent)] md:bg-transparent md:backdrop-blur-none",
      )}
      style={{ pointerEvents: "auto" }}
    >
      <Container className="flex h-16 items-center justify-between sm:h-20">
        <Link
          href={`/${locale}`}
          className="group flex items-center gap-3"
          aria-label={dict.site.name}
        >
          <span className="relative inline-flex h-10 w-10 overflow-hidden rounded-xl bg-brand-950 ring-1 ring-brand-700/40">
            <Image
              src="/images/logo1.jpg"
              alt={dict.site.name}
              fill
              sizes="40px"
              priority
              className="object-cover"
            />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-sm font-semibold tracking-wide text-foreground sm:text-base">
              {dict.site.name}
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted sm:text-[11px]">
              {dict.site.tagline}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-foreground/80 transition hover:bg-surface-2 hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <LocaleSwitcher current={locale} />
          <ThemeToggle label={dict.theme.toggle} />
          <Button onClick={openQuote} size="sm">
            {dict.nav.getQuote}
            <Icon.ArrowRight size={16} />
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Menu"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          className="relative inline-flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-full border border-border bg-surface text-foreground shadow-(--shadow-soft) transition-transform active:scale-95 md:hidden"
          style={{ touchAction: "manipulation", WebkitTapHighlightColor: "transparent" }}
        >
          <span aria-hidden className="pointer-events-none relative block h-3 w-5">
            <motion.span
              className="absolute left-0 right-0 block h-0.5 rounded-full bg-current"
              style={{ top: "0%" }}
              animate={mobileOpen ? { y: 5, rotate: 45 } : { y: 0, rotate: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="absolute left-0 right-0 block h-0.5 rounded-full bg-current"
              style={{ top: "calc(50% - 1px)" }}
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="absolute left-0 right-0 block h-0.5 rounded-full bg-current"
              style={{ top: "calc(100% - 2px)" }}
              animate={mobileOpen ? { y: -5, rotate: -45 } : { y: 0, rotate: 0 }}
              transition={{ duration: 0.3 }}
            />
          </span>
        </button>
      </Container>
    </header>

    <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            id="mobile-menu"
            className="fixed inset-0 top-0 z-95 overflow-y-auto md:hidden"
          >
            <div
              aria-hidden
              className="absolute inset-0 bg-linear-to-br from-brand-950 via-brand-900 to-brand-800"
            />
            <div aria-hidden className="absolute inset-0 bg-grid opacity-20" />
            <div
              aria-hidden
              className="pointer-events-none absolute -right-32 -top-24 h-96 w-96 rounded-full bg-brand-500/30 blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-24 -left-20 h-80 w-80 rounded-full bg-brand-500/20 blur-3xl"
            />

            <div className="relative flex min-h-dvh flex-col text-white">
              <Container className="flex h-16 items-center justify-between sm:h-20">
                <Link
                  href={`/${locale}`}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3"
                  aria-label={dict.site.name}
                >
                  <span className="relative inline-flex h-10 w-10 overflow-hidden rounded-xl bg-white/10 ring-1 ring-white/20">
                    <Image
                      src="/images/logo1.jpg"
                      alt={dict.site.name}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </span>
                  <span className="flex flex-col leading-tight">
                    <span className="text-sm font-semibold tracking-wide">
                      {dict.site.name}
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-white/60">
                      {dict.site.tagline}
                    </span>
                  </span>
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur"
                >
                  <Icon.X size={18} />
                </button>
              </Container>

              <Container className="flex flex-1 flex-col gap-8 pb-12 pt-6">
                <motion.ul
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {},
                    visible: {
                      transition: { staggerChildren: 0.06, delayChildren: 0.1 },
                    },
                  }}
                  className="flex flex-col gap-2"
                >
                  {links.map((l, i) => {
                    const Ico = l.icon;
                    return (
                      <motion.li
                        key={l.href}
                        variants={{
                          hidden: { opacity: 0, x: -24 },
                          visible: { opacity: 1, x: 0 },
                        }}
                      >
                        <Link
                          href={l.href}
                          onClick={() => setMobileOpen(false)}
                          className="group flex items-center justify-between gap-4 rounded-3xl border border-white/10 bg-white/5 px-5 py-5 backdrop-blur transition hover:border-white/30 hover:bg-white/10"
                        >
                          <span className="flex items-center gap-4">
                            <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-white">
                              <Ico size={20} />
                            </span>
                            <span className="flex flex-col">
                              <span className="text-[10px] uppercase tracking-[0.25em] text-white/50">
                                0{i + 1}
                              </span>
                              <span className="text-xl font-semibold">
                                {l.label}
                              </span>
                            </span>
                          </span>
                          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition group-hover:translate-x-1 group-hover:bg-white/20">
                            <Icon.ArrowRight size={16} />
                          </span>
                        </Link>
                      </motion.li>
                    );
                  })}
                </motion.ul>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.5 }}
                  className="flex flex-col gap-3"
                >
                  <button
                    type="button"
                    onClick={() => {
                      setMobileOpen(false);
                      openQuote();
                    }}
                    className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-white text-base font-semibold text-brand-950 shadow-(--shadow-glow) transition hover:-translate-y-0.5 hover:bg-white/95"
                  >
                    {dict.nav.getQuote}
                    <Icon.ArrowRight size={18} />
                  </button>

                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <LocaleSwitcher current={locale} />
                    </div>
                    <ThemeToggle label={dict.theme.toggle} />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45, duration: 0.5 }}
                  className="mt-auto space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
                >
                  <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/60">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                    </span>
                    {dict.contact.hoursLabel}
                  </div>
                  <div className="text-sm text-white/90">
                    {dict.contact.hoursWeek}
                  </div>
                  <div className="flex flex-col gap-2">
                    {siteConfig.phones.map((p) => (
                      <a
                        key={p}
                        href={`tel:${p}`}
                        className="inline-flex items-center gap-3 text-base font-semibold text-white"
                      >
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
                          <Icon.Phone size={15} />
                        </span>
                        {p}
                      </a>
                    ))}
                  </div>
                  <div className="flex items-center gap-3 pt-2">
                    <a
                      href={siteConfig.instagram}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label="Instagram"
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-white hover:text-brand-950"
                    >
                      <Icon.Instagram size={18} />
                    </a>
                    <a
                      href={siteConfig.mapUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label="Map"
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-white hover:text-brand-950"
                    >
                      <Icon.MapPin size={18} />
                    </a>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      aria-label="Email"
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-white hover:text-brand-950"
                    >
                      <Icon.Mail size={18} />
                    </a>
                  </div>
                </motion.div>
              </Container>
            </div>
          </motion.div>
        ) : null}
    </AnimatePresence>
    </>
  );
}
