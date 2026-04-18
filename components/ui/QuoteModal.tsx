"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Dictionary } from "@/lib/i18n";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { siteConfig } from "@/lib/site";

type Ctx = {
  open: () => void;
  close: () => void;
  isOpen: boolean;
};

const QuoteModalContext = createContext<Ctx | null>(null);

export function useQuoteModal() {
  const ctx = useContext(QuoteModalContext);
  if (!ctx) throw new Error("useQuoteModal must be used in QuoteModalProvider");
  return ctx;
}

export function QuoteModalProvider({
  children,
  dict,
}: {
  children: ReactNode;
  dict: Dictionary;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

  const value = useMemo(() => ({ open, close, isOpen }), [open, close, isOpen]);

  return (
    <QuoteModalContext.Provider value={value}>
      {children}
      <QuoteModal dict={dict} isOpen={isOpen} onClose={close} />
    </QuoteModalContext.Provider>
  );
}

function QuoteModal({
  dict,
  isOpen,
  onClose,
}: {
  dict: Dictionary;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const input =
    "w-full rounded-xl border border-border bg-background px-4 py-3.5 text-sm text-foreground placeholder:text-muted/80 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30";

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 900));
    setSubmitting(false);
    setDone(true);
    (e.target as HTMLFormElement).reset();
    setTimeout(() => {
      setDone(false);
      onClose();
    }, 1800);
  }

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="absolute inset-0 bg-brand-950/70 backdrop-blur-md"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={dict.contact.form.title}
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 grid w-full max-w-4xl overflow-hidden rounded-3xl border border-border bg-surface shadow-[var(--shadow-elevated)] md:grid-cols-5"
          >
            <div className="relative hidden overflow-hidden bg-gradient-brand p-10 text-white md:col-span-2 md:block">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-60"
                style={{
                  background:
                    "radial-gradient(60% 60% at 30% 20%, color-mix(in oklab, var(--color-brand-500) 50%, transparent) 0%, transparent 60%), radial-gradient(50% 50% at 80% 100%, color-mix(in oklab, var(--color-brand-300) 40%, transparent) 0%, transparent 60%)",
                }}
              />
              <div aria-hidden className="absolute inset-0 bg-grid opacity-20" />
              <div className="relative flex h-full flex-col">
                <div className="text-xs uppercase tracking-[0.25em] text-white/75">
                  {dict.site.name}
                </div>
                <h3 className="mt-6 text-3xl font-semibold leading-tight">
                  {dict.ctaBanner.title}
                </h3>
                <p className="mt-3 text-sm text-white/80">
                  {dict.ctaBanner.subtitle}
                </p>
                <ul className="mt-8 space-y-3 text-sm text-white/90">
                  {siteConfig.phones.map((p) => (
                    <li key={p} className="flex items-center gap-3">
                      <Icon.Phone size={16} />
                      <a href={`tel:${p}`} className="hover:underline">
                        {p}
                      </a>
                    </li>
                  ))}
                  <li className="flex items-center gap-3">
                    <Icon.Clock size={16} />
                    <span>{dict.contact.hoursWeek}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Icon.MapPin size={16} />
                    <span>{dict.contact.address}</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="relative p-8 md:col-span-3 md:p-10">
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-foreground transition hover:bg-surface-2"
              >
                <Icon.X size={18} />
              </button>
              <h3 className="text-2xl font-semibold text-foreground">
                {dict.contact.form.title}
              </h3>
              <p className="mt-2 text-sm text-muted">
                {dict.contact.subtitle}
              </p>

              <form onSubmit={onSubmit} className="mt-6 grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label>
                    <span className="mb-1.5 block text-sm text-muted">
                      {dict.contact.form.name}
                    </span>
                    <input
                      required
                      name="name"
                      type="text"
                      placeholder={dict.contact.form.namePlaceholder}
                      className={input}
                    />
                  </label>
                  <label>
                    <span className="mb-1.5 block text-sm text-muted">
                      {dict.contact.form.phone}
                    </span>
                    <input
                      required
                      name="phone"
                      type="tel"
                      placeholder={dict.contact.form.phonePlaceholder}
                      className={input}
                    />
                  </label>
                </div>
                <label>
                  <span className="mb-1.5 block text-sm text-muted">
                    {dict.contact.form.email}
                  </span>
                  <input
                    required
                    name="email"
                    type="email"
                    placeholder={dict.contact.form.emailPlaceholder}
                    className={input}
                  />
                </label>
                <label>
                  <span className="mb-1.5 block text-sm text-muted">
                    {dict.contact.form.message}
                  </span>
                  <textarea
                    required
                    name="message"
                    rows={4}
                    placeholder={dict.contact.form.messagePlaceholder}
                    className={`${input} resize-none`}
                  />
                </label>
                <Button type="submit" size="lg" className="mt-2" disabled={submitting}>
                  {submitting ? "…" : dict.contact.form.submit}
                  <Icon.ArrowRight size={16} />
                </Button>
                <AnimatePresence>
                  {done ? (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="flex items-center gap-3 rounded-xl border border-brand-500/30 bg-brand-500/10 px-4 py-3 text-sm text-brand-700 dark:text-brand-200"
                      role="status"
                    >
                      <Icon.Check size={16} />
                      {dict.contact.form.success}
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </form>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export function QuoteTrigger({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { open } = useQuoteModal();
  return (
    <button type="button" onClick={open} className={className}>
      {children}
    </button>
  );
}
