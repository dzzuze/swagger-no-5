import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/react';
import ParameterList from './ParameterList';
import type { Parameter } from '@/types/endpoint';

vi.mock('./ParameterItem', () => ({
  default: ({
    param,
    value,
    onChange,
  }: {
    param: Parameter;
    value: string;
    onChange: (value: string) => void;
  }) => (
    <div>
      <span>{param.name}</span>

      <span>{value}</span>

      <button onClick={() => onChange('new-value')}>Change {param.name}</button>
    </div>
  ),
}));

function createParameter(overrides: Partial<Parameter> = {}): Parameter {
  return {
    name: 'id',
    in: 'path',
    description: 'Identifier',
    required: true,
    ...overrides,
  };
}

describe('ParameterList', () => {
  it('renders heading', () => {
    const { getByText } = render(
      <ParameterList
        parameterList={[]}
        parameterValues={{}}
        onParameterChange={vi.fn()}
      />,
    );

    expect(getByText('ParameterList:')).toBeInTheDocument();
  });

  it('renders all parameters', () => {
    const parameters = [
      createParameter(),
      createParameter({
        name: 'token',
        in: 'header',
      }),
    ];

    const { getByText } = render(
      <ParameterList
        parameterList={parameters}
        parameterValues={{}}
        onParameterChange={vi.fn()}
      />,
    );

    expect(getByText('id')).toBeInTheDocument();
    expect(getByText('token')).toBeInTheDocument();
  });

  it('passes values to ParameterItem', () => {
    const parameters = [createParameter()];

    const values = {
      'path:id': '123',
    };

    const { getByText } = render(
      <ParameterList
        parameterList={parameters}
        parameterValues={values}
        onParameterChange={vi.fn()}
      />,
    );

    expect(getByText('123')).toBeInTheDocument();
  });

  it('calls onParameterChange', () => {
    const onParameterChange = vi.fn();

    const parameters = [createParameter()];

    const { getByText } = render(
      <ParameterList
        parameterList={parameters}
        parameterValues={{}}
        onParameterChange={onParameterChange}
      />,
    );

    fireEvent.click(getByText('Change id'));

    expect(onParameterChange).toHaveBeenCalledWith('path:id', 'new-value');
  });
});
