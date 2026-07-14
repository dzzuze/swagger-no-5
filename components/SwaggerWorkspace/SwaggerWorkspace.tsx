'use client';

import { useState } from 'react';
import SwaggerEditor from '@/components/SwaggerWorkspace/SwaggerEditor/SwaggerEditor';
import SwaggerViewer from '@/components/SwaggerWorkspace/SwaggerViewer/SwaggerViewer';
import type { SwaggerSchema } from '@/types/swagger';

export default function SwaggerWorkspace() {
  const [parsedSchema, setParsedSchema] = useState<SwaggerSchema | null>(null);
  return (
    <div className="workplace p-5 bg-white text-gray-900">
      <SwaggerEditor schema={parsedSchema} onSchemaChange={setParsedSchema} />
      <SwaggerViewer schema={parsedSchema} />
    </div>
  );
}
