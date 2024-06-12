export type TTodosSliceState = {
  list: Record<TTodo['id'], TTodo>;
  archive: Record<TTodo['id'], true>;
  maxOrder: number;
  maxPage: number;
  perPage: number;
};
