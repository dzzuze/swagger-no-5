export type OperationSummaryProps = {
  summary: string;
};

export default function OperationSummary({ summary }: OperationSummaryProps) {
  return (
    <section className="px-4 py-2 flex gap-4">
      <h3 className="font-semibold">Summary:</h3>
      <p>{summary}</p>
    </section>
  );
}
