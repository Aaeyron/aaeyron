import type { Metadata } from "next";
import { SectionHeader } from "../components/ui/primitives";

export const metadata: Metadata = {
  title: "Projects",
  description: "Case studies of three 3rd-year college projects by Aaron Seth Nagtalon, built to learn full-stack development and UI/UX.",
};

// Phase 3 builds this page out.
export default function Projects() {
  return (
    <div className="container-x section">
      <SectionHeader as="h1" label="Projects" title="Selected work." />
    </div>
  );
}
