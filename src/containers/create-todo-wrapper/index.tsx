import { memo, useEffect } from 'react';

import CreateTodoForm from '@/components/create-todo-form';

import useCreateTodo from '@/api/todos/hooks/use-create-todo';

import { TTodoDto } from './types';
import Section from '@/components/section';

function CreateTodoWrapper() {
  const createTodo = useCreateTodo();

  const callbacks = {
    onSubmit: async (todo: TTodoDto) => {
      const buildTodo: TTodo = {
        id: crypto.randomUUID(),
        title: todo.title,
        descr: todo.descr,
        startTime: new Date().toISOString(),
        endTime: todo.dateEnd,
        completed: false,
        order: 6,
      };
      await createTodo.mutateAsync(buildTodo);
      console.log('Add todo to db');
    },
  };

  useEffect(() => {
    console.log('isPending:', createTodo.isPending);
  }, [createTodo.isPending]);

  return (
    <>
      <Section.Root>
        <Section.Title>Создание задачи:</Section.Title>

        <Section.Content>
          <CreateTodoForm submitDisabled={createTodo.isPending} onSubmit={callbacks.onSubmit} />
        </Section.Content>
      </Section.Root>
    </>
  );
}

export default memo(CreateTodoWrapper);
