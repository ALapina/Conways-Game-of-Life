import {countNeighbors} from "./count-neighbors.ts";

export const buildNextGenerationGrid = (grid: number[][]) => {
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