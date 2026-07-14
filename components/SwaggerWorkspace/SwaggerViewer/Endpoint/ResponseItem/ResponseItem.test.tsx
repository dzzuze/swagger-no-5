import { describe, expect, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import ResponseItem from './ResponseItem';
import type { ResponseItemProps } from './ResponseItem';

vi.mock('@/lib/getStatusColor', () => ({
  getStatusColor: vi.fn(() => 'mock-color'),
}));

describe('ResponseItem', () => {
  it('renders status and description', () => {
    const response = {
      description: 'Successful response',
    };

    const { getByText } = render(
      <ResponseItem
        status="200"
        response={response as ResponseItemProps['response']}
      />,
    );

    expect(getByText('200')).toBeInTheDocument();
    expect(getByText('Successful response')).toBeInTheDocument();
  });

  it('applies status color class', () => {
    const response = {
      description: 'Successful response',
    };

    const { getByText } = render(
      <ResponseItem
        status="200"
        response={response as ResponseItemProps['response']}
      />,
    );

    expect(getByText('200')).toHaveClass('mock-color');
  });
});
