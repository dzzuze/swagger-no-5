import { describe, expect, it } from 'vitest';
import getValidationMessage from './getValidationMessage';

describe('getValidationMessage', () => {
  it('returns message for missing required property', () => {
    const error = new Error("must have required property 'openapi'");

    expect(getValidationMessage(error)).toEqual({
      title: 'The OpenAPI schema is incomplete',
      description: 'Some required fields are missing.',
    });
  });

  it('returns message for invalid object', () => {
    const error = new Error('must be object');

    expect(getValidationMessage(error)).toEqual({
      title: 'Incomplete endpoint',
      description:
        'Each HTTP method (GET, POST, etc.) must contain an object with its definition.',
    });
  });

  it('returns default validation message', () => {
    const error = new Error('Unexpected validation error');

    expect(getValidationMessage(error)).toEqual({
      title: 'Schema validation failed',
      description: 'Unexpected validation error',
    });
  });

  it('matches required property even inside a long error message', () => {
    const error = new Error("Error: must have required property 'paths'");

    expect(getValidationMessage(error).title).toBe(
      'The OpenAPI schema is incomplete',
    );
  });

  it('matches object error inside a long message', () => {
    const error = new Error('Schema error: must be object');

    expect(getValidationMessage(error).title).toBe('Incomplete endpoint');
  });
});
