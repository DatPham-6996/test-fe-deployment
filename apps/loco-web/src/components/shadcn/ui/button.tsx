import { AutoHideWrapper } from '@/components/auto-hide-wrapper';
import { cn } from '@/lib/utils';
import { SPINNER_DARK_COLOR, SPINNER_LIGHT_COLOR } from '@/lib/utils/constants';
import { useIsDarkTheme } from '@/state-management/hooks/useIsDarkMode';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { Check, TriangleAlertIcon } from 'lucide-react';
import * as React from 'react';
import { ClipLoader } from 'react-spinners';

const SPINNER_ICON_SIZE = 15;
const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline: 'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 border dark:border-white',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-3 py-2',
        sm: 'h-9 rounded-md px-3 text-xs',
        lg: 'h-11 rounded-md px-8',
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
  fullWidth?: boolean;
  success?: boolean;
  error?: boolean;
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      error = false,
      success = false,
      fullWidth,
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';
    const isDarkMode = useIsDarkTheme();

    const getLoadingColor = () => {
      if (variant === 'default' || variant === undefined || variant === null) {
        return isDarkMode ? SPINNER_DARK_COLOR : SPINNER_LIGHT_COLOR;
      }

      return isDarkMode ? SPINNER_LIGHT_COLOR : SPINNER_DARK_COLOR;
    };

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }), { 'w-full': fullWidth }, `font-semibold`)}
        ref={ref}
        disabled={loading || disabled}
        {...props}
      >
        {loading && <ClipLoader color={getLoadingColor()} size={SPINNER_ICON_SIZE} className="mr-2" />}
        {success && (
          <AutoHideWrapper>
            <div className="mr-2">
              <Check size={SPINNER_ICON_SIZE} />
            </div>
          </AutoHideWrapper>
        )}
        {error && (
          <AutoHideWrapper>
            <div className="mr-2">
              <TriangleAlertIcon size={SPINNER_ICON_SIZE} />
            </div>
          </AutoHideWrapper>
        )}
        {props.children}
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
