'use client';
import { useState, useEffect } from 'react';

const data = require('./employees.json');

export function PagedTable() {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const rows = [];

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

  // can't rely on set values updating in time for use in subsequent calls...
  function onPageSize(e) {
    const newSize = Number(e.target.value);
    setPageSize(newSize);
    setCurrentPage(0);
    setPages(makePages(newSize));
  }

  function onNext() {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  }

  function onPrev() {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  }

  function makePages(size) {
    const output = [];
    for (let i = 0; i < (rows.length / size); i++) {
      const offset = i * size;
      output.push(rows.slice(offset, offset + size));
    }
    return output;
  }

  // don't think we can call setState during initialization
  // so state vars have to be initialized with desired starting values
  for (const r of data) {
    rows.push(createRow(r));
  }

  const [pages, setPages] = useState(makePages(5));

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Occupation</th>
          </tr>
        </thead>
        <tbody>
          {...pages[currentPage]}
        </tbody>
      </table>
      <div>
        <select onChange={onPageSize}>
          <option value="5">Show 5</option>
          <option value="10">Show 10</option>
          <option value="20">Show 20</option>
        </select>
        <button onClick={onPrev} disabled={currentPage === 0}>Prev</button>
        <span>Page {currentPage + 1} of {pages.length}</span>
        <button onClick={onNext} disabled={currentPage === pages.length - 1}>Next</button>
      </div>
    </>
  )
}