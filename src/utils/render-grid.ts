import {RESOLUTION} from "../constants.ts";

export const renderGrid = (context: CanvasRenderingContext2D, grid: number[][]) => {
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