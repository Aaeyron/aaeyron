import { ArrowUpRight, ExternalLink } from "lucide-react";
import type { Project } from "@/lib/content";

const githubCls =
  "group/gh inline-flex min-h-11 items-center gap-1.5 font-medium text-ink transition-colors duration-200 hover:text-accent-text";

/**
 * Actions for a school project: "Live demo" (primary, accent) when a real
 * demo URL exists, then "View on GitHub" (secondary). Side by side, stacked
 * on small phones.
 */
export default function ProjectLinks({ project, className = "" }: { project: Project; className?: string }) {
  if (!project.live && !project.repo) return null;

  return (
    <div
      className={`flex flex-col items-start gap-2 border-t border-line pt-4 min-[400px]:flex-row min-[400px]:items-center min-[400px]:gap-6 ${className}`}
    >
      {project.live && (
        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${project.title} live demo (opens in a new tab)`}
          className="group/live inline-flex min-h-11 items-center gap-2 bg-accent px-4 font-medium text-on-accent transition-[background-color,transform] duration-200 hover:bg-[color-mix(in_srgb,var(--accent)_82%,black)] active:scale-[0.97]"
        >
          Live demo
          <ExternalLink
            size={15}
            aria-hidden
            className="transition-transform duration-200 group-hover/live:-translate-y-0.5 group-hover/live:translate-x-0.5"
          />
        </a>
      )}
      {project.repo && (
        <a href={project.repo} target="_blank" rel="noopener noreferrer" className={githubCls}>
          View on GitHub <span className="sr-only">: {project.title} (opens in a new tab)</span>
          <ArrowUpRight
            size={16}
            aria-hidden
            className="transition-transform duration-200 group-hover/gh:-translate-y-0.5 group-hover/gh:translate-x-0.5"
          />
        </a>
      )}
    </div>
  );
}
