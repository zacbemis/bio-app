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
import Quiz from './components/Quiz';
import { QUIZ_BY_SECTION } from './data/quizQuestions';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

const CURRICULUM_ORDER = ['bohr', 'stability', 'lewis', 'covalent', 'ionic', 'measurement'];

const QUIZ_KEY_BY_SECTION = {
  bohr: 'bohr',
  stability: 'stability',
  lewis: 'lewisDiagram',
  covalent: 'covalent',
  ionic: 'ionic',
  measurement: 'measurement',
};

export default function App() {
  const [user, setUser] = useState(null);
  const [section, setSection] = useState('bohr');
  const [completedSections, setCompletedSections] = useState([]);
  const [quizViewSection, setQuizViewSection] = useState(null);

  const isStudent = user?.role === 'student';

  const handleSectionComplete = (sectionId) => {
    setCompletedSections((prev) => {
      if (prev.includes(sectionId)) return prev;
      const updated = [...prev, sectionId];
      const nextIdx = CURRICULUM_ORDER.indexOf(sectionId) + 1;
      if (nextIdx < CURRICULUM_ORDER.length) {
        setSection(CURRICULUM_ORDER[nextIdx]);
      }
      setQuizViewSection(null);
      return updated;
    });
  };

  const firstIncompleteIdx = CURRICULUM_ORDER.findIndex((id) => !completedSections.includes(id));
  const unlockedSections = isStudent
    ? (firstIncompleteIdx === -1 ? CURRICULUM_ORDER : CURRICULUM_ORDER.slice(0, firstIncompleteIdx + 1))
    : CURRICULUM_ORDER;

  const handleSectionChange = (nextId) => {
    if (nextId === 'classroom') {
      setSection(nextId);
      setQuizViewSection(null);
      return;
    }
    if (isStudent && !unlockedSections.includes(nextId)) return;
    setSection(nextId);
    setQuizViewSection(null);
  };

  if (!user) {
    return (
      <LandingPage
        onLogin={(nextUser) => {
          setUser(nextUser);
          setSection(nextUser.role === 'teacher' ? 'classroom' : 'bohr');
          if (nextUser.role === 'student') setCompletedSections([]);
        }}
      />
    );
  }

  return (
    <ErrorBoundary>
      <div className="app">
        <Nav
          section={section}
          onSectionChange={handleSectionChange}
          user={user}
          onLogout={() => setUser(null)}
          unlockedSections={isStudent ? unlockedSections : null}
          curriculumOrder={CURRICULUM_ORDER}
        />
        <main className="main">
          {section === 'classroom' && user.role === 'teacher' && <TeacherClassroom teacher={user} />}
          {section !== 'classroom' && quizViewSection === section && (
            <div className="quiz-page">
              <button type="button" className="back-to-lesson-btn" onClick={() => setQuizViewSection(null)}>
                ← Back to lesson
              </button>
              <Quiz
                questions={QUIZ_BY_SECTION[QUIZ_KEY_BY_SECTION[section]]}
                onComplete={() => handleSectionComplete(section)}
              />
            </div>
          )}
          {section === 'bohr' && quizViewSection !== 'bohr' && (
            <BohrModel onSectionComplete={isStudent ? handleSectionComplete : undefined} onGoToQuiz={() => setQuizViewSection('bohr')} />
          )}
          {section === 'stability' && quizViewSection !== 'stability' && (
            <BohrStability onSectionComplete={isStudent ? handleSectionComplete : undefined} onGoToQuiz={() => setQuizViewSection('stability')} />
          )}
          {section === 'lewis' && quizViewSection !== 'lewis' && (
            <LewisDiagram onSectionComplete={isStudent ? handleSectionComplete : undefined} onGoToQuiz={() => setQuizViewSection('lewis')} />
          )}
          {section === 'covalent' && quizViewSection !== 'covalent' && (
            <LewisCovalent onSectionComplete={isStudent ? handleSectionComplete : undefined} onGoToQuiz={() => setQuizViewSection('covalent')} />
          )}
          {section === 'ionic' && quizViewSection !== 'ionic' && (
            <LewisIonic onSectionComplete={isStudent ? handleSectionComplete : undefined} onGoToQuiz={() => setQuizViewSection('ionic')} />
          )}
          {section === 'measurement' && quizViewSection !== 'measurement' && (
            <Measurement onSectionComplete={isStudent ? handleSectionComplete : undefined} onGoToQuiz={() => setQuizViewSection('measurement')} />
          )}
        </main>
      </div>
    </ErrorBoundary>
  );
}
