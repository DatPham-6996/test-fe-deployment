'use client';

import { useIntl } from 'react-intl';
import OfflineSaleToggle from './containers/OfflineSaleToggle';

export default function EventSettingsPage() {
  const { formatMessage } = useIntl();

  return (
    <div className="container px-5 md:px-20 mb-20">
      <h1 className="text-[34px] font-semibold mt-5 mb-7">{formatMessage({ id: 'eventSettings.title' })}</h1>
      <OfflineSaleToggle />
    </div>
  );
}
