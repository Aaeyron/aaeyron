import type { ComponentType } from "react";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { profile, socialLinks, type SocialLink } from "@/lib/content";
import { CornerMarks, Label } from "../ui/primitives";

const icons: Record<SocialLink["id"], ComponentType<{ size?: number; "aria-hidden"?: boolean; className?: string }>> = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
  tiktok: FaTiktok,
  x: FaXTwitter,
};

const firstName = profile.shortName.split(" ")[0];

/**
 * Icon-only social links in square boxes with corner marks. Icons use
 * currentColor, so they follow the theme (dark on light, light on dark);
 * hover/focus fills the box with the accent colour.
 */
export default function SocialIcons({ className = "" }: { className?: string }) {
  return (
    <div className={className} data-reveal>
      <Label index="//">Socials</Label>
      <ul className="mt-4 flex flex-wrap gap-3">
        {socialLinks.map((s) => {
          const Icon = icons[s.id];
          return (
            <li key={s.id}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${firstName} on ${s.label} (opens in a new tab)`}
                className="group relative grid size-11 place-items-center border border-line bg-bg text-ink transition-[background-color,border-color,color,transform] duration-200 hover:border-accent hover:bg-accent hover:text-on-accent focus-visible:border-accent focus-visible:bg-accent focus-visible:text-on-accent active:scale-95"
              >
                <CornerMarks hover inset="-4px" />
                <Icon
                  size={16}
                  aria-hidden
                  className="transition-transform duration-200 group-hover:-translate-y-0.5 group-focus-visible:-translate-y-0.5"
                />
                {/* Platform name tooltip (visual only; the aria-label already names it). */}
                <span
                  aria-hidden
                  className="chip chip-plain pointer-events-none absolute bottom-full left-0 z-10 mb-2.5 translate-y-1 opacity-0 transition-[opacity,transform] duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
                >
                  {s.label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
