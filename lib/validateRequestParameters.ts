import type { Parameter } from '@/types/endpoint';

export default function validateRequestParameters(
  parameters: Parameter[],
  parameterValues: Record<string, string>,
): string | null {
  for (const param of parameters ?? []) {
    if (!param.required) continue;

    const key = `${param.in}:${param.name}`;
    const value = parameterValues[key];

    if (!value?.trim()) {
      return `Required parameter "${param.name}" is missing`;
    }
  }

  return null;
}
