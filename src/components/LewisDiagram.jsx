import { useState } from 'react';
import { ELEMENTS_1_20, getElectronDistribution, getValenceElectrons } from '../data/elements';
import './LewisDiagram.css';

const MINI_SIZE = 140;
const MINI_CENTER = MINI_SIZE / 2;

export default function LewisDiagram() {
  const [selectedZ, setSelectedZ] = useState(6);
  const element = ELEMENTS_1_20.find((e) => e.z === selectedZ);
  const valence = getValenceElectrons(element?.z ?? 0);
  const shells = getElectronDistribution(element?.z ?? 0);

  // Radii for concentric shells in mini diagram
  const shellRadii = shells.map((_, i) => 12 + (i + 1) * 18);

  return (
    <section className="section lewis-diagram-section">
      <h2>Lewis Diagram</h2>
      <p className="section-desc">
        The Lewis diagram shows only the valence electrons from the Bohr model.
      </p>

      <div className="lewis-split">
        <div className="bohr-panel">
          <h3>Bohr Model</h3>
          <div className="element-select-row">
            {ELEMENTS_1_20.slice(0, 10).map((e) => (
              <button
                key={e.z}
                className={`mini-btn ${selectedZ === e.z ? 'active' : ''}`}
                onClick={() => setSelectedZ(e.z)}
              >
                {e.symbol}
              </button>
            ))}
          </div>
          <div className="element-select-row">
            {ELEMENTS_1_20.slice(10, 20).map((e) => (
              <button
                key={e.z}
                className={`mini-btn ${selectedZ === e.z ? 'active' : ''}`}
                onClick={() => setSelectedZ(e.z)}
              >
                {e.symbol}
              </button>
            ))}
          </div>
          <svg
            className="mini-bohr-svg"
            viewBox={`0 0 ${MINI_SIZE} ${MINI_SIZE}`}
            width={MINI_SIZE}
            height={MINI_SIZE}
          >
            {shellRadii.map((r, i) => (
              <circle key={i} cx={MINI_CENTER} cy={MINI_CENTER} r={r} className="mini-shell-ring" />
            ))}
            {shells.map((count, shellIndex) => {
              const r = shellRadii[shellIndex];
              return Array.from({ length: count }).map((_, i) => {
                const angle = (2 * Math.PI * i) / count - Math.PI / 2;
                const x = MINI_CENTER + r * Math.cos(angle);
                const y = MINI_CENTER + r * Math.sin(angle);
                return (
                  <circle key={`${shellIndex}-${i}`} cx={x} cy={y} r={3} className="mini-electron-dot" />
                );
              });
            })}
            <circle cx={MINI_CENTER} cy={MINI_CENTER} r={14} className="mini-nucleus-circle" />
            <text x={MINI_CENTER} y={MINI_CENTER} textAnchor="middle" dominantBaseline="central" className="mini-nucleus-text">
              {element?.symbol}
            </text>
          </svg>
          <p className="valence-hint">Valence electrons: {valence}</p>
        </div>

        <div className="lewis-panel">
          <h3>Lewis Diagram (Valence Only)</h3>
          <div className="lewis-symbol">
            <span className="lewis-element">{element?.symbol}</span>
            <div className="lewis-dots" style={{ '--valence': valence }}>
              {Array.from({ length: valence }).map((_, i) => (
                <span key={i} className="dot" style={{ '--i': i }} />
              ))}
            </div>
          </div>
          <p className="lewis-desc">
            {element?.name} has {valence} valence electron{valence !== 1 ? 's' : ''} in the
            outermost shell. The Lewis diagram shows these as dots around the symbol.
          </p>
        </div>
      </div>
    </section>
  );
}
