import { deleteTodo } from '@/api/requests';
import { useMutation, useQueryClient } from '@tanstack/react-query';

function useDeleteTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTodo,
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['archivedTodos'],
      });

      queryClient.invalidateQueries({
        queryKey: ['todos'],
      });
    },
  });
}

export default useDeleteTodo;
