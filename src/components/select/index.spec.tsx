import style from './style.module.scss';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { describe, expect, test, vi } from 'vitest';
import Select, { TOption } from '.';

describe('<Select />', () => {
  test('При нажатии открывает / закрывает выпадашку', async () => {
    const options: TOption[] = [
      {
        label: 'Test label 1',
        value: 'Test value 1',
      },
      {
        label: 'Test label 2',
        value: 'Test value 2',
      },
    ];
    const mockFn = vi.fn();

    render(<Select options={options} value="Test value 1" onChange={mockFn} />);

    const headerBtn = screen.getByTestId('dropdown-header-btn');
    const dropdownList = screen.getByTestId('dropdown-list');

    expect(dropdownList).not.toHaveClass(style.selectDropdownActive);
    await userEvent.click(headerBtn);

    expect(dropdownList).toHaveClass(style.selectDropdownActive);

    await userEvent.click(headerBtn);
    expect(dropdownList).not.toHaveClass(style.selectDropdownActive);
  });

  test('Позволяет выбрать опцию', async () => {
    const options: TOption[] = [
      {
        label: 'Test label 1',
        value: 'Test value 1',
      },
      {
        label: 'Test label 2',
        value: 'Test value 2',
      },
    ];
    const mockFn = vi.fn();

    render(<Select options={options} value="Test value 1" onChange={mockFn} />);

    const headerBtn = screen.getByTestId('dropdown-header-btn');

    await userEvent.click(headerBtn);
    await userEvent.click(screen.getByTestId(`dropdown-item-0`));

    expect(mockFn).toHaveBeenCalledOnce();
  });
});
