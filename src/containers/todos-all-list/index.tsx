import { memo } from 'react';

import PageLayout from '@/components/page-layout';
import Section from '@/components/section';
import TodoItem from '@/components/todo-item';
import Grid from '@/components/grid';
import Pagination from '@/components/pagination';

import HeaderWrapper from '@/containers/header-wrapper';
import useTodos from '@/store/todos';

function TodosAllList() {
  const todosStore = useTodos();

  const callbacks = {
    swapElements: (firstId: TTodo['id'], secondId: TTodo['id']) => {
      todosStore.swap(firstId, secondId);
    },
  };

  return (
    <>
      <PageLayout header={<HeaderWrapper />}>
        <Section.Root>
          <Section.Title>Список дел:</Section.Title>
          <Section.Content>
            <Grid
              data={todosStore.todos.slice().sort((a, b) => a.order - b.order)}
              renderItem={(todo) => (
                <TodoItem onDrop={callbacks.swapElements} todo={todo as TTodo} />
              )}
              keyExtractor={(todo) => (todo as TTodo).id}
            />
          </Section.Content>
          <Section.Footer centered>
            <Pagination currentPage={1} maxPage={10} />
          </Section.Footer>
        </Section.Root>
      </PageLayout>
    </>
  );
}

export default memo(TodosAllList);
