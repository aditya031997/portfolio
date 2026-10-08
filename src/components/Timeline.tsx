"use client";

import { m, useScroll } from "motion/react";
import { useRef } from "react";
import type { Job } from "@/content/experience";
import { Reveal } from "./motion";

export function Timeline({ jobs }: { jobs: Job[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });

  return (
    <div ref={ref} className="timeline">
      <span className="timeline-rail" aria-hidden="true" />
      <m.span className="timeline-fill" style={{ scaleY: scrollYProgress }} aria-hidden="true" />
      <ol className="timeline-list">
      {jobs.map((job, i) => (
        <li key={job.company}>
          <Reveal delay={i * 0.08} className="job">
            <div className="job-head">
              <div>
                <h3>{job.role}</h3>
                <p className="job-company">
                  {job.company} · {job.location}
                </p>
              </div>
              <p className="job-period">{job.period}</p>
            </div>
            <ul>
              {job.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </Reveal>
        </li>
      ))}
      </ol>
    </div>
  );
}
