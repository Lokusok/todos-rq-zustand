import style from './style.module.scss';

import React, { memo } from 'react';
import clsx from 'clsx';

type TProps = {
  children: React.ReactNode;
  centered?: boolean;
};

function SectionTitle({ children, centered }: TProps) {
  return <h2 className={clsx(style.title, { [style.centered]: centered })}>{children}</h2>;
}

export default memo(SectionTitle);
