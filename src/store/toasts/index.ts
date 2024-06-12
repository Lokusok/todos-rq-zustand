import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { TToastsStore } from './types';

export const useToastsStore = create<TToastsStore>()(
  devtools(
    immer((set) => ({
      list: [],
      add: (toast) =>
        set((state) => {
          const newToast = {
            id: crypto.randomUUID(),
            ...toast,
          };

          state.list.push({
            ...newToast,
            close: () =>
              set((state) => {
                state.list = state.list.filter((existToast) => existToast.id !== newToast.id);
                return state;
              }),
          });

          return state;
        }),
    }))
  )
);
