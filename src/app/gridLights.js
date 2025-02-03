'use client';
import { useState, useEffect } from 'react';

/**
 * reminder that we can't check state immediately after setting it
 * so after changing the state after the timeout, the trick is to reuse
 * useEffect monitoring the stack to control whether to continue or stop
 * resetting.
 * 
 * also, when modifying state arrays, you have to make a new copy, modify that,
 * and set state to the new array. It won't work if you use a reference to the existing array.
 */

export function GridLights() {
  const [activeLights, setActiveLights] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [isResetting, startReset] = useState(false);
  const [stack, setStack] = useState([]);

  function resetLights() {
    setTimeout(() => {
      const tempStack = [...stack];
      const light = tempStack.pop();
      light.className = 'grid-light';

      const tempActive = [...activeLights];
      tempActive[Number(light.id)] = false;

      setStack(tempStack);
      setActiveLights(tempActive);
    }, 333);
  }

  function toggleLight(e, index) {
    if (!isResetting && !activeLights[index]) {
      e.target.className = 'grid-light active';

      const temp = [...activeLights]; // create new arrays, don't use reference to existing one
      temp[index] = true;
      setActiveLights(temp);

      const tempStack = [...stack];
      tempStack.push(e.target);
      setStack(tempStack);
    }
  }

  function createLight(key) {
    return (
      <div className='grid-light' key={key} id={key} onClick={(e) => toggleLight(e, key)}>
      </div>
    )
  }

  function createGrid() {
    let monotonic = 0;

    function createRow(hasBlank) {
      const cells = [];

      for (let i = 0; i < 3; i++) {
        if (i === 1 && hasBlank)
          cells.push(
            <div className='grid-light' key='blank'></div>
          );
        else {
          cells.push(createLight(monotonic))
          monotonic++;
        }
      }

      return (
        <div className='grid-row'>
          {...cells}
        </div>
      )
    }
    
    return (
      <>
        {createRow(false)}
        {createRow(true)}
        {createRow(false)}
      </>
    )
  }

  useEffect(() => {
    if (!isResetting && stack.length === 8) {
      startReset(true);
      resetLights();
    } else if (isResetting && stack.length > 0) {
      resetLights();
    } else {
      startReset(false);
    }
  }, [stack]);

  return (
    <article className='grid-lights'>
      {createGrid()}
    </article>
  )
}