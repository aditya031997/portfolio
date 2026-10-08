import type { Project } from "@/content/projects";

/**
 * Hand-built UI mock-ups (HTML/CSS only) that hint at each product.
 * Swap for real screenshots via `project.screenshots` when you have them.
 */
export function ProjectVisual({ project }: { project: Project }) {
  const url = project.liveUrl ? new URL(project.liveUrl).host : `${project.slug}.app`;
  return (
    <div className="pv-wrap" aria-hidden="true">
      <div className="pv">
      <div className="pv-bar">
        <i />
        <i />
        <i />
        <span className="pv-url">{url}</span>
      </div>
      <div className="pv-body">{bodies[project.visual]()}</div>
      </div>
      {floating[project.visual]}
    </div>
  );
}

const bodies: Record<Project["visual"], () => React.ReactNode> = {
  football: () => (
    <>
      <div className="pv-row">
        <span className="pv-muted">PREMIER LEAGUE · MATCHDAY 8</span>
        <span className="pv-pill">ISR · 60s</span>
      </div>
      {[
        ["Arsenal", "Chelsea", "2 - 1", [52, 24, 24], true],
        ["Liverpool", "Spurs", "18:30", [61, 21, 18], false],
        ["Man City", "Newcastle", "20:45", [68, 19, 13], false],
      ].map(([h, a, score, prob, live]) => (
        <div key={h as string} className="pv-row" style={{ display: "grid", gap: 8, justifyContent: "normal" }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
            <span>
              {h as string} <span className="pv-muted">vs</span> {a as string}
            </span>
            <span className="pv-score">
              {live ? <span className="pv-live-dot" /> : null}
              {score as string}
            </span>
          </div>
          <div className="pv-prob">
            <span style={{ width: `${(prob as number[])[0]}%`, background: "var(--accent)" }} />
            <span style={{ width: `${(prob as number[])[1]}%`, background: "rgba(255,255,255,.25)" }} />
            <span style={{ width: `${(prob as number[])[2]}%`, background: "rgba(255,255,255,.1)" }} />
          </div>
        </div>
      ))}
    </>
  ),

  voice: () => (
    <>
      <div className="pv-row">
        <span>
          <span className="pv-live-dot" />
          Live call · 02:14
        </span>
        <span className="pv-pill">AI handling</span>
      </div>
      <div className="pv-wave">
        {Array.from({ length: 34 }, (_, i) => (
          <span key={i} style={{ height: `${20 + ((i * 37) % 80)}%`, animationDelay: `${(i % 9) * 0.09}s` }} />
        ))}
      </div>
      <div className="pv-bubble user">Hi, can I move my appointment to Friday?</div>
      <div className="pv-bubble ai">Sure, Friday 11:00 is free. I&apos;ve emailed you the confirmation.</div>
    </>
  ),

  crypto: () => (
    <>
      <div className="pv-row">
        <span>
          ETH <span className="pv-muted">/ USD</span>
        </span>
        <span className="pv-accent pv-score">+4.82%</span>
      </div>
      <svg className="pv-chart" viewBox="0 0 300 90" preserveAspectRatio="none">
        <defs>
          <linearGradient id="pvArea" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#fbbf24" stopOpacity="0.5" />
            <stop offset="1" stopColor="#fbbf24" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path className="area" d="M0 70 L30 62 L60 66 L90 48 L120 54 L150 38 L180 44 L210 26 L240 32 L270 16 L300 20 L300 90 L0 90 Z" />
        <path className="line" d="M0 70 L30 62 L60 66 L90 48 L120 54 L150 38 L180 44 L210 26 L240 32 L270 16 L300 20" />
      </svg>
      <div className="pv-swap">
        <div className="pv-row">
          <span className="pv-muted">YOU PAY</span>
          <span>0.50 ETH</span>
        </div>
        <div className="pv-row">
          <span className="pv-muted">YOU GET</span>
          <span>1,642 USDC</span>
        </div>
        <div className="pv-swap-btn">Swap on Base</div>
      </div>
    </>
  ),

  language: () => (
    <>
      <div className="pv-row">
        <span className="pv-muted">JAPANESE · N5 · Q 7/20</span>
        <span className="pv-pill">Assessment</span>
      </div>
      <div className="pv-kana">あ</div>
      <div className="pv-options">
        <div className="pv-option">ka</div>
        <div className="pv-option correct">a ✓</div>
        <div className="pv-option">sa</div>
        <div className="pv-option">o</div>
      </div>
      <div className="pv-prob" style={{ height: 6 }}>
        <span style={{ width: "35%", background: "var(--accent)" }} />
      </div>
    </>
  ),
};

const floating: Record<Project["visual"], React.ReactNode> = {
  football: (
    <div className="pv-floating">
      <span className="pv-muted">JSON-LD</span> SportsEvent ✓
    </div>
  ),
  voice: (
    <div className="pv-floating">
      <span className="pv-muted">ESCALATION</span> ticket #1042
    </div>
  ),
  crypto: (
    <div className="pv-floating">
      <span className="pv-muted">5 CHAINS</span> ETH · BNB · POL · BASE · AVAX
    </div>
  ),
  language: (
    <div className="pv-floating">
      <span className="pv-muted">FEEDBACK</span> instant ✓
    </div>
  ),
};
