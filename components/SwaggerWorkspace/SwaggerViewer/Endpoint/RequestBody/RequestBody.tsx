import type { RequestBody } from '@/types/endpoint';

export type RequestBodyProps = {
  requestBody: RequestBody;
  bodyValue?: string;
  onBodyChange?: (value: string) => void;
};

export default function RequestBody({
  requestBody,
  bodyValue,
  onBodyChange,
}: RequestBodyProps) {
  return (
    <section className="px-4 py-2 flex flex-col gap-4">
      <h3 className="font-semibold">Request Body:</h3>
      {requestBody.description && (
        <div className="pl-5">
          <h4>Description:</h4>
          <p>{requestBody.description}</p>
        </div>
      )}
      {requestBody.required && (
        <div className="pl-5">
          <h4>Required:</h4>
          <p>{requestBody.required ? 'yes' : 'no'}</p>
        </div>
      )}
      {requestBody.content && (
        <>
          <div className="pl-5">
            <h4>Content:</h4>
            <p>{Object.keys(requestBody.content)[0]}</p>
          </div>
          {Object.entries(requestBody.content ?? {}).map(
            ([contentType, media]) => (
              <div key={contentType}>
                <h4>{contentType}</h4>
                <div className="pl-5 flex flex-col gap-4">
                  {media.schema && (
                    <div className="pl-4">
                      <h5 className="font-medium">Schema</h5>

                      <pre>{JSON.stringify(media.schema, null, 2)}</pre>
                    </div>
                  )}

                  {media.example && (
                    <div className="pl-4">
                      <h5 className="font-medium">Example</h5>
                      {onBodyChange && (
                        <textarea
                          value={bodyValue}
                          onChange={(e) => onBodyChange(e.target.value)}
                          className="w-full rounded border p-2 font-mono"
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>
            ),
          )}
        </>
      )}
    </section>
  );
}
