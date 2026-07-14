import * as React from 'react';
import { CircleAlert, TriangleAlert, CircleCheck } from 'lucide-react';

import { cn } from '@/lib/utils';

type AlertProps = React.ComponentProps<'div'> & {
  variant?: 'error' | 'warning' | 'success';
};

const variants = {
  error: {
    className:
      'border-[rgba(255,180,171,0.3)] bg-[rgba(147,0,10,0.1)] text-[#FFDAD6]',
    icon: CircleAlert,
    iconClassName: 'text-[#FFB4AB]',
  },
  warning: {
    className:
      'border-[rgba(255,213,79,0.3)] bg-[rgba(255,193,7,0.1)] text-[#FFF3CD]',
    icon: TriangleAlert,
    iconClassName: 'text-[#FFD54F]',
  },
  success: {
    className:
      'border-[rgba(129,199,132,0.3)] bg-[rgba(46,125,50,0.1)] text-[#D8F5DA]',
    icon: CircleCheck,
    iconClassName: 'text-[#81C784]',
  },
} satisfies Record<
  NonNullable<AlertProps['variant']>,
  {
    className: string;
    icon: React.ElementType;
    iconClassName: string;
  }
>;

export function Alert({
  variant = 'error',
  className,
  children,
  ...props
}: AlertProps) {
  const { className: styles, icon: Icon, iconClassName } = variants[variant];

  return (
    <div
      className={cn(
        'flex items-start gap-2 rounded border p-[9px]',
        styles,
        className,
      )}
      {...props}
    >
      <Icon className={cn('mt-0.5 size-[15px] shrink-0', iconClassName)} />

      <p className="text-[13px]">{children}</p>
    </div>
  );
}
