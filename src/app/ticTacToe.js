'use client';
import { useState } from 'react';

export function TicTacToe() {
  const [status, setStatus] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [board, setBoard] = useState([
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ]);
  const [activePlayer, setActivePlayer] = useState('O');
  const [turn, setTurn] = useState(1);

  function clearBoard() {
    setBoard([
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ]);
  }

  function setCell(row, column) {
    const copy = [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ];

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (i === row && j === column)
          copy[i][j] = activePlayer;
        else
          copy[i][j] = board[i][j];
      }
    }
    setBoard(copy);
  }

  function switchActivePlayer() {
    if (activePlayer === 'O')
      setActivePlayer('X');
    else
      setActivePlayer('O');
  }

  function checkGameOver() {
    function checkRow(r) {
      return (
        board[r][0] !== '' &&
        board[r][0] === board[r][1] &&
        board[r][1] === board[r][2]
      );
    }

    function checkColumn(c) {
      return (
        board[0][c] !== '' &&
        board[0][c] === board[1][c] &&
        board[1][c] === board[2][c]
      );
    }

    function checkDiagonal1() {
      return (
        board[0][0] !== '' &&
        board[0][0] === board[1][1] &&
        board[1][1] === board[2][2]
      );
    }

    function checkDiagonal2() {
      return (
        board[2][0] !== '' &&
        board[2][0] === board[1][1] &&
        board[1][1] === board[0][2]
      );
    }

    if (
      checkRow(0) ||
      checkRow(1) ||
      checkRow(2) ||
      checkColumn(0) ||
      checkColumn(1) ||
      checkColumn(2) ||
      checkDiagonal1() ||
      checkDiagonal2()
    ) {
      setGameOver(true);
      setStatus(`Player ${activePlayer} wins!`);
    } else if (turn === 9) {
      setGameOver(true);
      setStatus(`Draw!`);
    }
  }

  function reset() {
    setGameOver(false);
    setStatus(``);
    setActivePlayer('O');
    clearBoard();
    setTurn(1);
  }

  function clickCell(e) {
    if (!gameOver) {
      const [row,column] = e.target.id.split(',').map((c) => Number(c));
      board[row][column] = activePlayer;
      setCell(row, column);
      setTurn(turn + 1);
      checkGameOver();
      switchActivePlayer();
    }
  }

  function createBoard() {
    const rows = [];

    function createRow(i) {
      const columns = [];
      for (let j = 0; j < 3; j++) {
        const cell = <div className={`column r${i}-c${j}`} id={`${i},${j}`} key={j} onClick={clickCell}>{board[i][j]}</div>;
        columns.push(cell);
      }

      return (
        <div key={i} className='row'>
          {...columns}
        </div>
      )
    }

    for (let i = 0; i < 3; i++) {
      rows.push(createRow(i));
    }

    return (
      <div className='ttt-board'>
        {...rows}
      </div>
    )
  }
  
  
  return (
    <article>
      <h1>{status}</h1>
      {createBoard()}
      <div>
        <button type='button' onClick={reset}>Reset</button>
      </div>
    </article>
  )
}