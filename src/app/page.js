
'use client';
import { useState } from 'react';

import { MortgageCalculator } from './mortgage.js';
import { Karsten } from './karsten.js';
import { Tabs } from './tabs/tabs.js';
import { Accordian } from './accordian/accordian.js';

import { Progress } from './progress.js';
import { PagedTable } from './dataTable/pagedTable.js';
import { Dice } from './dice/dice.js';
import { FileExplorer } from './fileExplorer/fileExplorer.js';

import { LikeButton } from './likeButton.js';
import { Modal } from './modal/modal.js';
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
import { WhackAMole } from './whackAMole/whackAMole.js';

import { Tweet } from './tweet/tweet.js';
import { Hypergeo } from './hypergeo/hypergeo.js';
import { AnalogClock } from './analogClock/analogClock.js';
import { TemperatureConverter } from './temperature/temperature.js';

import { FlightBooker } from './flight/flight.js';
import { GenTable } from './generateTable/genTable.js';
import { ProgressBar } from './progressBar/progressBar.js';
import { ConnectFour } from './connectFour/connectFour.js';

import { Tasks } from './reducerContext/reducerContext.js';
import { Grail } from './holyGrail/grail.js';
import { AuthCode } from './authCode/authCode.js';
import { VirtualizedList } from './virtualizedList/virtualizedList.js';

import { Autocomplete } from './autocomplete/autocomplete.js';
import { Kanban } from './kanban/kanban.js';
import { ThemedComponent } from './themedComponent/themedComponent.js';
import { Parent } from './themedComponent/parent.js';

import { Wizard } from './wizard/wizard.js';
import { SVGMap } from './svgMap/svgMap.js';

// this react project is 350 MB... gonna reuse it for react practice

export default function Home() {
  const [selection, setSelection] = useState('SVGMap');

  const components = {
    MortgageCalculator: <MortgageCalculator />,
    Karsten: <Karsten />,
    Tabs: <Tabs />,
    Accordian: <Accordian />,

    Progress: <Progress />,
    PagedTable: <PagedTable />,
    Dice: <Dice />,
    FileExplorer: <FileExplorer />,

    LikeButton: <LikeButton />,
    Modal: <Modal title='Modal Title' body={`One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections.`} />,
    StarRating: <StarRating />,
    ToDo: <ToDo seed={['Walk the dog', 'Buy groceries']} />,

    Traffic: <Traffic red={4000} yellow={1000} green={2000} />,
    DigitalClock: <DigitalClock />,
    TicTacToe: <TicTacToe />,
    Carousel: <Carousel />,

    Stopwatch: <Stopwatch />,
    JobBoard: <JobBoard pageSize={6} />,
    TransferList: <TransferList  />,
    NestedCheckbox: <NestedCheckbox />,
    
    CheckboxTest: <CheckboxTest />,
    GridLights: <GridLights />,
    Histogram: <Histogram />,
    UndoableCounter: <UndoableCounter />,
    
    UsersDatabase: <UsersDatabase />,
    TimeAgo: <TimeAgo time={Date.now() - 55000} />,
    MemoryGame: <MemoryGame />,
    WhackAMole: <WhackAMole />,

    Tweet: <Tweet />,
    Hypergeo: <Hypergeo />,
    AnalogClock: <AnalogClock />,
    TemperatureConverter: <TemperatureConverter />,

    FlightBooker: <FlightBooker />,
    GenTable: <GenTable />,
    ProgressBar: <ProgressBar filled={45} />,
    ConnectFour: <ConnectFour />,

    Tasks: <Tasks />,
    Grail: <Grail />,
    AuthCode: <AuthCode />,
    VirtualizedList: <VirtualizedList />,

    Autocomplete: <Autocomplete />,
    Kanban: <Kanban />,
    ThemedComponent: <Parent 
      style={{
      backgroundColor: 'white',
      border: '1px solid black',
      borderRadius: '5px',
      cursor: 'pointer'}}
      >
        <ThemedComponent name='foo' value='foo' text='Press Me' width='100px' />
      </Parent>,
    Wizard: <Wizard />,
    SVGMap: <SVGMap />
  };

  function select() {
    const options = [];

    for (const key of Object.keys(components)) {
      options.push(
        <option value={key} key={key}>{key}</option>
      );
    }

    return (
      <select id='component-select' value={selection} onChange={e => setSelection(e.target.value)}>
        {options}
      </select>
    )
  }

  return (
    <main>
      <div>
        {select()}
      </div>
      <br />
      <div>
        {components[selection]}
      </div>
    </main>
  )
}
