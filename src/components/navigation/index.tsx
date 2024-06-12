import style from './style.module.scss';

import { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';

import clsx from 'clsx';

type TNavItem = {
  key: any;
  label: string;
  path: string;
};

type TProps = {
  navItems: TNavItem[];
};

function Navigation({ navItems }: TProps) {
  const location = useLocation();

  return (
    <nav>
      <ul className={style.navList}>
        {navItems.map((navItem) => (
          <li key={navItem.key} className={style.navItem}>
            <Link
              to={navItem.path}
              className={clsx(style.navLink, {
                [style.active]: location.pathname === navItem.path,
              })}
            >
              {navItem.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default memo(Navigation);
