import { Badge } from '@/components/shadcn/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselNumberNav } from '@/components/shadcn/ui/carousel';
import { SkeletonCard } from '@/components/skeletons/SkeletonCard';
import { FlipArtist } from '@/lib/__generated__/graphql';
import { cn } from '@/lib/utils';
import { gql, useQuery } from '@apollo/client';
import Image from 'next/image';
import Link from 'next/link';
import { isMobile } from 'react-device-detect';
import { useIntl } from 'react-intl';

const ARTISTS_QUERY = gql`
  query Artists {
    artists {
      handle
      name
      profileImageURL
      genre
      active
    }
  }
`;

// type Artist = {
//   handle: string;
//   name: string;
//   profileImageURL: string;
//   genre: string[];
//   active: boolean;
// };

const ArtistCard = ({ artist }: { artist: FlipArtist }) => (
  <Link href={`/artist/${artist.handle}`} className="group">
    <div className="relative rounded-[32px] p-1.5 pb-3 flex flex-col gap-3 transition-colors group-hover:bg-white dark:group-hover:bg-neutral-800">
      <div className="relative aspect-square overflow-hidden rounded-[24px]">
        <Image
          src={artist.profileImageURL ?? ''}
          alt={artist.name}
          width={500}
          height={500}
          className="max-w-full max-h-full h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="px-2 flex flex-col gap-1">
        <h3 className="text-lg font-medium ">{artist.name}</h3>
        <div className="flex flex-wrap gap-2">
          {artist.genre?.map((genre, index) => (
            <Badge key={index} className="rounded-full px-2.5 py-1.5 text-xs font-semibold">
              {genre}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  </Link>
);

export default function ArtistCarouselContainer() {
  const { data, loading } = useQuery(ARTISTS_QUERY);
  const { formatMessage } = useIntl();
  const artists: FlipArtist[] = data?.artists || [];

  return (
    <div className="w-full">
      <Carousel opts={{ align: 'start' }}>
        <div className="flex flex-col gap-4">
          <div className={cn('flex items-center justify-between', isMobile && 'ml-2')}>
            <h2 className="text-2xl font-semibold">{formatMessage({ id: 'artist.title' })}</h2>
            {/* <Link href="/artists" className="text-gray-600 hover:underline">
                            Xem thêm
                        </Link> */}
            <CarouselNumberNav />
          </div>
          <CarouselContent className="-ml-4">
            {loading
              ? new Array(4).fill(0).map((_, index) => (
                <CarouselItem key={index} className="pl-4 basis-[70%] md:basis-[40%] lg:basis-[30%]">
                  <SkeletonCard index={index} />
                </CarouselItem>
              ))
              : artists.map((artist, index) => {
                if (artist && artist.active) {
                  return (
                    <CarouselItem key={index} className="pl-4 basis-[70%] md:basis-[40%] lg:basis-[30%]">
                      <ArtistCard artist={artist} />
                    </CarouselItem>
                  )
                }
              })}
          </CarouselContent>
        </div>
      </Carousel>
    </div>
  );
}
