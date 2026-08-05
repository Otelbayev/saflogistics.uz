"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  value: number;
  /** Formats the animated number for display. */
  format: (n: number) => string;
  /** Animation length in ms. */
  duration?: number;
  prefix?: string;
  suffix?: string;
};

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Rolls from the previously shown figure to the new one whenever `value`
 * changes, so recalculating the form animates instead of snapping.
 *
 * `animated` holds a value only while a run is in flight; the rest of the time
 * the component renders `value` straight through. That keeps the server output
 * identical to the final client output and avoids setting state synchronously
 * inside the effect.
 */
export function CountUp({
  value,
  format,
  duration = 900,
  prefix = "",
  suffix = "",
}: Props) {
  const [animated, setAnimated] = useState<number | null>(null);
  const fromRef = useRef(value);
  const rafRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const from = fromRef.current;
    fromRef.current = value;

    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (calm || from === value) return;

    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      if (p < 1) {
        setAnimated(from + (value - from) * easeOut(p));
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setAnimated(null);
      }
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [value, duration]);

  return (
    <span className="tabular-nums">
      {prefix}
      {format(animated ?? value)}
      {suffix}
    </span>
  );
}
