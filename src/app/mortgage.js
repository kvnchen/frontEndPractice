'use client'; // tells next.js these are client components https://stackoverflow.com/questions/74471642/nextjs-13-button-onclick-event-handlers-cannot-be-passed-to-client-componen
import { useState } from 'react';

function getMonthlyPayment({loanAmount, annualInterest, loanTerm}) {
  const i = annualInterest / 1200; // convert percentage to decimal
  const n = loanTerm * 12;

  return Math.round((loanAmount * (i * Math.pow(1 + i, n))) / (Math.pow(1 + i, n) - 1) * 100) / 100;
}

export function MortgageCalculator() {
  const [monthly, setMonthly] = useState('');

  function handleSubmit(e) {
    e.preventDefault(); // prevent browser from reloading the page
  
    // kind of cumbersome to extract form values
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
  
    setMonthly(`Monthly payment: \$${getMonthlyPayment(formJson)}`);
  }

  return (
    <article>
      <h1>Mortgage Calculator</h1>
      <form method="post" onSubmit={handleSubmit}>
        <div>
          <label>
            Loan Amount <input id="loanAmount" name="loanAmount" required type="number" min="1" />
          </label>
        </div>
        <div>
          <label>
            Annual Interest Rate <input id="annualInterest" name="annualInterest" required type="number" step=".01"/>
          </label>
        </div>
        <div>
          <label>
            Loan Term (years) <input id="loanTerm" name="loanTerm" required type="number" min="1"/>
          </label>
        </div>
        <div>
          <button type="submit">Calculate</button>
        </div>
      </form>
      <div>
        {monthly}
      </div>
    </article>
  )
}
