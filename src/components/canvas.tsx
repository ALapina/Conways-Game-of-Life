import {CANVAS_HEIGHT, CANVAS_WIDTH, RESOLUTION} from '../constants.ts';
import {Dispatch, SetStateAction, useEffect, useRef, useState} from 'react';
import {renderGrid} from '../utils/render-grid.ts';

type Props = {
  grid: number[][];
  setGrid: Dispatch<SetStateAction<number[][]>>;
  start: boolean;
};

export const Canvas = ({grid, setGrid, start}: Props) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    contextRef.current = canvas.getContext('2d');
  }, []);

  useEffect(() => {
    const ctx = contextRef.current;
    if (!ctx) return;
    renderGrid(ctx, grid);
  }, [grid, start]);

  const drawOnCanvas = (nativeEvent: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const {offsetX, offsetY} = nativeEvent;
    const x = Math.floor(offsetX / RESOLUTION);
    const y = Math.floor(offsetY / RESOLUTION);

    if (!grid[x][y]) {
      const copyOfGrid = [...grid];
      copyOfGrid[x][y] = copyOfGrid[x][y] ? 0 : 1;
      setGrid(copyOfGrid);
    }
  };

  const startDrawing = ({nativeEvent}: any) => {
    setIsDrawing(true);
    drawOnCanvas(nativeEvent);
  };

  const draw = ({nativeEvent}: any) => {
    if (!isDrawing) return;
    drawOnCanvas(nativeEvent);
  };

  return (
    <canvas
      className={'pointer-events-auto'}
      width={CANVAS_WIDTH}
      height={CANVAS_HEIGHT}
      onMouseDown={startDrawing}
      onMouseUp={() => setIsDrawing(false)}
      onMouseMove={draw}
      ref={canvasRef}
    />
  );
};
