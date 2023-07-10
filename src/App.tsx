// 0 - dead, 1 - live
// 0 ---> 3 live neighbours ===1
// 1 ---> < 2 live neighbours || > 3 live neighbours === 0

import {useRef} from 'react';

function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  return (
    <>
      <h1 className={'bg-amber-300'}>Conway’s Game of Life</h1>
      <canvas ref={canvasRef} />
    </>
  );
}

export default App;
