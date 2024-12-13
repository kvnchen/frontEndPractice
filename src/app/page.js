import './page.module.css';
import { MortgageCalculator } from './mortgage.js';
import { Hypergeo } from './karsten.js';
import { Tabs } from './tabs.js';

// this fucking react project is 350 MB... gonna reuse it for react practice

export default function Home() {
  // return <MortgageCalculator />
  // return <Hypergeo />
  return <Tabs />
}
