'use client';
import styles from './styles.module.css'
import { useState } from 'react';

/**
 * counter
 * 
 * undo stack
 *  actions taken go on undo stack
 *  undo button pops top action, resets state to old of popped action
 * 
 * redo stack
 *  stores undone actions
 *  cleared when new action is taken
 * 
 * kinda forgot table syntax, minor css mistakes, otherwise got logic down on "first" try
 * remember to add key
 * in 30 min time limit
 */

export function UndoableCounter() {
  const [counter, setCounter] = useState(0);
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  function redo() {
    if (redoStack.length > 0) {
      const tempRedo = [...redoStack];
  
      const action = tempRedo.pop();
      applyAction(action);
      setRedoStack(tempRedo);
    }
  }

  function undo() {
    if (undoStack.length > 0) {
      const tempUndo = [...undoStack];
      const tempRedo = [...redoStack];
  
      const action = tempUndo.pop();
      tempRedo.push(action);
      setCounter(action.old);
      setUndoStack(tempUndo);
      setRedoStack(tempRedo);
    }
  }

  function reset() {
    setCounter(0);
    setUndoStack([]);
    setRedoStack([]);
  }

  function applyAction(action) {
    const temp = [...undoStack];
    temp.push(action);
    setCounter(action.new);
    setUndoStack(temp);
  }

  function action(type) {
    const action = {
      type: type,
      old: counter,
    };

    let val = counter;

    if (type === '/2')
      val = counter / 2;
    else if (type === '-1')
      val = counter - 1;
    else if (type === '+1')
      val = counter + 1;
    else if (type === 'x2')
      val = counter * 2;

    action.new = val;

    setRedoStack([]);
    applyAction(action);
  }

  function renderTable() {
    const output = [];

    for (let i = 0; i < undoStack.length; i++) {
      const action = undoStack[i];
      output.push(
        <tr key={i}>
          <td>{action.type}</td>
          <td>{action.old}</td>
          <td>{action.new}</td>
        </tr>
      );
    }
    return output;
  }

  return (
    <article className={styles.undoableCounter}>
      <div className={styles.topRow}>
        <button onClick={undo} disabled={undoStack.length === 0}>Undo</button>
        <button onClick={redo} disabled={redoStack.length === 0}>Redo</button>
        <button onClick={reset}>Reset</button>
      </div>
      <div className={styles.midRow}>
        <button onClick={() => action('/2')}>/2</button>
        <button onClick={() => action('-1')}>-1</button>
        <span className={styles.counter}>{counter}</span>
        <button onClick={() => action('+1')}>+1</button>
        <button onClick={() => action('x2')}>x2</button>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Op</th>
            <th>Old</th>
            <th>New</th>
          </tr>
        </thead>
        <tbody>
          {renderTable()}
        </tbody>
      </table>
    </article>
  )
}
