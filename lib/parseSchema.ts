import * as yaml from 'js-yaml';
import type { Format, SwaggerSchema } from '@/types/swagger';

export default function parseSchema(text: string, format: Format) {
  return format === 'yaml'
    ? (yaml.load(text) as SwaggerSchema)
    : (JSON.parse(text) as SwaggerSchema);
}
