'use client';
import { useState, useEffect } from 'react';
import styles from './styles.module.css';

export function Modal({ title, body }) {
  const [show, setShow] = useState(false);

  function showModal() {
    document.querySelector('body').className = styles.dim;
    setShow(true);
  }

  function close() {
    document.querySelector('body').className = '';
    setShow(false);
  }

  const modal = (
    <div 
      className={styles.modal} 
      role='dialog' 
      aria-modal={true} 
      aria-labelledby='modal-title'
      aria-describedby='modal-body'
      onClick={(e) => e.stopPropagation()}
    >
      <h1 id='modal-title'>{title}</h1>
      <p id='modal-body'>{body}</p>
      <div>
        <button type="button" onClick={close}>Close</button>
      </div>
    </div>
  );

  function handleKeypress(e) {
    // idk wtf is going on with the state of show in this function
    if (e.key === 'Escape') {
      close();
    }
  }

  useEffect(() => {
    document.querySelector('body').addEventListener('keydown', handleKeypress);
  }, []);

  return (
    <div
      className={styles.container}
      onClick={() => {
        if (show)
          close();
      }}
    >
      <button type="button" onClick={showModal} disabled={show}>Show modal</button>
      {show && modal}
    </div>
  )
}