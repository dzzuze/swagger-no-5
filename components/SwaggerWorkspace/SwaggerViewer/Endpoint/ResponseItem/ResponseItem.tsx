import { getStatusColor } from '@/lib/getStatusColor';
import type { Response } from '@/types/endpoint';

export type ResponseItemProps = {
  status: string;
  response: Response;
};

export default function ResponseItem({ status, response }: ResponseItemProps) {
  return (
    <div key={status}>
      <strong className={getStatusColor(status)}>{status}</strong>
      <p>{response.description}</p>
    </div>
  );
}
