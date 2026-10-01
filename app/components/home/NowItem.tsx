"use client";

import { ChevronDown } from "lucide-react";
import { useState, type ReactNode } from "react";

/**
 * One line of the hero's Now block. Tapping/clicking the short line expands the
 * full description inline (pushing content below it down), so nothing can cover it.
 */
export default function NowItem({ id, term, short, detail }: { id: string; term: string; short: ReactNode; detail: ReactNode }) {
  const [open, setOpen] = useState(false);
  const panelId = `${id}-detail`;

  return (
    <div className="flex flex-col gap-x-4 sm:flex-row">
      <dt className="shrink-0 text-muted sm:w-20 sm:pt-3">{term}</dt>
      <dd className="min-w-0 flex-1">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((o) => !o)}
          onKeyDown={(e) => {
            if (e.key === "Escape" && open) setOpen(false);
          }}
          className="group flex min-h-11 w-full cursor-pointer items-center justify-between gap-3 rounded-sm text-left outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <span className="underline decoration-line-strong decoration-dotted underline-offset-4 transition-colors duration-200 group-hover:text-accent-text">
            {short}
          </span>
          <ChevronDown
            size={16}
            aria-hidden
            className={`shrink-0 text-muted transition-transform duration-300 motion-reduce:transition-none ${open ? "rotate-180" : ""}`}
          />
        </button>
        <div
          id={panelId}
          inert={!open}
          className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none ${
            open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <p className="pb-2 pr-6 font-sans text-sm leading-relaxed text-muted">{detail}</p>
          </div>
        </div>
      </dd>
    </div>
  );
}
