import { useRef, useEffect, useCallback } from "react";

const CFG = {
  gap: 30, dotR: 1.5, dotRMax: 3, baseAlpha: 0.15, maxAlpha: 0.9,
  radius: 120, force: 30, spring: 0.08, breathAmp: 2, breathSpd: 0.001,
  cursorR: 4, ringR: 20, ringSpring: 0.12,
  accent: [255, 51, 102], // #ff3366
  rippleDur: 600, waveDur: 900, waveCount: 3,
};

const MagneticCursorField = () => {
  const ref = useRef(null);
  const S = useRef({
    dots: [], mouse: [-9999, -9999], lerped: [-9999, -9999],
    inside: false, ripple: null, waves: [], id: 0, dpr: 1, w: 0, h: 0, dark: false,
  });

  const build = useCallback((w, h) => {
    const cols = Math.floor(w / CFG.gap) + 1, rows = Math.floor(h / CFG.gap) + 1;
    const ox = (w - (cols - 1) * CFG.gap) / 2, oy = (h - (rows - 1) * CFG.gap) / 2;
    const dots = new Array(cols * rows);
    for (let r = 0, i = 0; r < rows; r++)
      for (let c = 0; c < cols; c++, i++) {
        const x = ox + c * CFG.gap, y = oy + r * CFG.gap;
        dots[i] = { ox: x, oy: y, x, y, i };
      }
    return dots;
  }, []);

  const resize = useCallback(() => {
    const cvs = ref.current; if (!cvs) return;
    const s = S.current, rect = cvs.parentElement.getBoundingClientRect();
    s.dpr = Math.min(devicePixelRatio || 1, 2);
    s.w = rect.width; s.h = rect.height;
    cvs.width = s.w * s.dpr; cvs.height = s.h * s.dpr;
    cvs.style.width = s.w + "px"; cvs.style.height = s.h + "px";
    s.dots = build(s.w, s.h);
  }, [build]);

  const loop = useCallback((t) => {
    const s = S.current, cvs = ref.current; if (!cvs) return;
    const ctx = cvs.getContext("2d");
    ctx.setTransform(s.dpr, 0, 0, s.dpr, 0, 0);
    ctx.clearRect(0, 0, s.w, s.h);

    s.dark = document.documentElement.classList.contains("dark");
    const [ar, ag, ab] = CFG.accent;
    const br = s.dark ? 255 : 0, bg = s.dark ? 255 : 0, bb = s.dark ? 255 : 0;
    const [mx, my] = s.mouse;

    // Lerp cursor ring
    if (s.inside) {
      s.lerped[0] += (mx - s.lerped[0]) * CFG.ringSpring;
      s.lerped[1] += (my - s.lerped[1]) * CFG.ringSpring;
    }

    // Entry ripple
    if (s.ripple) {
      const p = (t - s.ripple[2]) / CFG.rippleDur;
      if (p >= 0 && p < 1) {
        const rad = p * Math.max(s.w, s.h) * 0.4;
        ctx.beginPath(); ctx.arc(s.ripple[0], s.ripple[1], rad, 0, 6.2832);
        ctx.strokeStyle = `rgba(${ar},${ag},${ab},${(1 - p) * 0.35})`;
        ctx.lineWidth = 1.5; ctx.stroke();
      } else if (p >= 1) s.ripple = null;
    }

    // Click waves
    for (let w = s.waves.length - 1; w >= 0; w--) {
      const wave = s.waves[w], p = (t - wave[2]) / CFG.waveDur;
      if (p >= 1) { s.waves.splice(w, 1); continue; }
      if (p < 0) continue;
      const maxR = Math.max(s.w, s.h) * 0.6;
      for (let n = 0; n < CFG.waveCount; n++) {
        const offset = n * 0.15; // stagger each ring
        const rp = Math.max(0, p - offset);
        if (rp <= 0 || rp >= 1) continue;
        const ease = 1 - Math.pow(1 - rp, 3); // easeOutCubic
        const rad = ease * maxR;
        const alpha = (1 - rp) * 0.3 * (1 - n * 0.25);
        ctx.beginPath(); ctx.arc(wave[0], wave[1], rad, 0, 6.2832);
        ctx.strokeStyle = `rgba(${ar},${ag},${ab},${alpha})`;
        ctx.lineWidth = 2 - n * 0.5; ctx.stroke();
      }
    }

    // Dots
    const { dots, inside } = s;
    for (let i = 0, len = dots.length; i < len; i++) {
      const d = dots[i];
      let tx = d.ox, ty = d.oy;

      if (inside) {
        const dx = d.ox - mx, dy = d.oy - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CFG.radius && dist > 0) {
          const f = (1 - dist / CFG.radius) * CFG.force;
          const a = Math.atan2(dy, dx);
          tx = d.ox + Math.cos(a) * f;
          ty = d.oy + Math.sin(a) * f;
        }
      } else {
        tx += Math.sin(t * CFG.breathSpd + d.i * 0.5) * CFG.breathAmp;
        ty += Math.cos(t * CFG.breathSpd + d.i * 0.3) * CFG.breathAmp;
      }

      // Click wave displacement — push dots outward from each active wave
      for (let w = 0; w < s.waves.length; w++) {
        const wave = s.waves[w], p = (t - wave[2]) / CFG.waveDur;
        if (p < 0 || p >= 1) continue;
        const dx = d.ox - wave[0], dy = d.oy - wave[1];
        const dist = Math.sqrt(dx * dx + dy * dy);
        const waveR = (1 - Math.pow(1 - p, 3)) * Math.max(s.w, s.h) * 0.6;
        const band = 60; // width of the displacement band
        const diff = Math.abs(dist - waveR);
        if (diff < band && dist > 0) {
          const strength = (1 - diff / band) * (1 - p) * 12;
          const a = Math.atan2(dy, dx);
          tx += Math.cos(a) * strength;
          ty += Math.sin(a) * strength;
        }
      }

      d.x += (tx - d.x) * CFG.spring;
      d.y += (ty - d.y) * CFG.spring;

      const cx = d.x - d.ox, cy = d.y - d.oy;
      const glow = Math.min(Math.sqrt(cx * cx + cy * cy) / CFG.force, 1);
      const rad = Math.max(0.1, CFG.dotR + (CFG.dotRMax - CFG.dotR) * glow);
      const alp = CFG.baseAlpha + (CFG.maxAlpha - CFG.baseAlpha) * glow;

      ctx.beginPath(); ctx.arc(d.x, d.y, rad, 0, 6.2832);
      ctx.fillStyle = `rgba(${br + (ar - br) * glow | 0},${bg + (ag - bg) * glow | 0},${bb + (ab - bb) * glow | 0},${alp})`;
      ctx.fill();
    }

    // Custom cursor
    if (inside) {
      ctx.beginPath(); ctx.arc(mx, my, CFG.cursorR, 0, 6.2832);
      ctx.fillStyle = `rgb(${ar},${ag},${ab})`; ctx.fill();
      ctx.beginPath(); ctx.arc(s.lerped[0], s.lerped[1], CFG.ringR, 0, 6.2832);
      ctx.strokeStyle = `rgba(${ar},${ag},${ab},0.3)`;
      ctx.lineWidth = 1.5; ctx.stroke();
    }

    s.id = requestAnimationFrame(loop);
  }, []);

  const pos = useCallback((e) => {
    const r = ref.current.getBoundingClientRect();
    return [e.clientX - r.left, e.clientY - r.top];
  }, []);

  const onEnter = useCallback((e) => {
    const p = pos(e), s = S.current;
    s.inside = true; s.mouse = p; s.lerped = [...p];
    s.ripple = [p[0], p[1], performance.now()];
  }, [pos]);

  const onMove = useCallback((e) => { S.current.mouse = pos(e); }, [pos]);

  const onLeave = useCallback(() => {
    S.current.inside = false; S.current.mouse = [-9999, -9999];
  }, []);

  const onClick = useCallback((e) => {
    const p = pos(e);
    S.current.waves.push([p[0], p[1], performance.now()]);
  }, [pos]);

  useEffect(() => {
    resize();
    S.current.id = requestAnimationFrame(loop);
    window.addEventListener("resize", resize);
    const obs = new MutationObserver(() => { S.current.dark = document.documentElement.classList.contains("dark"); });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => { cancelAnimationFrame(S.current.id); window.removeEventListener("resize", resize); obs.disconnect(); };
  }, [resize, loop]);

  return (
    <div
      className="md:col-start-1 md:col-span-1 md:row-start-1 md:row-span-2 border-b md:border-r border-border h-[200px] md:h-auto relative overflow-hidden"
      style={{ cursor: "none" }}
      onMouseEnter={onEnter} onMouseMove={onMove} onMouseLeave={onLeave} onClick={onClick}
    >
      <canvas ref={ref} className="absolute inset-0 w-full h-full" style={{ display: "block" }} />
      <span className="absolute bottom-2 left-3 font-mono text-[10px] text-text-muted opacity-50 uppercase tracking-widest select-none pointer-events-none">
        Magnetic Field
      </span>
    </div>
  );
};

export default MagneticCursorField;
