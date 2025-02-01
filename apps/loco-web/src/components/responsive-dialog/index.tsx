import { ReactNode } from 'react';

import { Dialog, DialogContent, DialogTitle } from '@/components/shadcn/ui/dialog';
import { Drawer, DrawerContent } from '@/components/shadcn/ui/drawer';
import { isDesktop } from 'react-device-detect';

export function ResponsiveDialog({
  content,
  isOpen,
  setIsOpen,
}: {
  content: ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          className="sm:max-w-[425px]"
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
        >
          {/* Empty `DialogTitle` to fix `DialogContent` requires a `DialogTitle` for the component to be accessible for screen reader users. */}
          <DialogTitle />
          {content}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent>
        <div className="max-w-[425px] p-5 pb-12 mx-auto w-full">{content}</div>
      </DrawerContent>
    </Drawer>
  );
}
