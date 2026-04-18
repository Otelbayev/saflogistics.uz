"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Dictionary } from "@/lib/i18n";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

type Props = { dict: Dictionary };

export function ContactForm({ dict }: Props) {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const inputClass =
    "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted/80 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30";

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 900));
    setSubmitting(false);
    setDone(true);
    (e.target as HTMLFormElement).reset();
    setTimeout(() => setDone(false), 4000);
  }

  return (
    <div className="relative rounded-3xl border border-border bg-surface p-8 shadow-[var(--shadow-soft)]">
      <h3 className="text-xl font-semibold text-foreground">
        {dict.contact.form.title}
      </h3>
      <form onSubmit={onSubmit} className="mt-6 grid gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1 block text-sm text-muted">
              {dict.contact.form.name}
            </span>
            <input
              required
              name="name"
              type="text"
              placeholder={dict.contact.form.namePlaceholder}
              className={inputClass}
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm text-muted">
              {dict.contact.form.phone}
            </span>
            <input
              required
              name="phone"
              type="tel"
              placeholder={dict.contact.form.phonePlaceholder}
              className={inputClass}
            />
          </label>
        </div>
        <label className="block">
          <span className="mb-1 block text-sm text-muted">
            {dict.contact.form.email}
          </span>
          <input
            required
            name="email"
            type="email"
            placeholder={dict.contact.form.emailPlaceholder}
            className={inputClass}
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm text-muted">
            {dict.contact.form.message}
          </span>
          <textarea
            required
            name="message"
            rows={5}
            placeholder={dict.contact.form.messagePlaceholder}
            className={`${inputClass} resize-none`}
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
              className="mt-2 flex items-center gap-3 rounded-xl border border-brand-500/30 bg-brand-500/10 px-4 py-3 text-sm text-brand-700 dark:text-brand-200"
              role="status"
            >
              <Icon.Check size={16} />
              {dict.contact.form.success}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </form>
    </div>
  );
}
