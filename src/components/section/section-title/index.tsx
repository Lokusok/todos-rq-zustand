import style from './style.module.scss';

import React, { memo } from 'react';

type TProps = {
  children: React.ReactNode;
};

function SectionTitle({ children }: TProps) {
  return <h2 className={style.title}>{children}</h2>;
}

export default memo(SectionTitle);
