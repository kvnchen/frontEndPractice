'use client';
import { useState } from 'react';
import styles from './styles.module.css';

function getMonthName(currentYear, currentMonth) {
  return new Date(currentYear, currentMonth, 1).toLocaleString('default', { month: 'long' });
}

const dayMap = [
  'SUN',
  'MON',
  'TUE',
  'WED',
  'THU',
  'FRI',
  'SAT'
];

/**
 * pretty close on blind run, just messed up the flex cells by declaring flex shorthand
 * and needed to override <p> default styling
 * 
 */
export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear()); // getYear() is stupid so we need to use getFullYear

  function toggleMonth(mod) {
    let nextMonth;
    let nextYear = currentYear;

    if (mod === -1) {
      nextMonth = (currentMonth - 1 + 12) % 12;
      if (nextMonth === 11)
        nextYear--;
    } else {
      nextMonth = (currentMonth + 1 + 12) % 12;
      if (nextMonth === 0)
        nextYear++;
    }

    setCurrentMonth(nextMonth);
    setCurrentYear(nextYear);
  }

  /* 
    data needed: 
      # days in prev month
      # days in current month
      day of the 1st of this month (for offset)
  */
  function renderGrid() {
    const output = [];

    // 0 in date arg sets this as the LAST day of the PREV month
    // so we also need to increment the month arg to get the number of days in THIS month
    const daysInThisMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // same trick, different month
    const daysInLastMonth = new Date(currentYear, currentMonth, 0).getDate();

    const offset = new Date(currentYear, currentMonth, 1).getDay();

    const data = [];

    // populate dates of prev month to pad front
    for (let i = daysInLastMonth - offset + 1; i <= daysInLastMonth; i++) {
      data.push([i, false]);
    }

    for (let j = 1; j <= daysInThisMonth; j++) {
      data.push([j, true]);
    }

    // 6 rows, so 42 cells
    for (let k = 1; k <= 42 - daysInThisMonth - offset; k++) {
      data.push([k, false]);
    }

    for (let n = 0; n < data.length; n++) {
      const tuple = data[n];
      let styling;
      if (!tuple[1])
        styling = styles.gray;
      else if (tuple[0] === currentDate.getDate())
        styling = styles.green;

      output.push(
        <div key={n} className={styles.cell}>
          {n < 7 && <p>{dayMap[n]}</p>}
          <p className={styling}>{tuple[0]}</p>
        </div>
      );
    }

    return output;
  }

  return (
    <article className={styles.calendar}>
      <div className={styles.leftPanel}>
        <h2>{dayMap[currentDate.getDay()]}</h2>
        <p className={styles.bigDate}>
          {currentDate.getDate()}
        </p>
      </div>
      <div className={styles.rightPanel}>
        <div className={styles.buttonRow}>
          <button onClick={() => toggleMonth(-1)}>{'<'}</button>
          <h4>{`${getMonthName(currentYear, currentMonth)} ${currentYear}`}</h4>
          <button onClick={() => toggleMonth(1)}>{'>'}</button>
        </div>
        <div className={styles.grid}>
          {renderGrid()}
        </div>
      </div>
    </article>
  )
}
