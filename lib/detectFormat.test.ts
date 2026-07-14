import { describe, expect, it } from 'vitest';
import detectFormat from './detectFormat';

describe('detectFormat', () => {
  it('detects JSON object', () => {
    expect(detectFormat('{"name":"John"}')).toBe('json');
  });

  it('detects JSON array', () => {
    expect(detectFormat('[1,2,3]')).toBe('json');
  });

  it('ignores leading whitespace', () => {
    expect(detectFormat('   \n   {"name":"John"}')).toBe('json');
  });

  it('detects YAML document', () => {
    expect(detectFormat('openapi: 3.0.0')).toBe('yaml');
  });

  it('detects YAML with leading whitespace', () => {
    expect(detectFormat('\n\nopenapi: 3.0.0')).toBe('yaml');
  });

  it('returns YAML for empty string', () => {
    expect(detectFormat('')).toBe('yaml');
  });
});
