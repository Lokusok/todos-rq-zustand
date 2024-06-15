import { useQuery } from '@tanstack/react-query';
import { fetchArchivedTodos } from '@/api/requests';

function useArchivedTodos() {
  return useQuery({
    queryKey: ['archivedTodos'],
    queryFn: fetchArchivedTodos,
  });
}

export default useArchivedTodos;
