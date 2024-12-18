'use client';
import { useState } from 'react';

export function Progress() {
  const [bars, setBars] = useState([]);

  function Instance() {
    return (
      <div className='progressContainer'>
        <div className='progress'></div>
      </div>
    );
  }

  function createProgress() {
    // arrays in react state are read-only, must be entirely replaced on each update...
    setBars([...bars, new Instance()]);
  }

  return (
    <article>
      <div>
        <button onClick={createProgress}>Add</button>
        {...bars}
      </div>
    </article>
  )
}