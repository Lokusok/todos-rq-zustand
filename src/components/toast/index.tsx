import style from './style.module.scss';

import React, { memo, useEffect, useState } from 'react';

import { BadgeX, CircleCheckBig, Info, X } from 'lucide-react';

import clsx from 'clsx';
import { TToastsTypes } from '@/store/toasts/types';

type TProps = {
  status?: TToastsTypes;
  title: string;
  descr?: string;
  timeout?: number;
  closeCb?: () => void;
  testId?: string;
};

const iconsMap: Record<TToastsTypes, React.ReactNode> = {
  success: <CircleCheckBig size={28} data-testid="toast-success-icon" />,
  error: <BadgeX size={28} data-testid="toast-error-icon" />,
  info: <Info size={28} data-testid="toast-info-icon" />,
};

function Toast({
  status = 'info',
  title,
  descr,
  timeout = 4000,
  closeCb,
  testId = 'toast',
}: TProps) {
  const [isHovered, setIsHovered] = useState(false);

  const statusClassName = style[status as keyof typeof style];

  useEffect(() => {
    if (isHovered || !closeCb) return;

    const timer = setTimeout(() => {
      closeCb();
    }, timeout);

    return () => clearTimeout(timer);
  }, [isHovered, timeout, closeCb]);

  return (
    <div
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      className={clsx(style.root, statusClassName)}
      data-testid={testId}
    >
      {Boolean(closeCb) && (
        <div className={style.closeBtnWrapper}>
          <button data-testid="toast-close-btn" onClick={closeCb} className={style.closeBtn}>
            <X size={24} />
          </button>
        </div>
      )}

      <div className={style.content}>
        <div className={style.iconCol}>{iconsMap[status]}</div>

        <div className={style.infoAbout}>
          <span className={style.title}>{title}</span>
          {Boolean(descr) && <span className={style.text}>{descr}</span>}
        </div>
      </div>
    </div>
  );
}

export default memo(Toast);
