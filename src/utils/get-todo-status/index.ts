import { TTodosTypes } from '@/components/todo-item/types';

function getTodoStatus(todo: TTodo): TTodosTypes {
  if (todo.completed) return 'completed';

  const dateNow = new Date();
  const dateEnd = new Date(todo.endTime);

  if (dateNow > dateEnd) {
    return 'expired';
  }

  return 'in_process';
}

export default getTodoStatus;
