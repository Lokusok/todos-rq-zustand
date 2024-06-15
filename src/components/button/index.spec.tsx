import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from '.';
import { describe, expect, test, vi } from 'vitest';

describe('<Button />', () => {
  test('Button clickable and visible', async () => {
    const onClick = vi.fn(() => {});
    render(<Button onClick={onClick}>Click</Button>);

    await userEvent.click(screen.getByRole('button'));
    await userEvent.click(screen.getByRole('button'));

    expect(screen.getByRole('button')).toHaveTextContent('Click');
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  test('Button disabled when expired status get', async () => {
    render(<Button status="expired">Click</Button>);

    expect(screen.getByRole('button')).toBeDisabled();
  });
});
