import style from './style.module.scss';

import { memo } from 'react';
import { Link } from 'react-router-dom';

import Button from '../button';

type TProps = {
  goToHref?: string;
};

function EmptyBanner({ goToHref = '/' }: TProps) {
  return (
    <div className={style.root}>
      <div className={style.content}>
        <span className={style.title}>Пока что здесь пусто ;&#41;</span>
        <Link to={goToHref}>
          <Button status="success">Создать задачу</Button>
        </Link>
      </div>
    </div>
  );
}

export default memo(EmptyBanner);
