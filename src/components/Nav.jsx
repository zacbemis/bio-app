import './Nav.css';

export default function Nav({ section, onSectionChange, user, onLogout, unlockedSections, curriculumOrder }) {
  const isTeacher = user?.role === 'teacher';
  const isLocked = (id) => unlockedSections && !unlockedSections.includes(id);

  const sections = [
    ...(isTeacher ? [{ id: 'classroom', label: 'Classroom' }] : []),
    ...(curriculumOrder || ['bohr', 'stability', 'lewis', 'covalent', 'ionic', 'measurement']).map((id) => ({
      id,
      label:
        id === 'bohr' ? 'Bohr Models' :
        id === 'stability' ? 'Stability' :
        id === 'lewis' ? 'Lewis Diagram' :
        id === 'covalent' ? 'Lewis (Covalent)' :
        id === 'ionic' ? 'Lewis (Ionic)' :
        id === 'measurement' ? 'Measurement' : id,
    })),
  ];

  return (
    <nav className="nav">
      <h1 className="nav-brand">Chemistry Curriculum</h1>
      <div className="nav-links">
        {sections.map((s) => {
          const locked = isLocked(s.id);
          return (
            <button
              key={s.id}
              className={`nav-link ${section === s.id ? 'active' : ''} ${locked ? 'locked' : ''}`}
              onClick={() => !locked && onSectionChange(s.id)}
              disabled={locked}
              title={locked ? 'Complete the previous section and quiz to unlock' : ''}
            >
              {locked && <span className="nav-lock" aria-hidden>🔒</span>}
              {s.label}
            </button>
          );
        })}
        {user && (
          <button className="nav-link nav-logout" onClick={onLogout}>
            Sign out
          </button>
        )}
      </div>
    </nav>
  );
}
