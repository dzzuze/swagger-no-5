import { describe, expect, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import EndpointDetails from './EndpointDetails';
import type { Endpoint } from '@/types/endpoint';

vi.mock('../OperationSummary/OperationSummary', () => ({
  default: ({ summary }: { summary: string }) => <div>Summary: {summary}</div>,
}));

vi.mock('../OperationDescription/OperationDescription', () => ({
  default: ({ description }: { description: string }) => (
    <div>Description: {description}</div>
  ),
}));

vi.mock('../OperationResponses/OperationResponses', () => ({
  default: () => <div>Responses</div>,
}));

vi.mock('../TryItOut/TryItOut', () => ({
  default: () => <div>TryItOut</div>,
}));

function createEndpoint(): Endpoint {
  return {
    path: '/users',
    method: 'get',
    operation: {
      summary: 'Get users',
      description: 'Returns all users',
      responses: {
        '200': {
          description: 'OK',
        },
      },
    },
  };
}

describe('EndpointDetails', () => {
  it('renders all sections', () => {
    const endpoint = createEndpoint();

    const { getByText } = render(
      <EndpointDetails endpoint={endpoint} serverUrl="http://localhost" />,
    );

    expect(getByText('Summary: Get users')).toBeInTheDocument();
    expect(getByText('Description: Returns all users')).toBeInTheDocument();
    expect(getByText('Responses')).toBeInTheDocument();
    expect(getByText('TryItOut')).toBeInTheDocument();
  });

  it('does not render summary when it is missing', () => {
    const endpoint = createEndpoint();
    delete endpoint.operation.summary;

    const { queryByText } = render(
      <EndpointDetails endpoint={endpoint} serverUrl="http://localhost" />,
    );

    expect(queryByText(/Summary:/)).toBeNull();
  });

  it('does not render description when it is missing', () => {
    const endpoint = createEndpoint();
    delete endpoint.operation.description;

    const { queryByText } = render(
      <EndpointDetails endpoint={endpoint} serverUrl="http://localhost" />,
    );

    expect(queryByText(/Description:/)).toBeNull();
  });

  it('does not render responses when they are missing', () => {
    const endpoint = createEndpoint();
    delete endpoint.operation.responses;

    const { queryByText } = render(
      <EndpointDetails endpoint={endpoint} serverUrl="http://localhost" />,
    );

    expect(queryByText('Responses')).toBeNull();
    expect(queryByText('TryItOut')).toBeInTheDocument();
  });
});
