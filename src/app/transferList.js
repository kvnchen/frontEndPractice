'use client';
import { useState, useEffect } from 'react';

/**
 * Lesson about state in react:
 * 
 * State should just be data, don't put rendered components in state.
 * Renderers should be pure functions that take state data and create visual output.
 * Maintaining this clear separation will make life much easier and less buggy.
 * Functions that modify state then only need to modify state, they don't need to affect UI.
 */
export function TransferList() {
  const list1 = [
    'HTML',
    'JavaScript',
    'CSS',
    'TypeScript'
  ];
  const list2 = [
    'React',
    'Angular',
    'Vue',
    'Svelte'
  ];

  const base = {
    'HTML': false,
    'JavaScript': false,
    'CSS': false,
    'TypeScript': false,

    'React': false,
    'Angular': false,
    'Vue': false,
    'Svelte': false
  };

  // what if we just move around the data, not the checkboxes. rerender checkboxes when the underlying data changes
  // oh... that worked perfectly.
  // every time the state changes, it will rerender the component, calling our function that creates the checkboxes with the correct bindings
  // there's a separation of data from rendered UI that's very clean here. Renderer should be pure
  const [leftList, setLeftList] = useState(list1);
  const [rightList, setRightList] = useState(list2);

  // this works fine when the checkboxes are stored in a normal array
  const [checkMap, setCheckMap] = useState(base);

  // toggles disabled of < and > buttons
  function toggleButtons(e) {
    setCheckMap({
      ...checkMap,
      [e.target.id]: e.target.checked
    });
  }

  function initializeLists(arr) {
    const output = [];
    for (let i = 0; i < arr.length; i++) {
      const item = arr[i];
      output.push(
        <li key={item}>
          <label>
            {item}
            <input 
              id={item} 
              type='checkbox' 
              checked={checkMap[item]} 
              onChange={toggleButtons}
            />
          </label>
        </li>
      );
    }
    return output;
  }

  // but the checkbox's visible checked state doesn't work when the array is part of state??
  // const [leftList, setLeftList] = useState(initializeLists(list1));
  // const [rightList, setRightList] = useState(initializeLists(list2));

  function transferAll(left) {
    if (left) {
      setLeftList(leftList.concat(rightList));
      setRightList([]);
    } else {
      setRightList(rightList.concat(leftList));
      setLeftList([]);
    }
  }

  function transferSelected(left) {
    const toSend = [];
    const toKeep = [];
    if (left) {
      for (const item of rightList) {
        if (checkMap[item]) {
          toSend.push(item);
        } else {
          toKeep.push(item);
        }
      }
      if (toSend.length > 0) {
        setRightList(toKeep);
        setLeftList(leftList.concat(toSend));
      }
    } else {
      for (const item of leftList) {
        if (checkMap[item]) {
          toSend.push(item);
        } else {
          toKeep.push(item);
        }
      }
      if (toSend.length > 0) {
        setLeftList(toKeep);
        setRightList(rightList.concat(toSend));
      }
    }
  }

  return (
    <article className='transfer-list'>
      <ul className='list'>
        {initializeLists(leftList)}
      </ul>
      <div className='button-column'>
        <div><button type="button" onClick={() => { transferAll(true) }}>&lt;&lt;</button></div>
        <div><button type="button" onClick={() => { transferSelected(true) }}>&lt;</button></div>
        <div><button type="button" onClick={() => { transferSelected(false) }}>&gt;</button></div>
        <div><button type="button" onClick={() => { transferAll(false) }}>&gt;&gt;</button></div>
      </div>
      <ul className='list'>
        {initializeLists(rightList)}
      </ul>
    </article>
  )
}