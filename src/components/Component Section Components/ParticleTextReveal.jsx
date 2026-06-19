import { useRef, useEffect, useCallback } from "react";

const CFG = {
  maxParticles: 6000, spring: 0.06, lockDist: 1.5, stagger: 800,
  shimmerInterval: 3000, shimmerWidth: 80, shimmerSpeed: 400,
  explodeVx: 5, explodeVyMin: -8, explodeVyMax: 2, gravity: 0.15,
  accent: [255, 51, 102], shockDur: 600, shockMaxR: 600,
};

const ParticleTextReveal = () => {
  const ref = useRef(null);
  const S = useRef({
    particles: [], id: 0, dpr: 1, w: 0, h: 0, dark: false,
    triggered: false, allLocked: false, lockTime: 0,
    shock: null, shimmerStart: 0, hovering: false, exploded: false,
  });

  const sampleText = useCallback((w, h) => {
    // Use a fixed-size offscreen canvas for consistent sampling
    const sw = Math.round(w), sh = Math.round(h);
    const off = document.createElement("canvas");
    off.width = sw; off.height = sh;
    const ctx = off.getContext("2d", { willReadFrequently: true });

    // Font sized to fit width, capped for height
    const fontSize = Math.min(Math.floor(sw / 7), Math.floor(sh / 3), 65);
    ctx.font = `900 ${fontSize}px Inter, system-ui, sans-serif`;
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillStyle = "#fff";

    const lineH = fontSize * 1.1;
    const totalH = lineH * 2;
    const startY = (sh - totalH) / 2 + fontSize * 0.5;
    ctx.fillText("COMPONENT", sw / 2, startY);
    ctx.fillText("LABS", sw / 2, startY + lineH);

    const data = ctx.getImageData(0, 0, sw, sh).data;
    const all = [];
    for (let y = 0; y < sh; y++)
      for (let x = 0; x < sw; x++)
        if (data[(y * sw + x) * 4 + 3] > 128) all.push([x, y]);

    // Downsample if too many
    if (all.length <= CFG.maxParticles) return all;
    const step = Math.ceil(all.length / CFG.maxParticles);
    const sampled = [];
    for (let i = 0; i < all.length; i += step) sampled.push(all[i]);
    return sampled;
  }, []);

  const init = useCallback((w, h) => {
    const targets = sampleText(w, h);
    const particles = new Array(targets.length);
    for (let i = 0; i < targets.length; i++) {
      const rnd = Math.random();
      const type = rnd < 0.7 ? 0 : rnd < 0.9 ? 1 : 2;
      const sx = Math.random() * (w + 400) - 200;
      const sy = Math.random() * (h + 400) - 200;
      particles[i] = {
        x: sx, y: sy, px: sx, py: sy,
        tx: targets[i][0], ty: targets[i][1],
        vx: 0, vy: 0,
        delay: Math.random() * CFG.stagger,
        locked: false, lockT: 0, pulse: 0,
        size: 0.8 + Math.random() * 1.5,
        baseSize: type === 1 ? 2.5 : 1.4,
        type, alpha: Math.random() * 0.25,
      };
    }
    return particles;
  }, [sampleText]);

  const resize = useCallback(() => {
    const cvs = ref.current; if (!cvs) return;
    const s = S.current, rect = cvs.parentElement.getBoundingClientRect();
    s.dpr = Math.min(devicePixelRatio || 1, 2);
    s.w = rect.width; s.h = rect.height;
    cvs.width = s.w * s.dpr; cvs.height = s.h * s.dpr;
    cvs.style.width = s.w + "px"; cvs.style.height = s.h + "px";
    s.particles = init(s.w, s.h);
    s.triggered = false; s.allLocked = false; s.exploded = false;
  }, [init]);

  const loop = useCallback((t) => {
    const s = S.current, cvs = ref.current; if (!cvs) return;
    const ctx = cvs.getContext("2d");
    ctx.setTransform(s.dpr, 0, 0, s.dpr, 0, 0);
    ctx.clearRect(0, 0, s.w, s.h);

    s.dark = document.documentElement.classList.contains("dark");
    const [ar, ag, ab] = CFG.accent;
    const { particles, triggered, exploded } = s;
    let unlockedCount = 0;

    for (let i = 0, len = particles.length; i < len; i++) {
      const p = particles[i];
      p.px = p.x; p.py = p.y;

      if (exploded) {
        p.x += p.vx; p.y += p.vy; p.vy += CFG.gravity;
        p.alpha = Math.max(0, p.alpha - 0.003);
      } else if (triggered && !p.locked) {
        const elapsed = t - s.triggerTime - p.delay;
        if (elapsed > 0) {
          p.x += (p.tx - p.x) * CFG.spring;
          p.y += (p.ty - p.y) * CFG.spring;
          p.alpha = Math.min(1, p.alpha + 0.02);
          const dx = p.tx - p.x, dy = p.ty - p.y;
          if (dx * dx + dy * dy < CFG.lockDist * CFG.lockDist) {
            p.x = p.tx; p.y = p.ty; p.locked = true;
            p.lockT = t; p.pulse = 1; p.alpha = 1;
          }
        }
        if (!p.locked) unlockedCount++;
      } else if (!triggered) {
        p.x += Math.sin(t * 0.0005 + i * 0.3) * 0.15;
        p.y += Math.cos(t * 0.0005 + i * 0.2) * 0.15;
      }

      if (p.pulse > 0) p.pulse *= 0.9;

      // Shimmer
      let shimmer = 0;
      if (s.allLocked && !exploded && p.locked) {
        const se = (t - s.shimmerStart) % CFG.shimmerInterval;
        const sx = (se / CFG.shimmerSpeed) * s.w - CFG.shimmerWidth;
        if (p.tx > sx && p.tx < sx + CFG.shimmerWidth)
          shimmer = 1 - Math.abs(p.tx - sx - CFG.shimmerWidth / 2) / (CFG.shimmerWidth / 2);
      }

      const sizeMult = 1 + p.pulse * 0.8 + shimmer * 0.4;
      const sz = (p.locked ? p.baseSize : p.size) * sizeMult;
      let cr, cg, cb, ca;

      if (p.type === 0) {
        const lp = p.locked ? Math.min((t - p.lockT) / 300, 1) : 0;
        const tw = s.dark ? 255 : 220;
        cr = ar + (tw - ar) * lp + shimmer * 40 | 0;
        cg = ag + (tw - ag) * lp + shimmer * 20 | 0;
        cb = ab + (tw - ab) * lp + shimmer * 20 | 0;
      } else {
        cr = ar; cg = ag; cb = ab;
      }
      ca = p.type === 2 ? p.alpha * 0.5 : p.alpha;
      ca += shimmer * 0.4;
      cr = Math.min(255, Math.max(0, cr));
      cg = Math.min(255, Math.max(0, cg));
      cb = Math.min(255, Math.max(0, cb));

      if (ca < 0.01 || p.x < -30 || p.x > s.w + 30 || p.y < -30 || p.y > s.h + 30) continue;

      // Motion trail line from previous to current
      const tdx = p.x - p.px, tdy = p.y - p.py;
      if (tdx * tdx + tdy * tdy > 2 && !p.locked) {
        ctx.beginPath(); ctx.moveTo(p.px, p.py); ctx.lineTo(p.x, p.y);
        ctx.strokeStyle = `rgba(${cr},${cg},${cb},${ca * 0.25})`;
        ctx.lineWidth = Math.max(0.3, sz * 0.5); ctx.stroke();
      }

      ctx.beginPath(); ctx.arc(p.x, p.y, Math.max(0.1, sz), 0, 6.2832);
      ctx.fillStyle = `rgba(${cr},${cg},${cb},${Math.min(1, ca)})`;
      ctx.fill();
    }

    // All-locked check
    if (triggered && !s.allLocked && !exploded && unlockedCount === 0) {
      let ok = true;
      for (let i = 0; i < particles.length; i++) if (!particles[i].locked) { ok = false; break; }
      if (ok) {
        s.allLocked = true; s.lockTime = t;
        s.shock = [s.w / 2, s.h / 2, t];
        s.shimmerStart = t + 500;
      }
    }

    // Shockwave
    if (s.shock) {
      const prog = (t - s.shock[2]) / CFG.shockDur;
      if (prog >= 0 && prog < 1) {
        ctx.beginPath(); ctx.arc(s.shock[0], s.shock[1], prog * CFG.shockMaxR, 0, 6.2832);
        ctx.strokeStyle = `rgba(${ar},${ag},${ab},${(1 - prog) * 0.8})`;
        ctx.lineWidth = 2; ctx.stroke();
      } else if (prog >= 1) s.shock = null;
    }

    s.id = requestAnimationFrame(loop);
  }, []);

  useEffect(() => {
    const el = ref.current?.parentElement; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !S.current.triggered && !S.current.exploded) {
        S.current.triggered = true;
        S.current.triggerTime = performance.now();
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    resize();
    S.current.id = requestAnimationFrame(loop);
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(S.current.id); window.removeEventListener("resize", resize); };
  }, [resize, loop]);

  const onEnter = useCallback(() => {
    const s = S.current;
    if (!s.allLocked) return;
    s.hovering = true; s.exploded = true; s.allLocked = false;
    for (let i = 0; i < s.particles.length; i++) {
      const p = s.particles[i];
      p.locked = false; p.pulse = 0;
      p.vx = (Math.random() - 0.5) * CFG.explodeVx * 2;
      p.vy = CFG.explodeVyMin + Math.random() * (CFG.explodeVyMax - CFG.explodeVyMin);
      p.alpha = 0.9;
    }
  }, []);

  const onLeave = useCallback(() => {
    const s = S.current;
    s.hovering = false;
    if (!s.exploded) return;
    s.exploded = false; s.triggered = true;
    s.triggerTime = performance.now();
    for (let i = 0; i < s.particles.length; i++) {
      const p = s.particles[i];
      p.locked = false; p.vx = 0; p.vy = 0; p.alpha = 0.3;
      if (p.x < -20 || p.x > s.w + 20 || p.y < -20 || p.y > s.h + 20) {
        const e = Math.random() * 4 | 0;
        if (e === 0) { p.x = -10; p.y = Math.random() * s.h; }
        else if (e === 1) { p.x = s.w + 10; p.y = Math.random() * s.h; }
        else if (e === 2) { p.x = Math.random() * s.w; p.y = -10; }
        else { p.x = Math.random() * s.w; p.y = s.h + 10; }
      }
    }
  }, []);

  return (
    <div
      className="md:col-start-2 md:col-span-1 md:row-start-2 md:row-span-2 border-b md:border-r border-border h-[200px] md:h-auto relative overflow-hidden"
      onMouseEnter={onEnter} onMouseLeave={onLeave}
    >
      <canvas ref={ref} className="absolute inset-0 w-full h-full" style={{ display: "block" }} />
      <span className="absolute bottom-2 left-3 font-mono text-[10px] text-text-muted opacity-50 uppercase tracking-widest select-none pointer-events-none">
        Particle Text
      </span>
    </div>
  );
};

export default ParticleTextReveal;
