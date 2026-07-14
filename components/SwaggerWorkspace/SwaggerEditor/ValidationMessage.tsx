import type { ValidationResult } from '@/lib/getValidationMessage';

type ValidationMessageProps = {
  validation: ValidationResult | null;
};

export default function ValidationMessage({
  validation,
}: ValidationMessageProps) {
  if (!validation) return null;

  return (
    <div className="p-4 my-2 bg-red-300 rounded-md border border-red-600">
      <p className="text-xl text-red-600">{validation.title}</p>
      <p className="text-sm text-red-600">{validation.description}</p>
    </div>
  );
}
