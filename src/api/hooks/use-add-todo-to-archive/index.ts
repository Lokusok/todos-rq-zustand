import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addTodoToArchive } from '../../requests';

function useAddTodoToArchive() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addTodoToArchive,
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['todos'],
      });
    },
  });
}

export default useAddTodoToArchive;
