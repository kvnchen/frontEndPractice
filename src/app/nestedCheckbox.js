'use client';
import { useState } from 'react';

const rawData = [
  {
    "id": 1,
    "name": "Electronics",
    "checked": false,
    "children": [
      {
        "id": 2,
        "name": "Mobile phones",
        "checked": false,
        "children": [
          {
            "id": 3,
            "name": "iPhone",
            "checked": false
          },
          {
            "id": 4,
            "name": "Android",
            "checked": false
          }
        ]
      },
      {
        "id": 5,
        "name": "Laptops",
        "checked": false,
        "children": [
          {
            "id": 6,
            "name": "MacBook",
            "checked": false
          },
          {
            "id": 7,
            "name": "Surface Pro",
            "checked": false
          }
        ]
      }
    ]
  },
  {
    "id": 8,
    "name": "Books",
    "checked": false,
    "children": [
      {
        "id": 9,
        "name": "Fiction",
        "checked": false
      },
      {
        "id": 10,
        "name": "Non-fiction",
        "checked": false
      }
    ]
  },
  {
    "id": 11,
    "name": "Toys",
    "checked": false
  }
];

export function NestedCheckbox() {
  function initialize(data, map, parentId) {
    for (const item of data) {
      map[item.id] = {
        checked: false,
        name: item.name
      };

      if (parentId) {
        map[item.id].parentId = parentId;
        map[parentId].children.push(item.id);
      }

      if (Array.isArray(item.children) && item.children.length > 0) {
        map[item.id].children = [];
        initialize(item.children, map, item.id);
      }
    }
  }
  const temp = {};
  initialize(rawData, temp);

  const [map, setMap] = useState(temp);
  const [indeterminate, setIndeterminate] = useState({});

  function NestedBox(data) {
    const rows = [];

    // can we just change properties of map then call setMap on map?
    // sorta? we can change map, then setMap to a new object that's a clone of map
    function toggle(e) {
      const id = e.target.id;
      
      function toggleDescendants(id) {
        map[id].checked = e.target.checked;

        if (Array.isArray(map[id].children)) {
          for (const childId of map[id].children) {
            toggleDescendants(childId);
          }
        }
      }
      toggleDescendants(id);

      function toggleAncestors(id) {
        let hasChecked = false;
        let hasUnchecked = false;

        function checkDescendants(cid) {
          for (const childId of map[cid].children) {
            if (map[childId].checked) {
              hasChecked = true;
            } else 
              hasUnchecked = true;
            
            if (map[childId].children) {
              checkDescendants(childId);
            }
          }
        }

        checkDescendants(id);

        if (hasChecked && hasUnchecked) {
          indeterminate[id] = true;
          map[id].checked = false;
        } else if (hasChecked) {
          map[id].checked = true;
          delete indeterminate[id];
        } else if (hasUnchecked) {
          map[id].checked = false;
          delete indeterminate[id];
        }

        if (map[id].parentId) {
          toggleAncestors(map[id].parentId);
        }
      }

      if (map[id].parentId) {
        toggleAncestors(map[id].parentId);
      }
      
      setMap({...map});
      setIndeterminate({...indeterminate});
    }

    function makeRow({ id, name, children }) {
      let cData;

      if (Array.isArray(children) && children.length > 0) {
        cData = NestedBox(children);
      }

      return (
        <div className='nested-checkbox-row' key={id}>
          <label className={indeterminate[id] ? 'nested-checkbox-indeterminate' : ''} >
            {name}
            <input 
              id={id} 
              type='checkbox' 
              checked={map[id].checked} 
              onChange={toggle} 
            />
          </label>
          {cData}
        </div>
      )
    }

    for (const item of data) {
      rows.push(makeRow(item));
    }

    return (
      <>
        {...rows}
      </>
    )
  }

  return (
    <article className='nested-checkbox'>
      {NestedBox(rawData)}
    </article>
  )
}