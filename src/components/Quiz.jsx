import { useState } from 'react';
import './Quiz.css';

export default function Quiz({ questions, onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  if (!questions || questions.length === 0) return null;

  const q = questions[currentIndex];
  const isCorrect = selectedOption === q.correctIndex;

  const handleSubmit = () => {
    if (selectedOption === null) return;
    setShowResult(true);
    if (selectedOption === q.correctIndex) setScore((s) => s + 1);
  };

  const handleNext = () => {
    if (currentIndex + 1 >= questions.length) {
      setFinished(true);
      onComplete?.();
    } else {
      setCurrentIndex((i) => i + 1);
      setSelectedOption(null);
      setShowResult(false);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setShowResult(false);
    setScore(0);
    setFinished(false);
  };

  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="quiz-block">
        <h3 className="quiz-title">Section Quiz — Complete</h3>
        <p className="quiz-score">
          You got {score} out of {questions.length} correct ({pct}%).
        </p>
        <button type="button" className="quiz-reset-btn" onClick={handleReset}>
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="quiz-block">
      <h3 className="quiz-title">Quiz</h3>
      <p className="quiz-progress">
        Question {currentIndex + 1} of {questions.length}
      </p>
      <p className="quiz-question">{q.question}</p>
      <div className="quiz-options">
        {q.options.map((opt, i) => (
          <label key={i} className={`quiz-option ${selectedOption === i ? 'selected' : ''} ${showResult && i === q.correctIndex ? 'correct' : ''} ${showResult && selectedOption === i && i !== q.correctIndex ? 'wrong' : ''}`}>
            <input
              type="radio"
              name="quiz"
              checked={selectedOption === i}
              onChange={() => !showResult && setSelectedOption(i)}
              disabled={showResult}
            />
            <span>{opt}</span>
          </label>
        ))}
      </div>
      {!showResult ? (
        <button type="button" className="quiz-submit-btn" onClick={handleSubmit} disabled={selectedOption === null}>
          Check answer
        </button>
      ) : (
        <div className="quiz-feedback">
          <p className={isCorrect ? 'quiz-correct' : 'quiz-incorrect'}>
            {isCorrect ? 'Correct!' : `Incorrect. The correct answer is: ${q.options[q.correctIndex]}`}
          </p>
          <button type="button" className="quiz-next-btn" onClick={handleNext}>
            {currentIndex + 1 >= questions.length ? 'See score' : 'Next question'}
          </button>
        </div>
      )}
    </div>
  );
}
