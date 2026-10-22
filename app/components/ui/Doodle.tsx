/**
 * Small hand-drawn style marks (SVG, decorative only). Stroke uses currentColor, so set
 * the colour with a text-* class. Use sparingly: a few on the whole site.
 */
type Variant = "arrow" | "squiggle" | "bracket";

const paths: Record<Variant, { viewBox: string; d: string[]; w: number; h: number }> = {
  // A loose curved arrow pointing down-right.
  arrow: {
    viewBox: "0 0 48 32",
    w: 48,
    h: 32,
    d: ["M3 6c9 -3 19 -1 26 6s10 12 11 17", "M33 24.5l7.5 5l1.5 -8.5"],
  },
  // A short wavy underline.
  squiggle: {
    viewBox: "0 0 72 10",
    w: 72,
    h: 10,
    d: ["M2 6c5 -5 9 5 14 0s9 -5 14 0s9 5 14 0s9 -5 14 0s8 4 12 1"],
  },
  // A hand-drawn curly bracket opening to the right.
  bracket: {
    viewBox: "0 0 14 48",
    w: 14,
    h: 48,
    d: ["M12 2c-5 0 -6 3 -6 8v8c0 4 -2 6 -4 6c2 0 4 2 4 6v8c0 5 1 8 6 8"],
  },
};

export default function Doodle({ variant, className = "" }: { variant: Variant; className?: string }) {
  const p = paths[variant];
  return (
    <svg
      aria-hidden
      focusable="false"
      width={p.w}
      height={p.h}
      viewBox={p.viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`pointer-events-none ${className}`}
    >
      {p.d.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}
