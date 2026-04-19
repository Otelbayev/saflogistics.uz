"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { isValidPhoneNumber } from "libphonenumber-js";
import type { Dictionary } from "@/lib/i18n";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { PhoneField } from "@/components/ui/PhoneField";

type Props = { dict: Dictionary };

export function ContactForm({ dict }: Props) {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState(false);
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState(false);

  const inputClass =
    "w-full rounded-xl border border-border bg-background px-4 py-3.5 text-sm text-foreground placeholder:text-muted/80 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30";

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    if (!phone || !isValidPhoneNumber(phone)) {
      setPhoneError(true);
      return;
    }
    setPhoneError(false);
    setSubmitting(true);
    setError(false);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          source: "contact",
          name: String(fd.get("name") ?? ""),
          phone,
          message: String(fd.get("message") ?? ""),
          locale: document.documentElement.lang,
          page: window.location.pathname,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean };
      if (!res.ok || !data.ok) throw new Error("failed");
      setDone(true);
      form.reset();
      setPhone("");
      setTimeout(() => setDone(false), 4000);
    } catch {
      setError(true);
      setTimeout(() => setError(false), 4000);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="relative rounded-3xl border border-border bg-surface p-8 shadow-(--shadow-soft)">
      <h3 className="text-xl font-semibold text-foreground">
        {dict.contact.form.title}
      </h3>
      <form onSubmit={onSubmit} className="mt-6 grid gap-4">
        <label className="block">
          <span className="mb-1.5 block text-sm text-muted">
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
          <span className="mb-1.5 block text-sm text-muted">
            {dict.contact.form.phone}
          </span>
          <PhoneField
            value={phone}
            onChange={setPhone}
            placeholder={dict.contact.form.phonePlaceholder}
            required
          />
          {phoneError ? (
            <span className="mt-1.5 block text-xs text-red-600 dark:text-red-300">
              {dict.contact.form.phoneInvalid}
            </span>
          ) : null}
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
          {error ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mt-2 flex items-center gap-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-700 dark:text-red-200"
              role="alert"
            >
              {dict.contact.form.error}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </form>
    </div>
  );
}
