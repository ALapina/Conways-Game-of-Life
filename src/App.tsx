// 0 - dead, 1 - live
// 0 ---> 3 live neighbours ===1
// 1 ---> < 2 live neighbours || > 3 live neighbours === 0

// DONE: Dropdown to choose random and drawing
// DONE: IF RANDOM then REGENERATE button. If Drawing then Clear button.
// DONE: SPEED as input
// DONE: Draw on canvas
// DONE: Some styles
// TODO: Write tests
// DONE: Readme
// DONE: Host on github pages

import {useEffect, useState} from 'react';
import {DEFAULT_SPEED} from './constants.ts';
import {buildNextGenerationGrid} from './utils/build-next-generation-grid.tsx';
import {Canvas} from './components/canvas.tsx';
import {ToggleGroup} from './components/toggle-group.tsx';
import {Button} from './components/button.tsx';
import {buildGrid} from './utils/build-grid.ts';

function App() {
  const [grid, setGrid] = useState(buildGrid());
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
    <div
      className={
        'w-full text-xl font-bruno-ace bg-black text-primaryGreen mx-auto max-w-7xl border-green-800 border py-24 px-24'
      }
    >
      <div className={'flex justify-between'}>
        <div className={'flex items-center flex-col'}>
          <h1 className={'text-center pb-16'}>
            <span className={'font-pacifico block text-3xl pb-3'}>
              Conway’s{' '}
            </span>
            <span className={'font-monoton text-4xl'}>Game of Life</span>
          </h1>
          <Button
            size={'lg'}
            icon={start ? '2' : '1'}
            name={start ? 'Stop' : 'Start'}
            onClick={() => setStart(!start)}
          />
          <div className={'w-full h-px bg-primaryGreen my-24'} />

          <div className={'flex items-center'}>
            <span className={'pr-6'}>SPEED </span>
            <ToggleGroup onValueChange={setSpeed} />
          </div>

          <div className={'flex pt-8 gap-x-5'}>
            <Button
              disabled={start}
              icon={'X'}
              name={'Clear'}
              onClick={() => setGrid(buildGrid())}
            />
            <Button
              disabled={start}
              icon={'0'}
              name={'Random'}
              onClick={() => setGrid(buildGrid(true))}
            />
          </div>
        </div>

        <div className='relative mask pointer-events-none'>
          <div className='absolute pointer-events-none overflow-hidden top-0 left-0 w-full h-full opacity-40 bg-screen-texture' />
          <Canvas grid={grid} setGrid={setGrid} start={start} />
        </div>
      </div>
    </div>
  );
}

export default App;
