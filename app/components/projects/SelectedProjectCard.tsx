import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { SelectedProject } from "@/lib/content";
import { CornerMarks, Label, Tag } from "../ui/primitives";

type Props = { project: SelectedProject; index: number; total: number };

/**
 * Text-first project card. If `project.image` is set in lib/content.ts,
 * a screenshot panel appears on top; otherwise the card is text-only.
 */
export default function SelectedProjectCard({ project, index, total }: Props) {
  const num = String(index + 1).padStart(2, "0");

  return (
    <article
      aria-labelledby={`sp-${project.slug}`}
      className="group relative flex w-full flex-col border border-line bg-bg transition-colors duration-200 hover:border-line-strong"
      data-reveal
    >
      <CornerMarks hover />

      {project.image && (
        <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-surface">
          <Image
            src={project.image.src}
            alt={project.image.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <span className="font-mono text-xs text-muted">
            <span className="text-accent-text">{num}</span> / {String(total).padStart(2, "0")}
          </span>
          <ul className="flex flex-wrap justify-end gap-1.5" aria-label="Status">
            {project.badges.map((b) => (
              <li key={b}>
                <Tag accent>{b}</Tag>
              </li>
            ))}
          </ul>
        </div>

        <span
          aria-hidden
          className="mt-6 block h-px w-8 bg-accent transition-[width] duration-300 group-hover:w-16"
        />

        <h3 id={`sp-${project.slug}`} className="mt-5 text-2xl font-semibold tracking-[-0.025em] sm:text-[1.75rem]">
          {project.title}
        </h3>
        {project.label && <p className="mt-1 text-sm font-medium text-muted">{project.label}</p>}

        <div className="mt-4">
          <Label plain wrap>
            {project.category}
          </Label>
        </div>

        <p className="mt-5 text-[0.975rem] text-muted">{project.description}</p>

        <div className="mt-auto pt-8">
          <div className="flex min-h-11 items-center border-t border-line pt-3">
          {project.repo ? (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-1.5 font-medium transition-colors duration-200 hover:text-accent-text"
            >
              View on GitHub <span className="sr-only">: {project.title}</span>
              <ArrowUpRight size={16} aria-hidden />
            </a>
          ) : (
            <Label>Repository coming soon</Label>
          )}
          </div>
        </div>
      </div>
    </article>
  );
}
