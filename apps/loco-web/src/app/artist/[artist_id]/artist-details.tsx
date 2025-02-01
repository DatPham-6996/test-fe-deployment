'use client';

import { BadgeCheck } from '@/components/icon/BadgeCheck';
import { Badge } from '@/components/shadcn/ui/badge';
import { Button } from '@/components/shadcn/ui/button';
import { ContentCenterNarrow } from '@/containers/content-center/ContentCenterNarrow';
import ExternalEventFeedContainer from '@/containers/event-timeline/ExternalEventFeedContainer';
import { FlipLayout } from '@/containers/flip-layout';
import { useArtistQuery } from '@/lib/__generated__/graphql';
import { useLogEvent } from '@/lib/hooks/useLogEvent';
import { cn } from '@/lib/utils';
import { useAuth } from '@/state-management/hooks/useAuth';
import { SiFacebook, SiInstagram, SiTiktok } from '@icons-pack/react-simple-icons';
import { Dot } from 'lucide-react';
import Image from 'next/image';
import { notFound, useParams } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';
import { useIntl } from 'react-intl';
import { ClipLoader } from 'react-spinners';

export default function ArtistDetails() {
  const intl = useIntl();
  const params = useParams();
  const { isLoggedIn } = useAuth();
  const { artist_id } = params;
  const { logEvent } = useLogEvent();
  const [expand, setExpand] = useState(false);
  const [_isPending, startTransition] = useTransition();

  const { data, loading } = useArtistQuery({
    variables: { handle: artist_id as string },
  });
  const artist = data?.artist;

  useEffect(() => {
    console.log('artist_id', artist_id);
    if (!artist_id) {
      return notFound();
    } else {
      logEvent({
        eventName: 'artist_details_viewed',
        value: artist_id as string,
      });
    }
  }, [logEvent, artist_id]);

  if (loading || !artist) {
    return (
      <FlipLayout>
        <ContentCenterNarrow maxWidth={1200}>
          <ClipLoader />
        </ContentCenterNarrow>
      </FlipLayout>
    );
  }

  const {
    name,
    handle,
    bio,
    genre,
    profileImageURL,
    coverURL,
    facebookLikes,
    facebookURL,
    instagramURL,
    tiktokURL,
    spotifyArtistID,
    spotifyFollowers,
    spotifyURL,
    shows,
    events,
  } = artist;
  return (
    <FlipLayout backgroundImageUrl={profileImageURL}>
      <ContentCenterNarrow maxWidth={1200}>
        <div className="flex flex-col gap-4 justify-center items-center my-2 w-full">
          <div className="relative w-full h-[240px] md:h-[350px] rounded-xl overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center filter blur-xl opacity-70 border-2 border-black"
              style={{ backgroundImage: coverURL ? `url('${coverURL}')` : `url('${profileImageURL}')` }}
            ></div>

            {coverURL && (
              <Image
                src={coverURL}
                alt={name}
                fill
                className="relative z-10 rounded-lg"
                style={{ objectFit: 'contain' }}
              />
            )}
          </div>

          <div className="flex flex-col mt-[-90px] px-4 md:px-24 gap-2 md:gap-4 w-full">
            {profileImageURL && (
              <Image src={profileImageURL} alt={name} width={120} height={120} className="rounded-xl z-10" />
            )}

            <div className="flex flex-col">
              <div className="flex flex-row gap-2 items-center">
                <p className="text-3xl font-medium">{name}</p>
                <BadgeCheck size={24} className="pt-2" />
              </div>

              {/* <div className="flex flex-row gap-1">
                <p>{address?.city}</p>
              </div> */}
              <div className="flex items-center text-muted-foreground">
                {facebookLikes && (
                  <>
                    <p>{facebookLikes} likes</p>
                    <Dot />
                  </>
                )}
                {facebookURL && (
                  <a href={facebookURL} target="_blank">
                    <Button variant="ghost" size={'icon'}>
                      <SiFacebook size={16} />
                    </Button>
                  </a>
                )}
                {tiktokURL && (
                  <a href={tiktokURL} target="_blank">
                    <Button variant="ghost" size={'icon'}>
                      <SiTiktok size={14} />
                    </Button>
                  </a>
                )}
                {instagramURL && (
                  <a href={instagramURL} target="_blank">
                    <Button variant="ghost" size={'icon'}>
                      <SiInstagram size={16} />
                    </Button>
                  </a>
                )}
              </div>
            </div>

            {bio && <div>
              <p className={cn('text-base font-light', !expand && 'line-clamp-2')}>{bio}</p>
              <p
                className="font-light text-sm flex justify-end hover:cursor-pointer"
                onClick={() => startTransition(() => setExpand(!expand))}
              >
                {expand
                  ? intl.formatMessage({ id: 'organization.less' })
                  : intl.formatMessage({ id: 'organization.more' })}
              </p>
            </div>}
          </div>

          <div className="flex flex-row gap-1">
            {genre &&
              genre.map((tag, index) => (
                <Badge variant="secondary" key={index}>
                  {tag}
                </Badge>
              ))}
          </div>

          {handle && <ExternalEventFeedContainer artistHandle={handle} isCenter={true} />}
        </div>
      </ContentCenterNarrow>

      {spotifyArtistID && (
        <div className="flex flex-row w-full justify-center pt-24 pb-6">
          <iframe
            className="rounded-xl w-full max-w-[600px] bg-transparent"
            src={`https://open.spotify.com/embed/artist/${spotifyArtistID}?utm_source=generator&theme=1`}
            height="152"
            style={{
              border: 0,
              backgroundColor: 'transparent',
            }}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
        </div>
      )}
    </FlipLayout>
  );
}
