'use client';
import { useState, useEffect } from 'react';
import styles from './styles.module.css';

/*
  3x3
  mole randomly appears in one hole
  1.5 sec to click on it before it disappears
  next one randomly appears
  15 second time limit
  score displayed, button to play again

  state
    score
      number
    timer
      number
    board
      3x3 array of booleans?

  
  randomizer()

  time up, styling


  image overlaying doesn't work, which is expected
  moles still spawning after time up, which is unexpected
    uh, randomizer is getting wrong value for time
    so uh... the callbacks arent getting the right value for time
    render works fine

  wroks if I whack?...
  I guess move responsibility of calling randomizer to the timer useEffect?
    ok, that worked... jesus

  that was kinda rough. would not have realized checking time in setTimeout callbacks was fucked

  didn't know how to overlay images. had to set hill as background image to a div, but still not quite right
  
  how do we animate it popping up?

  i guess the mole is absolutely positioned and animates moving upwards
  that's what gfe does
*/

export function WhackAMole() {
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);
  const [isMole, setIsMole] = useState(false);
  const [board, setBoard] = useState([
    [false, false, false],
    [false, false, false],
    [false, false, false],
  ]);

  function despawn(row, column, isWhack) {
    if (board[row][column] === true) {
      const tempBoard = [...board];
      tempBoard[row][column] = false;
      setBoard(tempBoard);

      if (isWhack)
        setScore(score + 1);

      setIsMole(false);
    }
  }

  // pick a random unit of time from 0.5 -> 2 seconds, then randomly pick a spot on board to spawn a mole
  function randomizer() {
    const spawnTime = Math.floor(Math.random() * 1500) + 500;

    setTimeout(() => {
      const row = Math.floor(Math.random() * 3);
      const column = Math.floor(Math.random() * 3);

      const tempBoard = [...board];
      tempBoard[row][column] = true;
      setBoard(tempBoard);

      setTimeout(() => {
        despawn(row, column, false);
      }, 1500);
    }, spawnTime);
  }

  function init() {
    setScore(0);
    setTime(15);
    setIsMole(false);
    setBoard([
      [false, false, false],
      [false, false, false],
      [false, false, false],
    ]);
  }

  // time checking works here apparently
  useEffect(() => {
    if (time > 0 && !isMole) {
      setIsMole(true);
      randomizer(); // initialize randomizer
    }

    if (time > 0) {
      setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    }
  }, [time]);

  useEffect(() => {
    init();
  }, []);

  function render() {
    const output = [];

    for (let row = 0; row < 3; row++) {
      const columns = [];

      for (let column = 0; column < 3; column++) {
        columns.push(
          <div className={styles.column} key={column} onClick={() => despawn(row, column, true)}>
            <div className={styles.mole} hidden={board[row][column]}></div>
            <img className={styles.mole} hidden={!board[row][column]} src="https://www.greatfrontend.com/img/questions/whack-a-mole/mole-head.png" />
            <img className={styles.hole} src="https://www.greatfrontend.com/img/questions/whack-a-mole/mole-hill.png" />
          </div>
        );
      }

      output.push(
        <div className={styles.row} key={row}>
          {columns}
        </div>
      );
    }

    return output;
  }

  return (
    <article className={styles.board}>
      <div className={styles.topRow}>
        <span className={styles.score}>Score: {score}</span>
        <span className={styles.time}>Time Left: {time}</span>
      </div>
      {render()}
      <div className={styles.botRow}>
        <button hidden={time > 0} onClick={init}>Play Again</button>
      </div>
    </article>
  )
}