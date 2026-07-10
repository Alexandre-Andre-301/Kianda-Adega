import type { Wine } from '../types';
import { CORREDORES } from '../data';

export function CellarMap({ wine }: { wine: Wine }) {
  const cx = CORREDORES[wine.corredor].cx;
  const yTop = 70, yBot = 290;
  const markerY = yBot - ((wine.estante - 0.5) * ((yBot - yTop) / 5));
  const laneY = 330, kX = 300, kY = 402;

  return (
    <>
      <svg viewBox="0 0 600 440" role="img" aria-label={`Planta da adega, Corredor ${wine.corredor} destacado`}>
        <rect x={10} y={24} width={580} height={392} rx={14} fill="none" stroke="var(--line)" />
        {Object.entries(CORREDORES).map(([L, c]) => {
          const sel = L === wine.corredor;
          return (
            <g key={L}>
              <rect x={c.cx - 40} y={70} width={80} height={220} rx={7}
                fill={sel ? 'rgba(228,196,138,.16)' : 'rgba(255,255,255,.03)'}
                stroke={sel ? 'var(--gold)' : 'var(--line)'} strokeWidth={sel ? 2 : 1} />
              <text x={c.cx} y={60} textAnchor="middle" fill={sel ? 'var(--gold)' : 'var(--muted)'}
                fontFamily="Archivo,sans-serif" fontSize={15} fontWeight={700}>{L}</text>
              <text x={c.cx} y={306} textAnchor="middle"
                fill={sel ? 'var(--gold)' : 'rgba(154,143,138,.6)'}
                fontSize={8.5} fontFamily="JetBrains Mono,monospace">{c.nome}</text>
            </g>
          );
        })}
        <polyline points={`${kX},${kY} ${kX},${laneY} ${cx},${laneY} ${cx},${markerY}`}
          fill="none" stroke="var(--gold-dim)" strokeWidth={2} strokeDasharray="5 6"
          strokeLinecap="round" opacity={0.8} />
        <circle cx={kX} cy={kY} r={7} fill="var(--wine-bright)" stroke="#fff" strokeWidth={1.5} />
        <text x={kX} y={kY + 22} textAnchor="middle" fill="var(--muted)" fontSize={10}
          fontFamily="JetBrains Mono,monospace">Você está aqui</text>
        <circle cx={cx} cy={markerY} r={9} fill="var(--gold)" stroke="#4a3410" strokeWidth={1.5} />
        <circle cx={cx} cy={markerY} r={3} fill="#4a3410" />
        <text x={cx} y={markerY - 16} textAnchor="middle" fill="var(--gold)" fontSize={10.5}
          fontFamily="JetBrains Mono,monospace" fontWeight={700}>Estante {wine.estante}</text>
      </svg>
      <div className="maplegend">
        <span><i style={{ background: 'var(--gold)' }} />Vinho</span>
        <span><i style={{ background: 'var(--wine-bright)' }} />Você está aqui</span>
        <span><i style={{ background: 'rgba(228,196,138,.4)' }} />Corredor destacado</span>
      </div>
    </>
  );
}