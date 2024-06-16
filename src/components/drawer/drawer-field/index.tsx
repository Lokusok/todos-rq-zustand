import style from './style.module.scss';
import React, { memo } from 'react';

type TProps = {
  children: React.ReactNode;
  testId?: string;
};

function DrawerField({ children, testId }: TProps) {
  return (
    <div className={style.drawerField} data-testid={testId}>
      {children}
    </div>
  );
}

export default memo(DrawerField);
