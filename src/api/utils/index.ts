import { STORAGE_KEY } from '../todos';
import { TState } from '../types';

export const saveToLocalStorage = (state: TState) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};
