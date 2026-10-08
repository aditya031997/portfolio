import Link from "next/link";
import type { Project } from "@/content/projects";
import { StatusBadge } from "./StatusBadge";
import { ProjectVisual } from "./ProjectVisual";
import { Reveal, Tilt } from "./motion";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <Reveal>
      <Tilt className="project-card" style={{ "--accent": project.accent } as React.CSSProperties} max={3}>
        <Link href={`/projects/${project.slug}/`} className="card-link" aria-label={`Read the ${project.title} case study`} />
        <div>
          <p className="project-index">
            <span>{String(index + 1).padStart(2, "0")}</span>
            <StatusBadge status={project.status} />
          </p>
          <h3>{project.title}</h3>
          <p className="project-role">
            {project.role}
            {project.period ? ` · ${project.period}` : ""}
          </p>
          <p className="project-summary">{project.summary}</p>
          <ul className="tags" aria-label="Tech stack">
            {project.stack.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <span className="project-cta">
            <span className="circle" aria-hidden="true">
              →
            </span>
            Read case study
          </span>
        </div>
        <div className="project-visual-wrap">
          <ProjectVisual project={project} />
        </div>
      </Tilt>
    </Reveal>
  );
}
