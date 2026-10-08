"use client";

import { AnimatePresence, m } from "motion/react";
import { useState } from "react";
import { profile } from "@/content/profile";
import { ContactForm } from "./ContactForm";
import { Magnetic, Reveal } from "./motion";

const web3formsKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

export function Contact() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  }

  const socials = [
    { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    { label: "LinkedIn", value: profile.linkedin.replace(/^https?:\/\/(www\.)?/, ""), href: profile.linkedin },
    ...(profile.github ? [{ label: "GitHub", value: profile.github.replace(/^https?:\/\//, ""), href: profile.github }] : []),
    { label: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}` },
  ];

  return (
    <Reveal className="contact-panel">
      <div className="hero-grid-bg" aria-hidden="true" />
      <div className="contact-grid">
        <div>
          <p className="eyebrow">Contact</p>
          <h2 className="contact-title">
            Hiring? Let&apos;s <span className="serif grad-text">talk.</span>
          </h2>
          <p className="contact-copy">
            I&apos;m looking for a full-time full-stack or Next.js role. Send me an email or message me on LinkedIn and
            I&apos;ll get back to you within a day.
          </p>
          <div className="email-row">
            <Magnetic>
              <a href={`mailto:${profile.email}`} className="btn btn-primary">
                <span>Send an email</span>
                <span className="arrow">→</span>
              </a>
            </Magnetic>
            <span className="copy-btn">
              <button type="button" className="btn" onClick={copyEmail}>
                {copied ? "Copied ✓" : "Copy email"}
              </button>
              <AnimatePresence>
                {copied && (
                  <m.span
                    className="toast"
                    role="status"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                  >
                    {profile.email}
                  </m.span>
                )}
              </AnimatePresence>
            </span>
          </div>
          {web3formsKey && <ContactForm accessKey={web3formsKey} fallbackEmail={profile.email} />}
        </div>

        <ul className="socials">
          {socials.map((s) => (
            <li key={s.label}>
              <a
                className="social"
                href={s.href}
                {...(s.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                <span>
                  <span className="social-label">{s.label}</span>
                  <br />
                  <span className="social-value">{s.value}</span>
                </span>
                <span aria-hidden="true">↗</span>
              </a>
            </li>
          ))}
          <li>
            <div className="social">
              <span>
                <span className="social-label">Based in</span>
                <br />
                <span className="social-value">{profile.location} · IST (UTC+5:30)</span>
              </span>
            </div>
          </li>
        </ul>
      </div>
    </Reveal>
  );
}
