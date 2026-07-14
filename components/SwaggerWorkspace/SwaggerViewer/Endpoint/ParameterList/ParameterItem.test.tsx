import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/react';
import ParameterItem from './ParameterItem';
import type { Parameter } from '@/types/endpoint';

function createParameter(overrides: Partial<Parameter> = {}): Parameter {
  return {
    name: 'id',
    in: 'path',
    description: 'User id',
    required: true,
    ...overrides,
  };
}

describe('ParameterItem', () => {
  it('renders parameter name, location and description', () => {
    const param = createParameter();

    const { getByText } = render(<ParameterItem param={param} />);

    expect(getByText('id')).toBeInTheDocument();
    expect(getByText('path')).toBeInTheDocument();
    expect(getByText('User id')).toBeInTheDocument();
  });

  it('renders required badge', () => {
    const param = createParameter();

    const { getByText } = render(<ParameterItem param={param} />);

    expect(getByText('required')).toBeInTheDocument();
  });

  it('does not render required badge for optional parameter', () => {
    const param = createParameter({
      required: false,
    });

    const { queryByText } = render(<ParameterItem param={param} />);

    expect(queryByText('required')).toBeNull();
  });

  it('renders input when onChange is provided', () => {
    const param = createParameter();

    const { getByRole } = render(
      <ParameterItem param={param} value="" onChange={vi.fn()} />,
    );

    expect(getByRole('textbox')).toBeInTheDocument();
  });

  it('calls onChange when typing', () => {
    const onChange = vi.fn();
    const param = createParameter();

    const { getByRole } = render(
      <ParameterItem param={param} value="" onChange={onChange} />,
    );

    fireEvent.change(getByRole('textbox'), {
      target: {
        value: '123',
      },
    });

    expect(onChange).toHaveBeenCalledWith('123');
  });

  it('does not render input without onChange', () => {
    const param = createParameter();

    const { queryByRole } = render(<ParameterItem param={param} />);

    expect(queryByRole('textbox')).toBeNull();
  });
});
