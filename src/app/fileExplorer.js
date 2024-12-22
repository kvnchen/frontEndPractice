'use client';
import { useState } from 'react';

export function FileExplorer() {
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

  const rows = [];

  function makeDirectory(key, obj) {
    const { name, children } = obj;
    const [showChildren, setShowChildren] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const childrenComponents = [];
    
    let titleClassName = '';
    let defaultName = name;

    if (Array.isArray(children) && children.length > 0) {
      defaultName = `${name} [+]`;
      titleClassName = 'directory-title';
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        childrenComponents.push(makeDirectory(i, child));
      }
    }

    const [displayName, setDisplayName] = useState(defaultName);

    // wtf
    function toggle() {
      if (expanded) {
        setDisplayName(`${name} [+]`);
        setShowChildren(false);
        setExpanded(false);
      } else {
        setDisplayName(`${name} [-]`);
        setShowChildren(true);
        setExpanded(true);
      }
    }

    return (
      <div key={key}>
        <span className={titleClassName} onClick={toggle}>{displayName}</span>
        {showChildren && (
          <div className='directory-offset'>
            {...childrenComponents}
          </div>
        )}
      </div>
    )
  }

  for (let j = 0; j < data.length; j++) {
    const d = data[j]
    rows.push(makeDirectory(j, d));
  }
  
  return (
    <>
      {...rows}
    </>
  )
}
