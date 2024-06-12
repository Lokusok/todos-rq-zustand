import { memo } from 'react';
import { Helmet } from 'react-helmet-async';

import CreateTodoWrapper from '@/containers/create-todo-wrapper';

function CreateTodoPage() {
  return (
    <>
      <Helmet>
        <title>Создать задачу</title>
      </Helmet>
      <CreateTodoWrapper />
    </>
  );
}

export default memo(CreateTodoPage);
