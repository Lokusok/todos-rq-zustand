import { useMutation, useQueryClient } from '@tanstack/react-query';
import { removeTodoFromAchive } from '../../requests';

function useRemoveTodoFromArchive() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeTodoFromAchive,
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['todos'],
      });

      queryClient.invalidateQueries({
        queryKey: ['archivedTodos'],
      });
    },
  });
}

export default useRemoveTodoFromArchive;
