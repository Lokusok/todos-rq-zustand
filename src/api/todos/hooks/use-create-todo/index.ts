import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createTodo } from '../../requests';

function useCreateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTodo,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
}

export default useCreateTodo;
