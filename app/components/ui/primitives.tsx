import type { CSSProperties, ReactNode } from "react";

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

type LabelProps = {
  children: ReactNode;
  /** Section index shown in the accent colour, e.g. "01". */
  index?: string;
  accent?: boolean;
  /** Keep original casing (tech names, categories). */
  plain?: boolean;
  /** Allow long text to wrap (e.g. long categories on mobile). */
  wrap?: boolean;
  className?: string;
};

/** Sharp-cornered label box for small text: section labels, dates, categories, metadata. */
export function Label({ children, index, accent, plain, wrap, className = "" }: LabelProps) {
  return (
    <span
      className={`chip ${accent ? "chip-accent" : ""} ${plain ? "chip-plain" : ""} ${wrap ? "chip-wrap" : ""} ${className}`}
    >
      {index && (
        <>
          <span className="text-accent-text">{index}</span>
          <span aria-hidden className="h-3 w-px bg-line-strong" />
        </>
      )}
      <span>{children}</span>
    </span>
  );
}

/** Tech tags and status badges. */
export function Tag({ children, accent = false }: { children: ReactNode; accent?: boolean }) {
  return (
    <Label accent={accent} plain={!accent}>
      {children}
    </Label>
  );
}

/**
 * Crop marks at the four corners of the nearest `relative` parent.
 * Decorative: aria-hidden, no pointer events. `hover` turns them accent
 * when a parent `.group` is hovered or focused.
 */
export function CornerMarks({ hover = false, inset = "-5px" }: { hover?: boolean; inset?: string }) {
  const cls = `corner ${hover ? "corner-hover" : ""}`;
  // Each mark "draws in" from its own corner when its container reveals.
  return (
    <span aria-hidden className="pointer-events-none absolute inset-0">
      <span className={cls} style={{ top: inset, left: inset, borderTopWidth: 1, borderLeftWidth: 1, transformOrigin: "top left" }} />
      <span className={cls} style={{ top: inset, right: inset, borderTopWidth: 1, borderRightWidth: 1, transformOrigin: "top right" }} />
      <span className={cls} style={{ bottom: inset, left: inset, borderBottomWidth: 1, borderLeftWidth: 1, transformOrigin: "bottom left" }} />
      <span className={cls} style={{ bottom: inset, right: inset, borderBottomWidth: 1, borderRightWidth: 1, transformOrigin: "bottom right" }} />
    </span>
  );
}

/** Stagger position for the page-load entrance: use with className="enter". */
export const enterStyle = (i: number) => ({ "--enter-i": i }) as CSSProperties;

type SectionHeaderProps = {
  index?: string;
  label: string;
  title: ReactNode;
  children?: ReactNode;
  action?: ReactNode;
  id?: string;
  as?: "h1" | "h2";
};

/**
 * Index + label box, heading, optional intro text and action link.
 * Page headers (as="h1") play the page-load entrance: label → heading → text → action.
 * Section headers (h2) scroll-reveal: label + heading first, then the action.
 */
export function SectionHeader({ index, label, title, children, action, id, as: H = "h2" }: SectionHeaderProps) {
  const isPage = H === "h1";
  const enter = (i: number) => (isPage ? { className: "enter", style: enterStyle(i) } : {});

  return (
    <div className="mb-10 flex flex-col gap-6 sm:mb-14 md:flex-row md:items-end md:justify-between">
      <div className="measure" {...(isPage ? {} : { "data-reveal": true })}>
        <div {...enter(0)}>
          <Label index={index} className="mb-5">
            {label}
          </Label>
        </div>
        <H id={id} className={`${isPage ? "display enter" : "h2"}`} style={isPage ? enterStyle(1) : undefined}>
          {title}
        </H>
        {children && (
          <div className={`mt-5 text-muted ${isPage ? "enter" : ""}`} style={isPage ? enterStyle(2) : undefined}>
            {children}
          </div>
        )}
      </div>
      {action && (
        <div
          className={`shrink-0 ${isPage ? "enter" : ""}`}
          style={isPage ? enterStyle(3) : undefined}
          {...(isPage ? {} : { "data-reveal": true })}
        >
          {action}
        </div>
      )}
    </div>
  );
}

/** One highlighted word in the accent colour — use once per headline at most. */
export function Highlight({ children }: { children: ReactNode }) {
  return <span className="text-accent-text">{children}</span>;
}
