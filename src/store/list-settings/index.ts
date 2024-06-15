import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { TListSettingsStore } from './types';

export const useListSettingsStore = create<TListSettingsStore>()(
  devtools(
    persist(
      immer((set) => ({
        showArchived: true,
        setShowArchived: (showArchivedVal: boolean) =>
          set((state) => {
            state.showArchived = showArchivedVal;
            return state;
          }),
      })),
      {
        name: 'list_settings_store',
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);
