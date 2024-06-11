import { todosClient } from '..';

export const fetchTodos: () => Promise<TTodo[]> = async () => {
  const { data } = await todosClient.get('/');
  console.log('fetchTodos:', data);
  return data;
};

export const updateTodo: (todo: TTodo) => Promise<TTodo> = async (todo: TTodo) => {
  const { data } = await todosClient.put<TTodo>(`/${todo.id}`, todo);
  console.log('Update todo');
  return data;
};

export const createTodo: (todo: TTodo) => Promise<TTodo> = async (todo: TTodo) => {
  const { data } = await todosClient.post<TTodo>('/', todo);
  console.log('Create todo:', data);
  return data;
};
