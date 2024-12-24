'use client';
import { useState } from 'react';

export function Modal({ title, body }) {
  const [show, setShow] = useState(false);
  function showModal() {
    document.querySelector('body').className = 'dim';
    setShow(true);
  }

  function close() {
    document.querySelector('body').className = '';
    setShow(false);
  }

  const modal = (<div className='modal'>
    <h1>{title}</h1>
    <p>{body}</p>
    <div>
      <button type="button" onClick={close}>Close</button>
    </div>
  </div>);

  return (
    <article>
      <button type="button" onClick={showModal}>Show modal</button>
      {show && modal}
    </article>
  )
}