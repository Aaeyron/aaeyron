import Image from "next/image";
import type { Project } from "@/lib/content";
import ProjectLinks from "../projects/ProjectLinks";
import { CornerMarks, Label, Tag } from "../ui/primitives";

/** Home page "Earlier school projects" row: screenshot, summary, tags, and Live demo / GitHub. */
export default function SchoolProjectRow({ project, index }: { project: Project; index: number }) {
  const titleId = `school-${project.slug}`;

  return (
    <article
      aria-labelledby={titleId}
      className="group grid-12 gap-y-8 border-t border-line py-12 sm:py-16"
      data-reveal
    >
      <div className="col-span-4 sm:col-span-8 lg:col-span-6">
        <div className="relative">
          <CornerMarks />
          <div className="relative aspect-[16/10] overflow-hidden border border-line bg-surface">
            <Image
              src={project.image.src}
              alt={project.image.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </div>
        </div>
      </div>

      <div className="col-span-4 flex flex-col sm:col-span-8 lg:col-span-6 lg:pl-8">
        <Label index={`0${index + 1}`}>{project.context}</Label>
        <h3 id={titleId} className="h-card mt-4">
          {project.title}
        </h3>
        <p className="measure mt-4 text-muted">{project.summary}</p>
        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tech stack">
          {project.stack.map((s) => (
            <li key={s}>
              <Tag>{s}</Tag>
            </li>
          ))}
        </ul>
        <ProjectLinks project={project} className="measure mt-8" />
      </div>
    </article>
  );
}
