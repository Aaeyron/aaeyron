import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { SelectedProject } from "@/lib/content";
import { Tag, Txt } from "../ui/primitives";

export default function SelectedProjectCard({ project }: { project: SelectedProject }) {
  return (
    <article
      aria-labelledby={`sp-${project.slug}`}
      className="flex flex-col overflow-hidden rounded-lg border border-line bg-bg"
      data-reveal
    >
      <div className="relative aspect-[16/10] border-b border-line bg-surface">
        {project.image ? (
          <Image src={project.image.src} alt={project.image.alt} fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover object-top" />
        ) : (
          <>
            <span aria-hidden className="absolute inset-0 grid place-items-center text-6xl font-semibold tracking-[-0.05em] text-line-strong">
              {project.initials}
            </span>
            <span className="absolute bottom-3 left-3 text-xs">
              <Txt>[TODO: add screenshot]</Txt>
            </span>
          </>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <ul className="flex flex-wrap gap-2" aria-label="Status">
          {project.badges.map((b) => (
            <li key={b}>
              <Tag accent>{b}</Tag>
            </li>
          ))}
        </ul>
        <h3 id={`sp-${project.slug}`} className="mt-4 text-2xl font-semibold tracking-[-0.025em]">
          {project.title}
        </h3>
        {project.label && <p className="mt-1 text-sm font-medium">{project.label}</p>}
        <p className="label mt-2 normal-case tracking-normal">{project.category}</p>
        <p className="mt-4 text-[0.975rem] text-muted">{project.description}</p>

        <div className="mt-auto pt-6">
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
            <p className="label inline-flex min-h-11 items-center">Repository coming soon</p>
          )}
        </div>
      </div>
    </article>
  );
}
