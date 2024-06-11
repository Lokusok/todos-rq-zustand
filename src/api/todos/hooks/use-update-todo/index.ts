import { useMutation } from '@tanstack/react-query';
import { updateTodo } from '../../requests';

function useUpdateTodo() {
  return useMutation({
    mutationFn: updateTodo,
  });
}

export default useUpdateTodo;
