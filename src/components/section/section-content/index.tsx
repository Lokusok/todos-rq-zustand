import style from './style.module.scss';

import React, { memo } from 'react';

type TProps = {
  children: React.ReactNode;
};

function SectionContent({ children }: TProps) {
  return <div className={style.root}>{children}</div>;
}

export default memo(SectionContent);
