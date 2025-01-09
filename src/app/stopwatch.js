'use client';
import { useState, useEffect } from 'react';

/**
 * lesson: can't rely on running functions after setState,
 * as they will run before the rerender that updates the state.
 * 
 * need to use useEffect to trigger callbacks after setState
 */

export function Stopwatch() {
  const [running, setRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [displayTime, setDisplay] = useState('0s 00');

  // trigger after pressing start/stop button
  useEffect(() => {
    if (running) {
      runWatch();
    }
  }, [running]);

  // trigger after runWatch() updates time
  useEffect(() => {
    if (running) {
      formatTime();
    }
  }, [time]);

  // trigger after formatTime updates display time to restart process
  useEffect(() => {
    if (running) {
      runWatch();
    }
  }, [displayTime]);

  function formatTime() {
    const seconds = Math.floor(time / 1000);
    const milli = Math.floor(time % 1000) / 10;
    const withZero = milli < 10 ? `0${milli}` : milli;

    setDisplay(`${seconds}s ${withZero}`);
  }

  function runWatch() {
    setTimeout(() => {
      if (running) {
        setTime(time + 10);
      }
    }, 10);
  }

  function toggleWatch() {
    if (!running) {
      setRunning(true);
    } else {
      setRunning(false);
    }
  }

  function reset() {
    setRunning(false);
    setTime(0);
    setDisplay('0s 00');
  }

  return (
    <article>
      <div>
        <span>{displayTime}</span>
      </div>
      <div>
        <button type="button" onClick={toggleWatch}>{running ? 'Stop' : 'Start'}</button>
        <button type="button" onClick={reset}>Reset</button>
      </div>
    </article>
  )
}