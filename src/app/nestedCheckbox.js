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
  const [map, setMap] = useState({});
  const [boxes, setBoxes] = useState([]);

  const tempMap = {}; // might lose all our bindings on setState...

  // return an array of react subcomponents. map can be edited as we go?
  function NestedBox(data, map, parentId) {
    const rows = [];

    function makeRow({ id, name, children }) {
      map[id] = {
        checked: false,
      };

      if (parentId)
        map[id].parentId = parentId;

      const cData = [];

      if (Array.isArray(children)) {
        map[id].children = [];

        for (const child of children) {
          map[id].children.push(child.id);
          cData.push(NestedBox(child));
        }
      }

      return (
        <div>
          <label>
            {name}
            <input type='checkbox' defaultChecked={false}  />
          </label>
          {...cData}
        </div>
      )
    }

    for (const item of data) {

    }
  }

  return (
    <div>
      {...boxes}
    </div>
  )
}