import { ArrowUpRight, ExternalLink } from "lucide-react";
import type { Project } from "@/lib/content";
import { buttonClass } from "../ui/ButtonLink";

// Text link: ink in every state; only the arrow moves on hover.
const githubCls = "group/gh inline-flex min-h-11 items-center gap-1.5 font-medium text-ink";

/**
 * Actions for a school project: "Live demo" (the shared ink button, like "See my work") when a
 * real demo URL exists, then "View on GitHub" (text link). Side by side, stacked on small phones.
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
          className={buttonClass("ink")}
        >
          Live demo
          <ExternalLink
            size={15}
            aria-hidden
            className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
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
