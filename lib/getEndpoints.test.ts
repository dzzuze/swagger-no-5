import { describe, expect, it } from 'vitest';
import getEndpoints from './getEndpoints';
import type { SwaggerSchema } from '@/types/swagger';

describe('getEndpoints', () => {
  it('returns empty array when schema has no paths', () => {
    const schema = {} as SwaggerSchema;

    expect(getEndpoints(schema)).toEqual([]);
  });

  it('returns single endpoint', () => {
    const schema: SwaggerSchema = {
      paths: {
        '/pets': {
          get: {
            responses: {},
          },
        },
      },
    } as SwaggerSchema;

    expect(getEndpoints(schema)).toEqual([
      {
        path: '/pets',
        method: 'get',
        operation: {
          responses: {},
        },
      },
    ]);
  });

  it('returns multiple endpoints', () => {
    const schema: SwaggerSchema = {
      paths: {
        '/pets': {
          get: {
            responses: {},
          },
          post: {
            responses: {},
          },
        },
        '/users': {
          delete: {
            responses: {},
          },
        },
      },
    } as SwaggerSchema;

    expect(getEndpoints(schema)).toEqual([
      {
        path: '/pets',
        method: 'get',
        operation: {
          responses: {},
        },
      },
      {
        path: '/pets',
        method: 'post',
        operation: {
          responses: {},
        },
      },
      {
        path: '/users',
        method: 'delete',
        operation: {
          responses: {},
        },
      },
    ]);
  });

  it('ignores non-http methods', () => {
    const schema: SwaggerSchema = {
      paths: {
        '/pets': {
          get: {
            responses: {},
          },
          parameters: [],
        },
      },
    } as SwaggerSchema;

    const endpoints = getEndpoints(schema);

    expect(endpoints).toHaveLength(1);

    expect(endpoints[0].method).toBe('get');
  });

  it('returns empty array when paths object is empty', () => {
    const schema: SwaggerSchema = {
      paths: {},
    } as SwaggerSchema;

    expect(getEndpoints(schema)).toEqual([]);
  });
});
