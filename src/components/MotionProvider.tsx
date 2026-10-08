"use client";

import { LazyMotion } from "motion/react";

// The animation engine is fetched after first paint instead of shipping in the initial bundle.
const loadFeatures = () => import("./motion-features").then((mod) => mod.default);

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      {children}
    </LazyMotion>
  );
}
