'use client';
import { useState } from 'react';
import styles from './styles.module.css';


// time up, wrapping up
export function FlightBooker() {
  const [selection, setSelection] = useState('oneWay');
  const [formError, setFormError] = useState(null);

  function validate(formData) {
     // type: string 'mm/dd/yyyy'
    const { departure, returnDate } = Object.fromEntries(formData.entries());
    console.log('departure', departure);
    
    const timeNow = new Date();
    const compDeparture = new Date(departure);
    let msg;

    if (selection === 'oneWay') {
      if (compDeparture < timeNow) {
        setFormError('Selected dates are in the past');
      } else {
        setFormError(null);
        msg = `You have booked a one-way flight on ${departure}`;
        window.alert(msg);
      }
    } else {
      const compReturn = new Date(returnDate);

      if (compDeparture < timeNow || compReturn < timeNow) {
        setFormError('Selected dates are in the past');
      } else if (compReturn < compDeparture) {
        setFormError('Return flight is after departure');
      } else {
        setFormError(null);
        msg = `You have booked a return flight, departing on ${departure} and returning on ${returnDate}`;
        window.alert(msg);
      }
    }
  }

  return (
    // forgot action prop
    <article>
      <div>
        <select value={selection} onChange={e => setSelection(e.target.value)}>
          <option value="oneWay">One-way flight</option>
          <option value="return">Return flight</option>
        </select>
      </div>
      <form action={validate}>
        <div>
          
        </div>
        <div>
          {/* needs id to be captured as formData */}
          <input id="departure" name="departure" type="date" required />
        </div>
        { selection === 'return' && (
          <div>
            <input id="returnDate" name="returnDate" type="date" required />
          </div>
        )}
        <div>
          <button type="submit">Submit</button>
        </div>
        {formError && (
          <div>
            {formError}
          </div>
        )}
      </form>
    </article>
  )
}