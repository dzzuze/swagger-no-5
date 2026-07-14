import { describe, expect, it } from 'vitest';
import parseSchema from './parseSchema';

describe('parseSchema', () => {
  it('parses YAML', () => {
    const yaml = `
openapi: 3.0.0
info:
  title: Test API
  version: 1.0.0
`;

    const result = parseSchema(yaml, 'yaml');

    expect(result).toEqual({
      openapi: '3.0.0',
      info: {
        title: 'Test API',
        version: '1.0.0',
      },
    });
  });

  it('parses JSON', () => {
    const json = JSON.stringify({
      openapi: '3.0.0',
      info: {
        title: 'Test API',
        version: '1.0.0',
      },
    });

    const result = parseSchema(json, 'json');

    expect(result).toEqual({
      openapi: '3.0.0',
      info: {
        title: 'Test API',
        version: '1.0.0',
      },
    });
  });

  it('throws on invalid JSON', () => {
    expect(() => parseSchema('{', 'json')).toThrow();
  });
});
