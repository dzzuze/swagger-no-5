import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/react';
import RequestBody from './RequestBody';

describe('RequestBody', () => {
  const requestBody = {
    description: 'User payload',
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
        },
        example: {
          name: 'John',
        },
      },
    },
  };

  it('renders description and required flag', () => {
    const { getByText } = render(<RequestBody requestBody={requestBody} />);

    expect(getByText('Request Body:')).toBeInTheDocument();
    expect(getByText('User payload')).toBeInTheDocument();
    expect(getByText('yes')).toBeInTheDocument();
  });

  it('renders content type', () => {
    const { container } = render(<RequestBody requestBody={requestBody} />);

    expect(container).toHaveTextContent('application/json');
  });

  it('renders schema', () => {
    const { container } = render(<RequestBody requestBody={requestBody} />);

    expect(container).toHaveTextContent('"type"');
    expect(container).toHaveTextContent('"object"');
  });

  it('calls onBodyChange', () => {
    const onBodyChange = vi.fn();

    const { getByRole } = render(
      <RequestBody
        requestBody={requestBody}
        bodyValue="{}"
        onBodyChange={onBodyChange}
      />,
    );

    fireEvent.change(getByRole('textbox'), {
      target: {
        value: '{"id":1}',
      },
    });

    expect(onBodyChange).toHaveBeenCalledWith('{"id":1}');
  });
});
