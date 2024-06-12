import { memo } from 'react';
import { Helmet } from 'react-helmet-async';

import Section from '@/components/section';

import useTodos from '@/api/todos/hooks/use-todos';
import Grid from '@/components/grid';
import Skeleton from 'react-loading-skeleton';
import EmptyBanner from '@/components/empty-banner';
import TodoItem from '@/components/todo-item';

function ArchivePage() {
  const todosQuery = useTodos();

  const todosList: TTodo[] = todosQuery.data ? Object.values(todosQuery.data.list) : [];

  const options = {
    isTodosListExists: Number(todosList.length) > 0,
  };

  return (
    <>
      <Helmet>
        <title>Архив</title>
      </Helmet>

      <Section.Root>
        <Section.Title>Архив:</Section.Title>

        <Section.Content>
          {todosQuery.isLoading ? (
            <Grid data={new Array(4).fill(null)} renderItem={() => <Skeleton height={300} />} />
          ) : options.isTodosListExists ? (
            <Grid
              data={todosList.slice().sort((a, b) => a.order - b.order)}
              renderItem={(todo: TTodo) => {
                return (
                  <TodoItem
                    todo={todo as TTodo}
                    isCompleteBtnDisabled={true}
                    completeBtnText="В архиве"
                  />
                );
              }}
              keyExtractor={(todo) => (todo as TTodo).id}
            />
          ) : (
            <EmptyBanner goToHref="/" />
          )}
        </Section.Content>
      </Section.Root>
    </>
  );
}

export default memo(ArchivePage);
