import { describe, expect, it } from 'vitest';
import buildRequestData from './buildRequestData';

describe('buildRequestData', () => {
  it('builds url without parameters', () => {
    const result = buildRequestData('https://api.example.com', '/users', {});

    expect(result).toEqual({
      url: 'https://api.example.com/users',
      headers: {},
    });
  });

  it('replaces path parameters', () => {
    const result = buildRequestData('https://api.example.com', '/users/{id}', {
      'path:id': '42',
    });

    expect(result.url).toBe('https://api.example.com/users/42');
    expect(result.headers).toEqual({});
  });

  it('adds query parameters', () => {
    const result = buildRequestData('https://api.example.com', '/users', {
      'query:name': 'John',
      'query:age': '25',
    });

    expect(result.url).toBe('https://api.example.com/users?name=John&age=25');
  });

  it('ignores empty query parameters', () => {
    const result = buildRequestData('https://api.example.com', '/users', {
      'query:name': '',
      'query:age': '25',
    });

    expect(result.url).toBe('https://api.example.com/users?age=25');
  });

  it('adds headers', () => {
    const result = buildRequestData('https://api.example.com', '/users', {
      'header:Authorization': 'Bearer token',
      'header:Accept': 'application/json',
    });

    expect(result.headers).toEqual({
      Authorization: 'Bearer token',
      Accept: 'application/json',
    });

    expect(result.url).toBe('https://api.example.com/users');
  });

  it('builds url with path, query and headers together', () => {
    const result = buildRequestData('https://api.example.com', '/users/{id}', {
      'path:id': '15',
      'query:sort': 'desc',
      'header:Authorization': 'Bearer token',
    });

    expect(result).toEqual({
      url: 'https://api.example.com/users/15?sort=desc',
      headers: {
        Authorization: 'Bearer token',
      },
    });
  });

  it('ignores unknown parameter locations', () => {
    const result = buildRequestData('https://api.example.com', '/users', {
      'cookie:token': '123',
    });

    expect(result).toEqual({
      url: 'https://api.example.com/users',
      headers: {},
    });
  });
});
