import style from './style.module.scss';

import React, { memo } from 'react';

type TProps = {
  checked: boolean;
  onChange: (value: boolean) => void;
};

function Toggler({ onChange, checked }: TProps) {
  const callbacks = {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.checked);
    },
  };

  return (
    <div className={style.togglerWrapper}>
      <input
        checked={checked}
        onChange={callbacks.onChange}
        type="checkbox"
        className={style.togglerNativeInput}
      />

      <div className={style.togglerInput}></div>
    </div>
  );
}

export default memo(Toggler);
