import { memo, useEffect } from 'react';

import Pagination from '@/components/pagination';
import Section from '@/components/section';

import { usePaginationStore } from '@/store';

import useTodosByCurrentPageSyncArchived from '@/hooks/external/use-todos-by-current-page-sync-archived';

function PaginationWrapper() {
  const paginationStore = usePaginationStore();

  const todosQuery = useTodosByCurrentPageSyncArchived();

  useEffect(() => {
    if (!todosQuery.data) return;
    paginationStore.setMaxPage(todosQuery.data.maxPage);

    if (Object.values(todosQuery.data.list).length === 0) {
      paginationStore.setCurrentPage(1);
      return;
    }
  }, [todosQuery.data, paginationStore]);

  return (
    <>
      {!todosQuery.isLoading && (
        <Section.Footer centered>
          <Pagination
            currentPage={paginationStore.currentPage}
            maxPage={todosQuery.data!.maxPage}
            showIfOnlyOne={false}
            onChange={paginationStore.setCurrentPage}
          />
        </Section.Footer>
      )}
    </>
  );
}

export default memo(PaginationWrapper);
