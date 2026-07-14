import { describe, expect, it } from 'vitest';
import isValidJson from './isValidJson';

describe('isValidJson', () => {
  it('returns true for valid JSON object', () => {
    expect(isValidJson('{"name":"John"}')).toBe(true);
  });

  it('returns true for valid JSON array', () => {
    expect(isValidJson('[1,2,3]')).toBe(true);
  });

  it('returns true for valid JSON primitive', () => {
    expect(isValidJson('"hello"')).toBe(true);
    expect(isValidJson('123')).toBe(true);
    expect(isValidJson('true')).toBe(true);
    expect(isValidJson('null')).toBe(true);
  });

  it('returns false for invalid JSON', () => {
    expect(isValidJson('{name:"John"}')).toBe(false);
  });

  it('returns false for empty string', () => {
    expect(isValidJson('')).toBe(false);
  });

  it('returns false for random text', () => {
    expect(isValidJson('Hello World')).toBe(false);
  });
});
