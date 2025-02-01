'use client';

import { FlipChannel } from '@/components/icon/FlipChannel';
import { Avatar, AvatarFallback } from '@/components/shadcn/ui/avatar';
import { Button } from '@/components/shadcn/ui/button';
import { Calendar } from '@/components/shadcn/ui/calendar';
import { Card } from '@/components/shadcn/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/shadcn/ui/popover';
import { Progress } from '@/components/shadcn/ui/progress';
import { Separator } from '@/components/shadcn/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/shadcn/ui/table';
import { Tabs, TabsList, TabsTrigger } from '@/components/shadcn/ui/tabs';
import {
  useGetEventViewsChartGroupByChannelQuery,
  useGetTotalEventDetailsViewsQuery,
  useGetTotalEventStatsGroupByChannelQuery,
  useGetTotalOrdersByLocationQuery,
} from '@/lib/__generated__/graphql';
import { useIsDarkTheme } from '@/state-management/hooks/useIsDarkMode';
import { SiFacebook, SiInstagram } from '@icons-pack/react-simple-icons';
import { format, subDays } from 'date-fns';
import { enUS, vi } from 'date-fns/locale';
import { CalendarIcon, Eye } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { isMobile } from 'react-device-detect';
import { useIntl } from 'react-intl';
import { PulseLoader } from 'react-spinners';
import { Bar, BarChart, CartesianGrid, Cell, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { getStrokeColor } from './utils/rechart';

import { Tooltip as TooltipCN, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/shadcn/ui/tooltip';
import { cn } from '@/lib/utils';
import { useLocale } from '@/locale/intl-provider-wrapper';
import { currentEventState } from '@/state-management/organizer/atoms/current-event';
import { useRouter } from 'next-nprogress-bar';
import { useRecoilState } from 'recoil';
import './styles/recharts.css';

// TODO: Move to global state
// TODO: Move to use tanstack table https://ui.shadcn.com/docs/components/data-table

export default function MarketingPage() {
  const { formatMessage } = useIntl();
  const { theme, systemTheme } = useTheme();
  const router = useRouter();
  const { locale } = useLocale();
  const dateLocale = locale === 'vi' ? vi : enUS;
  const isDarkMode = useIsDarkTheme();
  const [currentEvent] = useRecoilState(currentEventState);

  useEffect(() => {
    if (!currentEvent) {
      router.replace('/organizer');
    }
  }, [currentEvent, router]);

  const eventId = currentEvent?.id ?? '';

  const [dateRange, setDateRange] = useState<DateRange>({
    from: subDays(new Date(), 15),
    to: new Date(),
  });

  const { data: getTotalOrdersByLocationData, loading: isGetTotalOrdersByLocationLoading } =
    useGetTotalOrdersByLocationQuery({
      variables: { input: { eventId } },
    });
  const getTotalOrdersByLocation = getTotalOrdersByLocationData?.getTotalOrdersByLocation ?? {
    totalByCity: [],
    totalOfAllCities: 0,
    cities: [],
  };

  const { data: getTotalEventStatsGroupByChannelData, loading: isGetTotalEventStatsGroupByChannelLoading } =
    useGetTotalEventStatsGroupByChannelQuery({
      variables: { input: { eventId } },
    });

  const getTotalEventStatsGroupByChannel = getTotalEventStatsGroupByChannelData?.getTotalEventStatsGroupByChannel ?? {
    channels: [],
    totalViewCount: 0,
  };

  const {
    data: getEventViewsChartGroupByChannelData,
    loading: isGetEventViewsChartGroupByChannelLoading,
    refetch: refetchEventViewsChartGroupByChannel,
  } = useGetEventViewsChartGroupByChannelQuery({
    variables: { input: { eventId, from: dateRange?.from, to: dateRange?.to } },
  });

  const getEventViewsChartGroupByChannel = getEventViewsChartGroupByChannelData?.getEventViewsChartGroupByChannel ?? {
    xs: [],
    ys: [],
    unit: 'day',
  };

  const { data: getTotalEventDetailsViewsData, loading: isGetTotalEventDetailsViewsLoading } =
    useGetTotalEventDetailsViewsQuery({
      variables: { input: { eventId } },
    });

  const getTotalEventDetailsViews = getTotalEventDetailsViewsData?.getTotalEventDetailsViews ?? {
    last24HourCount: 0,
    sameDayLastWeekCount: 0,
    thisMonthCount: 0,
    lastMonthCount: 0,
  };

  const { xs, ys } = getEventViewsChartGroupByChannel;

  const chartData = xs.map((date, index) => {
    const entry: TODO = { date: format(new Date(date), 'dd/MM') };
    ys.filter((channel) => channel.name !== 'total').forEach((channel) => {
      entry[channel.name] = channel.data[index];
    });

    return entry;
  });

  const [totalDisplayEventStatsGroupByChannel, setTotalDisplayEventStatsGroupByChannel] = useState(
    getTotalEventStatsGroupByChannel.channels.slice(0, 4)
  );

  const [totalDisplayOrdersByLocation, setTotalDisplayOrdersByLocation] = useState(
    getTotalOrdersByLocation.totalByCity.slice(0, 4)
  );

  useEffect(() => {
    if (!isGetTotalOrdersByLocationLoading && !isGetTotalEventStatsGroupByChannelLoading) {
      setTotalDisplayEventStatsGroupByChannel(getTotalEventStatsGroupByChannel.channels);
      setTotalDisplayOrdersByLocation(getTotalOrdersByLocation.totalByCity);
    }
  }, [
    isGetTotalOrdersByLocationLoading,
    isGetTotalEventStatsGroupByChannelLoading,
    getTotalEventStatsGroupByChannel.channels,
    getTotalOrdersByLocation.totalByCity,
  ]);

  const MarketingTabsSegment = (
    <Tabs defaultValue="DASHBOARD" className="space-y-4">
      <TabsList className="bg-zinc-200 md:flex grid grid-cols-2 h-auto m-auto md:m-0 md:w-fit">
        <TabsTrigger value="DASHBOARD"> {formatMessage({ id: 'organizer.marketing.dashboard' })}</TabsTrigger>
        <TabsTrigger value="EMAIL_CAMPAIGNS">{formatMessage({ id: 'organizer.marketing.emailCampaigns' })}</TabsTrigger>
        <TabsTrigger value="LINKS"> {formatMessage({ id: 'organizer.marketing.links' })}</TabsTrigger>
        <TabsTrigger value="PROMOTION"> {formatMessage({ id: 'organizer.marketing.promotion' })}</TabsTrigger>
      </TabsList>
    </Tabs>
  );

  const onDateRangePickerSelect = async (params: DateRange | undefined) => {
    if (!params || !dateRange) {
      return;
    }

    setDateRange(params);

    await refetchEventViewsChartGroupByChannel({
      input: {
        eventId,
        from: params.from,
        to: params.to ?? params.from,
      },
    });
  };

  const dateRangePicker = (
    <div className="grid gap-2 text-sm font-normal md:w-fit w-full">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'md:justify-start text-left font-normal justify-center my-3 md:my-0',
              !dateRange && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, 'dd LLL, y', { locale: vi })} -{' '}
                  {format(dateRange.to, 'dd LLL, y', { locale: vi })}
                </>
              ) : (
                format(dateRange.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            locale={dateLocale}
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={onDateRangePickerSelect}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );

  // const lineChart = (
  //   <ResponsiveContainer width="100%" height={isMobile ? 450 : 320} className="font-sans text-sm hidden">
  //     <LineChart
  //       data={chartData}
  //       margin={{
  //         top: 5,
  //         right: 30,
  //         left: 30,
  //         bottom: 5,
  //       }}
  //     >
  //       <CartesianGrid vertical={false} horizontal={true} stroke={isDarkMode ? '#27272a' : '#F5F5F5'} />
  //       <XAxis dataKey="date" />
  //       {/* <YAxis /> */}
  //       <Tooltip labelStyle={{ color: 'black' }} />
  //       <Legend align="right" verticalAlign="top" layout="vertical" className="pl-2" />
  //       {ys.map((channel, index) => (
  //         <Line
  //           key={channel.name}
  //           type="monotone"
  //           dataKey={channel.name}
  //           stroke={getStrokeColor({ index, channel: channel.name })}
  //           strokeWidth={2}
  //         />
  //       ))}
  //     </LineChart>
  //   </ResponsiveContainer>
  // );

  const stackBarChart = (
    <ResponsiveContainer width="100%" minHeight={isMobile ? 400 : 300} className="font-sans text-sm">
      <BarChart
        data={chartData}
        margin={{
          top: 5,
          bottom: 5,
        }}
      >
        <CartesianGrid vertical={false} horizontal={true} stroke={isDarkMode ? '#737373' : '#F5F5F5'} />
        <XAxis dataKey="date" axisLine={false} tickLine={false} padding={{ left: isMobile ? 5 : 25 }} />
        <YAxis hide={false} axisLine={false} tickLine={false} />
        <Tooltip labelStyle={{ color: 'black' }} cursor={{ fill: isDarkMode ? '#27272a80' : '#F5F5F5' }} />
        <Legend
          align={isMobile ? 'center' : 'right'}
          verticalAlign={isMobile ? 'bottom' : 'top'}
          layout={isMobile ? 'horizontal' : 'vertical'}
          wrapperStyle={isMobile ? { left: 10 } : { minWidth: 120, paddingLeft: 20 }}
          iconType="circle"
        />
        {ys
          .filter((channel) => channel.name !== 'total')
          .map((channel, index) => {
            return (
              <Bar
                key={channel.name}
                dataKey={channel.name}
                fill={getStrokeColor({ index, channel: channel.name })}
                stackId="viewCount"
                radius={isMobile ? [4, 4, 0, 0] : [5, 5, 0, 0]}
              >
                {chartData.map((entry, index) => {
                  const keys = Object.keys(entry);
                  const values = Object.values(entry);

                  const channelNameIndex = keys.findIndex((key) => key === channel.name);
                  const lastBarIndex = values.findLastIndex((value) => value !== 0);

                  if (channelNameIndex === lastBarIndex) {
                    return <Cell key={`cell-${index}`} />;
                  }

                  return <Cell key={`cell-${index}`} radius={0} />;
                })}
              </Bar>
            );
          })}
      </BarChart>
    </ResponsiveContainer>
  );

  const getChannelLog = (channelName: string) => {
    switch (channelName) {
      case 'flip':
        return <FlipChannel size={36} />;

      case 'facebook':
        return <SiFacebook size={36} />;

      case 'instagram':
        return <SiInstagram size={36} />;

      default:
        return (
          <Avatar className="w-[36px] h-[36px]">
            <AvatarFallback>{channelName.charAt(0)?.toLocaleUpperCase()}</AvatarFallback>
          </Avatar>
        );
    }
  };

  const getCountPercent = (params: { currentCount: number; pastCount: number }) => {
    const { currentCount, pastCount } = params;
    if (currentCount === pastCount) {
      return 0;
    }

    if (pastCount === 0) {
      return currentCount * 100;
    }

    if (currentCount > pastCount) {
      return Math.round(((currentCount - pastCount) / pastCount) * 100);
    }

    return Math.round(((pastCount - currentCount) / pastCount) * 100);
  };

  const is24hViewCountIncreased =
    getTotalEventDetailsViews.last24HourCount - getTotalEventDetailsViews.sameDayLastWeekCount >= 0;

  const isThisMonthViewCountIncreased =
    getTotalEventDetailsViews.thisMonthCount - getTotalEventDetailsViews.lastMonthCount >= 0;

  return (
    <div className="container px-5 md:px-20 mb-20">
      <h1 className="font-semibold text-[34px] my-5 text-center md:text-start">{formatMessage({ id: 'organizer.marketing.title' })}</h1>
      {/* {MarketingTabsSegment} */}
      <div className="gap-3 my-4 grid grid-cols-1 md:grid-cols-3">
        <Card className="flex flex-col gap-2 flex-grow p-5 dark:bg-muted">
          <div className="text-sm font-medium flex justify-between">
            {formatMessage({ id: 'organizer.marketing.last24hoursViews' })}
            <Eye size={16} />
          </div>
          <div className="text-2xl font-bold">{getTotalEventDetailsViews.last24HourCount}</div>
          {getTotalEventDetailsViews.sameDayLastWeekCount && (
            <div className="text-xs font-normal">
              {is24hViewCountIncreased && (
                <span className="font-medium text-green-600">
                  +
                  {getCountPercent({
                    currentCount: getTotalEventDetailsViews.last24HourCount,
                    pastCount: getTotalEventDetailsViews.sameDayLastWeekCount,
                  })}
                  {'% '}
                </span>
              )}

              {!is24hViewCountIncreased && (
                <span className="font-medium text-red-400">
                  -
                  {getCountPercent({
                    currentCount: getTotalEventDetailsViews.last24HourCount,
                    pastCount: getTotalEventDetailsViews.sameDayLastWeekCount,
                  })}
                  {'% '}
                </span>
              )}

              {formatMessage(
                { id: 'organizer.marketing.compareWithLastWeek' },
                {
                  result: is24hViewCountIncreased
                    ? formatMessage({ id: 'organizer.marketing.increased' })
                    : formatMessage({ id: 'organizer.marketing.decreased' }),
                }
              )}
            </div>
          )}
        </Card>

        <Card className="flex flex-col gap-2 flex-grow p-5 dark:bg-muted">
          <div className="text-sm font-medium flex justify-between">
            {formatMessage({ id: 'organizer.marketing.thisMonthViews' })}
            <Eye size={16} />
          </div>
          <div className="text-2xl font-bold">{getTotalEventDetailsViews.thisMonthCount}</div>
          {getTotalEventDetailsViews.lastMonthCount && (
            <div className="text-xs font-normal">
              {isThisMonthViewCountIncreased && (
                <span className="font-medium text-green-600">
                  +
                  {getCountPercent({
                    currentCount: getTotalEventDetailsViews.thisMonthCount,
                    pastCount: getTotalEventDetailsViews.lastMonthCount,
                  })}
                  {'% '}
                </span>
              )}

              {!isThisMonthViewCountIncreased && (
                <span className="font-medium text-red-400">
                  -
                  {getCountPercent({
                    currentCount: getTotalEventDetailsViews.thisMonthCount,
                    pastCount: getTotalEventDetailsViews.lastMonthCount,
                  })}
                  {'% '}
                </span>
              )}

              {formatMessage(
                { id: 'organizer.marketing.compareWithLastMonth' },
                {
                  result: isThisMonthViewCountIncreased
                    ? formatMessage({ id: 'organizer.marketing.increased' })
                    : formatMessage({ id: 'organizer.marketing.decreased' }),
                }
              )}
            </div>
          )}
        </Card>
      </div>

      <Card className="mb-4 p-5 pb-3 dark:bg-muted">
        <div className="flex justify-between pb-5 flex-wrap md:mb-6 mb-3">
          <div>
            <div className="text-[22px] font-semibold">{formatMessage({ id: 'organizer.marketing.click' })}</div>
            <div className="text-base font-normal text-neutral-500">
              {formatMessage({ id: 'organizer.marketing.viewChartDes' })}
            </div>
          </div>
          {dateRangePicker}
        </div>

        {stackBarChart}
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Card className="flex-grow h-fit pb-2 dark:bg-muted">
          <div className="flex justify-between p-5 pb-2 flex-wrap">
            <div>
              <div className="text-[22px] font-semibold">{formatMessage({ id: 'organizer.marketing.channel' })}</div>
              <div className="text-base font-normal text-neutral-500">
                {formatMessage({ id: 'organizer.marketing.channelDes' })}
              </div>
            </div>
          </div>

          <Separator />

          {isGetTotalEventStatsGroupByChannelLoading && <PulseLoader size={12} className="text-center pt-10 pb-6" />}

          {!isGetTotalEventStatsGroupByChannelLoading && (
            <div className="px-3 w-full">
              <Table>
                <TableHeader className="w-full">
                  <TableRow className="h-16 dark:border-[#737373] ">
                    <TableHead>{formatMessage({ id: 'organizer.marketing.channel' })}</TableHead>
                    <TableHead className="text-center">{formatMessage({ id: 'organizer.marketing.click' })}</TableHead>
                    <TableHead className="text-center">
                      {formatMessage({ id: 'organizer.marketing.purchase' })}
                    </TableHead>
                    <TableHead className="text-center">
                      <TooltipProvider>
                        <TooltipCN>
                          <TooltipTrigger asChild>
                            <Button variant="ghost">
                              {formatMessage({ id: 'organizer.marketing.conversionRate' })}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            {formatMessage({ id: 'organizer.marketing.conversionRateTip' })}
                          </TooltipContent>
                        </TooltipCN>
                      </TooltipProvider>
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {totalDisplayEventStatsGroupByChannel.map((channel) => (
                    <TableRow key={channel.name} className="h-16 dark:border-[#737373]">
                      <TableCell className="text-sm font-medium">
                        <div className="flex items-center">
                          <div>{channel.name}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-base font-medium text-center">{channel.viewCount}</TableCell>
                      <TableCell className="text-base font-medium text-center">{channel.totalBuyers}</TableCell>
                      <TableCell className="text-base font-medium text-center">
                        {Math.round((channel.totalBuyers / channel.viewCount) * 100)}%
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </Card>

        <Card className="flex-grow h-fit pb-2 dark:bg-muted">
          <div className="flex justify-between p-5 pb-2 flex-wrap">
            <div>
              <div className="text-[22px] font-semibold">
                {formatMessage({ id: 'organizer.marketing.purchasedLocation' })}
              </div>
              <div className="text-base font-normal text-neutral-500">
                {formatMessage({ id: 'organizer.marketing.purchasedLocationDes' })}
              </div>
            </div>
          </div>

          <Separator />

          {isGetTotalOrdersByLocationLoading && <PulseLoader size={12} className="text-center pt-10 pb-6" />}

          {!isGetTotalOrdersByLocationLoading && (
            <div className="px-5 pt-7 w-full">
              {totalDisplayOrdersByLocation.map((city) => {
                const buyerRateByLocation = Math.round((city.count / getTotalOrdersByLocation.totalOfAllCities) * 100);
                return (
                  <div key={city.name} className="pb-6">
                    <div>{city.name}</div>
                    <div className="flex items-center">
                      <Progress value={buyerRateByLocation} className="[&>*]:bg-[#FACC15]" />
                      <span className="pl-3">{buyerRateByLocation}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
