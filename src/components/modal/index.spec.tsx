import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { describe, expect, test, vi } from 'vitest';

import Modal from '.';

describe('<Modal />', () => {
  test('Открывается и закрывается', async () => {
    const closeCb = vi.fn();
    render(
      <Modal testId="modal-test" title="Test title" onClose={closeCb}>
        Test children
      </Modal>,
    );

    expect(screen.getByTestId('modal-test')).toBeInTheDocument();
    await userEvent.click(screen.getByTestId('modal-test-close-btn'));

    setTimeout(() => {
      expect(screen.queryByTestId('modal-test')).toBeNull();
    }, 500);

    expect(closeCb).toHaveBeenCalled();
  });
});
