type BuildCurlCommandProps = {
  url: string;
  method: string;
  headers: Record<string, string>;
  body?: string;
};

export default function buildCurlCommand({
  url,
  method,
  headers,
  body,
}: BuildCurlCommandProps) {
  const parts = [`curl -X ${method.toUpperCase()}`];

  parts.push(`"${url}"`);

  Object.entries(headers).forEach(([key, value]) => {
    parts.push(`-H "${key}: ${value}"`);
  });

  if (body) {
    parts.push(`-d '${body}'`);
  }

  return parts.join(' \\\n');
}
