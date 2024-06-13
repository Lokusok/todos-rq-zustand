import style from './style.module.scss';
import React, { memo, useEffect, useRef } from 'react';

type TProps = {
  children: React.ReactNode;
  additionalItem?: React.ReactNode;
};

function Header({ children, additionalItem }: TProps) {
  const childrenDivRef = useRef<HTMLDivElement>(null);
  const centeredDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!childrenDivRef.current || !centeredDivRef.current) return;

    requestAnimationFrame(() => {
      if (!childrenDivRef.current || !centeredDivRef.current) return;
      centeredDivRef.current.style.width =
        childrenDivRef.current.getBoundingClientRect().width +
        centeredDivRef.current.getBoundingClientRect().width / 10 +
        130 +
        'px';
    });
  }, []);

  return (
    <div className={style.root}>
      <div className={style.centered} ref={centeredDivRef}>
        <div className={style.additionalItem}>{additionalItem}</div>
      </div>
      <div ref={childrenDivRef}>{children}</div>
    </div>
  );
}

export default memo(Header);
