'use client';
import { useState, useEffect } from 'react';

/**
 * dynamically setting the height of bars was rough, just like original implementation
 */

export function Histogram() {
  const url = 'https://www.random.org/integers/?num=200&min=1950&max=2019&col=1&base=10&format=plain';
  const init = {};

  for (let i = 1950; i < 2020; i += 10) {
    init[i] = 0;
  }

  const [buckets, setBuckets] = useState(init);

  function processData(str) {
    const rows = str.split('\n');
    const newMap = { ... buckets };

    for (const row of rows) {
      if (row.length === 4) {
        const n = Math.floor(Number(row) / 10) * 10;
        newMap[n]++;
      }
    }

    setBuckets(newMap);
  }

  function transferEnd(e) {
    const status = Math.floor(e.currentTarget.status / 100);
    if (status === 2) {
      processData(e.currentTarget.responseText);
    } else if (status === 4)
      console.error(e.currentTarget.responseText);
  }

  function createGraph() {
    let max = 0;
    for (const k of Object.keys(buckets)) {
      if (buckets[k] > max)
        max = buckets[k];
    }
    max = Math.ceil(max / 10) * 10;

    function yAxis() {

      const steps = [];

      for (let i = max; i >= 0; i -= 10) {
        steps.push(
          <div key={`y-step-${i}`} className={i > 0 ? 'y-step' : 'y-step-0'}>{i}</div>
        );
      }

      return (
        <div className='y-axis'>
          {...steps}
        </div>
      )
    }

    function xAxis() {
      const columns = [];
      const maxHeight = (max / 10) * 50;

      for (const year of Object.keys(buckets)) {
        const style = {};
        const height = Math.floor(maxHeight * (buckets[year] / max));
        const spacer = maxHeight - height;
        style.height = `${height}px`;
        style.top = `${spacer}px`;

        columns.push(
          <div className='x-column' key={`x-column-${year}`}>
            <div className='x-bar' style={style}></div>
            <div className='x-footer' style={{top: `${spacer}px`}}>{year}</div>
          </div>
        );
      }

      return (
        <div className='graph'>
          {...columns}
        </div>
      )
    }

    return (
      <>
        {yAxis()}
        {xAxis()}
      </>
    )
  }

  useEffect(() => {
    const req = new XMLHttpRequest();
    req.open('GET', url);
    req.addEventListener('loadend', transferEnd);
    req.send();
  }, []);

  // useEffect(() => {
  //   createGraph();
  // }, [buckets]);
  
  return (
    <article className='histogram'>
      {createGraph()}
    </article>
  )
}