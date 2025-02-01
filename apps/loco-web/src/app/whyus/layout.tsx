import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { handle: string } }): Promise<Metadata> {
  return {
    title: 'Quản lý kiện cùng Flip',
    description: 'Tìm hiểu về các tính năng và ưu điểm của Flip',
    openGraph: {
      title: 'Vì sao nên chọn Flip',
      description: 'Nền tảng bán vé sự kiện hàng đầu tại Việt Nam',
      images: ['https://flivnewbucket.s3.ap-southeast-1.amazonaws.com/uploads/assets/logo/flipfull.jpg'],
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
