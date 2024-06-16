import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTodo } from '../../requests';

type TProps = {
  onSuccess?: (data: any, variables: any, context: any) => void;
};

function useUpdateTodo(props?: TProps) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTodo,
    onSuccess: props?.onSuccess,
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

export default useUpdateTodo;
