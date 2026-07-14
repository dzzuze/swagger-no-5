import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import OperationSummary from './OperationSummary';

describe('OperationSummary', () => {
  it('renders summary title and text', () => {
    const { getByText } = render(
      <OperationSummary summary="Returns user information" />,
    );

    expect(getByText('Summary:')).toBeInTheDocument();
    expect(getByText('Returns user information')).toBeInTheDocument();
  });
});
