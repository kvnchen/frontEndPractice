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

// this react project is 350 MB... gonna reuse it for react practice

export default function Home() {
  // return <MortgageCalculator />
  // return <Hypergeo />
  // return <Tabs />
  // return <Accordian />
  // return <Progress />
  // return <PagedTable />
  // return <Dice />
  // return <FileExplorer />
  // const modalBody = `One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections.`;
  // return <Modal title='Modal Title' body={modalBody} />
  // return <StarRating total={5} filled={2} />
  // return <ToDo seed={['Walk the dog', 'Buy groceries']} />
  // return <Traffic red={4000} yellow={1000} green={2000} />
  // return <DigitalClock />
  // return <TicTacToe />
  // return <Carousel />
  // return <Stopwatch />
  // return <JobBoard pageSize={6} />
  // return <TransferList />
  // return <NestedCheckbox />
  // return <CheckboxTest />
  // return <GridLights />
  // return <Histogram />
  // return <UndoableCounter />
  // return <UsersDatabase />

  return <TimeAgo time={Date.now() - 55000} />
}
