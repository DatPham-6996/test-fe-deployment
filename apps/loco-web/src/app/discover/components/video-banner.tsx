import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/shadcn/ui/dialog';
import { PlayIcon } from 'lucide-react';
import Image from 'next/image';

type Props = {
  bannerUrl: string;
  videoUrl: string;
};
export default function VideoBanner({ bannerUrl, videoUrl }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="relative cursor-pointer group">
          <Image
            src={bannerUrl}
            alt="Event video thumbnail"
            className="w-full h-auto rounded-lg shadow-lg"
            width={800}
            height={600}
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
            <PlayIcon size={32} color="white" fill="white" />
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] p-0">
        <DialogTitle />
        <video
          width="100%"
          height="100%"
          src={videoUrl}
          title="Voice of Nature Video"
          controls={true}
          playsInline
          autoPlay
          className="rounded-lg"
        >
          <source src={videoUrl} type="video/webm" />
          Your browser does not support the video tag.
        </video>
      </DialogContent>
    </Dialog>
  );
}
