'use client';
import { useState, useEffect } from 'react';

export function JobBoard({ pageSize }) {
  // basically any data that has to be updated and persisted between renders needs to be state
  const [jobIds, setJobIds] = useState([]); // also needs to be stored as state
  const [index, setIndex] = useState(0); // this too
  const [posts, setPosts] = useState([]);

  // what if multiple callbacks try to update the state at the same time?
  // ...yup
  function createPost({ title, url, by, time, id }) {
    let titleStr;

    if (url) {
      titleStr = <a href={url}>{title}</a>
    } else {
      titleStr = title;
    }
    const timeStr = new Date(time).toLocaleString('en-US');

    const post = (
      <div key={id}>
        <h4>{titleStr}</h4>
        <span>{by + ' - ' + timeStr}</span>
      </div>
    );

    setPosts((current) => [...current, post]); // updater function to batch updates
  }

  function detailsTransfer(e) {
    if (e.currentTarget.status === 200) {
      const jobData = JSON.parse(e.currentTarget.response);
      createPost(jobData);
    } else {
      console.error(e.currentTarget.responseText);
    }
  }

  function fetchJob(id) {
    const req = new XMLHttpRequest();
    req.addEventListener('loadend', detailsTransfer);
    req.open('GET', `https://hacker-news.firebaseio.com/v0/item/${id}.json`);
    req.send();
  }

  function processBatch() {
    let i = 0;
    for (i; i < pageSize; i++) {
      if (i + index === jobIds.length)
        break;
      fetchJob(jobIds[i + index]);
    }
    setIndex(index + i);
  }

  function transferEnd(e) {
    if (e.currentTarget.status === 200) {
      // jobIds = JSON.parse(e.currentTarget.response);
      setJobIds(JSON.parse(e.currentTarget.response));
      // processBatch(); // cannot immediately use the changed setState value in the same block
    } else {
      console.error(e.currentTarget.responseText);
    }
  }

  function getJobIds() {
    const req = new XMLHttpRequest();
    req.open('GET', 'https://hacker-news.firebaseio.com/v0/jobstories.json');
    req.addEventListener('loadend', transferEnd);
    req.send();
  }

  useEffect(() => {
    getJobIds();
  }, []);

  useEffect(() => {
    processBatch();
  }, [jobIds]); // remember to wrap changing state vars in an array
  
  return (
    <article>
      {...posts}
      <button type="button" onClick={() => processBatch()} disabled={index === jobIds.length}>Load More</button>
    </article>
  )
}