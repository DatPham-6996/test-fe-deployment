'use client';

import { useRouter } from 'next-nprogress-bar';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';
import { useRecoilState } from 'recoil';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/shadcn/ui/command';
import { useGetMyOrganizationsQuery } from '@/lib/__generated__/graphql';
import { currentEventState } from '@/state-management/organizer/atoms/current-event';
import { isMobile } from 'react-device-detect';
import { useIntl } from 'react-intl';
import { currentOrgState } from '@/state-management/organizer/atoms/current-org';
import Loader from '@/components/loading-indicator/Loader';

export default function OrganizationCommand(props: {
  setOpenOrganizationSelector: Dispatch<SetStateAction<boolean>>;
  setOpenOrganizationSelectionDrawer: Dispatch<SetStateAction<boolean>>;
}) {
  const { setOpenOrganizationSelector, setOpenOrganizationSelectionDrawer } = props;
  const { formatMessage } = useIntl();
  const { data: myOrganizations, loading: myOrganizationsLoading } = useGetMyOrganizationsQuery();
  const [currentOrg, setCurrentOrg] = useRecoilState(currentOrgState);
  const [currentEvent, setCurrentEvent] = useRecoilState(currentEventState);

  return (
    <Command className="mt-1">
      {/* TODO: Add search by API here */}
      <CommandInput placeholder={formatMessage({ id: 'navBar.searchOrganization' })} className="" />
      {myOrganizationsLoading && <Loader size={12} className="my-4" />}
      {!myOrganizationsLoading && myOrganizations?.getMyOrganizations?.length === 0 && (
        <CommandEmpty>{formatMessage({ id: 'navBar.noOrganizationFound' })}</CommandEmpty>
      )}
      <CommandGroup>
        <CommandList className={`p-0 ${isMobile ? 'h-[80vh] max-h-[80vh] overflow-y-auto' : ''}`}>
          {!myOrganizationsLoading &&
            (myOrganizations?.getMyOrganizations ?? []).map((org) => (
              <CommandItem
                key={org?.id}
                value={org?.name}
                onSelect={() => {
                  setCurrentOrg({
                    id: org?.id,
                    logoURL: org?.logoURL,
                    name: org?.name,
                  });
                  if (currentOrg?.id !== org.id && currentEvent) {
                    setCurrentEvent(null);
                  }
                  setOpenOrganizationSelector(false);
                  setOpenOrganizationSelectionDrawer(false);
                }}
                className={`cursor-pointer rounded-xl border ${isMobile ? 'my-2' : 'my-3'} mx-3`}
              >
                <div className="flex flex-row gap-4 p-1 w-full justify-between items-center">
                  <div className="w-10 h-10 relative flex-none">
                    {org?.logoURL ? (
                      <Image src={org?.logoURL} className="rounded-full object-cover" alt="event-logo" fill />
                    ) : (
                      <div className="bg-[#FACC15] text-3xl w-full h-full rounded-md object-cover justify-center items-center flex text-black">
                        {org?.name?.charAt(0)?.toLocaleUpperCase() ?? 'F'}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-0.5 flex-[4] flex-grow pt-1 truncate">
                    <p className={`font-semibold text-base whitespace-nowrap overflow-hidden text-ellipsis`}>
                      {org.name}
                    </p>
                    {org?.contactEmail && (
                      <p className={`text-muted-foreground whitespace-nowrap overflow-hidden text-ellipsis`}>
                        {org?.contactEmail}
                      </p>
                    )}
                  </div>
                  <div className="flex-none">
                    {currentOrg?.id === org.id ? (
                      <div className="w-4 h-4 relative">
                        <div className="w-4 h-4 left-0 top-0 absolute rounded-full border border-slate-900 dark:border-slate-50"></div>
                        <div className="w-2.5 h-2.5 left-[3px] top-[3px] absolute bg-slate-900 dark:bg-slate-50 rounded-full border border-slate-900 dark:border-slate-50"></div>
                      </div>
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-slate-900 dark:border-slate-50"></div>
                    )}
                  </div>
                </div>
              </CommandItem>
            ))}
        </CommandList>
      </CommandGroup>
    </Command>
  );
}
