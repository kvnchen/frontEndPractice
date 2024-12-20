'use client';
import { useState } from 'react';

export function Dice() {
  const [dice, setDice] = useState([]);

  function makePip() {
    return (
      <div className="pip"></div>
    )
  }

  function createRow(key, left, center, right) {
    return (
      <div key={key} className="die-row">
        <div className="die-column">{left && makePip()}</div>
        <div className="die-column">{center && makePip()}</div>
        <div className="die-column">{right && makePip()}</div>
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

    return (
      <>
        {...rows}
      </>
    )
  }

  function createDie(key, pips) {
    return (
      <div key={key} className="die">
        {createFace(pips)}
      </div>
    )
  }

  function roll() {
    return Math.floor(Math.random() * 6) + 1;
  }

  function makeDice(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    const { numDice } = formJson;

    const output = [];

    for (let i = 0; i < numDice; i++) {
      const die = createDie(i, roll());
      output.push(die);
    }
    setDice(output);
  }

  return (
    <article>
      <div>Number of Dice</div>
      <form method="post" onSubmit={makeDice}>
        <input name="numDice" type="number" min="1" max="12" step="1"></input>
        <button type="submit">Roll</button>
      </form>
      <div className="dice-zone">
        {...dice}
      </div>
    </article>
  )
}