import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { store } from '@/mock';

type TTodosState = {
  todos: TTodo[];
};

type TTodosActions = {
  swap: (firstId: TTodo['id'], secondId: TTodo['id']) => void;
};

type TTodosStore = TTodosState & TTodosActions;

const useTodos = create<TTodosStore>()(
  devtools(
    immer((set) => ({
      todos: store.todos,
      swap: (firstId, secondId) => {
        set((state) => {
          const firstTodo = state.todos.find((todo) => todo.id === firstId);
          if (!firstTodo) return;

          const secondTodo = state.todos.find((todo) => todo.id === secondId);
          if (!secondTodo) return;

          [firstTodo.order, secondTodo.order] = [secondTodo.order, firstTodo.order];
        });
      },
    }))
  )
);

export default useTodos;
