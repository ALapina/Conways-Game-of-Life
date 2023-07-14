import {COLS, ROWS} from '../constants.ts';

export const buildGrid = (random?: boolean): number[][] => {
  return new Array(COLS)
    .fill(null)
    .map(() =>
      new Array(ROWS)
        .fill(null)
        .map(() => (random ? Math.floor(Math.random() * 2) : 0))
    );
};
