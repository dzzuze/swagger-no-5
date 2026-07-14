import { describe, expect, it } from 'vitest';
import buildCurlCommand from './buildCurlCommand';

describe('buildCurlCommand', () => {
  it('builds GET request without body', () => {
    const result = buildCurlCommand({
      url: 'https://api.example.com/users',
      method: 'get',
      headers: {
        Accept: 'application/json',
      },
    });

    expect(result).toBe(
      [
        'curl -X GET',
        '"https://api.example.com/users"',
        '-H "Accept: application/json"',
      ].join(' \\\n'),
    );
  });

  it('builds POST request with body', () => {
    const result = buildCurlCommand({
      url: 'https://api.example.com/users',
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: '{"name":"John"}',
    });

    expect(result).toBe(
      [
        'curl -X POST',
        '"https://api.example.com/users"',
        '-H "Content-Type: application/json"',
        `-d '{"name":"John"}'`,
      ].join(' \\\n'),
    );
  });

  it('adds multiple headers', () => {
    const result = buildCurlCommand({
      url: 'https://example.com',
      method: 'put',
      headers: {
        Authorization: 'Bearer token',
        Accept: 'application/json',
      },
    });

    expect(result).toContain('-H "Authorization: Bearer token"');
    expect(result).toContain('-H "Accept: application/json"');
  });

  it('converts method to uppercase', () => {
    const result = buildCurlCommand({
      url: 'https://example.com',
      method: 'patch',
      headers: {},
    });

    expect(result).toContain('curl -X PATCH');
  });

  it('does not include body when body is undefined', () => {
    const result = buildCurlCommand({
      url: 'https://example.com',
      method: 'get',
      headers: {},
    });

    expect(result).not.toContain('-d');
  });

  it('does not include body when body is an empty string', () => {
    const result = buildCurlCommand({
      url: 'https://example.com',
      method: 'post',
      headers: {},
      body: '',
    });

    expect(result).not.toContain('-d');
  });
});
