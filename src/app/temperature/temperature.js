'use client';
import { useState } from 'react';
import styles from './styles.module.css';

// forgot how to bind input to state in react
// time up, doing css
// input has a lot of built in styling that is hard to override

export function TemperatureConverter() {
  const [celsius, setCelsius] = useState(0);
  const [fahrenheit, setFahrenheit] = useState(32);

  function cToF(c) {
    return (Math.floor((c * 1.8) * 10000) / 10000) + 32;
  }

  function fToC(f) {
    return Math.floor(((f - 32) / 1.8) * 10000) / 10000;
  }

  function updateTemps(c, f) {
    if (f === null) {
      setCelsius(c);
      setFahrenheit(cToF(c));
    } else {
      setFahrenheit(f);
      setCelsius(fToC(f));
    }
  }

  return (
    <article className={styles.converter}>
      <div className={styles.section}>
        <input id='celsius' type='number' value={celsius} onChange={e => updateTemps(e.target.value, null)} />
        <label htmlFor='celsius'>Celsius</label>
      </div>
      <p className={styles.p}>=</p>
      <div className={styles.section}>
        <input id='fahrenheit' type='number' value={fahrenheit} onChange={e => updateTemps(null, e.target.value)} />
        <label htmlFor='fahrenheit'>Fahrenheit</label>
      </div>
    </article>
  )
}