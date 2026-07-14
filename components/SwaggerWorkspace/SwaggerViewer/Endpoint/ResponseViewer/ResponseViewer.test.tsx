import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import ResponseViewer from './ResponeseViewer';

describe('ResponseViewer', () => {
  it('renders nothing when response is null', () => {
    const { container } = render(<ResponseViewer response={null} />);

    expect(container.firstChild).toBeNull();
  });

  it('renders successful response', () => {
    const response = {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
      body: '{"name":"John"}',
    };

    const { getByText, container } = render(
      <ResponseViewer response={response} />,
    );

    expect(getByText('Response')).toBeInTheDocument();
    expect(getByText('200')).toHaveClass('text-green-600');
    expect(container.textContent).toContain('"name"');
    expect(container.textContent).toContain('"John"');
  });

  it('renders error response', () => {
    const response = {
      status: 404,
      headers: {},
      body: 'Not found',
    };

    const { getByText } = render(<ResponseViewer response={response} />);

    expect(getByText('404')).toHaveClass('text-red-600');
    expect(getByText('Not found')).toBeInTheDocument();
  });

  it('renders plain text body', () => {
    const response = {
      status: 200,
      headers: {},
      body: 'Hello world',
    };

    const { getByText } = render(<ResponseViewer response={response} />);

    expect(getByText('Hello world')).toBeInTheDocument();
  });

  it('pretty prints json body', () => {
    const response = {
      status: 200,
      headers: {},
      body: '{"id":1}',
    };

    const { container } = render(<ResponseViewer response={response} />);

    expect(container.textContent).toContain('"id"');
    expect(container.textContent).toContain('1');
  });
});
