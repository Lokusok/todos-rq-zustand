import style from './style.module.scss';

import { memo } from 'react';
import { Clock, Grip } from 'lucide-react';

import { format } from 'date-fns';

type TProps = {
  todo: TTodo;
};

function TodoItem({ todo }: TProps) {
  const helpers = {
    formatDate: (date: string) => format(date, 'dd.MM.yyyy'),
  };

  return (
    <article className={style.root}>
      <div className={style.indicatorIconWrapper}>
        <Grip size={30} color={'#b1b1b1'} />
      </div>

      <header className={style.header}>
        <h3 className={style.title}>{todo.title}</h3>
        <span className={style.date}>
          {helpers.formatDate(todo.startTime)} - {helpers.formatDate(todo.endTime)}
        </span>
      </header>

      <p className={style.descr}>{todo.descr}</p>

      <footer className={style.footer}>
        <div title="Выполняется" className={style.statusIconWrapper}>
          <Clock size={40} />
        </div>
        <button className={style.button}>Выполнить</button>
      </footer>
    </article>
  );
}

export default memo(TodoItem);
