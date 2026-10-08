import { statusLabel, type ProjectStatus } from "@/content/projects";

export function StatusBadge({ status }: { status: ProjectStatus }) {
  return <span className={`status status-${status}`}>{statusLabel[status]}</span>;
}
