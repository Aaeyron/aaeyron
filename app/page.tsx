import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projects } from "@/lib/content";
import Hero from "./components/home/Hero";
import CaseStudyCard from "./components/home/CaseStudyCard";
import SkillsEvidence from "./components/home/SkillsEvidence";
import Changelog from "./components/home/Changelog";
import AboutTeaser from "./components/home/AboutTeaser";
import ContactBlock from "./components/home/ContactBlock";
import { Em, SectionHeader } from "./components/ui/primitives";

const moreLink =
  "group inline-flex min-h-11 items-center gap-1.5 font-medium transition-colors duration-200 hover:text-accent-text";

export default function Home() {
  return (
    <>
      <Hero />

      <section id="work" aria-labelledby="work-title" className="section border-t border-line">
        <div className="container-x">
          <SectionHeader
            id="work-title"
            index="01"
            label="Selected case studies"
            title={<>Three projects, and <Em>how</Em> I built them.</>}
            action={
              <Link href="/projects" className={moreLink}>
                All projects
                <ArrowRight size={16} aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            }
          >
            <p>Each one is written as problem, constraints, decisions and result. Read the short version or the full story.</p>
          </SectionHeader>

          <div className="border-b border-line">
            {projects.map((project, i) => (
              <CaseStudyCard key={project.slug} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>

      <SkillsEvidence />

      <section aria-labelledby="changelog-title" className="section border-t border-line">
        <div className="container-x">
          <SectionHeader
            id="changelog-title"
            index="03"
            label="Changelog"
            title={<>Growth, <Em>versioned</Em>.</>}
            action={
              <Link href="/certificates" className={moreLink}>
                Certificates
                <ArrowRight size={16} aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            }
          >
            <p>Events, training and certificates, logged like software releases.</p>
          </SectionHeader>
          <Changelog />
        </div>
      </section>

      <AboutTeaser />
      <ContactBlock />
    </>
  );
}
