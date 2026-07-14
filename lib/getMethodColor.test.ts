import { describe, expect, it } from 'vitest';
import getMethodColor from './getMethodColor';

describe('getMethodColor', () => {
  it('returns green classes for GET', () => {
    expect(getMethodColor('get')).toBe('border-green-500 text-green-500');
  });

  it('returns orange classes for POST', () => {
    expect(getMethodColor('post')).toBe('border-orange-500 text-orange-500');
  });

  it('returns blue classes for PUT', () => {
    expect(getMethodColor('put')).toBe('border-blue-500 text-blue-500');
  });

  it('returns red classes for DELETE', () => {
    expect(getMethodColor('delete')).toBe('border-red-500 text-red-500');
  });

  it('returns purple classes for PATCH', () => {
    expect(getMethodColor('patch')).toBe('border-purple-500 text-purple-500');
  });

  it('returns gray classes for OPTIONS', () => {
    expect(getMethodColor('options')).toBe('border-gray-500 text-gray-500');
  });

  it('returns slate classes for HEAD', () => {
    expect(getMethodColor('head')).toBe('border-slate-500 text-slate-500');
  });

  it('returns yellow classes for TRACE', () => {
    expect(getMethodColor('trace')).toBe('border-yellow-500 text-yellow-500');
  });
});
