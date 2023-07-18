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

  const drawOnCanvas = (nativeEvent: MouseEvent, isOnMouseMove?: boolean) => {
    const {offsetX, offsetY} = nativeEvent;
    const x = Math.floor(offsetX / RESOLUTION);
    const y = Math.floor(offsetY / RESOLUTION);
    const copyOfGrid = [...grid];

    if (isOnMouseMove) {
      copyOfGrid[x][y] = 1;
    } else copyOfGrid[x][y] = copyOfGrid[x][y] ? 0 : 1;
    setGrid(copyOfGrid);
  };

  return (
    <canvas
      className={'pointer-events-auto'}
      width={CANVAS_WIDTH}
      height={CANVAS_HEIGHT}
      onMouseDown={({nativeEvent}) => {
        setIsDrawing(true);
        drawOnCanvas(nativeEvent);
      }}
      onMouseUp={() => setIsDrawing(false)}
      onMouseMove={({nativeEvent}) => {
        if (!isDrawing) return;
        drawOnCanvas(nativeEvent, true);
      }}
      ref={canvasRef}
    />
  );
};
