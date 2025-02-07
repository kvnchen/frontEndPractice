'use client';
import { useState } from 'react';
import styles from './styles.module.css'

/**
 * name: [first, last]
 * users: { id: name }
 * selected: index?
 * 
 * time up, still writing event listeners
 * 
 * forgot about binding input value to state
 * didnt know how to add scroll to div
 * 
 * ~25 min over, but went over everything carefully, works beautifully
 * styling slightly off
 */

export function UsersDatabase() {
  const [monotonic, setMonotonic] = useState(0);
  const [users, setUsers] = useState({});
  const [selected, setSelected] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [filter, setFilter] = useState('');

  function createUser() {
    const temp = { ... users };
    temp[monotonic] = [firstName, lastName];
    setMonotonic(monotonic + 1);
    setFirstName('');
    setLastName('');
    setUsers(temp);
  }

  function updateUser() {
    const temp = { ... users };
    if (firstName !== '')
      temp[selected][0] = firstName;
    if (lastName !== '')
      temp[selected][1] = lastName;
    setFirstName('');
    setLastName('');
    setUsers(temp);
  }

  function deleteUser() {
    const temp = { ... users };
    delete temp[selected];
    setSelected(null);
    setUsers(temp);
  }

  function cancel() {
    setSelected(null);
    setFirstName('');
    setLastName('');
  }

  function renderList() {
    const filtered = Object.keys(users).filter((key) => users[key].join(' ').includes(filter));
    const output = [];

    for (const key of filtered) {
      output.push(
        <div 
          key={key} 
          onClick={() => setSelected(key)}
          className={key === selected ? styles.selected : ''}
        >
          {`${users[key][0]} ${users[key][1]}`}
        </div>
      );
    }

    return (
      <div className={styles.list}>
        {...output}
      </div>
    )
  }

  return (
    <article className={styles.userDB}>
      <div className={styles.searchRow}>
        <input type='text' placeholder='Search' value={filter} onChange={(e) => setFilter(e.target.value) } />
      </div>
      <div className={styles.content}>
        {renderList()}
        <div className={styles.fields}>
          <label>
            First Name:
            <input type='text' className={styles.input} value={firstName} onChange={(e) => setFirstName(e.target.value) } />
          </label>
          <label>
            Last Name:
            <input type='text' className={styles.input} value={lastName} onChange={(e) => setLastName(e.target.value) } />
          </label>
        </div>
      </div>
      <div>
        <button 
          type='button' 
          className={styles.button}
          disabled={selected !== null || firstName === '' || lastName === ''}
          onClick={createUser}
        >
          Create 
        </button>
        <button 
          type='button'
          className={styles.button}
          disabled={selected === null || (firstName === '' && lastName === '')}
          onClick={updateUser}
        >
          Update
        </button>
        <button 
          type='button'
          className={styles.button}
          disabled={selected === null}
          onClick={deleteUser}
        >
          Delete
        </button>
        <button 
          type='button'
          disabled={selected === null}
          onClick={cancel}
        >
          Cancel
        </button>
      </div>
    </article>
  )
}