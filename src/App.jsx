import { useState } from 'react';
import LandingPage from './components/LandingPage';
import Nav from './components/Nav';
import TeacherClassroom from './components/TeacherClassroom';
import BohrModel from './components/BohrModel';
import BohrStability from './components/BohrStability';
import LewisDiagram from './components/LewisDiagram';
import LewisCovalent from './components/LewisCovalent';
import LewisIonic from './components/LewisIonic';
import Measurement from './components/Measurement';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

export default function App() {
  const [user, setUser] = useState(null);
  const [section, setSection] = useState('bohr');

  if (!user) {
    return (
      <LandingPage
        onLogin={(nextUser) => {
          setUser(nextUser);
          setSection(nextUser.role === 'teacher' ? 'classroom' : 'bohr');
        }}
      />
    );
  }

  return (
    <ErrorBoundary>
      <div className="app">
        <Nav section={section} onSectionChange={setSection} user={user} onLogout={() => setUser(null)} />
        <main className="main">
          {section === 'classroom' && user.role === 'teacher' && <TeacherClassroom teacher={user} />}
          {section === 'bohr' && <BohrModel />}
          {section === 'stability' && <BohrStability />}
          {section === 'lewis' && <LewisDiagram />}
          {section === 'covalent' && <LewisCovalent />}
          {section === 'ionic' && <LewisIonic />}
          {section === 'measurement' && <Measurement />}
        </main>
      </div>
    </ErrorBoundary>
  );
}
