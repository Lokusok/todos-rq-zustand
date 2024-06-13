import { useQuery } from '@tanstack/react-query';
import { fetchTodos } from '../../requests';

function useTodos(page?: number) {
  return useQuery({
    queryKey: ['todos', page],
    queryFn: () => fetchTodos(page || 1),
  });
}

export default useTodos;
