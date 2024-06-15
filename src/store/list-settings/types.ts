export type TListSettingsState = {
  showArchived: boolean;
  language: TLanguages;
};

export type TListSettingsActions = {
  setShowArchived: (showArchivedVal: TListSettingsState['showArchived']) => void;
  setLanguage: (language: TLanguages) => void;
};

export type TListSettingsStore = TListSettingsState & TListSettingsActions;
export type TLanguages = typeof navigator.language;
