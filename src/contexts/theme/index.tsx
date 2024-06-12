import React, { createContext, memo, useContext, useEffect, useMemo } from 'react';

import { TThemeContext, TTheme } from './types';
import useLocalStorage from '@/hooks/use-local-storage';

const ThemeContext = createContext<TThemeContext>({} as TThemeContext);

export function useTheme() {
  const ctx = useContext(ThemeContext);

  if (!ctx) {
    throw new Error(
      'Компоненты, использующие ThemeContext должны быть обёрнуты в <ThemeProvider />'
    );
  }

  return ctx;
}

type TProps = {
  children: React.ReactNode;
};

function ThemeProvider({ children }: TProps) {
  const [theme, setTheme] = useLocalStorage<TTheme>(() => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }, 'theme');

  const ctxValue = useMemo(
    () => ({
      theme,
      setTheme,
    }),
    [theme, setTheme]
  );

  useEffect(() => {
    switch (theme) {
      case 'dark': {
        document.documentElement.style.setProperty('--text-color', '#fff');
        document.documentElement.style.setProperty('--bg-color', '#000');
        document.documentElement.style.setProperty('--accent-color-1', '#6370e5');
        break;
      }

      case 'light': {
        document.documentElement.style.setProperty('--text-color', '#000');
        document.documentElement.style.setProperty('--bg-color', '#fff');
        document.documentElement.style.setProperty('--accent-color-1', '#f9ffff');
        break;
      }
    }
  }, [theme]);

  return <ThemeContext.Provider value={ctxValue}>{children}</ThemeContext.Provider>;
}

export default memo(ThemeProvider);
