import { useState } from 'react';
import { ELEMENTS_1_20, getElectronDistribution } from '../data/elements';
import './BohrModel.css';

const CANVAS_SIZE = 320;
const CENTER = CANVAS_SIZE / 2;

export default function BohrModel() {
  const [selectedZ, setSelectedZ] = useState(1);
  const element = ELEMENTS_1_20.find((e) => e.z === selectedZ);
  const protons = element.z;
  const electrons = protons;
  const shells = getElectronDistribution(electrons);

  // Radii: min 42 (keeps electrons clear of nucleus r=24), max 135 (fits canvas)
  const minRadius = 42;
  const maxRadius = 135;
  const shellRadii = shells.map((_, i) => {
    const t = shells.length > 1 ? i / (shells.length - 1) : 0;
    return Math.round(minRadius + t * (maxRadius - minRadius));
  });

  return (
    <section className="section bohr-section">
      <h2>Bohr Models (Introduction)</h2>
      <p className="section-desc">
        Protons are in the nucleus. Electrons are in the shells.
        <br />
        First 2 → shell 1 • Next 8 → shell 2 • Next 8 → shell 3 • Next 2 → shell 4
      </p>

      <div className="bohr-layout">
        <div className="element-picker">
          <h3>Select Element (1–20)</h3>
          <div className="element-grid">
            {ELEMENTS_1_20.map((e) => (
              <button
                key={e.z}
                className={`element-btn ${selectedZ === e.z ? 'active' : ''}`}
                onClick={() => setSelectedZ(e.z)}
              >
                <span className="el-z">{e.z}</span>
                <span className="el-sym">{e.symbol}</span>
              </button>
            ))}
          </div>
          <p className="element-name">{element?.name} — {protons} protons</p>
        </div>

        <div className="bohr-diagram">
          <h3>{element?.symbol} Bohr Model</h3>
          <svg
            className="bohr-svg"
            viewBox={`0 0 ${CANVAS_SIZE} ${CANVAS_SIZE}`}
            width={CANVAS_SIZE}
            height={CANVAS_SIZE}
          >
            <defs>
              <linearGradient id="nucleus-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f87171" />
                <stop offset="100%" stopColor="#dc2626" />
              </linearGradient>
            </defs>
            {/* Electron shells - concentric circles, drawn first (behind) */}
            {shellRadii.map((r, i) => (
              <circle
                key={i}
                cx={CENTER}
                cy={CENTER}
                r={r}
                className="shell-ring"
              />
            ))}

            {/* Electrons on each shell */}
            {shells.map((count, shellIndex) => {
              const r = shellRadii[shellIndex];
              return Array.from({ length: count }).map((_, i) => {
                const angle = (2 * Math.PI * i) / count - Math.PI / 2;
                const x = CENTER + r * Math.cos(angle);
                const y = CENTER + r * Math.sin(angle);
                return (
                  <circle
                    key={`${shellIndex}-${i}`}
                    cx={x}
                    cy={y}
                    r={6}
                    className="electron-dot"
                  />
                );
              });
            })}

            {/* Nucleus - centered, drawn last (on top) */}
            <circle
              cx={CENTER}
              cy={CENTER}
              r={24}
              className="nucleus-circle"
            />
            <text
              x={CENTER}
              y={CENTER}
              textAnchor="middle"
              dominantBaseline="central"
              className="nucleus-text"
            >
              p+ {protons}
            </text>
          </svg>
        </div>
      </div>
    </section>
  );
}
