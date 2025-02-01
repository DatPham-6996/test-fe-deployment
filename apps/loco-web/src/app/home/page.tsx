'use client';

import { Button } from '@/components/shadcn/ui/button';
import { FlipLayout } from '@/containers/flip-layout';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import { TypeAnimation } from 'react-type-animation';

const headerText =
  'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400 font-bold text-5xl sm:text-6xl md:text-7xl leading-20';

const WordsTyping = () => {
  const [isTyping, setIsTyping] = useState(true);

  return (
    <div className="min-h-16 md:min-h-24">
      <h1>
        <span className={headerText}>
          <TypeAnimation
            sequence={[
              'Khám phá',
              () => setIsTyping(false),
              3000,
              () => setIsTyping(true),
              'Tổ chức',
              () => setIsTyping(false),
              3000,
              () => setIsTyping(true),
            ]}
            wrapper="span"
            cursor={false}
            repeat={Infinity}
            speed={20}
          />
          {/* {isTyping && <BlinkingUnderscore />} */}
        </span>
      </h1>
    </div>
  );
};

export default function HomePage() {
  const intl = useIntl();
  const textBodyClass = 'text-white text-sm sm:text-base md:text-lg font-medium max-w-[550px]';

  const HeroSection = (
    <div className="flex flex-col md:flex-row gap-4 md:justify-between items-center w-full px-3">
      {/* Left */}
      <div className="flex flex-col gap-10 w-full">
        <div className="flex flex-col justify-center md:justify-start md:items-start md:gap-0 w-full">
          <WordsTyping />

          <h1 className="md:text-start ">
            <span className={cn(headerText)}>sự kiện độc đáo</span>
          </h1>
        </div>

        <div className="flex flex-col gap-6 w-full">
          <div className={cn(textBodyClass, 'flex flex-col gap-1 md:text-start')}>
            <p>Tạo trang sự kiện, bán vé và quản lý đội nhóm.</p>
            <p>Tổ chức sự kiện đáng nhớ cùng Flip!</p>
          </div>

          <div className="grid grid-cols-2 gap-4 max-w-[550px]">
            <a href="/whyus" className="w-full">
              <Button
                variant="outline"
                className="w-full md:w-36 md:h-12 max-w-[180px] bg-transparent border border-[#cece3b] hover:bg-[#cece3b] hover:text-black transition-colors "
              >
                <p className="font-bold">Tổ Chức</p>
              </Button>
            </a>

            {/* <a href="/discover" className="w-full">
              <Button
                variant="outline"
                className="w-full md:h-12 bg-transparent border-white hover:bg-white hover:text-black transition-colors"
              >
                <p className="font-bold">Khám Phá</p>
              </Button>
            </a> */}
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="flex flex-col max-w-[500px] pt-3">
        <video className="object-cover" autoPlay loop muted playsInline>
          <source
            src="https://flivnewbucket.s3.ap-southeast-1.amazonaws.com/uploads/assets/Hero.webm"
            type="video/webm"
          />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );

  return (
    <div className="text-white bg-black">
      <FlipLayout showLegal>
        <div className="flex flex-col w-full justify-center items-center px-4">
          <div className="flex flex-col w-full pt-3 sm:pt-16 max-w-[1200px] justify-center items-center">
            {HeroSection}
          </div>
        </div>
      </FlipLayout>
    </div>
  );
}
