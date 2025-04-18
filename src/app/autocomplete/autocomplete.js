'use client';
import styles from './styles.module.css';
import { useState, useEffect } from 'react';
import suggestion from './utils.js';

/*
Task: Build a combobox input field. As the user types, it should fetch suggestions from a mock API (debounced), display them in a dropdown, be fully navigable via keyboard (up/down arrows, enter, escape), and implement ARIA attributes (aria-autocomplete, aria-expanded, aria-activedescendant, etc.) correctly for accessibility.
Focus: Accessibility (ARIA, keyboard navigation), asynchronous operations (fetching, debouncing), state management for suggestions and selection.

already implemented autocomplete function from previous problem set

need to do keyboard support for selecting suggestions and aria labelling
*/

const dataset = {
  'foo': 5,
  'foobar': 7,
  'bar': 3,
  'hello': 2,
  'world': 4,
  'food': 1,
  'focus': 10,
};

// always wait delay before returning a response
function debounce(func, delay) {
  let counter = 0;

  return (...args) => {
    counter++;

    return new Promise((resolve) => {
      setTimeout(() => {
        counter--;
  
        if (counter === 0)
          resolve(func.call(this, ...args));
        else
          resolve([]);
      }, delay);
    });
  };
}

export function Autocomplete() {
  const [input, setInput] = useState('');
  const [recommendations, setRecommendations] = useState([]);

  const debouncedSuggest = debounce(suggestion, 500);

  useEffect(() => {
    // can't pass an async function to useEffect, have to define one inside and call it immediately
    const asyncHandler = async () => {
      const suggest = await debouncedSuggest(input, dataset);
      setRecommendations(suggest);
    };
    asyncHandler();
  }, [input]);

  function onArrow(dir, id) {
    if (dir === 'ArrowUp') {
      if (id === 0) {
        document.getElementById('input').focus();
      } else if (typeof id === 'number') {
        document.getElementById(id - 1).focus();
      }
    } else if (dir === 'ArrowDown') {
      if (id === 'input') {
        document.getElementById(0).focus();
      } else if (id < recommendations.length - 1) {
        document.getElementById(id + 1).focus();
      }
    }
  }

  function renderSuggestions() {
    const output = [];
    
    // don't render if there's only one suggestion that matches input
    if (recommendations.length === 1 && recommendations[0] === input)
      return [];

    for (let i = 0; i < recommendations.length; i++) {
      output.push(
        <div 
          key={i}
          id={i}
          className={styles.suggestion}
          tabIndex={0}
          onClick={() => {
            setInput(recommendations[i])
            setRecommendations([]); // clear recommendations on select right away
          }}
          onKeyDown={(e) => {
            // console.log(e.key); 
            // ArrowDown, ArrowUp
            if (e.key === 'Enter') {
              setInput(recommendations[i])
              setRecommendations([]);
            } else {
              onArrow(e.key, i);
            }
          }}
        >
          {recommendations[i]}
        </div>
      );
    }

    return output;
  }
  
  return (
    <>
      <div>
        <input 
          id='input' 
          type='text' 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
            } else {
              onArrow(e.key, 'input');
            }
          }}
        />
      </div>
      <div>
        {renderSuggestions()}
      </div>
    </>
  )
}