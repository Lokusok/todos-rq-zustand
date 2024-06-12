export type TToastsTypes = 'success' | 'error' | 'info';

export type TToast = {
  id: string;
  type: TToastsTypes;
  title: string;
  descr: string;
  timeout: number;
  close?: () => void;
};

export type TToastsState = {
  list: TToast[];
};

export type TToastsActions = {
  add: (toast: Omit<TToast, 'id' | 'close'>) => void;
};

export type TToastsStore = TToastsState & TToastsActions;
