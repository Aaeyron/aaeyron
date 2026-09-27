import type { Metadata } from "next";
import { SectionHeader } from "../components/ui/primitives";

export const metadata: Metadata = {
  title: "About",
  description: "About Aaron Seth Nagtalon, an IT student and aspiring full-stack developer in Davao City.",
};

// Phase 4 builds this page out.
export default function About() {
  return (
    <div className="container-x section">
      <SectionHeader as="h1" label="About" title="A developer in progress." />
    </div>
  );
}
