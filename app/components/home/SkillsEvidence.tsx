import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getProject, skills } from "@/lib/content";
import { Highlight, Label, SectionHeader } from "../ui/primitives";

export default function SkillsEvidence() {
  return (
    <section aria-labelledby="skills-title" className="section border-t border-line">
      <div className="container-x">
        <SectionHeader id="skills-title" index="03" label="Skills as evidence" title={<>Skills, with <Highlight>receipts</Highlight>.</>}>
          <p>No percentage bars. Each skill links to the project where I actually used it.</p>
        </SectionHeader>

        <div className="grid gap-x-10 gap-y-12 md:grid-cols-3">
          {skills.map((group) => (
            <div key={group.group}>
              <h3 className="mb-3" data-reveal>
                <Label>{group.group}</Label>
              </h3>
              <ul>
                {group.items.map((skill) => (
                  <li key={skill.name} className="border-t border-line py-3" data-reveal>
                    <p className="font-medium">{skill.name}</p>
                    <p className="mt-0.5 flex flex-wrap items-center gap-x-4 text-sm text-muted">
                      <span className="font-mono text-xs">used in</span>
                      {skill.projects.map((slug) => {
                        const p = getProject(slug);
                        if (!p) return null;
                        return (
                          <Link
                            key={slug}
                            href={`/projects/${slug}`}
                            className="group inline-flex min-h-11 items-center gap-1 text-ink transition-colors duration-200 hover:text-accent-text sm:min-h-8"
                          >
                            {p.title}
                            <ArrowUpRight size={13} aria-hidden className="text-muted transition-colors group-hover:text-accent-text" />
                          </Link>
                        );
                      })}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
