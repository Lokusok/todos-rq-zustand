import style from './style.module.scss';
import React, { memo, useRef } from 'react';

import { X } from 'lucide-react';
import useOnClickOutside from '@/hooks/use-on-clice-outside';

import DrawerField from './drawer-field';

type TProps = {
  children: React.ReactNode;
  title: string;
  onClose?: () => void;
};

function Drawer({ title, children, onClose }: TProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(contentRef, onClose || (() => {}));

  return (
    <div className={style.drawerLayout}>
      <div className={style.drawerContent} ref={contentRef}>
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
