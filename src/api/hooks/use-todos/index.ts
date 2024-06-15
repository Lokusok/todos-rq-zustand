import { useQuery } from '@tanstack/react-query';
import { fetchTodos } from '../../requests';

import { TOptions } from '@/api/requests/types';

function useTodos(options?: TOptions) {
  return useQuery({
    queryKey: ['todos', options],
    queryFn: () => fetchTodos(options || {}),
  });
}

export default useTodos;
