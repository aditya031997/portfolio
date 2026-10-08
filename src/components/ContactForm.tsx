"use client";

import { useState, type FormEvent } from "react";

type State = { kind: "idle" } | { kind: "sending" } | { kind: "sent" } | { kind: "error"; message: string };

export function ContactForm({ accessKey, fallbackEmail }: { accessKey: string; fallbackEmail: string }) {
  const [state, setState] = useState<State>({ kind: "idle" });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setState({ kind: "sending" });

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...data,
          access_key: accessKey,
          subject: `Portfolio message from ${data.name}`,
        }),
      });
      const result: { success?: boolean } = await res.json();
      if (!result.success) throw new Error();
      form.reset();
      setState({ kind: "sent" });
    } catch {
      setState({ kind: "error", message: `Couldn't send that. Please email me directly at ${fallbackEmail}.` });
    }
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <label>
        <span className="sr-only">Name</span>
        <input name="name" required minLength={2} autoComplete="name" placeholder="Your name" />
      </label>
      <label>
        <span className="sr-only">Email</span>
        <input name="email" type="email" required autoComplete="email" placeholder="you@company.com" />
      </label>
      <label>
        <span className="sr-only">Message</span>
        <textarea name="message" required minLength={10} placeholder="Tell me about the role or project" />
      </label>
      <input type="checkbox" name="botcheck" className="hp" tabIndex={-1} aria-hidden="true" />
      <div>
        <button className="btn btn-primary" type="submit" disabled={state.kind === "sending"}>
          <span>{state.kind === "sending" ? "Sending…" : "Send message"}</span>
        </button>
      </div>
      <p className={`form-note ${state.kind === "error" ? "err" : "ok"}`} role="status" aria-live="polite">
        {state.kind === "sent" && "Thanks! I'll reply within a day or two."}
        {state.kind === "error" && state.message}
      </p>
    </form>
  );
}
