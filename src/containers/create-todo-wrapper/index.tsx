import { memo } from 'react';

import CreateTodoForm from '@/components/create-todo-form';
import Section from '@/components/section';

import useCreateTodo from '@/api/hooks/use-create-todo';
import useTodos from '@/api/hooks/use-todos';

import { useToastsStore } from '@/store/toasts';
import { useShallow } from 'zustand/react/shallow';

import { TTodoDto } from './types';

function CreateTodoWrapper() {
  const toastsStore = useToastsStore(
    useShallow((state) => ({
      list: state.list,
      add: state.add,
    }))
  );

  const todosQuery = useTodos();
  const createTodo = useCreateTodo();

  const callbacks = {
    onSubmit: async (todo: TTodoDto) => {
      if (!todosQuery.data) return;

      const buildTodo: TTodo = {
        id: crypto.randomUUID(),
        title: todo.title,
        descr: todo.descr,
        startTime: new Date().toISOString(),
        endTime: todo.dateEnd,
        completed: false,
        order: todosQuery.data.maxOrder + 1,
      };
      await createTodo.mutateAsync(buildTodo);

      toastsStore.add({
        type: 'success',
        title: 'Успешно добавили',
        descr: 'Добавление задачи прошло успешно',
        timeout: 5000,
      });
    },
  };

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
