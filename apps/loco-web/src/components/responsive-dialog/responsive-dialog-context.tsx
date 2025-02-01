'use client';

import { ReactNode, createContext, useContext, useMemo, useState } from 'react';
import { ResponsiveDialog } from '.';

type DialogContent = ReactNode;

interface DialogContextType {
  openDialog: (content: DialogContent) => void;
  closeDialog: () => void;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export function ResponsiveDialogProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [content, setContent] = useState<DialogContent | null>(null);

  const openDialog = (content: DialogContent) => {
    setContent(content);
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
    setContent(null);
  };

  const memoedValue = useMemo(
    () => ({
      isOpen,
      content,
      openDialog,
      closeDialog,
    }),
    [isOpen, content]
  );

  return (
    <DialogContext.Provider value={memoedValue}>
      {children}
      {content && <ResponsiveDialog content={content} isOpen={isOpen} setIsOpen={setIsOpen} />}
    </DialogContext.Provider>
  );
}

export const useResponsiveDialog = (): DialogContextType => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('useDialog must be used within a DialogProvider');
  }

  return context;
};
