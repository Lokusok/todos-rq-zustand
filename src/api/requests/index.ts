import { STORAGE_KEY } from '..';

import { saveToLocalStorage, getInitialSliceState } from '@/api/utils';

import { TState, TTodosSliceState } from '@/api/types';

export const fetchTodos: (page: number) => Promise<TTodosSliceState> = async (page = 1) => {
  const rawState = localStorage.getItem(STORAGE_KEY);
  const state: TState = rawState
    ? JSON.parse(rawState)
    : {
        todos: getInitialSliceState(),
      };

  const todosList = Object.fromEntries(
    Object.entries(state.todos.list).slice(
      page === 1 ? 0 : (page - 1) * state.todos.perPage,
      state.todos.perPage * page
    )
  );
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
