import style from './style.module.scss';
import React, { memo, useState } from 'react';

type TProps = {
  title: string;
  children: React.ReactNode;
};

function Tooltip({ children, title }: TProps) {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const callbacks = {
    showTooltip: () => setIsTooltipVisible(true),
    hideTooltip: () => setIsTooltipVisible(false),
  };

  return (
    <div className={style.root}>
      <div onPointerEnter={callbacks.showTooltip} onPointerLeave={callbacks.hideTooltip}>
        {children}
      </div>
      {isTooltipVisible && <div className={style.tooltip}>{title}</div>}
    </div>
  );
}

export default memo(Tooltip);
