'use client';

import { Toaster } from 'sonner';

export default function ToastProvider() {
  return (
    <Toaster
      richColors
      position="bottom-right"
      toastOptions={{
        duration: 3000,
        className: 'text-base',
      }}
    />
  );
}
