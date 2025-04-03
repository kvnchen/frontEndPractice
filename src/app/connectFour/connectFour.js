'use client';

import { useState, useEffect } from 'react';
import styles from './styles.module.css';

/**
 * 6 rows, 7 columns
 * 
 * state:
 *   activePlayer: string, 'red' || 'yellow'
 *   board: array[], 'r' || 'y'
 *   winner: null || 'red || 'yellow'
 *   
 *   
 * for alignment:
 *   justify-content for the horizontal axis
 *   align-items for cross-axis (vertical)
 * 
 * over time (30 min), going very slowly in the afternoon
 * 
 * victory checking function was kinda gross and time consuming
 * but otherwise the question is fairly straightforward
 */
export function ConnectFour() {
  const [activePlayer, setActivePlayer] = useState('red');
  const [board, setBoard] = useState([
    new Array(7),
    new Array(7),
    new Array(7),
    new Array(7),
    new Array(7),
    new Array(7),
  ]);
  const [winner, setWinner] = useState(null);
  const [lastCell, setLastCell] = useState([null, null]);

  function reset() {
    setActivePlayer('red');
    setBoard([
      new Array(7),
      new Array(7),
      new Array(7),
      new Array(7),
      new Array(7),
      new Array(7),
    ]);
    setWinner(null);
    setLastCell([null, null]);
  }

  // check 8 directions based on lastCell
  // disgusting
  function checkBoard() {
    let leftCount = 0;
    let rightCount = 0;

    let topCount = 0;
    let botCount = 0;

    let topLeftCount = 0;
    let botRightCount = 0;

    let topRightCount = 0;
    let botLeftCount = 0;

    const [row, column] = lastCell;
    if (row === null || column === null)
      return;

    const color = board[row][column];

    // left
    for (let i = 1; i <= 3; i++) {
      if (column - i >= 0 && board[row][column - i] === color)
        leftCount++;
      else
        break;
    }

    // top left
    for (let i = 1; i <= 3; i++) {
      if (row - i >= 0 && column - i >= 0 && board[row - i][column - i] === color)
        topLeftCount++;
      else
        break;
    }

    // bot left
    for (let i = 1; i <= 3; i++) {
      if (row + i < 6 && column - i >= 0 && board[row + i][column - i] === color)
        botLeftCount++;
      else
        break;
    }

    // right
    for (let i = 1; i <= 3; i++) {
      if (column + i < 7 && board[row][column + i] === color)
        rightCount++;
      else
        break;
    }

    // top right
    for (let i = 1; i <= 3; i++) {
      if (row - i >= 0 && column + i < 7 && board[row - i][column + i] === color)
        topRightCount++;
      else
        break;
    }

    // bot right
    for (let i = 1; i <= 3; i++) {
      if (row + i < 6 && column + i < 7 && board[row + i][column + i] === color)
        botRightCount++;
      else
        break;
    }

    // top
    for (let i = 1; i <= 3; i++) {
      if (row - i >= 0 && board[row - i][column] === color) {
        topCount++;
      } else break;
    }

    // bot
    for (let i = 1; i <= 3; i++) {
      if (row + i < 6 && board[row + i][column] === color)
        botCount++;
      else break;
    }

    if (leftCount + rightCount >= 3)
      setWinner(color);
    else if (topLeftCount + botRightCount >= 3)
      setWinner(color);
    else if (botLeftCount + topRightCount >= 3)
      setWinner(color);
    else if (topCount + botCount >= 3)
      setWinner(color);
  }

  function addPiece(column) {
    if (winner === null) {
      const tempBoard = [
        [...board[0]],
        [...board[1]],
        [...board[2]],
        [...board[3]],
        [...board[4]],
        [...board[5]],
      ];
  
      let targetRow;
      for (let i = 5; i >= 0; i--) {
        if (tempBoard[i][column] === undefined) {
          targetRow = i;
          break;
        }
      }
  
      if (targetRow !== undefined) {
        tempBoard[targetRow][column] = activePlayer;
    
        if (activePlayer === 'red') {
          setActivePlayer('yellow');
        } else {
          setActivePlayer('red');
        }
        setBoard(tempBoard);
        setLastCell([targetRow, column]);
      }
    }
  }

  useEffect(() => {
    checkBoard();
  }, lastCell);

  function renderBoard() {
    const output = [];

    for (let row = 0; row < board.length; row++) {
      const columns = [];

      for (let column = 0; column < board[row].length; column++) {
        let cellStyle = '';
        if (board[row][column] === 'red')
          cellStyle = 'red';
        else if (board[row][column] === 'yellow')
          cellStyle = 'yellow';

        const holeStyle = `${styles.hole} ${styles[cellStyle]}`;
        columns.push(
          <div key={column} className={styles.cell} onClick={() => addPiece(column)}>
            <div className={holeStyle}></div>
          </div>
        );
      }
      output.push(columns);
    }
    return output;
  }

  return (
    <article>
      <div className={styles.board}>
        {renderBoard()}
      </div>
      <div className={styles.buttonRow}>
        <button onClick={reset}>Reset</button>
      </div>
      {winner &&
        (<h3>
          {winner} Wins!
        </h3>)
      }
    </article>
  )
}