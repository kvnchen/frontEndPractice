'use client';
import { useState } from 'react';

/**
 * this was way easier than vanilla js
 */
export function Carousel() {
  const images = [
    {
      src: 'https://picsum.photos/id/600/600/400',
      alt: 'Forest',
    },
    {
      src: 'https://picsum.photos/id/100/600/400',
      alt: 'Beach',
    },
    {
      src: 'https://picsum.photos/id/200/600/400',
      alt: 'Yak',
    },
    {
      src: 'https://picsum.photos/id/300/600/400',
      alt: 'Hay',
    },
    {
      src: 'https://picsum.photos/id/400/600/400',
      alt: 'Plants',
    },
    {
      src: 'https://picsum.photos/id/500/600/400',
      alt: 'Building',
    },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  function changeIndex(n) {
    const next = (currentIndex + n + images.length) % images.length;
    setCurrentIndex(next);
  }

  function prev() {
    changeIndex(-1);
  }

  function next() {
    changeIndex(1);
  }

  function jump(e) {
    const index = Number(e.target.id.split('-')[1]);
    setCurrentIndex(index);
  }

  function makeButtonRow() {
    const row = [];
    for (let i = 0; i < images.length; i++) {
      row.push(<button className={i === currentIndex ? 'nav active' : 'nav'} key={i} id={`nav-${i}`} onClick={jump}></button>);
    }

    return (
      <div className='button-row'>
        {...row}
      </div>
    )
  }
  
  return (
    <article className='carousel'>
      <button type="button" className='prev' onClick={prev}>&lt;</button>
      <img className='carousel-img' src={images[currentIndex].src}></img>
      <button type="button" className='next' onClick={next}>&gt;</button>
      {makeButtonRow()}
    </article>
  )
}