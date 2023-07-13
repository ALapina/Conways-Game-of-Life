import {COLS, ROWS} from "../constants.ts";

export const countNeighbors = (grid: number[][], col: number, row: number) => {
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