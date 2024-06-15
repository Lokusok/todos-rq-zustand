import { STORAGE_KEY } from '..';
import { TOptions } from '../requests/types';
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

export const calculateMaxPage = (length: number, perPage: number) => {
  return Math.ceil(length / perPage);
};

export const getAllTodosFromLocalStorage: (options: TOptions) => TTodosSliceState = ({
  page = -1,
  excludeArchive,
}) => {
  const rawState = localStorage.getItem(STORAGE_KEY);
  const state: TState = rawState
    ? JSON.parse(rawState)
    : {
        todos: getInitialSliceState(),
      };

  let todosList = state.todos.list;

  if (page !== -1) {
    let todosExecutionList = Object.entries(state.todos.list);

    if (excludeArchive) {
      todosExecutionList = todosExecutionList.filter(([todoId]) => !state.todos.archive[todoId]);

      state.todos.maxPage = calculateMaxPage(todosExecutionList.length, state.todos.perPage);
    }

    todosExecutionList = todosExecutionList.slice(
      page === 1 ? 0 : (page - 1) * state.todos.perPage,
      state.todos.perPage * page
    );

    todosList = Object.fromEntries(todosExecutionList);
  }

  const updatedState: TState = {
    ...state,
    todos: {
      ...state.todos,
      list: todosList,
    },
  };

  return updatedState.todos;
};
