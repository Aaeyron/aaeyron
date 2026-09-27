import type { ReactNode } from "react";

/** Renders content text, highlighting any [TODO: …] placeholders so they're easy to spot. */
export function Txt({ children }: { children: string }) {
  const parts = children.split(/(\[TODO:[^\]]*\])/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("[TODO:") ? (
          <mark key={i} className="todo">
            {part}
          </mark>
        ) : (
          part
        ),
      )}
    </>
  );
}

export function Tag({ children, accent = false }: { children: ReactNode; accent?: boolean }) {
  return (
    <span
      className={`inline-flex items-center rounded-sm border px-2 py-0.5 font-mono text-[0.75rem] leading-5 ${
        accent ? "border-transparent bg-accent-soft text-accent-text" : "border-line text-muted"
      }`}
    >
      {children}
    </span>
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
          {index && <span className="text-accent-text">{index}</span>}
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

/** Serif italic word in the accent colour — use once per headline at most. */
export function Em({ children }: { children: ReactNode }) {
  return <em className="text-accent-text">{children}</em>;
}
