export type OperationDescriptionProps = {
  description: string;
};

export default function OperationDescription({
  description,
}: OperationDescriptionProps) {
  return (
    <section className="px-4 py-2 flex gap-4">
      <h3 className="font-semibold">Description:</h3>
      <p>{description}</p>
    </section>
  );
}
