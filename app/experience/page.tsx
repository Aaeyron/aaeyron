import type { Metadata } from "next";
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
import { CertificateList } from "../components/certificates/CertificateCard";
import SchoolProjectCard from "../components/projects/SchoolProjectCard";
import PhotoFrame from "../components/ui/PhotoFrame";
import InternshipText, { InternshipBadge } from "../components/ui/InternshipText";
import {
  CornerMarks,
  Emphasis,
  Highlight,
  Label,
  LabelRule,
  PlusMarks,
  SectionHeader,
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
            <PhotoFrame
              src={profile.photo}
              alt={profile.name}
              priority
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              label="aaeyron"
              fig="Fig. 03"
            />
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
                Static (not clickable), so nothing reacts on hover. Details: card shadow, a cut
                top-left corner, a fine crosshatch texture fading in from the top-right, an accent tick
                on the left border, a "Profile" caption with a hairline rule, and an icon box per area. */}
            <div className="relative mt-8">
              <div className="card relative border border-line bg-bg p-6">
                <span aria-hidden className="notch" />
                <span aria-hidden className="tex tex-cross fade-tr" />
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
                        className={`${
                          i === 0 ? "pb-6 sm:pb-0 sm:pr-6" : "border-t border-line-strong pt-6 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            aria-hidden
                            className="field-label grid size-9 shrink-0 place-items-center border bg-bg text-ink"
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
              Black/white cards: index tab on the top border, plus marks, a dot-grid accent in the
              top-right, and a short ink rule. The cards themselves are static; only the links inside
              react on hover (arrow nudge). */}
          <ul className="grid gap-8 lg:grid-cols-3">
            {current.map((p, i) => (
              <li key={p.slug} className="flex" data-reveal>
                <article className="card relative flex w-full flex-col border border-line bg-bg p-6">
                  <PlusMarks />
                  <span
                    aria-hidden
                    className="chip absolute -top-2.5 left-4 z-10 py-0 text-[0.65rem]"
                  >
                    <span className="text-accent-text">{pad(i + 1)}</span> / {pad(current.length)}
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
                    className="draw-x mt-6 block h-px w-8 bg-ink"
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

          {/* Internship card, in the same language as the Tech events / current-project cards (static,
              not clickable): card shadow, index tab on the top border (accent number), corner
              brackets, an accent tick on the left border and a short ink rule. Fields sit in a
              divided grid. */}
          <ol className="grid gap-8">
            {experience.map((job, i) => (
              <li key={job.company} data-reveal>
                <article className="card relative border border-line bg-bg p-6 sm:p-8">
                  <CornerMarks />
                  <span
                    aria-hidden
                    className="chip absolute -top-2.5 left-4 z-10 py-0 text-[0.65rem]"
                  >
                    <span className="text-accent-text">{pad(i + 1)}</span> / {pad(experience.length)}
                  </span>
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
                    className="draw-x relative mt-5 block h-px w-8 bg-ink"
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

          {/* Same shared card as the home page's "Where I started": one card per row, image +
              details side by side from 1024px. Keeps this page's tagline and "first solo build"
              marker. */}
          <ol className="grid gap-8">
            {projects.map((p, i) => (
              <li key={p.slug} className="flex" data-reveal>
                <SchoolProjectCard
                  project={p}
                  index={i}
                  total={projects.length}
                  description={p.tagline}
                  extraLabel={earlySolo.marker}
                  titleId={`early-${p.slug}`}
                />
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

          {/* 2×2 grid of equal event cards (stacked on phones), static (not clickable): card shadow,
              a cut top-left corner, index tab on the top border (accent number), an accent tick on
              the left border, and a short ink rule. */}
          <ul className="grid gap-8 sm:grid-cols-2">
            {techEvents.map((e, i) => (
              <li key={e.title} className="flex" data-reveal>
                <article className="card relative flex w-full flex-col border border-line bg-bg p-6">
                  <span aria-hidden className="notch" />
                  <span
                    aria-hidden
                    className="chip absolute -top-2.5 left-6 z-10 py-0 text-[0.65rem]"
                  >
                    <span className="text-accent-text">{pad(i + 1)}</span> / {pad(techEvents.length)}
                  </span>
                  <span aria-hidden className="absolute -left-px top-6 h-5 w-0.5 bg-accent" />

                  <span className="relative font-mono text-[0.7rem] uppercase tracking-[0.08em] text-muted">Event</span>
                  <span
                    aria-hidden
                    className="draw-x relative mt-4 block h-px w-8 bg-ink"
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
              Courses I’ve completed.
            </p>
          </SectionHeader>
          <CertificateList certs={certifications} />
        </div>
      </section>
    </>
  );
}
