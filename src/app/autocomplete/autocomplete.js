'use client';
import styles from './styles.module.css';
import { useState, useEffect } from 'react';
import suggestion from './utils.js';

/*
Task: Build a combobox input field. As the user types, it should fetch suggestions from a mock API (debounced), display them in a dropdown, be fully navigable via keyboard (up/down arrows, enter, escape), and implement ARIA attributes (aria-autocomplete, aria-expanded, aria-activedescendant, etc.) correctly for accessibility.
Focus: Accessibility (ARIA, keyboard navigation), asynchronous operations (fetching, debouncing), state management for suggestions and selection.

already implemented autocomplete function from previous problem set
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

  function renderSuggestions() {
    const output = [];

    for (let i = 0; i < recommendations.length; i++) {

      output.push(
        <div key={i} className={styles.suggestion}>
          {recommendations[i]}
        </div>
      );
    }

    return output;
  }
  
  return (
    <>
      <div>
        <input type='text' value={input} onChange={(e) => setInput(e.target.value)} />
      </div>
      <div>
        {renderSuggestions()}
      </div>
    </>
  )
}