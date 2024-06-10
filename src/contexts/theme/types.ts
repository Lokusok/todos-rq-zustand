import React from 'react';

export type TThemeContext = {
  theme: TTheme;
  setTheme: React.Dispatch<TTheme>;
};

export type TTheme = 'dark' | 'light';
