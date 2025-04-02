'use client';
import { useState } from 'react';
import styles from './styles.module.css';

export function Accordian() {

  function Section({ title, body }) {
    const [isCollapsed, setCollapsed] = useState(true);

    function handleClick() {
      setCollapsed(!isCollapsed);
    }

    return (
      <div className={styles.accordian}>
        <div>
          <button onClick={handleClick} className={styles.title}>
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
      <Section title="HTML" body={htmlBody} />
      <Section title="CSS" body={cssBody} />
      <Section title="Javascript" body={jsBody} />
    </article>
  )
}