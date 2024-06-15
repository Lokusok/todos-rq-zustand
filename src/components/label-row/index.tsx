import style from './style.module.scss';

import React, { memo } from 'react';

type TProps = {
  title: string;
  input: React.ReactNode;
};

function LabelRow({ title, input }: TProps) {
  return (
    <label className={style.labelRow}>
      <span className={style.labelText}>{title}</span>
      {input}
    </label>
  );
}

export default memo(LabelRow);
