import { TTodosSliceState } from '../types';

export const getInitialSliceState: () => TTodosSliceState = () => {
  return {
    list: {},
    archive: {},
    maxOrder: 0,
    maxPage: 1,
    perPage: 4,
  };
};
