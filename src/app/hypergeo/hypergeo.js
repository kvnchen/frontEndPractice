'use client';
import styles from './styles.module.css';
import { useState } from 'react';
import { hypergeometric, atLeast, none, pretty } from './formulas.js';

export function Hypergeo() {
  const [exact, setExact] = useState(null);
  const [atLeastHits, setAtLeast] = useState(null);
  const [noHits, setNoHits] = useState(null);
  const [targetHits, setTarget] = useState(null);

  function calculate(formData) {
    let { population, sample, hits, target } = Object.fromEntries(formData.entries());
    population = Number(population);
    sample = Number(sample);
    hits = Number(hits);
    target = Number(target);

    setTarget(target);
    setAtLeast(pretty(atLeast(population, sample, hits, target)));
    setExact(pretty(hypergeometric(population, sample, hits, target)));
    setNoHits(pretty(none(population, sample, hits, target)));
  }

  return (
    <article className={styles.hypergeo}>
      <h2>Hypergeometric Calculator</h2>
      <form action={calculate}>
        <div className={styles.row}>
          <label htmlFor='population'>
            Population
          </label>
          <input id='population' name='population' type='number' min='0' max='1000' step='1' required autoFocus />
        </div>
        <div className={styles.row}>
          <label htmlFor='sample'>
            Sample Size
          </label>
          <input id='sample' name='sample' type='number' min='0' max='1000' step='1' required />
        </div>
        <div className={styles.row}>
          <label htmlFor='hits'>
            Successes in Population
          </label>
          <input id='hits' name='hits' type='number' min='0' max='1000' step='1' required />
        </div>
        <div className={styles.row}>
          <label htmlFor='target'>
            Successes in Sample
          </label>
          <input id='target' name='target' type='number' min='0' max='1000' step='1' required />
        </div>
        <div>
          <button type='submit'>Calculate</button>
        </div>
      </form>
      <div hidden={atLeastHits === null}>
        At least {targetHits}: <span>{atLeastHits}</span>
      </div>
      <div hidden={exact === null}>
        Exactly {targetHits}: <span>{exact}</span>
      </div>
      <div hidden={noHits === null}>
        None: <span>{noHits}</span>
      </div>
    </article>
  )
}