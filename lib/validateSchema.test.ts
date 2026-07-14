import { describe, expect, it, vi, beforeEach } from 'vitest';
import SwaggerParser from '@apidevtools/swagger-parser';
import validateSchema from './validateSchema';

vi.mock('@apidevtools/swagger-parser', () => ({
  default: {
    validate: vi.fn(),
  },
}));

describe('validateSchema', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls SwaggerParser.validate with schema', async () => {
    const schema = {
      openapi: '3.0.0',
      info: {
        title: 'Test API',
        version: '1.0.0',
      },
      paths: {},
    };

    vi.mocked(SwaggerParser.validate).mockResolvedValue(schema);

    await validateSchema(schema);

    expect(SwaggerParser.validate).toHaveBeenCalledTimes(1);
    expect(SwaggerParser.validate).toHaveBeenCalledWith(schema);
  });

  it('propagates parser errors', async () => {
    const schema = {
      openapi: '3.0.0',
      info: {
        title: 'Test API',
        version: '1.0.0',
      },
      paths: {},
    };

    const error = new Error('Invalid schema');

    vi.mocked(SwaggerParser.validate).mockRejectedValue(error);

    await expect(validateSchema(schema)).rejects.toThrow('Invalid schema');
  });
});
