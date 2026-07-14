import type { Parameter } from '@/types/endpoint';

export type ParameterItemProps = {
  param: Parameter;
  value?: string;
  onChange?: (value: string) => void;
};

export default function ParameterItem({
  param,
  value,
  onChange,
}: ParameterItemProps) {
  return (
    <li className="rounded border p-2">
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <label className="font-medium">{param.name}</label>
          {onChange && (
            <input
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="border border-gray-500 rounded-md py-1 px-3"
            />
          )}
        </div>

        <span className="rounded bg-gray-200 px-2 py-0.5 text-xs">
          {param.in}
        </span>

        {param.required && (
          <span className="text-red-500 text-xs">required</span>
        )}
      </div>

      {param.description && (
        <p className="mt-1 text-sm text-gray-500">{param.description}</p>
      )}
    </li>
  );
}
