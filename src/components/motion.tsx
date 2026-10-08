"use client";

import {
  m,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type HTMLMotionProps,
} from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

/** Fades + lifts its child into view once, when it scrolls on screen. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  as = "div",
  ...rest
}: { children: ReactNode; delay?: number; y?: number; as?: "div" | "li" } & HTMLMotionProps<"div">) {
  const reduce = useReducedMotion();
  const Tag = (as === "li" ? m.li : m.div) as typeof m.div;
  return (
    <Tag
      initial={reduce ? false : { opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.8, delay, ease }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** Counts from 0 to `to` the first time it is visible. */
export function CountUp({ to, suffix = "", prefix = "" }: { to: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(reduce ? to : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / 1600, 1);
      setValue(Math.round(to * (1 - Math.pow(1 - t, 4))));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduce, to]);

  return (
    <span ref={ref}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}

/** Pulls its child slightly toward the cursor while hovered. */
export function Magnetic({ children, strength = 0.3 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useSpring(0, { stiffness: 250, damping: 18 });
  const y = useSpring(0, { stiffness: 250, damping: 18 });
  const reduce = useReducedMotion();

  return (
    <m.span
      ref={ref}
      className="magnetic"
      style={{ x, y }}
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * strength);
        y.set((e.clientY - r.top - r.height / 2) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </m.span>
  );
}

/** 3D tilt toward the cursor plus a cursor-tracking glow (via --gx/--gy CSS vars). */
export function Tilt({
  children,
  className,
  style,
  max = 6,
}: {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 150, damping: 20 });
  const sy = useSpring(py, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(sy, [0, 1], [max, -max]);
  const rotateY = useTransform(sx, [0, 1], [-max, max]);
  const reduce = useReducedMotion();

  return (
    <m.div
      ref={ref}
      className={className}
      style={{ ...style, rotateX: reduce ? 0 : rotateX, rotateY: reduce ? 0 : rotateY, transformPerspective: 1200 }}
      onPointerMove={(e) => {
        if (!ref.current || e.pointerType !== "mouse") return;
        const r = ref.current.getBoundingClientRect();
        const nx = (e.clientX - r.left) / r.width;
        const ny = (e.clientY - r.top) / r.height;
        px.set(nx);
        py.set(ny);
        ref.current.style.setProperty("--gx", `${nx * 100}%`);
        ref.current.style.setProperty("--gy", `${ny * 100}%`);
      }}
      onPointerLeave={() => {
        px.set(0.5);
        py.set(0.5);
      }}
    >
      {children}
    </m.div>
  );
}
