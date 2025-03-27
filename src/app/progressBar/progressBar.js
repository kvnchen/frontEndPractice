'use client';
import styles from './styles.module.css';

// you get nice rounded borders if you define border-radius in pixels rather than percentage
export function ProgressBar({ filled }) {
  function renderInner() {
    const width = Math.floor((filled / 100) * 500);

    return (
      <div className={styles.progress} style={{width: `${width}px`}}>
        <span>{filled}%</span>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      {renderInner()}
    </div>
  )
}