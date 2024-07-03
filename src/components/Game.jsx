import React, { useState } from 'react';

function Game() {
  const [cardColor, setCardColor] = useState(null);
  const [score, setScore] = useState(0);
  const [guessResult, setGuessResult] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);

  const generateNewCard = () => {
    const newColor = Math.random() < 0.5 ? 'black' : 'white';
    setCardColor(newColor);
    setGuessResult(null);
    setGameStarted(true);
  };

  const handleGuess = (guessedColor) => {
    if (guessedColor === cardColor) {
      setScore(score + 1);
      setGuessResult('CORRECT');
    } else {
      setGuessResult('WRONG');
    }
    setTimeout(generateNewCard, 1500);
  };

  return (
    <div>
      <p className="pipboy-text">SCORE: {score}</p>
      {cardColor && (
        <div className="pipboy-card card-back">
          <div className="circuit"></div>
          <div className="circuit"></div>
          <div className="circuit"></div>
        </div>
      )}
      {guessResult && <p className="pipboy-result">{guessResult}</p>}
      {gameStarted ? (
        <div className="pipboy-buttons">
          <button className="pipboy-button" onClick={() => handleGuess('black')}>BLACK</button>
          <button className="pipboy-button" onClick={() => handleGuess('white')}>WHITE</button>
        </div>
      ) : (
        <button className="pipboy-button" onClick={generateNewCard}>START GAME</button>
      )}
    </div>
  );
}

export default Game;