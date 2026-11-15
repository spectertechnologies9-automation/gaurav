import { seeded } from '../lib/cx.js';

/**
 * Generated abstract technical artwork per project motif.
 * Pure SVG, no assets. `anim` / `anim2` classes get hover motion from CSS.
 */
const K = '#111';
const W = '#fff';

function Motif({ art, id }) {
  const r = seeded(id);
  switch (art) {
    case 'wave': {
      const bars = Array.from({ length: 22 }, (_, i) => 8 + r() * 56 * Math.abs(Math.sin(i / 3.2)) + 6);
      return (
        <g className="anim">
          {bars.map((h, i) => (
            <rect key={i} x={20 + i * 15} y={56 - h / 2} width="9" height={h} fill={i % 3 ? K : W} stroke={K} strokeWidth="2" />
          ))}
        </g>
      );
    }
    case 'bars':
      return (
        <g className="anim">
          {[30, 52, 40, 68, 56, 80].map((h, i) => (
            <rect key={i} x={30 + i * 52} y={104 - h} width="38" height={h} fill={[W, K, '#FFE500', '#FF55A5', W, K][i]} stroke={K} strokeWidth="3" />
          ))}
          <path className="anim2" d="M20 80 L90 56 L150 64 L230 30 L330 18" stroke={K} strokeWidth="4" fill="none" />
        </g>
      );
    case 'grid':
      return (
        <g className="anim">
          {Array.from({ length: 24 }, (_, i) => (
            <rect key={i} x={24 + (i % 8) * 40} y={10 + Math.floor(i / 8) * 32} width="32" height="24" fill={r() > 0.55 ? K : r() > 0.5 ? W : '#FFE500'} stroke={K} strokeWidth="2.5" />
          ))}
        </g>
      );
    case 'nodes': {
      const pts = Array.from({ length: 8 }, () => [30 + r() * 300, 16 + r() * 80]);
      return (
        <g className="anim">
          {pts.map((a, i) => pts.slice(i + 1, i + 3).map((b, j) => <line key={`${i}-${j}`} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={K} strokeWidth="2.5" />))}
          {pts.map((a, i) => (
            <circle key={i} cx={a[0]} cy={a[1]} r={i % 3 ? 9 : 14} fill={i % 3 ? W : '#FF55A5'} stroke={K} strokeWidth="3" />
          ))}
        </g>
      );
    }
    case 'chat':
      return (
        <g className="anim">
          <rect x="30" y="14" width="150" height="34" fill={W} stroke={K} strokeWidth="3" />
          <rect x="170" y="60" width="150" height="34" fill="#73F5C0" stroke={K} strokeWidth="3" />
          <rect className="anim2" x="46" y="26" width="90" height="8" fill={K} />
          <rect className="anim2" x="186" y="72" width="100" height="8" fill={K} />
          <path d="M44 48 L44 62 L62 48" fill={W} stroke={K} strokeWidth="3" />
        </g>
      );
    case 'nfc':
      return (
        <g className="anim">
          <rect x="140" y="22" width="130" height="80" fill={W} stroke={K} strokeWidth="3.5" transform="rotate(-8 205 62)" />
          {[18, 32, 46].map((s, i) => (
            <path key={i} className="anim2" d={`M${96 - s * 0.2} ${62 - s} A${s} ${s} 0 0 1 ${96 - s * 0.2} ${62 + s}`} stroke={K} strokeWidth="5" fill="none" strokeLinecap="round" />
          ))}
          <circle cx="205" cy="62" r="12" fill="#FF55A5" stroke={K} strokeWidth="3" />
        </g>
      );
    case 'flow':
      return (
        <g className="anim">
          {[
            [30, 14],
            [150, 14],
            [270, 14],
            [90, 70],
            [210, 70],
          ].map(([x, y], i) => (
            <rect key={i} x={x} y={y} width="60" height="30" fill={i % 2 ? '#FFE500' : W} stroke={K} strokeWidth="3" />
          ))}
          <path d="M90 29 H150 M210 29 H270 M60 44 L100 70 M300 44 L260 70" stroke={K} strokeWidth="3" fill="none" />
        </g>
      );
    case 'stars':
      return (
        <g className="anim">
          {[0, 1, 2, 3, 4].map((i) => (
            <path key={i} transform={`translate(${50 + i * 60} 56)`} d="M0 -22 L6 -7 L22 -6 L10 4 L14 20 L0 11 L-14 20 L-10 4 L-22 -6 L-6 -7Z" fill={i < 4 ? '#FFE500' : W} stroke={K} strokeWidth="3" />
          ))}
        </g>
      );
    case 'dash':
      return (
        <g className="anim">
          <rect x="24" y="10" width="312" height="92" fill={W} stroke={K} strokeWidth="3" />
          <rect x="24" y="10" width="60" height="92" fill={K} />
          {[0, 1, 2].map((i) => (
            <rect key={i} x={100 + i * 76} y="24" width="64" height="26" fill={['#FF55A5', '#76E5F5', '#FFE500'][i]} stroke={K} strokeWidth="2.5" />
          ))}
          <path className="anim2" d="M100 90 L150 72 L200 80 L250 62 L320 70" stroke={K} strokeWidth="3.5" fill="none" />
        </g>
      );
    case 'receipt':
      return (
        <g className="anim">
          <path d="M120 6 H240 V104 L225 96 L210 104 L195 96 L180 104 L165 96 L150 104 L135 96 L120 104Z" fill={W} stroke={K} strokeWidth="3.5" />
          {[22, 38, 54, 70].map((y) => (
            <rect key={y} x="136" y={y} width={y === 70 ? 40 : 88} height="6" fill={K} />
          ))}
          <rect x="190" y="66" width="34" height="14" fill="#FFE500" stroke={K} strokeWidth="2.5" />
        </g>
      );
    case 'browser':
      return (
        <g className="anim">
          <rect x="40" y="8" width="280" height="96" fill={W} stroke={K} strokeWidth="3.5" />
          <rect x="40" y="8" width="280" height="18" fill={K} />
          {[0, 1, 2].map((i) => (
            <rect key={i} x={50 + i * 14} y="13" width="8" height="8" fill={['#FFE500', '#FF55A5', '#73F5C0'][i]} />
          ))}
          <rect x="54" y="38" width="130" height="34" fill="#FFE500" stroke={K} strokeWidth="3" />
          <rect className="anim2" x="200" y="38" width="104" height="54" fill="#315DF5" stroke={K} strokeWidth="3" />
          <rect x="54" y="80" width="90" height="10" fill={K} />
        </g>
      );
    case 'route':
      return (
        <g className="anim">
          <path className="anim2" d="M30 88 C100 88 90 34 170 44 S260 94 330 30" stroke={K} strokeWidth="6" fill="none" strokeDasharray="14 9" />
          <circle cx="30" cy="88" r="12" fill={W} stroke={K} strokeWidth="3.5" />
          <path d="M330 10 l14 22 h-28z" fill="#FF55A5" stroke={K} strokeWidth="3.5" />
        </g>
      );
    case 'server':
      return (
        <g className="anim">
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect x="90" y={8 + i * 34} width="180" height="28" fill={i === 1 ? '#FFE500' : W} stroke={K} strokeWidth="3" />
              <circle cx="108" cy={22 + i * 34} r="5" fill={i === 2 ? '#FF55A5' : '#73F5C0'} stroke={K} strokeWidth="2" />
              <rect x="130" y={19 + i * 34} width="80" height="6" fill={K} />
            </g>
          ))}
        </g>
      );
    case 'cube':
      return (
        <g className="anim">
          <path d="M180 8 L260 38 L180 68 L100 38Z" fill="#FFE500" stroke={K} strokeWidth="3.5" />
          <path d="M100 38 L180 68 L180 106 L100 74Z" fill="#76E5F5" stroke={K} strokeWidth="3.5" />
          <path d="M260 38 L180 68 L180 106 L260 74Z" fill="#FF55A5" stroke={K} strokeWidth="3.5" />
        </g>
      );
    case 'layers':
      return (
        <g className="anim">
          {[
            ['#76E5F5', 64],
            ['#FFE500', 44],
            ['#FF55A5', 24],
          ].map(([f, y], i) => (
            <path key={i} className={i ? 'anim2' : ''} d={`M180 ${y - 14} L270 ${y + 12} L180 ${y + 38} L90 ${y + 12}Z`} fill={f} stroke={K} strokeWidth="3.5" />
          ))}
        </g>
      );
    case 'chip':
      return (
        <g className="anim">
          <rect x="130" y="16" width="100" height="80" fill="#FFE500" stroke={K} strokeWidth="3.5" />
          <rect x="156" y="36" width="48" height="40" fill={K} />
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <rect x={140 + i * 24} y="4" width="8" height="12" fill={K} />
              <rect x={140 + i * 24} y="96" width="8" height="12" fill={K} />
            </g>
          ))}
        </g>
      );
    case 'plug':
      return (
        <g className="anim">
          <rect x="60" y="34" width="90" height="44" fill={W} stroke={K} strokeWidth="3.5" />
          <rect className="anim2" x="210" y="34" width="90" height="44" fill="#73F5C0" stroke={K} strokeWidth="3.5" />
          <path d="M150 48 H176 M150 64 H176 M210 48 H184 M210 64 H184" stroke={K} strokeWidth="5" />
        </g>
      );
    case 'gears':
      return (
        <g>
          {[
            [130, 56, 34],
            [214, 70, 24],
          ].map(([x, y, rr], i) => (
            <g key={i} className="gear" style={{ transformOrigin: `${x}px ${y}px` }}>
              <circle cx={x} cy={y} r={rr} fill={i ? '#FFE500' : W} stroke={K} strokeWidth="3.5" />
              {Array.from({ length: 8 }, (_, k) => (
                <rect key={k} x={x - 5} y={y - rr - 9} width="10" height="12" fill={K} transform={`rotate(${k * 45} ${x} ${y})`} />
              ))}
              <circle cx={x} cy={y} r={rr / 3} fill={K} />
            </g>
          ))}
        </g>
      );
    case 'speaker':
      return (
        <g className="anim">
          <rect x="130" y="6" width="100" height="100" fill={K} stroke={K} strokeWidth="3" />
          <circle cx="180" cy="36" r="14" fill="#FFE500" stroke={W} strokeWidth="3" />
          <circle cx="180" cy="76" r="22" fill="#FF55A5" stroke={W} strokeWidth="3" />
          <circle cx="180" cy="76" r="8" fill={K} />
        </g>
      );
    case 'people':
      return (
        <g className="anim">
          {[90, 180, 270].map((x, i) => (
            <g key={i}>
              <circle cx={x} cy={i === 1 ? 32 : 40} r="16" fill={['#FF55A5', '#FFE500', '#76E5F5'][i]} stroke={K} strokeWidth="3.5" />
              <path d={`M${x - 26} 104 q0 -34 26 -34 q26 0 26 34z`} fill={W} stroke={K} strokeWidth="3.5" />
            </g>
          ))}
        </g>
      );
    case 'phone':
      return (
        <g className="anim">
          <rect x="140" y="6" width="80" height="102" rx="8" fill={W} stroke={K} strokeWidth="3.5" />
          <path className="anim2" d="M160 84 q10 -34 40 -28 M170 98 q20 -50 30 -40" stroke="#315DF5" strokeWidth="5" fill="none" strokeLinecap="round" />
          <circle cx="180" cy="26" r="6" fill="#73F5C0" stroke={K} strokeWidth="2.5" />
        </g>
      );
    default:
      return <circle cx="180" cy="56" r="30" fill={W} stroke={K} strokeWidth="3.5" />;
  }
}

export default function ProjectArt({ art, id = 'x', dots = true }) {
  return (
    <svg viewBox="0 0 360 112" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      {dots && (
        <g fill="rgba(17,17,17,.3)">
          {Array.from({ length: 9 * 4 }, (_, i) => (
            <circle key={i} cx={20 + (i % 9) * 40} cy={14 + Math.floor(i / 9) * 30} r="1.8" />
          ))}
        </g>
      )}
      <Motif art={art} id={id} />
    </svg>
  );
}
