import { useEffect, useState } from "react";
import { resetGameFromStorage, saveGameToStorage } from "../logic/storage";
import { TURNS } from "../constansts";
import { checkEndGame, checkWinner } from "../logic/board";
import { Square } from "./Square";
import { Winner } from "./Winner";
import Board from "./Board";

const Game = ({ players, modo }) => {
  const [board, setBoard] = useState(() => {
    const boardSaved = window.localStorage.getItem("board");
    return boardSaved ? JSON.parse(boardSaved) : Array(9).fill(null);
  });

  const [turn, setTurn] = useState(() => {
    const turnSaved = window.localStorage.getItem("turn");
    return turnSaved ? JSON.parse(turnSaved) : players;
  });

  const [winner, setWinner] = useState(null);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(players);
    setWinner(null);
    resetGameFromStorage();
  };

  const updateBoard = (i) => {
    if (board[i] || winner) return;
    const newBoard = [...board];
    newBoard[i] = turn;
    setBoard(newBoard);

    const newTurn = turn === TURNS.x ? TURNS.o : TURNS.x;
    setTurn(newTurn);

    saveGameToStorage({ board: newBoard, turn: newTurn });

    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  };
   
  useEffect(() => {
    if (modo === "computer" && turn !== players && !winner) {
      const availableSpots = board.map((spot, i) => (spot === null ? i : null)).filter(v => v !== null);
      const randomSpot = availableSpots[Math.floor(Math.random() * availableSpots.length)];
      setTimeout(()=> updateBoard(randomSpot), 1000);
      }
      
  }, [board, modo, players, turn, winner]);

  return (
      <main className="board">
        <h1>Tic Tac Toe</h1>
        <p><strong>Modo:</strong> {modo}</p>
        <button onClick={resetGame}>Reiniciar</button>
        <section className="game">
          <Board board={board} updateBoard={updateBoard} />
        </section>
        <p className="turn-text">Turno de:</p>
        <section className="turn">
          <Square isSelected={turn === TURNS.x}>{TURNS.x}</Square>
          <Square isSelected={turn === TURNS.o}>{TURNS.o}</Square>
        </section>
        <Winner winner={winner} resetGame={resetGame} />
      </main>
  );
};

export default Game;
