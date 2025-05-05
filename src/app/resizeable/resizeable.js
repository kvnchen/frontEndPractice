'use client';
import { useState } from 'react';
import styles from './styles.module.css';

/**
 * the resize CSS property sets whether an element is resizeable, and if so in what directions
 * requires that the overflow property is a value other than visible
 * 
 * want to combine with the drag and drop api to give it both behaviors on a grid
 * 
 * so I think this means we need to track the top left corner position in state
 * im stupid, had axes mixed up
 * also needed absolute positioning with pixel offset
 * 
 * current behavior of snapping the top left corner to where the mouse is isn't great
 */
function Resizeable({ x, y }) {
  const text = `The HyperText Markup Language or HTML is the
  standard markup language for documents designed to
  be displayed in a web browser.`;

  const style = {
    left: `${x}px`,
    top: `${y}px`,
  };

  function dragHandler(ev) {
    ev.dataTransfer.effectAllowed = 'move';
  }
  
  return (
    <div 
      className={styles.card}
      style={style}
      draggable={true}
      onDragStart={dragHandler}
    >
      {text}
    </div>
  )
}

// position of the widget needs to be lifted into the grid state
// pageX, pageY depends on where the cursor is, not where the top left corner of the draggable element is...
export function Grid() {
  const [widgetPos, setWidgetPos] = useState([18,54]); // initial offset

  function dragoverHandler(ev) {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = 'move';
  }

  function dropHandler(ev) {
    ev.preventDefault();
    // console.log(ev);
    const newPos = [ev.pageX, ev.pageY];
    setWidgetPos(newPos);
  }

  return (
    <div 
      className={styles.grid}
      onDragOver={dragoverHandler}
      onDrop={dropHandler}
    >
      <Resizeable x={widgetPos[0]} y={widgetPos[1]} />
    </div>
  )
}

