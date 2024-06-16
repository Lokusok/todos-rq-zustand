import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { describe, expect, test, vi } from 'vitest';
import Drawer from '.';

describe('<Drawer />', () => {
  test('Закрывается при нажатии на крестик', async () => {
    const closeCb = vi.fn();
    render(
      <Drawer.Root title="Test Drawer" onClose={closeCb} testId="drawer">
        <Drawer.Field testId="drawer-field-1">Field one</Drawer.Field>
      </Drawer.Root>,
    );

    expect(screen.getByTestId('drawer')).toBeInTheDocument();
    expect(screen.getByTestId('drawer-field-1')).toBeInTheDocument();

    await userEvent.click(screen.getByTestId('drawer-close-btn'));
    expect(closeCb).toHaveBeenCalled();

    // For animation
    setTimeout(() => {
      expect(screen.queryByTestId('drawer')).toBeNull();
    }, 500);
  });

  test('Закрывается при нажатии на задник', () => {
    const closeCb = vi.fn();
    render(
      <Drawer.Root title="Test Drawer" onClose={closeCb} testId="drawer">
        <Drawer.Field testId="drawer-field-1">Field one</Drawer.Field>
      </Drawer.Root>,
    );

    expect(screen.getByTestId('drawer')).toBeInTheDocument();
    expect(screen.getByTestId('drawer-field-1')).toBeInTheDocument();

    userEvent.click(screen.getByTestId('drawer-back'));

    // For animation
    setTimeout(() => {
      expect(screen.queryByTestId('drawer')).toBeNull();
    }, 500);
  });
});
