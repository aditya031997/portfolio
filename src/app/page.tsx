import { skills } from "@/content/profile";
import { projects } from "@/content/projects";
import { experience } from "@/content/experience";
import { Hero } from "@/components/Hero";
import { ProjectCard } from "@/components/ProjectCard";
import { Timeline } from "@/components/Timeline";
import { Contact } from "@/components/Contact";
import { Reveal } from "@/components/motion";

const marqueeItems = [
  "Next.js",
  "React",
  "Node.js",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "NestJS",
  "Vue.js",
  "Payload CMS",
  "Twilio",
  "ElevenLabs",
  "Docker",
];

const skillGlows = ["rgba(139,123,255,.35)", "rgba(92,225,230,.3)", "rgba(52,211,153,.3)", "rgba(251,191,36,.28)", "rgba(244,114,182,.28)"];

export default function Home() {
  return (
    <>
      <Hero />

      <div className="marquee" aria-label="Technologies I work with">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <ul key={copy} className="marquee-group" aria-hidden={copy === 1}>
              {marqueeItems.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      <section id="work" className="section">
        <div className="wrap">
          <Reveal className="section-head">
            <div>
              <p className="eyebrow">01 · Selected work</p>
              <h2 className="section-title">
                Products I&apos;ve <span className="serif grad-text">shipped</span>
              </h2>
            </div>
            <p className="section-lead">
              Most of this is client work, so I can&apos;t share the code. Each case study explains the problem, what I
              built and why I made certain choices.
            </p>
          </Reveal>
          <ul className="projects">
            {projects.map((p, i) => (
              <li key={p.slug}>
                <ProjectCard project={p} index={i} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="experience" className="section">
        <div className="wrap">
          <Reveal className="section-head">
            <div>
              <p className="eyebrow">02 · Experience</p>
              <h2 className="section-title">
                Where I&apos;ve <span className="serif grad-text">worked</span>
              </h2>
            </div>
          </Reveal>
          <Timeline jobs={experience} />
        </div>
      </section>

      <section id="skills" className="section">
        <div className="wrap">
          <Reveal className="section-head">
            <div>
              <p className="eyebrow">03 · Toolkit</p>
              <h2 className="section-title">
                What I <span className="serif grad-text">work with</span>
              </h2>
            </div>
            <p className="section-lead">Frontend, backend, databases and the tools I use every day.</p>
          </Reveal>
          <div className="bento">
            {skills.map((group, i) => (
              <Reveal
                key={group.label}
                delay={i * 0.06}
                className="bento-card"
                style={{ "--glow": skillGlows[i % skillGlows.length] } as React.CSSProperties}
              >
                <div className="bento-icon" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3>{group.label}</h3>
                <ul className="chips">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="section">
        <div className="wrap">
          <Contact />
        </div>
      </section>
    </>
  );
}
