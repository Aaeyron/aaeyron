// Generates the page-background "technical drawing" tiles, drawn on top of the CSS graph-paper
// grid (25px cells, a major line every 5 cells = 125px; see app/globals.css). The tiles are used
// as CSS masks, so colours come from theme tokens and only alpha lives here:
//   public/bg/drawing.svg            neutral layer, desktop/tablet (1500 × 1750)
//   public/bg/drawing-accent.svg     accent layer (~1 in 10 elements), desktop/tablet
//   public/bg/drawing-sm.svg         neutral layer, phones (1000 × 1250, figures at 75% size)
//   public/bg/drawing-accent-sm.svg  accent layer, phones
//
// Everything snaps to the grid: figure centres sit on grid intersections, dimension lines,
// rulers, traces and waves run along grid lines with lengths in whole cells, and both tile sizes
// are exact multiples of 125px, so the drawing repeats in step with the grid (no drift). The tile
// and the grid share the same origin (top-left of <main>).
//
// Layers of detail:
//   - figures: circles with centre lines + radius label, protractor arcs, dimension lines,
//     isometric cubes, ellipses with axes, angle marks, spirals, hexagons, waves, dials, orbit
//     rings, circumscribed triangles, dotted paths; some carry a small note (scale 1:25, fig. 03…)
//   - coordinates: tiny mono labels at some major intersections (A3, x:250 y:500)
//   - highlighted cells: clusters of 1–3 filled or hatched cells (1 in 4 in the accent)
//   - node dots on major intersections, some joined by a dashed trace along the grid lines
//   - tick rulers along a major line with a cell-count label
//   - small fillers (dots, tiny rings, short ticks) on intersections
//
// Seamless: spacing is measured across the edges (the tile wraps) and anything near an edge is
// drawn again on the opposite edge. Seeded (mulberry32), so every run is byte-identical.
// Re-run after changing a setting:  node scripts/gen-drawing.mjs
import { mkdirSync, writeFileSync } from "node:fs";

const CELL = 25;
const MAJOR = 125;

const DESKTOP = {
  seed: 20261116,
  W: 1500,
  H: 1750,
  scale: 1,
  lenMul: 1,
  figures: 24,
  notes: 6,
  fillers: 40,
  coords: 14,
  cells: 8,
  traces: 4,
  nodes: 8,
  rulers: 4,
  accentShare: 0.16,
};
const PHONE = {
  seed: 20261117,
  W: 1000,
  H: 1250,
  scale: 0.75, // figure size on phones
  lenMul: 0.7, // shorter dimension lines / waves / rulers
  figures: 14,
  notes: 2,
  fillers: 26,
  coords: 4,
  cells: 5,
  traces: 2,
  nodes: 5,
  rulers: 2,
  accentShare: 0.11,
};
// accentShare (per tile): chance of the accent for figures, fillers, nodes, traces and rulers; cell
// clusters use 1 in 4 and coordinates stay neutral. Tuned so ~1 in 10 elements per tile is blue.
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
const pt = (r, deg) => [f(Math.cos(rad(deg)) * r), f(Math.sin(rad(deg)) * r)];

// --- Drawing primitives (black in the mask; the theme colour comes from CSS) ---
const S = (w = 1) => ` fill="none" stroke="#000" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"`;
const DASH = ' stroke-dasharray="3 3"';
const CENTER = ' stroke-dasharray="9 3 2 3"'; // drafting centre line (dash-dot)
const line = (x1, y1, x2, y2, extra = "", w = 1) => `<path d="M${f(x1)} ${f(y1)}L${f(x2)} ${f(y2)}"${S(w)}${extra}/>`;
const circle = (r, extra = "", w = 1, cx = 0, cy = 0) => `<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(r)}"${S(w)}${extra}/>`;
const dot = (x, y, r = 1.5) => `<circle cx="${f(x)}" cy="${f(y)}" r="${r}"/>`;
const arc = (r, a0, a1, extra = "", w = 1) => {
  const [x0, y0] = pt(r, a0);
  const [x1, y1] = pt(r, a1);
  const large = Math.abs(a1 - a0) > 180 ? 1 : 0;
  return `<path d="M${x0} ${y0}A${f(r)} ${f(r)} 0 ${large} 1 ${x1} ${y1}"${S(w)}${extra}/>`;
};
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

  // ---------- Figures ----------
  // design() picks everything once; draw() renders around (0, 0). `r` is the bounding radius,
  // `free` figures are scaled on phones (grid-length figures keep whole-cell lengths instead),
  // `ox/oy` shift the centre off the intersection when a whole-cell length is odd.
  const KINDS = [
    ["construct", 12],
    ["protractor", 9],
    ["dimension", 11],
    ["cube", 9],
    ["orbit", 8],
    ["ellipse", 8],
    ["angle", 8],
    ["spiral", 6],
    ["hexagon", 7],
    ["wave", 7],
    ["gauge", 7],
    ["triangle", 7],
    ["path", 6],
  ];
  const rot90 = () => one(0, 90, 180, 270);
  function design() {
    const kind = pick(KINDS);
    switch (kind) {
      case "construct": {
        const R = one(25, 37.5, 50);
        return { kind, free: true, r: R + 12, R, a: one(225, 315, 300, 240) };
      }
      case "protractor": {
        const R = one(37.5, 50);
        return { kind, free: true, r: R + 8, R, rot: rot90() };
      }
      case "dimension": {
        const n = cells(4, 7);
        const vertical = rnd() < 0.3;
        return { kind, r: (n * CELL) / 2 + 10, n, vertical, ...(vertical ? { oy: half(n) } : { ox: half(n) }) };
      }
      case "cube":
        return { kind, free: true, r: 0, s: one(25, 37.5) };
      case "orbit":
        return { kind, free: true, r: 0, R: one(37.5, 50), nodes: [int(0, 7) * 45, int(0, 7) * 45, int(0, 7) * 45] };
      case "ellipse": {
        const rx = one(50, 62.5);
        return { kind, free: true, r: rx + 10, rx, ry: one(20, 25), tilt: one(0, 90) };
      }
      case "angle":
        return { kind, free: true, r: 56, A: one(30, 45, 60), base: rot90() };
      case "spiral":
        return { kind, free: true, r: 48, turns: 6, rot: rot90() };
      case "hexagon":
        return { kind, free: true, r: 0, R: one(25, 37.5), rot: one(0, 30) };
      case "wave": {
        const n = cells(4, 6);
        const vertical = rnd() < 0.25;
        return { kind, r: (n * CELL) / 2 + 8, n, cycles: one(1.5, 2), vertical, ...(vertical ? { oy: half(n) } : { ox: half(n) }) };
      }
      case "gauge":
        return { kind, free: true, r: 0, R: one(25, 31.25), ticks: one(24, 36) };
      case "triangle": {
        const a0 = int(0, 23) * 15;
        return { kind, free: true, r: 0, R: one(37.5, 50), a: [a0, a0 + one(105, 120, 135), a0 + one(225, 240, 255)] };
      }
      case "path": {
        const n = cells(4, 6);
        const vertical = rnd() < 0.3;
        return { kind, r: (n * CELL) / 2 + 8, n, bend: one(-1, 1) * one(12.5, 25), vertical, ...(vertical ? { oy: half(n) } : { ox: half(n) }) };
      }
    }
  }
  // Bounding radii that depend on the size only.
  const fixR = (d) => {
    if (d.kind === "cube") d.r = d.s + 4;
    if (d.kind === "orbit") d.r = d.R + 6;
    if (d.kind === "hexagon") d.r = d.R + 4;
    if (d.kind === "gauge") d.r = d.R + 10;
    if (d.kind === "triangle") d.r = d.R + 4;
    if (d.free) d.r *= cfg.scale;
    return d;
  };

  function draw(d) {
    switch (d.kind) {
      case "construct": {
        const { R, a } = d;
        const [ex, ey] = pt(R, a);
        return (
          circle(R) +
          line(-R - CELL / 2, 0, R + CELL / 2, 0, CENTER, 0.75) +
          line(0, -R - CELL / 2, 0, R + CELL / 2, CENTER, 0.75) +
          line(0, 0, ex, ey, "", 0.75) +
          arrow(ex, ey, a) +
          dot(0, 0, 1.25) +
          label(ex * 0.5 + (ex > 0 ? 5 : -5), ey * 0.5 - 3, `R${f(R)}`, ex > 0 ? "start" : "end")
        );
      }
      case "protractor": {
        const { R } = d;
        let s = arc(R, 180, 360) + line(-R - 6, 0, R + 6, 0, "", 0.75) + arc(R - CELL / 2, 180, 360, DASH, 0.75);
        for (let deg = 180; deg <= 360; deg += 10) {
          const len = deg % 30 === 0 ? 7 : 3.5;
          const [x0, y0] = pt(R, deg);
          const [x1, y1] = pt(R - len, deg);
          s += line(x0, y0, x1, y1, "", 0.75);
        }
        return `<g transform="rotate(${d.rot})">${s + dot(0, 0, 1.5)}</g>`;
      }
      case "dimension": {
        // The dimension line lies on a grid line; extension lines drop one cell to the feature.
        const h = (d.n * CELL) / 2;
        const s =
          line(-h, -5, -h, CELL, "", 0.75) +
          line(h, -5, h, CELL, "", 0.75) +
          line(-h + 1, 0, h - 1, 0) +
          arrow(-h, 0, 180) +
          arrow(h, 0, 0) +
          label(0, -4, d.n * CELL);
        return d.vertical ? `<g transform="rotate(-90)">${s}</g>` : s;
      }
      case "cube": {
        const s = d.s;
        const c = Math.cos(rad(30)) * s;
        const hs = s / 2;
        const v = [[0, -s], [c, -hs], [c, hs], [0, s], [-c, hs], [-c, -hs]];
        // Front corner and hidden back corner both project to the centre: front edges solid,
        // hidden back edges dashed.
        return (
          `<path d="M${v.map(([x, y]) => `${f(x)} ${f(y)}`).join("L")}Z"${S()}/>` +
          line(0, 0, -c, -hs) +
          line(0, 0, c, -hs) +
          line(0, 0, 0, s) +
          line(0, 0, 0, -s, DASH, 0.75) +
          line(0, 0, -c, hs, DASH, 0.75) +
          line(0, 0, c, hs, DASH, 0.75)
        );
      }
      case "orbit": {
        const radii = [d.R, d.R - CELL / 2, d.R - CELL];
        let s = circle(radii[0]) + circle(radii[1], DASH, 0.75) + circle(radii[2], "", 0.75) + dot(0, 0, 1.5);
        d.nodes.forEach((deg, i) => {
          const [x, y] = pt(radii[i], deg);
          s += dot(x, y, i === 0 ? 2.5 : 2);
        });
        return s;
      }
      case "ellipse": {
        const { rx, ry } = d;
        const fc = Math.sqrt(rx * rx - ry * ry);
        return `<g transform="rotate(${d.tilt})"><ellipse cx="0" cy="0" rx="${rx}" ry="${ry}"${S()}/>${line(-rx - CELL / 2, 0, rx + CELL / 2, 0, CENTER, 0.75)}${line(0, -ry - 8, 0, ry + 8, CENTER, 0.75)}${dot(-fc, 0, 1.5)}${dot(fc, 0, 1.5)}</g>`;
      }
      case "angle": {
        // One ray runs along a grid line; the other opens at 30°, 45° or 60°.
        const { A, base } = d;
        const L = 2 * CELL;
        const [x0, y0] = pt(L, base);
        const [x1, y1] = pt(L, base - A);
        const [lx, ly] = pt(30, base - A / 2);
        return (
          line(0, 0, x0, y0) +
          line(0, 0, x1, y1) +
          arc(18, base - A, base, "", 0.75) +
          dot(0, 0, 1.5) +
          label(lx, ly + 3, `${A}°`)
        );
      }
      case "spiral": {
        // Golden spiral of quarter arcs; its eye sits on the intersection.
        let r = 3;
        let cx = 0;
        let cy = 0;
        let a = 0;
        let p = `M${r} 0`;
        for (let i = 0; i < d.turns; i++) {
          const a1 = a + 90;
          const ex = cx + Math.cos(rad(a1)) * r;
          const ey = cy + Math.sin(rad(a1)) * r;
          p += `A${f(r)} ${f(r)} 0 0 1 ${f(ex)} ${f(ey)}`;
          const nr = r * 1.618;
          cx = ex - Math.cos(rad(a1)) * nr;
          cy = ey - Math.sin(rad(a1)) * nr;
          r = nr;
          a = a1;
        }
        return `<g transform="rotate(${d.rot})"><path d="${p}"${S()}/>${dot(0, 0, 1.25)}</g>`;
      }
      case "hexagon": {
        const v = [0, 60, 120, 180, 240, 300].map((deg) => pt(d.R, deg + d.rot));
        let s = `<path d="M${v.map((q) => q.join(" ")).join("L")}Z"${S()}/>` + circle(d.R * Math.cos(rad(30)), DASH, 0.75);
        for (const [x, y] of v) s += dot(x, y, 1.5);
        return s + dot(0, 0, 1.25);
      }
      case "wave": {
        // Sine over a grid line, half a cell high, a tick on every cell.
        const L = d.n * CELL;
        const h = L / 2;
        let p = "";
        for (let i = 0; i <= 60; i++) {
          const x = -h + (L * i) / 60;
          const y = -Math.sin((i / 60) * d.cycles * Math.PI * 2) * (CELL / 2);
          p += `${i ? "L" : "M"}${f(x)} ${f(y)}`;
        }
        let s = `<path d="${p}"${S()}/>` + line(-h, 0, h, 0, DASH, 0.75);
        for (let i = 0; i <= d.n; i++) s += line(-h + i * CELL, -3, -h + i * CELL, 3, "", 0.75);
        return d.vertical ? `<g transform="rotate(90)">${s}</g>` : s;
      }
      case "gauge": {
        let s = circle(d.R * 0.5, "", 0.75) + dot(0, 0, 1.5);
        for (let i = 0; i < d.ticks; i++) {
          const deg = (360 / d.ticks) * i;
          const len = i % (d.ticks / 4) === 0 ? 8 : 4;
          const [x0, y0] = pt(d.R, deg);
          const [x1, y1] = pt(d.R + len, deg);
          s += line(x0, y0, x1, y1, "", 0.75);
        }
        return s + circle(d.R, "", 0.75);
      }
      case "triangle": {
        const v = d.a.map((deg) => pt(d.R, deg));
        let s = `<path d="M${v.map((q) => q.join(" ")).join("L")}Z"${S()}/>` + circle(d.R, DASH, 0.75);
        for (const [x, y] of v) s += dot(x, y, 2);
        return s + dot(0, 0, 1.25);
      }
      case "path": {
        // Dotted curve between two nodes on the same grid line, arrow near the end.
        const h = (d.n * CELL) / 2;
        const b = d.bend * 2;
        const t = 0.86;
        const ax = (1 - t) * (1 - t) * -h + t * t * h;
        const ay = 2 * (1 - t) * t * b;
        const deg = (Math.atan2(2 * (1 - t) * b - 2 * t * b, 2 * h) * 180) / Math.PI;
        const s = `<path d="M${-h} 0Q0 ${b} ${h} 0"${S()} stroke-dasharray="1 4"/>${circle(3.5, "", 1, -h, 0)}${dot(h, 0, 2)}${arrow(ax, ay, deg)}`;
        return d.vertical ? `<g transform="rotate(90)">${s}</g>` : s;
      }
    }
  }
  const NOTES = ["scale 1:25", "grid 25", "rev. B", "detail A", "sheet 2/4", "section A–A", "rev. C", "scale 1:5"];

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

  // Figures, biggest first so spacing stays even; centres on intersections.
  const designs = Array.from({ length: cfg.figures }, () => fixR(design())).sort((a, b) => b.r - a.r);
  let figNo = 0;
  const noteEvery = Math.max(1, Math.floor(cfg.figures / Math.max(1, cfg.notes)));
  designs.forEach((d, i) => {
    const note = cfg.notes && i % noteEvery === noteEvery - 1 && figNo < cfg.notes ? (rnd() < 0.4 ? `fig. 0${++figNo}` : (figNo++, one(...NOTES))) : null;
    let body = draw(d);
    if (d.free && cfg.scale !== 1) body = `<g transform="scale(${cfg.scale})">${body}</g>`;
    // The note sits one cell below the figure, on a grid line, left-aligned to the centre line.
    if (note) body += label(0, Math.ceil((d.r + 6) / CELL) * CELL + 3, note, "middle", 7.5);
    const r = note ? d.r + 16 : d.r;
    tryPlace(() => ({ x: snap(CELL, W) + (d.ox || 0), y: snap(CELL, H) + (d.oy || 0), r, svg: body, kind: "figure", reach: r }));
  });

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

  // Dashed traces between node dots on major intersections, along the grid lines (one turn).
  for (let i = 0; i < cfg.traces; i++) {
    const dx = one(-1, 1) * MAJOR * one(1, 1, 2);
    const dy = one(-1, 1) * MAJOR;
    const mid = rnd() < 0.5 ? [dx, 0] : [0, dy];
    // Local coordinates centred on the bounding box.
    const cx = dx / 2;
    const cy = dy / 2;
    const P = [[-cx, -cy], [mid[0] - cx, mid[1] - cy], [dx - cx, dy - cy]];
    const s =
      `<path d="M${P.map((q) => q.map(f).join(" ")).join("L")}"${S(0.75)} stroke-dasharray="4 3"/>` +
      dot(P[0][0], P[0][1], 2.5) +
      dot(P[1][0], P[1][1], 1.5) +
      circle(3, "", 1, P[2][0], P[2][1]);
    const r = Math.hypot(cx, cy) + 8;
    tryPlace(() => ({ x: snap(MAJOR, W) + cx, y: snap(MAJOR, H) + cy, r, svg: s, kind: "trace" }));
  }

  // Highlighted cells: clusters of 1–3 filled or hatched cells. 1 in 4 in the accent.
  const SHAPES = [[[0, 0]], [[0, 0], [1, 0]], [[0, 0], [0, 1]], [[0, 0], [1, 0], [1, 1]], [[0, 0], [1, 0], [2, 0]], [[0, 0], [0, 1], [1, 1]]];
  const hatch = (cx, cy) => {
    let s = "";
    for (let c = -20; c <= 20; c += 6) {
      const x0 = Math.max(0, c);
      const y0 = Math.max(0, -c);
      const x1 = Math.min(CELL, CELL + c);
      const y1 = Math.min(CELL, CELL - c);
      s += line(cx + x0, cy + y0, cx + x1, cy + y1, "", 0.75);
    }
    return s;
  };
  for (let i = 0; i < cfg.cells; i++) {
    const shape = one(...SHAPES);
    const filled = rnd() < 0.5;
    const body = shape
      .map(([c, r]) =>
        filled
          ? `<rect x="${c * CELL}" y="${r * CELL}" width="${CELL}" height="${CELL}" fill-opacity=".35"/>`
          : hatch(c * CELL, r * CELL),
      )
      .join("");
    // Group origin = the cluster's top-left grid point; bounding circle around its centre.
    const svg = `<g transform="translate(${-CELL} ${-CELL})">${body}</g>`;
    tryPlace(() => ({ x: snap(CELL, W) + CELL, y: snap(CELL, H) + CELL, r: 60, svg, kind: "cells", accent: i % 4 === 1, op: filled ? [0.45, 0.6] : [0.5, 0.7] }));
  }

  // Coordinate labels at some major intersections: column letter + row ("C7") or x/y.
  for (let i = 0; i < cfg.coords; i++) {
    const useXY = rnd() < 0.4;
    tryPlace(() => {
      const x = snap(MAJOR, W);
      const y = snap(MAJOR, H);
      const text = useXY ? `x:${x} y:${y}` : `${String.fromCharCode(65 + x / MAJOR)}${y / MAJOR + 1}`;
      const svg = dot(0, 0, 1.25) + label(5, -4, text, "start", 7);
      return { x, y, r: useXY ? 34 : 18, svg, kind: "coord", op: [0.4, 0.55] };
    });
  }

  // Standalone node dots on major intersections.
  for (let i = 0; i < cfg.nodes; i++) {
    const svg = rnd() < 0.6 ? dot(0, 0, 2.25) : circle(3, "", 1) + dot(0, 0, 1);
    tryPlace(() => ({ x: snap(MAJOR, W), y: snap(MAJOR, H), r: 8, svg, kind: "node" }));
  }

  // Small fillers on intersections.
  for (let i = 0; i < cfg.fillers; i++) {
    const kind = pick([["dot", 5], ["ring", 3], ["ticks", 2], ["dots3", 2]]);
    const svg =
      kind === "dot"
        ? dot(0, 0, one(1, 1.5, 2))
        : kind === "ring"
          ? circle(one(2.5, 3.5), "", 0.75)
          : kind === "ticks"
            ? line(-4, -4, 4, 4, "", 0.75) + line(2, -6, 8, 0, "", 0.75)
            : dot(-6, 0, 1) + dot(0, 0, 1) + dot(6, 0, 1);
    tryPlace(() => ({ x: snap(CELL, W), y: snap(CELL, H), r: 8, svg, kind: "filler", op: [0.4, 0.7] }), 2000);
  }

  // ---------- Output ----------
  const copies = (x, y, reach) => {
    const xs = [x, ...(x < reach ? [x + W] : x > W - reach ? [x - W] : [])];
    const ys = [y, ...(y < reach ? [y + H] : y > H - reach ? [y - H] : [])];
    return xs.flatMap((cx) => ys.map((cy) => [cx, cy]));
  };
  const out = { neutral: [], accent: [] };
  for (const it of items) {
    const [lo, hi] = it.op || (it.kind === "figure" ? [0.55, 0.85] : [0.6, 0.8]);
    const o = f(between(lo, hi));
    const accent = it.kind === "cells" ? it.accent : it.kind === "coord" ? false : rnd() < cfg.accentShare;
    const el = `<g opacity="${o}">${copies(it.x, it.y, it.r + 12)
      .map(([cx, cy]) => `<g transform="translate(${f(cx)} ${f(cy)})">${it.svg}</g>`)
      .join("")}</g>`;
    (accent ? out.accent : out.neutral).push(el);
  }
  // translate(.5 .5): 1px strokes on grid coordinates then cover exactly the same pixel as the
  // CSS grid lines (which fill [x, x + 1)).
  const svg = (body) =>
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><g transform="translate(.5 .5)">${body.join("")}</g></svg>\n`;
  const count = (k) => items.filter((i) => i.kind === k).length;
  return {
    neutral: svg(out.neutral),
    accent: svg(out.accent),
    summary: `${W}×${H}: ${count("figure")} figures (${figNo} notes), ${count("coord")} coords, ${count("cells")} cell clusters, ${count("trace")} traces, ${count("node")} nodes, ${count("ruler")} rulers, ${count("filler")} fillers; accent ${out.accent.length}/${items.length} (${Math.round((out.accent.length / items.length) * 100)}%)`,
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
