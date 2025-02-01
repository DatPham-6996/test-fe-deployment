'use client';

import ArtistCarouselContainer from '@/containers/artist-carousel/ArtistCarouselContainer';
import { ContentCenterNarrow } from '@/containers/content-center/ContentCenterNarrow';
import EventGridContainer from '@/containers/event-grid/EventGridContainer';
import { FlipLayout } from '@/containers/flip-layout';
import { useDynamicConfig } from '@statsig/react-bindings';
import classNames from 'classnames';
import { isDesktop } from 'react-device-detect';
import { useIntl } from 'react-intl';
import CarouselBanner from './components/carousel-banner';

type Banner = {
  img: string;
  eventUrl: string;
};
export default function DiscoverPage() {
  const { formatMessage } = useIntl();
  const bannersConfig = useDynamicConfig('banner_carousel');
  const banners: Banner[] = bannersConfig.get('banners', []) as Banner[];

  return (
    <div className="flex flex-col gap-6">
      <div className="relative bg-black overflow-hidden pb-6 dark">
        <div
          className="absolute inset-8 w-full h-full max-w-[1500px] mx-auto"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.5)), url('https://flivnewbucket.s3.ap-southeast-1.amazonaws.com/uploads/landing//d90c48a3-4110-49cd-af5f-83242200f657.webp')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />

        <FlipLayout headerOnly forceDarkMode={true} className="text-white relative z-10">
          <ContentCenterNarrow maxWidth={1000}>
            <div className="flex flex-col w-screen gap-4">
              <div className="flex justify-center items-center w-full py-2 md:py-4 bg-black">
                {banners.length > 0 && <CarouselBanner banners={banners} />}
              </div>

              <div
                className={classNames({
                  'flex flex-col w-full gap-8 md:gap-16 md:mt-3 px-2 text-white': !isDesktop,
                  'flex flex-col gap-16 md:mt-3 w-full justify-center items-center text-white': isDesktop,
                })}
              >
                <EventGridContainer
                  sort="asc"
                  saleStatus="ON_SALE"
                  title={formatMessage({ id: 'discovery.title' })}
                  hideNav={true}
                />
              </div>
            </div>
          </ContentCenterNarrow>
        </FlipLayout>
      </div>

      <FlipLayout footerOnly showLegal>
        <ContentCenterNarrow maxWidth={1000}>
          <div className="flex flex-col w-full gap-8 md:gap-12">
            <EventGridContainer
              sort="desc"
              saleStatus="PAST"
              title={formatMessage({ id: 'discovery.pastEvent' })}
              hideIfNoResult={true}
              hideNav={true}
            />
            <ArtistCarouselContainer />
          </div>
        </ContentCenterNarrow>
      </FlipLayout>
    </div>
  );
}
