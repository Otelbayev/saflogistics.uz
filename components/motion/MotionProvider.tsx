"use client";

import { LazyMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Components import `m` (aliased as `motion`) instead of the full `motion`
 * component, so framer-motion's animation engine is not in the initial
 * bundle; it is fetched here right after hydration.
 */
const loadFeatures = () =>
  import("./features").then((mod) => mod.default);

export function MotionProvider({ children }: { children: ReactNode }) {
  return <LazyMotion features={loadFeatures}>{children}</LazyMotion>;
}
