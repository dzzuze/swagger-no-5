'use client';

interface HistoryRecord {
  id: string;
  method: string;
  url: string;
  headers: Record<string, string | string[] | undefined>;
  body: string;
  response: string;
  created_at: string;
}

export default function HistoryList({ history }: { history: HistoryRecord[] }) {
  if (history.length === 0) {
    return <p className="text-gray-500">No saved requests found.</p>;
  }

  return (
    <ul className="space-y-4">
      {history.map((item) => (
        <li
          key={item.id}
          className="border p-4 rounded shadow bg-card text-card-foreground"
        >
          <div className="flex gap-2 items-center flex-wrap">
            <span className="font-mono text-sm bg-muted text-muted-foreground px-2 py-1 rounded border">
              {item.method}
            </span>
            <span className="text-blue-600 dark:text-blue-400 font-medium break-all max-w-[70%]">
              {item.url}
            </span>
            <span className="text-gray-500 text-sm ml-auto">
              {new Date(item.created_at).toLocaleString()}
            </span>
          </div>

          <details className="mt-3 group">
            <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 font-medium select-none">
              Show details
            </summary>

            <div className="mt-3 space-y-3 text-sm border-t pt-3">
              <div>
                <strong className="text-muted-foreground">Headers:</strong>
                <pre className="mt-1 bg-muted p-2 rounded overflow-x-auto font-mono text-xs max-h-40">
                  {JSON.stringify(item.headers, null, 2)}
                </pre>
              </div>

              {item.body && (
                <div>
                  <strong className="text-muted-foreground">Body:</strong>
                  <pre className="mt-1 bg-muted p-2 rounded overflow-x-auto font-mono text-xs max-h-40 whitespace-pre-wrap">
                    {item.body}
                  </pre>
                </div>
              )}

              <div>
                <strong className="text-muted-foreground">Response:</strong>
                <pre className="mt-1 bg-muted p-2 rounded overflow-x-auto font-mono text-xs max-h-60 whitespace-pre-wrap">
                  {item.response}
                </pre>
              </div>
            </div>
          </details>
        </li>
      ))}
    </ul>
  );
}
