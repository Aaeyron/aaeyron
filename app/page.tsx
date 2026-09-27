import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projects, projectsSummary, selectedProjects } from "@/lib/content";
import Hero from "./components/home/Hero";
import CaseStudyCard from "./components/home/CaseStudyCard";
import SkillsEvidence from "./components/home/SkillsEvidence";
import Changelog from "./components/home/Changelog";
import AboutTeaser from "./components/home/AboutTeaser";
import ContactBlock from "./components/home/ContactBlock";
import SelectedProjectCard from "./components/projects/SelectedProjectCard";
import CertificationCards from "./components/certificates/CertificationCards";
import { Highlight, SectionHeader } from "./components/ui/primitives";

const moreLink =
  "group inline-flex min-h-11 items-center gap-1.5 font-medium transition-colors duration-200 hover:text-accent-text";

function MoreLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className={moreLink}>
      {children}
      <ArrowRight size={16} aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5" />
    </Link>
  );
}

export default function Home() {
  return (
    <>
      <Hero />

      <section id="work" aria-labelledby="work-title" className="section border-t border-line">
        <div className="container-x">
          <SectionHeader
            id="work-title"
            index="01"
            label="Selected projects · 2026"
            title={<>What I’m <Highlight>building</Highlight> this year.</>}
            action={<MoreLink href="/projects">All projects</MoreLink>}
          >
            <p>This year’s highlights. All three are still in progress.</p>
          </SectionHeader>

          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {selectedProjects.map((p) => (
              <li key={p.slug} className="flex">
                <SelectedProjectCard project={p} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="school-projects" aria-labelledby="school-title" className="section border-t border-line">
        <div className="container-x">
          <SectionHeader
            id="school-title"
            index="02"
            label={`Earlier school projects · ${projectsSummary}`}
            title={<>Where I started, and <Highlight>how</Highlight> I built it.</>}
          >
            <p>
              All three are 3rd-year college projects I built to learn. Each is written as problem, constraints, decisions,
              and what I learned. Read the short version or the full story.
            </p>
          </SectionHeader>

          <div className="border-b border-line">
            {projects.map((project, i) => (
              <CaseStudyCard key={project.slug} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>

      <SkillsEvidence />

      <section aria-labelledby="growth-title" className="section border-t border-line">
        <div className="container-x">
          <SectionHeader
            id="growth-title"
            index="04"
            label="Growth"
            title={<>Growth, <Highlight>versioned</Highlight>.</>}
            action={<MoreLink href="/certificates">View all certificates</MoreLink>}
          >
            <p>Events and training logged like software releases, then the certifications I’ve earned.</p>
          </SectionHeader>

          <div aria-labelledby="events-title" role="region">
            <h3 id="events-title" className="h3 mb-2">
              Changelog: events & training
            </h3>
            <p className="mb-8 text-muted">Community events and training I’ve attended, newest first.</p>
            <Changelog headingLevel={4} />
          </div>

          <div aria-labelledby="certs-title" role="region" className="mt-16 sm:mt-20">
            <h3 id="certs-title" className="h3 mb-2">
              Certifications: skills earned
            </h3>
            <p className="mb-8 text-muted">Courses I completed. Select a certificate to view it larger.</p>
            <CertificationCards headingLevel={4} />
          </div>
        </div>
      </section>

      <AboutTeaser />
      <ContactBlock />
    </>
  );
}
