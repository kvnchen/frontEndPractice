
'use client';
import { useState } from 'react';

import { MortgageCalculator } from './mortgage.js';
import { Hypergeo } from './karsten.js';
import { Tabs } from './tabs.js';
import { Accordian } from './accordian';
import { Progress } from './progress.js';
import { PagedTable } from './pagination.js';
import { Dice } from './dice.js';
import { FileExplorer } from './fileExplorer.js';
import { LikeButton } from './likeButton.js';
import { Modal } from './modal.js';
import { StarRating } from './starRating';
import { ToDo } from './todo.js';
import { Traffic } from './traffic.js';
import { DigitalClock } from './digitalClock.js';
import { TicTacToe } from './ticTacToe.js';
import { Carousel } from './carousel.js';
import { Stopwatch } from './stopwatch.js';
import { JobBoard } from './jobBoard.js';
import { TransferList } from './transferList.js';
import { NestedCheckbox } from './nestedCheckbox.js';
import { CheckboxTest } from './checkboxTest.js';
import { GridLights } from './gridLights.js';
import { Histogram } from './histogram.js';
import { UndoableCounter } from './undoableCounter/undoableCounter.js';
import { UsersDatabase } from './usersDatabase/usersDatabase.js';
import { TimeAgo } from './timeAgo/timeAgo.js';
import { MemoryGame } from './memoryGame/memoryGame.js';

// this react project is 350 MB... gonna reuse it for react practice

export default function Home() {
  const [selection, setSelection] = useState('MemoryGame');

  return (
    <div>
      <div>
        <select value={selection} onChange={e => setSelection(e.target.value)}>
          <option value="MortgageCalculator">MortgageCalculator</option>
          <option value="Hypergeo">Hypergeo</option>
          <option value="Tabs">Tabs</option>
          <option value="Accordian">Accordian</option>

          <option value="Progress">Progress</option>
          <option value="PagedTable">PagedTable</option>
          <option value="Dice">Dice</option>
          <option value="FileExplorer">FileExplorer</option>

          <option value="Modal">Modal</option>
          <option value="StarRating">StarRating</option>
          <option value="ToDo">ToDo</option>
          <option value="Traffic">Traffic</option>

          <option value="DigitalClock">DigitalClock</option>
          <option value="TicTacToe">TicTacToe</option>
          <option value="Carousel">Carousel</option>
          <option value="Stopwatch">Stopwatch</option>

          <option value="JobBoard">JobBoard</option>
          <option value="TransferList">TransferList</option>
          <option value="NestedCheckbox">NestedCheckbox</option>
          <option value="CheckboxTest">CheckboxTest</option>

          <option value="GridLights">GridLights</option>
          <option value="Histogram">Histogram</option>
          <option value="UndoableCounter">UndoableCounter</option>
          <option value="UsersDatabase">UsersDatabase</option>

          <option value="TimeAgo">TimeAgo</option>
          <option value="MemoryGame">MemoryGame</option>
        </select>
      </div>
      <br />
      <div>
        {selection === 'MortgageCalculator' && <MortgageCalculator />}
        {selection === 'Hypergeo' && <Hypergeo />}
        {selection === 'Tabs' && <Tabs />}
        {selection === 'Accordian' && <Accordian />}

        {selection === 'Progress' && <Progress />}
        {selection === 'PagedTable' && <PagedTable />}
        {selection === 'Dice' && <Dice />}
        {selection === 'FileExplorer' && <FileExplorer />}

        {selection === 'Modal' && <Modal title='Modal Title' body={`One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections.`} />}
        {selection === 'StarRating' && <StarRating />}
        {selection === 'ToDo' && <ToDo seed={['Walk the dog', 'Buy groceries']} />}
        {selection === 'Traffic' && <Traffic red={4000} yellow={1000} green={2000} />}

        {selection === 'DigitalClock' && <DigitalClock />}
        {selection === 'TicTacToe' && <TicTacToe />}
        {selection === 'Carousel' && <Carousel  />}
        {selection === 'Stopwatch' && <Stopwatch  />}

        {selection === 'JobBoard' && <JobBoard pageSize={6} />}
        {selection === 'TransferList' && <TransferList />}
        {selection === 'NestedCheckbox' && <NestedCheckbox />}
        {selection === 'CheckboxTest' && <CheckboxTest />}

        {selection === 'GridLights' && <GridLights />}
        {selection === 'Histogram' && <Histogram />}
        {selection === 'UndoableCounter' && <UndoableCounter />}
        {selection === 'UsersDatabase' && <UsersDatabase />}

        {selection === 'TimeAgo' && <TimeAgo time={Date.now() - 55000} />}
        {selection === 'MemoryGame' && <MemoryGame />}
      </div>
    </div>
  )
}
