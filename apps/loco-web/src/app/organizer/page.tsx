'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/shadcn/ui/avatar';
import { Button } from '@/components/shadcn/ui/button';
import { Card } from '@/components/shadcn/ui/card';
import { ContentCenterNarrow } from '@/containers/content-center/ContentCenterNarrow';
import { FlipEvent, useGetMyEventsLazyQuery, useGetMyOrganizationsLazyQuery } from '@/lib/__generated__/graphql';
import { useAuth } from '@/state-management/hooks/useAuth';
import { currentEventState } from '@/state-management/organizer/atoms/current-event';
import { currentOrgState } from '@/state-management/organizer/atoms/current-org';
import { useGateValue } from '@statsig/react-bindings';
import {
  CalendarFold,
  CalendarIcon,
  FileDownIcon,
  LifeBuoyIcon,
  ReceiptTextIcon,
} from 'lucide-react';
import { DateTime } from 'luxon';
import { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { PulseLoader } from 'react-spinners';
import { useRecoilState } from 'recoil';
import OrgOnboard from './components/OrgOnboard';
import EventCardCarousel from '@/components/event/EventCardCarousel';
import { useResponsiveDialog } from '@/components/responsive-dialog/responsive-dialog-context';
import EventOccurrencesSelector, {
  SelectedEvent,
  SelectedParentEvent,
} from '@/components/event/EventOccurrencesSelector';
import { useRouter } from 'next/navigation';
import OrganizationPayoutReportExportContainer from './containers/OrganizationPayoutReportExportContainer';
import OrganizationInvoiceReportExportContainer from './containers/OrganizationInvoiceReportExportContainer';

export default function OrganizerHomePage() {
  const { currentUser } = useAuth();
  const { formatMessage } = useIntl();
  const isFlipTest = useGateValue('flip_prod_test');

  const [currentOrg, setCurrentOrg] = useRecoilState(currentOrgState);
  const [_currentEvent, setCurrentEvent] = useRecoilState(currentEventState);

  const [getMyOrganizations, { data: myOrganizations, loading: myOrganizationsLoading, error: myOrganizationsError }] =
    useGetMyOrganizationsLazyQuery();
  const [getMyEvents, { data: myEvents, loading: myEventsLoading, error: myEventsError }] = useGetMyEventsLazyQuery();
  const hasEvent = !myEventsLoading && myEvents?.getMyEvents?.events?.length !== 0;
  const hasOrg = !myOrganizationsLoading && myOrganizations?.getMyOrganizations?.length !== 0;
  const { openDialog, closeDialog } = useResponsiveDialog();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      if (currentUser) {
        if (myOrganizationsError || myEventsError) {
          return;
        }

        if (!currentOrg) {
          await getMyOrganizations();
          return;
        }

        if (hasOrg) await getMyEvents({ variables: { data: { organizationId: currentOrg.id } } });
      }
    })();
  }, [currentOrg, getMyOrganizations, getMyEvents, currentUser, hasOrg, myOrganizationsError, myEventsError]);

  const NoOrgHolder = () => {
    if (!currentUser || !hasOrg) {
      return <OrgOnboard />;
    }
  };

  const OrgListSelector = () => {
    if (hasOrg && !currentOrg) {
      return (
        <div className="container px-0 mb-20">
          <div className="text-2xl font-medium my-5">{formatMessage({ id: 'organizer.title' })}</div>
          {myOrganizationsLoading && <PulseLoader className="text-center" size={12} />}
          <div className="flex flex-col gap-3">
            {!myOrganizationsLoading &&
              myOrganizations?.getMyOrganizations?.map((org) => (
                <Card
                  key={org.id}
                  className="flex p-5 items-center gap-3 cursor-pointer max-w-[500px]"
                  onClick={() => {
                    setCurrentOrg({
                      id: org.id,
                      name: org.name,
                      logoURL: org.logoURL,
                    });
                  }}
                >
                  <Avatar>
                    <AvatarImage src={org.logoURL ?? ''} />
                    <AvatarFallback>{org.name}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <div className="text-base font-medium text-foreground">{org.name}</div>
                    <div className="text-sm font-regular text-muted-foreground">{org.contactEmail}</div>
                  </div>
                </Card>
              ))}
          </div>
        </div>
      );
    }
  };

  const NoEventHolder = () => {
    if (!myEventsLoading && !hasEvent) {
      return (
        <div className="flex flex-col items-center mt-24">
          <CalendarFold width={100} height={100} color="#737373" />
          <div className="text-lg text-foreground font-semibold mt-8 mb-2">
            {formatMessage({ id: 'organizer.homepage.noEvent' })}
          </div>
          <div className="text-base text-muted-foreground font-normal mb-4">
            {formatMessage({ id: 'organizer.homepage.noEventDescription' })}
          </div>
          {isFlipTest ? (
            <Button
              onClick={() => {
                router.push(`/organizer/events/create`);
              }}
            >
              {formatMessage({ id: 'organizer.homepage.createEvent' })}
            </Button>
          ) : (
            <Button
              variant={'outline'}
              className="mb-5"
              size={'lg'}
              onClick={() => {
                window.open('https://tally.so/r/mOPEk8', '_blank', 'noopener,noreferrer');
              }}
            >
              {formatMessage({ id: 'organizer.homepage.createEvent' })}
            </Button>
          )}
        </div>
      );
    }
  };

  const EventListSelection = () => {
    if (!myEventsLoading && hasEvent) {
      const nextEventStart = myEvents?.getMyEvents?.events[0]?.startAt;
      if (nextEventStart == null) return <div className="mb-4" />;

      const now = DateTime.now();
      const startAt = DateTime.fromISO(nextEventStart);
      const daysUntilEvent = startAt.diff(now, 'days').days;
      const roundedDaysUntilEvent = Math.round(daysUntilEvent);

      const handleSelectEvent = (event: SelectedEvent) => {
        if (event.isMultipleDay && event.isParentEvent) {
          openDialog(
            <EventOccurrencesSelector
              selectedParentEvent={event as SelectedParentEvent}
              handleSelectEvent={handleSelectEvent}
              className="max-h-[80vh] overflow-y-auto"
            />
          );
        } else {
          setCurrentEvent({
            id: event.id,
            name: event.name,
            imageURL: event.media?.[0]?.url ?? '',
            startAt: event.startAt,
            endAt: event.endAt,
          });
          closeDialog();
          router.push(`/organizer/marketing`);
        }
      };

      // TODO: split upcoming and past events
      const Events = () => {
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {myEvents?.getMyEvents?.events?.map((event, index) => (
              <EventCardCarousel
                key={event.id}
                event={event as FlipEvent}
                index={index}
                onClick={() => {
                  handleSelectEvent(event as SelectedEvent);
                }}
              />
            ))}
          </div>
        );
      };

      return (
        <div className="mt-10">
          <h1 className="text-3xl font-semibold text-foreground mb-3">
            {formatMessage({ id: 'organizer.homepage.myEvents' })}
          </h1>
          <div className="text-base mb-4 sm:mb-6">
            <span className="font-normal text-muted-foreground">
              {formatMessage({ id: 'organizer.homepage.latestEventDescription' })}
            </span>
            {roundedDaysUntilEvent > 0 && (
              <span className="text-foreground font-medium ml-2">
                {roundedDaysUntilEvent} {formatMessage({ id: 'organizer.homepage.day' })}
              </span>
            )}
          </div>
          <Events />
        </div>
      );
    }
  };

  const OrganizationAction = (props: {
    icon: React.ReactNode;
    title: string;
    description: string;
    onClick: () => void;
  }) => {
    const { title, icon, description, onClick } = props;
    return (
      <div
        onClick={onClick}
        className="flex flex-row items-start cursor-pointer rounded-lg px-4 py-5 border hover:bg-neutral-100 dark:hover:bg-neutral-800"
      >
        {icon}
        <div className="flex flex-col justify-items-start gap-1 ml-3">
          <h3 className="text-base font-semibold text-foreground">{title}</h3>
          <p className="text-sm font-normal text-muted-foreground truncate text-wrap">{description}</p>
        </div>
      </div>
    );
  };

  const OrganizationActionsCard = () => {
    if (currentOrg) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <OrganizationAction
            icon={<CalendarIcon className="w-6 h-6 text-muted-foreground" />}
            title={formatMessage({ id: 'organizer.homepage.createEvent' })}
            description={formatMessage({ id: 'organizer.homepage.createEventDescription' })}
            onClick={() => {
              if (isFlipTest) {
                router.push(`/organizer/events/create`);
              } else {
                window.open('https://tally.so/r/mOPEk8', '_blank', 'noopener,noreferrer');
              }
            }}
          />
          <OrganizationAction
            icon={<FileDownIcon className="w-6 h-6 text-muted-foreground" />}
            title={formatMessage({ id: 'organizer.homepage.organizationPayout' })}
            description={formatMessage({ id: 'organizer.homepage.organizationPayoutDescription' })}
            onClick={() => {
              openDialog(<OrganizationPayoutReportExportContainer />);
            }}
          />
          <OrganizationAction
            icon={<ReceiptTextIcon className="w-6 h-6 text-muted-foreground" />}
            title={formatMessage({ id: 'organizer.homepage.organizationInvoice' })}
            description={formatMessage({ id: 'organizer.homepage.organizationInvoiceDescription' })}
            onClick={() => {
              openDialog(<OrganizationInvoiceReportExportContainer />);
            }}
          />
          <OrganizationAction
            icon={<LifeBuoyIcon className="w-6 h-6 text-muted-foreground" />}
            title={formatMessage({ id: 'organizer.homepage.support' })}
            description={formatMessage({ id: 'organizer.homepage.supportDescription' })}
            onClick={() => {
              window.open('https://ticket.flip.vn/organizer', '_blank', 'noopener,noreferrer');
            }}
          />
        </div>
      );
    }
  };

  return (
    <ContentCenterNarrow maxWidth={1200}>
      <div className="flex flex-col justify-start w-full p-4 gap-6">
        {currentOrg && (
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={currentOrg.logoURL ?? ''} />
            </Avatar>
            <div className="flex flex-col">
              <div className="text-base font-medium text-foreground">{currentOrg.name}</div>
            </div>
          </div>
        )}

        <p className="text-3xl text-start">
          {formatMessage({ id: 'organizer.homepage.hello' })}{' '}
          <span className="font-semibold ">{currentUser?.displayName}</span>
        </p>

        <NoOrgHolder />
        <OrgListSelector />

        <NoEventHolder />

        <OrganizationActionsCard />

        {myEventsLoading && <PulseLoader className="text-center" size={12} />}
        <EventListSelection />
      </div>
    </ContentCenterNarrow>
  );
}
