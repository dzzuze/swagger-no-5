import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import ValidationMessage from './ValidationMessage';

describe('ValidationMessage', () => {
  it('renders nothing when validation is null', () => {
    const { container } = render(<ValidationMessage validation={null} />);

    expect(container.firstChild).toBeNull();
  });

  it('renders validation title and description', () => {
    const validation = {
      title: 'Validation failed',
      description: 'Missing required field',
    };

    const { getByText } = render(<ValidationMessage validation={validation} />);

    expect(getByText('Validation failed')).toBeInTheDocument();
    expect(getByText('Missing required field')).toBeInTheDocument();
  });
});
