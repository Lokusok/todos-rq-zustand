import './animations.scss';

import style from './style.module.scss';
import { memo } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

import { Moon, Sun } from 'lucide-react';

import { useTheme } from '@/contexts/theme';

function ThemeToggler() {
  const { theme, setTheme } = useTheme();

  const callbacks = {
    toggleTheme: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
  };

  return (
    <button className={style.button} onClick={callbacks.toggleTheme}>
      <div className={style.inner}>
        <SwitchTransition mode={'out-in'}>
          <CSSTransition unmountOnExit key={theme} timeout={200} classNames="my-node">
            {theme === 'dark' ? <Moon size={30} /> : <Sun size={30} />}
          </CSSTransition>
        </SwitchTransition>
      </div>
    </button>
  );
}

export default memo(ThemeToggler);
