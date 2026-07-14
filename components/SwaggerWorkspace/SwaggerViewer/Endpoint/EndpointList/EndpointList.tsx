import EndpointItem from '../EndpointItem/EndpointItem';
import type { Endpoint } from '@/types/endpoint';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../../../ui/accordion';
import EndpointDetails from '@/components/SwaggerWorkspace/SwaggerViewer/Endpoint/EndpointDetails/EndpointDetails';
import { useState } from 'react';

export type EndpointListProps = {
  endpoints: Endpoint[];
  serverUrl: string;
};

export default function EndpointList({
  endpoints,
  serverUrl,
}: EndpointListProps) {
  const [opened, setOpened] = useState('');

  return (
    <Accordion
      type="single"
      collapsible
      value={opened}
      onValueChange={setOpened}
    >
      {endpoints.map((endpoint) => {
        const value = `${endpoint.method}-${endpoint.path}`;

        return (
          <AccordionItem className="max-w-full" key={value} value={value}>
            <AccordionTrigger>
              <EndpointItem endpoint={endpoint} />
            </AccordionTrigger>
            <AccordionContent className="px-4">
              {opened === value && (
                <EndpointDetails endpoint={endpoint} serverUrl={serverUrl} />
              )}
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
