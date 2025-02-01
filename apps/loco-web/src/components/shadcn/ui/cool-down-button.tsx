import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { ClipLoader } from 'react-spinners';
;

const NEUTRAL_50 = '#fafafa';
const SPINNER_ICON_SIZE = 15;
const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline: 'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  coolDownDurationMs?: number;
  startWithCoolDown?: boolean;
}

const CoolDownButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, disabled = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    const [lastClickedTime, setLastClickedTime] = React.useState<number | null>(null);
    const coolDownDuration = props.coolDownDurationMs ?? 60000; // 60 seconds cool-down
    const [timeRemaining, setTimeRemaining] = React.useState<number | null>(null);

    React.useEffect(() => {
      if (props.startWithCoolDown) {
        setLastClickedTime(Date.now());
        setTimeRemaining(coolDownDuration);
      }
    }, [props.startWithCoolDown, coolDownDuration]);

    React.useEffect(() => {
      const timerInterval = setInterval(() => {
        if (lastClickedTime) {
          const elapsedTime = Date.now() - lastClickedTime;
          const remainingTime = coolDownDuration - elapsedTime;
          if (remainingTime <= 0) {
            setTimeRemaining(null);
            setLastClickedTime(null);
          } else {
            setTimeRemaining(remainingTime);
          }
        }
      }, 1000);

      return () => clearInterval(timerInterval);
    }, [lastClickedTime, coolDownDuration]);

    const onClick = async (event: TODO) => {
      if (props.onClick) {
        setLastClickedTime(Date.now());
        setTimeRemaining(coolDownDuration);
        await props.onClick(event);
      }
    };

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={loading || disabled || timeRemaining !== null}
        {...props}
        onClick={onClick}
      >
        {loading && <ClipLoader color={NEUTRAL_50} size={SPINNER_ICON_SIZE} className="mr-2" />} {props.children}
        {timeRemaining ? ` (${Math.ceil(timeRemaining / 1000)})` : ''}
      </Comp>
    );
  }
);
CoolDownButton.displayName = 'Button';

export { buttonVariants, CoolDownButton };

