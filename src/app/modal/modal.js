'use client';
import { useState } from 'react';
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
    <div className={styles.modal}>
      <h1>{title}</h1>
      <p>{body}</p>
      <div>
        <button type="button" onClick={close}>Close</button>
      </div>
    </div>
  );

  return (
    <>
      <button type="button" onClick={showModal} disabled={show}>Show modal</button>
      {show && modal}
    </>
  )
}