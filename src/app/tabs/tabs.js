'use client';
import { useState } from 'react';
import styles from './styles.module.css';

export function Tabs() {
  const contents = {
    'HTML': `The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser.`,
    'CSS': `Cascading Style Sheets is a style sheet language used for describing the presentation of a document written in a markup language such as HTML or XML.`,
    'JavaScript': `JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS.`
  };

  const [activeTab, setActiveTab] = useState('HTML');

  function getClass(value) {
    if (value === activeTab)
      return styles.active;
    else return styles.inactive;
  }
  
  function renderButtons() {
    const buttons = [];
    
    function handleClick(e) {
      setActiveTab(e.target.value);
    }

    for (let i = 0; i < Object.keys(contents).length; i++) {
      const key = Object.keys(contents)[i];

      buttons.push(
        <button 
          key={i} 
          tabIndex={i} 
          className={getClass(key)} 
          onClick={handleClick} 
          value={key}
        >
          {key}
        </button>
      );
    }

    return buttons;
  }

  return (
    <article className={styles.container}>
      <div>
        {renderButtons()}
      </div>
      <p className={styles.content}>
        {contents[activeTab]}
      </p>
    </article>
  );
}