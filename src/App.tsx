// 0 - dead, 1 - live
// 0 ---> 3 live neighbours ===1
// 1 ---> < 2 live neighbours || > 3 live neighbours === 0

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
        'mx-auto h-screen w-full max-w-7xl bg-black pt-10 font-bruno-ace text-xl text-primaryGreen lg:px-10 lg:pt-20 xl:px-24 tall:grid tall:content-center tall:pt-0'
      }
    >
      <div className={'flex flex-col-reverse lg:flex-row lg:justify-between'}>
        <div className={'flex flex-col items-center'}>
          <h1 className={'pb-8 pt-8 text-center lg:pb-16 lg:pt-0'}>
            <span className={'block pb-3 font-pacifico text-3xl'}>
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
          <div className={'my-12 h-px w-full bg-primaryGreen lg:my-24'} />

          <div className={'flex items-center'}>
            <span className={'pr-6'}>SPEED </span>
            <ToggleGroup onValueChange={setSpeed} />
          </div>

          <div className={'flex gap-x-5 py-8'}>
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

        <div className='mask pointer-events-none relative self-center'>
          <div className='pointer-events-none absolute left-0 top-0 h-full w-full overflow-hidden bg-screen-texture opacity-40' />
          <Canvas grid={grid} setGrid={setGrid} start={start} />
        </div>
      </div>
    </div>
  );
}

export default App;
