'use client';
import { useState } from 'react';
import styles from './styles.module.css';

/**
 * 
 * Task: Create a simplified Kanban board interface (like Trello) with multiple columns. Users should be able to drag and drop cards within a column and between columns. The underlying data structure representing the board state should be updated accordingly.
 * 
 * Focus: Complex state management, drag and drop API (HTML Drag and Drop API or a library), event handling, DOM updates.
 * 
 * we'll need a card component
 * 
 * ok, finished the skeleton of the kanban using flexbox
 * 
 * drag and drop api huh
 * 
 * 
 */
const data = [
  [
    {
      id: 0,
      title: 'HTML',
      body: `The HyperText Markup Language or HTML is the
    standard markup language for documents designed to
    be displayed in a web browser.`
    },
    {
      id: 2,
      title: 'JavaScript',
      body: `JavaScript, often abbreviated as JS, is a
    programming language that is one of the core
    technologies of the World Wide Web, alongside HTML
    and CSS.`
    }
  ],
  [{
    id: 1,
    title: 'CSS',
    body: `Cascading Style Sheets is a style sheet language
  used for describing the presentation of a document
  written in a markup language such as HTML or XML.`
  }],
  [],
];

function Card({ id, title, body, index }) {
  function dragstartHandler(ev) {
    ev.dataTransfer.effectAllowed = 'move';
    ev.dataTransfer.setData('application/card', id);
    ev.dataTransfer.setData('application/source', index);
    // console.log(ev.dataTransfer.getData('application/source'));
  }

  return (
    <div 
      key={id}
      className={styles.card}
      draggable={true}
      onDragStart={dragstartHandler}
    >
      <h4>{title}</h4>
      <p>{body}</p>
    </div>
  )
}

export function Kanban() {
  // just store the ids in a Set to simplify column state
  // this kinda sucks for movement handling...
  const [columns, setColumns] = useState(data.map((arr) => new Set(arr.map((item) => item.id ))));

  function makeMap(data) {
    const map = {};

    for (const column of data) {
      column.map((item) => map[item.id] = item);
    }

    return map;
  }
  const [dataMap] = useState(makeMap(data));

  function moveItem(id, source, destination) {
    if (source !== destination) {
      // lot of copying
      const temp = columns.map((s) => new Set(s));
      temp[source].delete(id);
      temp[destination].add(id);
      setColumns(temp);
    }
  }

  function renderColumn(columnData, index) {
    const output = Array.from(columnData).map((id, key) => {
      const { title, body } = dataMap[id];
      return (
        <Card key={key} id={id} title={title} body={body} index={index} />
      )
    })

    function dragoverHandler(ev) {
      ev.preventDefault();
      ev.dataTransfer.dropEffect = 'move';
    }

    function dropHandler(ev) {
      ev.preventDefault();
      const moveId = Number(ev.dataTransfer.getData('application/card'));
      const sourceIndex = Number(ev.dataTransfer.getData('application/source'));
      moveItem(moveId, sourceIndex, index);
    }

    return (
      <div 
        key={index} 
        className={styles.column}
        onDragOver={dragoverHandler}
        onDrop={dropHandler}
      >
        {output}
      </div>
    )
  }

  return (
    <div className={styles.kanban}>
      {columns.map(renderColumn)}
    </div>
  )
}