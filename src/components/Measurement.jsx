import { useState, useRef } from 'react';
import './Measurement.css';

export default function Measurement() {
  const [rulerPos1, setRulerPos1] = useState(2.3);
  const [rulerPos2, setRulerPos2] = useState(4.57);
  const [cylinderLevel, setCylinderLevel] = useState(32);
  const rulerRef1 = useRef(null);
  const rulerRef2 = useRef(null);
  const cylinderRef = useRef(null);

  const handleRulerDrag = (e, which, precision) => {
    const ref = which === 1 ? rulerRef1 : rulerRef2;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width;
    const raw = Math.max(0, Math.min(1, x)) * 10;
    const value = precision === 'tenths'
      ? Math.round(raw * 10) / 10
      : Math.round(raw * 100) / 100;
    if (which === 1) setRulerPos1(value);
    else setRulerPos2(value);
  };

  const handleCylinderDrag = (e) => {
    const rect = cylinderRef.current?.getBoundingClientRect();
    if (!rect) return;
    const y = 1 - (e.clientY - rect.top) / rect.height;
    const level = Math.max(0, Math.min(100, y * 50));
    setCylinderLevel(Math.round(level * 10) / 10);
  };

  return (
    <section className="section measurement-section">
      <h2>Measurement Uncertainty</h2>

      <div className="measurement-grid">
        <div className="measure-card">
          <h3>Tenths Place</h3>
          <p className="measure-desc">Drag the cursor on the ruler. Measurement shows to the tenths place.</p>
          <div
            ref={rulerRef1}
            className="ruler"
            onMouseDown={(e) => {
              const move = (ev) => handleRulerDrag(ev, 1, 'tenths');
              const up = () => {
                document.removeEventListener('mousemove', move);
                document.removeEventListener('mouseup', up);
              };
              document.addEventListener('mousemove', move);
              document.addEventListener('mouseup', up);
            }}
          >
            <div className="ruler-ticks">
              {Array.from({ length: 11 }).map((_, i) => (
                <div key={i} className="tick" style={{ left: `${i * 10}%` }}>
                  <span className="tick-label">{i}</span>
                </div>
              ))}
            </div>
            <div
              className="ruler-cursor"
              style={{ left: `${rulerPos1 * 10}%` }}
            />
            <div className="ruler-value" style={{ left: `${rulerPos1 * 10}%` }}>
              {rulerPos1.toFixed(1)}
            </div>
          </div>
        </div>

        <div className="measure-card">
          <h3>Hundredths Place</h3>
          <p className="measure-desc">Drag the cursor on the ruler. Measurement shows to the hundredths place.</p>
          <div
            ref={rulerRef2}
            className="ruler"
            onMouseDown={(e) => {
              const move = (ev) => handleRulerDrag(ev, 2, 'hundredths');
              const up = () => {
                document.removeEventListener('mousemove', move);
                document.removeEventListener('mouseup', up);
              };
              document.addEventListener('mousemove', move);
              document.addEventListener('mouseup', up);
            }}
          >
            <div className="ruler-ticks">
              {Array.from({ length: 11 }).map((_, i) => (
                <div key={i} className="tick" style={{ left: `${i * 10}%` }}>
                  <span className="tick-label">{i}</span>
                </div>
              ))}
            </div>
            <div
              className="ruler-cursor"
              style={{ left: `${rulerPos2 * 10}%` }}
            />
            <div className="ruler-value" style={{ left: `${rulerPos2 * 10}%` }}>
              {rulerPos2.toFixed(2)}
            </div>
          </div>
        </div>

        <div className="measure-card graduated">
          <h3>Graduated Cylinder (Meniscus)</h3>
          <p className="measure-desc">Read at the bottom of the meniscus. Drag to set water level.</p>
          <div
            ref={cylinderRef}
            className="cylinder-container"
            onMouseDown={(e) => {
              const move = handleCylinderDrag;
              const up = () => {
                document.removeEventListener('mousemove', move);
                document.removeEventListener('mouseup', up);
              };
              document.addEventListener('mousemove', move);
              document.addEventListener('mouseup', up);
            }}
          >
            <div className="cylinder">
              <div className="cylinder-scale">
                {[50, 40, 30, 20, 10, 0].map((v) => (
                  <div key={v} className="scale-line" style={{ bottom: `${v * 2}%` }}>
                    <span>{v}</span>
                  </div>
                ))}
              </div>
              <div
                className="cylinder-water"
                style={{ height: `${cylinderLevel * 2}%` }}
              >
                <div className="meniscus" />
              </div>
            </div>
            <div className="meniscus-line" style={{ bottom: `${cylinderLevel * 2}%` }}>
              <span className="meniscus-value">{cylinderLevel.toFixed(1)} mL</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
