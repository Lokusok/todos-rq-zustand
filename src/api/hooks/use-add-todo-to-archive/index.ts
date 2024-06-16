import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addTodoToArchive } from '../../requests';

import { getAllTodosFromLocalStorage } from '@/api/utils';
import { TOptions } from '@/api/requests/types';

function useAddTodoToArchive(options: TOptions) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addTodoToArchive,
    onSettled: () => {
      queryClient.setQueryData(['todos', options], () => {
        return getAllTodosFromLocalStorage(options);
      });

      queryClient.setQueryData(['todos'], () => {
        return getAllTodosFromLocalStorage({});
      });

      queryClient.invalidateQueries({
        queryKey: ['archivedTodos'],
      });
    },
  });
}

export default useAddTodoToArchive;
