import style from './style.module.scss';
import React, { memo } from 'react';

type TProps = {
  header: React.ReactNode;
  children: React.ReactNode;
};

function PageLayout({ header, children }: TProps) {
  return (
    <div className={style.root}>
      <div className={style.container}>
        {header}
        {children}
      </div>
    </div>
  );
}

export default memo(PageLayout);
