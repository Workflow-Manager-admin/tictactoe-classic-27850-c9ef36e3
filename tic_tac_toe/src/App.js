import React from 'react';
import './App.css';
import TicTacToeClassic from './TicTacToeClassic';

function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol">*</span> KAVIA AI
            </div>
            <button className="btn" disabled style={{opacity:0.3,pointerEvents:'none'}}>Tic Tac Toe</button>
          </div>
        </div>
      </nav>

      <main>
        <div className="container">
          <TicTacToeClassic />
        </div>
      </main>
    </div>
  );
}

export default App;