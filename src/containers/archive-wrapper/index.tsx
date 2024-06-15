import { memo } from 'react';
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

function ArchiveWrapper() {
  const todosQuery = useArchivedTodos();
  const deleteTodo = useDeleteTodo();

  const callbacks = {
    deleteTodo: async (todoId: TTodo['id']) => {
      await deleteTodo.mutateAsync(todoId);
    },
  };

  const options = {
    isTodosListExists: Number(todosQuery.data?.length) > 0,
  };

  const { t } = useTranslation();

  return (
    <Section.Root>
      <Section.Title>{t('archiveTitle')}:</Section.Title>

      <Section.Content>
        {todosQuery.isFetching ? (
          <GridSkeleton elemsCount={4} />
        ) : options.isTodosListExists ? (
          <AnimatePresence>
            <Grid
              data={todosQuery.data!}
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
                {Object.values(todosQuery.data!).length > 0 && (
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
