import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/content/projects";
import { StatusBadge } from "@/components/StatusBadge";
import { Flow } from "@/components/Flow";
import { ProjectVisual } from "@/components/ProjectVisual";
import { CaseToc } from "@/components/CaseToc";
import { Reveal, Tilt } from "@/components/motion";
import { WordReveal } from "@/components/WordReveal";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  const url = `/projects/${project.slug}/`;
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: url },
    openGraph: { type: "article", url, title: project.title, description: project.summary },
  };
}

export default async function ProjectPage({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];
  const hasMedia = !!project.videoUrl || project.screenshots.length > 0;

  const toc = [
    { id: "overview", label: "Overview" },
    { id: "built", label: "What I built" },
    { id: "architecture", label: "Architecture" },
    { id: "decisions", label: "Key decisions" },
    ...(hasMedia ? [{ id: "screens", label: "Screens" }] : []),
  ];

  return (
    <div style={{ "--accent": project.accent } as React.CSSProperties}>
      <section className="case-hero">
        <div className="wrap">
          <Link href="/#work" className="back-link">
            ← All work
          </Link>
          <div className="case-hero-grid">
            <div>
              <div className="enter">
                <StatusBadge status={project.status} />
              </div>
              <h1>
                <WordReveal text={project.title} />
              </h1>
              <div className="enter" style={{ "--d": "0.25s" } as React.CSSProperties}>
                <p className="case-tagline">{project.tagline}</p>
                <dl className="case-meta">
                  <div>
                    <dt>Role</dt>
                    <dd>{project.role}</dd>
                  </div>
                  <div>
                    <dt>Timeline</dt>
                    <dd>{project.period ?? "Ongoing"}</dd>
                  </div>
                  <div>
                    <dt>Status</dt>
                    <dd>{project.statusNote}</dd>
                  </div>
                </dl>
                <ul className="tags" aria-label="Tech stack">
                  {project.stack.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                {project.liveUrl && (
                  <div style={{ marginTop: 28 }}>
                    <a href={project.liveUrl} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                      <span>Visit live site</span>
                      <span className="arrow">↗</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
            <div className="enter" style={{ "--d": "0.35s" } as React.CSSProperties}>
              <Tilt max={5}>
                <ProjectVisual project={project} />
              </Tilt>
            </div>
          </div>
        </div>
      </section>

      <div className="wrap case-body">
        <CaseToc items={toc} />

        <div className="case-content">
          <Reveal className="case-section" id="overview">
            <h2>
              <span className="num">01</span>Overview
            </h2>
            <div className="prose">
              {project.overview.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>
          </Reveal>

          <section className="case-section" id="built">
            <Reveal>
              <h2>
                <span className="num">02</span>What I built
              </h2>
            </Reveal>
            <ul className="built-list">
              {project.built.map((item, i) => (
                <Reveal as="li" key={item} delay={(i % 2) * 0.08}>
                  <span className="check" aria-hidden="true">
                    ✓
                  </span>
                  <span>{item}</span>
                </Reveal>
              ))}
            </ul>
          </section>

          <section className="case-section" id="architecture">
            <Reveal>
              <h2>
                <span className="num">03</span>How it fits together
              </h2>
            </Reveal>
            <div className="flows">
              {project.architecture.map((flow) => (
                <Flow key={flow.title} title={flow.title} steps={flow.steps} />
              ))}
            </div>
          </section>

          <section className="case-section" id="decisions">
            <Reveal>
              <h2>
                <span className="num">04</span>Key decisions
              </h2>
            </Reveal>
            <ul className="decisions">
              {project.decisions.map((d, i) => (
                <Reveal as="li" key={d.title} delay={(i % 2) * 0.08}>
                  <p className="decision-num">Decision {String(i + 1).padStart(2, "0")}</p>
                  <h3>{d.title}</h3>
                  <p>{d.body}</p>
                </Reveal>
              ))}
            </ul>
          </section>

          {hasMedia && (
            <section className="case-section" id="screens">
              <h2>
                <span className="num">05</span>Screens
              </h2>
              <div className="shots">
                {project.videoUrl && (
                  <iframe
                    className="video"
                    src={project.videoUrl}
                    title={`${project.title} walkthrough`}
                    loading="lazy"
                    allowFullScreen
                  />
                )}
                {project.screenshots.map((shot) => (
                  <figure key={shot.src}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={shot.src} alt={shot.alt} loading="lazy" />
                    <figcaption>{shot.alt}</figcaption>
                  </figure>
                ))}
              </div>
            </section>
          )}

          <Reveal>
            <Link
              href={`/projects/${next.slug}/`}
              className="next-project"
              style={{ "--next-accent": next.accent } as React.CSSProperties}
            >
              <p className="eyebrow">Next case study</p>
              <span className="next-title">
                {next.title}
                <span className="circle" aria-hidden="true">
                  →
                </span>
              </span>
            </Link>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
