import { STORAGE_KEY } from '..';

import {
  saveToLocalStorage,
  getInitialSliceState,
  calculateMaxPage,
  getAllTodosFromLocalStorage,
} from '@/api/utils';

import { TState, TTodosSliceState } from '@/api/types';

import { TOptions } from './types';

export const fetchTodos: (options: TOptions) => Promise<TTodosSliceState> = async ({
  page = -1,
  excludeArchive,
}) => {
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  return getAllTodosFromLocalStorage({ page, excludeArchive });
};

export const fetchArchivedTodos: () => Promise<TTodo[]> = async () => {
  const allTodos = getAllTodosFromLocalStorage({ page: -1 });
  return Object.keys(allTodos.archive).map((todoId) => allTodos.list[todoId]) as TTodo[];
};

export const updateTodo: (todo: TTodo) => Promise<TTodo> = async (todo: TTodo) => {
  const rawState = localStorage.getItem(STORAGE_KEY);
  const state: TState = JSON.parse(rawState!);

  state.todos.list[todo.id] = todo;

  saveToLocalStorage(state);

  return todo;
};

export const createTodo: (todo: TTodo) => Promise<TTodo> = async (todo: TTodo) => {
  const rawState = localStorage.getItem(STORAGE_KEY);
  const state: TState = rawState
    ? JSON.parse(rawState)
    : {
        todos: getInitialSliceState(),
      };

  state.todos.list[todo.id] = todo;
  state.todos.maxOrder = todo.order;
  state.todos.maxPage = calculateMaxPage(
    Object.values(state.todos.list).length,
    state.todos.perPage,
  );

  saveToLocalStorage(state);

  return todo;
};

export const addTodoToArchive: (todoId: TTodo['id']) => Promise<TTodo> = async (todoId) => {
  const rawState = localStorage.getItem(STORAGE_KEY);
  const state: TState = JSON.parse(rawState!);

  state.todos.archive[todoId] = true;

  saveToLocalStorage(state);

  console.log(state);

  return state.todos.list[todoId];
};

export const removeTodoFromAchive: (todoId: TTodo['id']) => Promise<TTodo> = async (todoId) => {
  const rawState = localStorage.getItem(STORAGE_KEY);
  const state: TState = JSON.parse(rawState!);

  delete state.todos.archive[todoId];

  saveToLocalStorage(state);

  return state.todos.list[todoId];
};

/**
 * Окончательное удаление (из всех списков)
 * @returns {Boolean}
 */
export const deleteTodo: (todoId: TTodo['id']) => Promise<boolean> = async (todoId) => {
  const rawState = localStorage.getItem(STORAGE_KEY);
  const state: TState = JSON.parse(rawState!);

  delete state.todos.list[todoId];
  delete state.todos.archive[todoId];

  state.todos.maxPage = calculateMaxPage(
    Object.values(state.todos.list).length,
    state.todos.perPage,
  );

  saveToLocalStorage(state);

  return true;
};
