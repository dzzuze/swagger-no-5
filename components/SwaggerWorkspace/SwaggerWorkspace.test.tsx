import { describe, expect, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import SwaggerWorkspace from './SwaggerWorkspace';

vi.mock('@/components/SwaggerWorkspace/SwaggerEditor/SwaggerEditor', () => ({
  default: ({
    schema,
  }: {
    schema: unknown;
    onSchemaChange: (value: unknown) => void;
  }) => (
    <div>
      Editor
      <div>{schema === null ? 'null' : 'schema'}</div>
    </div>
  ),
}));

vi.mock('@/components/SwaggerWorkspace/SwaggerViewer/SwaggerViewer', () => ({
  default: ({ schema }: { schema: unknown }) => (
    <div>
      Viewer
      <div>{schema === null ? 'null' : 'schema'}</div>
    </div>
  ),
}));

describe('SwaggerWorkspace', () => {
  it('renders editor and viewer', () => {
    const { getByText } = render(<SwaggerWorkspace />);

    expect(getByText('Editor')).toBeInTheDocument();
    expect(getByText('Viewer')).toBeInTheDocument();
  });

  it('passes initial null schema', () => {
    const { getAllByText } = render(<SwaggerWorkspace />);

    expect(getAllByText('null')).toHaveLength(2);
  });
});
