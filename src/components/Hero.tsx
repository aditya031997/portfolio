"use client";

import Link from "next/link";
import { useRef } from "react";
import { profile } from "@/content/profile";
import { CountUp, Magnetic } from "./motion";
import { WordReveal } from "./WordReveal";
import { SystemGraph } from "./SystemGraph";

const delay = (d: number) => ({ "--d": `${d}s` }) as React.CSSProperties;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  return (
    <section
      ref={ref}
      className="hero"
      onPointerMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        ref.current!.style.setProperty("--mx", `${e.clientX - r.left}px`);
        ref.current!.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
    >
      <div className="aurora aurora-a" aria-hidden="true" />
      <div className="aurora aurora-b" aria-hidden="true" />
      <div className="hero-grid-bg" aria-hidden="true" />
      <div className="hero-spotlight" aria-hidden="true" />

      <div className="wrap hero-inner">
        <div>
          <div className="hero-badge enter" style={delay(0)}>
            <span className="pulse-dot" />
            {profile.availability} · {profile.location}
          </div>

          <p className="hero-role enter" style={delay(0.05)}>
            <span>{profile.name}</span> · {profile.role}
          </p>

          <h1>
            <WordReveal text={profile.headlineMarked} delay={0.1} />
          </h1>

          <p className="hero-intro enter" style={delay(0.6)}>
            {profile.intro}
          </p>

          <div className="hero-actions enter" style={delay(0.75)}>
            <Magnetic>
              <Link href="/#work" className="btn btn-primary">
                <span>View case studies</span>
                <span className="arrow">→</span>
              </Link>
            </Magnetic>
            <Magnetic>
              <a href={profile.resume} className="btn" target="_blank" rel="noopener">
                Download resume <span className="arrow">↓</span>
              </a>
            </Magnetic>
          </div>

          <div className="stats enter" style={delay(0.9)}>
            <div>
              <p className="stat-value">
                <CountUp to={5} prefix="~" />
              </p>
              <p className="stat-label">Years shipping</p>
            </div>
            <div>
              <p className="stat-value">
                <CountUp to={10} suffix="+" />
              </p>
              <p className="stat-label">Apps in production</p>
            </div>
            <div>
              <p className="stat-value">
                <CountUp to={5} suffix="+" />
              </p>
              <p className="stat-label">Clients worked with</p>
            </div>
          </div>
        </div>

        <SystemGraph />
      </div>
    </section>
  );
}
