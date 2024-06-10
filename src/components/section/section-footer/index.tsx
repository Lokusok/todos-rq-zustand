import style from './style.module.scss';

import React, { memo } from 'react';
import clsx from 'clsx';

type TProps = {
  children: React.ReactNode;
  centered?: boolean;
};

function SectionFooter({ children, centered }: TProps) {
  return (
    <>
      <div className={clsx(style.root, { [style.centered]: centered })}>{children}</div>
    </>
  );
}

export default memo(SectionFooter);
