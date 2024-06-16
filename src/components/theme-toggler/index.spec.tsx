import { render, screen } from '@testing-library/react';
import { describe, test, vi, expect } from 'vitest';
import ThemeToggler from '.';

import ThemeProvider from '@/contexts/theme';
import userEvent from '@testing-library/user-event';

describe('<ThemeToggler />', () => {
  test('Должен переключать тему', async () => {
    const jsonFormatThemeFromLS = '"light"';
    const parsedThemeFromLS = 'light';
    const spyLSGetItem = vi
      .spyOn(localStorage, 'getItem')
      .mockImplementation(() => jsonFormatThemeFromLS);

    render(
      <ThemeProvider>
        <ThemeToggler />
      </ThemeProvider>,
    );

    const spyLSSetItem = vi.spyOn(localStorage, 'setItem');

    // Удостоверимся, что значение текущей темы берётся из localStorage
    expect(spyLSGetItem).toHaveBeenCalled();

    const themeToggler = screen.getByTestId('theme-toggler');

    expect(themeToggler).toHaveAttribute('data-theme', parsedThemeFromLS);
    await userEvent.click(themeToggler);

    expect(spyLSSetItem).toHaveBeenCalled();
  });
});
