import { useState } from 'react';
import LandingPage from './components/LandingPage';
import Nav from './components/Nav';
import BohrModel from './components/BohrModel';
import BohrStability from './components/BohrStability';
import LewisDiagram from './components/LewisDiagram';
import LewisCovalent from './components/LewisCovalent';
import LewisIonic from './components/LewisIonic';
import Measurement from './components/Measurement';
import './App.css';

export default function App() {
  const [user, setUser] = useState(null);
  const [section, setSection] = useState('bohr');

  if (!user) {
    return <LandingPage onLogin={setUser} />;
  }

  return (
    <div className="app">
      <Nav section={section} onSectionChange={setSection} user={user} onLogout={() => setUser(null)} />
      <main className="main">
        {section === 'bohr' && <BohrModel />}
        {section === 'stability' && <BohrStability />}
        {section === 'lewis' && <LewisDiagram />}
        {section === 'covalent' && <LewisCovalent />}
        {section === 'ionic' && <LewisIonic />}
        {section === 'measurement' && <Measurement />}
      </main>
    </div>
  );
}
