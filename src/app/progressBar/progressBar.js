'use client';
import styles from './styles.module.css';

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