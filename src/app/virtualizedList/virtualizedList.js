'use client';
import styles from './styles.module.css';
import { useState, useEffect } from 'react';

/**
 * want to not render items outside the viewport
 * how do we know which items are inside the viewport?
 * 
 * do we need to listen to scroll events?
 * right, scrolling doesn't rerender the list normally
 * 
 * ok, now we need to respond to scrolling and updating what gets rendered
 * 
 * window.scrollY to get vertical scroll position
 * multiply index by 110, add scrollY, if between scrollY and scrollY + screen height (1312), it should be rendered?
 * 
 * onscroll seems to fire on elements with a scroll bar, but what about the page itself?
 * 
 * ok, it works, but it rerenders a lot. throttle scroll event?
 */
const windowHeight = 1312;
const items = [];
for (let i = 1; i <= 50; i++) {
  items.push({
    id: i,
    isVisible: i * 110 < (windowHeight + 110 + 36)
  });
}

function throttle(func, delay) {
  let locked = false;

  return (...args) => {
    if (!locked) {
      locked = true;

      func.call(this, ...args);
      setTimeout(() => {
        locked = false;
      }, delay);
    }
  };
}

export function VirtualizedList() {
  const [listItems, setItems] = useState(items);

  function handleScroll() {
    console.log('scrolling');
    const scrollY = window.scrollY;
    const temp = [...listItems];

    for (let i = 0; i < temp.length; i++) {
      const diff = (i * 110) + 110 + 36; // 110 for 0 indexing, 36 for component selector and <br>
      temp[i].isVisible = (diff >= scrollY && diff <= (scrollY + windowHeight + 110)); // extend window by item length to allow rendering cutoff boxes
    }
    setItems(temp);
  }

  useEffect(() => {
    //fires a lot... and is triggering rerenders (but dom reconciliation should just be 2 elements at a time)
    // throttle seems to help
    window.document.addEventListener('scroll', throttle(handleScroll, 10));
  }, []);

  function renderList() {
    const output = [];
    // console.log(globalThis.innerHeight);
    // const windowHeight = globalThis.innerHeight; // some weird issue resolving this value on server
    // console.log('rendering');

    for (let i = 0; i < listItems.length; i++) {
      const doesExceed = !listItems[i].isVisible;
      const style = doesExceed ? styles.listItemHidden : styles.listItem;

      output.push(
        <li 
          id={i}
          key={i} 
          className={style}
          hidden={doesExceed}
        >
          {doesExceed ? '' : `Item ${i}`}
        </li>
      );
    }

    return output;
  }

  return (
    <ul>
      {renderList()}
    </ul>
  )
}