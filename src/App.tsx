// 0 - dead, 1 - live
// 0 ---> 3 live neighbours ===1
// 1 ---> < 2 live neighbours || > 3 live neighbours === 0

// DONE: Dropdown to choose random and drawing
// DONE: IF RANDOM then REGENERATE button. If Drawing then Clear button.
// DONE: SPEED as input
// DONE: Draw on canvas
// TODO: Some styles
// TODO: Write tests
// TODO: Maybe WIDTH, HEIGHT, RESOLUTION as inputs (probably no)
// DONE: Readme
// DONE: Host on github pages

import {useEffect, useState} from 'react';
import {DEFAULT_SPEED, COLS, ROWS} from './constants.ts';
import {buildNextGenerationGrid} from './utils/build-next-generation-grid.tsx';
import {Canvas} from './components/canvas.tsx';

const buildRandomGrid = (): number[][] => {
  const grid = [];
  for (let i = 0; i < ROWS; i++) {
    grid.push(Array.from(Array(COLS), () => Math.floor(Math.random() * 2)));
  }
  return grid;
};

const buildEmptyGrid = (): number[][] => {
  return new Array(COLS).fill(null).map(() => new Array(ROWS).fill(0));
};

function App() {
  const [grid, setGrid] = useState(buildEmptyGrid());
  const [start, setStart] = useState(false);
  const [speed, setSpeed] = useState(DEFAULT_SPEED);

  useEffect(() => {
    if (start) {
      const interval = setInterval(() => {
        setGrid(buildNextGenerationGrid(grid));
      }, speed);
      return () => clearInterval(interval);
    }
  }, [grid, start, speed]);

  return (
    <>
      <h1 className={'bg-amber-300'}>Conway’s Game of Life</h1>
      <button
        className={
          'm-4 py-2 px-4 rounded-full border-0 bg-violet-50 text-violet-700 hover:bg-violet-100'
        }
        onClick={() => {
          setStart(!start);
        }}
      >
        {start ? 'Stop' : 'Start'}
      </button>
      <button
        disabled={start}
        className={
          'disabled:opacity-50 m-4 py-2 px-4 rounded-full border-0 bg-violet-50 text-violet-700 hover:bg-violet-100'
        }
        onClick={() => setGrid(buildEmptyGrid())}
      >
        {'Clear Field'}
      </button>
      <button
        disabled={start}
        className={
          'disabled:opacity-50 m-4 py-2 px-4 rounded-full border-0 bg-violet-50 text-violet-700 hover:bg-violet-100'
        }
        onClick={() => setGrid(buildRandomGrid())}
      >
        {'Generate Random'}
      </button>
      <div className={'p-4 border border-green-800'}>
        <label htmlFor={'speed'} className={'pr-4'}>
          Speed from 100 (faster) to 1000 (slower)
        </label>
        <input
          onChange={(e) => setSpeed(parseInt(e.target.value))}
          value={speed}
          min={100}
          step={100}
          max={1000}
          name={'speed'}
          type={'range'}
        />
      </div>
      <Canvas grid={grid} setGrid={setGrid} start={start} />
    </>
  );
}

export default App;
