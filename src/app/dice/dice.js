'use client';
import { useState } from 'react';
import styles from './styles.module.css';

export function Dice() {
  const [dice, setDice] = useState([]);

  function makePip() {
    return (
      <div className={styles.pip}></div>
    )
  }

  function createRow(key, left, center, right) {
    return (
      <div key={key} className={styles.dieRow}>
        <div className={styles.dieColumn}>{left && makePip()}</div>
        <div className={styles.dieColumn}>{center && makePip()}</div>
        <div className={styles.dieColumn}>{right && makePip()}</div>
      </div>
    )
  }

  function createFace(pips) {
    const rows = [];

    switch (pips) {
      case 1:
        rows.push(createRow(0, false, false, false));
        rows.push(createRow(1, false, true, false));
        rows.push(createRow(2, false, false, false));
        break;
      case 2:
        rows.push(createRow(0, false, false, true));
        rows.push(createRow(1, false, false, false));
        rows.push(createRow(2, true, false, false));
        break;
      case 3:
        rows.push(createRow(0, false, false, true));
        rows.push(createRow(1, false, true, false));
        rows.push(createRow(2, true, false, false));
        break;
      case 4:
        rows.push(createRow(0, true, false, true));
        rows.push(createRow(1, false, false, false));
        rows.push(createRow(2, true, false, true));
        break;
      case 5:
        rows.push(createRow(0, true, false, true));
        rows.push(createRow(1, false, true, false));
        rows.push(createRow(2, true, false, true));
        break;
      case 6:
        rows.push(createRow(0, true, false, true));
        rows.push(createRow(1, true, false, true));
        rows.push(createRow(2, true, false, true));
        break; 
    }

    return rows;
  }

  function createDie(key, pips) {
    return (
      <div key={key} className={styles.die}>
        {createFace(pips)}
      </div>
    )
  }

  function roll() {
    return Math.floor(Math.random() * 6) + 1;
  }

  function rollDice(formData) {
    const formJson = Object.fromEntries(formData.entries());
    const { numDice } = formJson;

    const output = [];

    for (let i = 0; i < numDice; i++) {
      output.push(roll());
    }
    setDice(output);
  }

  function renderDice() {
    const output = [];

    for (let i = 0; i < dice.length; i++) {
      output.push(createDie(i, dice[i]));
    }
    return output;
  }

  return (
    <article>
      <div>Number of Dice</div>
      <form action={rollDice}>
        <input name="numDice" type="number" min="1" max="12" step="1"></input>
        <button type="submit">Roll</button>
      </form>
      <div className={styles.diceZone}>
        {renderDice()}
      </div>
    </article>
  )
}