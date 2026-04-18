"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import clsx from "clsx";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/locales";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { useQuoteModal } from "@/components/ui/QuoteModal";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

export function Navbar({ locale, dict }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { open: openQuote } = useQuoteModal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: `/${locale}`, label: dict.nav.home },
    { href: `/${locale}/services`, label: dict.nav.services },
    { href: `/${locale}/contact`, label: dict.nav.contact },
  ];

  return (
    <header
      className={clsx(
        "sticky top-0 z-40 w-full transition-all duration-300",
        scrolled
          ? "backdrop-blur-xl bg-[color-mix(in_oklab,var(--background)_80%,transparent)] border-b border-border"
          : "bg-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between sm:h-20">
        <Link
          href={`/${locale}`}
          className="group flex items-center gap-3"
          aria-label={dict.site.name}
        >
          <span className="relative inline-flex h-10 w-10 overflow-hidden rounded-xl bg-brand-950 ring-1 ring-brand-700/40">
            <Image
              src="/images/logo.jpg"
              alt={dict.site.name}
              fill
              sizes="40px"
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
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-foreground md:hidden"
        >
          {mobileOpen ? <Icon.X size={18} /> : <Icon.Menu size={18} />}
        </button>
      </Container>

      {mobileOpen ? (
        <div className="md:hidden border-t border-border bg-background">
          <Container className="flex flex-col gap-4 py-6">
            <nav className="flex flex-col gap-1">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-4 py-3 text-base font-medium text-foreground hover:bg-surface-2"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
            <div className="flex items-center justify-between gap-2">
              <LocaleSwitcher current={locale} />
              <ThemeToggle label={dict.theme.toggle} />
              <Button
                onClick={() => {
                  setMobileOpen(false);
                  openQuote();
                }}
                size="sm"
                className="flex-1"
              >
                {dict.nav.getQuote}
              </Button>
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
