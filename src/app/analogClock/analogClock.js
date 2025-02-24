'use client';
import styles from './styles.module.css';
import { useState, useEffect } from 'react';

/**
 * their solution just rerenders hand positions every second... 
 * not sure how to pass initial hand position to keyframes
 * 
 * maybe transition is what I'm looking for?
 * 
 * well, setTimeout implementation was a lot simpler
 * hand offset positions were tricky, needed to see visual output
 */
export function AnalogClock() {
  const [time, setTime] = useState(new Date());

  function render() {
    // used to set initial position of clock hands
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

    const secondsRotation = Math.floor((seconds / 60) * 360);
    const minutesRotation = Math.floor((minutes / 60) * 360);
    const hoursRotation = Math.floor((hours / 12) * 360);

    return (
      <>
        <div className={styles.seconds} style={
          {
            transform: `rotate(${secondsRotation}deg)`
          }}>
        </div>
        <div className={styles.minutes} style={
          {
            transform: `rotate(${minutesRotation}deg)`
          }}>
        </div>
        <div className={styles.hours} style={
          {
            transform: `rotate(${hoursRotation}deg)`
          }}>
        </div>
      </>
    )
  }

  function updateTime() {
    setTimeout(() => {
      setTime(new Date());
      updateTime();
    }, 1000);
  }

  useEffect(() => {
    updateTime();
  }, []);

  return (
    <article className={styles.clock}>
      {render()}
    </article>
  )
}