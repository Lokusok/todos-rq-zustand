import { describe, expect, test } from 'vitest';
import getTodoStatus from '.';

describe('getTodoStatus', () => {
  test('Выдаёт completed', () => {
    const completedTodo = {
      completed: true,
    };

    const result = getTodoStatus(completedTodo as TTodo);
    expect(result).equal('completed');
  });

  test('Выдаёт expired', () => {
    const oneHour = 1000 * 60 * 60;
    const expiredTodo = {
      endTime: new Date(Number(new Date()) - oneHour).toISOString(),
    };

    const result = getTodoStatus(expiredTodo as TTodo);
    expect(result).equal('expired');
  });

  test('Выдаёт in_process', () => {
    const oneHour = 1000 * 60 * 60;
    const normalTodo: TTodo = {
      id: crypto.randomUUID(),
      title: '123',
      descr: '123',
      completed: false,
      startTime: new Date(Number(new Date()) - oneHour).toISOString(),
      endTime: new Date(Number(new Date()) + oneHour).toISOString(),
      order: 1,
    };

    const result = getTodoStatus(normalTodo);
    expect(result).equal('in_process');
  });
});
