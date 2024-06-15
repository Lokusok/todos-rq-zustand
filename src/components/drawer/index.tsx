import style from './style.module.scss';
import React, { memo, useRef } from 'react';

import { X } from 'lucide-react';
import useOnClickInside from '@/hooks/use-on-click-inside';

import DrawerField from './drawer-field';

type TProps = {
  children: React.ReactNode;
  title: string;
  onClose?: () => void;
};

function Drawer({ title, children, onClose }: TProps) {
  const backRef = useRef<HTMLDivElement>(null);

  useOnClickInside(backRef, onClose || (() => {}));

  return (
    <div className={style.drawerLayout}>
      <div className={style.drawerBack} ref={backRef}></div>

      <div className={style.drawerContent}>
        <div className={style.drawerCloseBtnWrapper}>
          {Boolean(onClose) && (
            <button onClick={onClose} className={style.drawerCloseBtn}>
              <X size={32} className={style.closeIcon} />
            </button>
          )}
        </div>

        <div className={style.drawerInner}>
          <div className={style.drawerHeader}>
            <span className={style.drawerTitle}>{title}</span>
          </div>

          <div className={style.drawerInside}>{children}</div>
        </div>
      </div>
    </div>
  );
}

export default {
  Root: memo(Drawer),
  Field: memo(DrawerField),
};
