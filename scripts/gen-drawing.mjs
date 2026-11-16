// Generates the page-background "technical drawing" tiles, drawn on top of the CSS graph-paper
// grid (25px cells, a major line every 5 cells = 125px; see app/globals.css). The tiles are used
// as CSS masks, so colours come from theme tokens and only alpha lives here:
//   public/bg/drawing.svg            neutral layer, desktop/tablet (1500 × 1750)
//   public/bg/drawing-accent.svg     accent layer (~1 in 10 elements), desktop/tablet
//   public/bg/drawing-sm.svg         neutral layer, phones (1000 × 1250, figures at 75% size)
//   public/bg/drawing-accent-sm.svg  accent layer, phones
//
// Lines only: straight line segments, plus the small filled arrowheads and length numbers that
// belong to them. No shapes (no polygons, cells, circles, arcs or curves) and no free-standing
// text: every number sits on its dimension line, ruler or section mark.
// Everything snaps to the grid: figure anchors sit on grid intersections; dimension lines,
// section lines, rulers and traces run along grid lines with lengths in whole cells; both tile
// sizes are exact multiples of 125px, so the drawing repeats in step with the grid (no drift).
// The tile and the grid share the same origin (top-left of <main>).
//
// Elements:
//   - figures: dimension lines (arrowheads or end ticks, extension lines, length number),
//     chain dimensions (two segments sharing a middle extension line), cross-section marks
//     (A–A with short arrows) and straight leader lines (arrowhead, 45° leg, grid-line shoulder)
//   - dashed traces along grid lines with short end ticks
//   - tick rulers along a major line with a cell-count label
//   - small straight fillers: tick pairs, corner marks, one-cell dashes
//
// Seamless: spacing is measured across the edges (the tile wraps) and anything near an edge is
// drawn again on the opposite edge. Seeded (mulberry32), so every run is byte-identical.
// Re-run after changing a setting:  node scripts/gen-drawing.mjs
import { mkdirSync, writeFileSync } from "node:fs";

const CELL = 25;
const MAJOR = 125;

// accentEvery: every Nth placed element (rulers, traces, figures and fillers alike) is drawn in
// the accent, so exactly ~1 in 10 is blue.
// Counts keep the same amount of detail as before the shapes, cells, coordinates and notes were
// removed (~100 elements per desktop tile, ~58 per phone tile), now all lines.
const DESKTOP = {
  seed: 20261116,
  W: 1500,
  H: 1750,
  scale: 1,
  lenMul: 1,
  figures: 30,
  fillers: 58,
  traces: 9,
  rulers: 8,
  accentEvery: 10,
};
const PHONE = {
  seed: 20261117,
  W: 1000,
  H: 1250,
  scale: 0.75, // figure size on phones
  lenMul: 0.7, // shorter dimension lines / section lines / rulers
  figures: 20,
  fillers: 30,
  traces: 5,
  rulers: 3,
  accentEvery: 10,
};
const GAP = 40; // min clear space between two items' bounding circles

function mulberry32(a) {
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const f = (n) => Math.round(n * 100) / 100;
const rad = (deg) => (deg * Math.PI) / 180;

// --- Drawing primitives: straight lines, small filled arrowheads and length labels ---
const S = (w = 1) => ` fill="none" stroke="#000" stroke-width="${w}" stroke-linecap="square" stroke-linejoin="miter"`;
const DASH = ' stroke-dasharray="3 3"';
const CENTER = ' stroke-dasharray="9 3 2 3"'; // drafting centre/cutting line (dash-dot)
const line = (x1, y1, x2, y2, extra = "", w = 1) => `<path d="M${f(x1)} ${f(y1)}L${f(x2)} ${f(y2)}"${S(w)}${extra}/>`;
const polyline = (pts, extra = "", w = 1) => `<path d="M${pts.map(([x, y]) => `${f(x)} ${f(y)}`).join("L")}"${S(w)}${extra}/>`;
// Small filled arrowhead with its tip at (x, y), pointing along `deg`.
const arrow = (x, y, deg, len = 5, half = 2) => {
  const bx = x - Math.cos(rad(deg)) * len;
  const by = y - Math.sin(rad(deg)) * len;
  const nx = -Math.sin(rad(deg)) * half;
  const ny = Math.cos(rad(deg)) * half;
  return `<path d="M${f(x)} ${f(y)}L${f(bx + nx)} ${f(by + ny)}L${f(bx - nx)} ${f(by - ny)}Z"/>`;
};
const label = (x, y, text, anchor = "middle", size = 8) =>
  `<text x="${f(x)}" y="${f(y)}" font-family="ui-monospace,Menlo,Consolas,monospace" font-size="${size}" letter-spacing=".5" text-anchor="${anchor}">${text}</text>`;

function build(cfg) {
  const { W, H } = cfg;
  const rnd = mulberry32(cfg.seed);
  const between = (a, b) => a + rnd() * (b - a);
  const int = (a, b) => Math.floor(between(a, b + 1));
  const one = (...items) => items[Math.floor(rnd() * items.length)];
  const pick = (items) => {
    const total = items.reduce((s, [, w]) => s + w, 0);
    let r = rnd() * total;
    for (const [v, w] of items) if ((r -= w) <= 0) return v;
    return items[items.length - 1][0];
  };
  const snap = (step, max) => Math.floor(rnd() * (max / step)) * step; // a grid coordinate in [0, max)
  const dist = (a, b) => {
    const dx = Math.min(Math.abs(a.x - b.x), W - Math.abs(a.x - b.x));
    const dy = Math.min(Math.abs(a.y - b.y), H - Math.abs(a.y - b.y));
    return Math.hypot(dx, dy);
  };
  // Lengths in whole cells; an odd cell count puts the centre half a cell off the intersection.
  const cells = (a, b) => Math.max(2, Math.round(int(a, b) * cfg.lenMul));
  const half = (n) => (n % 2 ? CELL / 2 : 0);
  const rot90 = () => one(0, 90, 180, 270);

  // ---------- Figures ----------
  // design() picks everything once; draw() renders around (0, 0). `r` is the bounding radius;
  // `free` figures are scaled on phones (grid-length figures keep whole-cell lengths instead);
  // `ox/oy` shift the centre off the intersection when a whole-cell length is odd.
  const KINDS = [
    ["dimension", 14],
    ["chain", 7],
    ["section", 8],
    ["leader", 8],
  ];
  function design() {
    const kind = pick(KINDS);
    switch (kind) {
      case "dimension": {
        const n = cells(3, 7);
        const vertical = rnd() < 0.3;
        return { kind, r: (n * CELL) / 2 + 10, n, vertical, ends: one("arrow", "arrow", "tick"), ...(vertical ? { oy: half(n) } : { ox: half(n) }) };
      }
      case "chain": {
        const a = cells(2, 4);
        const b = cells(2, 4);
        const n = a + b;
        const vertical = rnd() < 0.3;
        return { kind, r: (n * CELL) / 2 + 10, n, a, vertical, ...(vertical ? { oy: half(n) } : { ox: half(n) }) };
      }
      case "leader":
        // Tip on an intersection; the 45° leg ends on the next intersection and the shoulder runs
        // whole cells along a grid line. Any quarter turn keeps it on the grid.
        return { kind, free: true, r: Math.hypot(3 * CELL, CELL) + 6, rot: rot90() };
      case "section": {
        const n = cells(4, 7);
        const vertical = rnd() < 0.35;
        return { kind, r: (n * CELL) / 2 + 12, n, vertical, letter: one("A", "B", "C"), ...(vertical ? { oy: half(n) } : { ox: half(n) }) };
      }
    }
  }

  function draw(d) {
    switch (d.kind) {
      case "dimension": {
        // Dimension line on a grid line; extension lines drop one cell to the feature.
        const h = (d.n * CELL) / 2;
        const ends =
          d.ends === "arrow"
            ? line(-h + 1, 0, h - 1, 0) + arrow(-h, 0, 180) + arrow(h, 0, 0)
            : line(-h, 0, h, 0) + line(-h - 3, 3, -h + 3, -3) + line(h - 3, 3, h + 3, -3); // architectural ticks
        const s = line(-h, -5, -h, CELL, "", 0.75) + line(h, -5, h, CELL, "", 0.75) + ends + label(0, -4, d.n * CELL);
        return d.vertical ? `<g transform="rotate(-90)">${s}</g>` : s;
      }
      case "chain": {
        // Two dimensions in a row on one grid line: three extension lines, architectural ticks
        // where they cross, a length number over each segment.
        const h = (d.n * CELL) / 2;
        const m = -h + d.a * CELL;
        const tick = (x) => line(x - 3, 3, x + 3, -3);
        const s =
          line(-h, 0, h, 0) +
          [-h, m, h].map((x) => line(x, -5, x, CELL, "", 0.75) + tick(x)).join("") +
          label((-h + m) / 2, -4, d.a * CELL) +
          label((m + h) / 2, -4, (d.n - d.a) * CELL);
        return d.vertical ? `<g transform="rotate(-90)">${s}</g>` : s;
      }
      case "leader": {
        // Straight leader: arrowhead at the tip, a 45° leg, then a shoulder along a grid line.
        const s = arrow(0, 0, 225, 4.5, 1.75) + polyline([[0, 0], [CELL, CELL], [CELL * 3, CELL]], "", 0.75);
        return `<g transform="rotate(${d.rot})">${s}</g>`;
      }
      case "section": {
        // Cutting-plane line (dash-dot) with short heavy end bars, arrows showing the view
        // direction and the section letter at each end: A–A.
        const h = (d.n * CELL) / 2;
        const s =
          line(-h, 0, h, 0, CENTER, 0.75) +
          line(-h, 0, -h + 8, 0, "", 1.5) +
          line(h - 8, 0, h, 0, "", 1.5) +
          line(-h, 0, -h, 10, "", 0.75) +
          arrow(-h, 12, 90) +
          line(h, 0, h, 10, "", 0.75) +
          arrow(h, 12, 90) +
          label(-h - 6, -4, d.letter, "end") +
          label(h + 6, -4, d.letter, "start");
        return d.vertical ? `<g transform="rotate(-90)">${s}</g>` : s;
      }
    }
  }

  // ---------- Placement on the torus ----------
  const items = []; // { x, y, r, svg, kind, accent }
  const free = (q) => items.every((o) => dist(o, q) >= o.r + q.r + GAP);
  const tryPlace = (make, tries = 4000) => {
    for (let i = 0; i < tries; i++) {
      const q = make();
      if (free(q)) {
        items.push(q);
        return q;
      }
    }
    return null;
  };

  // Tick rulers along a major line, with a cell-count label.
  for (let i = 0; i < cfg.rulers; i++) {
    const n = cells(5, 8);
    const L = n * CELL;
    const vertical = rnd() < 0.35;
    let s = line(0, 0, L, 0, "", 0.75);
    for (let x = 0; x <= L + 0.01; x += 5) {
      const len = x % CELL === 0 ? (x === 0 || Math.abs(x - L) < 0.01 ? 8 : 5) : 2.5;
      s += line(x, 0, x, -len, "", 0.75);
    }
    s += label(L / 2, -9, `${n} cells`, "middle", 7);
    s = `<g transform="translate(${-L / 2} 0)">${s}</g>`;
    if (vertical) s = `<g transform="rotate(90)">${s}</g>`;
    // Start on a major line at a whole-cell position; centre = start + L/2.
    tryPlace(() =>
      vertical
        ? { x: snap(MAJOR, W), y: snap(CELL, H) + L / 2, r: L / 2 + 8, svg: s, kind: "ruler" }
        : { x: snap(CELL, W) + L / 2, y: snap(MAJOR, H), r: L / 2 + 8, svg: s, kind: "ruler" },
    );
  }

  // Dashed traces between major intersections along the grid lines (one turn), with short
  // perpendicular end ticks instead of dots.
  for (let i = 0; i < cfg.traces; i++) {
    const dx = one(-1, 1) * MAJOR * one(1, 1, 2);
    const dy = one(-1, 1) * MAJOR;
    const mid = rnd() < 0.5 ? [dx, 0] : [0, dy];
    const cx = dx / 2;
    const cy = dy / 2;
    const P = [[-cx, -cy], [mid[0] - cx, mid[1] - cy], [dx - cx, dy - cy]];
    // Each end tick is perpendicular to the leg it finishes.
    const tick = ([x, y], [px]) => (x === px ? line(x - 4, y, x + 4, y) : line(x, y - 4, x, y + 4));
    const s = polyline(P, ' stroke-dasharray="4 3"', 0.75) + tick(P[0], P[1]) + tick(P[2], P[1]);
    const r = Math.hypot(cx, cy) + 8;
    tryPlace(() => ({ x: snap(MAJOR, W) + cx, y: snap(MAJOR, H) + cy, r, svg: s, kind: "trace" }));
  }

  // Figures (after the long rulers and traces, so those always find room), biggest first so
  // spacing stays even; anchors on intersections.
  const designs = Array.from({ length: cfg.figures }, () => design()).sort((a, b) => b.r - a.r);
  designs.forEach((d) => {
    let body = draw(d);
    let r = d.r;
    if (d.free && cfg.scale !== 1) {
      body = `<g transform="scale(${cfg.scale})">${body}</g>`;
      r *= cfg.scale;
    }
    tryPlace(() => ({ x: snap(CELL, W) + (d.ox || 0), y: snap(CELL, H) + (d.oy || 0), r, svg: body, kind: "figure", fig: d.kind }));
  });

  // Small straight fillers on intersections.
  for (let i = 0; i < cfg.fillers; i++) {
    const kind = pick([["ticks", 4], ["corner", 3], ["dash", 3]]);
    const svg =
      kind === "ticks"
        ? line(-5, 3, 1, -3, "", 0.75) + line(-1, 3, 5, -3, "", 0.75) // "//"
        : kind === "corner"
          ? polyline(one([[0, 6], [0, 0], [6, 0]], [[-6, 0], [0, 0], [0, 6]], [[0, -6], [0, 0], [6, 0]], [[-6, 0], [0, 0], [0, -6]]))
          : rnd() < 0.5
            ? line(0, 0, CELL, 0, DASH)
            : line(0, 0, 0, CELL, DASH);
    tryPlace(() => ({ x: snap(CELL, W), y: snap(CELL, H), r: kind === "dash" ? CELL : 8, svg, kind: "filler", op: [0.4, 0.7] }), 2000);
  }

  // ---------- Output ----------
  const copies = (x, y, reach) => {
    const xs = [x, ...(x < reach ? [x + W] : x > W - reach ? [x - W] : [])];
    const ys = [y, ...(y < reach ? [y + H] : y > H - reach ? [y - H] : [])];
    return xs.flatMap((cx) => ys.map((cy) => [cx, cy]));
  };
  const out = { neutral: [], accent: [] };
  items.forEach((it, i) => {
    const [lo, hi] = it.op || (it.kind === "figure" ? [0.55, 0.85] : [0.6, 0.8]);
    const o = f(between(lo, hi));
    const accent = i % cfg.accentEvery === cfg.accentEvery - 1;
    const el = `<g opacity="${o}">${copies(it.x, it.y, it.r + 12)
      .map(([cx, cy]) => `<g transform="translate(${f(cx)} ${f(cy)})">${it.svg}</g>`)
      .join("")}</g>`;
    (accent ? out.accent : out.neutral).push(el);
  });
  // translate(.5 .5): 1px strokes on grid coordinates then cover exactly the same pixel as the
  // CSS grid lines (which fill [x, x + 1)).
  const svg = (body) =>
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><g transform="translate(.5 .5)">${body.join("")}</g></svg>\n`;
  const count = (k) => items.filter((i) => i.kind === k).length;
  const kinds = () => ["dimension", "chain", "section", "leader"].map((k) => `${items.filter((i) => i.fig === k).length} ${k}`).join(", ");
  return {
    neutral: svg(out.neutral),
    accent: svg(out.accent),
    summary: `${W}×${H}: ${count("figure")} figures (${kinds()}), ${count("trace")} traces, ${count("ruler")} rulers, ${count("filler")} fillers; accent ${out.accent.length}/${items.length} (${Math.round((out.accent.length / items.length) * 100)}%)`,
  };
}

mkdirSync("public/bg", { recursive: true });
const desk = build(DESKTOP);
const phone = build(PHONE);
writeFileSync("public/bg/drawing.svg", desk.neutral);
writeFileSync("public/bg/drawing-accent.svg", desk.accent);
writeFileSync("public/bg/drawing-sm.svg", phone.neutral);
writeFileSync("public/bg/drawing-accent-sm.svg", phone.accent);
console.log(`desktop ${desk.summary}\nphone   ${phone.summary}`);
