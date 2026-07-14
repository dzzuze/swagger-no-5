import { describe, expect, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import SwaggerViewer from './SwaggerViewer';

vi.mock('@/lib/getEndpoints', () => ({
  default: vi.fn(),
}));

vi.mock('./Endpoint/EndpointList/EndpointList', () => ({
  default: ({
    endpoints,
    serverUrl,
  }: {
    endpoints: unknown[];
    serverUrl: string;
  }) => (
    <div>
      EndpointList
      <div>{serverUrl}</div>
      <div>{endpoints.length}</div>
    </div>
  ),
}));

import getEndpoints from '@/lib/getEndpoints';

describe('SwaggerViewer', () => {
  it('renders message when schema is null', () => {
    const { getByText } = render(<SwaggerViewer schema={null} />);

    expect(getByText('No schema loaded.')).toBeInTheDocument();
  });

  it('renders "No endpoints"', () => {
    vi.mocked(getEndpoints).mockReturnValue([]);

    const schema = {
      paths: {},
      servers: [{ url: 'http://localhost' }],
    };

    const { getByText } = render(<SwaggerViewer schema={schema} />);

    expect(getByText('No endpoints')).toBeInTheDocument();
  });

  it('renders EndpointList', () => {
    vi.mocked(getEndpoints).mockReturnValue([
      {
        path: '/users',
        method: 'get',
        operation: {},
      },
    ]);

    const schema = {
      paths: {},
      servers: [{ url: 'http://localhost:3000' }],
    };

    const { getByText } = render(<SwaggerViewer schema={schema} />);

    expect(getByText('EndpointList')).toBeInTheDocument();
    expect(getByText('http://localhost:3000')).toBeInTheDocument();
  });

  it('uses empty server url when servers are missing', () => {
    vi.mocked(getEndpoints).mockReturnValue([
      {
        path: '/users',
        method: 'get',
        operation: {},
      },
    ]);

    const schema = {
      paths: {},
    };

    const { getByText } = render(<SwaggerViewer schema={schema} />);

    expect(getByText('EndpointList')).toBeInTheDocument();
  });
});
