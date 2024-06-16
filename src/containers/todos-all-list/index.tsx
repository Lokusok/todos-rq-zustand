import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { AnimatePresence, motion } from 'framer-motion';

import Section from '@/components/section';
import TodoItem from '@/components/todo-item';
import Grid from '@/components/grid';
import GridSkeleton from '@/components/grid/skeleton';
import EmptyBanner from '@/components/empty-banner';

import PaginationWrapper from '../pagination-wrapper';

import useTodosByCurrentPageSyncArchived from '@/hooks/external/use-todos-by-current-page-sync-archived';

import useUpdateTodo from '@/api/hooks/use-update-todo';
import useAddTodoToArchive from '@/api/hooks/use-add-todo-to-archive';
import useRemoveTodoFromArchive from '@/api/hooks/use-remove-todo-from-archive';
import useDeleteTodo from '@/api/hooks/use-delete-todo';

import { useQueryClient } from '@tanstack/react-query';
import { useListSettingsStore } from '@/store/list-settings';
import { useShallow } from 'zustand/react/shallow';
import { usePaginationStore } from '@/store';

function TodosAllList() {
  const listSettingsStore = useListSettingsStore(
    useShallow((state) => ({
      showArchived: state.showArchived,
    })),
  );
  const paginationStore = usePaginationStore(
    useShallow((state) => ({
      currentPage: state.currentPage,
    })),
  );
  const queryOptionsExternal = {
    page: paginationStore.currentPage,
    excludeArchive: !listSettingsStore.showArchived,
  };

  const queryClient = useQueryClient();

  const todosQuery = useTodosByCurrentPageSyncArchived();

  const updateTodo = useUpdateTodo();
  const updateTodoStatus = useUpdateTodo();
  const addTodoToArchive = useAddTodoToArchive(queryOptionsExternal);
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

      const firstTodoUpdatePromise = updateTodo.mutateAsync(firstTodo);
      const secondTodoUpdatePromise = updateTodo.mutateAsync(secondTodo);

      await Promise.allSettled([firstTodoUpdatePromise, secondTodoUpdatePromise]);

      requestIdleCallback(() => {
        queryClient.setQueryData(['todos', queryOptionsExternal], (state: any) => {
          console.log(state);

          const newState = {
            ...state,
            list: Object.fromEntries(
              Object.entries(state.list).map(([id, todo]) => {
                if (id === firstTodo.id) return [secondTodo.id, secondTodo];
                else if (id === secondTodo.id) return [firstTodo.id, firstTodo];

                return [id, todo];
              }),
            ),
          };

          return newState;
        });
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

  const { t } = useTranslation();

  console.log('is fetching all todos?', todosQuery.isFetching);

  return (
    <>
      <Section.Root>
        <Section.Title>{t('listTasksTitle')}:</Section.Title>
        <Section.Content>
          <AnimatePresence mode="popLayout">
            {todosQuery.isFetching ? (
              <React.Fragment key="skeletons-fragment">
                <motion.div
                  key={`skeletons-${Number(todosQuery.isFetching)}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <GridSkeleton elemsCount={4} />
                </motion.div>
              </React.Fragment>
            ) : options.isTodosListExists ? (
              <React.Fragment key="nature_elements-fragment">
                <motion.div
                  key={'nature_elements'}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Grid
                    data={todosList}
                    renderItem={(todo: TTodo) => {
                      const isTodoInArchive = helpers.isTodoInArchive(todo.id);

                      return (
                        <TodoItem
                          t={t}
                          onArchive={
                            isTodoInArchive
                              ? callbacks.removeTodoFromArchive
                              : callbacks.addTodoToArchive
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
                </motion.div>
              </React.Fragment>
            ) : (
              <React.Fragment key="empty_banner-fragment">
                <motion.div
                  key={'empty_banner'}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <EmptyBanner t={t} goToHref="/create_todo" />
                </motion.div>
              </React.Fragment>
            )}
          </AnimatePresence>
        </Section.Content>

        <PaginationWrapper />
      </Section.Root>
    </>
  );
}

export default memo(TodosAllList);
