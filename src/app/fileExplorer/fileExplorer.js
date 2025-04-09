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
    const d = data[j]
    rows.push(<Directory key={j} obj={d} />);
  }
  
  return (
    <>
      {rows}
    </>
  )
}

// ok, much better after revision
function Directory({ obj }) {
  const { name, children } = obj;
  const [expanded, setExpanded] = useState(false);
  const hasChildren = Array.isArray(children) && children.length > 0;
  
  function renderChildren() {
    const childrenComponents = [];

    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      childrenComponents.push(<Directory key={i} obj={child} />);
    }

    return childrenComponents;
  }

  function renderName() {
    let displayName = name;
    let titleClassName = '';
    let onClick = null;

    if (hasChildren) {
      displayName = expanded ? `${name} [-]` : `${name} [+]`;
      titleClassName = styles['directory-title'];
      onClick = () => {
        setExpanded(!expanded)
      };
    }
    console.log('rendering dir ', displayName);

    return (
      <span 
        className={titleClassName} 
        onClick={onClick}
      >
        {displayName}
      </span>
    )
  }

  return (
    <div>
      {renderName()}
      {expanded && (
        <div className={styles['directory-offset']}>
          {hasChildren && renderChildren()}
        </div>
      )}
    </div>
  )
}
