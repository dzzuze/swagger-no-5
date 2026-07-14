import * as React from 'react';
import { cn } from '@/lib/utils';

type SelectProps = React.ComponentProps<'select'>;

export function Select({ className, children, ...props }: SelectProps) {
  return (
    <select
      className={cn(
        'w-full rounded border border-[#464554] bg-[#171F33] px-[9px] text-[13px] leading-6 text-[#DAE2FD] outline-none transition-colors',
        'focus:border-[#6A78FF]',
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}
