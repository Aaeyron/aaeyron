"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/content";
import { CornerMarks, Label, Tag, Txt } from "../ui/primitives";

type Mode = "short" | "full";
const modes: { id: Mode; label: string }[] = [
  { id: "short", label: "30-second version" },
  { id: "full", label: "Full story" },
];

const linkCls =
  "inline-flex min-h-11 items-center gap-1.5 font-medium text-ink transition-colors duration-200 hover:text-accent-text";

export default function CaseStudyCard({ project, index }: { project: Project; index: number }) {
  const [mode, setMode] = useState<Mode>("short");
  const { caseStudy: cs } = project;
  const titleId = `cs-${project.slug}`;

  return (
    <article aria-labelledby={titleId} className="grid-12 gap-y-8 border-t border-line py-12 sm:py-16" data-reveal>
      <div className="col-span-4 sm:col-span-8 lg:col-span-6">
        <div className="relative lg:sticky lg:top-24">
          <CornerMarks />
          <div className="relative aspect-[16/10] overflow-hidden border border-line bg-surface">
            <Image
              src={project.image.src}
              alt={project.image.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-top"
            />
          </div>
        </div>
      </div>

      <div className="col-span-4 sm:col-span-8 lg:col-span-6 lg:pl-8">
        <Label index={`0${index + 1}`}>{project.context}</Label>
        <h3 id={titleId} className="h-card mt-4">
          {project.title}
        </h3>
        <p className="mt-3 text-muted">{project.tagline}</p>
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tech stack">
          {project.stack.map((s) => (
            <li key={s}>
              <Tag>{s}</Tag>
            </li>
          ))}
        </ul>

        <div role="group" aria-label="Story length" className="mt-8 inline-flex rounded-md border border-line p-0.5">
          {modes.map((m) => (
            <button
              key={m.id}
              type="button"
              aria-pressed={mode === m.id}
              aria-controls={`${titleId}-story`}
              onClick={() => setMode(m.id)}
              className={`min-h-11 cursor-pointer rounded-[8px] px-4 text-sm transition-colors duration-200 ${
                mode === m.id ? "bg-ink text-bg" : "text-muted hover:text-ink"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        <div id={`${titleId}-story`} key={mode} className="swap-in mt-6">
          {mode === "short" ? (
            <p className="measure text-[1.0625rem]">
              <Txt>{cs.short}</Txt>
            </p>
          ) : (
            <dl className="measure space-y-7">
              <div>
                <dt className="label">Problem</dt>
                <dd className="mt-2">
                  <Txt>{cs.problem}</Txt>
                </dd>
              </div>
              <div>
                <dt className="label">Constraints</dt>
                <dd className="mt-2">
                  <ul className="space-y-1.5">
                    {cs.constraints.map((c) => (
                      <li key={c} className="flex gap-3">
                        <span aria-hidden className="text-muted">–</span>
                        <span>
                          <Txt>{c}</Txt>
                        </span>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
              <div>
                <dt className="label">Decisions</dt>
                <dd className="mt-2">
                  <ol className="space-y-3">
                    {cs.decisions.map((d, i) => (
                      <li key={d.title} className="flex gap-3">
                        <span aria-hidden className="pt-0.5 font-mono text-sm text-accent-text">
                          {i + 1}
                        </span>
                        <span>
                          <span className="font-medium">
                            <Txt>{d.title}</Txt>
                          </span>
                          <span className="mt-0.5 block text-muted">
                            <Txt>{d.detail}</Txt>
                          </span>
                        </span>
                      </li>
                    ))}
                  </ol>
                </dd>
              </div>
              <div>
                <dt className="label">Result</dt>
                <dd className="mt-2 space-y-3">
                  <p>
                    <span className="block font-medium">What I learned</span>
                    <span className="text-muted">
                      <Txt>{cs.result.learned}</Txt>
                    </span>
                  </p>
                  <p>
                    <span className="block font-medium">What I’d improve next</span>
                    <span className="text-muted">
                      <Txt>{cs.result.next}</Txt>
                    </span>
                  </p>
                </dd>
              </div>
            </dl>
          )}
        </div>

        <div className="mt-8 flex flex-wrap gap-x-6">
          <Link href={`/projects/${project.slug}`} className={`group ${linkCls}`}>
            Read the case study
            <span className="sr-only">: {project.title}</span>
            <ArrowRight size={16} aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
          {project.repo ? (
            <a href={project.repo} target="_blank" rel="noopener noreferrer" className={linkCls}>
              View on GitHub <span className="sr-only">: {project.title}</span>
              <ArrowUpRight size={16} aria-hidden />
            </a>
          ) : (
            <span className="inline-flex min-h-11 items-center">
              <Txt>[TODO: GitHub repo URL]</Txt>
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
