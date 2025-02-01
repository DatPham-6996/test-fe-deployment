'use client';

import {
  useOrganizationCheckoutConfigsLazyQuery,
  useUpsertOrganizationCheckoutConfigsMutation,
} from '@/lib/__generated__/graphql';
import SettingToggle from '../components/SettingToggle';
import { useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';
import { currentOrgState } from '@/state-management/organizer/atoms/current-org';
import { currentEventState } from '@/state-management/organizer/atoms/current-event';
import { useIntl } from 'react-intl';
import { toastError, toastSuccess } from '@/lib/utils/toast';
import { InfoIcon } from 'lucide-react';
import Link from 'next/dist/client/link';

export default function InvoiceRequestToggle() {
  const currentOrganization = useRecoilValue(currentOrgState);
  const currentEvent = useRecoilValue(currentEventState);
  const [enabled, setEnabled] = useState(false);
  const { formatMessage } = useIntl();

  const [getOrganizationCheckoutConfigs, { data }] = useOrganizationCheckoutConfigsLazyQuery({
    variables: {
      input: {
        organizationId: currentOrganization?.id ?? '',
        eventId: currentEvent?.id ?? '',
      },
    },
    fetchPolicy: 'no-cache',
  });

  const [upsertOrganizationCheckoutConfigs, { loading: updateLoading }] =
    useUpsertOrganizationCheckoutConfigsMutation();

  const config = data?.organizationCheckoutConfigs;

  useEffect(() => {
    if (currentOrganization?.id && currentEvent?.id) {
      getOrganizationCheckoutConfigs();
    }
  }, [currentOrganization?.id, currentEvent?.id, getOrganizationCheckoutConfigs]);

  useEffect(() => {
    if (config) {
      setEnabled(config.invoiceEnabled);
    }
  }, [config]);

  const loading = !data || !config;
  const toggleEnabled = config?.isShowCheckoutOptions ?? false;

  const handleToggle = async (value: boolean) => {
    setEnabled(value);
    try {
      if (!config || !currentOrganization || !currentEvent) {
        throw new Error('Missing data');
      }
      await upsertOrganizationCheckoutConfigs({
        variables: {
          input: {
            eventId: currentEvent.id,
            organizationId: currentOrganization.id,
            offlineSalesEnabled: config.offlineSalesEnabled,
            invoiceEnabled: value,
          },
        },
      });
      await getOrganizationCheckoutConfigs();
      toastSuccess(formatMessage({ id: 'eventSettings.updateSuccess' }));
    } catch (error) {
      setEnabled(!value);
      toastError(formatMessage({ id: 'eventSettings.updateFailed' }));
    }
  };

  return (
    <SettingToggle
      title={
        <div className="flex items-center gap-2" onClick={() => {}}>
          <span>{formatMessage({ id: 'eventSettings.invoiceRequest.title' })}</span>
          <Link href="https://help.flip.vn/organizer/web/invoice" target="_blank">
            <InfoIcon className="w-5 h-5" />
          </Link>
        </div>
      }
      description={formatMessage({ id: 'eventSettings.invoiceRequest.description' })}
      enabled={toggleEnabled && !loading}
      value={enabled}
      onChange={handleToggle}
    />
  );
}
