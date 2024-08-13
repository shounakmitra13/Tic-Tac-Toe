import React, { useState, useEffect } from "react";
import Square from "./Square";
import Header from "./Header";
import Footer from "./Footer";
import "../App.css"; 
import confetti from "canvas-confetti";

const Board = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]); 
  const [currentMove, setCurrentMove] = useState(0); 
  const [isXTurn, setIsXTurn] = useState(true);

  const currentState = history[currentMove]; 

  const checkWinner = () => {
    const winnerLogic = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let logic of winnerLogic) {
      const [a, b, c] = logic;
      if (currentState[a] !== null && currentState[a] === currentState[b] && currentState[a] === currentState[c]) {
        return currentState[a];
      }
    }

    return null;
  };

  const isWinner = checkWinner();
  const checkDraw = () => !isWinner && currentState.every((square) => square !== null);
  const isDraw = checkDraw();

  const handleClick = (index) => {
    if (currentState[index] !== null || isWinner || isDraw) {
      return;
    }

    const newState = [...currentState];
    newState[index] = isXTurn ? "X" : "O";

    setHistory([...history.slice(0, currentMove + 1), newState]);
    setCurrentMove(currentMove + 1);
    setIsXTurn(!isXTurn);
  };

  const handleUndo = () => {
    if (currentMove > 0) {
      setCurrentMove(currentMove - 1);
      setIsXTurn(!isXTurn);
    }
  };

  const handleReset = () => {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
    setIsXTurn(true);
  };

  useEffect(() => {
    if (isWinner) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [isWinner]);

  return (
    <div className="app-container">
      <Header />
      <div className="board-container">
        {isWinner ? (
          <>
            <h2>{isWinner} won the game!</h2>
            <button onClick={handleReset}>Play Again</button>
          </>
        ) : isDraw ? (
          <>
            <h2>It's a draw!</h2>
            <button onClick={handleReset}>Play Again</button>
          </>
        ) : (
          <>
            <h4 className="turn-indicator">
              Player {isXTurn ? "X" : "O"}, it's your turn!
            </h4>
            <div className="board-grid">
              {currentState.map((value, index) => (
                <Square key={index} onClick={() => handleClick(index)} value={value} />
              ))}
            </div>
            {currentMove > 0 && (
              <button onClick={handleUndo} className="undo-button">
                Undo Last Move
              </button>
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Board;
