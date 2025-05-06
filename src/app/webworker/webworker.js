'use client';
import { useState, useEffect } from 'react';

/**
Task: Create a component with an input for a number and a button. 
When the button is clicked, send the number to a Web Worker to perform a computationally intensive task (e.g., calculate all primes up to that number, or compute a Fibonacci sequence). 
Display a loading indicator while the worker is busy, and show the result when the worker posts it back. The main UI thread should remain responsive.

Focus: Web Workers API (creating worker, postMessage, onmessage), asynchronous communication between threads, preventing UI blocking.

ok, webworker script was 404'ing in the node.js console, didn't notice
relative path was being checked relative to the bundled html page, not this script
had to pass in a new URL recommended by MDN to fix
 */
export function WebworkerComponent() {
  const [result, setResult] = useState(null);
  const [myWorker, setWorker] = useState(null);
  const [loadState, setLoadState] = useState('none');

  useEffect(() => {
    // spawn dedicated worker? does this need to be in state?
    const worker = new Worker(new URL('./worker.js', import.meta.url)); // need to pass URL that is resolved relative to the script, and not the current HTML page
    worker.onmessage = (e) => {
      // console.log('received message from worker: ', e);
      setLoadState('done');
      setResult(e.data);
    };
    setWorker(worker);

    return () => {
      worker.terminate();
    };
  }, []);

  function handleSubmit(formData) {
    const { n } = Object.fromEntries(formData.entries());
    // console.log('sending message to worker: ', n);
    setLoadState('loading');
    myWorker.postMessage(n);
  }
  
  return (
    <article>
      <form action={handleSubmit}>
        <div>
          <label>
            Input
            <input type='number' name='n' />
          </label>
        </div>
        <div>
          <button type='submit'>Submit</button>
        </div>
      </form>
      <div>
        {loadState === 'loading' && 'Loading'}
        {loadState === 'done' && <span>{result}</span>}
      </div>
    </article>
  )
}