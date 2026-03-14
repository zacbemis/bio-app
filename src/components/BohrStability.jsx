import { useState } from 'react';
import { ELEMENTS_1_20, getElectronDistribution, hasNobleGasStability } from '../data/elements';
import './BohrStability.css';

export default function BohrStability({ onSectionComplete, onGoToQuiz }) {
  const [protons, setProtons] = useState(11);
  const [electrons, setElectrons] = useState(11);
  const element = ELEMENTS_1_20.find((e) => e.z === protons);

  const charge = protons - electrons;
  const chargeStr =
    charge === 0 ? '0' : charge > 0 ? `${charge}+` : `${Math.abs(charge)}-`;
  const hasNGS = hasNobleGasStability(electrons);
  const hasNCS = charge === 0;

  return (
    <section className="section stability-section">
      <h2>Bohr Models (Stability)</h2>
      <div className="stability-concepts">
        <div className="concept-card">
          <h3>Noble-Gas Stability (NGS)</h3>
          <p>Element has same electron count as a noble gas: 2, 10, or 18</p>
          <span className={`badge ${hasNGS ? 'success' : ''}`}>
            {hasNGS ? '✓ NGS' : '✗ No NGS'}
          </span>
        </div>
        <div className="concept-card">
          <h3>Neutral-Charge Stability (NCS)</h3>
          <p>Equal protons and electrons → charge is 0</p>
          <span className={`badge ${hasNCS ? 'success' : ''}`}>
            {hasNCS ? '✓ NCS' : chargeStr}
          </span>
        </div>
      </div>

      <div className="charge-rules">
        <h3>Charge Rules</h3>
        <ul>
          <li>More electrons than protons → negative (1-, 2-, 3-...)</li>
          <li>Fewer electrons than protons → positive (1+, 2+, 3+...)</li>
        </ul>
      </div>

      <div className="stability-demo">
        <h3>Interactive Demo</h3>
        <div className="demo-controls">
          <div className="control-group">
            <label>Protons</label>
            <div className="number-input">
              <button onClick={() => setProtons((p) => Math.max(1, p - 1))}>−</button>
              <span>{protons}</span>
              <button onClick={() => setProtons((p) => Math.min(20, p + 1))}>+</button>
            </div>
          </div>
          <div className="control-group">
            <label>Electrons</label>
            <div className="number-input">
              <button onClick={() => setElectrons((e) => Math.max(0, e - 1))}>−</button>
              <span>{electrons}</span>
              <button onClick={() => setElectrons((e) => Math.min(20, e + 1))}>+</button>
            </div>
          </div>
        </div>
        <div className="demo-result">
          <p>
            {element?.symbol ?? '—'} has <strong>{electrons}</strong> electrons
            {hasNGS && ' (Noble Gas count)'}
          </p>
          <p className="charge-display">
            Charge: <span className={charge > 0 ? 'positive' : charge < 0 ? 'negative' : ''}>{chargeStr}</span>
          </p>
        </div>
      </div>
      <div className="go-to-quiz-wrap">
        <button type="button" className="go-to-quiz-btn" onClick={() => onGoToQuiz?.()}>
          Go to quiz
        </button>
      </div>
    </section>
  );
}
