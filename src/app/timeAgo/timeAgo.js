'use client';
import { useState, useEffect } from 'react';

/**
 * under 1 second: just now
 * under a minute: less than 1 minute
 * under an hour: n minutes ago
 * under a day: n hours ago
 * under a week: n days ago
 * under a month: n weeks ago
 * under a year: n months ago
 * over a year: n years ago
 * 
 * time up, very confusing. this is HARD. 
 * incredibly easy to fuck up
 */

export function TimeAgo({time}) {
  const [diff, setDiff] = useState(Date.now() - time);

  const SECOND = 1000; // in ms
  const MINUTE = SECOND * 60;
  const HOUR = MINUTE * 60;
  const DAY = HOUR * 24;
  const WEEK = DAY * 7;
  const MONTH = DAY * 30; // simplification
  const YEAR = DAY * 365;

  const timesAsc = [SECOND, MINUTE, HOUR, DAY, WEEK, MONTH, YEAR]; // compare diff against thresholds
  
  function outputString(index) {
    function convertUnits() {
      if (index < 2)
        return null;
      
      const factors = [null, null, MINUTE, HOUR, DAY, WEEK, MONTH, YEAR];
      return Math.floor(diff / factors[index]);
    }
    const conversion = convertUnits();

    const outputs = [
      'Just Now',
      'Seconds ago',
      `${conversion} minutes ago`,
      `${conversion} hours ago`,
      `${conversion} days ago`,
      `${conversion} weeks ago`,
      `${conversion} months ago`,
      `${conversion} years ago`,
    ];

    return outputs[index];
  }

  // return index of timesAsc 
  function compareTime() {
    // console.log('diff', diff);
    for (let i = 0; i < timesAsc.length; i++) {
      const unit = timesAsc[i];
      if (diff < unit)
        return i;
    }
    return 7;
  }

  // this looks weird...
  useEffect(() => {
    // console.log('updating');
    setTimeout(() => {
      setDiff(Date.now() - time);
    }, timesAsc[Math.max(compareTime() - 1, 0)]); // eww..
  }, [diff]);

  return (
    <span>{outputString(compareTime())}</span>
  )
}