import type { Metadata } from "next";
import ContactForm from "../components/contact/ContactForm";
import { ContactButtonsRow } from "../components/ui/ContactButtons";
import { Highlight, Label, SectionHeader } from "../components/ui/primitives";

export const metadata: Metadata = {
  title: "Contact",
  alternates: { canonical: "/contact" },
  description: "Get in touch with Aaron Seth Nagtalon about opportunities, collaborations and projects.",
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
      <ContactForm />
      <section aria-labelledby="reach-directly" className="contact-links mt-[var(--space-section)]">
        <div data-reveal className="mb-5">
          <Label>
            <span id="reach-directly">Or reach me directly</span>
          </Label>
        </div>
        <ContactButtonsRow />
      </section>
    </div>
  );
}
