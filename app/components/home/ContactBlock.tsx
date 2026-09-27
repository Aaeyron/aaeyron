import { FileText } from "lucide-react";
import { profile } from "@/lib/content";
import ButtonLink from "../ui/ButtonLink";
import ContactButtons from "../ui/ContactButtons";
import { Highlight, Label, Txt } from "../ui/primitives";

export default function ContactBlock() {
  return (
    <section aria-labelledby="contact-title" className="section border-t border-line">
      <div className="container-x" data-reveal>
        <Label index="06" className="mb-5">
          Contact
        </Label>
        <h2 id="contact-title" className="display max-w-[16ch]">
          Let’s build something <Highlight>useful</Highlight> together.
        </h2>
        <p className="measure mt-6 text-lg text-muted">
          Have a project, opportunity, or idea you want to discuss? Send me a message and tell me what you’re working on.
        </p>
        <p className="mt-4 flex items-center gap-3 text-sm">
          <span aria-hidden className="status-dot" />
          <span>
            {profile.status}. <Txt>{profile.availability}</Txt>
          </span>
        </p>

        <ContactButtons className="mt-12" />

        <ButtonLink href={profile.resume} variant="ghost" download className="-ml-3 mt-6">
          <FileText size={17} aria-hidden /> Download résumé
        </ButtonLink>
      </div>
    </section>
  );
}
