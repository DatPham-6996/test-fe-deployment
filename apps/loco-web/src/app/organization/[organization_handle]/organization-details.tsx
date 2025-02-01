'use client';

import { BadgeCheck } from '@/components/icon/BadgeCheck';
import { Badge } from '@/components/shadcn/ui/badge';
import { Button } from '@/components/shadcn/ui/button';
import { ContentCenterNarrow } from '@/containers/content-center/ContentCenterNarrow';
import EventFeedContainer from '@/containers/event-timeline/EventFeedContainer';
import ExternalEventFeedContainer from '@/containers/event-timeline/ExternalEventFeedContainer';
import { FlipLayout } from '@/containers/flip-layout';
import { useOrganizationQuery } from '@/lib/__generated__/graphql';
import { useLogEvent } from '@/lib/hooks/useLogEvent';
import { cn } from '@/lib/utils';
import { SiFacebook, SiInstagram, SiTiktok } from '@icons-pack/react-simple-icons';
import { Dot, Globe, MailIcon } from 'lucide-react';
import Image from 'next/image';
import { notFound, useParams, useSearchParams } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';
import { useIntl } from 'react-intl';
import { ClipLoader } from 'react-spinners';
export default function OrganizationDetails() {
  const intl = useIntl();
  const params = useParams();
  const { organization_handle } = params;
  const { logEvent } = useLogEvent();
  const [expand, setExpand] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { data, loading } = useOrganizationQuery({
    variables: { handle: organization_handle as string },
  });
  const searchParams = useSearchParams();
  const isDemo = searchParams.get('isDemo') === 'true';
  const organization = data?.organization;

  useEffect(() => {
    console.log('organization_handle', organization_handle);
    if (!organization_handle) {
      return notFound();
    } else {
      logEvent({
        eventName: 'organization_details_viewed',
        value: organization_handle as string,
        organizationID: organization?.id,
      });
    }
  }, [logEvent, organization?.id, organization_handle]);

  if (loading || !organization) {
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
    address,
    logoURL,
    coverURL,
    description,
    contactEmail,
    facebookLikes,
    facebookURL,
    instagramURL,
    tiktokURL,
    websiteURL,
    tags,
  } = organization;
  return (
    <FlipLayout backgroundImageUrl={logoURL}>
      <ContentCenterNarrow maxWidth={1200}>
        <div className="flex flex-col gap-4 justify-center items-center my-2 w-full">
          <div className="relative w-full h-[240px] md:h-[350px] rounded-xl overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center filter blur-xl opacity-70 border-2 border-black"
              style={{ backgroundImage: coverURL ? `url('${coverURL}')` : `url('${logoURL}')` }}
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
            {logoURL && <Image src={logoURL} alt={name} width={120} height={120} className="rounded-xl z-10" />}

            <div className="flex flex-col">
              <div className="flex flex-row gap-2 items-center">
                <p className="text-3xl font-medium">{name}</p>
                <BadgeCheck size={24} className="pt-2" />
              </div>

              <div className="flex flex-row gap-1">
                <p>{address?.city}</p>
              </div>
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
                {contactEmail && (
                  <a href={`mailto:${contactEmail}`} target="_blank">
                    <Button variant="ghost" size={'icon'}>
                      <MailIcon size={16} />
                    </Button>
                  </a>
                )}
                {websiteURL && (
                  <a href={websiteURL} target="_blank">
                    <Button variant="ghost" size={'icon'}>
                      <Globe size={16} />
                    </Button>
                  </a>
                )}
              </div>
            </div>

            <div>
              <p className={cn('text-base font-light', expand ? '' : 'line-clamp-3')}>{description}</p>
              <p
                className="font-light text-sm flex justify-end hover:cursor-pointer"
                onClick={() => startTransition(() => setExpand(!expand))}
              >
                {expand
                  ? intl.formatMessage({ id: 'organization.less' })
                  : intl.formatMessage({ id: 'organization.more' })}
              </p>
            </div>

            <div className="flex flex-row gap-1">
              {tags &&
                tags.map((tag, index) => (
                  <Badge variant="secondary" key={index}>
                    {tag.label}
                  </Badge>
                ))}
            </div>
            {handle && (
              <div className="flex flex-col w-full gap-12 md:mt-3 items-center justify-center">
                <EventFeedContainer
                  sort="desc"
                  organizationHandle={handle}
                  isDemo={isDemo}
                  isCenter={true}
                  hideIfNoResult={true}
                />

                <ExternalEventFeedContainer
                  organizationHandle={handle}
                  showEmptyState={false}
                  isCenter={true}
                  hideIfNoResult={true}
                />
              </div>
            )}
          </div>
        </div>
      </ContentCenterNarrow>
    </FlipLayout>
  );
}
