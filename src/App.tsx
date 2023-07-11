// 0 - dead, 1 - live
// 0 ---> 3 live neighbours ===1
// 1 ---> < 2 live neighbours || > 3 live neighbours === 0

// DONE: Dropdown to choose random and drawing
// DONE: IF RANDOM then REGENERATE button. If Drawing then Clear button.
// DONE: SPEED as input
// TODO: Draw on canvas
// TODO: Some styles
// TODO: Write tests
// TODO: Maybe WIDTH, HEIGHT, RESOLUTION as inputs (probably no)
// TODO: Readme
// TODO: Host on github pages

//TODO:Minor: When we switch between modes preserve grid changes. DO not regenerate Grid

import {useEffect, useRef, useState} from 'react';
import {Switch} from './components/switch.tsx';
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  DEFAULT_SPEED,
  RESOLUTION,
  COLS,
  ROWS,
} from './constants.ts';

const buildRandomGrid = (): number[][] => {
  const grid = [];
  for (let i = 0; i < ROWS; i++) {
    grid.push(Array.from(Array(COLS), () => Math.floor(Math.random() * 2)));
  }
  return grid;
};

const buildEmptyGrid = (): number[][] => {
  return new Array(COLS)
    .fill(null)
    .map(() => new Array(ROWS).fill(null).map(() => 0));
};

const renderGrid = (context: CanvasRenderingContext2D, grid: number[][]) => {
  for (let col = 0; col < grid.length; col++) {
    for (let row = 0; row < grid[col].length; row++) {
      const cell = grid[col][row];
      const x = col * RESOLUTION;
      const y = row * RESOLUTION;

      context.beginPath();
      context.rect(x, y, RESOLUTION, RESOLUTION);
      context.fillStyle = cell ? '#00ff00' : 'black';
      context.strokeStyle = '#003300';
      context.fill();
      context.stroke();
    }
  }
};

const countNeighbors = (grid: number[][], col: number, row: number) => {
  let sumNeighbours = 0;

  //looping through all neighbours
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      //do not loop over current cell
      if (i === 0 && j === 0) {
        continue;
      }

      const x_cell = col + i;
      const y_cell = row + j;

      if (x_cell >= 0 && y_cell >= 0 && x_cell < COLS && y_cell < ROWS) {
        const currentNeighbour = grid[col + i][row + j];
        sumNeighbours += currentNeighbour;
      }
    }
  }

  return sumNeighbours;
};

const nextGeneration = (grid: number[][]) => {
  // create exact copy of current grid
  const nextGeneration = grid.map((arr) => [...arr]);

  for (let col = 0; col < grid.length; col++) {
    for (let row = 0; row < grid[col].length; row++) {
      const cell = grid[col][row];

      const neighbors = countNeighbors(grid, col, row);

      // rules
      if (cell == 0 && neighbors == 3) {
        nextGeneration[col][row] = 1;
      } else if (cell == 1 && (neighbors < 2 || neighbors > 3)) {
        nextGeneration[col][row] = 0;
      }
    }
  }

  return nextGeneration;
};

function App() {
  const [drawingMode, setDrawingMode] = useState(false);
  const [grid, setGrid] = useState<number[][]>(buildRandomGrid());
  const [start, setStart] = useState(false);
  const [resetGrid, setResetGrid] = useState(false);
  const [speed, setSpeed] = useState(DEFAULT_SPEED);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    renderGrid(context, grid);
  }, [grid, start, drawingMode]);

  useEffect(() => {
    if (start) {
      const interval = setInterval(() => {
        setGrid(nextGeneration(grid));
      }, speed);
      return () => clearInterval(interval);
    }
  }, [COLS, ROWS, grid, start]);

  useEffect(() => {
    if (drawingMode || (drawingMode && resetGrid)) {
      setGrid(buildEmptyGrid());
    } else setGrid(buildRandomGrid());
  }, [drawingMode, resetGrid]);

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
        onClick={() => {
          setResetGrid(!resetGrid);
        }}
      >
        {drawingMode ? 'Clear Field' : 'Regenerate Random'}
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
      <Switch
        gameRunning={start}
        onChange={() => {
          setDrawingMode(!drawingMode);
        }}
      />
      <canvas ref={canvasRef} />
    </>
  );
}

export default App;
