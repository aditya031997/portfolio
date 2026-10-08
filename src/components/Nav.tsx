"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, m, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import { profile } from "@/content/profile";

const links = [
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export function Nav() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const { scrollYProgress } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: highlight the section currently in the middle of the viewport.
  useEffect(() => {
    if (!onHome) return setActive(null);
    const sections = links.map((l) => document.getElementById(l.id)).filter((el): el is HTMLElement => !!el);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [onHome]);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <m.div className="scroll-progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />
      <div className="nav-shell">
        <nav className={`nav${scrolled ? " scrolled" : ""}`} aria-label="Main">
          <Link href="/" className="brand">
            <span className="brand-mark" aria-hidden="true">
              AS
            </span>
            {profile.name}
          </Link>

          <ul className="nav-links">
            {links.map((l) => (
              <li key={l.id}>
                <Link href={`/#${l.id}`} className={active === l.id ? "active" : undefined}>
                  {active === l.id && (
                    <m.span layoutId="nav-pill" className="nav-pill" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
                  )}
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <a href={profile.resume} className="nav-cta" target="_blank" rel="noopener">
            Resume ↗
          </a>

          <button className="menu-btn" aria-expanded={open} aria-label="Menu" onClick={() => setOpen((o) => !o)}>
            <span />
            <span />
          </button>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <m.ul
            className="mobile-menu"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            {links.map((l, i) => (
              <m.li key={l.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 * i }}>
                <Link href={`/#${l.id}`} onClick={() => setOpen(false)}>
                  {l.label}
                </Link>
              </m.li>
            ))}
            <li>
              <a href={profile.resume} target="_blank" rel="noopener">
                Resume ↗
              </a>
            </li>
          </m.ul>
        )}
      </AnimatePresence>
    </>
  );
}
