import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { TModalsStore } from './types';

export const useModalsStore = create<TModalsStore>()(
  devtools(
    immer((set) => ({
      list: [],
      add: (modal) =>
        set((state) => {
          const newModal = {
            id: crypto.randomUUID(),
            ...modal,
          };

          state.list.push({
            ...newModal,
            close: () =>
              set((state) => {
                state.list = state.list.filter((existModal) => existModal.id !== newModal.id);
                return state;
              }),
          });

          return state;
        }),
    }))
  )
);
