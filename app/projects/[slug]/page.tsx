import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/lib/content";
import { SectionHeader } from "../../components/ui/primitives";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  return project ? { title: project.title, description: project.tagline } : {};
}

// Phase 3 builds the full case study.
export default async function CaseStudy({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  return (
    <div className="container-x section">
      <SectionHeader as="h1" label="Case study" title={project.title}>
        <p>{project.tagline}</p>
      </SectionHeader>
    </div>
  );
}
