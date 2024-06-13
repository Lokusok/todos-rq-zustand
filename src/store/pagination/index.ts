import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { TPaginationStore } from './types';

export const usePaginationStore = create<TPaginationStore>()(
  devtools(
    persist(
      immer((set) => ({
        currentPage: 1,
        maxPage: 1,
        setCurrentPage: (page) =>
          set((state) => {
            state.currentPage = page;
            return state;
          }),
        setMaxPage: (page) =>
          set((state) => {
            state.maxPage = page;
            return state;
          }),
      })),
      {
        name: 'pagination_state',
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);
