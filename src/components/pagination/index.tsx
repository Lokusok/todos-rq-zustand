import style from './style.module.scss';

import { memo } from 'react';
import clsx from 'clsx';

type TProps = {
  currentPage: number;
  maxPage: number;
};

function Pagination({ currentPage, maxPage }: TProps) {
  return (
    <ul className={style.list}>
      {new Array(maxPage).fill(null).map((_, index) => (
        <li key={index}>
          <button
            className={clsx(style.button, { [style.buttonActive]: currentPage === index + 1 })}
          >
            {index + 1}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default memo(Pagination);
