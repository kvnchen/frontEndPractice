'use client';
import { useState, useEffect } from 'react';
import styles from './styles.module.css';

const emojis = [
  '🐵',
  '🐶',
  '🦊',
  '🐱',
  '🦁',
  '🐯',
  '🐴',
  '🦄',
  '🦓',
  '🦌',
  '🐮',
  '🐷',
  '🐭',
  '🐹',
  '🐻',
  '🐨',
  '🐼',
  '🐽',
  '🐸',
  '🐰',
  '🐙',
];

/**
 * card
 *  value: emoji
 *  isHidden: Bool
 * 
 * board
 *  n x n array of cards
 * 
 * setup
 *  pick (n x n) / 2 emojis & make cards for them
 *  randomly assign positions for cards
 * 
 * didnt know how to shuffle an array
 * 
 * panicking... for no reason...
 * time up, not even done with init
 * 
 * how do you do a flip animation?
 * 
 * 
 * 
 * selected: array of up to 2 cards? indexes?
 * 
 */
export function MemoryGame() {
  const [board, setBoard] = useState([]);
  const [selected, setSelected] = useState(null);
  const [remainingPairs, setRemainingPairs] = useState(8);

  function shuffle(arr) {
    let currentIndex = arr.length;

    while (currentIndex > 0) {
      const randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]]; // simultaneous assignment???
    }
  }

  // randomize emoji, create cards, create board
  function init() {
    const remainingEmojis = [];

    for (let i = 0; i < 8; i++) {
      remainingEmojis.push(emojis[i]);
      remainingEmojis.push(emojis[i]);
    }
    shuffle(remainingEmojis);

    // 4x4 default
    const tempBoard = [
      [],
      [],
      [],
      []
    ];

    for (let row = 0; row < 4; row++) {
      for (let column = 0; column < 4; column++) {
        const emoji = remainingEmojis.pop();
        tempBoard[row].push({
          value: emoji,
          isHidden: true
        });
      }
    }

    setBoard(tempBoard);
    setSelected(null);
    setRemainingPairs(8);
  }

  function flipDown(indices) {
    setTimeout(() => {
      const tempBoard = [...board];
      const [first, second] = indices;
      tempBoard[first[0]][first[1]].isHidden = true;
      tempBoard[second[0]][second[1]].isHidden = true;
      setBoard(tempBoard);
    }, 750);
  }

  function selectCard(row, column) {
    const key = [row, column];
    let tempSelected = selected;

    if (tempSelected === null) {
      tempSelected = key;
      setSelected(tempSelected);
    } else {
      if (board[row][column].value !== board[tempSelected[0]][tempSelected[1]].value) {
        flipDown([key, tempSelected]);
      } else {
        // update game completion state
        setRemainingPairs(remainingPairs - 1);
      }
      setSelected(null);
    }
  }

  // modifying a card won't rerender, do have to redefine the entire board
  function flipCard(row, column) {
    const temp = [...board]; // though this works

    if (temp[row][column].isHidden) {
      temp[row][column].isHidden = !temp[row][column].isHidden;
  
      selectCard(row, column);
      setBoard(temp);
    }
  }

  function render() {
    function renderCard(card, row, column) {
      return (
        <div 
          className={card.isHidden ? styles.card : `${styles.card} ${styles.flipped}`} 
          key={`${row},${column}`}
          onClick={() => flipCard(row, column) }
        >
          <span>{card.isHidden ? '' : card.value}</span>
        </div>
      );
    }

    const output = [];

    for (let i = 0; i < board.length; i++) {
      const cards = [];
      for (let j = 0; j < board[i].length; j++) {
        cards.push(renderCard(board[i][j], i, j));
      }

      output.push(
        <div key={i} className={styles.row}>
          {cards}
        </div>
      );  
    }

    return output;
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <article className={styles.board}>
      {render()}
      <div>
        <button hidden={remainingPairs > 0} onClick={init}>Play Again</button>
      </div>
    </article>
  )
}