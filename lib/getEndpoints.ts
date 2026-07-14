import type { SwaggerSchema } from '@/types/swagger';
import type { Endpoint, HttpMethod, Operation } from '@/types/endpoint';
import { HTTP_METHODS } from '@/types/endpoint';

export default function getEndpoints(schema: SwaggerSchema): Endpoint[] {
  if (!schema.paths) return [];

  const endpointArr: Endpoint[] = [];

  for (const [path, operations] of Object.entries(schema.paths)) {
    for (const method in operations) {
      if (!HTTP_METHODS.includes(method as (typeof HTTP_METHODS)[number])) {
        continue;
      }

      endpointArr.push({
        path: path,
        method: method as HttpMethod,
        operation: operations[method] as Operation,
      });
    }
  }
  return endpointArr;
}
