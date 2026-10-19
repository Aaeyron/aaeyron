import { ArrowUpRight, MessageCircle } from "lucide-react";
import { profile } from "@/lib/content";
import { CornerMarks, Panel } from "../ui/primitives";

/** "Chat with me directly": WhatsApp quick contact, styled like the form's fields. */
export default function WhatsAppCard() {
  return (
    <div data-reveal className="min-w-0">
      <Panel className="contact-form p-5 sm:p-7">
        <h2 className="h3">Chat with me directly</h2>
        <p className="mt-2 text-muted">Prefer a quick chat? Send me a message on WhatsApp.</p>

        {/* Same corner marks and border as the form fields. */}
        <div className="field-frame mt-7">
          <CornerMarks inset="-4px" />
          <a
            href={profile.whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Message me on WhatsApp at ${profile.whatsapp.display} (opens in a new tab)`}
            className="group flex min-h-12 w-full cursor-pointer items-center gap-3 border border-[var(--field-line)] bg-bg px-3 py-2.5 text-ink transition-[border-color] duration-200 hover:border-accent focus-visible:border-accent"
          >
            <MessageCircle size={20} aria-hidden className="shrink-0" />
            <span className="min-w-0 flex-1">
              <span className="block font-semibold leading-tight">Message me on WhatsApp</span>
              <span className="mt-1 block font-mono text-xs text-muted">{profile.whatsapp.display}</span>
            </span>
            <ArrowUpRight
              size={18}
              aria-hidden
              className="shrink-0 text-muted transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </div>

        <p className="mt-4 text-ink">
          Good for quick questions, project ideas, and internship or collaboration talks. If I miss your message, I will
          reply as soon as I can.
        </p>
      </Panel>
    </div>
  );
}
