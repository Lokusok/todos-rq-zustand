import { STORAGE_KEY } from '..';
import { TState, TTodosSliceState } from '../types';

export const getInitialSliceState: () => TTodosSliceState = () => {
  return {
    list: {},
    archive: {},
    maxOrder: 0,
    maxPage: 1,
    perPage: 4,
  };
};

export const saveToLocalStorage = (state: TState) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};
