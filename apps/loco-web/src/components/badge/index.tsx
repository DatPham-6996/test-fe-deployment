import { cn } from '@/lib/utils';
;

function FlipBadge({
  variant,
  bgColor,
  textStyle,
  children,
  className,
}: {
  variant: string;
  bgColor?: string;
  textStyle?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn('flex items-center min-w-6 h-6 bg-neutral-200 rounded-sm flex-row px-1.5', {
        'bg-green-100 border border-green-200': variant.toLowerCase() === 'completed',
        'bg-orange-100 border border-orange-100': variant.toLowerCase() === 'pending',
        'bg-red-100 border border-red-100':
          variant.toLowerCase() === 'destructive' || variant.toLowerCase() === 'cancelled',
        [`bg-${bgColor}`]: bgColor,
        className,
      })}
    >
      <p
        className={cn(`text-xs font-medium`, {
          'text-green-700': variant.toLowerCase() === 'completed',
          'text-orange-700': variant.toLowerCase() === 'secondary',
          'text-red-700': variant.toLowerCase() === 'destructive' || variant.toLowerCase() === 'cancelled',
          textStyle,
        })}
      >
        {children}
      </p>
    </div>
  );
}

export default FlipBadge;
