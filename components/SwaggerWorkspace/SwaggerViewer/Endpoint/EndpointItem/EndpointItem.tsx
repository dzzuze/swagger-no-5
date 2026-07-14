import type { Endpoint } from '@/types/endpoint';
import getMethodColor from '@/lib/getMethodColor';

export type EndpointItemProps = {
  endpoint: Endpoint;
};

export default function EndpointItem({ endpoint }: EndpointItemProps) {
  return (
    <div className="px-4 flex gap-4">
      <span
        className={`inline-block w-12 rounde-md p-1 text-sm uppercase border-l-2 ${getMethodColor(endpoint.method)}`}
      >
        {endpoint.method.toUpperCase()}
      </span>{' '}
      {endpoint.path}
    </div>
  );
}
