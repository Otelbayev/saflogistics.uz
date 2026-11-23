"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import dynamic from "next/dynamic";
import type { QuoteDict } from "@/components/ui/QuoteModalDialog";

/**
 * The dialog (form, phone input + libphonenumber, framer-motion) is only
 * downloaded the first time someone opens it, so none of it sits on the
 * landing page's critical path.
 */
const QuoteModalDialog = dynamic(
  () => import("@/components/ui/QuoteModalDialog").then((m) => m.QuoteModalDialog),
  { ssr: false },
);

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
  dict: QuoteDict;
}) {
  const [isOpen, setIsOpen] = useState(false);
  // Mount the dialog on first open and keep it, so its exit animation and
  // form state survive closing.
  const [loaded, setLoaded] = useState(false);
  const open = useCallback(() => {
    setLoaded(true);
    setIsOpen(true);
  }, []);
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
      {loaded ? (
        <QuoteModalDialog dict={dict} isOpen={isOpen} onClose={close} />
      ) : null}
    </QuoteModalContext.Provider>
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
