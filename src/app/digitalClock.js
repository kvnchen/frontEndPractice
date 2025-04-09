'use client';
import { useState, useEffect } from 'react';

export function DigitalClock() {
  
  function makeColon(key) {
    return <div className="big-colon" key={key}>:</div>;
  }

  // return an array of rows, each row an array of 3 column classes
  function renderZero() {
    const top = [
      'rectangle',
      'rectangle',
      'rectangle'
    ];

    const secondTop = [
      'rectangle',
      '',
      'rectangle'
    ];

    const middle = [
      'inverse-triangle-left',
      '',
      'inverse-triangle-right'
    ];

    const secondBottom = [
      'rectangle',
      '',
      'rectangle'
    ];

    const bottom = [
      'rectangle',
      'rectangle',
      'rectangle'
    ];

    return [top, secondTop, middle, secondBottom, bottom];
  }

  function renderOne() {
    const top = [
      '',
      '',
      'triangle-bottom-right'
    ];

    const secondTop = [
      '',
      '',
      'rectangle'
    ];

    const middle = [
      '',
      '',
      'inverse-triangle-right'
    ];

    const secondBottom = [
      '',
      '',
      'rectangle'
    ];

    const bottom = [
      '',
      '',
      'triangle-top-right'
    ];

    return [top, secondTop, middle, secondBottom, bottom];
  }

  function renderTwo() {
    const top = [
      'triangle-top-right',
      'rectangle',
      'rectangle'
    ];

    const secondTop = [
      '',
      '',
      'rectangle'
    ];

    const middle = [
      'triangle-bottom-right',
      'rectangle',
      'triangle-top-left'
    ];

    const secondBottom = [
      'rectangle',
      '',
      ''
    ];

    const bottom = [
      'rectangle',
      'rectangle',
      'triangle-bottom-left'
    ];

    return [top, secondTop, middle, secondBottom, bottom];
  }

  function renderThree() {
    const top = [
      'triangle-top-right',
      'rectangle',
      'rectangle'
    ];

    const secondTop = [
      '',
      '',
      'rectangle'
    ];

    const middle = [
      'triangle-left',
      'rectangle',
      'rectangle'
    ];

    const secondBottom = [
      '',
      '',
      'rectangle'
    ];

    const bottom = [
      'triangle-bottom-right',
      'rectangle',
      'rectangle'
    ];

    return [top, secondTop, middle, secondBottom, bottom];
  }

  function renderFour() {
    const top = [
      'triangle-bottom-left',
      '',
      'triangle-bottom-right'
    ];

    const secondTop = [
      'rectangle',
      '',
      'rectangle'
    ];

    const middle = [
      'triangle-top-right',
      'rectangle',
      'rectangle'
    ];

    const secondBottom = [
      '',
      '',
      'rectangle'
    ];

    const bottom = [
      '',
      '',
      'triangle-top-right'
    ];

    return [top, secondTop, middle, secondBottom, bottom];
  }

  function renderFive() {
    const top = [
      'rectangle',
      'rectangle',
      'triangle-top-left'
    ];

    const secondTop = [
      'rectangle',
      '',
      ''
    ];

    const middle = [
      'triangle-top-right',
      'rectangle',
      'rectangle'
    ];

    const secondBottom = [
      '',
      '',
      'rectangle'
    ];

    const bottom = [
      'triangle-bottom-right',
      'rectangle',
      'rectangle'
    ];

    return [top, secondTop, middle, secondBottom, bottom];
  }

  function renderSix() {
    const top = [
      'rectangle',
      'rectangle',
      'triangle-top-left'
    ];

    const secondTop = [
      'rectangle',
      '',
      ''
    ];

    const middle = [
      'rectangle',
      'rectangle',
      'rectangle'
    ];

    const secondBottom = [
      'rectangle',
      '',
      'rectangle'
    ];

    const bottom = [
      'rectangle',
      'rectangle',
      'rectangle'
    ];

    return [top, secondTop, middle, secondBottom, bottom];
  }

  function renderSeven() {
    const top = [
      'triangle-top-right',
      'rectangle',
      'rectangle'
    ];

    const secondTop = [
      '',
      '',
      'rectangle'
    ];

    const middle = [
      '',
      '',
      'inverse-triangle-right'
    ];

    const secondBottom = [
      '',
      '',
      'rectangle'
    ];

    const bottom = [
      '',
      '',
      'triangle-top-right'
    ];

    return [top, secondTop, middle, secondBottom, bottom];
  }

  function renderEight() {
    const top = [
      'rectangle',
      'rectangle',
      'rectangle'
    ];

    const secondTop = [
      'rectangle',
      '',
      'rectangle'
    ];

    const middle = [
      'rectangle',
      'rectangle',
      'rectangle'
    ];

    const secondBottom = [
      'rectangle',
      '',
      'rectangle'
    ];

    const bottom = [
      'rectangle',
      'rectangle',
      'rectangle'
    ];

    return [top, secondTop, middle, secondBottom, bottom];
  }

  function renderNine() {
    const top = [
      'rectangle',
      'rectangle',
      'rectangle'
    ];

    const secondTop = [
      'rectangle',
      '',
      'rectangle'
    ];

    const middle = [
      'triangle-top-right',
      'rectangle',
      'rectangle'
    ];

    const secondBottom = [
      '',
      '',
      'rectangle'
    ];

    const bottom = [
      '',
      '',
      'triangle-top-right'
    ];

    return [top, secondTop, middle, secondBottom, bottom];
  }


  function renderDigit(n, key) {
    let classes = [
      ['','',''],
      ['','',''],
      ['','',''],
      ['','',''],
      ['','',''],
    ];

    switch (n) {
      case 0:
        classes = renderZero();
        break;
      case 1:
        classes = renderOne();
        break;
      case 2:
        classes = renderTwo();
        break;
      case 3:
        classes = renderThree();
        break;
      case 4:
        classes = renderFour();
        break;
      case 5:
        classes = renderFive();
        break;
      case 6:
        classes = renderSix();
        break;
      case 7:
        classes = renderSeven();
        break;
      case 8:
        classes = renderEight();
        break;
      case 9:
        classes = renderNine();
        break; 
    }

    const rows = [];

    for (let i = 0; i < 5; i++) {
      const columns = [];
      for (let j = 0; j < 3; j++) {
        if (j % 2 === 0) {
          columns.push(<div key={j} className={`digit-column digit-column-short ${classes[i][j]}`}></div>)
        } else {
          columns.push(<div key={j} className={`digit-column digit-column-wide ${classes[i][j]}`}></div>);
        }
      }

      if (i % 2 === 0) {
        rows.push((
          <div key={i} className="digit-row digit-short-row">
            {...columns}
          </div>
        ));
      } else {
        rows.push((
          <div key={i} className="digit-row digit-tall-row">
            {...columns}
          </div>
        ));
      }
    }

    return (
      <div className="digit-container" key={key}>
        {...rows}
      </div>
    );
  }
  
  const [digits, setDigits] = useState([]);
  const [timeStr, setTimeStr] = useState('');

  function setTime() {
    const asString = new Date().toLocaleTimeString('en-GB');
    // console.log('timestr', timeStr); // empty????? unreliable??
    const output = [];

    for (let i = 0; i < asString.length; i++) {
      const c = asString[i];

      if (c === ':')
        output.push(makeColon(i));
      else
        output.push(renderDigit(Number(c), i));
    }

    setDigits(output);
    setTimeStr(asString);
  }

  function update() {
    setTimeout(() => {
      setTime();
      update();
    }, 1000);
  }

  function init() {
    const now = new Date();
    const asString = now.toLocaleTimeString('en-GB');
    const ds = [];
    
    for (let i = 0; i < asString.length; i++) {
      const c = asString[i];

      if (c === ':') {
        ds.push(makeColon(i));
      } else {
        ds.push(renderDigit(Number(c), i));
      }
    }

    setDigits(ds);
    setTimeStr(asString);
    update();
  }

  useEffect(init, []);

  return (
    <div className="clock">
      <time dateTime={timeStr}>
        {digits}
      </time>
    </div>
  )
}