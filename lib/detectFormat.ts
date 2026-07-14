import type { Format } from '@/types/swagger';

export default function detectFormat(text: string): Format {
  const trimmed = text.trim();
  return trimmed.startsWith('{') || trimmed.startsWith('[') ? 'json' : 'yaml';
}
