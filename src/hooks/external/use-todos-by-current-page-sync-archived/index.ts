import useTodos from '@/api/hooks/use-todos';
import { usePaginationStore } from '@/store';
import { useListSettingsStore } from '@/store/list-settings';
import { useShallow } from 'zustand/react/shallow';

function useTodosByCurrentPageSyncArchived() {
  const paginationStore = usePaginationStore();
  const listSettingsStore = useListSettingsStore(
    useShallow((state) => ({
      showArchived: state.showArchived,
    }))
  );

  const todosQuery = useTodos({
    page: paginationStore.currentPage,
    excludeArchive: !listSettingsStore.showArchived,
  });

  return todosQuery;
}

export default useTodosByCurrentPageSyncArchived;
