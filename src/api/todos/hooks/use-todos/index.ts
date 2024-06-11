import { useQuery } from '@tanstack/react-query';
import { fetchTodos } from '../../requests';

function useTodos() {
  return useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  });
}

export default useTodos;
