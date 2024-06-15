export type TListSettingsState = {
  showArchived: boolean;
};

export type TListSettingsActions = {
  setShowArchived: (showArchivedVal: TListSettingsState['showArchived']) => void;
};

export type TListSettingsStore = TListSettingsState & TListSettingsActions;
