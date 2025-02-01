import { DEFAULT_LOCALE, LOCALE_EN } from '@/locale/intl-provider-wrapper';
import { format } from 'date-fns';
import { DateTime } from 'luxon';

const monthMap = ['Th01', 'Th02', 'Th03', 'Th04', 'Th05', 'Th06', 'Th07', 'Th08', 'Th09', 'Th10', 'Th11', 'Th12'];
const dayOfWeekLiteral = ['', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy', 'Chủ Nhật'];
const dayOfWeekNumberLong = ['', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ Nhật'];
const dayOfWeekNumberShort = ['', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
const dayOfWeekNumberShortEn = ['', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const stringToLuxonVN = (date: string, locale?: string) =>
  DateTime.fromISO(date)
    .setZone('Asia/Ho_Chi_Minh')
    .setLocale(locale ?? 'vi');

export const formatDateLocalized = (date: DateTime, locale?: string): string => {
  const localizedDate = toVNTimeZoneLuxon(date, locale);
  if (locale && locale !== 'vi') {
    return localizedDate.toFormat('d LLL yyyy'); // Will output like "1 Dec 2024"
  }
  return localizedDate.toFormat('dd/MM/yyyy'); // Vietnamese format
};

export const toVNTimeZoneLuxon = (date: DateTime, locale?: string): DateTime => {
  const updatedDate = date.setZone('Asia/Ho_Chi_Minh').setLocale(locale ?? 'vi');
  return updatedDate;
};

// Ex: 14:00 - 18:30 | Thứ Bảy, 04 Th11, 2023
export const toTimeRangeFormat = (startTimeString: string, endTimeString: string, locale?: string): string => {
  const startTime = DateTime.fromISO(startTimeString)
    .setZone('Asia/Ho_Chi_Minh')
    .setLocale(locale ?? DEFAULT_LOCALE);
  const endTime = DateTime.fromISO(endTimeString)
    .setZone('Asia/Ho_Chi_Minh')
    .setLocale(locale ?? DEFAULT_LOCALE);

  const formattedStartTime = startTime.toFormat('HH:mm');
  const formattedEndTime = endTime.toFormat('HH:mm');

  const dayOfWeek = (locale == LOCALE_EN ? dayOfWeekNumberShortEn : dayOfWeekNumberShort)[startTime.weekday];
  const month = startTime.toFormat('LL');

  const formattedDate = `${dayOfWeek}, ${startTime.toFormat('dd')}/${month}`;

  return `${formattedDate} | ${formattedStartTime} - ${formattedEndTime}`;
};

//Ex: Thứ 2, 3 tháng 10, 2024
export function toVnDateFormat(inputDate: DateTime, includeYear?: boolean, locale?: string): string {
  if (!inputDate) return '';
  const date = toVNTimeZoneLuxon(inputDate, locale);
  return includeYear ? date.toFormat('EEEE, d LLLL, yyyy') : date.toFormat('EEEE, d LLLL');
}

// Ex: T4, 06/08
export function toVnShortDateFormat(inputDate: DateTime, includeYear?: boolean, locale?: string): string {
  if (!inputDate) return '';
  const date = toVNTimeZoneLuxon(inputDate, locale);
  const dayOfWeek = (locale == LOCALE_EN ? dayOfWeekNumberShortEn : dayOfWeekNumberShort)[date.weekday];
  const day = date.toFormat('dd');
  const month = date.toFormat('MM');
  const year = date.toFormat('yyyy');

  const dateParts = [day, month];

  if (includeYear) {
    dateParts.push(year);
  }

  return `${dayOfWeek}, ${dateParts.join('/')}`;
}

export function formatDate(date: DateTime, locale?: string) {
  return formatDateLocalized(date, locale).toLocaleString();
}

export function getDayName(date: DateTime, locale?: string) {
  return toVNTimeZoneLuxon(date, locale).toFormat('EEEE');
}

export function formatTime(date: DateTime, locale?: string) {
  return toVNTimeZoneLuxon(date, locale).toFormat('HH:mm');
}

export function formatTimeAndDate(date: DateTime, locale?: string) {
  return `${formatTime(date, locale)}, ${formatDate(date, locale)}`;
}

export function formatEventDateRange(params: { startAt: Date; endAt: Date; locale?: string }) {
  const { startAt, endAt, locale } = params;
  const vietnameseDays = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
  const englishDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  // Get the day of the week in Vietnamese
  const dayOfWeek = (locale === LOCALE_EN ? englishDays : vietnameseDays)[startAt.getDay()];

  // Format the date (MM/dd)
  const formattedDate = format(startAt, locale === LOCALE_EN ? 'MM/dd/yyyy' : 'dd/MM/yyyy');

  // Format the start and end times (HH:mm)
  const startTime = format(startAt, 'HH:mm');
  const endTime = format(endAt, 'HH:mm');

  // Combine the parts into the final string
  return `${dayOfWeek}, ${formattedDate} • ${startTime} - ${endTime}`;
}
