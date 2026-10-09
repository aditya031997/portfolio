"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Shot = { src: string; alt: string; title?: string; description?: string };

const AUTOPLAY_MS = 3500;

/**
 * One screenshot at a time instead of a long gallery. Native scroll-snap handles swipe on touch;
 * arrows, thumbnails and ← → keys move between slides. Autoplay pauses on hover/focus, when the
 * carousel is off screen, and for people who prefer reduced motion.
 */
export function ScreenshotCarousel({ shots }: { shots: Shot[] }) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [inView, setInView] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const count = shots.length;

  const goTo = useCallback(
    (i: number) => {
      const el = track.current;
      if (!el) return;
      const next = (i + count) % count;
      el.scrollTo({ left: next * el.clientWidth, behavior: reduceMotion ? "auto" : "smooth" });
      setIndex(next);
    },
    [count, reduceMotion],
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!root.current) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.4 });
    io.observe(root.current);
    return () => io.disconnect();
  }, []);

  const playing = count > 1 && inView && !hovered && !reduceMotion;

  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => goTo(index + 1), AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [playing, index, goTo]);

  // Sync the index after a swipe, but only once scrolling settles. Reading it on every scroll
  // frame would fight the smooth scroll started by goTo().
  const settle = useRef<ReturnType<typeof setTimeout>>(undefined);
  const onScroll = () => {
    clearTimeout(settle.current);
    settle.current = setTimeout(() => {
      const el = track.current;
      if (el) setIndex(Math.round(el.scrollLeft / el.clientWidth));
    }, 120);
  };

  // Slide width changes on resize/rotation; keep the current slide aligned.
  const indexRef = useRef(index);
  indexRef.current = index;
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      el.scrollTo({ left: indexRef.current * el.clientWidth, behavior: "auto" });
    });
    ro.observe(el);
    return () => {
      ro.disconnect();
      clearTimeout(settle.current);
    };
  }, []);

  if (count === 0) return null;

  return (
    <div
      ref={root}
      className="carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="Project screenshots"
      tabIndex={0}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") goTo(index + 1);
        if (e.key === "ArrowLeft") goTo(index - 1);
      }}
    >
      <div className="carousel-frame">
        <div className="pv-bar">
          <i />
          <i />
          <i />
          <span className="pv-url">{shots[index].title ?? shots[index].alt}</span>
        </div>

        <div ref={track} className="carousel-track" onScroll={onScroll}>
          {shots.map((shot, i) => (
            <figure
              key={shot.src}
              className="carousel-slide"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
              aria-hidden={i !== index}
            >
              <a href={shot.src} target="_blank" rel="noopener" tabIndex={i === index ? 0 : -1} aria-label={`Open full size: ${shot.alt}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={shot.src} alt={shot.alt} width={1600} height={807} loading={i < 2 ? "eager" : "lazy"} decoding="async" />
              </a>
            </figure>
          ))}
        </div>

        {count > 1 && (
          <>
            <button type="button" className="carousel-arrow prev" aria-label="Previous screenshot" onClick={() => goTo(index - 1)}>
              ←
            </button>
            <button type="button" className="carousel-arrow next" aria-label="Next screenshot" onClick={() => goTo(index + 1)}>
              →
            </button>
          </>
        )}
      </div>

      {/* All captions share one grid cell, so the block is always as tall as the longest one
          and the thumbnails below never jump when the slide changes. */}
      <div className="carousel-info" aria-live="polite">
        {shots.map((shot, i) => (
          <div key={shot.src} className={`carousel-info-item${i === index ? " active" : ""}`} aria-hidden={i !== index}>
            <p className="carousel-info-step">
              {String(i + 1).padStart(2, "0")} <span>/ {String(count).padStart(2, "0")}</span>
            </p>
            <div>
              <h3 className="carousel-info-title">{shot.title ?? shot.alt}</h3>
              {shot.description && <p className="carousel-info-text">{shot.description}</p>}
            </div>
          </div>
        ))}
      </div>

      {count > 1 && (
        <div className="carousel-thumbs">
          {shots.map((shot, i) => (
            <button
              key={shot.src}
              type="button"
              className={`carousel-thumb${i === index ? " active" : ""}`}
              aria-label={`Show screenshot ${i + 1}: ${shot.alt}`}
              aria-current={i === index}
              onClick={() => goTo(i)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={shot.src} alt="" width={160} height={81} loading="lazy" decoding="async" />
              {i === index && (
                <span
                  key={index}
                  className="carousel-progress"
                  style={{ animationDuration: `${AUTOPLAY_MS}ms`, animationPlayState: playing ? "running" : "paused" }}
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
