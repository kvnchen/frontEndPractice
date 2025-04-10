'use client';
import { useState } from 'react';
import styles from './styles.module.css';

export function AuthCode() {
  /**
   * state
   *  inputs: array of length 6?
   *    I think binding inputs to array indicies in state doesnt work well
   * 
   *  focusIndex: index of currently focused input
   * maybe entirely unnecessary
   *  
   * how do you set focus on an element?
   *  initially set with autoFocus attribute
   * 
   * forgot how to do XMLHTTPRequest
   * 
   * time up, going well after looking up how to do stuff
   * 
   * HTMLElements have a .focus() method
   * 
   * didn't end up using any state
   * though not having state makes iterating over inputs kind of cumbersome
   * yea this seems awkward
   * kind of mixing vanilla form handling and react rendering
   * 
   * used: 32 min
   * 
   * forgot about paste shit
   * there's a paste event
   * need to use .clipboardData to grab clipboard, it wont be part of the target's value
   * 
   * maybe should handle backspace slightly differently
   */
  const empty = [
    '',
    '',
    '',
    '',
    '',
    '',
  ];
  const [pins, setPins] = useState(empty);
  // const [focus, setFocus] = useState(0);

  function handleSubmit(formData) {
    const formJSON = Object.fromEntries(formData.entries());
    const values = Object.values(formJSON);

    submit(values.join(''));
  }

  function submit(str) {
    const req = new XMLHttpRequest();
    const target = 'https://questions.greatfrontend.com/api/questions/auth-code-input';

    req.addEventListener('loadend', transferComplete);
    req.open('POST', target);
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    req.send(JSON.stringify({otp: str}));
  }

  function transferComplete(e) {
    const target = e.currentTarget;

    if (target.status === 200) {
      alert('Success!');
    } else if (target.status === 403) {
      alert('Incorrect');
    }
  }

  function reset() {
    setPins(empty);
    // setFocus(0);
    document.getElementById(0).focus();
  }

  function changeFocus(id, value) {
    if (value !== '' && id < 5) {
      document.getElementById(`${id + 1}`).focus();
      // setFocus(id + 1);
    } else if (value === '' && id !== 0) {
      document.getElementById(`${id - 1}`).focus();
      // setFocus(id - 1);
    }
    const temp = [...pins];
    temp[id] = value;
    setPins(temp);
  }

  // might interfere with onChange...
  function onPaste(e) {
    e.preventDefault(); // seems to save some headache
    const paste = (e.clipboardData || window.clipboardData).getData("text");
    const toPaste = paste.split('').slice(0, 6);
    const temp = empty;
    for (let i = 0; i < toPaste.length; i++) {
      temp[i] = toPaste[i];
    }
    setPins(temp);
    document.getElementById(Math.min(toPaste.length, 5)).focus();
  }

  console.log('rerendering');

  return (
    <form action={handleSubmit}>
      <div className={styles.inputRow} onPaste={onPaste}>
        <input id='0' name='pin0' type='number' min={0} max={9} required value={pins[0]} onChange={(e) => changeFocus(0, e.target.value)} autoFocus />
        <input id='1' name='pin1' type='number' min={0} max={9} required value={pins[1]} onChange={(e) => changeFocus(1, e.target.value)} />
        <input id='2' name='pin2' type='number' min={0} max={9} required value={pins[2]} onChange={(e) => changeFocus(2, e.target.value)} />
        <input id='3' name='pin3' type='number' min={0} max={9} required value={pins[3]} onChange={(e) => changeFocus(3, e.target.value)} />
        <input id='4' name='pin4' type='number' min={0} max={9} required value={pins[4]} onChange={(e) => changeFocus(4, e.target.value)} />
        <input id='5' name='pin5' type='number' min={0} max={9} required value={pins[5]} onChange={(e) => changeFocus(5, e.target.value)} />
      </div>
      <div className={styles.buttonRow}>
        <button onClick={reset} disabled={(
          pins[0] === '' &&
          pins[1] === '' &&
          pins[2] === '' &&
          pins[3] === '' &&
          pins[4] === '' &&
          pins[5] === ''
        )}>Reset</button>
        <button type='submit' disabled={(
          pins[0] === '' ||
          pins[1] === '' ||
          pins[2] === '' ||
          pins[3] === '' ||
          pins[4] === '' ||
          pins[5] === ''
        )}>Submit</button>
      </div>
    </form>
  )
}