import { useEffect, useRef } from 'react';

function Cluster() {
  return (
    <svg viewBox="0 0 200 220" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M100 78 C100 58 96 46 108 34" strokeLinecap="round" />
      <path d="M108 34 C124 24 146 28 150 44 C136 50 118 50 108 40 Z" />
      <path d="M112 40 L146 42 M118 36 L138 33" strokeWidth={1.2} opacity={0.7} />
      {[
        [64, 88], [90, 88], [116, 88], [142, 88],
        [77, 112], [103, 112], [129, 112],
        [77, 136], [103, 136], [129, 136],
        [90, 160], [116, 160],
        [103, 184],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r={13} />
      ))}
    </svg>
  );
}

export function GrapeBackground() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduz = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduz) return; // respeita quem desliga animações

    let mx = 0, my = 0, sy = 0;      // alvos
    let cx = 0, cy = 0, cs = 0;      // valores atuais (suavizados)
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2;   // -1..1
      my = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    const onScroll = () => { sy = window.scrollY; };

    const layers = Array.from(el.querySelectorAll<HTMLElement>('.grape'));
    const depth = [22, 40, 14];       // quanto cada camada reage ao rato (px)
    const par = [0.12, 0.20, 0.06];   // quanto reage ao scroll

    const tick = () => {
      cx += (mx - cx) * 0.06;         // suavização (inércia)
      cy += (my - cy) * 0.06;
      cs += (sy - cs) * 0.10;
      layers.forEach((l, i) => {
        const dx = cx * (depth[i] ?? 20);
        const dy = cy * (depth[i] ?? 20) - cs * (par[i] ?? 0.1);
        const rot = l.dataset.rot ?? '0';
        l.style.transform = `translate3d(${dx}px, ${dy}px, 0) rotate(${rot}deg)`;
      });
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div className="grape-bg" aria-hidden="true" ref={ref}>
      <div className="grape g1" data-rot="14"><Cluster /></div>
      <div className="grape g2" data-rot="-10"><Cluster /></div>
      <div className="grape g3" data-rot="6"><Cluster /></div>
    </div>
  );
}