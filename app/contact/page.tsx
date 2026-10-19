import type { Metadata } from "next";
import ContactForm from "../components/contact/ContactForm";
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
      <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div className="min-w-0">
          <div data-reveal className="mb-8">
            <Label className="mb-4">Reach me directly</Label>
            <p className="text-muted">
              Email me, or find me on GitHub and LinkedIn. You can also use the form and I will reply to your email.
            </p>
          </div>
          <ContactButtons stacked />
        </div>
        <ContactForm />
      </div>
    </div>
  );
}
