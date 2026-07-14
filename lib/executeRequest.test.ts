import { describe, expect, it, vi, beforeEach } from 'vitest';
import executeRequest from './executeRequest';

describe('executeRequest', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('executes request successfully without body', async () => {
    const response = {
      ok: true,
      text: vi.fn().mockResolvedValue(
        JSON.stringify({
          status: 200,
          headers: {},
          body: 'OK',
        }),
      ),
    };

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(response));

    const result = await executeRequest({
      url: 'https://example.com',
      method: 'get',
      headers: {},
    });

    expect(fetch).toHaveBeenCalledOnce();

    expect(result).toEqual({
      status: 200,
      headers: {},
      body: 'OK',
    });
  });

  it('adds Content-Type header when body exists', async () => {
    const response = {
      ok: true,
      text: vi.fn().mockResolvedValue(
        JSON.stringify({
          status: 201,
          headers: {},
          body: 'Created',
        }),
      ),
    };

    const fetchMock = vi.fn().mockResolvedValue(response);

    vi.stubGlobal('fetch', fetchMock);

    await executeRequest({
      url: 'https://example.com',
      method: 'post',
      headers: {},
      body: '{"name":"John"}',
    });

    expect(fetchMock).toHaveBeenCalledWith(
      '/api/proxy',
      expect.objectContaining({
        method: 'POST',
        body: expect.stringContaining('"Content-Type":"application/json"'),
      }),
    );
  });

  it('converts method to uppercase', async () => {
    const response = {
      ok: true,
      text: vi.fn().mockResolvedValue(
        JSON.stringify({
          status: 200,
          headers: {},
          body: '',
        }),
      ),
    };

    const fetchMock = vi.fn().mockResolvedValue(response);

    vi.stubGlobal('fetch', fetchMock);

    await executeRequest({
      url: 'https://example.com',
      method: 'patch',
      headers: {},
    });

    expect(fetchMock).toHaveBeenCalledWith(
      '/api/proxy',
      expect.objectContaining({
        body: expect.stringContaining('"method":"PATCH"'),
      }),
    );
  });

  it('throws server error message', async () => {
    const response = {
      ok: false,
      text: vi.fn().mockResolvedValue(
        JSON.stringify({
          error: 'Server error',
        }),
      ),
    };

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(response));

    await expect(
      executeRequest({
        url: 'https://example.com',
        method: 'get',
        headers: {},
      }),
    ).rejects.toThrow('Server error');
  });

  it('throws default error message', async () => {
    const response = {
      ok: false,
      text: vi.fn().mockResolvedValue('{}'),
    };

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(response));

    await expect(
      executeRequest({
        url: 'https://example.com',
        method: 'get',
        headers: {},
      }),
    ).rejects.toThrow('Request failed');
  });
});
