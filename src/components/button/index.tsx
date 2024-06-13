import style from './style.module.scss';

import React, { memo } from 'react';

import clsx from 'clsx';

type TProps = {
  children: React.ReactNode;
  status?: 'active' | 'success' | 'expired' | 'danger';
} & React.ComponentProps<'button'>;

function Button({ children, status = 'active', ...props }: TProps) {
  return (
    <button
      className={clsx(style.button, {
        [style.active]: status === 'active',
        [style.success]: status === 'success',
        [style.expired]: status === 'expired',
        [style.danger]: status === 'danger',
      })}
      disabled={status === 'expired'}
      {...props}
    >
      {children}
    </button>
  );
}

export default memo(Button);
