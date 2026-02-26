import './Nav.css';

export default function Nav({ section, onSectionChange, user, onLogout }) {
  const sections = [
    { id: 'bohr', label: 'Bohr Models' },
    { id: 'stability', label: 'Stability' },
    { id: 'lewis', label: 'Lewis Diagram' },
    { id: 'covalent', label: 'Lewis (Covalent)' },
    { id: 'ionic', label: 'Lewis (Ionic)' },
    { id: 'measurement', label: 'Measurement' },
  ];

  return (
    <nav className="nav">
      <h1 className="nav-brand">Chemistry Curriculum</h1>
      <div className="nav-links">
        {sections.map((s) => (
          <button
            key={s.id}
            className={`nav-link ${section === s.id ? 'active' : ''}`}
            onClick={() => onSectionChange(s.id)}
          >
            {s.label}
          </button>
        ))}
        {user && (
          <button className="nav-link nav-logout" onClick={onLogout}>
            Sign out
          </button>
        )}
      </div>
    </nav>
  );
}
