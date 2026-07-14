import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import OperationDescription from './OperationDescription';

describe('OperationDescription', () => {
  it('renders title', () => {
    const { getByText } = render(
      <OperationDescription description="Returns user information" />,
    );

    expect(getByText('Description:')).toBeInTheDocument();
  });

  it('renders description text', () => {
    const description = 'Returns user information';

    const { getByText } = render(
      <OperationDescription description={description} />,
    );

    expect(getByText(description)).toBeInTheDocument();
  });
});
