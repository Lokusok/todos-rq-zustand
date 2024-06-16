import { memo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { AnimatePresence, motion } from 'framer-motion';

import EmptyBanner from '@/components/empty-banner';
import Section from '@/components/section';
import Grid from '@/components/grid';
import GridSkeleton from '@/components/grid/skeleton';
import TodoItem from '@/components/todo-item';
import Button from '@/components/button';

import useDeleteTodo from '@/api/hooks/use-delete-todo';
import useArchivedTodos from '@/api/hooks/use-archived-todos';
import useTodos from '@/api/hooks/use-todos';

import { usePaginationStore } from '@/store';

function ArchiveWrapper() {
  const paginationStore = usePaginationStore();

  const archiveTodosQuery = useArchivedTodos();
  const todosQuery = useTodos();

  const deleteTodo = useDeleteTodo();

  const callbacks = {
    deleteTodo: async (todoId: TTodo['id']) => {
      await deleteTodo.mutateAsync(todoId);
    },
  };

  useEffect(() => {
    if (!todosQuery.data?.maxPage) return;
    if (paginationStore.currentPage > todosQuery.data?.maxPage)
      paginationStore.setCurrentPage(todosQuery.data.maxPage);

    paginationStore.setMaxPage(todosQuery.data?.maxPage);
  }, [paginationStore, todosQuery.data?.maxPage]);

  const options = {
    isTodosListExists: Number(archiveTodosQuery.data?.length) > 0,
  };

  const { t } = useTranslation();

  return (
    <Section.Root>
      <Section.Title>{t('archiveTitle')}:</Section.Title>

      <Section.Content>
        {archiveTodosQuery.isFetching ? (
          <GridSkeleton elemsCount={4} />
        ) : options.isTodosListExists ? (
          <AnimatePresence>
            <Grid
              data={archiveTodosQuery.data!}
              renderItem={(todo) => {
                return (
                  <motion.div exit={{ opacity: 0, y: 10 }}>
                    <TodoItem
                      t={t}
                      todo={todo as TTodo}
                      isCompleteBtnDisabled={true}
                      onDelete={callbacks.deleteTodo}
                      completeBtnText="В архиве"
                    />
                  </motion.div>
                );
              }}
              keyExtractor={(todo) => (todo as TTodo).id}
            />
          </AnimatePresence>
        ) : (
          <EmptyBanner
            t={t}
            leftActions={
              <>
                {Object.values(todosQuery.data?.list || []).length > 0 && (
                  <Link to="/">
                    <Button status="active">{t('anyActions.archiveEntity1')}</Button>
                  </Link>
                )}
              </>
            }
            goToHref="/create_todo"
          />
        )}
      </Section.Content>
    </Section.Root>
  );
}

export default memo(ArchiveWrapper);
