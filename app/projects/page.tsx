import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { projects, projectsSummary, selectedProjects } from "@/lib/content";
import SelectedProjectCard from "../components/projects/SelectedProjectCard";
import { Highlight, SectionHeader, Tag } from "../components/ui/primitives";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "This year’s in-progress projects by Aaron Seth Nagtalon (MG Sakura Learning Platform, TactileLens and JM Learning Hub), plus three earlier 3rd-year college projects built to learn.",
};

const linkCls =
  "inline-flex min-h-11 items-center gap-1.5 font-medium transition-colors duration-200 hover:text-accent-text";

export default function Projects() {
  return (
    <>
      <div className="container-x pt-14 sm:pt-24">
        <SectionHeader as="h1" label="Projects" title={<>What I’m building, and <Highlight>where I started</Highlight>.</>}>
          <p>This year’s selected projects come first, then the school projects I built to learn.</p>
        </SectionHeader>
      </div>

      <section aria-labelledby="selected-title" className="pb-16 sm:pb-24">
        <div className="container-x">
          <p className="label mb-3 flex gap-3">
            <span className="text-accent-text">01</span>
            <span>2026 · in progress</span>
          </p>
          <h2 id="selected-title" className="h2 mb-8">
            Selected projects
          </h2>
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {selectedProjects.map((p) => (
              <li key={p.slug} className="flex">
                <SelectedProjectCard project={p} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="school-title" className="section border-t border-line">
        <div className="container-x">
          <p className="label mb-3 flex gap-3">
            <span className="text-accent-text">02</span>
            <span>3rd year of college · {projectsSummary}</span>
          </p>
          <h2 id="school-title" className="h2 mb-8">
            Earlier school projects
          </h2>

          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <li key={p.slug} className="flex">
                <article
                  aria-labelledby={`school-${p.slug}`}
                  className="flex w-full flex-col overflow-hidden rounded-lg border border-line"
                  data-reveal
                >
                  <div className="relative aspect-[16/10] border-b border-line bg-surface">
                    <Image
                      src={p.image.src}
                      alt={p.image.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <p className="label">{p.context}</p>
                    <h3 id={`school-${p.slug}`} className="mt-2 text-2xl font-semibold tracking-[-0.025em]">
                      {p.title}
                    </h3>
                    <p className="mt-3 text-[0.975rem] text-muted">{p.tagline}</p>
                    <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tech stack">
                      {p.stack.map((s) => (
                        <li key={s}>
                          <Tag>{s}</Tag>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto flex flex-wrap gap-x-6 pt-6">
                      <Link href={`/projects/${p.slug}`} className={linkCls}>
                        Read the case study <span className="sr-only">: {p.title}</span>
                        <ArrowRight size={16} aria-hidden />
                      </Link>
                      {p.repo && (
                        <a href={p.repo} target="_blank" rel="noopener noreferrer" className={linkCls}>
                          View on GitHub <span className="sr-only">: {p.title}</span>
                          <ArrowUpRight size={16} aria-hidden />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
