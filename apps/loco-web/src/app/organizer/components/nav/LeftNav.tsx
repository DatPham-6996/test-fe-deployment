'use client';

import classNames from 'classnames';
import {
  BarChart4,
  ChevronDown,
  ChevronLeftIcon,
  HomeIcon,
  PanelLeft,
  SlidersHorizontalIcon,
  TicketPercentIcon,
  WalletIcon,
  TicketIcon,
  Armchair,
} from 'lucide-react';
import { useRouter } from 'next-nprogress-bar';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import { Avatar, AvatarFallback } from '@/components/shadcn/ui/avatar';
import { Button } from '@/components/shadcn/ui/button';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/shadcn/ui/drawer';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/shadcn/ui/popover';
import { Separator } from '@/components/shadcn/ui/separator';
import { Sheet, SheetContent, SheetTrigger } from '@/components/shadcn/ui/sheet';
import { useGetMyEventsLazyQuery, useGetMyOrganizationsQuery } from '@/lib/__generated__/graphql';
import { useLocale } from '@/locale/intl-provider-wrapper';
import { useOrganizerContext } from '@/state-management/hooks/organizer/organizer-context';
import { currentEventState } from '@/state-management/organizer/atoms/current-event';
import { currentOrgState } from '@/state-management/organizer/atoms/current-org';
import { useGateValue } from '@statsig/react-bindings';
import Link from 'next/link';
import { isMobile } from 'react-device-detect';
import { useIntl } from 'react-intl';
import { NavItem } from './NavItem';
import { DateTime } from 'luxon';
import EventCommand from './EventCommand';
import OrganizationCommand from './OrganizationCommand';

export enum OrganizerPage {
  HOMEPAGE = 'HOMEPAGE',
  MARKETING = 'MARKETING',
  PAYOUT = 'PAYOUT',
  PROMOTION = 'PROMOTION',
  EVENT_SETTINGS = 'EVENT-SETTINGS',
  SEAT_MAP = 'SEAT-MAP',
  ORDER = 'ORDER',
}

export function LeftNav() {
  const router = useRouter();
  const pathname = usePathname();
  const bct = useGateValue('bo_cong_thuong');
  const isHoldSeatRulesEditorEnabled = useGateValue('hold-seat-rules-editor');

  const { formatMessage } = useIntl();

  const [currentOrg] = useRecoilState(currentOrgState);
  const [currentEvent] = useRecoilState(currentEventState);

  const [selectedSection, setSelectedSection] = useState<OrganizerPage>(OrganizerPage.HOMEPAGE);

  const [openEventSelector, setOpenEventSelector] = useState<boolean>(false);
  const [openOrganizationSelector, setOpenOrganizationSelector] = useState<boolean>(false);

  const [openEventSelectionDrawer, setOpenEventSelectionDrawer] = useState<boolean>(false);
  const [openOrganizationSelectionDrawer, setOpenOrganizationSelectionDrawer] = useState<boolean>(false);

  const [openSheet, setOpenSheet] = useState<boolean>(false);

  const { state, toggleSidenav } = useOrganizerContext();
  const isCollapsedNav = state.isSidenavCollapsed && !isMobile && !openSheet;
  const useMobileSelector = isMobile || openSheet;

  useEffect(() => {
    switch (pathname) {
      case '/organizer':
        setSelectedSection(OrganizerPage.HOMEPAGE);
        break;

      case '/organizer/marketing':
        setSelectedSection(OrganizerPage.MARKETING);
        break;

      case '/organizer/payout':
        setSelectedSection(OrganizerPage.PAYOUT);
        break;

      case '/organizer/promotion':
        setSelectedSection(OrganizerPage.PROMOTION);
        break;

      case '/organizer/event-settings':
        setSelectedSection(OrganizerPage.EVENT_SETTINGS);
        break;

      case '/organizer/order':
        setSelectedSection(OrganizerPage.ORDER);
        break;

      case '/organizer/seat-map':
        setSelectedSection(OrganizerPage.SEAT_MAP);
        break;

      default:
        setSelectedSection(OrganizerPage.HOMEPAGE);
        break;
    }
  }, [pathname]);

  function closeAllSelectors() {
    setOpenEventSelector(false);
    setOpenOrganizationSelector(false);
    setOpenEventSelectionDrawer(false);
    setOpenOrganizationSelectionDrawer(false);
    setOpenSheet(false);
  }

  const eventSectionData = bct
    ? [
        {
          id: OrganizerPage.PAYOUT,
          name: formatMessage({ id: 'navBar.payout' }),
          icon: <WalletIcon size={18} />,
          onClick: () => {
            router.push('/organizer/payout');
            setOpenSheet(false);
          },
          className: {
            hidden: !currentEvent,
          },
        },
      ]
    : [
        {
          id: OrganizerPage.MARKETING,
          name: formatMessage({ id: 'navBar.marketing' }),
          icon: <BarChart4 size={18} />,
          onClick: () => {
            router.push('/organizer/marketing');
            setOpenSheet(false);
          },
          className: {
            hidden: !currentEvent,
          },
        },
        {
          id: OrganizerPage.ORDER,
          name: formatMessage({ id: 'navBar.order' }),
          icon: <TicketIcon size={18} />,
          onClick: () => {
            router.push('/organizer/order');
            setOpenSheet(false);
          },
          className: {
            hidden: !currentEvent,
          },
        },
        {
          id: OrganizerPage.PAYOUT,
          name: formatMessage({ id: 'navBar.payout' }),
          icon: <WalletIcon size={18} />,
          onClick: () => {
            router.push('/organizer/payout');
            setOpenSheet(false);
          },
          className: {
            hidden: !currentEvent,
          },
        },
        {
          id: OrganizerPage.PROMOTION,
          name: formatMessage({ id: 'navBar.promotion' }),
          icon: <TicketPercentIcon size={18} />,
          onClick: () => {
            router.push('/organizer/promotion');
            setOpenSheet(false);
          },
          className: {
            hidden: !currentEvent,
          },
        },
        isHoldSeatRulesEditorEnabled
          ? {
              id: OrganizerPage.SEAT_MAP,
              name: formatMessage({ id: 'navBar.seatMap' }),
              icon: <Armchair size={18} />,
              onClick: () => {
                router.push('/organizer/seat-map');
                setOpenSheet(false);
              },
              className: {
                hidden: !currentEvent,
              },
            }
          : null,
        {
          id: OrganizerPage.EVENT_SETTINGS,
          name: formatMessage({ id: 'navBar.settings' }),
          icon: <SlidersHorizontalIcon size={18} />,
          onClick: () => {
            router.push('/organizer/event-settings');
            setOpenSheet(false);
          },
          className: {
            hidden: !currentEvent,
          },
        },
      ].filter((item) => item !== null);

  const orgSectionData = [
    {
      id: OrganizerPage.HOMEPAGE,
      name: formatMessage({ id: 'navBar.homepage' }),
      icon: <HomeIcon size={18} />,
      onClick: () => {
        router.push('/organizer');
        closeAllSelectors();
      },
    },
  ];

  const organizationSelectorButton = (
    <div
      className=""
      onClick={() => {
        setOpenOrganizationSelector(!openOrganizationSelector);
        closeAllSelectors();
      }}
    >
      {
        <div
          className={classNames(
            'flex items-center rounded-md text-secondary-foreground transition-colors hover:text-foreground h-10 w-full gap-3 cursor-pointer justify-between',
            {
              '!justify-center': isCollapsedNav,
              'px-4 py-5': !isCollapsedNav,
            }
          )}
        >
          {currentOrg &&
            (currentOrg?.logoURL ? (
              <Image
                src={currentOrg.logoURL}
                alt="org-image"
                width={64}
                height={64}
                className="w-6 h-6 rounded-full object-cover !aspect-square"
              />
            ) : (
              <Avatar className="w-6 h-6">
                <AvatarFallback className="bg-[#FACC15] text-tiny">
                  {currentOrg?.name?.charAt(0)?.toLocaleUpperCase() ?? 'F'}
                </AvatarFallback>
              </Avatar>
            ))}
          <span
            className={classNames('flex-grow whitespace-nowrap overflow-hidden text-ellipsis text-sm text-foreground', {
              hidden: isCollapsedNav,
            })}
          >
            {currentOrg?.name ?? formatMessage({ id: 'navBar.selectOrganization' })}
          </span>
          <ChevronDown
            className={classNames('flex-none w-5 h-5', {
              hidden: isCollapsedNav && currentOrg?.name,
            })}
          />
        </div>
      }
    </div>
  );

  const eventSelectorButton = currentOrg && (
    <div
      className=""
      onClick={() => {
        setOpenEventSelector(!openEventSelector);
        closeAllSelectors();
      }}
    >
      {
        <div
          className={classNames(
            'flex items-center rounded-md text-secondary-foreground transition-colors hover:text-foreground h-10 w-full gap-3 cursor-pointer justify-between',
            {
              '!justify-center': isCollapsedNav,
              'px-4 py-5': !isCollapsedNav,
            }
          )}
        >
          {currentEvent &&
            (currentEvent?.imageURL ? (
              <Image
                src={currentEvent.imageURL}
                alt="event-image"
                width={64}
                height={64}
                className="w-6 h-6 rounded-full object-cover !aspect-square"
              />
            ) : (
              <Avatar className="w-6 h-6">
                <AvatarFallback className="bg-[#FACC15] text-tiny">
                  {currentEvent?.name?.charAt(0)?.toLocaleUpperCase() ?? 'F'}
                </AvatarFallback>
              </Avatar>
            ))}
          {!isCollapsedNav && (
            <div className="flex-grow flex flex-col overflow-hidden">
              <span className={classNames('whitespace-nowrap overflow-hidden text-ellipsis text-sm text-foreground')}>
                {currentEvent?.name ?? formatMessage({ id: 'navBar.selectEvent' })}
              </span>
              {currentEvent?.startAt && currentEvent?.endAt && (
                <span className="text-muted-foreground text-sm mt-1">
                  {DateTime.fromISO(currentEvent?.startAt ?? '').toFormat('dd/MM, HH:mm')}
                  {DateTime.fromISO(currentEvent?.endAt ?? '').toFormat(' - HH:mm')}
                </span>
              )}
            </div>
          )}
          <ChevronDown
            className={classNames('flex-none w-5 h-5', {
              hidden: isCollapsedNav && currentEvent?.name,
            })}
          />
        </div>
      }
    </div>
  );

  const Selector = ({
    isOpen,
    setOpen,
    isOpenMobile,
    setOpenMobile,
    selectorButton,
    command,
  }: {
    isOpen: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    isOpenMobile: boolean;
    setOpenMobile: Dispatch<SetStateAction<boolean>>;
    selectorButton: React.ReactNode;
    command: React.ReactNode;
  }) => (
    <div className="w-full">
      {!useMobileSelector && (
        <Popover open={isOpen} onOpenChange={setOpen}>
          <PopoverTrigger asChild>{selectorButton}</PopoverTrigger>
          <PopoverContent className="w-full max-w-[400px] ml-2 p-0 mt-1">{command}</PopoverContent>
        </Popover>
      )}

      {useMobileSelector && (
        <Drawer open={isOpenMobile} onOpenChange={setOpenMobile}>
          <DrawerTrigger asChild>{selectorButton}</DrawerTrigger>
          <DrawerContent className="h-[95%] max-h-[95%] p-2">{command}</DrawerContent>
        </Drawer>
      )}
    </div>
  );

  const SectionDivider = ({ long, short }: { long: string; short: string }) => (
    <>
      <Separator />

      <div className="px-2">
        {!isCollapsedNav && <div className="font-semibold overflow-hidden text-ellipsis text-xs">{long}</div>}
        {isCollapsedNav && <div className="font-semibold text-xs">{short}</div>}
      </div>
    </>
  );

  const Nav = () => (
    <nav
      className={classNames(
        'flex flex-col min-h-screen w-full px-2 py-4 gap-4 border-r-[1px] ',
        { 'items-center': isCollapsedNav },
        { 'items-start justify-start': !isCollapsedNav }
      )}
    >
      <div className="flex justify-start px-3 w-full">
        <Link href="/organizer" className="flex flex-row gap-4 w-full items-center">
          <Image src="/icons/flip.png" alt="flip logo" width={16} height={16} />
          {!isCollapsedNav && <p className="font-bold text-xl">Organizer</p>}
        </Link>
      </div>

      {!openSheet && (
        <Button
          size="icon"
          onClick={() => toggleSidenav()}
          className={classNames(
            `rounded-full transition-transform duration-300 absolute -right-3 top-11 w-[24px] h-[24px] bg-white text-neutral-500 hover:bg-white hover:text-neutral-500`,
            { 'rotate-180': isCollapsedNav },
            'dark:bg-black dark:text-white dark:hover:bg-black dark:hover:text-white',
            { hidden: isMobile }
          )}
        >
          <ChevronLeftIcon className="h-4 w-4" />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      )}
      <SectionDivider
        long={formatMessage({ id: 'navBar.organizer' })}
        short={formatMessage({ id: 'navBar.shortFormOrganizer' })}
      />
      <Selector
        isOpen={openOrganizationSelector}
        setOpen={setOpenOrganizationSelector}
        isOpenMobile={openOrganizationSelectionDrawer}
        setOpenMobile={setOpenOrganizationSelectionDrawer}
        selectorButton={organizationSelectorButton}
        command={
          <OrganizationCommand
            setOpenOrganizationSelector={setOpenOrganizationSelector}
            setOpenOrganizationSelectionDrawer={setOpenOrganizationSelectionDrawer}
          />
        }
      />
      {orgSectionData
        .filter((item) => item !== null)
        .map((section, idx) => (
          <NavItem
            key={idx}
            idx={idx}
            id={section.id}
            data={section}
            onClick={section.onClick}
            isCollapsedNav={isCollapsedNav}
            selected={selectedSection === section.id}
          />
        ))}

      <SectionDivider
        long={formatMessage({ id: 'navBar.event' })}
        short={formatMessage({ id: 'navBar.shortFormEvent' })}
      />
      <Selector
        isOpen={openEventSelector}
        setOpen={setOpenEventSelector}
        isOpenMobile={openEventSelectionDrawer}
        setOpenMobile={setOpenEventSelectionDrawer}
        selectorButton={eventSelectorButton}
        command={<EventCommand selectedSection={selectedSection} closeAllSelectors={closeAllSelectors} />}
      />

      {eventSectionData
        .filter((item) => item !== null)
        .map((section, idx) => (
          <NavItem
            key={idx}
            idx={idx}
            id={section!.id}
            data={section!}
            onClick={section!.onClick}
            className={section!.className}
            isCollapsedNav={isCollapsedNav}
            selected={selectedSection === section!.id}
          />
        ))}
    </nav>
  );

  const DesktopNav = () => (
    <aside
      className={classNames(
        'fixed inset-y-0 left-0 top-0 hidden z-10 flex-col sm:flex transition-all duration-300 bg-white dark:bg-black',
        {
          'w-16': isCollapsedNav,
          'w-64': !isCollapsedNav,
        }
      )}
    >
      <Nav />
    </aside>
  );

  const MobileNav = () => (
    <Sheet open={openSheet} onOpenChange={setOpenSheet}>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden fixed top-2 left-2">
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs px-0 bg-light-gradient-to-b dark:bg-dark-gradient-to-b">
        <Nav />
      </SheetContent>
    </Sheet>
  );

  return (
    <>
      <MobileNav />
      <DesktopNav />
    </>
  );
}
