import React, { useState } from 'react';
import './App.css';
import Game from './components/Game';
import NotArt from './components/NotArt';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div className="pipboy-container">
      <div className="pipboy-screen">
        <h1 className="pipboy-title">PON v0.0.3</h1>
        {currentPage === 'home' && (
          <div className="pipboy-buttons">
            <button className="pipboy-button" onClick={() => setCurrentPage('game')}>START GAME</button>
            <button className="pipboy-button" onClick={() => setCurrentPage('notart')}>NOT ART</button>
          </div>
        )}
        {currentPage === 'game' && <Game />}
        {currentPage === 'notart' && <NotArt />}
      </div>
    </div>
  );
}

export default App;