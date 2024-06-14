import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { TDrawersStore } from './types';

export const useDrawersStore = create<TDrawersStore>()(
  devtools(
    immer((set) => ({
      list: [],
      add: (drawer) =>
        set((state) => {
          const newDrawer = {
            id: crypto.randomUUID(),
            ...drawer,
          };

          state.list.push({
            ...newDrawer,
            close: () =>
              set((state) => {
                state.list = state.list.filter((existDrawer) => existDrawer.id !== newDrawer.id);
                return state;
              }),
          });

          return state;
        }),
    }))
  )
);
