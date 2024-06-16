import { render, screen } from '@testing-library/react';

import { expect, describe, test } from 'vitest';

import EmptyBanner from '.';
import { BrowserRouter } from 'react-router-dom';

describe('<EmptyBanner />', () => {
  test('Рендерит правильную ссылку', () => {
    render(
      <BrowserRouter>
        <EmptyBanner goToHref="/" />
      </BrowserRouter>,
    );

    expect(screen.getByRole('link')).toHaveAttribute('href', '/');
  });

  test('Рендерит дополнительную информацию', () => {
    render(
      <BrowserRouter>
        <EmptyBanner
          leftActions={<button>Left action</button>}
          rightActions={<button>Right action</button>}
          goToHref="/"
        ></EmptyBanner>
      </BrowserRouter>,
    );

    expect(screen.getByText(/left action/i)).toBeInTheDocument();
    expect(screen.getByText(/right action/i)).toBeInTheDocument();
  });
});
