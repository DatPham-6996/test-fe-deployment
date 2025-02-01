'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  fullWidth?: boolean;
  hideEyeIcon?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, fullWidth = true, hideEyeIcon = false, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    const inputType = type === 'password' && showPassword ? 'text' : type;

    return (
      <div className={cn('relative', { 'w-full': fullWidth })}>
        <input
          type={inputType}
          className={cn(
            'flex h-12 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
            className,
            { 'w-full': fullWidth }
          )}
          ref={ref}
          {...props}
        />
        {type === 'password' && !hideEyeIcon && (
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <EyeIcon className="h-4 w-4 text-gray-500" />
            ) : (
              <EyeOffIcon className="h-4 w-4 text-gray-500" />
            )}
          </button>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
