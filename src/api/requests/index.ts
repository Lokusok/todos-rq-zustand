import { STORAGE_KEY } from '..';

import { saveToLocalStorage, getInitialSliceState } from '@/api/utils';

import { TState, TTodosSliceState } from '@/api/types';

export const fetchTodos: () => Promise<TTodosSliceState> = async () => {
  const rawState = localStorage.getItem(STORAGE_KEY);
  const state: TState = rawState
    ? JSON.parse(rawState)
    : {
        todos: getInitialSliceState(),
      };

  return state.todos;
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
  state.todos.maxPage = Math.ceil(Object.values(state.todos.list).length / state.todos.perPage);

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
