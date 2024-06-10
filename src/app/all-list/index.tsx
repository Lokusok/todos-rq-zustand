import { memo } from 'react';

import PageLayout from '@/components/page-layout';
import Section from '@/components/section';
import TodoItem from '@/components/todo-item';

import HeaderWrapper from '@/containers/header-wrapper';

import { store } from '@/mock';
import Grid from '@/components/grid';
import Pagination from '@/components/pagination';

function AllListPage() {
  return (
    <PageLayout header={<HeaderWrapper />}>
      <Section.Root>
        <Section.Title>Список дел:</Section.Title>
        <Section.Content>
          <p>Content of list todos here</p>

          <Grid
            data={store.todos}
            renderItem={(todo) => <TodoItem todo={todo as TTodo} />}
            keyExtractor={(todo) => (todo as TTodo).id}
          />
        </Section.Content>
        <Section.Footer centered>
          <Pagination currentPage={1} maxPage={10} />
        </Section.Footer>
      </Section.Root>
    </PageLayout>
  );
}

export default memo(AllListPage);
