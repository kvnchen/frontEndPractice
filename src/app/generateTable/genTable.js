'use client';
import { useState } from 'react';
import styles from './styles.module.css';

// time up, testing
// type from form wrong, table css wrong, number sequence wrong
// table needs css border-collapse: collapse to make the cells not have gaps
// adding padding inside column cells makes it look nice
export function GenTable() {
  const [rows, setRows] = useState(null);
  const [columns, setColumns] = useState(null);

  function processForm(formData) {
    const { rows, columns } = Object.fromEntries(formData.entries());

    setRows(Number(rows)); // annoying we have to coerce the type back
    setColumns(Number(columns));
  }

  function generateTable() {
    const tableRows = [];
    let monotonic = 1;

    for (let i = 0; i < rows; i++) {
      const rowColumns = [];

      for (let j = 0; j < columns; j++) {
        rowColumns.push(
          <td key={`column-${j}`} className={styles.column}>{monotonic}</td> // ordering intentionally wrong
        );
        monotonic++;
      }

      tableRows.push(
        <tr key={`row-${i}`} >{rowColumns}</tr>
      );
    }

    return (
      <table className={styles.table}>
        <tbody>
          {tableRows}
        </tbody>
      </table>
    )
  }
  
  return (
    <article>
      <form action={processForm}>
        <div className={styles.inputRow}>
          <label>
            Rows
            <input className={styles.input} name="rows" type="number" min="1" required />
          </label>
        </div>
        <div className={styles.inputRow}>
          <label>
            Columns
            <input className={styles.input} name="columns" type="number" min="1" required />
          </label>
        </div>
        <div className={styles.inputRow}>
          <button type="submit">Submit</button>
        </div>
      </form>
      { rows !== null && columns !== null && generateTable()}
    </article>
  )
}