import { Metadata } from 'next';
import DiscoverPage from './discover/page';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL ?? 'https://flip.vn'),
  keywords: [
    'tickets',
    'events',
    'buy tickets',
    'ticketing platform',
    'flip.vn',
    'ticketbox.vn',
    'quickom.net',
    'sự kiện',
    'vé sự kiện',
    'âm nhạc',
    'sự kiện âm nhạc',
    'vé điện tử',
    'Nền Tảng Đặt Vé',
    'flip',
    'mua vé',
    'event in vietnam',
    'event ticketing',
    'tổ chức sự kiện',
  ],
  title: {
    default: 'Flip | Nơi sự kiện bắt đầu',
    template: '%s | Flip',
  },
  openGraph: {
    description: 'Sống trọn từng khoảnh khắc. Tìm kiếm, tổ chức sự kiện cùng Flip',
    images: ['https://flivnewbucket.s3.ap-southeast-1.amazonaws.com/uploads/assets/logo/flipfull.jpg'],
    url: process.env.NEXT_PUBLIC_BASE_URL ?? 'https://flip.vn',
    siteName: 'Flip',
    type: 'website',
  },
};

export default function Page() {
  return <DiscoverPage />;
}
