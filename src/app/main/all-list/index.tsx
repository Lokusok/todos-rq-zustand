import { memo } from 'react';
import { Helmet } from 'react-helmet';

import TodosAllList from '@/containers/todos-all-list';

function AllListPage() {
  return (
    <>
      <Helmet>
        <title>Список дел</title>
      </Helmet>

      <TodosAllList />
    </>
  );
}

export default memo(AllListPage);
