import { memo } from 'react';

import CreateTodoForm from '@/components/create-todo-form';
import Section from '@/components/section';

function CreateTodoPage() {
  return (
    <Section.Root>
      <Section.Title>Создание задачи:</Section.Title>

      <Section.Content>
        <CreateTodoForm />
      </Section.Content>
    </Section.Root>
  );
}

export default memo(CreateTodoPage);
