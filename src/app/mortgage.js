'use client'; // tells next.js these are client components https://stackoverflow.com/questions/74471642/nextjs-13-button-onclick-event-handlers-cannot-be-passed-to-client-componen
import { useState } from 'react';

function getMonthlyPayment({loanAmount, annualInterest, loanTerm}) {
  const i = annualInterest / 1200; // convert percentage to decimal
  const n = loanTerm * 12;

  return Math.round((loanAmount * (i * Math.pow(1 + i, n))) / (Math.pow(1 + i, n) - 1) * 100) / 100;
}

export function MortgageCalculator() {
  const [monthly, setMonthly] = useState('');
  
  // using the action prop on form will clear input fields and give you a formData arg directly
  function handleSubmit(formData) {
    // e.preventDefault(); // prevent browser from reloading the page
                           // don't need to do this with action prop
  
    // kind of cumbersome to extract form values
    // const form = e.target;
    // const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
  
    setMonthly(`Monthly payment: \$${getMonthlyPayment(formJson)}`);
  }

  return (
    <article>
      <h1>Mortgage Calculator</h1>
      <form action={handleSubmit}>
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
