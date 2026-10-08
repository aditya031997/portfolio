import { Reveal } from "./motion";

export function Flow({ title, steps }: { title: string; steps: string[] }) {
  return (
    <div className="flow-card">
      <p className="flow-title">{title}</p>
      <ol className="flow">
        {steps.map((step, i) => (
          <li key={step}>
            <Reveal delay={i * 0.12} y={12}>
              <span className="flow-node" style={{ display: "block" }}>
                {step}
              </span>
            </Reveal>
            {i < steps.length - 1 && <span className="flow-link" aria-hidden="true" />}
          </li>
        ))}
      </ol>
    </div>
  );
}
