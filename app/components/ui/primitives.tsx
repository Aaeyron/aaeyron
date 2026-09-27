import type { ReactNode } from "react";

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-sm border border-line px-2 py-0.5 font-mono text-[0.75rem] leading-5 text-muted">
      {children}
    </span>
  );
}

export function Kbd({ children }: { children: ReactNode }) {
  return (
    <kbd className="inline-flex min-w-6 items-center justify-center rounded-sm border border-line bg-surface px-1.5 font-mono text-[0.7rem] leading-5 text-muted">
      {children}
    </kbd>
  );
}

type SectionHeaderProps = {
  index?: string;
  label: string;
  title: ReactNode;
  children?: ReactNode;
  action?: ReactNode;
  id?: string;
  as?: "h1" | "h2";
};

/** Mono index + label, serif heading, optional intro text and action link. */
export function SectionHeader({ index, label, title, children, action, id, as: H = "h2" }: SectionHeaderProps) {
  return (
    <div className="mb-10 flex flex-col gap-6 sm:mb-14 md:flex-row md:items-end md:justify-between" data-reveal>
      <div className="measure">
        <p className="label mb-4 flex gap-3">
          {index && <span className="text-accent-ink">{index}</span>}
          <span>{label}</span>
        </p>
        <H id={id} className={H === "h1" ? "display" : "h2"}>
          {title}
        </H>
        {children && <div className="mt-5 text-muted">{children}</div>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
