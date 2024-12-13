'use client';
import { useState } from 'react';

export function Tabs() {
  const [activeTab, setActiveTab] = useState(0);

  const tab0 = (
    <p id="tab0">
      The HyperText Markup Language or HTML is the
      standard markup language for documents designed to
      be displayed in a web browser.
    </p>
  );
  const tab1 = (
    <p id="tab1">
      Cascading Style Sheets is a style sheet language
      used for describing the presentation of a document
      written in a markup language such as HTML or XML.
    </p>
  );
  const tab2 = (
    <p id="tab2">
      JavaScript, often abbreviated as JS, is a
      programming language that is one of the core
      technologies of the World Wide Web, alongside HTML
      and CSS.
    </p>
  );
  const tabs = [tab0, tab1, tab2];

  function getClass(value) {
    if (value === activeTab)
      return 'active';
    else return '';
  }

  // think i need to treat these as components? not loose html
  const buttonHTML = (<button id="html" tabIndex="0" name="html" key="html" value="0" className={getClass(0)} onClick={handleClick}>HTML</button>);
  const buttonCSS = <button id="css" tabIndex="1" name="css" key="css" value="1" className={getClass(1)} onClick={handleClick}>CSS</button>;
  const buttonJS = <button id="js" tabIndex="2" name="js" key="js" value="2" className={getClass(2)} onClick={handleClick}>JavaScript</button>;
  const buttons = [buttonHTML, buttonCSS, buttonJS];

  function handleClick(e) {
    setActiveTab(Number(e.target.value)); // forgot values are strings...
  }

  return (
    <article>
      <div>
        {...buttons}
      </div>
      {tabs[activeTab]}
    </article>
  );
}