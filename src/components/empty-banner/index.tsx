import style from './style.module.scss';

import React, { memo } from 'react';
import { Link } from 'react-router-dom';

import Button from '../button';

type TProps = {
  goToHref?: string;
  leftActions?: React.ReactNode;
  rightActions?: React.ReactNode;
};

function EmptyBanner({ goToHref = '/', leftActions, rightActions }: TProps) {
  return (
    <div className={style.root}>
      <div className={style.content}>
        <span className={style.title}>Пока что здесь пусто ;&#41;</span>
        <div className={style.actions}>
          {leftActions}

          <Link to={goToHref}>
            <Button status="success">Создать задачу</Button>
          </Link>

          {rightActions}
        </div>
      </div>
    </div>
  );
}

export default memo(EmptyBanner);
