import { render, screen } from '@testing-library/react';

import { describe, expect, test } from 'vitest';
import Input from '.';

describe('<Input />', () => {
  test('Отображает обычный инпут', () => {
    render(<Input />);

    expect(screen.getByRole('textbox').tagName).equal('INPUT');
  });

  test('Передаём multiline и получаем textarea', () => {
    render(<Input multiline />);

    expect(screen.getByRole('textbox').tagName).equal('TEXTAREA');
  });
});
