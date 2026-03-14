import { useState } from 'react';
import { COVALENT_COMPOUNDS } from '../data/elements';
import './LewisCovalent.css';

export default function LewisCovalent({ onSectionComplete, onGoToQuiz }) {
  const [selected, setSelected] = useState(0);
  const compound = COVALENT_COMPOUNDS[selected];

  return (
    <section className="section lewis-covalent-section">
      <h2>Lewis Structure (Covalent Compounds)</h2>
      <p className="section-desc">
        Venn diagrams show which valence electrons belong to which element and how they are shared.
      </p>

      <div className="compound-picker">
        {COVALENT_COMPOUNDS.map((c, i) => (
          <button
            key={c.formula}
            className={`compound-btn ${selected === i ? 'active' : ''}`}
            onClick={() => setSelected(i)}
          >
            {c.formula}
          </button>
        ))}
      </div>

      <div className="venn-container">
        <h3>{compound.formula} — {compound.name}</h3>
        <VennDiagram compound={compound} />
      </div>
      <div className="go-to-quiz-wrap">
        <button type="button" className="go-to-quiz-btn" onClick={() => onGoToQuiz?.()}>
          Go to quiz
        </button>
      </div>
    </section>
  );
}

function VennDiagram({ compound }) {
  const formula = compound.formula;
  const w = 280;
  const h = 200;
  const cx = w / 2;
  const cy = h / 2;

  // Shared SVG parts for Venn circles and electron dots
  const Circle = ({ cx, cy, r, label, fill = 'rgba(0,212,170,0.08)' }) => (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={fill} stroke="var(--accent)" strokeWidth={2} />
      <text x={cx} y={cy} textAnchor="middle" dominantBaseline="central" fill="var(--text)" fontWeight={600} fontSize={16}>
        {label}
      </text>
    </g>
  );

  const Dot = ({ x, y, r = 4 }) => (
    <circle cx={x} cy={y} r={r} fill="var(--electron)" className="lewis-electron-dot" />
  );

  if (formula === 'H₂') {
    const r = 45;
    const gap = 25;
    return (
      <svg viewBox={`0 0 ${w} ${h}`} className="lewis-venn-svg">
        <Circle cx={cx - gap} cy={cy} r={r} label="H" />
        <Circle cx={cx + gap} cy={cy} r={r} label="H" />
        <ellipse cx={cx} cy={cy} rx={r - gap} ry={r} fill="rgba(0,212,170,0.25)" stroke="var(--accent)" strokeWidth={2} strokeDasharray="4 4" opacity={0.9} />
        <Dot x={cx - 8} y={cy} />
        <Dot x={cx + 8} y={cy} />
      </svg>
    );
  }

  if (formula === 'O₂') {
    const r = 50;
    const gap = 20;
    return (
      <svg viewBox={`0 0 ${w} ${h}`} className="lewis-venn-svg">
        <Circle cx={cx - gap} cy={cy} r={r} label="O" />
        <Circle cx={cx + gap} cy={cy} r={r} label="O" />
        <ellipse cx={cx} cy={cy} rx={r - gap} ry={r} fill="rgba(0,212,170,0.25)" stroke="var(--accent)" strokeWidth={2} strokeDasharray="4 4" />
        <g className="bond-dots">
          <Dot x={cx - 6} y={cy - 15} r={3} />
          <Dot x={cx + 6} y={cy - 15} r={3} />
          <Dot x={cx - 6} y={cy + 15} r={3} />
          <Dot x={cx + 6} y={cy + 15} r={3} />
        </g>
        <g className="lone-pairs-left">
          <Dot x={cx - 55} y={cy - 25} r={3} />
          <Dot x={cx - 55} y={cy - 15} r={3} />
          <Dot x={cx - 55} y={cy + 15} r={3} />
          <Dot x={cx - 55} y={cy + 25} r={3} />
        </g>
        <g className="lone-pairs-right">
          <Dot x={cx + 55} y={cy - 25} r={3} />
          <Dot x={cx + 55} y={cy - 15} r={3} />
          <Dot x={cx + 55} y={cy + 15} r={3} />
          <Dot x={cx + 55} y={cy + 25} r={3} />
        </g>
      </svg>
    );
  }

  if (formula === 'N₂') {
    const r = 50;
    const gap = 18;
    return (
      <svg viewBox={`0 0 ${w} ${h}`} className="lewis-venn-svg">
        <Circle cx={cx - gap} cy={cy} r={r} label="N" />
        <Circle cx={cx + gap} cy={cy} r={r} label="N" />
        <ellipse cx={cx} cy={cy} rx={r - gap} ry={r} fill="rgba(0,212,170,0.25)" stroke="var(--accent)" strokeWidth={2} strokeDasharray="4 4" />
        <g className="triple-bond-dots">
          <Dot x={cx - 5} y={cy - 12} r={3} />
          <Dot x={cx + 5} y={cy - 12} r={3} />
          <Dot x={cx - 5} y={cy} r={3} />
          <Dot x={cx + 5} y={cy} r={3} />
          <Dot x={cx - 5} y={cy + 12} r={3} />
          <Dot x={cx + 5} y={cy + 12} r={3} />
        </g>
        <Dot x={cx - 55} y={cy} r={3} />
        <Dot x={cx - 63} y={cy} r={3} />
        <Dot x={cx + 55} y={cy} r={3} />
        <Dot x={cx + 63} y={cy} r={3} />
      </svg>
    );
  }

  if (formula === 'HF') {
    const rH = 35;
    const rF = 45;
    const gap = 20;
    return (
      <svg viewBox={`0 0 ${w} ${h}`} className="lewis-venn-svg">
        <Circle cx={cx - 50} cy={cy} r={rH} label="H" />
        <Circle cx={cx + 45} cy={cy} r={rF} label="F" />
        <ellipse cx={cx - 15} cy={cy} rx={25} ry={rH} fill="rgba(0,212,170,0.25)" stroke="var(--accent)" strokeWidth={2} strokeDasharray="4 4" />
        <Dot x={cx - 35} y={cy} r={3} />
        <Dot x={cx - 25} y={cy} r={3} />
        <Dot x={cx + 70} y={cy - 30} r={3} />
        <Dot x={cx + 75} y={cy - 20} r={3} />
        <Dot x={cx + 70} y={cy + 20} r={3} />
        <Dot x={cx + 75} y={cy + 30} r={3} />
        <Dot x={cx + 90} y={cy - 5} r={3} />
        <Dot x={cx + 95} y={cy + 5} r={3} />
      </svg>
    );
  }

  if (formula === 'H₂O') {
    const rO = 45;
    const rH = 28;
    const angle1 = -Math.PI / 2 - 0.5;
    const angle2 = -Math.PI / 2 + 0.5;
    const h1x = cx + 55 * Math.cos(angle1);
    const h1y = cy + 55 * Math.sin(angle1);
    const h2x = cx + 55 * Math.cos(angle2);
    const h2y = cy + 55 * Math.sin(angle2);
    return (
      <svg viewBox={`0 0 ${w} ${h}`} className="lewis-venn-svg">
        <Circle cx={cx} cy={cy - 5} r={rO} label="O" />
        <Circle cx={h1x} cy={h1y} r={rH} label="H" />
        <Circle cx={h2x} cy={h2y} r={rH} label="H" />
        <path d={`M ${cx} ${cy} L ${h1x} ${h1y}`} fill="none" stroke="rgba(0,212,170,0.3)" strokeWidth={1} strokeDasharray="4 4" />
        <path d={`M ${cx} ${cy} L ${h2x} ${h2y}`} fill="none" stroke="rgba(0,212,170,0.3)" strokeWidth={1} strokeDasharray="4 4" />
        <Dot x={cx + 18} y={cy - 28} r={3} />
        <Dot x={cx + 25} y={cy - 22} r={3} />
        <Dot x={cx - 18} y={cy - 28} r={3} />
        <Dot x={cx - 25} y={cy - 22} r={3} />
        <Dot x={(cx + h1x) / 2 - 5} y={(cy + h1y) / 2} r={3} />
        <Dot x={(cx + h1x) / 2 + 5} y={(cy + h1y) / 2} r={3} />
        <Dot x={(cx + h2x) / 2 - 5} y={(cy + h2y) / 2} r={3} />
        <Dot x={(cx + h2x) / 2 + 5} y={(cy + h2y) / 2} r={3} />
      </svg>
    );
  }

  if (formula === 'CO₂') {
    const rO = 38;
    const rC = 32;
    const gap = 35;
    return (
      <svg viewBox={`0 0 ${w} ${h}`} className="lewis-venn-svg">
        <Circle cx={cx - 65} cy={cy} r={rO} label="O" />
        <Circle cx={cx} cy={cy} r={rC} label="C" />
        <Circle cx={cx + 65} cy={cy} r={rO} label="O" />
        <ellipse cx={cx - 35} cy={cy} rx={25} ry={rC} fill="rgba(0,212,170,0.25)" stroke="var(--accent)" strokeWidth={2} strokeDasharray="4 4" />
        <ellipse cx={cx + 35} cy={cy} rx={25} ry={rC} fill="rgba(0,212,170,0.25)" stroke="var(--accent)" strokeWidth={2} strokeDasharray="4 4" />
        <Dot x={cx - 45} y={cy - 8} r={3} />
        <Dot x={cx - 38} y={cy} r={3} />
        <Dot x={cx - 45} y={cy + 8} r={3} />
        <Dot x={cx - 28} y={cy} r={3} />
        <Dot x={cx + 38} y={cy} r={3} />
        <Dot x={cx + 45} y={cy - 8} r={3} />
        <Dot x={cx + 45} y={cy} r={3} />
        <Dot x={cx + 45} y={cy + 8} r={3} />
        <Dot x={cx - 95} y={cy - 20} r={3} />
        <Dot x={cx - 95} y={cy - 8} r={3} />
        <Dot x={cx - 95} y={cy + 8} r={3} />
        <Dot x={cx - 95} y={cy + 20} r={3} />
        <Dot x={cx + 95} y={cy - 20} r={3} />
        <Dot x={cx + 95} y={cy - 8} r={3} />
        <Dot x={cx + 95} y={cy + 8} r={3} />
        <Dot x={cx + 95} y={cy + 20} r={3} />
      </svg>
    );
  }

  if (formula === 'NH₃') {
    const rN = 42;
    const rH = 26;
    const angles = [-Math.PI / 2, -Math.PI / 2 + 2.2, -Math.PI / 2 + 4.4];
    const hpos = angles.map((a) => ({ x: cx + 58 * Math.cos(a), y: cy - 15 + 58 * Math.sin(a) }));
    return (
      <svg viewBox={`0 0 ${w} ${h}`} className="lewis-venn-svg">
        <Circle cx={cx} cy={cy - 10} r={rN} label="N" />
        {hpos.map((p, i) => (
          <Circle key={i} cx={p.x} cy={p.y} r={rH} label="H" />
        ))}
        <Dot x={cx} y={cy - 52} r={3} />
        <Dot x={cx + 8} y={cy - 48} r={3} />
        {hpos.map((p, i) => (
          <g key={i}>
            <Dot x={(cx + p.x) / 2 - 4} y={(cy - 10 + p.y) / 2} r={3} />
            <Dot x={(cx + p.x) / 2 + 4} y={(cy - 10 + p.y) / 2} r={3} />
          </g>
        ))}
      </svg>
    );
  }

  if (formula === 'CH₄') {
    const rC = 38;
    const rH = 24;
    const angles = [
      -Math.PI / 2,
      -Math.PI / 2 + 1.6,
      -Math.PI / 2 + 3.2,
      -Math.PI / 2 + 4.8,
    ];
    const hpos = angles.map((a) => ({ x: cx + 55 * Math.cos(a), y: cy - 8 + 55 * Math.sin(a) }));
    return (
      <svg viewBox={`0 0 ${w} ${h}`} className="lewis-venn-svg">
        <Circle cx={cx} cy={cy - 8} r={rC} label="C" />
        {hpos.map((p, i) => (
          <Circle key={i} cx={p.x} cy={p.y} r={rH} label="H" />
        ))}
        {hpos.map((p, i) => (
          <g key={i}>
            <Dot x={(cx + p.x) / 2 - 4} y={(cy - 8 + p.y) / 2} r={3} />
            <Dot x={(cx + p.x) / 2 + 4} y={(cy - 8 + p.y) / 2} r={3} />
          </g>
        ))}
      </svg>
    );
  }

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="lewis-venn-svg">
      <Circle cx={cx - 40} cy={cy} r={40} label={compound.atoms[0]} />
      <Circle cx={cx + 40} cy={cy} r={40} label={compound.atoms[1]} />
      <Dot x={cx - 8} y={cy} r={4} />
      <Dot x={cx + 8} y={cy} r={4} />
    </svg>
  );
}
