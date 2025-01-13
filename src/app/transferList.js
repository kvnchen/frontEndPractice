'use client';
import { useState, useEffect } from 'react';

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

  // cant think of a better solution
  // we should be able to control the input with this, but
  // the updated state here isn't being reflected in the render of the checkbox
  const [checkMap, setCheckMap] = useState(base);

  const [leftList, setLeftList] = useState([]);
  const [rightList, setRightList] = useState([]);

  // toggles disabled of < and > buttons
  function toggleButtons(e) {
    // checkMap[e.target.id] = !checkMap[e.target.id];
    // console.log(checkMap[e.target.id]);
    // console.log(e.target.checked);
    setCheckMap({
      ...checkMap,
      [e.target.id]: e.target.checked
    });
  }

  function initializeLists(arr, set) {
    const output = [];
    // const tempCheck = {};
    for (let i = 0; i < arr.length; i++) {
      const item = arr[i];
      // tempCheck[item] = false;
      output.push(
        <li key={item}>
          <label htmlFor={`checkbox-${item}`}>{item}</label>
          <input id={item} type='checkbox' name={`checkbox-${item}`} defaultChecked={false} onChange={toggleButtons}></input>
        </li>
      );
    }
    set(output);
    // setCheckMap(tempCheck);
  }

  function transferAll(left) {
    if (left) {
      setLeftList(leftList.concat(rightList));
      setRightList([]);
    } else {
      setRightList(rightList.concat(leftList));
      setLeftList([]);
    }
    setCheckMap(base);
  }

  function transferSelected(left) {
    const toSend = [];
    const toKeep = [];
    if (left) {
      for (const item of rightList) {
        // not sure how to get checked state from the collection...
        // this is awful
        if (checkMap[item.props.children[1].props.id]) {
          toSend.push(item);
        } else {
          toKeep.push(item);
        }
      }
      // console.log('tokeep', toKeep);
      // console.log('tosend', toSend);
      if (toSend.length > 0) {
        // bugged to reset visual checked state
        setRightList(toKeep);
        setLeftList(leftList.concat(toSend));
      }
    } else {
      for (const item of leftList) {
        // not sure how to get checked state from the collection...
        // this is awful
        if (checkMap[item.props.children[1].props.id]) {
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
    // workaround is to clear all checkboxes after every operation...
    setCheckMap(base);
  }

  useEffect(() => {
    initializeLists(list1, setLeftList);
    initializeLists(list2, setRightList);
  }, [])
  
  return (
    <article className='transfer-list'>
      <ul className='list'>{...leftList}</ul>
      <div className='button-column'>
        <div><button type="button" onClick={() => { transferAll(true) }}>&lt;&lt;</button></div>
        <div><button type="button" onClick={() => { transferSelected(true) }}>&lt;</button></div>
        <div><button type="button" onClick={() => { transferSelected(false) }}>&gt;</button></div>
        <div><button type="button" onClick={() => { transferAll(false) }}>&gt;&gt;</button></div>
      </div>
      <ul className='list'>{...rightList}</ul>
    </article>
  )
}