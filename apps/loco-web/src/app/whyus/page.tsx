'use client';
import { Button } from '@/components/shadcn/ui/button';
import { Card } from '@/components/shadcn/ui/card';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/shadcn/ui/table';

import { DownloadOurOrgApp } from '@/components/organizer/DownloadOurApp';
import { Badge } from '@/components/shadcn/ui/badge';
import Icon from '@/components/shadcn/ui/Icon';
import { Separator } from '@/components/shadcn/ui/separator';
import { FlipLayout } from '@/containers/flip-layout';
import { cn } from '@/lib/utils';
import { useLoginGate } from '@/state-management/hooks/useLoginGate';
import { Check, Circle, icons } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
;

export default function PricingPage() {
  const intl = useIntl();
  const router = useRouter();
  const { checkLogin } = useLoginGate();

  const PricingCard = ({
    title,
    subtitle,
    content,
    featureTagline,
    features,
    buttonText,
    isPrimary = false,
  }: {
    title: string;
    subtitle: string;
    content?: React.ReactNode;
    featureTagline?: string;
    features?: string[];
    buttonText?: string;
    isPrimary?: boolean;
  }) => (
    <Card className={cn(`p-6 flex flex-col justify-between max-w-[400px] gap-8`)}>
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="">{subtitle}</p>
        <div>{content}</div>

        {featureTagline && <p className="text-base font-bold">{featureTagline}</p>}

        {features && (
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <span className="text-green-400 mr-2">✓</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      {buttonText && (
        <Button
          variant={'outline'}
          size={'lg'}
          className={`p-4 ${isPrimary ? 'bg-yellow-400 text-black hover:border-white' : 'bg-transparent border-white hover:bg-white hover:text-black'}`}
        >
          {buttonText}
        </Button>
      )}
    </Card>
  );

  const ButtonPricing = ({ text, url, isPrimary = false }: { text: string; url: string; isPrimary?: boolean }) => {
    return (
      <a href={url} className="flex flex-row justify-center w-full">
        <Button variant={'outline'} size={'lg'} fullWidth={true}>
          {text}
        </Button>
      </a>
    );
  };

  const FeatureCard = ({
    title,
    iconName,
    features,
    isPrimary = false,
  }: {
    title: string;
    iconName: keyof typeof icons;
    features: string[];
    isPrimary?: boolean;
  }) => (
    <Card
      className={`min-h-[300px] max-w-[280px]  bg-transparent rounded-md p-4 ${isPrimary ? 'border-2 border-yellow-400' : ''}`}
    >
      <div className="flex flex-col gap-3">
        <div className="flex flex-row gap-2 min-h-14">
          <div className="border border-neutral-400 rounded-full w-7 h-7 items-center flex flex-col justify-center">
            <div className="w-7 flex justify-center">
              <Icon name={iconName} size={16} />
            </div>
          </div>
          <h3 className="text-lg font-medium">{title}</h3>
        </div>
        <Separator className="border-1 border-neutral-400" />
        <ul className="space-y-3">
          {features.map((feature, index) => {
            const inProgress = feature.includes('*');
            return (
              <li key={index} className="flex items-start">
                <div className="pr-2">
                  {inProgress ? (
                    <Circle size={14} color="orange" className="pt-1" />
                  ) : (
                    <Check size={16} color="green" className="pt-1" />
                  )}
                </div>
                <span className="text-sm">{feature}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </Card>
  );

  const SectionTitle = ({
    line1,
    line2,
    center = false,
    hightLightLine2 = false,
  }: {
    line1: string;
    line2: string;
    center?: boolean;
    hightLightLine2?: boolean;
  }) => {
    const gradientTextClass =
      'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400 text-4xl sm:text-5xl md:text-6xl font-bold';
    const textTitleClass = ' text-4xl sm:text-5xl md:text-6xl font-bold';

    return (
      <div
        className={cn(
          'flex flex-col gap-4',
          center ? 'justify-center items-center text-center' : 'justify-start items-start'
        )}
      >
        <h1 className={textTitleClass}>
          <span className={cn(hightLightLine2 ? textTitleClass : gradientTextClass)}>{line1}</span>
        </h1>
        <p className={cn(hightLightLine2 ? gradientTextClass : textTitleClass)}>{line2}</p>
      </div>
    );
  };

  const PricingTable = () => {
    const feeStructure = [
      {
        title: intl.formatMessage({ id: 'pricing.package.payment' }),
        fee: '6%',
      },
      {
        title: intl.formatMessage({ id: 'pricing.package.issue' }),
        fee: '15,000đ',
      },
    ];

    return (
      <Table className="text-base">
        <TableCaption>{intl.formatMessage({ id: 'pricing.package.note' })}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[140px]">{intl.formatMessage({ id: 'pricing.package.fee' })}</TableHead>
            <TableHead className="text-right">{intl.formatMessage({ id: 'pricing.package.each' })}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {feeStructure.map((fee, idx) => (
            <TableRow key={idx}>
              <TableCell className="font-medium w-full">{fee.title}</TableCell>
              <TableCell className="text-right font-bold">{fee.fee}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  const PricingTableEnterprise = () => {
    const feeStructure = [
      {
        title: intl.formatMessage({ id: 'pricing.package.payment' }),
        fee: intl.formatMessage({ id: 'pricing.package.call' }),
      },
      {
        title: intl.formatMessage({ id: 'pricing.package.issue' }),
        fee: intl.formatMessage({ id: 'pricing.package.call' }),
      },
    ];

    return (
      <Table className="text-base">
        <TableHeader>
          <TableRow>
            <TableHead>{intl.formatMessage({ id: 'pricing.package.fee' })}</TableHead>
            <TableHead className="text-right">{intl.formatMessage({ id: 'pricing.package.each' })}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {feeStructure.map((fee, idx) => (
            <TableRow key={idx}>
              <TableCell className="font-medium">{fee.title}</TableCell>
              <TableCell className="text-right">{fee.fee}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  //-------
  const textBodyClass = ' text-sm sm:text-base md:text-lg font-medium max-w-[550px]';

  const SubSectionTitle = ({ line1, line2, center = false }: { line1: string; line2: string; center?: boolean }) => {
    const gradientTextClass =
      'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400 text-3xl sm:text-4xl md:text-5xl font-bold';
    const textTitleClass = ' text-3xl sm:text-4xl md:text-5xl font-bold';

    return (
      <div className={cn('flex flex-col gap-3', center ? 'justify-center items-center' : 'justify-start items-start')}>
        <h1 className={textTitleClass}>
          <span className={`${gradientTextClass}`}>{line1}</span>
        </h1>
        <p className={`${textTitleClass} leading-12`}>{line2}</p>
      </div>
    );
  };

  const SectionTemplate = ({
    title1,
    title2 = '',
    content,
    image,
    video,
    centerTitle = false,
    ltr = true,
  }: {
    title1: string;
    title2?: string;
    content: React.ReactNode;
    image?: string;
    video?: string;
    centerTitle?: boolean;
    ltr?: boolean;
  }) => {
    const img = (
      <div className="relative max-w-[450px] w-full min-h-[400px] md:min-h-[550px]">
        {image && <Image src={image} alt={title1} fill={true} className="object-cover rounded-sm" />}
        {video && (
          <video className="object-cover" autoPlay loop muted playsInline>
            <source src={video} type="video/webm" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
    );

    const text = (
      <div className="space-y-6">
        <SubSectionTitle line1={title1} line2={title2} center={centerTitle} />
        {content}
      </div>
    );
    return (
      <div className="flex flex-col md:flex-row mx-auto items-center gap-8 w-full">
        {ltr ? img : text}
        {ltr ? text : img}
      </div>
    );
  };

  const TicketSystemSection = (
    <SectionTemplate
      title1={intl.formatMessage({ id: 'pricing.ticketing.title1' })}
      title2={intl.formatMessage({ id: 'pricing.ticketing.title2' })}
      video="https://flivnewbucket.s3.ap-southeast-1.amazonaws.com/uploads/assets/ticket-reservation.webm"
      centerTitle={false}
      ltr={false}
      content={
        <>
          <p className={textBodyClass}>{intl.formatMessage({ id: 'pricing.ticketing.subtitle' })}</p>
        </>
      }
    />
  );

  const CheckinSection = (
    <SectionTemplate
      title1={intl.formatMessage({ id: 'pricing.checkin.title1' })}
      title2={intl.formatMessage({ id: 'pricing.checkin.title2' })}
      image="https://flivnewbucket.s3.ap-southeast-1.amazonaws.com/uploads/assets/landing/phone.webp"
      centerTitle={false}
      ltr={false}
      content={
        <>
          <p className={textBodyClass}>
            {intl.formatMessage({ id: 'pricing.checkin.subtitle1' })}
            <br />
            {intl.formatMessage({ id: 'pricing.checkin.subtitle2' })}
          </p>
          <DownloadOurOrgApp />
        </>
      }
    />
  );

  const [dataImg, setDataImg] = useState(
    'https://flivnewbucket.s3.ap-southeast-1.amazonaws.com/uploads/assets/landing/data/1.webp'
  );
  const [selectedIdx, setSelectedIdx] = useState(0);

  const DataSection = (
    <div className="mx-auto flex flex-col items-center gap-8 w-full">
      {/* Text */}
      <div className="flex flex-col gap-8 justify-center items-center w-full">
        <SubSectionTitle
          line1={intl.formatMessage({ id: 'pricing.data.title1' })}
          line2={intl.formatMessage({ id: 'pricing.data.title2' })}
          center={true}
        />
        <p className={cn(textBodyClass, 'text-center')}>
          {intl.formatMessage({ id: 'pricing.data.subtitle1' })}
          <br />
          {intl.formatMessage({ id: 'pricing.data.subtitle2' })}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full h-full">
          <div className="flex flex-col gap-4 flex-[2]">
            {[
              intl.formatMessage({ id: 'pricing.data.props.1' }),
              intl.formatMessage({ id: 'pricing.data.props.2' }),
              intl.formatMessage({ id: 'pricing.data.props.3' }),
            ].map((item, index) => (
              <div
                key={index}
                className={cn(
                  index === selectedIdx ? 'bg-gray-700' : '',
                  'flex w-full items-center space-x-4 p-3 border border-gray-700 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors'
                )}
                onClick={() => {
                  setSelectedIdx(index);
                  const imgIdx = index + 1;
                  setDataImg(
                    `https://flivnewbucket.s3.ap-southeast-1.amazonaws.com/uploads/assets/landing/data/${imgIdx}.webp`
                  );
                }}
              >
                <span className="text-2xl text-cyan-400">{index + 1}</span>
                <p>{item}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-[6] relative w-full min-h-[250px] md:min-h-[500px]">
            <Image src={dataImg} alt="Data" fill={true} quality={75} className="object-cover rounded-md" />
          </div>
        </div>
      </div>

      {/* Image */}
    </div>
  );

  const demoOnClick = () => {
    router.push('/demo');
  };

  const onStartClick = async () => {
    const loggedIn = await checkLogin();
    if (!loggedIn) return;
    router.push('/organizer');
  };

  const HeroSection = (
    <div className="flex flex-col gap-6 items-center justify-center bg-[url('https://flivnewbucket.s3.ap-southeast-1.amazonaws.com/uploads/assets/landing/ctabg.webp')]  bg-cover bg-center w-full h-[540px] md:h-screen max-h-[650px] mx-auto">
      <SectionTitle line1={intl.formatMessage({ id: 'pricing.hero.title' })} line2="" center={true} />
      <p className={cn(textBodyClass, 'text-center max-w-[640px]')}>
        {intl.formatMessage({ id: 'pricing.hero.subtitle1' })}
        <br />
        {intl.formatMessage({ id: 'pricing.hero.subtitle2' })}
      </p>

      <div className="flex flex-row gap-4">
        {/* <Button
          variant="default"
          size={'lg'}
          onClick={demoOnClick}
          className="w-full md:w-36 md:h-12 bg-transparent border-white hover:bg-white hover:text-black transition-colors"

        >
          <p className="font-bold">Demo Event</p>
        </Button> */}

        <Button
          variant="outline"
          size={'lg'}
          onClick={onStartClick}
          className="w-full md:w-36 md:h-12 transition-colors"
        >
          <p className="font-bold">{intl.formatMessage({ id: 'pricing.hero.cta' })}</p>
        </Button>
      </div>
    </div>
  );

  const PackageSection = () => (
    <div className="flex flex-col justify-center gap-6">
      <SectionTitle
        line1={intl.formatMessage({ id: 'pricing.package.title1' })}
        line2={intl.formatMessage({ id: 'pricing.package.title2' })}
        center={true}
        hightLightLine2={true}
      />

      <div className="grid grid-rows-1 md:grid-cols-2 gap-6 py-8">
        <PricingCard
          title={intl.formatMessage({ id: 'pricing.package.package1.title' })}
          subtitle={intl.formatMessage({ id: 'pricing.package.package1.subtitle' })}
          content={<PricingTable />}
        />
        {/* <div>
          <Separator orientation="vertical" />
        </div> */}
        <PricingCard
          title={intl.formatMessage({ id: 'pricing.package.package2.title' })}
          subtitle={intl.formatMessage({ id: 'pricing.package.package2.subtitle' })}
          content={<PricingTableEnterprise />}
        />
      </div>

      <div className="flex flex-col sm:flex-row justify-between py-2 gap-6">
        <ul className="space-y-2">
          <p className="text-base font-bold">{intl.formatMessage({ id: 'pricing.package.contact.title' })}</p>
          {[
            intl.formatMessage({ id: 'pricing.package.contact.subtitle1' }),
            intl.formatMessage({ id: 'pricing.package.contact.subtitle2' }),
          ].map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check size={18} color="green" className="pt-1 mr-2" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <div className="flex flex-col gap-2 w-full md:max-w-[350px]">
          {/* <ButtonPricing text="Bắt Đầu >" url="/organizer" isPrimary={true} /> */}
          <ButtonPricing
            text={intl.formatMessage({ id: 'pricing.package.contact.cta' })}
            url="https://cal.com/flip-vn/30min"
          />
        </div>
      </div>
    </div>
  );

  const FeaturesSection = () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col justify-start items-start w-full gap-2">
        {/* <p className={cn('text-3xl font-bold')}>Các Tính Năng</p> */}
        <p className={cn('text-3xl font-bold')}>{intl.formatMessage({ id: 'pricing.feature.title' })}</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {featureCards.map((feature, index) => (
          <div key={index}>
            <FeatureCard
              title={feature.title}
              iconName={feature.iconName as keyof typeof icons}
              features={feature.features}
            />
          </div>
        ))}
        <Card className={`min-h-[300px] max-w-[280px] bg-transparent rounded-md p-8 border-yellow-200 border}`}>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2 min-h-14">
              <div className="border border-neutral-400 rounded-full !w-7 h-7 items-center flex flex-col justify-center">
                <div className="w-7 flex justify-center">
                  <Icon name={'Lightbulb'} size={16} />
                </div>
              </div>
              <h3 className="text-lg font-medium">{'Không thấy tính năng bạn cần?'}</h3>
            </div>
            <a data-tally-open="wgAoVJ" className="hover:cursor-pointer">
              {intl.formatMessage({ id: 'header.request' })} {'>'}
            </a>
          </div>
        </Card>
      </div>
      <p className="text-sm">* Tính năng đang phát triển</p>
    </div>
  );

  return (
    <div className="">
      <FlipLayout>
        <div className="flex flex-col w-full justify-center items-center px-4 lg:px-0 ">
          <div className="flex flex-col gap-20 w-full pt-5 max-w-[1200px] justify-center items-center ">
            <div className="flex flex-col gap-4 w-full">
              <div className="mb-2">
                <Badge>{intl.formatMessage({ id: 'pricing.note' })}</Badge>
              </div>

              {HeroSection}
            </div>

            {/* <Separator /> */}

            {DataSection}
            {TicketSystemSection}

            {CheckinSection}

            {/* <Separator /> */}

            <PackageSection />
            <FeaturesSection />
            {/* {OutlineSection} */}
          </div>
        </div>
      </FlipLayout>
    </div>
  );
}

const featureCards = [
  {
    title: 'Đặt vé dễ dàng',
    iconName: 'Ticket',
    features: ['Trang sự kiện tùy chỉnh', 'Nhiều loại vé', 'Giữ chỗ trên sơ đồ chỗ ngồi', 'Form đăng ký tùy chỉnh*'],
  },
  {
    title: 'Phân tích dữ liệu thời gian thực',
    iconName: 'AreaChart',
    features: [
      'Báo cáo doanh thu',
      'Báo cáo lưu lượng theo từng kênh',
      'Báo cáo chuyển đổi theo từng kênh',
      'Báo cáo địa điểm khu vực mua vé',
    ],
  },
  {
    title: 'Quản lý sự kiện thời gian thực',
    iconName: 'GanttChart',
    features: [
      'Soát vé với ứng dụng Organizer',
      'Phân quyền thành viên vận hành',
      'Quản lý tiến độ soát vé theo hạng ghế',
      'Quản lý đơn hàng',
    ],
  },
  {
    title: 'Công cụ tiếp thị',
    iconName: 'Megaphone',
    features: [
      'Tiếp thị qua email',
      'Hồ sơ tổ chức',
      'Quảng cáo trên Flip',
      'Quảng cáo trên Facebook và Instagram của Flip',
      'Hệ thống mã khuyến mãi',
    ],
  },
  {
    title: 'Thanh toán an toàn',
    iconName: 'CreditCard',
    features: ['Xử lý thanh toán tích hợp', 'Tùy chỉnh chính sách hoàn tiền ', 'Hệ thống hoàn tiền đơn giản'],
  },
];

function ValuePropCard({ line1, line2, imgUrl }: { line1: string; line2: string; imgUrl: string }) {
  return (
    <div className="flex flex-col gap-4 justify-start">
      <Card className="h-48 flex flex-row shadow-none border-zinc-400">
        <Image src={imgUrl} alt="value props" className="w-full h-full object-cover rounded-xl border-none" />
      </Card>

      <div>
        <p className="text-xl px-1 font-semibold">{line1}</p>
        <p className="text-xl px-1 font-semibold">{line2}</p>
      </div>
    </div>
  );
}
