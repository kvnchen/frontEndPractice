'use client';
import { useState } from 'react';
import styles from './styles.module.css';

/**
 * adding keyboard support:
 * 
 * enter, up/down arrow, home, end
 * 
 * onKeyDown
 *  event.key 
 *    'Enter'
 *    'ArrowUp'
 *    'ArrowDown'
 *    'Home'
 *    'End'
 */
export function Accordian() {
  function Section({ title, body, buttonId }) {
    const [isCollapsed, setCollapsed] = useState(true);

    function handleClick() {
      setCollapsed(!isCollapsed);
    }
    
    function handleKeypress(event) {
      const id = Number(event.target.id);

      // Enter fires onClick already
      if (event.key === 'ArrowUp' && id > 0) {
        document.getElementById(id - 1).focus();
      } else if (event.key === 'ArrowDown' && id < 2) {
        document.getElementById(id + 1).focus();
      } else if (event.key === 'Home') {
        document.getElementById(0).focus();
      } else if (event.key === 'End') {
        document.getElementById(2).focus();
      }
    }

    return (
      <div className={styles.accordian}>
        <div>
          <button
            id={buttonId}
            onClick={handleClick} 
            className={styles.title}
            onKeyDown={handleKeypress}
          >
            {title}
            <span
              aria-hidden="true"
              className={isCollapsed ? styles.accordianIcon : `${styles.accordianIcon} ${styles.rotated}`}></span>
          </button>
        </div>
        {!isCollapsed && (
          <p>
            {body}
          </p>
        )}
      </div>
    )
  }

  const htmlBody = `
  The HyperText Markup Language or HTML is the
  standard markup language for documents designed to
  be displayed in a web browser.
  `;

  const cssBody = `
  Cascading Style Sheets is a style sheet language
  used for describing the presentation of a document
  written in a markup language such as HTML or XML.
  `;

  const jsBody = `
  JavaScript, often abbreviated as JS, is a
  programming language that is one of the core
  technologies of the World Wide Web, alongside HTML
  and CSS.
  `;

  return (
    <article>
      <Section buttonId={0} title="HTML" body={htmlBody} />
      <Section buttonId={1} title="CSS" body={cssBody} />
      <Section buttonId={2} title="Javascript" body={jsBody} />
    </article>
  )
}