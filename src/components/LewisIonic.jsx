import { useState } from 'react';
import './LewisIonic.css';

const IONIC_EXAMPLES = [
  { formula: 'NaCl', cation: 'Na⁺', anion: 'Cl⁻', cationCount: 1, anionCount: 1 },
  { formula: 'MgO', cation: 'Mg²⁺', anion: 'O²⁻', cationCount: 1, anionCount: 1 },
  { formula: 'CaF₂', cation: 'Ca²⁺', anion: 'F⁻', cationCount: 1, anionCount: 2 },
  { formula: 'Al₂O₃', cation: 'Al³⁺', anion: 'O²⁻', cationCount: 2, anionCount: 3 },
];

export default function LewisIonic({ onSectionComplete, onGoToQuiz }) {
  const [selected, setSelected] = useState(0);
  const ex = IONIC_EXAMPLES[selected];

  return (
    <section className="section lewis-ionic-section">
      <h2>Lewis Structure (Ionic Compounds)</h2>
      <p className="section-desc">
        Lewis diagrams of ions show how many of each ion are necessary to form an overall charge of 0.
      </p>

      <div className="ionic-picker">
        {IONIC_EXAMPLES.map((e, i) => (
          <button
            key={e.formula}
            className={`compound-btn ${selected === i ? 'active' : ''}`}
            onClick={() => setSelected(i)}
          >
            {e.formula}
          </button>
        ))}
      </div>

      <div className="ionic-demo">
        <h3>{ex.formula}</h3>
        <div className="ionic-structure">
          <div className="ion-group cation">
            <div className="ion-lewis">
              <span className="ion-symbol">{ex.cation.replace(/[⁺⁻⁰¹²³⁴⁵⁶⁷⁸⁹]/g, '')}</span>
              <span className="charge-badge positive">{ex.cation.includes('²') ? '2+' : ex.cation.includes('³') ? '3+' : '+'}</span>
            </div>
            <span className="ion-count">× {ex.cationCount}</span>
          </div>
          <span className="plus">+</span>
          <div className="ion-group anion">
            <div className="ion-lewis">
              <span className="ion-symbol">{ex.anion.replace(/[⁺⁻⁰¹²³⁴⁵⁶⁷⁸⁹]/g, '')}</span>
              <span className="charge-badge negative">
              {ex.anion.includes('²') ? '2−' : ex.anion.includes('³') ? '3−' : '−'}
            </span>
            </div>
            <span className="ion-count">× {ex.anionCount}</span>
          </div>
          <span className="equals">=</span>
          <div className="result">
            <span className="result-formula">{ex.formula}</span>
            <span className="result-charge">Charge: 0</span>
          </div>
        </div>
        <p className="ionic-explanation">
          {ex.cationCount} {ex.cation} + {ex.anionCount} {ex.anion} → net charge = 0
        </p>
      </div>
      <div className="go-to-quiz-wrap">
        <button type="button" className="go-to-quiz-btn" onClick={() => onGoToQuiz?.()}>
          Go to quiz
        </button>
      </div>
    </section>
  );
}
