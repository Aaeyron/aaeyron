import type { Metadata } from "next";
import ContactButtons from "../components/ui/ContactButtons";
import { Highlight, SectionHeader } from "../components/ui/primitives";

export const metadata: Metadata = {
  title: "Contact",
  alternates: { canonical: "/contact" },
  description: "Get in touch with Aaron Seth Nagtalon about internships, mentorship and projects.",
};

// The rest of this page (location, phone, secondary socials) is built in Phase 4.
export default function Contact() {
  return (
    <div className="container-x section">
      <SectionHeader as="h1" index="01" label="Contact" title={<>Let’s <Highlight>talk</Highlight>.</>}>
        <p>
          Have a project, opportunity, or idea you want to discuss? Send me a message and tell me what you’re working on.
        </p>
      </SectionHeader>
      <ContactButtons />
    </div>
  );
}
