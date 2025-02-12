'use client';
import { useState } from 'react';

/**
 * lesson:
 * 
 * we wanted to dynamically change the className of the stars
 * based on state variables
 * one for current hovered id, one for selected id
 * 
 * then tie mouseover events and click event to these setState functions
 */
export function StarRating({ total = 5, filled = 0 }) {
  const stars = [];

  function createStar(key) {
    function onMouseEnter(e) {
      setHover(e.target.id);
    }

    function onMouseLeave(e) {
      setHover(null);
    }

    function onClick(e) {
      setSelected(e.target.id);
    }

    function checkHover() {
      return hover >= key ? 'star-icon star-icon-filled' : 'star-icon';
    }

    function defaultSelection() {
      return selected >= key ? 'star-icon star-icon-filled' : 'star-icon';
    }

    const star = <svg
      xmlns="http://www.w3.org/2000/svg"
      className={hover ? checkHover() : defaultSelection()}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>;

    return (
      <span key={key} id={key} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={onClick}>
        {star}
      </span>
    )
  }

  const [hover, setHover] = useState(null);
  const [selected, setSelected] = useState(filled - 1);

  for (let i = 0; i < total; i++) {
    stars.push(createStar(i))
  }

  return (
    <div className='star-rating'>
      {...stars}
    </div>
  )
}