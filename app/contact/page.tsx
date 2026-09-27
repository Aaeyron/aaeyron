import type { Metadata } from "next";
import { SectionHeader } from "../components/ui/primitives";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Aaron Seth Nagtalon about internships, mentorship and projects.",
};

// Phase 4 builds this page out.
export default function Contact() {
  return (
    <div className="container-x section">
      <SectionHeader as="h1" label="Contact" title="Let’s talk." />
    </div>
  );
}
