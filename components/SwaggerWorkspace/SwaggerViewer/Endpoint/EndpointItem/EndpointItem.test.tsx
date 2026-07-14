import { describe, expect, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import EndpointItem from './EndpointItem';

vi.mock('@/lib/getMethodColor', () => ({
  default: vi.fn(() => 'mock-color'),
}));

describe('EndpointItem', () => {
  const endpoint = {
    method: 'get' as const,
    path: '/users/{id}',
    operation: {
      summary: 'Get user',
    },
  };

  it('renders endpoint method', () => {
    const { getByText } = render(<EndpointItem endpoint={endpoint} />);

    expect(getByText('GET')).toBeInTheDocument();
  });

  it('renders endpoint path', () => {
    const { getByText } = render(<EndpointItem endpoint={endpoint} />);

    expect(getByText('/users/{id}')).toBeInTheDocument();
  });

  it('applies method color class', () => {
    const { getByText } = render(<EndpointItem endpoint={endpoint} />);

    expect(getByText('GET')).toHaveClass('mock-color');
  });
});
