import { describe, expect, it } from 'vitest';
import { getStatusColor } from './getStatusColor';

describe('getStatusColor', () => {
  it('returns green for 2xx', () => {
    expect(getStatusColor('200')).toBe('text-green-500');
    expect(getStatusColor('204')).toBe('text-green-500');
  });

  it('returns blue for 3xx', () => {
    expect(getStatusColor('301')).toBe('text-blue-500');
    expect(getStatusColor('304')).toBe('text-blue-500');
  });

  it('returns yellow for 4xx', () => {
    expect(getStatusColor('400')).toBe('text-yellow-500');
    expect(getStatusColor('404')).toBe('text-yellow-500');
  });

  it('returns red for 5xx', () => {
    expect(getStatusColor('500')).toBe('text-red-500');
    expect(getStatusColor('503')).toBe('text-red-500');
  });

  it('returns gray for unknown status', () => {
    expect(getStatusColor('100')).toBe('text-gray-500');
    expect(getStatusColor('abc')).toBe('text-gray-500');
    expect(getStatusColor('')).toBe('text-gray-500');
  });
});
