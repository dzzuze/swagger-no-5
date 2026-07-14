import { describe, expect, it } from 'vitest';
import validateRequestParameters from './validateRequestParameters';
import type { Parameter } from '@/types/endpoint';

function createParameter(overrides: Partial<Parameter> = {}): Parameter {
  return {
    name: 'id',
    in: 'path',
    description: 'Test parameter',
    required: true,
    ...overrides,
  };
}

describe('validateRequestParameters', () => {
  it('returns null when there are no parameters', () => {
    expect(validateRequestParameters([], {})).toBeNull();
  });

  it('returns null when all required parameters are provided', () => {
    const parameters = [createParameter()];

    const values = {
      'path:id': '123',
      'header:token': 'Bearer token',
    };

    expect(validateRequestParameters(parameters, values)).toBeNull();
  });

  it('returns error when required parameter is missing', () => {
    const parameters = [createParameter()];

    expect(validateRequestParameters(parameters, {})).toBe(
      'Required parameter "id" is missing',
    );
  });

  it('returns error when required parameter is empty', () => {
    const parameters = [createParameter()];

    const values = {
      'path:id': '   ',
    };

    expect(validateRequestParameters(parameters, values)).toBe(
      'Required parameter "id" is missing',
    );
  });

  it('ignores optional parameters', () => {
    const parameters = [
      createParameter({
        required: false,
      }),
    ];

    expect(validateRequestParameters(parameters, {})).toBeNull();
  });

  it('handles undefined parameters', () => {
    expect(validateRequestParameters(undefined as never, {})).toBeNull();
  });
});
