import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, CalendarDays, Layers, Sparkles, type LucideIcon } from "lucide-react";
import {
  aboutMe,
  certifications,
  currentWork,
  earlySolo,
  experience,
  profile,
  profileCapabilities,
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

/** Icon per Profile capability area: a stack for architecture, sparks for generative AI. */
const profileIcons: Record<(typeof profileCapabilities)[number]["id"], LucideIcon> = {
  architecture: Layers,
  genai: Sparkles,
};

/** Black/white link for the "Currently working on" cards: only the arrow moves on hover. */
const cardLinkCls = "group/link inline-flex min-h-11 items-center gap-1.5 font-medium text-ink";
const arrowRight = "transition-transform duration-200 group-hover/link:translate-x-0.5";
const arrowUpRight = "transition-transform duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5";

export default function Experience() {
  const started = hasInternshipStarted();
  // Capstone first, then the other current projects.
  const current = [currentWork.featured.slug, ...currentWork.also]
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
              <p aria-hidden className="mt-3 font-mono text-[0.7rem] text-muted">
                <span>aaeyron</span>
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

            {/* Profile: two capability areas side by side (stacked on phones), split by a hairline.
                Details: corner marks, a faint diagonal hairline texture fading in from the top-right,
                an accent tick on the left border, a "Profile" caption with a hairline rule, and an
                icon box per area that inverts to ink on hover. */}
            <div className="relative mt-8">
              <CornerMarks />
              <div className="relative overflow-hidden border border-line bg-bg p-6">
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(135deg,var(--lines)_0_1px,transparent_1px_9px)] [mask-image:linear-gradient(225deg,#000,transparent_60%)]"
                />
                <span aria-hidden className="absolute -left-px top-6 h-5 w-0.5 bg-accent" />
                <div className="relative mb-6 flex items-center gap-3">
                  <span className="font-mono text-[0.7rem] uppercase tracking-[0.08em] text-muted">Profile</span>
                  <span aria-hidden className="h-px flex-1 bg-line" />
                  <span aria-hidden className="font-mono text-[0.7rem] text-muted">
                    {pad(profileCapabilities.length)}
                  </span>
                </div>
                <ul className="relative grid sm:grid-cols-2">
                  {profileCapabilities.map((c, i) => {
                    const Icon = profileIcons[c.id];
                    return (
                      <li
                        key={c.id}
                        className={`group/cap ${
                          i === 0 ? "pb-6 sm:pb-0 sm:pr-6" : "border-t border-line-strong pt-6 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            aria-hidden
                            className="field-label grid size-9 shrink-0 place-items-center border bg-bg text-ink transition-colors duration-200 group-hover/cap:bg-ink group-hover/cap:text-bg"
                          >
                            <Icon size={17} aria-hidden />
                          </span>
                          <span aria-hidden className="font-mono text-[0.7rem] text-muted">
                            {pad(i + 1)}
                          </span>
                        </div>
                        <h3 className="mt-4 text-lg font-semibold leading-snug tracking-[-0.015em] text-ink">{c.title}</h3>
                        <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{c.detail}</p>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 02 · Currently working on */}
      <section id="current" aria-labelledby="current-title" className="section border-t border-line">
        <div className="container-x">
          <SectionHeader rule id="current-title" index="02" label="Currently working on" title={<>What I’m <Highlight>building</Highlight> now.</>} />

          {/* All three projects in one row on desktop (capstone first), stacked below 1024px.
              Black/white cards: index tab on the top border, corner marks, a dot-grid accent in the
              top-right, and a short ink rule that grows on hover while the border darkens to ink. */}
          <ul className="grid gap-8 lg:grid-cols-3">
            {current.map((p, i) => (
              <li key={p.slug} className="flex" data-reveal>
                <article className="group relative flex w-full flex-col border border-line bg-bg p-6 transition-colors duration-200 hover:border-ink focus-within:border-ink">
                  <CornerMarks />
                  <span
                    aria-hidden
                    className="chip absolute -top-2.5 left-4 z-10 py-0 text-[0.65rem] transition-colors duration-200 group-hover:border-ink group-hover:text-ink"
                  >
                    {pad(i + 1)} / {pad(current.length)}
                  </span>
                  <span
                    aria-hidden
                    className="pointer-events-none absolute right-4 top-4 size-12 bg-[radial-gradient(circle,currentColor_0.75px,transparent_1.25px)] bg-[length:6px_6px] text-line-strong [mask-image:linear-gradient(225deg,#000,transparent_75%)]"
                  />

                  <div className="flex flex-wrap gap-1.5 pr-14">
                    {p.badges.map((b) => (
                      <Label key={b}>{b}</Label>
                    ))}
                  </div>
                  <span
                    aria-hidden
                    className="draw-x mt-6 block h-px w-8 bg-ink transition-[width] duration-300 group-hover:w-16"
                  />
                  <h3 className="mt-5 text-2xl font-semibold leading-tight tracking-[-0.02em]">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted">{p.category}</p>
                  <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink">{p.description}</p>

                  <div className="mt-auto pt-6">
                    <div className="flex flex-wrap gap-x-6 border-t border-line pt-3">
                      {p.repo ? (
                        <a href={p.repo} target="_blank" rel="noopener noreferrer" className={cardLinkCls}>
                          View on GitHub <span className="sr-only">: {p.title}</span>
                          <ArrowUpRight size={16} aria-hidden className={arrowUpRight} />
                        </a>
                      ) : (
                        // Same wording as the Projects page; also keeps every card's footer the same height.
                        <span className="inline-flex min-h-11 items-center">
                          <Label>Repository coming soon</Label>
                        </span>
                      )}
                      <Link href={`/projects#${p.slug}`} className={cardLinkCls}>
                        See it on Projects <span className="sr-only">: {p.title}</span>
                        <ArrowRight size={16} aria-hidden className={arrowRight} />
                      </Link>
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 03 · Internship */}
      <section id="internship" aria-labelledby="internship-title" className="section border-t border-line">
        <div className="container-x">
          <SectionHeader rule id="internship-title" index="03" label="Internship" title={<><InternshipText field="headingLead" serverStarted={started} /> <Highlight>working</Highlight>.</>} />

          {/* Internship card, in the same language as the Tech events / current-project cards: index
              tab on the top border, corner marks, a faint diagonal texture fading in from the
              top-right, an accent tick on the left border, and an ink rule that grows on hover
              while the border darkens to ink. Fields sit in a divided grid. Black/white only. */}
          <ol className="grid gap-8">
            {experience.map((job, i) => (
              <li key={job.company} data-reveal>
                <article className="group relative border border-line bg-bg p-6 transition-colors duration-200 hover:border-ink sm:p-8">
                  <CornerMarks />
                  <span
                    aria-hidden
                    className="chip absolute -top-2.5 left-4 z-10 py-0 text-[0.65rem] transition-colors duration-200 group-hover:border-ink group-hover:text-ink"
                  >
                    {pad(i + 1)} / {pad(experience.length)}
                  </span>
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(135deg,var(--lines)_0_1px,transparent_1px_9px)] [mask-image:linear-gradient(225deg,#000,transparent_45%)]"
                  />
                  <span aria-hidden className="absolute -left-px top-6 h-5 w-0.5 bg-accent sm:top-8" />

                  {/* Header: caption + hairline rule, date badge on the right. */}
                  <div className="relative flex flex-wrap items-center gap-x-3 gap-y-3">
                    <span className="font-mono text-[0.7rem] uppercase tracking-[0.08em] text-muted">Position</span>
                    <span aria-hidden className="hidden h-px min-w-8 flex-1 bg-line sm:block" />
                    <InternshipBadge
                      serverStarted={started}
                      mono
                      icon={<CalendarDays size={13} aria-hidden className="text-muted" />}
                    />
                  </div>

                  <h3 className="relative mt-6 text-2xl font-semibold leading-tight tracking-[-0.025em] sm:text-3xl">
                    {job.role}
                  </h3>
                  <p className="relative mt-1 text-lg font-semibold text-ink">{job.company}</p>
                  <span
                    aria-hidden
                    className="draw-x relative mt-5 block h-px w-8 bg-ink transition-[width] duration-300 group-hover:w-16"
                  />

                  {/* Fields: Type / Start / Company in three divided cells, About full width below. */}
                  <dl className="relative mt-6 grid border border-line sm:grid-cols-3">
                    {[
                      { k: "Type", v: job.type },
                      { k: "Start", v: <time dateTime={job.start.iso}>{job.start.label}</time> },
                      { k: "Company", v: job.company },
                    ].map((f, n) => (
                      <div
                        key={f.k}
                        className={`bg-bg p-4 ${n > 0 ? "border-t border-line sm:border-l sm:border-t-0" : ""}`}
                      >
                        <dt className="font-mono text-[0.7rem] uppercase tracking-[0.08em] text-muted">{f.k}</dt>
                        <dd className="mt-1.5 text-sm font-medium text-ink">{f.v}</dd>
                      </div>
                    ))}
                    <div className="border-t border-line bg-bg p-4 sm:col-span-3">
                      <dt className="font-mono text-[0.7rem] uppercase tracking-[0.08em] text-muted">About</dt>
                      <dd className="mt-1.5 text-sm text-ink">{job.companyNote}</dd>
                    </div>
                  </dl>
                </article>
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
        <div className="container-x">
          <div className="mb-10 sm:mb-14" data-reveal>
            <LabelRule index="05" className="mb-5 max-w-md">
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

          {/* 2×2 grid of equal event cards (stacked on phones), styled like the "Currently working
              on" cards: index tab on the top border, corner marks, a faint diagonal texture fading
              in from the top-right, an accent tick on the left border, and a short ink rule that
              grows on hover while the border darkens to ink. */}
          <ul className="grid gap-8 sm:grid-cols-2">
            {techEvents.map((e, i) => (
              <li key={e.title} className="flex" data-reveal>
                <article className="group relative flex w-full flex-col border border-line bg-bg p-6 transition-colors duration-200 hover:border-ink">
                  <CornerMarks />
                  <span
                    aria-hidden
                    className="chip absolute -top-2.5 left-4 z-10 py-0 text-[0.65rem] transition-colors duration-200 group-hover:border-ink group-hover:text-ink"
                  >
                    {pad(i + 1)} / {pad(techEvents.length)}
                  </span>
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(135deg,var(--lines)_0_1px,transparent_1px_9px)] [mask-image:linear-gradient(225deg,#000,transparent_55%)]"
                  />
                  <span aria-hidden className="absolute -left-px top-6 h-5 w-0.5 bg-accent" />

                  <span className="relative font-mono text-[0.7rem] uppercase tracking-[0.08em] text-muted">Event</span>
                  <span
                    aria-hidden
                    className="draw-x relative mt-4 block h-px w-8 bg-ink transition-[width] duration-300 group-hover:w-16"
                  />
                  <h3 className="relative mt-4 text-xl font-semibold leading-snug tracking-[-0.02em] text-ink">{e.title}</h3>
                  <p className="relative mt-auto pt-3 font-mono text-xs text-muted">{e.org}</p>
                </article>
              </li>
            ))}
          </ul>
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
