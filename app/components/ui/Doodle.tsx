/**
 * Small hand-drawn style marks (SVG, decorative only). Stroke uses currentColor, so set
 * the colour with a text-* class. Use sparingly: a few on the whole site.
 */
type Variant =
  | "arrow"
  | "squiggle"
  | "bracket"
  | "books"
  | "hanger"
  | "flashcard"
  | "spark"
  | "wrench"
  | "sigma"
  | "gear"
  | "graph"
  | "flag";

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
  // A small stack of three books (top one tilted) with a bookmark ribbon.
  books: {
    viewBox: "0 0 48 40",
    w: 48,
    h: 40,
    d: [
      "M6 30.5h31v6.5H6.5z",
      "M9 23.5h27.5v7H9z",
      "M5.5 16.5l26.5 -3.5 1 7 -26.5 3.5z",
      "M12 30.5v6.5",
      "M14.5 23.5v7",
      "M26 14.2v-8l2.2 1.8 2.2 -1.8v7.4",
    ],
  },
  // A clothes hanger with a curled hook.
  hanger: {
    viewBox: "0 0 48 36",
    w: 48,
    h: 36,
    d: [
      "M24 13c0 -2 1.8 -3 3.4 -4.4c1.6 -1.4 1.2 -4.3 -1.3 -4.9c-2 -0.4 -3.6 1 -3.7 2.8",
      "M24 13L5.2 26.4c-1.8 1.3 -1 4.1 1.3 4.1h35c2.3 0 3.2 -2.8 1.3 -4.1z",
    ],
  },
  // A four-point spark with a small companion sparkle.
  spark: {
    viewBox: "0 0 44 40",
    w: 44,
    h: 40,
    d: [
      "M20 5c1 9 4 13 13 14c-9 1 -12 5 -13 14c-1 -9 -4 -13 -13 -14c9 -1 12 -5 13 -14z",
      "M36 4c0.4 3 1.6 4.4 4.5 4.8c-2.9 0.4 -4.1 1.8 -4.5 4.8c-0.4 -3 -1.6 -4.4 -4.5 -4.8c2.9 -0.4 4.1 -1.8 4.5 -4.8z",
    ],
  },
  // A small open-end wrench, drawn at an angle.
  wrench: {
    viewBox: "0 0 44 40",
    w: 44,
    h: 40,
    d: [
      "M31 5a8 8 0 0 0 -7.4 10.9L8.5 31a3.2 3.2 0 0 0 4.5 4.5l15.1 -15.1A8 8 0 0 0 38.6 13l-4.7 4.7 -4.4 -1.2 -1.2 -4.4L33 7.4A8 8 0 0 0 31 5z",
    ],
  },
  // A hand-drawn sigma (summation) sign.
  sigma: {
    viewBox: "0 0 40 40",
    w: 40,
    h: 40,
    d: ["M31 9.5c-0.5 -2 -1.5 -3 -4 -3H9.5l12 13.5L9 33.5h18.5c2.5 0 3.6 -1 4.2 -3.2"],
  },
  // A gear (pipelines / ops).
  gear: {
    viewBox: "0 0 40 40",
    w: 40,
    h: 40,
    d: [
      "M17.5 4.5h5l1 4.4 3.4 1.4 3.8 -2.4 3.5 3.5 -2.4 3.8 1.4 3.4 4.4 1v5l-4.4 1 -1.4 3.4 2.4 3.8 -3.5 3.5 -3.8 -2.4 -3.4 1.4 -1 4.4h-5l-1 -4.4 -3.4 -1.4 -3.8 2.4 -3.5 -3.5 2.4 -3.8 -1.4 -3.4 -4.4 -1v-5l4.4 -1 1.4 -3.4 -2.4 -3.8 3.5 -3.5 3.8 2.4 3.4 -1.4z",
      "M20 14.5a5.5 5.5 0 1 0 0.01 0z",
    ],
  },
  // A small node graph (neural net / agents).
  graph: {
    viewBox: "0 0 44 40",
    w: 44,
    h: 40,
    d: [
      "M8 10l14 -3M8 10l14 13M8 30l14 -7M8 30l14 3M22 7l14 13M22 23l14 -3M22 33l14 -13",
      "M5.5 10a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0 -5 0",
      "M5.5 30a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0 -5 0",
      "M19.5 7a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0 -5 0",
      "M19.5 23a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0 -5 0",
      "M19.5 33a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0 -5 0",
      "M33.5 20a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0 -5 0",
    ],
  },
  // A flag on a pole (goals / targets).
  flag: {
    viewBox: "0 0 40 40",
    w: 40,
    h: 40,
    d: ["M10 36V5", "M10 6c6 -3 10 3 16 0c2 -1 4 -1.5 5 -1.5v14c-1 0 -3 0.5 -5 1.5c-6 3 -10 -3 -16 0"],
  },
  // A flashcard with a bent corner and three text lines.
  flashcard: {
    viewBox: "0 0 48 36",
    w: 48,
    h: 36,
    d: ["M4 6h32l8 8v18H4z", "M36 6v8h8", "M10 16h17", "M10 22h22", "M10 28h12"],
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
