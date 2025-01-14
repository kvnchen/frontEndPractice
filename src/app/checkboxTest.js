'use client';
import { useState } from 'react';

export function CheckboxTest() {
  const [checked, setChecked] = useState(false);
  
  const data = [
    'HTML',
    'JavaScript',
    'CSS',
    'TypeScript'
  ];
  function initialize(arr) {
    const temp = {};
    for (const item of arr) {
      temp[item] = false;
    }
    return temp;
  }

  const [map, setMap] = useState(initialize(data));

  // so this does work. we want the map to be initialized before making the subcomponent
  function makeBoxes(arr) {
    const output = [];

    for (const item of arr) {
      output.push(
        <div key={item}>
          <label className={map[item] ? 'bold' : ''}>
            {item}
            <input type='checkbox' checked={map[item]} onChange={(e) => {
              setMap({
                ...map,
                [item]: e.target.checked
              });
            }} />
          </label>
        </div>
      );
    }
    return output;
  }

  return (
    <article className='checkbox-test'>
      {/* <label>
        {checked ? 'checked' : 'unchecked'}
        <input type='checkbox' checked={checked} onChange={(e) => setChecked(e.target.checked) } />
      </label> */}
      {makeBoxes(data)}
    </article>
  )
}