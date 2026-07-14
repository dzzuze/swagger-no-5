import type { Responses } from '@/types/endpoint';
import ResponseItem from '../ResponseItem/ResponseItem';

export type OperationResponsesProps = {
  operationResponses: Responses;
};

export default function OperationResponses({
  operationResponses,
}: OperationResponsesProps) {
  return (
    <section className="px-4 py-2 fles flex-col gap-4">
      <h3 className="font-semibold">Responses:</h3>
      {Object.entries(operationResponses ?? {}).map(([status, response]) => (
        <ResponseItem key={status} status={status} response={response} />
      ))}
    </section>
  );
}
