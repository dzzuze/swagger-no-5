import { describe, expect, it, vi, beforeEach } from 'vitest';
import loadSchema from './loadSchema';
import { supabase } from '@/lib/supabase';

vi.mock('@/lib/supabase', () => ({
  supabase: {
    auth: {
      getUser: vi.fn(),
    },
    from: vi.fn(),
  },
}));

describe('loadSchema', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns null when user is not authenticated', async () => {
    vi.mocked(supabase.auth.getUser).mockResolvedValue({
      data: {
        user: null,
      },
      error: null,
    } as unknown as Awaited<ReturnType<typeof supabase.auth.getUser>>);

    const result = await loadSchema();

    expect(result).toBeNull();
    expect(supabase.from).not.toHaveBeenCalled();
  });

  it('returns schema from database', async () => {
    vi.mocked(supabase.auth.getUser).mockResolvedValue({
      data: {
        user: {
          id: 'user-1',
        },
      },
      error: null,
    } as Awaited<ReturnType<typeof supabase.auth.getUser>>);

    const single = vi.fn().mockResolvedValue({
      data: {
        schema: 'openapi: 3.0.0',
      },
      error: null,
    });

    const eq = vi.fn().mockReturnValue({
      single,
    });

    const select = vi.fn().mockReturnValue({
      eq,
    });

    vi.mocked(supabase.from).mockReturnValue({
      select,
    } as unknown as ReturnType<typeof supabase.from>);

    const result = await loadSchema();

    expect(result).toBe('openapi: 3.0.0');

    expect(supabase.from).toHaveBeenCalledWith('saved_schemas');
    expect(select).toHaveBeenCalledWith('schema');
    expect(eq).toHaveBeenCalledWith('user_id', 'user-1');
    expect(single).toHaveBeenCalled();
  });

  it('returns null when database returns error', async () => {
    vi.mocked(supabase.auth.getUser).mockResolvedValue({
      data: {
        user: {
          id: 'user-1',
        },
      },
      error: null,
    } as Awaited<ReturnType<typeof supabase.auth.getUser>>);

    const single = vi.fn().mockResolvedValue({
      data: null,
      error: new Error('Database error'),
    });

    const eq = vi.fn().mockReturnValue({
      single,
    });

    const select = vi.fn().mockReturnValue({
      eq,
    });

    vi.mocked(supabase.from).mockReturnValue({
      select,
    } as unknown as ReturnType<typeof supabase.from>);

    const result = await loadSchema();

    expect(result).toBeNull();
  });
});
