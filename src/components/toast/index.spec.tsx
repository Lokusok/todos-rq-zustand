import { screen, render } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';

import Toast from '.';
import userEvent from '@testing-library/user-event';

describe('<Toast />', () => {
  test('Для ошибки рендерится нужная иконка иконка', () => {
    render(
      <>
        <Toast testId="toast-error-1" status="error" title="Error" />
        <Toast testId="toast-success-1" status="success" title="Success" />
        <Toast testId="toast-info-1" status="info" title="Info" />
      </>,
    );

    expect(screen.getByTestId('toast-error-1')).toBeInTheDocument();
    expect(screen.getByTestId('toast-error-icon')).toBeInTheDocument();

    expect(screen.getByTestId('toast-success-1')).toBeInTheDocument();
    expect(screen.getByTestId('toast-success-icon')).toBeInTheDocument();

    expect(screen.getByTestId('toast-info-1')).toBeInTheDocument();
    expect(screen.getByTestId('toast-info-icon')).toBeInTheDocument();
  });

  test('Закрывается по нажатию на крестик', async () => {
    const closeCb = vi.fn();
    render(<Toast testId="toast-info" status="info" title="Info" closeCb={closeCb} />);

    screen.getByTestId('toast-info');

    await userEvent.click(screen.getByTestId('toast-close-btn'));

    // Ждём пока пройдёт анимация
    setTimeout(() => {
      const toastNoExist = screen.queryByTestId('toast-info');

      expect(closeCb).toHaveBeenCalledOnce();
      expect(toastNoExist).not.toBeInTheDocument();
    }, 500);
  });
});
