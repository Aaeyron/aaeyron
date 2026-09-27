"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import { ArrowUpRight, Check, Copy, Mail } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { contactLinks, profile, type ContactLink } from "@/lib/content";
import { copyText } from "@/lib/client";
import { CornerMarks } from "./primitives";

const icons: Record<ContactLink["id"], ComponentType<{ size?: number; "aria-hidden"?: boolean }>> = {
  github: FaGithub,
  linkedin: FaLinkedinIn,
  email: Mail,
};

function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  const onCopy = async () => {
    if (!(await copyText(profile.email))) return;
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative flex shrink-0 border-l border-line">
      <button
        type="button"
        onClick={onCopy}
        aria-label={copied ? "Email address copied" : "Copy email address"}
        className="relative z-10 grid w-12 place-items-center text-muted transition-colors duration-200 hover:bg-surface hover:text-accent-text"
      >
        {copied ? <Check size={17} aria-hidden className="text-accent-text" /> : <Copy size={16} aria-hidden />}
      </button>
      {/* Visual "Copied!" flag; screen readers get the live region below. */}
      <span
        aria-hidden
        className={`chip chip-accent pointer-events-none absolute -top-3 right-0 z-20 transition-[opacity,transform] duration-200 ${
          copied ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
        }`}
      >
        Copied!
      </span>
      <span className="sr-only" role="status" aria-live="polite">
        {copied ? "Copied! Email address copied to clipboard." : ""}
      </span>
    </div>
  );
}

/**
 * Compact GitHub · LinkedIn · Email buttons for the mobile menu: stacked,
 * full width, 48px tall, with a staggered entrance (off with reduced motion).
 */
export function ContactButtonsCompact({ className = "", startIndex = 0 }: { className?: string; startIndex?: number }) {
  return (
    <ul className={`stagger grid gap-3 ${className}`}>
      {contactLinks.map((link, i) => {
        const Icon = icons[link.id];
        return (
          <li key={link.id} style={{ "--i": startIndex + i } as React.CSSProperties}>
            <a
              href={link.href}
              aria-label={link.ariaLabel}
              {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="group relative flex min-h-12 items-center gap-3 border border-line bg-bg px-2 transition-[border-color,transform] duration-200 hover:border-accent focus-visible:border-accent active:scale-[0.97]"
            >
              <CornerMarks hover inset="-4px" />
              <span
                aria-hidden
                className="grid size-8 shrink-0 place-items-center border border-line transition-colors duration-200 group-hover:border-accent group-hover:bg-accent group-hover:text-on-accent group-focus-visible:border-accent group-focus-visible:bg-accent group-focus-visible:text-on-accent group-active:border-accent group-active:bg-accent group-active:text-on-accent"
              >
                <Icon size={15} aria-hidden />
              </span>
              <span className="flex-1 font-semibold">{link.label}</span>
              <span className="hidden truncate font-mono text-xs text-muted min-[340px]:inline">{link.handle}</span>
              <ArrowUpRight
                size={16}
                aria-hidden
                className="mr-1 shrink-0 text-muted transition-[transform,color] duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-text"
              />
            </a>
          </li>
        );
      })}
    </ul>
  );
}

/** GitHub · LinkedIn · Email buttons. 3 across on desktop, stacked on mobile. */
export default function ContactButtons({ className = "" }: { className?: string }) {
  return (
    <ul className={`grid gap-6 md:grid-cols-3 ${className}`}>
      {contactLinks.map((link, i) => {
        const Icon = icons[link.id];
        return (
          <li key={link.id} className="group relative" data-reveal>
            <CornerMarks hover />

            {/* Index label, sitting on the top border. */}
            <span aria-hidden className="chip absolute -top-2.5 left-3 z-10 py-0 text-[0.65rem] transition-colors duration-200 group-hover:border-accent group-hover:text-accent-text group-focus-within:border-accent group-focus-within:text-accent-text">
              {String(i + 1).padStart(2, "0")}
            </span>

            <div className="relative flex border border-line bg-bg transition-colors duration-200 group-hover:border-accent group-focus-within:border-accent">
              <a
                href={link.href}
                aria-label={link.ariaLabel}
                {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="flex min-h-[4.75rem] min-w-0 flex-1 items-center gap-4 px-4 py-4 outline-offset-[-3px]"
              >
                <span
                  aria-hidden
                  className="grid size-11 shrink-0 place-items-center border border-line text-ink transition-colors duration-200 group-hover:border-accent group-hover:bg-accent group-hover:text-on-accent group-focus-within:border-accent group-focus-within:bg-accent group-focus-within:text-on-accent"
                >
                  <Icon size={18} aria-hidden />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold leading-tight">{link.label}</span>
                  <span className="mt-1 block truncate font-mono text-xs text-muted">{link.handle}</span>
                </span>
                <ArrowUpRight
                  size={18}
                  aria-hidden
                  className="shrink-0 text-muted transition-[transform,color] duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-text group-focus-within:-translate-y-0.5 group-focus-within:translate-x-0.5 group-focus-within:text-accent-text"
                />
              </a>

              {link.id === "email" && <CopyEmail />}

              {/* Thin accent line drawn across the bottom on hover / focus. */}
              <span
                aria-hidden
                className="pointer-events-none absolute -bottom-px left-0 h-0.5 w-full origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100 group-focus-within:scale-x-100"
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
