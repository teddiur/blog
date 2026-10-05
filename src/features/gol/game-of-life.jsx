import { useState, useEffect } from 'react';
import style from './game-of-life.module.css';
import { randomGrid, run } from './logic';

const SIZE = 50;
const TIMER = 200;
const getInitialState = () => {
  const rows = new Array(SIZE).fill(0);
  return rows.map(() => {
    return new Array(SIZE).fill(false);
  });
};

const gameStateEnum = {
  PAUSED: 1,
  RUNNING: 2,
  STOPPED: 3,
};

export const GameOfLife = () => {
  const [grid, setGrid] = useState(getInitialState());
  const [gameState, setGameState] = useState(gameStateEnum.STOPPED);
  const [tickerRef, setTickerRef] = useState(null);

  const runGameOfLife = () => {
    setGrid((prev) => run(prev));
  };

  const onRun = () => {
    setGameState(gameStateEnum.RUNNING);
    const ticker = setInterval(runGameOfLife, TIMER);
    setTickerRef(ticker);
  };

  const onStop = () => {
    setGameState(gameStateEnum.STOPPED);
    clearInterval(tickerRef);
  };

  const onRandom = () => {
    if (gameState == gameStateEnum.RUNNING) {
      return;
    }

    setGrid((prev) => randomGrid(prev));
  };

  const toggleCellState = (rowNumber, columnNumber) => {
    if (gameState == gameStateEnum.RUNNING) {
      return;
    }

    setGrid((prev) => {
      const a = [...prev];
      a[rowNumber][columnNumber] = !a[rowNumber][columnNumber];
      return a;
    });
  };

  return (
    <>
      <section>
        <button onClick={onRun} disabled={gameState === gameStateEnum.RUNNING}>
          Run
        </button>
        <button onClick={onStop} disabled={gameState !== gameStateEnum.RUNNING}>
          Stop
        </button>
        <button
          onClick={onRandom}
          disabled={gameState === gameStateEnum.RUNNING}
        >
          Random
        </button>
      </section>
      <div className={style.table}>
        <div>
          {grid.map((row, rowNumber) => {
            return (
              <div key={rowNumber} className={style.row}>
                {row.map((cell, columnNumber) => {
                  return (
                    <div
                      onClick={() => toggleCellState(rowNumber, columnNumber)}
                      key={`${rowNumber}-${columnNumber}`}
                      className={`${style.cell} ${cell ? style.alive : style.dead}`}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
