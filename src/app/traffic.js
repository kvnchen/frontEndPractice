'use client';
import { useState, useEffect } from 'react';

/**
 * Tricky part here is useEffect to run initialization functions once
 */
export function Traffic({ red, yellow, green }) {
  const [active, setActive] = useState('red');

  function createLight(state, key) {
    return (
      <div className='traffic-row' key={key}>
        <div className={active === state ? `traffic-light ${state}` : 'traffic-light'}></div>
      </div>
    )
  }

  const lights = [];
  const colors = ['red', 'yellow', 'green'];
  for (let i = 0; i < colors.length; i ++) {
    lights.push(createLight(colors[i], i));
  }

  function setRed() {
    // console.log('red');
    setTimeout(() => {
      setActive('green');
      setGreen();
    }, red);
  }

  function setYellow() {
    // console.log('yellow');
    setTimeout(() => {
      setActive('red');
      setRed();
    }, yellow);
  }

  function setGreen() {
    // console.log('green');
    setTimeout(() => {
      setActive('yellow');
      setYellow();
    }, green);
  }

  useEffect(() => {
    setRed(); // function we want to run on mount
  }, []) // empty dependency array so we don't retrigger on every state change

  return (
    <div className='traffic-sign'>
      {...lights}
    </div>
  )
}