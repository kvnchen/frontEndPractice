'use client';
import { useState } from 'react';

export function Accordian() {

  function Section({ title, body }) {
    const [isCollapsed, setCollapsed] = useState(true);

    function handleClick() {
      setCollapsed(!isCollapsed);
    }

    return (
      <article>
        <div>
          {title}
          <button onClick={handleClick}>
            <span
              aria-hidden="true"
              className={isCollapsed ? 'accordion-icon' : 'accordion-icon rotated'}></span>
          </button>
        </div>
        {!isCollapsed && (
          <p>
            {body}
          </p>
        )}
      </article>
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