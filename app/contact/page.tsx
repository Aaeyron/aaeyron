import type { Metadata } from "next";
import ContactForm from "../components/contact/ContactForm";
import WhatsAppCard from "../components/contact/WhatsAppCard";
import ContactButtons from "../components/ui/ContactButtons";
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
      {/* 02: form + WhatsApp side by side from 1024px, stacked below. */}
      <section aria-label="Send a message">
        <div data-reveal>
          <Label index="02" className="mb-5">
            Send a message
          </Label>
        </div>
        <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
          <ContactForm />
          <WhatsAppCard />
        </div>
      </section>
      <section aria-labelledby="reach-directly" className="mt-[var(--space-section)]">
        <div data-reveal>
          <Label index="03" className="mb-5">
            <span id="reach-directly">Or reach me directly</span>
          </Label>
        </div>
        {/* Same buttons as the home page contact section; each reveals on its own. */}
        <ContactButtons className="mt-8" />
      </section>
    </div>
  );
}
