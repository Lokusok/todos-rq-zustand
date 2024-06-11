import style from './style.module.scss';

import { memo } from 'react';
import { BadgeCheck, Clock, Grip, X } from 'lucide-react';

import clsx from 'clsx';
import { format } from 'date-fns';

import Button from '../button';
import Tooltip from '../tooltip';

type TProps = {
  todo: TTodo;
};

type TTodosTypes = 'completed' | 'in_process' | 'expired';

const actionTextMap: Record<TTodosTypes, string> = {
  completed: 'Выполнено',
  in_process: 'Выполнить',
  expired: 'Время вышло',
};

const titleTextMap: Record<TTodosTypes, string> = {
  completed: 'Выполнено',
  in_process: 'В процессе',
  expired: 'Время вышло',
};

function TodoItem({ todo }: TProps) {
  const helpers = {
    formatDate: (date: string) => format(date, 'dd.MM.yyyy'),
  };

  const options: { status: TTodosTypes } = {
    status: (() => {
      if (todo.completed) return 'completed';

      const dateNow = new Date();
      const dateEnd = new Date(todo.endTime);

      if (dateNow > dateEnd) {
        return 'expired';
      }

      return 'in_process';
    })(),
  };

  const renders = {
    renderIcon: (todoStatus: TTodosTypes) => {
      switch (todoStatus) {
        case 'completed':
          return <BadgeCheck size={40} />;
        case 'expired':
          return <X size={40} />;
        case 'in_process':
          return <Clock size={40} />;
      }
    },
  };

  return (
    <article className={style.root}>
      {options.status}
      <div className={style.indicatorIconWrapper}>
        <Grip size={30} color={'#b1b1b1'} />
      </div>

      <header
        className={clsx(style.header, {
          [style.crossChildren]: ['completed', 'expired'].includes(options.status),
        })}
      >
        <h3 className={style.title}>{todo.title}</h3>
        <span className={style.date}>
          {helpers.formatDate(todo.startTime)} - {helpers.formatDate(todo.endTime)}
        </span>
      </header>

      <p className={style.descr}>{todo.descr}</p>

      <footer className={style.footer}>
        <div className={style.statusIconWrapper}>
          <Tooltip title={titleTextMap[options.status]}>
            {renders.renderIcon(options.status)}
          </Tooltip>
        </div>
        <Button
          status={
            options.status === 'completed'
              ? 'success'
              : options.status === 'expired'
              ? 'expired'
              : 'active'
          }
        >
          {actionTextMap[options.status]}
        </Button>
      </footer>
    </article>
  );
}

export default memo(TodoItem);
