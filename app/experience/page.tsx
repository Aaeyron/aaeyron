import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import {
  certifications,
  currentWork,
  experience,
  profile,
  selectedProjects,
  story,
  techEvents,
} from "@/lib/content";
import CertificationRows from "../components/certificates/CertificationRows";
import { CornerMarks, Highlight, Label, SectionHeader, Tag, Txt } from "../components/ui/primitives";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "About Aaron Seth Nagtalon: current projects including the TactileLens capstone, an AI/ML Engineer internship at Apno AI, tech community events, and certifications.",
};

const linkCls =
  "group inline-flex min-h-11 items-center gap-1.5 font-medium transition-colors duration-200 hover:text-accent-text";

export default function Experience() {
  const featured = selectedProjects.find((p) => p.slug === currentWork.featured.slug);
  const also = currentWork.also
    .map((slug) => selectedProjects.find((p) => p.slug === slug))
    .filter((p) => p !== undefined);

  return (
    <>
      <div className="container-x pt-14 sm:pt-24">
        <SectionHeader
          as="h1"
          label="Experience"
          title={<>What I’m working on, and <Highlight>where I learn</Highlight>.</>}
        >
          <p>About me, my current projects, my internship, the tech community, and certifications, all in one place.</p>
        </SectionHeader>
      </div>

      {/* 01 · About me */}
      <section id="about" aria-labelledby="about-title" className="pb-16 sm:pb-24">
        <div className="container-x grid-12 items-start gap-y-10">
          <div className="col-span-4 sm:col-span-4 lg:col-span-4" data-reveal>
            <div className="relative">
              <CornerMarks />
              <div className="relative aspect-[4/5] overflow-hidden border border-line bg-surface">
                <Image
                  src={profile.aboutImage}
                  alt={`Portrait of ${profile.name}`}
                  fill
                  priority
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <p aria-hidden className="mt-3 flex justify-between font-mono text-[0.7rem] text-muted">
                <span>fig. 01</span>
                <span>{profile.locationShort}</span>
              </p>
            </div>
          </div>

          <div className="col-span-4 sm:col-span-8 lg:col-span-7 lg:col-start-6" data-reveal>
            <Label index="01" className="mb-5">
              About me
            </Label>
            <h2 id="about-title" className="h2">
              A developer in progress, <Highlight>building with intention</Highlight>.
            </h2>
            <div className="measure mt-6 space-y-4 text-muted">
              <p className="text-lg text-ink">{profile.intro}</p>
              {story.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              <Label plain>{profile.role}</Label>
              <Label plain>{profile.location}</Label>
            </div>
          </div>
        </div>
      </section>

      {/* 02 · Currently working on */}
      <section id="current" aria-labelledby="current-title" className="section border-t border-line">
        <div className="container-x">
          <SectionHeader id="current-title" index="02" label="Currently working on" title="What I’m building now." />

          {featured && (
            <div data-reveal>
            <article
              aria-labelledby="featured-title"
              className="group relative border border-line bg-bg p-6 transition-colors duration-200 hover:border-line-strong sm:p-8"
            >
              <CornerMarks hover />
              <div className="flex flex-wrap items-center gap-1.5">
                {featured.badges.map((b) => (
                  <Tag key={b} accent>
                    {b}
                  </Tag>
                ))}
                <Label plain wrap>
                  {featured.category}
                </Label>
              </div>
              <h3 id="featured-title" className="mt-6 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
                {featured.title}
              </h3>
              <p className="measure mt-4 text-lg">
                {currentWork.featured.lead}{" "}
                <span className="text-muted">{currentWork.featured.description}</span>
              </p>
              <div className="mt-6 flex flex-wrap gap-x-6 border-t border-line pt-3">
                {featured.repo && (
                  <a href={featured.repo} target="_blank" rel="noopener noreferrer" className={linkCls}>
                    View on GitHub <span className="sr-only">: {featured.title}</span>
                    <ArrowUpRight size={16} aria-hidden />
                  </a>
                )}
                <Link href={`/projects#${featured.slug}`} className={linkCls}>
                  See it on Projects
                  <ArrowRight size={16} aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </article>
            </div>
          )}

          <ul className="mt-8 border-b border-line">
            {also.map((p) => (
              <li key={p.slug} className="border-t border-line" data-reveal>
                <Link
                  href={`/projects#${p.slug}`}
                  className="group flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8"
                >
                  <span className="min-w-0">
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="text-lg font-semibold tracking-[-0.02em] transition-colors duration-200 group-hover:text-accent-text">
                        {p.title}
                      </span>
                      {p.badges.map((b) => (
                        <Tag key={b} accent>
                          {b}
                        </Tag>
                      ))}
                    </span>
                    <span className="mt-1 block text-sm text-muted">{p.category}</span>
                  </span>
                  <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium">
                    View on Projects
                    <ArrowRight size={15} aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 03 · Internship */}
      <section id="internship" aria-labelledby="internship-title" className="section border-t border-line">
        <div className="container-x">
          <SectionHeader id="internship-title" index="03" label="Internship" title="Where I’m working." />

          <ol className="border-b border-line">
            {experience.map((job) => (
              <li key={job.company} className="grid-12 gap-y-4 border-t border-line py-8" data-reveal>
                <div className="col-span-4 flex flex-wrap items-start gap-2 sm:col-span-2 lg:col-span-3 lg:flex-col">
                  <Label accent>
                    <span className="inline-flex items-center gap-2">
                      <span aria-hidden className="status-dot" />
                      {job.period}
                    </span>
                  </Label>
                  <span className="text-xs">
                    <Txt>{job.start}</Txt>
                  </span>
                </div>
                <div className="col-span-4 sm:col-span-6 lg:col-span-9">
                  <h3 className="text-2xl font-semibold tracking-[-0.025em]">{job.role}</h3>
                  <p className="mt-1 text-lg">{job.company}</p>
                  <p className="mt-2 text-muted">{job.companyNote}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 04 · Tech events */}
      <section id="events" aria-labelledby="events-title" className="section border-t border-line">
        <div className="container-x grid-12 gap-y-10">
          <div className="col-span-4 sm:col-span-8 lg:col-span-6" data-reveal>
            <Label index="04" className="mb-5">
              Tech events
            </Label>
            <h2 id="events-title" className="h2">
              Showing up to <Highlight>grow</Highlight>.
            </h2>
            <p className="measure mt-5 text-muted">
              I’m active in the tech community and love attending tech events and community meetups. A few I’ve joined:
            </p>
          </div>
          <ul className="col-span-4 self-end border-b border-line sm:col-span-8 lg:col-span-5 lg:col-start-8">
            {techEvents.map((e) => (
              <li key={e.title} className="flex gap-3 border-t border-line py-4" data-reveal>
                <span aria-hidden className="font-mono text-accent-text">+</span>
                <span>
                  <span className="block font-medium">{e.title}</span>
                  <span className="text-sm text-muted">{e.org}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 05 · Certifications */}
      <section id="certifications" aria-labelledby="certs-title" className="section border-t border-line">
        <div className="container-x">
          <SectionHeader id="certs-title" index="05" label="Certifications" title={<>Skills, <Highlight>certified</Highlight>.</>}>
            <p>Courses I’ve completed. Select a certificate to view it larger.</p>
          </SectionHeader>
          <CertificationRows certs={certifications} />
        </div>
      </section>
    </>
  );
}
