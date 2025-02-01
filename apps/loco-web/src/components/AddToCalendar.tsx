import { FlipEvent, Maybe } from '@/lib/__generated__/graphql';
import { useLogEvent } from '@/lib/hooks/useLogEvent';
import { format } from 'date-fns-tz';
import { useIntl } from 'react-intl';
import { Button, ButtonProps } from './shadcn/ui/button';

export function AddToCalendarButton({
  event,
  ...props
}: {
  event: { id: string; name: string; startAt: string; endAt: string; address?: string };
} & ButtonProps) {
  const { formatMessage } = useIntl();
  const { logEvent } = useLogEvent();
  const formatDateTime = (params: { date: string; time: string }): string => {
    return params.date.replace(/-/g, '') + 'T' + params.time.replace(/:/g, '') + '00';
  };

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const startDate = format(new Date(event.startAt), 'yyyy-MM-dd', { timeZone: timezone });
  const startTime = format(new Date(event.startAt), 'HH:mm', { timeZone: timezone });
  const endDate = format(new Date(event.endAt), 'yyyy-MM-dd', { timeZone: timezone });
  const endTime = format(new Date(event.endAt), 'HH:mm', { timeZone: timezone });
  const encodedEventName = encodeURIComponent(event.name);
  const encodedLocation = encodeURIComponent(event.address ?? '');
  const encodedTimeZone = encodeURIComponent(timezone);
  const dates = `${formatDateTime({ date: startDate, time: startTime })}/${formatDateTime({ date: endDate, time: endTime })}`;

  const ggCalendarUrl = `https://calendar.google.com/calendar/u/0/r/eventedit?dates=${dates}&ctz=${encodedTimeZone}&text=${encodedEventName}&location=${encodedLocation}`;

  const handleClick = () => {
    logEvent({
      eventName: 'add_to_calendar_button_clicked',
      value: event.id,
      metadata: { ...event },
      event: event as Maybe<FlipEvent>,
    });

    window.open(ggCalendarUrl.toString(), '_blank'); // Open in new tab
  };

  return (
    <Button onClick={handleClick} {...props}>
      {formatMessage({ id: 'common.addToCalendar' })}
    </Button>
  );
}
