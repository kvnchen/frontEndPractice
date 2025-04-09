'use client';
import styles from './styles.module.css';

export function Grail() {
  return (
    <>
      <header className={styles.header}>Header</header>
      <div className={styles.columns}>
        <nav className={styles.nav}>Nav</nav>
        <main className={styles.main}>Main</main>
        <aside className={styles.aside}>Sidebar</aside>
      </div>
      <footer className={styles.footer}>Footer</footer>
    </>
  )
}