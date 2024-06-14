export type TDrawersTypes = 'settings_right';

export type TDrawer = {
  id: string;
  type: TDrawersTypes;
  close?: () => void;
};

export type TDrawersState = {
  list: TDrawer[];
};

export type TDrawersActions = {
  add: (drawer: Omit<TDrawer, 'id' | 'close'>) => void;
};

export type TDrawersStore = TDrawersState & TDrawersActions;
