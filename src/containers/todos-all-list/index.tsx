import { memo } from 'react';

import Skeleton from 'react-loading-skeleton';

import PageLayout from '@/components/page-layout';
import Section from '@/components/section';
import TodoItem from '@/components/todo-item';
import Grid from '@/components/grid';
import Pagination from '@/components/pagination';

import HeaderWrapper from '@/containers/header-wrapper';
import useTodos from '@/api/todos/hooks/use-todos';
import useUpdateTodo from '@/api/todos/hooks/use-update-todo';

import { useQueryClient } from '@tanstack/react-query';

function TodosAllList() {
  const queryClient = useQueryClient();

  const todosQuery = useTodos();
  const updateTodo = useUpdateTodo();

  const callbacks = {
    swapElements: async (firstId: TTodo['id'], secondId: TTodo['id']) => {
      if (!todosQuery.data) return;

      const firstTodo = todosQuery.data.find((todo) => todo.id === firstId);
      if (!firstTodo) return;

      const secondTodo = todosQuery.data.find((todo) => todo.id === secondId);
      if (!secondTodo) return;

      console.log('order of first:', firstTodo.order);
      console.log('order of second:', secondTodo.order);

      [firstTodo.order, secondTodo.order] = [secondTodo.order, firstTodo.order];

      const firstTodoUpdatePromise = updateTodo.mutate(firstTodo);
      const secondTodoUpdatePromise = updateTodo.mutate(secondTodo);

      await Promise.allSettled([firstTodoUpdatePromise, secondTodoUpdatePromise]);

      requestIdleCallback(() => {
        queryClient.invalidateQueries({ queryKey: ['todos'] });
      });
    },
  };

  return (
    <>
      <PageLayout header={<HeaderWrapper />}>
        <Section.Root>
          <Section.Title>Список дел:</Section.Title>
          <Section.Content>
            {todosQuery.isLoading ? (
              <Grid data={new Array(4).fill(null)} renderItem={() => <Skeleton height={300} />} />
            ) : (
              <Grid
                data={todosQuery.data!.slice().sort((a, b) => a.order - b.order)}
                renderItem={(todo) => (
                  <TodoItem onDrop={callbacks.swapElements} todo={todo as TTodo} />
                )}
                keyExtractor={(todo) => (todo as TTodo).id}
              />
            )}
          </Section.Content>

          {!todosQuery.isLoading && (
            <Section.Footer centered>
              <Pagination currentPage={1} maxPage={10} />
            </Section.Footer>
          )}
        </Section.Root>
      </PageLayout>
    </>
  );
}

export default memo(TodosAllList);
