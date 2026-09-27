import { FileText } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { profile, socials } from "@/lib/content";
import ButtonLink from "../ui/ButtonLink";
import CopyEmailButton from "../ui/CopyEmailButton";
import { Highlight, Txt } from "../ui/primitives";

const icons: Record<string, typeof FaGithub> = { GitHub: FaGithub, LinkedIn: FaLinkedinIn };

export default function ContactBlock() {
  return (
    <section aria-labelledby="contact-title" className="section border-t border-line">
      <div className="container-x" data-reveal>
        <p className="label mb-4 flex gap-3">
          <span className="text-accent-text">06</span>
          <span>Contact</span>
        </p>
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

        <div className="mt-10 flex flex-wrap gap-3">
          <CopyEmailButton />
          {socials
            .filter((s) => s.primary)
            .map((s) => {
              const Icon = icons[s.label];
              return (
                <ButtonLink key={s.label} href={s.href} variant="secondary" external>
                  {Icon && <Icon aria-hidden size={16} />} {s.label}
                </ButtonLink>
              );
            })}
          <ButtonLink href={profile.resume} variant="ghost" download>
            <FileText size={17} aria-hidden /> Résumé
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
