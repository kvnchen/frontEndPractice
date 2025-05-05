'use client';
import { useState, useEffect } from 'react';
import styles from './styles.module.css';

/**

Task: Implement a component that accurately reflects the browser's online/offline status using navigator.onLine and the online/offline window events. 
As a bonus: add a simple input field; if the user tries to "save" data while offline, cache it (e.g., in localStorage) and indicate that it will sync when back online.

Focus: Browser APIs (navigator.onLine, events), simple data persistence (localStorage), handling network state changes.

Navigator: 
  interface representing the state and identity of the user agent
  access via window.navigator

  .onLine
    boolean indicating whether the device is connected to the network
    when its value changes, an online or offline event is fired on the window
  
We can add an event listener to the window online/offline event

window.addEventListener('online', (event) => {})
 */
export function Offline() {
  const [isOnline, setIsOnline] = useState(false); // component doesn't seem to have access to the window object here

  useEffect(() => {
    // can access the window object here though
    setIsOnline(window.navigator.onLine);
    window.addEventListener('online', () => {
      setIsOnline(true);
      const retrieve = localStorage.getItem('name');
      if (retrieve !== null) {
        console.log('restored from local storage: ', retrieve);
        localStorage.setItem('name', null);
      }
    });
    window.addEventListener('offline', () => {
      setIsOnline(false);
    })
  }, []);

  function handleSubmit(formData) {
    const formJSON = Object.fromEntries(formData.entries());
    const { name } = formJSON;
    
    if (isOnline)
      console.log(name);
    else {
      console.log(`saving name ${name} to localStorage`);
      localStorage.setItem('name', name);
    }
  }
  
  return (
    <article>
      <div>
        <span className={`${styles.indicator} ${(isOnline ? styles.online : styles.offline)}`}></span>
        <span className={styles.tag}>{isOnline ? 'Online' : 'Offline'}</span>
      </div>
      <form action={handleSubmit}>
        <label>
          Name
          <input type='text' name='name'></input>
        </label>
        <button type='submit'>Submit</button>
      </form>
    </article>
  )
}