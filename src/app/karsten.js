'use client'; // tells next.js these are client components https://stackoverflow.com/questions/74471642/nextjs-13-button-onclick-event-handlers-cannot-be-passed-to-client-componen
import { useState } from 'react';

export function Karsten() {
  const [hideInputs, setHideInputs] = useState(true);
  const [hideCommander, setHideCommander] = useState(true);
  const [hideCompanion, setHideCompanion] = useState(true);
  const [output, setOutput] = useState('');
  
  // seems to be a bug returning a negative number...
  function karsten({avgmv, draw, ramp, fast, cycling, mdfc1, mdfc2, format, commanders}) {
    let output;
  
    switch (format) {
      case 'aus':
        output = (19.59 + (1.90 * avgmv) - (0.28 * (ramp + draw)) - fast - (0.74 * mdfc1) - (0.38 * mdfc2) + (0.27 * (commanders || 0))).toPrecision(4);
        break;
      case 'edh':
        output = (((100 - commanders) / 60) * (19.59 + (1.90 * avgmv) + (0.27 * commanders)) - (0.28 * (ramp + draw)) - fast - (0.74 * mdfc1) - (0.38 * mdfc2) - 1.35).toPrecision(4);
        break;
      case 'lim':
        output = ((40 / 60) * (19.59 + (1.90 * avgmv) - (0.28 * (ramp + draw)) - fast - (0.74 * mdfc1) - (0.38 * mdfc2) + (0.27 * (commanders || 0)))).toPrecision(4);
        break;
      case 'can':
      case 'gla':
      case 'eur':
      default:
        output = (32.65 + (3.16 * avgmv) - (0.28 * (ramp + draw)) - fast - (0.9 * cycling) - (0.74 * mdfc1) - (0.38 * mdfc2)).toPrecision(4);
        break;
    }
    return output;
  }

  function handleSubmit(formData) {
    // e.preventDefault(); // prevent browser from reloading the page
  
    // kind of cumbersome to extract form values
    // const form = e.target;
    // const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);
    setOutput(`Recommended lands: ${karsten(formJson)}`);
  }

  function handleFormatChange(e) {
    if (e.target.value !== '') {
      setHideInputs(false);
      setHideCommander(true);
      setHideCompanion(true);

      if (e.target.value === 'edh') {
        setHideCommander(false);
      }else if (e.target.value === 'aus' || e.target.value === 'lim') {
        setHideCompanion(false);
      }
    } else {
      setHideInputs(true);
      setHideCommander(true);
      setHideCompanion(true);
    }
  }

  return (
    <article>
      <h1>Karsten Formula</h1>
      <form action={handleSubmit}>
        <p>
          <label>
            Format <select name="format" onChange={handleFormatChange}>
            <option value="">-- Select a format --</option>
            <option value="default">Canadian Highlander, European Highlander, Gladiator</option>
            <option value="aus">7 Point Highlander, Other 60 card formats</option>
            <option value="edh">Commander</option>
            <option value="lim">Limited</option>
            </select>
          </label>
        </p>
        <div id="input-group" hidden={hideInputs}>
          <p>
            <label>
              Average Mana Value <input name="avgmv" type="number" defaultValue="0" min="0" max="20" step="0.01" />
            </label>
          </p>
          <p>
            <label>
              Card Draw <input id="draw" name="draw" type="number" defaultValue="0" min="0" max="100" step="1" />
            </label>
          </p>
          <p>
            <label>
              Ramp <input id="ramp" name="ramp" type="number" defaultValue="0" min="0" max="100" step="1" />
            </label>
          </p>
          <p>
            <label>
              Fast Mana <input id="fast" name="fast" type="number" defaultValue="0" min="0" max="100" step="1" />
            </label>
          </p>
          <p>
            <label>
              One Mana Landcyclers <input id="cycling" name="cycling" type="number" defaultValue="0" min="0" max="100" step="1" />
            </label>
          </p>
          <p>
            <label>
              Untapped MDFCs <input id="mdfc1" name="mdfc1" type="number" defaultValue="0" min="0" max="100" step="1" />
            </label>
          </p>
          <p>
            <label>
              Tapped MDFCs <input id="mdfc2" name="mdfc2" type="number" defaultValue="0" min="0" max="100" step="1" />
            </label>
          </p>
          <p hidden={hideCommander}>
            <label>
              Commanders <input id="commanders" name="commanders" type="number" defaultValue="1" min="1" max="2" step="1" />
            </label>
          </p>
          <p hidden={hideCompanion}>
            <label>
              Companions <input id="companion" name="companion" type="number" defaultValue="0" min="0" max="1" step="1" />
            </label>
          </p>
          <p>
            <button type="submit">Calculate</button>
          </p>
        </div>
      </form>
      <p>
        {output}
      </p>
    </article>
  )
}
