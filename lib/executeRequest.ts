import type { ProxyResponse } from '@/types/proxy';

type ExecuteRequestProps = {
  url: string;
  method: string;
  headers: Record<string, string>;
  body?: string;
};

export default async function executeRequest({
  url,
  method,
  headers,
  body,
}: ExecuteRequestProps): Promise<ProxyResponse> {
  const requestHeaders = {
    ...headers,
    ...(body && {
      'Content-Type': 'application/json',
    }),
  };

  const res = await fetch('/api/proxy', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url,
      method: method.toUpperCase(),
      headers: requestHeaders,
      body,
    }),
  });

  const text = await res.text();

  const result: ProxyResponse = JSON.parse(text);
  if (!res.ok) {
    throw new Error(result.error ?? 'Request failed');
  }

  return result;
}
