import style from './style.module.scss';

import { memo } from 'react';

type TProps = {
  todo: TTodo;
  maxLength: number;
};

function TodoItemDescr({ todo, maxLength }: TProps) {
  return (
    <p className={style.descr}>
      {todo.descr.length > maxLength ? (
        <span>
          {todo.descr.slice(0, maxLength)} <span className={style.additionalDots}>...</span>
        </span>
      ) : (
        <span>{todo.descr}</span>
      )}
    </p>
  );
}

export default memo(TodoItemDescr);
