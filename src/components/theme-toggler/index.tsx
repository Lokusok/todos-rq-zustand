import './animations.scss';

import style from './style.module.scss';
import { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
        <AnimatePresence initial={false} mode={'wait'}>
          {theme === 'dark' ? (
            <motion.div
              key="moonIcon"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
            >
              <Moon size={30} />
            </motion.div>
          ) : (
            <motion.div
              key="sunIcon"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
            >
              <Sun size={30} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </button>
  );
}

export default memo(ThemeToggler);
