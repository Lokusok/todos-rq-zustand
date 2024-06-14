import { memo } from 'react';

import Pagination from '@/components/pagination';
import Section from '@/components/section';

import useTodos from '@/api/hooks/use-todos';
import { usePaginationStore } from '@/store';

function PaginationWrapper() {
  const paginationStore = usePaginationStore();

  const todosQuery = useTodos(paginationStore.currentPage);

  if (!todosQuery.data) return;
  paginationStore.setMaxPage(todosQuery.data.maxPage);

  if (Object.values(todosQuery.data.list).length === 0) {
    paginationStore.setCurrentPage(1);
    return null;
  }

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
