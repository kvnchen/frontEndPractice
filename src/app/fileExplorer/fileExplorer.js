'use client';
import { useState } from 'react';
import styles from './styles.module.css';

const data = [
  {
    id: 1,
    name: 'README.md',
  },
  {
    id: 2,
    name: 'Documents',
    children: [
      {
        id: 3,
        name: 'Word.doc',
      },
      {
        id: 4,
        name: 'Powerpoint.ppt',
      },
    ],
  },
  {
    id: 5,
    name: 'Downloads',
    children: [
      {
        id: 6,
        name: 'unnamed.txt',
      },
      {
        id: 7,
        name: 'Misc',
        children: [
          {
            id: 8,
            name: 'foo.txt',
          },
          {
            id: 9,
            name: 'bar.txt',
          },
        ],
      },
    ],
  },
];

export function FileExplorer() {
  const rows = [];

  for (let j = 0; j < data.length; j++) {
    rows.push(<Directory key={j} obj={data[j]} offset={0} />);
  }
  
  return (
    <>
      {rows}
    </>
  )
}

// ok, much better after revision
// followup: flat rendering structure
// instead of wrapping elements in nested divs, return a flat structure with empty tags
// each item is a div with a level of indentation set by offset
function Directory({ obj, offset }) {
  const { name, children } = obj;
  const [expanded, setExpanded] = useState(false);
  const hasChildren = Array.isArray(children) && children.length > 0;
  
  function renderChildren() {
    const childrenComponents = [];

    for (let i = 0; i < children.length; i++) {
      childrenComponents.push(<Directory key={i} obj={children[i]} offset={offset + 1} />);
    }

    return childrenComponents;
  }

  function renderName() {
    let displayName = name;
    let titleClassName = '';
    let onClick = null;

    // this syntax is a bit odd
    const style = {
      paddingLeft: `${offset * 10}px`
    };

    if (hasChildren) {
      displayName = expanded ? `${name} [-]` : `${name} [+]`;
      titleClassName = styles['directory-title'];
      onClick = () => {
        setExpanded(!expanded)
      };
    }
    console.log('rendering dir ', displayName);

    return (
      <div 
        className={titleClassName} 
        onClick={onClick}
        style={style}
      >
        {displayName}
      </div>
    )
  }

  return (
    <>
      {renderName()}
      {expanded && (
        hasChildren && renderChildren()
      )}
    </>
  )
}
