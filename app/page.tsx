import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { certifications, projects, projectsSummary, selectedProjects } from "@/lib/content";
import Hero from "./components/home/Hero";
import CaseStudyCard from "./components/home/CaseStudyCard";
import SkillsEvidence from "./components/home/SkillsEvidence";
import AboutTeaser from "./components/home/AboutTeaser";
import ContactBlock from "./components/home/ContactBlock";
import SelectedProjectCard from "./components/projects/SelectedProjectCard";
import CertificationRows from "./components/certificates/CertificationRows";
import { Highlight, SectionHeader } from "./components/ui/primitives";

function MoreLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex min-h-11 items-center gap-1.5 font-medium transition-colors duration-200 hover:text-accent-text"
    >
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

          <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {selectedProjects.map((p, i) => (
              <li key={p.slug} className="flex" data-reveal>
                <SelectedProjectCard project={p} index={i} total={selectedProjects.length} />
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

      <section id="certifications" aria-labelledby="certs-title" className="section border-t border-line">
        <div className="container-x">
          <SectionHeader
            id="certs-title"
            index="04"
            label="Certifications"
            title={<>Skills, <Highlight>certified</Highlight>.</>}
            action={<MoreLink href="/experience#certifications">View all certificates</MoreLink>}
          >
            <p>Courses I’ve completed. Select a certificate to view it larger.</p>
          </SectionHeader>
          <CertificationRows certs={certifications} />
        </div>
      </section>

      <AboutTeaser />
      <ContactBlock />
    </>
  );
}
