import type { Endpoint } from '@/types/endpoint';
import OperationSummary from '../OperationSummary/OperationSummary';
import OperationDescription from '../OperationDescription/OperationDescription';
import OperationResponses from '../OperationResponses/OperationResponses';
import TryItOut from '../TryItOut/TryItOut';

export type EndpointDetailsProps = {
  endpoint: Endpoint;
  serverUrl: string;
};

export default function EndpointDetails({
  endpoint,
  serverUrl,
}: EndpointDetailsProps) {
  const { operation } = endpoint;

  return (
    <div>
      {operation.summary && <OperationSummary summary={operation.summary} />}

      {operation.description && (
        <OperationDescription description={operation.description} />
      )}

      {operation.responses && (
        <OperationResponses operationResponses={operation.responses} />
      )}

      <TryItOut endpoint={endpoint} serverUrl={serverUrl} />
    </div>
  );
}
