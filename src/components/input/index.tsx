import style from './style.module.scss';

import React, { memo } from 'react';
import clsx from 'clsx';

type TProps = {
  multiline?: boolean;
} & (React.ComponentProps<'input'> | React.ComponentProps<'textarea'>);

function Input({ multiline, ...props }: TProps) {
  if (multiline)
    return (
      <textarea
        className={clsx(style.input, style.textarea)}
        {...(props as React.ComponentProps<'textarea'>)}
      />
    );
  else return <input className={style.input} {...(props as React.ComponentProps<'input'>)} />;
}

export default memo(Input);
