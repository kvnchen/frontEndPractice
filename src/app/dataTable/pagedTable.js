'use client';
import { useState, useEffect } from 'react';
import styles from './styles.module.css';

const data = require('./employees.json');

/**
 * add sorting
 * 
 * state:
 *   sortColumn: id
 *   sortAsc: true // toggle
 * 
 * sortRows()
 *   called when a column button is pressed
 *   based off two sorting state vars
 *   sort rows
 * 
 * 14:30, hell yea
 */
export function PagedTable() {
  const [rows, setRows] = useState(data);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(Math.ceil(rows.length / pageSize));
  const [sortColumn, setSortColumn] = useState('id');
  const [sortAsc, setSortAsc] = useState(true);

  function onPageSize(e) {
    const newSize = Number(e.target.value);
    setPageSize(newSize);
    setCurrentPage(0);
    setTotalPages(Math.ceil(rows.length / newSize))
  }

  function onNext() {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  }

  function onPrev() {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  }

  function toggleSort(column) {
    if (column !== sortColumn) {
      setSortColumn(column);
      setSortAsc(true); // reset asc sort order when column changes
    }
    else
      setSortAsc(!sortAsc);
  }

  // sort rows only when sorting state changes
  useEffect(() => {
    const sorted = [...rows];
    function comparator(a, b) {
      if (a[sortColumn] < b[sortColumn])
        return sortAsc ? -1 : 1;
      else if (a[sortColumn] > b[sortColumn])
        return sortAsc ? 1 : -1;
      else return 0;
    }
    sorted.sort(comparator);
    setRows(sorted);
  }, [sortColumn, sortAsc]);

  function createRow({id, name, age, occupation}) {
    return (
      <tr key={id}>
        <th>{id}</th>
        <td>{name}</td>
        <td>{age}</td>
        <td>{occupation}</td>
      </tr>
    )
  }

  function renderPage() {
    const output = [];

    const offset = currentPage * pageSize;
    for (let i = offset; i < Math.min(offset + pageSize, rows.length); i++) {
      output.push(createRow(rows[i]));
    }

    return output;
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>
              <button onClick={() => toggleSort('id')} className={styles.columnButton}>ID</button>
            </th>
            <th>
              <button onClick={() => toggleSort('name')} className={styles.columnButton}>Name</button>
            </th>
            <th>
              <button onClick={() => toggleSort('age')} className={styles.columnButton}>Age</button>
            </th>
            <th>
              <button onClick={() => toggleSort('occupation')} className={styles.columnButton}>Occupation</button>
            </th>
          </tr>
        </thead>
        <tbody>
          {renderPage()}
        </tbody>
      </table>
      <div>
        <select onChange={onPageSize}>
          <option value="5">Show 5</option>
          <option value="10">Show 10</option>
          <option value="20">Show 20</option>
        </select>
        <button onClick={onPrev} disabled={currentPage === 0}>Prev</button>
        <span>Page {currentPage + 1} of {totalPages}</span>
        <button onClick={onNext} disabled={currentPage === totalPages - 1}>Next</button>
      </div>
    </>
  )
}