import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import {
  aboutMe,
  certifications,
  currentWork,
  earlySolo,
  experience,
  profile,
  projects,
  selectedProjects,
  techEvents,
} from "@/lib/content";
import { hasInternshipStarted, internshipCopy } from "@/lib/internship";
import CertificationRows from "../components/certificates/CertificationRows";
import ProjectLinks from "../components/projects/ProjectLinks";
import InternshipText, { InternshipBadge } from "../components/ui/InternshipText";
import {
  CornerMarks,
  Emphasis,
  Highlight,
  Label,
  LabelRule,
  Panel,
  SectionHeader,
  Tag,
} from "../components/ui/primitives";

// Re-render hourly so the internship "incoming" → "currently" switch also reaches the HTML and meta tags.
export const revalidate = 3600;

export function generateMetadata(): Metadata {
  const internship = internshipCopy(hasInternshipStarted()).meta;
  return {
    title: "Experience",
    alternates: { canonical: "/experience" },
    description: `About Aaron Seth Nagtalon: the TactileLens capstone and current projects, ${internship}, early solo school projects, tech community events, and certifications.`,
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

const linkCls =
  "group/link inline-flex min-h-11 items-center gap-1.5 font-medium transition-colors duration-200 hover:text-accent-text";
const arrowRight = "transition-transform duration-200 group-hover/link:translate-x-0.5";
const arrowUpRight = "transition-transform duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5";

/** Small key/value metadata row in mono. */
function Meta({ k, children }: { k: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
      <dt className="w-20 shrink-0 font-mono text-[0.7rem] uppercase tracking-wider text-muted">{k}</dt>
      <dd className="text-sm">{children}</dd>
    </div>
  );
}

export default function Experience() {
  const started = hasInternshipStarted();
  const featured = selectedProjects.find((p) => p.slug === currentWork.featured.slug);
  const also = currentWork.also
    .map((slug) => selectedProjects.find((p) => p.slug === slug))
    .filter((p) => p !== undefined);

  return (
    <>
      <div className="container-x pt-14 sm:pt-24">
        <SectionHeader
          as="h1"
          rule
          label="Experience"
          title={<>What I’m working on, and <Highlight>where I learn</Highlight>.</>}
        >
          <p>
            About me, my current projects, my internship, where I started, the tech community, and certifications, all in
            one place.
          </p>
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
                  src={profile.photo}
                  alt={profile.name}
                  fill
                  priority
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover object-[50%_35%]"
                />
              </div>
              <p aria-hidden className="mt-3 flex justify-between font-mono text-[0.7rem] text-muted">
                <span>fig. 01</span>
                <span>{profile.locationShort}</span>
              </p>
            </div>
          </div>

          <div className="col-span-4 sm:col-span-8 lg:col-span-7 lg:col-start-6" data-reveal>
            <LabelRule index="01" className="mb-5">
              About me
            </LabelRule>
            <h2 id="about-title" className="h2">
              {aboutMe.heading}
            </h2>
            <div className="measure mt-6 space-y-4 text-muted">
              {aboutMe.paragraphs.map((p, i) => (
                <p key={i} className={i === 0 ? "text-lg text-ink" : undefined}>
                  {p}
                </p>
              ))}
            </div>

            <Panel className="mt-8 max-w-md p-5">
              <dl className="space-y-2.5">
                <Meta k="Role">{profile.role}</Meta>                <Meta k="Based in">{profile.location}</Meta>
                <Meta k="Status">
                  <span className="inline-flex items-center gap-2">
                    <span aria-hidden className="status-dot" />
                    {profile.status}
                  </span>
                </Meta>
              </dl>
            </Panel>
          </div>
        </div>
      </section>

      {/* 02 · Currently working on */}
      <section id="current" aria-labelledby="current-title" className="section border-t border-line">
        <div className="container-x">
          <SectionHeader rule id="current-title" index="02" label="Currently working on" title={<>What I’m <Highlight>building</Highlight> now.</>} />

          {featured && (
            <div data-reveal>
              <Panel index="01" hover className="p-6 sm:p-8">
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
                <span aria-hidden className="draw-x mt-6 block h-px w-8 bg-accent" />
                <h3 className="mt-5 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">{featured.title}</h3>
                <p className="measure mt-4 text-lg">
                  {currentWork.featured.lead}{" "}
                  <span className="text-muted">
                    <Emphasis
                      text={currentWork.featured.description}
                      phrase="digital text, UEB, and Nemeth Braille"
                    />
                  </span>
                </p>
                <div className="mt-6 flex flex-wrap gap-x-6 border-t border-line pt-3">
                  {featured.repo && (
                    <a href={featured.repo} target="_blank" rel="noopener noreferrer" className={linkCls}>
                      View on GitHub <span className="sr-only">: {featured.title}</span>
                      <ArrowUpRight size={16} aria-hidden className={arrowUpRight} />
                    </a>
                  )}
                  <Link href={`/projects#${featured.slug}`} className={linkCls}>
                    See it on Projects
                    <ArrowRight size={16} aria-hidden className={arrowRight} />
                  </Link>
                </div>
              </Panel>
            </div>
          )}

          <ul className="mt-10 grid gap-8 sm:grid-cols-2">
            {also.map((p, i) => (
              <li key={p.slug} className="flex" data-reveal>
                <Panel index={pad(i + 2)} hover className="flex w-full">
                  <Link href={`/projects#${p.slug}`} className="flex w-full flex-col p-5 sm:p-6">
                    <span className="flex flex-wrap gap-1.5">
                      {p.badges.map((b) => (
                        <Tag key={b} accent>
                          {b}
                        </Tag>
                      ))}
                    </span>
                    <span className="mt-4 text-xl font-semibold tracking-[-0.02em] transition-colors duration-200 group-hover:text-accent-text">
                      {p.title}
                    </span>
                    <span className="mt-2 block text-sm text-muted">{p.category}</span>
                    <span className="mt-auto block pt-5">
                      <span className="flex items-center justify-between gap-4 border-t border-line pt-3 text-sm font-medium">
                        View on Projects
                        <ArrowRight
                          size={15}
                          aria-hidden
                          className="transition-transform duration-200 group-hover:translate-x-1"
                        />
                      </span>
                    </span>
                  </Link>
                </Panel>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 03 · Internship */}
      <section id="internship" aria-labelledby="internship-title" className="section border-t border-line">
        <div className="container-x">
          <SectionHeader rule id="internship-title" index="03" label="Internship" title={<><InternshipText field="headingLead" serverStarted={started} /> <Highlight>working</Highlight>.</>} />

          <ol className="grid gap-8">
            {experience.map((job, i) => (
              <li key={job.company} data-reveal>
                <Panel index={pad(i + 1)} className="p-5 sm:p-8">
                  <div className="flex gap-5 sm:gap-8">
                    {/* Timeline: vertical line with an accent dot. */}
                    <div aria-hidden className="relative w-3 shrink-0">
                      <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-line-strong" />
                      <span className="absolute left-1/2 top-1.5 size-3 -translate-x-1/2 border-2 border-bg bg-accent outline outline-1 outline-accent" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <InternshipBadge serverStarted={started} />
                      </div>
                      <h3 className="mt-5 text-2xl font-semibold tracking-[-0.025em] sm:text-3xl">{job.role}</h3>
                      <p className="mt-1 text-lg">
                        <span className="font-semibold text-accent-text">{job.company}</span>
                      </p>
                      <dl className="mt-5 space-y-2.5 border-t border-line pt-4">
                        <Meta k="Type">Internship</Meta>
                        <Meta k="Start">
                          <time dateTime="2026-10-01">October 1, 2026</time>
                        </Meta>
                        <Meta k="Company">{job.company}</Meta>
                        <Meta k="About">{job.companyNote}</Meta>
                      </dl>
                    </div>
                  </div>
                </Panel>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 04 · Early solo projects */}
      <section id="early-projects" aria-labelledby="early-title" className="section border-t border-line">
        <div className="container-x">
          <SectionHeader
            rule
            id="early-title"
            index="04"
            label="Early solo projects"
            title={<>Where I <Highlight>started</Highlight>.</>}
          >
            <p>
              <Emphasis text={earlySolo.intro} phrase={earlySolo.introEmphasis} bold />
            </p>
            <p className="mt-3">{earlySolo.note}</p>
          </SectionHeader>

          <ol className="grid gap-8">
            {projects.map((p, i) => (
              <li key={p.slug} data-reveal>
                <Panel index={pad(i + 1)} hover className="p-5 sm:p-8">
                  <article aria-labelledby={`early-${p.slug}`} className="grid-12 gap-y-6">
                    {/* Same screenshot as the home page's "Earlier school projects" (p.image). */}
                    <div className="col-span-4 sm:col-span-8 lg:col-span-5">
                      <div className="relative">
                        <CornerMarks />
                        <div className="relative aspect-[16/10] overflow-hidden border border-line bg-surface">
                          <Image
                            src={p.image.src}
                            alt={`${p.title} screenshot`}
                            fill
                            sizes="(min-width: 1280px) 460px, (min-width: 1024px) 38vw, calc(100vw - 4.5rem)"
                            className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
                          />
                        </div>
                      </div>
                      <div className="mt-4 flex flex-wrap items-center gap-2">
                        <Label accent>{earlySolo.marker}</Label>
                        <span className="font-mono text-xs text-muted">{p.context}</span>
                      </div>
                    </div>

                    <div className="col-span-4 sm:col-span-8 lg:col-span-7 lg:pl-4">
                      <ul className="flex flex-wrap gap-1.5" aria-label="About this project">
                        {earlySolo.labels.map((l) => (
                          <li key={l}>
                            <Label>{l}</Label>
                          </li>
                        ))}
                      </ul>
                      <h3
                        id={`early-${p.slug}`}
                        className="mt-4 text-2xl font-semibold tracking-[-0.025em] transition-colors duration-200 group-hover:text-accent-text sm:text-[1.75rem]"
                      >
                        {p.title}
                      </h3>
                      <p className="measure mt-3 text-muted">{p.tagline}</p>
                      <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Tech stack">
                        {p.stack.map((s) => (
                          <li key={s}>
                            <Tag>{s}</Tag>
                          </li>
                        ))}
                      </ul>
                      <ProjectLinks project={p} className="mt-6" />
                    </div>
                  </article>
                </Panel>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 05 · Tech events */}
      <section id="events" aria-labelledby="events-title" className="section border-t border-line">
        <div className="container-x grid-12 gap-y-10">
          <div className="col-span-4 sm:col-span-8 lg:col-span-6" data-reveal>
            <LabelRule index="05" className="mb-5">
              Tech events
            </LabelRule>
            <h2 id="events-title" className="h2">
              Showing up to <Highlight>grow</Highlight>.
            </h2>
            <p className="measure mt-5 text-muted">
              I’m active in the tech community and{" "}
              <span className="font-medium text-accent-text">love attending tech events and community meetups</span>. A
              few I’ve joined:
            </p>
          </div>

          <div className="col-span-4 self-end sm:col-span-8 lg:col-span-5 lg:col-start-8" data-reveal>
            <Panel className="px-5 sm:px-6">
              <ul>
                {techEvents.map((e, i) => (
                  <li key={e.title} className="flex items-start gap-4 border-t border-line py-4 first:border-t-0">
                    <span aria-hidden className="pt-1 font-mono text-xs text-muted">
                      {pad(i + 1)}
                    </span>
                    <span aria-hidden className="mt-2.5 size-1.5 shrink-0 bg-accent" />
                    <span className="min-w-0">
                      <span className="block font-medium">{e.title}</span>
                      <span className="font-mono text-xs text-muted">{e.org}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </Panel>
          </div>
        </div>
      </section>

      {/* 06 · Certifications */}
      <section id="certifications" aria-labelledby="certs-title" className="section border-t border-line">
        <div className="container-x">
          <SectionHeader rule id="certs-title" index="06" label="Certifications" title={<>Skills, <Highlight>certified</Highlight>.</>}>
            <p>
              Courses I’ve completed. <span className="font-medium text-ink">Select a certificate</span> to view it larger.
            </p>
          </SectionHeader>
          <CertificationRows certs={certifications} boxed />
        </div>
      </section>
    </>
  );
}
