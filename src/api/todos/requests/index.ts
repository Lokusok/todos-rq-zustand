import { todosClient } from '..';

export const fetchTodos: () => Promise<TTodo[]> = async () => {
  const { data } = await todosClient.get('/');
  console.log('fetchTodos:', data);
  return data;
};

export const updateTodo = async (todo: TTodo) => {
  const { data } = await todosClient.put(`/${todo.id}`, todo);
  console.log('Update todo');
  return data;
};
