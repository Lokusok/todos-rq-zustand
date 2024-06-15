import { STORAGE_KEY } from '..';

import { saveToLocalStorage, getInitialSliceState, calculateMaxPage } from '@/api/utils';

import { TState, TTodosSliceState } from '@/api/types';

import { TOptions } from './types';

export const fetchTodos: (options: TOptions) => Promise<TTodosSliceState> = async ({
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
    state.todos.perPage
  );

  saveToLocalStorage(state);

  return todo;
};

export const addTodoToArchive: (todoId: TTodo['id']) => Promise<TTodo> = async (todoId) => {
  const rawState = localStorage.getItem(STORAGE_KEY);
  const state: TState = JSON.parse(rawState!);

  state.todos.archive[todoId] = true;

  saveToLocalStorage(state);

  return state.todos.list[todoId];
};

export const removeTodoFromAchive: (todoId: TTodo['id']) => Promise<TTodo> = async (todoId) => {
  const rawState = localStorage.getItem(STORAGE_KEY);
  const state: TState = JSON.parse(rawState!);

  delete state.todos.archive[todoId];

  saveToLocalStorage(state);

  return state.todos.list[todoId];
};

export const deleteTodo: (todoId: TTodo['id']) => Promise<boolean> = async (todoId) => {
  const rawState = localStorage.getItem(STORAGE_KEY);
  const state: TState = JSON.parse(rawState!);

  delete state.todos.list[todoId];
  delete state.todos.archive[todoId];

  saveToLocalStorage(state);

  return true;
};
