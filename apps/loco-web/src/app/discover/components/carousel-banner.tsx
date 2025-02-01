import { Carousel, CarouselContent, CarouselDotNav, CarouselItem } from '@/components/shadcn/ui/carousel';
import Image from 'next/image';

type Props = {
  banners: {
    img: string;
    eventUrl: string;
  }[];
};
export default function CarouselBanner({ banners }: Props) {
  return (
    <Carousel
      opts={{
        align: 'start',
      }}
      className="w-full"
    >
      <CarouselContent className="-ml-2 w-full">
        {banners.map((banner, index) => {
          return (
            <CarouselItem key={index} className="w-full flex items-center justify-center">
              <div className="relative w-full h-[240px] md:h-[350px] rounded-xl overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center filter blur-lg opacity-70 border-2 border-black"
                  style={{ backgroundImage: `url('${banner.img}')` }}
                ></div>

                <div className="absolute inset-0 bg-cover bg-center filter opacity-30 border-2 border-black bg-black z-[1]"></div>

                {banner.img && (
                  <a href={banner.eventUrl} className="group/banner relative block w-full h-full hover:cursor-pointer bg-cover">
                    <Image
                      src={banner.img}
                      alt={'banner'}
                      fill
                      priority
                      className="relative z-10 rounded-lg drop-shadow-xl transition-transform duration-500 ease-out group-hover/banner:scale-110"
                      style={{ objectFit: 'contain' }}
                    />
                  </a>
                )}
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <div className="flex flex-row items-center w-full justify-center pt-2">
        <CarouselDotNav />
      </div>
    </Carousel>
  );
}
