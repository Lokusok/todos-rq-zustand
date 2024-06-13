import style from './style.module.scss';
import { memo } from 'react';

import clsx from 'clsx';
import { format } from 'date-fns';

import { TTodosTypes } from '../types';

type TProps = {
  todo: TTodo;
  status: TTodosTypes;
};

function TodoItemHeader({ todo, status }: TProps) {
  const helpers = {
    formatDate: (date: string) => format(date, 'dd.MM.yyyy'),
  };

  return (
    <header
      className={clsx(style.header, {
        [style.crossChildren]: ['completed', 'expired'].includes(status),
      })}
    >
      <h3 className={style.title}>{todo.title}</h3>
      <span className={style.date}>
        {helpers.formatDate(todo.startTime)} - {helpers.formatDate(todo.endTime)}
      </span>
    </header>
  );
}

export default memo(TodoItemHeader);
