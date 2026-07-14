import type { ProxyResponse } from '@/types/proxy';

export type ResponseViewerProps = {
  response: ProxyResponse | null;
};

export default function ResponseViewer({ response }: ResponseViewerProps) {
  if (!response) return null;

  const isError = response.status === 0 || response.status >= 400;

  const formattedBody = (() => {
    try {
      return JSON.stringify(JSON.parse(response.body), null, 2);
    } catch {
      return response.body;
    }
  })();

  const statusColor =
    response.status >= 200 && response.status < 300
      ? 'text-green-600'
      : response.status >= 400
        ? 'text-red-600'
        : 'text-yellow-600';

  return (
    <section className="mt-6 mx-4 mb-5 rounded border p-4 bg-gray-200">
      <h3 className="font-semibold text-lg">Response</h3>

      <div className="mt-3">
        <span className="font-medium">Status:</span>{' '}
        <span className={statusColor}>{response.status}</span>
      </div>

      <div className="mt-4">
        <h4 className="font-medium">Headers</h4>

        <pre className="mt-2 rounded bg-gray-100 p-3 overflow-auto text-sm">
          {JSON.stringify(response.headers, null, 2)}
        </pre>
      </div>

      <div className="mt-4">
        <h4 className="font-medium">Body</h4>

        <pre
          className={`mt-2 rounded p-3 overflow-auto text-sm ${
            isError
              ? 'bg-red-50 text-red-600 border border-red-200'
              : 'bg-gray-100'
          }`}
        >
          {formattedBody}
        </pre>
      </div>
    </section>
  );
}
