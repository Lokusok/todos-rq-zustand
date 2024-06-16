import style from './style.module.scss';

import React, { memo } from 'react';
import { Link } from 'react-router-dom';

import Button from '../button';
import { TFunction } from 'i18next';

type TProps = {
  goToHref?: string;
  leftActions?: React.ReactNode;
  rightActions?: React.ReactNode;
  t?: TFunction<'ns1', undefined> | ((arg: string) => React.ReactNode);
};

function EmptyBanner({ goToHref = '/', leftActions, rightActions, t = () => <></> }: TProps) {
  return (
    <div className={style.root}>
      <div className={style.content}>
        <span className={style.title}>{t('empty.title')} ;&#41;</span>
        <div className={style.actions}>
          {leftActions}

          <Link to={goToHref}>
            <Button status="success">{t('anyActions.createEntity1')}</Button>
          </Link>

          {rightActions}
        </div>
      </div>
    </div>
  );
}

export default memo(EmptyBanner);
