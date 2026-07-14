import { beforeEach, describe, expect, it, vi } from 'vitest';
import saveSchema from './saveSchema';
import { supabase } from '@/lib/supabase';

vi.mock('@/lib/supabase', () => ({
  supabase: {
    auth: {
      getUser: vi.fn(),
    },
    from: vi.fn(),
  },
}));

describe('saveSchema', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('throws when user is not authenticated', async () => {
    vi.mocked(supabase.auth.getUser).mockResolvedValue({
      data: {
        user: null,
      },
      error: null,
    } as never);

    await expect(saveSchema('schema')).rejects.toThrow(
      'User is not authenticated',
    );

    expect(supabase.from).not.toHaveBeenCalled();
  });

  it('saves schema successfully', async () => {
    vi.mocked(supabase.auth.getUser).mockResolvedValue({
      data: {
        user: {
          id: 'user-1',
        },
      },
      error: null,
    } as never);

    const upsert = vi.fn().mockResolvedValue({
      error: null,
    });

    vi.mocked(supabase.from).mockReturnValue({
      upsert,
    } as never);

    await saveSchema('openapi: 3.0.0');

    expect(supabase.from).toHaveBeenCalledWith('saved_schemas');

    expect(upsert).toHaveBeenCalledWith(
      {
        user_id: 'user-1',
        schema: 'openapi: 3.0.0',
      },
      {
        onConflict: 'user_id',
      },
    );
  });

  it('throws database error', async () => {
    vi.mocked(supabase.auth.getUser).mockResolvedValue({
      data: {
        user: {
          id: 'user-1',
        },
      },
      error: null,
    } as never);

    const dbError = new Error('Database failed');

    const upsert = vi.fn().mockResolvedValue({
      error: dbError,
    });

    vi.mocked(supabase.from).mockReturnValue({
      upsert,
    } as never);

    await expect(saveSchema('schema')).rejects.toThrow('Database failed');
  });
});
