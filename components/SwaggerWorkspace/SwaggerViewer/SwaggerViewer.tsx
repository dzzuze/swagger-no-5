import type { SwaggerSchema } from '@/types/swagger';
import type { Endpoint } from '@/types/endpoint';
import getEndpoints from '@/lib/getEndpoints';
import EndpointList from './Endpoint/EndpointList/EndpointList';

export type SwaggerViewerProps = {
  schema: SwaggerSchema | null;
};

export default function SwaggerViewer({ schema }: SwaggerViewerProps) {
  if (!schema) {
    return (
      <div className="w-lg h-28 p-4">
        <p>No schema loaded.</p>
      </div>
    );
  }

  const endpoints: Endpoint[] = getEndpoints(schema);

  return (
    <div className="flex-1 lg:flex-1/2 lg:max-w-1/2 p-2 pt-12">
      {endpoints.length === 0 ? (
        <p>No endpoints</p>
      ) : (
        <EndpointList
          endpoints={endpoints}
          serverUrl={schema.servers?.[0]?.url ?? ''}
        />
      )}
    </div>
  );
}
