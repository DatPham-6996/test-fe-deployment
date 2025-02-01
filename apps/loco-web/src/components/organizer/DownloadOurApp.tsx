'use client';

import { SiApple, SiGoogleplay } from '@icons-pack/react-simple-icons';
import { useIntl } from 'react-intl';

export const DownloadOurOrgApp = () => {
  const intl = useIntl();

  return (
    <div className="grid grid-cols-2 gap-4 max-w-[400px]">
      <a
        href="https://apps.apple.com/us/app/flip-organizer/id6473123342"
        target="_blank"
        className="border-2 rounded-lg p-2 flex items-center gap-5 bg-muted"
      >
        <SiApple className="w-6 h-6" />
        <span className="text-xs">
          {intl.formatMessage({ id: 'pricing.checkin.download' })} <br /> App Store
        </span>
      </a>
      <a
        href="https://play.google.com/store/apps/details?id=vn.flip.organizer"
        target="_blank"
        className="border-2 rounded-lg p-2 flex items-center gap-5 bg-muted"
      >
        <SiGoogleplay className="w-6 h-6" />
        <span className="text-xs">
          {intl.formatMessage({ id: 'pricing.checkin.download' })}
          <br /> Google Play
        </span>
      </a>
    </div>
  );
};
