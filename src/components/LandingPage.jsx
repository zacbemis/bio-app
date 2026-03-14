import { useState } from 'react';
import './LandingPage.css';

export default function LandingPage({ onLogin }) {
  const [role, setRole] = useState(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [modalView, setModalView] = useState('signin');
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const openLogin = () => {
    setLoginOpen(true);
    setModalView('signin');
    setRole(null);
    setShowForgotPassword(false);
  };
  const closeLogin = () => {
    setLoginOpen(false);
    setRole(null);
    setModalView('signin');
    setShowForgotPassword(false);
  };

  const renderModalContent = () => {
    if (modalView === 'signup') {
      return (
        <CreateAccount
          onBack={() => { setModalView('signin'); setRole(null); }}
          onSignInInstead={() => { setModalView('signin'); setRole('teacher'); setShowForgotPassword(false); }}
          onSuccess={() => closeLogin()}
        />
      );
    }
    if (!role) {
      return (
        <div className="role-select">
          <button className="role-btn" onClick={() => setRole('teacher')}>
            <span className="role-icon">👩‍🏫</span>
            <span>I'm a teacher</span>
          </button>
          <button className="role-btn" onClick={() => setRole('student')}>
            <span className="role-icon">🧑‍🎓</span>
            <span>I'm a student</span>
          </button>
        </div>
      );
    }
    if (role === 'teacher' && showForgotPassword) {
      return (
        <ForgotPassword
          onBack={() => setShowForgotPassword(false)}
          onSuccess={() => setShowForgotPassword(false)}
        />
      );
    }
    if (role === 'teacher') {
      return (
        <TeacherLogin
          onBack={() => setRole(null)}
          onLogin={(user) => { onLogin(user); closeLogin(); }}
          onForgotPassword={() => setShowForgotPassword(true)}
          onCreateAccount={() => setModalView('signup')}
        />
      );
    }
    return (
      <StudentLogin onBack={() => setRole(null)} onLogin={(user) => { onLogin(user); closeLogin(); }} />
    );
  };

  const modalTitle = modalView === 'signup'
    ? 'Create account'
    : showForgotPassword
      ? 'Reset password'
      : role
        ? (role === 'teacher' ? 'Sign in' : 'Sign in')
        : 'Sign in';

  return (
    <div className="landing-page">
      <header className="landing-header">
        <a href="#" className="logo">Chemistry Curriculum</a>
        <nav className="landing-nav">
          <a href="#features">Features</a>
          <a href="#how-it-works">How it works</a>
          <button className="btn-header" onClick={openLogin}>Sign in</button>
        </nav>
      </header>

      {loginOpen && (
        <div className="login-modal-overlay" onClick={closeLogin}>
          <div className="login-modal" onClick={(e) => e.stopPropagation()}>
            <button className="login-modal-close" onClick={closeLogin} aria-label="Close">×</button>
            <h2>{modalTitle}</h2>
            {renderModalContent()}
          </div>
        </div>
      )}

      <section className="hero">
        <div className="hero-content">
          <h1>Master chemistry with interactive tools</h1>
          <p className="hero-tagline">
            Bohr models, Lewis structures, and measurement lab—all in one place.
            Built for the classroom.
          </p>
          <button className="btn-hero" onClick={openLogin}>
            Get started
          </button>
        </div>
        <div className="hero-visual">
          <img src={`${import.meta.env.BASE_URL}bio-svg.svg`} alt="H2O molecule" className="hero-bio-svg" />
        </div>
      </section>

      <section id="features" className="features">
        <h2>What you'll learn</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">⚛️</div>
            <h3>Bohr Models</h3>
            <p>Build atomic models for elements 1–20. Protons in the nucleus, electrons in shells—2, 8, 8, 2.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔬</div>
            <h3>Stability & Lewis</h3>
            <p>Explore noble-gas and neutral-charge stability. Draw Lewis diagrams and covalent structures with Venn diagrams.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📏</div>
            <h3>Measurement Lab</h3>
            <p>Practice reading rulers to tenths and hundredths. Measure with a graduated cylinder at the meniscus.</p>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="how-it-works">
        <h2>How it works</h2>
        <div className="steps">
          <div className="step">
            <span className="step-num">1</span>
            <h3>Teachers</h3>
            <p>Sign in with your credentials. Set up classes and share classroom codes with students.</p>
          </div>
          <div className="step">
            <span className="step-num">2</span>
            <h3>Students</h3>
            <p>Enter your teacher's classroom code, then your username. No password needed.</p>
          </div>
          <div className="step">
            <span className="step-num">3</span>
            <h3>Learn</h3>
            <p>Work through interactive modules—Bohr models, Lewis structures, ionic compounds, and measurement.</p>
          </div>
        </div>
      </section>

      <footer className="landing-footer">
        <p>Chemistry Curriculum — Educational mockup</p>
      </footer>
    </div>
  );
}

function TeacherLogin({ onBack, onLogin, onForgotPassword, onCreateAccount }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password) onLogin({ role: 'teacher', username });
  };

  return (
    <div className="auth-form-wrap">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="field">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            autoFocus
          />
        </div>
        <div className="field">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </div>
        <div className="form-links">
          <button type="button" className="link-btn" onClick={onForgotPassword}>
            Forgot password?
          </button>
        </div>
        <div className="form-actions">
          <button type="button" className="btn-secondary" onClick={onBack}>
            Back
          </button>
          <button type="submit" className="btn-primary" disabled={!username || !password}>
            Sign in
          </button>
        </div>
      </form>
      <p className="auth-switch">
        Don't have an account?{' '}
        <button type="button" className="link-btn" onClick={onCreateAccount}>
          Create account
        </button>
      </p>
    </div>
  );
}

function StudentLogin({ onBack, onLogin }) {
  const [step, setStep] = useState('code');
  const [classroomCode, setClassroomCode] = useState('');
  const [username, setUsername] = useState('');

  const handleCodeSubmit = (e) => {
    e.preventDefault();
    if (classroomCode.trim()) setStep('username');
  };

  const handleUsernameSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) onLogin({ role: 'student', username, classroomCode });
  };

  return (
    <div className="login-form">
      {step === 'code' ? (
        <form onSubmit={handleCodeSubmit}>
          <div className="field">
            <label>Classroom Code</label>
            <input
              type="text"
              value={classroomCode}
              onChange={(e) => setClassroomCode(e.target.value.toUpperCase())}
              placeholder="Enter code (e.g. ABC123)"
              autoFocus
              maxLength={8}
            />
          </div>
          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={onBack}>
              Back
            </button>
            <button type="submit" className="btn-primary" disabled={!classroomCode.trim()}>
              Continue
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleUsernameSubmit}>
          <p className="step-badge">Classroom: {classroomCode}</p>
          <div className="field">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              autoFocus
            />
          </div>
          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={() => setStep('code')}>
              Change code
            </button>
            <button type="submit" className="btn-primary" disabled={!username.trim()}>
              Sign in
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

function CreateAccount({ onBack, onSignInInstead, onSuccess }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const passwordsMatch = password === confirmPassword;
  const isValid = name.trim() && email.trim() && username.trim() && password.length >= 6 && passwordsMatch;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!isValid) {
      if (password.length > 0 && password.length < 6) setError('Password must be at least 6 characters.');
      else if (password && !passwordsMatch) setError('Passwords do not match.');
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="auth-success">
        <p className="auth-success-icon">✓</p>
        <h3>Account created</h3>
        <p className="auth-success-text">
          You can now sign in with your username and password.
        </p>
        <div className="form-actions">
          <button type="button" className="btn-primary" onClick={onSuccess}>
            Sign in
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-form-wrap">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="field">
          <label>Full name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            autoFocus
          />
        </div>
        <div className="field">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
        </div>
        <div className="field">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Choose a username"
          />
        </div>
        <div className="field">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 6 characters"
            minLength={6}
          />
        </div>
        <div className="field">
          <label>Confirm password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm password"
          />
        </div>
        {error && <p className="form-error">{error}</p>}
        <div className="form-actions">
          <button type="button" className="btn-secondary" onClick={onBack}>
            Back
          </button>
          <button type="submit" className="btn-primary" disabled={!isValid}>
            Create account
          </button>
        </div>
      </form>
      <p className="auth-switch">
        Already have an account?{' '}
        <button type="button" className="link-btn" onClick={onSignInInstead}>
          Sign in
        </button>
      </p>
    </div>
  );
}

function ForgotPassword({ onBack, onSuccess }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="auth-success">
        <p className="auth-success-icon">✉</p>
        <h3>Check your email</h3>
        <p className="auth-success-text">
          If an account exists for <strong>{email}</strong>, we've sent a password reset link.
        </p>
        <div className="form-actions">
          <button type="button" className="btn-primary" onClick={onSuccess}>
            Back to sign in
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="field">
        <label>Email address</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter the email for your account"
          autoFocus
        />
      </div>
      <p className="form-hint">Enter the email you use to sign in. We'll send a link to reset your password.</p>
      <div className="form-actions">
        <button type="button" className="btn-secondary" onClick={onBack}>
          Back
        </button>
        <button type="submit" className="btn-primary" disabled={!email.trim()}>
          Send reset link
        </button>
      </div>
    </form>
  );
}
