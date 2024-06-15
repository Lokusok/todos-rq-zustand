import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { TListSettingsStore, TLanguages } from './types';

export const useListSettingsStore = create<TListSettingsStore>()(
  devtools(
    persist(
      immer((set) => ({
        language: navigator.language,
        showArchived: true,

        setShowArchived: (showArchivedVal: boolean) =>
          set((state) => {
            state.showArchived = showArchivedVal;
            return state;
          }),
        setLanguage: (language: TLanguages) =>
          set((state) => {
            state.language = language;
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
