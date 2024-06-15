import { memo } from 'react';

import Section from '@/components/section';
import TodoItem from '@/components/todo-item';
import Grid from '@/components/grid';
import GridSkeleton from '@/components/grid/skeleton';
import EmptyBanner from '@/components/empty-banner';

import PaginationWrapper from '../pagination-wrapper';

import useTodos from '@/api/hooks/use-todos';
import useUpdateTodo from '@/api/hooks/use-update-todo';
import useAddTodoToArchive from '@/api/hooks/use-add-todo-to-archive';
import useRemoveTodoFromArchive from '@/api/hooks/use-remove-todo-from-archive';
import useDeleteTodo from '@/api/hooks/use-delete-todo';

import { useQueryClient } from '@tanstack/react-query';
import { usePaginationStore } from '@/store';
import { useListSettingsStore } from '@/store/list-settings';
import { useShallow } from 'zustand/react/shallow';

function TodosAllList() {
  const paginationStore = usePaginationStore();
  const listSettingsStore = useListSettingsStore(
    useShallow((state) => ({
      showArchived: state.showArchived,
    }))
  );

  const queryClient = useQueryClient();

  const todosQuery = useTodos({
    page: paginationStore.currentPage,
    excludeArchive: !listSettingsStore.showArchived,
  });
  const updateTodo = useUpdateTodo();
  const updateTodoStatus = useUpdateTodo();
  const addTodoToArchive = useAddTodoToArchive();
  const removeTodoFromArchive = useRemoveTodoFromArchive();
  const deleteTodo = useDeleteTodo();

  let todosList = todosQuery.data
    ? Object.values(todosQuery.data.list)
        .slice()
        .sort((a, b) => a.order - b.order)
    : [];

  if (!listSettingsStore.showArchived && todosQuery.data) {
    todosList = todosList.filter((todo) => !todosQuery.data.archive[todo.id]);
  }

  const helpers = {
    isTodoInArchive: (todoId: TTodo['id']) => {
      const result = Boolean(todosQuery.data?.archive[todoId]);
      return result;
    },
  };

  const callbacks = {
    swapElements: async (firstId: TTodo['id'], secondId: TTodo['id']) => {
      const firstTodo = todosList.find((todo) => todo.id === firstId);
      if (!firstTodo) return;

      const secondTodo = todosList.find((todo) => todo.id === secondId);
      if (!secondTodo) return;

      [firstTodo.order, secondTodo.order] = [secondTodo.order, firstTodo.order];

      const firstTodoUpdatePromise = updateTodo.mutate(firstTodo);
      const secondTodoUpdatePromise = updateTodo.mutate(secondTodo);

      await Promise.allSettled([firstTodoUpdatePromise, secondTodoUpdatePromise]);

      requestIdleCallback(() => {
        queryClient.invalidateQueries({ queryKey: ['todos'] });
      });
    },
    completeTodo: (id: TTodo['id']) => {
      const findTodo = todosList.find((todo) => todo.id === id);
      if (!findTodo) return;

      findTodo.completed = true;
      updateTodoStatus.mutateAsync(findTodo);
    },
    toggleTodo: (id: TTodo['id']) => {
      const findTodo = todosList.find((todo) => todo.id === id);
      if (!findTodo) return;

      findTodo.completed = !findTodo.completed;
      updateTodoStatus.mutateAsync(findTodo);
    },
    addTodoToArchive: (id: TTodo['id']) => {
      addTodoToArchive.mutate(id);
    },
    removeTodoFromArchive: (id: TTodo['id']) => {
      removeTodoFromArchive.mutate(id);
    },
    deleteTodo: async (id: TTodo['id']) => {
      await deleteTodo.mutateAsync(id);
    },
  };

  const options = {
    isTodosListExists: Number(todosList.length) > 0,
  };

  return (
    <>
      <Section.Root>
        <Section.Title>Список дел:</Section.Title>
        <Section.Content>
          {todosQuery.isFetching ? (
            <GridSkeleton elemsCount={4} />
          ) : options.isTodosListExists ? (
            <Grid
              data={todosList}
              renderItem={(todo: TTodo) => {
                const isTodoInArchive = helpers.isTodoInArchive(todo.id);

                return (
                  <TodoItem
                    onArchive={
                      isTodoInArchive ? callbacks.removeTodoFromArchive : callbacks.addTodoToArchive
                    }
                    isInArchive={isTodoInArchive}
                    onComplete={callbacks.completeTodo}
                    onToggle={callbacks.toggleTodo}
                    onDelete={callbacks.deleteTodo}
                    onDrop={callbacks.swapElements}
                    todo={todo as TTodo}
                  />
                );
              }}
              keyExtractor={(todo) => (todo as TTodo).id}
            />
          ) : (
            <EmptyBanner goToHref="/create_todo" />
          )}
        </Section.Content>

        <PaginationWrapper />
      </Section.Root>
    </>
  );
}

export default memo(TodosAllList);
