import { memo } from 'react';
import Skeleton from 'react-loading-skeleton';

import EmptyBanner from '@/components/empty-banner';
import Section from '@/components/section';
import Grid from '@/components/grid';
import TodoItem from '@/components/todo-item';

import useTodos from '@/api/hooks/use-todos';

function ArchiveWrapper() {
  const todosQuery = useTodos();

  const todosList: TTodo[] = todosQuery.data
    ? Object.keys(todosQuery.data.archive).map((todoId) => todosQuery.data.list[todoId])
    : [];

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
          <Grid
            data={todosList.slice().sort((a, b) => a.order - b.order)}
            renderItem={(todo) => {
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
          <EmptyBanner goToHref="/create_todo" />
        )}
      </Section.Content>
    </Section.Root>
  );
}

export default memo(ArchiveWrapper);
