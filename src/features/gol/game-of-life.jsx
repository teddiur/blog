import { useState, useEffect } from "react";
import style from "./game-of-life.module.css";

const SIZE = 75;
const TIMER = 250;
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

const getNumberOfAliveSurrondingCells = (row, column, grid) => {
  let alives = 0;
  for (let rowOffset = -1; rowOffset <= 1; rowOffset++) {
    for (let columnOffset = -1; columnOffset <= 1; columnOffset++) {
      if (columnOffset === 0 && rowOffset === 0) {
        continue;
      }

      const currentRow = rowOffset + row;
      const currentColumn = columnOffset + column;

      if (currentRow < 0 || currentRow >= grid.length) {
        continue;
      }
      if (currentColumn < 0 || currentColumn >= grid[0].length) {
        continue;
      }

      if (grid[currentRow][currentColumn]) alives++;
    }
  }
  return alives;
};

const run = (grid) => {
  return grid.map((row, rowNumber, fullGrid) => {
    return row.map((cell, columnNumber) => {
      const alives = getNumberOfAliveSurrondingCells(
        rowNumber,
        columnNumber,
        fullGrid
      );

      if (cell) {
        if (alives < 2) return false;
        if ([3, 4].includes(alives)) return true;
        if (alives > 3) return false;
      } else {
        if (alives === 3) return true;
        return false;
      }
    });
  });
};

const random = (grid) => {
  return grid.map((row) => {
    return row.map(() => {
      return Math.round(Math.random());
    });
  });
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

    setGrid((prev) => random(prev));
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
      <table className={style.table}>
        <tbody>
          {grid.map((row, rowNumber) => {
            return (
              <tr key={rowNumber}>
                {row.map((cell, columnNumber) => {
                  return (
                    <td
                      onClick={() => toggleCellState(rowNumber, columnNumber)}
                      key={`${rowNumber}-${columnNumber}`}
                      className={cell ? style.alive : style.dead}
                    ></td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
