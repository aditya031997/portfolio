"use client";

import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

type NodeId = "caller" | "twilio" | "api" | "ai" | "tts" | "db" | "human" | "ticket";

const W = 110;
const H = 44;

const nodes: Record<NodeId, { x: number; y: number; label: string; sub: string }> = {
  caller: { x: 10, y: 20, label: "Caller", sub: "inbound call" },
  twilio: { x: 155, y: 20, label: "Twilio", sub: "telephony" },
  api: { x: 300, y: 20, label: "Node.js", sub: "call service" },
  ai: { x: 300, y: 120, label: "AI agent", sub: "intent + answer" },
  tts: { x: 155, y: 120, label: "ElevenLabs", sub: "voice" },
  db: { x: 10, y: 120, label: "PostgreSQL", sub: "calls · tickets" },
  human: { x: 300, y: 220, label: "Human agent", sub: "escalation" },
  ticket: { x: 155, y: 220, label: "Ticket", sub: "+ transcript" },
};

const edges: { id: string; d: string }[] = [
  { id: "e1", d: "M120 42 L155 42" },
  { id: "e2", d: "M265 42 L300 42" },
  { id: "e3", d: "M355 64 L355 120" },
  { id: "e4", d: "M300 142 L265 142" },
  { id: "e5", d: "M355 164 L355 220" },
  { id: "e6", d: "M300 242 L265 242" },
  { id: "e7", d: "M155 242 C 90 242, 65 214, 65 164" },
];

// One simulated call walking through the real system design.
const script: { node: NodeId; log: string; ok?: boolean }[] = [
  { node: "caller", log: "incoming call · after hours" },
  { node: "twilio", log: "stream opened → call service" },
  { node: "api", log: "caller identified, context loaded" },
  { node: "ai", log: 'intent: "reschedule appointment"' },
  { node: "tts", log: "reply synthesised · natural voice" },
  { node: "ai", log: "needs a human → escalating" },
  { node: "human", log: "no agent free · retrying by priority" },
  { node: "ticket", log: "ticket created with full transcript", ok: true },
  { node: "db", log: "call, recording & ticket stored", ok: true },
];

export function SystemGraph() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setStep((s) => (s + 1) % script.length), 1500);
    return () => clearInterval(t);
  }, [reduce]);

  const current = script[step];
  const recent = [script[(step + script.length - 1) % script.length], current];

  return (
    <div className="system-card enter" style={{ "--d": "0.5s" } as React.CSSProperties}>
      <div className="system-head">
        <span>AI receptionist · live architecture</span>
        <span className="live-chip">
          <span className="pulse-dot" style={{ marginLeft: 0 }} /> running
        </span>
      </div>

      <svg className="system-svg" viewBox="0 0 420 276" role="img" aria-label="Architecture of the AI receptionist: caller to Twilio to a Node.js call service and AI agent with ElevenLabs voice, escalating to a human agent or a support ticket stored in PostgreSQL.">
        <defs>
          <linearGradient id="flowGrad" x1="0" x2="1">
            <stop offset="0" stopColor="#8b7bff" />
            <stop offset="1" stopColor="#5ce1e6" />
          </linearGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {edges.map((e) => (
          <g key={e.id}>
            <path id={e.id} className="edge" d={e.d} />
            <path className="edge-flow" d={e.d} stroke="url(#flowGrad)" />
            {!reduce && (
              <circle r="2.6" fill="#5ce1e6" filter="url(#glow)">
                <animateMotion dur="1.8s" repeatCount="indefinite" begin={`${Number(e.id.slice(1)) * 0.25}s`}>
                  <mpath href={`#${e.id}`} />
                </animateMotion>
              </circle>
            )}
          </g>
        ))}

        {(Object.keys(nodes) as NodeId[]).map((id) => {
          const n = nodes[id];
          const isActive = current.node === id;
          return (
            <g key={id} className="node">
              <m.rect
                x={n.x}
                y={n.y}
                width={W}
                height={H}
                rx={10}
                animate={{
                  stroke: isActive ? "rgba(139,123,255,0.95)" : "rgba(255,255,255,0.12)",
                  fill: isActive ? "#1a1730" : "#12121a",
                }}
                transition={{ duration: 0.35 }}
                style={isActive ? { filter: "drop-shadow(0 0 10px rgba(139,123,255,0.55))" } : undefined}
              />
              <text x={n.x + 12} y={n.y + 19}>
                {n.label}
              </text>
              <text className="node-sub" x={n.x + 12} y={n.y + 33}>
                {n.sub}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="system-log" aria-hidden="true">
        <AnimatePresence initial={false} mode="popLayout">
          {recent.map((line, i) => (
            <m.div
              key={`${step}-${i}`}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: i === 1 ? 1 : 0.45, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <span className="t">›</span>
              <span className={line.ok ? "ok" : undefined}>{line.log}</span>
            </m.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
