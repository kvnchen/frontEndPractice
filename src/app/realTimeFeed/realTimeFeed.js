'use client';
import { useState, useEffect } from 'react';
import styles from './styles.module.css';

export function RealTimeFeed() {
  const [feedData, setFeedData] = useState([
    {
      id: 1,
      title: 'HTML',
      text: `The HyperText Markup Language or HTML is the
  standard markup language for documents designed to
  be displayed in a web browser.`
    }
  ]);

  // returns a function that when called, returns last item if there are still items, otherwise null
  function simulateData() {
    const moreData = [
      {
        id: 2,
        title: 'CSS',
        text: `
  Cascading Style Sheets is a style sheet language
  used for describing the presentation of a document
  written in a markup language such as HTML or XML.
  `
      },
      {
        id: 3,
        title: 'JavaScript',
        text: `
  JavaScript, often abbreviated as JS, is a
  programming language that is one of the core
  technologies of the World Wide Web, alongside HTML
  and CSS.
  `
      }
    ];

    return () => {
      if (moreData.length > 0) {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(moreData.pop());
          }, 1000);
        });
      } else return Promise.resolve(null);
    }
  }

  useEffect(() => {
    const getData = simulateData();

    // recursive async function that calls itself again if the last attempt was successful
    async function attempt() {
      try {
        const data = await getData();
        if (data !== null) {
          setFeedData((prevState) => {
            return [
              data,
              ...prevState
            ];
          });
          attempt(); // apparently this works
        }
      } catch (e) {
        console.error(e.message);
      }
    }
    
    attempt();
  }, []);

  function renderFeed() {
    const output = [];

    for (const item of feedData) {
      output.push(
        <article key={item.id} className={styles.card}>
          <h4>{item.title}</h4>
          <p>{item.text}</p>
        </article>
      );
    }

    return output;
  }
  
  return (
    <div>
      {renderFeed()}
    </div>
  )
}