'use client';
import styles from './styles.module.css';
import { useState, useEffect } from 'react';
import suggestion from './utils.js';

/*
Task: Build a combobox input field. As the user types, it should fetch suggestions from a mock API (debounced), display them in a dropdown, be fully navigable via keyboard (up/down arrows, enter, escape), and implement ARIA attributes (aria-autocomplete, aria-expanded, aria-activedescendant, etc.) correctly for accessibility.
Focus: Accessibility (ARIA, keyboard navigation), asynchronous operations (fetching, debouncing), state management for suggestions and selection.

already implemented autocomplete function from previous problem set

need to do aria labelling
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
      let suggest = await debouncedSuggest(input, dataset);

      // don't offer if there's only one suggestion that matches input
      if (suggest.length === 1 && suggest[0] === input)
        suggest = [];

      setRecommendations(suggest);
    };
    asyncHandler();
  }, [input]);

  // interesting bug: keypress events are being captured inside the dev console, which is not intended
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
    
    for (let i = 0; i < recommendations.length; i++) {
      output.push(
        <div 
          key={i}
          id={i}
          role='option' // an option within a listbox role element
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
        {/* inputs have to be labelled */}
        <label id='label' htmlFor='input' className={styles.label}>Enter a word</label>
        <input 
          id='input' // needed for the label to reference
          type='text' 
          value={input}
          role='combobox' // set on input that controls the popup
          aria-controls='suggestions' // pairs with aria-expanded, value is id of controlled element
          aria-expanded={recommendations.length !== 0} // aria-expanded is applied to the interactive control that toggles visibility of another object
          aria-autocomplete='list' // indicates a collection of possible values in the popup
          onChange={(e) => setInput(e.target.value)} 
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
            } else {
              onArrow(e.key, 'input');
            }
          }}
        />
      </div>
      <div 
        id='suggestions' // needed for aria-controls attribute of toggle
        role='listbox' // an element that creates a list of one or more static items
        aria-labelledby='input' // id of toggle
      >
        {renderSuggestions()}
      </div>
    </>
  )
}