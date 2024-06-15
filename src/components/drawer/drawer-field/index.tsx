import style from './style.module.scss';
import React, { memo } from 'react';

type TProps = {
  children: React.ReactNode;
};

function DrawerField({ children }: TProps) {
  return <div className={style.drawerField}>{children}</div>;
}

export default memo(DrawerField);
