import { describe, expect, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import EndpointList from './EndpointList';
import type { Endpoint } from '@/types/endpoint';

vi.mock('../EndpointItem/EndpointItem', () => ({
  default: ({ endpoint }: { endpoint: Endpoint }) => <div>{endpoint.path}</div>,
}));

vi.mock(
  '@/components/SwaggerWorkspace/SwaggerViewer/Endpoint/EndpointDetails/EndpointDetails',
  () => ({
    default: ({ serverUrl }: { serverUrl: string }) => (
      <div>Details: {serverUrl}</div>
    ),
  }),
);

vi.mock('../../../../ui/accordion', () => ({
  Accordion: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),

  AccordionItem: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),

  AccordionContent: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),

  AccordionTrigger: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

function createEndpoint(path: string): Endpoint {
  return {
    path,
    method: 'get',
    operation: {},
  };
}

describe('EndpointList', () => {
  it('renders endpoints', () => {
    const endpoints = [createEndpoint('/users'), createEndpoint('/posts')];

    const { getByText } = render(
      <EndpointList endpoints={endpoints} serverUrl="http://localhost" />,
    );

    expect(getByText('/users')).toBeInTheDocument();
    expect(getByText('/posts')).toBeInTheDocument();
  });

  it('renders all endpoint items', () => {
    const endpoints = [
      createEndpoint('/users'),
      createEndpoint('/posts'),
      createEndpoint('/comments'),
    ];

    const { getByText } = render(
      <EndpointList endpoints={endpoints} serverUrl="http://localhost" />,
    );

    expect(getByText('/users')).toBeInTheDocument();
    expect(getByText('/posts')).toBeInTheDocument();
    expect(getByText('/comments')).toBeInTheDocument();
  });
});
