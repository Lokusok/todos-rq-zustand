import { memo } from 'react';

import Skeleton from 'react-loading-skeleton';

import Section from '@/components/section';
import TodoItem from '@/components/todo-item';
import Grid from '@/components/grid';
import Pagination from '@/components/pagination';

import useTodos from '@/api/todos/hooks/use-todos';
import useUpdateTodo from '@/api/todos/hooks/use-update-todo';

import { useQueryClient } from '@tanstack/react-query';
import EmptyBanner from '@/components/empty-banner';
import useAddTodoToArchive from '@/api/todos/hooks/use-add-todo-to-archive';
import useRemoveTodoFromArchive from '@/api/todos/hooks/use-remove-todo-from-archive';

function TodosAllList() {
  const queryClient = useQueryClient();

  const todosQuery = useTodos();
  const updateTodo = useUpdateTodo();
  const updateTodoStatus = useUpdateTodo();
  const addTodoToArchive = useAddTodoToArchive();
  const removeTodoFromArchive = useRemoveTodoFromArchive();

  const todosList: TTodo[] = todosQuery.data ? Object.values(todosQuery.data.list) : [];

  const helpers = {
    isTodoInArchive: (todoId: TTodo['id']) => {
      const result = Boolean(todosQuery.data?.archive[todoId]);
      console.log(`${todoId} in archive: ${result}`);
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
      console.log('Add to archive: ', id);
      addTodoToArchive.mutate(id);
    },
    removeTodoFromArchive: (id: TTodo['id']) => {
      console.log('Remove from archive: ', id);
      removeTodoFromArchive.mutate(id);
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
          {todosQuery.isLoading ? (
            <Grid data={new Array(4).fill(null)} renderItem={() => <Skeleton height={300} />} />
          ) : options.isTodosListExists ? (
            <Grid
              data={todosList.slice().sort((a, b) => a.order - b.order)}
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

        {!todosQuery.isLoading && options.isTodosListExists && (
          <Section.Footer centered>
            <Pagination currentPage={1} maxPage={todosQuery.data!.maxPage} showIfOnlyOne={false} />
          </Section.Footer>
        )}
      </Section.Root>
    </>
  );
}

export default memo(TodosAllList);
