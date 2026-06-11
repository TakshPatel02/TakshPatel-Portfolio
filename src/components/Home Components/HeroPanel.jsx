import { motion } from "framer-motion";

// ── Isometric projection constants ──
const CELL = 52;
const DEPTH = 32;
const COS30 = Math.cos(Math.PI / 6);
const SIN30 = 0.5;

// Grid (col, row) → Screen (x, y)
// col-axis → upper-right, row-axis → lower-right
const px = (c, r) => (c + r) * CELL * COS30;
const py = (c, r) => (r - c) * CELL * SIN30;
const pt = (c, r) => ({ x: px(c, r), y: py(c, r) });

// ── Letter grids [row, col] 0-indexed ──
const T_CELLS = [
  [0, 0], [0, 1], [0, 2], [0, 3], [0, 4],
  [1, 2], [2, 2], [3, 2], [4, 2],
];

const P_CELLS = [
  [0, 0], [0, 1], [0, 2],
  [1, 0],         [1, 3],
  [2, 0], [2, 1], [2, 2],
  [3, 0], [4, 0],
];

const P_OFF = 6;

const has = (cells, r, c) => cells.some(([row, col]) => row === r && col === c);

// ── Combine all cells for complete scene-wide occlusion checking ──
const getActiveBlocks = () => {
  const blocks = [];
  for (const [r, c] of T_CELLS) {
    blocks.push([r, c]);
  }
  for (const [r, c] of P_CELLS) {
    blocks.push([r, c + P_OFF]);
  }
  return blocks;
};

const activeBlocks = getActiveBlocks();

// ── Occlusion detection: returns true if the grid point (gc, gr, gz) is blocked by any solid cell ──
const isPointBlocked = (gc, gr, gz) => {
  for (const [cr, cc] of activeBlocks) {
    // Intersect the ray from the point towards the camera with the cell C.
    // Ray(t) = (gc - t, gr + t, gz - t * CELL)
    // Cell covers: [cc, cc + 1] x [cr, cr + 1] x [0, DEPTH]
    const t_min = Math.max(gc - cc - 1, cr - gr, (gz - DEPTH) / CELL);
    const t_max = Math.min(gc - cc, cr - gr + 1, gz / CELL);
    if (t_min + 0.001 < t_max && t_max > 0.001) {
      return true;
    }
  }
  return false;
};

// ── Segmented line rendering to handle partial occlusion ──
const renderSegmentedLine = (gc1, gr1, gz1, gc2, gr2, gz2, className, keyPrefix) => {
  const segments = [];
  const steps = 4;
  for (let i = 0; i < steps; i++) {
    const t1 = i / steps;
    const t2 = (i + 1) / steps;
    
    const c1 = gc1 + (gc2 - gc1) * t1;
    const r1 = gr1 + (gr2 - gr1) * t1;
    const z1 = gz1 + (gz2 - gz1) * t1;
    
    const c2 = gc1 + (gc2 - gc1) * t2;
    const r2 = gr1 + (gr2 - gr1) * t2;
    const z2 = gz1 + (gz2 - gz1) * t2;
    
    const midC = (c1 + c2) / 2;
    const midR = (r1 + r2) / 2;
    const midZ = (z1 + z2) / 2;
    
    if (!isPointBlocked(midC, midR, midZ)) {
      const p1 = pt(c1, r1);
      const p2 = pt(c2, r2);
      segments.push(
        <line
          key={`${keyPrefix}-${i}`}
          x1={p1.x}
          y1={p1.y + z1}
          x2={p2.x}
          y2={p2.y + z2}
          className={className}
        />
      );
    }
  }
  return segments;
};

// ── Outline: only boundary edges classified as visible/hidden side faces ──
const getOutline = (cells, off = 0) => {
  const edges = [];
  for (const [r, c] of cells) {
    const gc = c + off;
    // Top-left
    if (!has(cells, r - 1, c))
      edges.push({ a: pt(gc, r), b: pt(gc + 1, r), ga: [gc, r], gb: [gc + 1, r], d: "c", visible: false });
    // Top-right
    if (!has(cells, r, c + 1))
      edges.push({ a: pt(gc + 1, r), b: pt(gc + 1, r + 1), ga: [gc + 1, r], gb: [gc + 1, r + 1], d: "r", visible: false });
    // Bottom-right
    if (!has(cells, r + 1, c))
      edges.push({ a: pt(gc, r + 1), b: pt(gc + 1, r + 1), ga: [gc, r + 1], gb: [gc + 1, r + 1], d: "c", visible: true });
    // Bottom-left
    if (!has(cells, r, c - 1))
      edges.push({ a: pt(gc, r), b: pt(gc, r + 1), ga: [gc, r], gb: [gc, r + 1], d: "r", visible: true });
  }
  return edges;
};

// ── Corner vertices: only where outline changes direction and is connected to a visible edge ──
const getVisibleCorners = (edges) => {
  const m = new Map();
  for (const { ga, gb, d } of edges) {
    const k1 = ga.join(","), k2 = gb.join(",");
    if (!m.has(k1)) m.set(k1, { dirs: new Set(), g: ga, key: k1 });
    if (!m.has(k2)) m.set(k2, { dirs: new Set(), g: gb, key: k2 });
    m.get(k1).dirs.add(d);
    m.get(k2).dirs.add(d);
  }
  const corners = [...m.values()].filter((v) => v.dirs.size > 1);

  // We only want corner vertices that are connected to at least one visible edge
  const visibleEdges = edges.filter(e => e.visible);
  const visibleKeys = new Set();
  for (const { ga, gb } of visibleEdges) {
    visibleKeys.add(ga.join(","));
    visibleKeys.add(gb.join(","));
  }

  return corners.filter(c => visibleKeys.has(c.key)).map(c => c.g);
};

// ── Hatching per cell (merges visually across same-row cells) ──
const Hatch = ({ r, c, off = 0 }) => {
  const gc = c + off;
  const tl = pt(gc, r), tr = pt(gc + 1, r);
  const bl = pt(gc, r + 1), br = pt(gc + 1, r + 1);
  const N = 6;
  return Array.from({ length: N }, (_, i) => {
    const t = (i + 1) / (N + 1);
    return (
      <line key={i}
        x1={tl.x + (bl.x - tl.x) * t} y1={tl.y + (bl.y - tl.y) * t}
        x2={tr.x + (br.x - tr.x) * t} y2={tr.y + (br.y - tr.y) * t}
        className="iso-hatch"
      />
    );
  });
};

// ── Wireframe letter (no page load animation, only visible 3D lines) ──
const Letter = ({ cells, off = 0 }) => {
  const edges = getOutline(cells, off);
  const verts = getVisibleCorners(edges);

  return (
    <g>
      {/* Floor outline (bottom of extrusion for visible sides only) */}
      {edges.filter(e => e.visible).map(({ ga, gb }, i) => (
        renderSegmentedLine(ga[0], ga[1], DEPTH, gb[0], gb[1], DEPTH, "iso-face-left", `f-${i}`)
      ))}
      {/* Vertical drops at visible corners only */}
      {verts.map(([gc, gr], i) => (
        renderSegmentedLine(gc, gr, 0, gc, gr, DEPTH, "iso-face-right", `d-${i}`)
      ))}
      {/* Top face outline (all outer edges of top faces are visible) */}
      {edges.map(({ a, b }, i) => (
        <line key={`t${i}`}
          x1={a.x} y1={a.y} x2={b.x} y2={b.y}
          className="iso-face-top"
        />
      ))}
      {/* Top face hatching */}
      {cells.map(([r, c], i) => (
        <Hatch key={`h${i}`} r={r} c={c} off={off} />
      ))}
    </g>
  );
};

// ── Guide / construction lines ──
const Guides = ({ cx, cy, span }) => {
  const len = span * 0.55;
  const lines = [];

  for (let i = -3; i <= 3; i++) {
    const oy = i * 70;
    lines.push(
      <line key={`a${i}`}
        x1={cx - len * COS30} y1={cy + oy + len * SIN30}
        x2={cx + len * COS30} y2={cy + oy - len * SIN30}
        className="iso-guide"
      />
    );
    lines.push(
      <line key={`b${i}`}
        x1={cx - len * COS30} y1={cy + oy - len * SIN30}
        x2={cx + len * COS30} y2={cy + oy + len * SIN30}
        className="iso-guide"
      />
    );
  }

  for (let i = -2; i <= 2; i++) {
    lines.push(
      <line key={`v${i}`}
        x1={cx + i * 160} y1={cy - len * 0.7}
        x2={cx + i * 160} y2={cy + len * 0.7}
        className="iso-guide"
      />
    );
  }

  return <g opacity="0.45">{lines}</g>;
};

// ── Compute viewBox from letter bounds ──
const computeBounds = () => {
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  const scan = (cells, off) => {
    for (const [r, c] of cells) {
      for (const [dc, dr] of [[0, 0], [1, 0], [1, 1], [0, 1]]) {
        const x = px(c + off + dc, r + dr);
        const y = py(c + off + dc, r + dr);
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y + DEPTH > maxY) maxY = y + DEPTH;
      }
    }
  };
  scan(T_CELLS, 0);
  scan(P_CELLS, P_OFF);
  return { minX, maxX, minY, maxY };
};

const { minX, maxX, minY, maxY } = computeBounds();
const PAD = 55;
const VBX = minX - PAD;
const VBY = minY - PAD;
const VBW = maxX - minX + PAD * 2;
const VBH = maxY - minY + PAD * 2;
const CX = (minX + maxX) / 2;
const CY = (minY + maxY) / 2;

// ── FlipLink animation ──
const DURATION = 0.25;
const STAGGER = 0.025;

const FlipLink = ({ children }) => (
  <motion.div
    initial="initial"
    whileHover="hovered"
    className="relative block overflow-hidden whitespace-nowrap text-xl font-bold sm:text-2xl lg:text-4xl"
    style={{ lineHeight: 0.75 }}
  >
    <div>
      {children.split("").map((l, i) => (
        <motion.span
          key={i}
          variants={{ initial: { y: 0 }, hovered: { y: "-100%" } }}
          transition={{ duration: DURATION, ease: "easeInOut", delay: STAGGER * i }}
          className="inline-block"
        >
          {l === " " ? "\u00A0" : l}
        </motion.span>
      ))}
    </div>
    <div className="absolute inset-0">
      {children.split("").map((l, i) => (
        <motion.span
          key={i}
          variants={{ initial: { y: "100%" }, hovered: { y: 0 } }}
          transition={{ duration: DURATION, ease: "easeInOut", delay: STAGGER * i }}
          className="inline-block"
        >
          {l === " " ? "\u00A0" : l}
        </motion.span>
      ))}
    </div>
  </motion.div>
);

// ── Combined Hero Panel + Info Card ──
const HeroPanel = () => {
  return (
    <div className="w-full border-b border-border">
      <section className="mx-auto w-full max-w-4xl px-4 sm:px-6">
        <div className="border-x border-border bg-bg-card">
          
          {/* Hero area with isometric TP logo (letters shifted up by transform to sit above the overlapping avatar) */}
          <div
            className="relative grid place-items-center overflow-hidden"
            style={{ height: "clamp(300px, 48vh, 460px)" }}
          >
            <svg
              viewBox={`${VBX} ${VBY} ${VBW} ${VBH}`}
              className="w-full h-full"
              preserveAspectRatio="xMidYMid meet"
              xmlns="http://www.w3.org/2000/svg"
            >
              <Guides cx={CX} cy={CY} span={Math.max(VBW, VBH)} />
              <g transform="translate(0, -38)">
                <Letter cells={T_CELLS} off={0} />
                <Letter cells={P_CELLS} off={P_OFF} />
              </g>
              <text
                x={maxX + 10}
                y={maxY - 43}
                className="iso-fig-label"
                opacity="0.6"
              >
                FIG. 01
              </text>
            </svg>
          </div>

          {/* Info card — avatar overlaps into hero exactly as originally designed */}
          <div className="flex items-start border-border">
            <div
              className="border-r border-border flex-shrink-0"
              style={{ marginTop: "-40px", position: "relative", zIndex: 10 }}
            >
              <img
                src="https://res.cloudinary.com/portfolioblog/image/upload/v1772124137/ghibli_by7gu7.webp"
                alt="Taksh Patel"
                fetchPriority="high"
                className="h-[125px] w-[125px] rounded-full border border-border object-cover sm:h-[150px] sm:w-[150px]"
              />
            </div>
            <div className="flex flex-1 flex-col mt-4 sm:mt-6">
              <div className="flex items-center gap-2 border-y border-border">
                <h2 className="font-display text-lg font-bold text-text-primary sm:text-2xl lg:text-4xl py-2">
                  <FlipLink>Taksh Patel</FlipLink>
                </h2>
              </div>
              <p className="text-sm leading-relaxed text-text-secondary sm:text-base py-2">
                Creating with code. Small details matter.
              </p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default HeroPanel;
