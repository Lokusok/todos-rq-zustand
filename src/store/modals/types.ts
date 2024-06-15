export type TModalsTypes = 'charts';

export type TModal = {
  id: string;
  type: TModalsTypes;
  close?: () => void;
};

export type TModalsState = {
  list: TModal[];
};

export type TModalsActions = {
  add: (toast: Omit<TModal, 'id' | 'close'>) => void;
};

export type TModalsStore = TModalsState & TModalsActions;
