export type TPaginationState = {
  currentPage: number;
  maxPage: number;
};

export type TPaginationActions = {
  setCurrentPage: (page: TPaginationState['currentPage']) => void;
  setMaxPage: (page: TPaginationState['currentPage']) => void;
};

export type TPaginationStore = TPaginationState & TPaginationActions;
