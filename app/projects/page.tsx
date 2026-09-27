import type { Metadata } from "next";
import { selectedProjects } from "@/lib/content";
import SelectedProjectCard from "../components/projects/SelectedProjectCard";
import { Highlight, SectionHeader } from "../components/ui/primitives";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Projects Aaron Seth Nagtalon is building in 2026: MG Sakura Learning Platform, TactileLens (capstone) and JM Learning Hub. All are in progress.",
};

export default function Projects() {
  return (
    <div className="container-x section">
      <SectionHeader
        as="h1"
        index="01"
        label="Selected projects · 2026"
        title={<>What I’m <Highlight>building</Highlight> this year.</>}
      >
        <p>Three projects I’m working on now. All are still in progress.</p>
      </SectionHeader>

      <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {selectedProjects.map((p, i) => (
          <li key={p.slug} className="flex" data-reveal>
            <SelectedProjectCard project={p} index={i} total={selectedProjects.length} />
          </li>
        ))}
      </ul>
    </div>
  );
}
