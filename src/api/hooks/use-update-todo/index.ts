import { useMutation } from '@tanstack/react-query';
import { updateTodo } from '../../requests';

type TProps = {
  onSuccess?: (data: any, variables: any, context: any) => void;
};

function useUpdateTodo(props?: TProps) {
  return useMutation({
    mutationFn: updateTodo,
    onSuccess: props?.onSuccess,
  });
}

export default useUpdateTodo;
