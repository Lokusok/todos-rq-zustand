import { memo } from 'react';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';

import { AnimatePresence, motion } from 'framer-motion';

import EmptyBanner from '@/components/empty-banner';
import Section from '@/components/section';
import Grid from '@/components/grid';
import TodoItem from '@/components/todo-item';
import Button from '@/components/button';

import useTodos from '@/api/hooks/use-todos';
import useDeleteTodo from '@/api/hooks/use-delete-todo';

function ArchiveWrapper() {
  const todosQuery = useTodos();
  const deleteTodo = useDeleteTodo();

  const todosList: TTodo[] = todosQuery.data
    ? Object.keys(todosQuery.data.archive).map((todoId) => todosQuery.data.list[todoId])
    : [];

  const callbacks = {
    deleteTodo: (todoId: TTodo['id']) => {
      deleteTodo.mutate(todoId);
    },
  };

  const options = {
    isTodosListExists: Number(todosList.length) > 0,
  };

  return (
    <Section.Root>
      <Section.Title>Архив:</Section.Title>

      <Section.Content>
        {todosQuery.isLoading ? (
          <Grid data={new Array(4).fill(null)} renderItem={() => <Skeleton height={300} />} />
        ) : options.isTodosListExists ? (
          <AnimatePresence>
            <Grid
              data={todosList.slice().sort((a, b) => a.order - b.order)}
              renderItem={(todo) => {
                return (
                  <motion.div exit={{ opacity: 0, y: 10 }}>
                    <TodoItem
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
            leftActions={
              <>
                {Object.values(todosQuery.data?.list || {}).length > 0 && (
                  <Link to="/">
                    <Button status="active">Поместить в архив</Button>
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
