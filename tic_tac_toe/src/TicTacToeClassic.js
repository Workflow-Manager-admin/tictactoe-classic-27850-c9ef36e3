import React, { useState } from "react";

/**
 * Color theme variables as per requirements.
 */
const COLORS = {
  primary: "#1976D2",    // Board & main highlights
  secondary: "#FFFFFF",  // Background and grid default
  accent: "#FF5252",     // Winner highlight & marker for X or O (used as accent)
};

const BOARD_SIZE = 3;
const EMPTY_BOARD = Array(BOARD_SIZE * BOARD_SIZE).fill(null);

function getWinner(board) {
  // All possible win lines: rows, columns, diagonals
  const lines = [
    // Rows
    [0,1,2], [3,4,5], [6,7,8],
    // Columns
    [0,3,6], [1,4,7], [2,5,8],
    // Diagonals
    [0,4,8], [2,4,6]
  ];
  for (const [a, b, c] of lines) {
    if (
      board[a] && board[a] === board[b] && board[a] === board[c]
    ) {
      return { winner: board[a], line: [a, b, c] };
    }
  }
  return null;
}

// PUBLIC_INTERFACE
function TicTacToeClassic() {
  /**
   * Main TicTacToe container.
   * Two players alternate turns ("X" and "O").
   * Announces winner or draw.
   */
  const [board, setBoard] = useState(EMPTY_BOARD);
  const [isXNext, setIsXNext] = useState(true);
  const [gameKey, setGameKey] = useState(0); // Used to reset child keys for CSS animation reset, etc.

  const winnerInfo = getWinner(board);
  const isDraw = !winnerInfo && board.every(cell => cell);

  const statusMsg = winnerInfo
    ? `Winner: ${winnerInfo.winner}`
    : isDraw
      ? "It's a draw!"
      : `Turn: ${isXNext ? "X" : "O"}`;

  function handleClick(idx) {
    // Only allow click if cell is empty and no winner yet
    if (board[idx] || winnerInfo) return;
    const updated = board.slice();
    updated[idx] = isXNext ? "X" : "O";
    setBoard(updated);
    setIsXNext(!isXNext);
  }

  function restartGame() {
    setBoard(EMPTY_BOARD);
    setIsXNext(true);
    setGameKey(prev => prev + 1); // For resetting board visuals
  }

  // Inline style for light theme using provided color variables
  const containerStyle = {
    background: COLORS.secondary,
    borderRadius: 16,
    maxWidth: 370,
    minWidth: 320,
    margin: "48px auto",
    boxShadow: "0 6px 32px rgba(30,40,75,.07)",
    padding: "32px 12px 24px 12px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
  };

  const titleStyle = {
    fontSize: "2.2rem",
    fontWeight: 700,
    letterSpacing: ".02em",
    marginBottom: "0.10em",
    color: COLORS.primary,
    textAlign: "center",
  };

  const statusStyle = {
    fontSize: "1.13rem",
    marginBottom: "20px",
    minHeight: "1.7em",
    color: 
      winnerInfo
        ? COLORS.accent
        : isDraw
        ? "#333"
        : COLORS.primary,
    fontWeight: winnerInfo || isDraw ? 600 : 500,
    textAlign: "center"
  };

  const boardContainerStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${BOARD_SIZE}, 72px)`,
    gridTemplateRows: `repeat(${BOARD_SIZE}, 72px)`,
    gap: "12px",
    marginBottom: "24px",
  };

  const cellStyle = idx => {
    const base = {
      width: 72,
      height: 72,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "2rem",
      background: "#f7fafd",
      border: `2px solid ${COLORS.primary}`,
      borderRadius: "10px",
      boxShadow: board[idx] ? "0 2px 8px rgba(25, 118, 210, 0.07)" : "none",
      color: board[idx] === "X" ? COLORS.primary : COLORS.accent,
      fontWeight: 600,
      cursor:
        board[idx] || winnerInfo
          ? "default"
          : "pointer",
      transition: "background 0.2s, color 0.2s",
      outline: "none",
      position: "relative",
    };
    // Highlight winner line
    if (winnerInfo && winnerInfo.line.includes(idx)) {
      base.background = "#e3f0fc";
      base.borderColor = COLORS.accent;
      base.color = COLORS.accent;
      base.fontWeight = 700;
    }
    return base;
  };

  const restartBtnStyle = {
    background: COLORS.primary,
    color: "#fff",
    border: "none",
    borderRadius: 6,
    padding: "10px 32px",
    fontSize: "1.09rem",
    fontWeight: 600,
    marginTop: "10px",
    letterSpacing: "0.03em",
    boxShadow: "0 1px 7px 0 rgba(25,118,210,.09)",
    cursor: "pointer",
    transition: "background 0.2s",
  };

  // PUBLIC_INTERFACE
  return (
    <div style={containerStyle}>
      <div style={titleStyle}>Tic Tac Toe<br /><span style={{fontSize: "0.72em", color: "#455a67", fontWeight: 400}}>Classic 3x3</span></div>
      <div style={statusStyle} aria-live="polite" data-testid="status">{statusMsg}</div>
      <div style={boardContainerStyle} key={gameKey}>
        {board.map((cell, idx) => (
          <button
            key={idx}
            style={cellStyle(idx)}
            aria-label={`cell ${idx} ${cell || ""}`}
            onClick={() => handleClick(idx)}
            disabled={!!cell || !!winnerInfo}
            tabIndex={0}
            data-testid={`cell-${idx}`}
          >
            {cell}
          </button>
        ))}
      </div>
      <button style={restartBtnStyle} onClick={restartGame} data-testid="restart-btn">
        Restart Game
      </button>
    </div>
  );
}

export default TicTacToeClassic;
