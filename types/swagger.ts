export type Format = 'json' | 'yaml';

export interface PathItem {
  [method: string]: unknown;
}

export interface Server {
  url: string;
  description?: string;
}

export interface SwaggerSchema {
  openapi?: string;

  servers?: Server[];

  info?: {
    title?: string;
    version?: string;
  };

  paths?: Record<string, PathItem>;
}
