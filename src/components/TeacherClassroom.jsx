import { useMemo, useState } from 'react';
import './TeacherClassroom.css';

const MOCK_CLASSES = [
  {
    id: 'chem-1',
    name: 'Chemistry Period 1',
    studentCount: 28,
    code: 'P1-4X9B',
    students: [
      { id: 1, name: 'Aiden R.', location: 'Bohr Models', progress: 0.4 },
      { id: 2, name: 'Bella K.', location: 'Lewis Diagram', progress: 0.7 },
      { id: 3, name: 'Carlos T.', location: 'Measurement Lab', progress: 0.2 },
    ],
  },
  {
    id: 'chem-2',
    name: 'Chemistry Period 2',
    studentCount: 31,
    code: 'P2-Q3LM',
    students: [
      { id: 4, name: 'Devon M.', location: 'Stability', progress: 0.5 },
      { id: 5, name: 'Emily S.', location: 'Lewis (Covalent)', progress: 0.8 },
    ],
  },
];

function generateCode() {
  const part1 = Math.random().toString(36).substring(2, 4).toUpperCase();
  const part2 = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${part1}-${part2}`;
}

export default function TeacherClassroom({ teacher }) {
  const [classes, setClasses] = useState(MOCK_CLASSES);
  const [selectedId, setSelectedId] = useState(MOCK_CLASSES[0]?.id ?? null);
  const [name, setName] = useState('');
  const [count, setCount] = useState('');

  const selectedClass = useMemo(
    () => classes.find((c) => c.id === selectedId) ?? classes[0] ?? null,
    [classes, selectedId],
  );

  const handleRemoveClass = () => {
    if (!selectedClass) return;
    const remaining = classes.filter((c) => c.id !== selectedClass.id);
    setClasses(remaining);
    setSelectedId(remaining[0]?.id ?? null);
  };

  const handleAddClass = (e) => {
    e.preventDefault();
    if (!name.trim() || !count) return;
    const id = `${Date.now()}`;
    const newClass = {
      id,
      name: name.trim(),
      studentCount: Number(count) || 0,
      code: generateCode(),
      students: [],
    };
    setClasses((prev) => [...prev, newClass]);
    setSelectedId(id);
    setName('');
    setCount('');
  };

  return (
    <section className="section classroom-section">
      <h2>Classrooms</h2>
      <p className="section-desc">
        Teacher admin view. Create classes, share classroom codes, and see where students are in the lesson.
      </p>

      <div className="classroom-layout">
        <div className="class-list-card">
          <div className="class-list-header">
            <h3>Your classes</h3>
            <span className="teacher-name">{teacher?.username}</span>
          </div>

          <div className="class-list">
            {classes.map((c) => (
              <button
                key={c.id}
                className={`class-row ${selectedClass?.id === c.id ? 'active' : ''}`}
                onClick={() => setSelectedId(c.id)}
              >
                <div>
                  <div className="class-name">{c.name}</div>
                  <div className="class-meta">{c.studentCount} students · Code: {c.code}</div>
                </div>
              </button>
            ))}
            {classes.length === 0 && (
              <p className="empty-state">No classes yet. Add your first class below.</p>
            )}
          </div>

          <form className="add-class-form" onSubmit={handleAddClass}>
            <h4>Add a class</h4>
            <div className="field">
              <label>Class name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Chemistry Period 3"
              />
            </div>
            <div className="field field-inline">
              <div>
                <label>Student count</label>
                <input
                  type="number"
                  min="0"
                  value={count}
                  onChange={(e) => setCount(e.target.value)}
                  placeholder="28"
                />
              </div>
              <div className="generated-code">
                <label>Code preview</label>
                <div className="code-pill">{generateCode()}</div>
              </div>
            </div>
            <button type="submit" className="btn-primary" disabled={!name.trim() || !count}>
              Save class
            </button>
          </form>
        </div>

        <div className="class-detail-card">
          {selectedClass ? (
            <>
              <div className="class-detail-header">
                <div>
                  <h3>{selectedClass.name}</h3>
                  <p className="class-detail-meta">
                    {selectedClass.studentCount} students · Code: <span className="code-pill">{selectedClass.code}</span>
                  </p>
                </div>
                <button
                  type="button"
                  className="btn-danger"
                  onClick={handleRemoveClass}
                  disabled={classes.length === 0}
                >
                  Remove class
                </button>
              </div>

              <div className="students-header">
                <span>Active students</span>
                <span className="students-pill">{selectedClass.students.length}</span>
              </div>

              {selectedClass.students.length === 0 ? (
                <p className="empty-state">
                  No active students yet. Once students join with this code, they will appear here.
                </p>
              ) : (
                <ul className="student-list">
                  {selectedClass.students.map((s) => (
                    <li key={s.id} className="student-row">
                      <div>
                        <div className="student-name">{s.name}</div>
                        <div className="student-location">Currently: {s.location}</div>
                      </div>
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${s.progress * 100}%` }} />
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </>
          ) : (
            <p className="empty-state">Select a class to see details.</p>
          )}
        </div>
      </div>
    </section>
  );
}

