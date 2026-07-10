import { useId } from 'react';
import type { Wine } from '../types';
import { GLOW } from '../data';

export function Bottle({ wine }: { wine: Wine }) {
  const uid = useId().replace(/:/g, '');
  const g = GLOW[wine.tipo] ?? '#7a1522';
  return (
    <svg viewBox="0 0 160 200" preserveAspectRatio="xMidYMid slice"
      role="img" aria-label={`Garrafa de ${wine.nome}`}>
      <defs>
        <radialGradient id={`glow${uid}`} cx="50%" cy="42%" r="46%">
          <stop offset="0%" stopColor={g} stopOpacity={0.7} />
          <stop offset="60%" stopColor={g} stopOpacity={0.14} />
          <stop offset="100%" stopColor={g} stopOpacity={0} />
        </radialGradient>
      </defs>
      <rect width={160} height={200} fill="#0a0808" />
      <ellipse cx={80} cy={96} rx={58} ry={74} fill={`url(#glow${uid})`} />
      <rect x={72} y={30} width={16} height={26} rx={3} fill="#120c0b" />
      <rect x={70} y={52} width={20} height={10} rx={2} fill="#0d0908" />
      <path d="M67 60 q0 8 -6 18 q-4 8 -4 20 v54 a8 8 0 0 0 8 8 h30 a8 8 0 0 0 8 -8 v-54 q0-12 -4-20 q-6-10 -6-18 z"
        fill="#181110" stroke="#000" strokeWidth={1} />
      <path d="M67 60 q0 8 -6 18 q-2 4 -3 9 l7 2 q1-6 4-11 q4-8 4-14 z" fill="#2a1e1c" opacity={0.7} />
      <rect x={60} y={118} width={40} height={40} rx={2} fill="#ece0c6" />
      <rect x={60} y={118} width={40} height={10} fill="#d9caa4" />
      <rect x={66} y={133} width={28} height={3} rx={1.5} fill="#9a8a63" />
      <rect x={66} y={140} width={20} height={2.4} rx={1.2} fill="#b6a884" />
    </svg>
  );
}