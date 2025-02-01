import { Dialog, DialogContent, DialogTitle } from '@/components/shadcn/ui/dialog';
import { useState } from 'react';

export default function ZoomableImage({ src, alt }: { src: string; alt: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <img
        src={src}
        alt={alt}
        className="cursor-zoom-in hover:opacity-90 transition-opacity max-w-full"
        onClick={() => setIsOpen(true)}
      />
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] overflow-auto p-2 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <DialogTitle />
          <div className="min-h-0 overflow-auto">
            <img src={src} alt={alt} className="w-auto max-w-full h-auto object-contain mx-auto" />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
