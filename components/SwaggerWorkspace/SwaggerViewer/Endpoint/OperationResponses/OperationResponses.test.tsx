import { describe, expect, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import OperationResponses from './OperationResponses';

vi.mock('../ResponseItem/ResponseItem', () => ({
  default: ({ status }: { status: string }) => <div>{status}</div>,
}));

describe('OperationResponses', () => {
  it('renders section title', () => {
    const { getByText } = render(
      <OperationResponses operationResponses={{}} />,
    );

    expect(getByText('Responses:')).toBeInTheDocument();
  });

  it('renders response items', () => {
    const responses = {
      '200': {
        description: 'Success',
      },
      '404': {
        description: 'Not found',
      },
    };

    const { getByText } = render(
      <OperationResponses operationResponses={responses} />,
    );

    expect(getByText('200')).toBeInTheDocument();
    expect(getByText('404')).toBeInTheDocument();
  });

  it('renders nothing when responses are empty', () => {
    const { queryByText } = render(
      <OperationResponses operationResponses={{}} />,
    );

    expect(queryByText('200')).toBeNull();
  });
});
