import { toast, ToastClassnames } from 'sonner';

export interface ToastOptions {
  // Added for backward compatibility with toastify usages
  toastId?: string;
  className?: string;
  closeButton?: boolean;
  descriptionClassName?: string;
  style?: React.CSSProperties;
  cancelButtonStyle?: React.CSSProperties;
  actionButtonStyle?: React.CSSProperties;
  duration?: number;
  unstyled?: boolean;
  classNames?: ToastClassnames;
}

export const toastSuccess = (message: string, options?: ToastOptions) => {
  toast.success(message, {
    ...options,
    id: options?.toastId,
  });
};

export const toastError = (message: string, options?: ToastOptions) => {
  toast.error(message, {
    ...options,
    id: options?.toastId,
  });
};

export const toastInfo = (message: string, options?: ToastOptions) => {
  toast.info(message, {
    ...options,
    id: options?.toastId,
  });
};

export const toastWarn = (message: string, options?: ToastOptions) => {
  toast.warning(message, {
    ...options,
    id: options?.toastId,
  });
};
