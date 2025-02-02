import { DownloadOurOrgApp } from '@/components/organizer/DownloadOurApp';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { isDesktop } from 'react-device-detect';
import { useIntl } from 'react-intl';

export function Footer({
  className,
  showLegal = false,
  showDownloadOrgApp = false,
}: {
  className?: string;
  showLegal?: boolean;
  showDownloadOrgApp?: boolean;
}) {
  const { formatMessage } = useIntl();
  const isProduction = process.env.NEXT_PUBLIC_ENV === 'production';

  return (
    <footer className={cn('w-full border-t mt-16 border-neutral-300/80  dark:border-neutral-700', className)}>
      <div className="mx-auto max-w-[1200px] pt-8 pb-16">
        {showDownloadOrgApp && (
          <div className="w-full flex flex-col justify-start gap-2 pb-8 px-4 sm:px-6">
            <p className="text-xs font-semibold pl-2">{formatMessage({ id: 'footer.downloadOrgApp' })}:</p>
            <DownloadOurOrgApp />
          </div>
        )}

        <div className="grid grid-cols-1 gap-8 px-4 lg:grid-cols-12 md:gap-12 md:px-6">
          {/* Company Info Section - Takes 6 columns */}
          {isDesktop && (
            <div className="lg:col-span-4 space-y-3">
              <h3 className="text-base font-semibold">{formatMessage({ id: 'footer.companyName' })}</h3>
              <div className="flex flex-col space-y-2 text-sm ">
                {/* <p>
                  <span className="font-semibold">Hotline:</span> 0888700902
                </p> */}
                <p>
                  <span className="font-semibold">Email:</span>{' '}
                  <a href="mailto:hello@flip.vn" className="hover:underline">
                    hello@flip.vn
                  </a>
                </p>
                <p>
                  <span className="font-semibold">{formatMessage({ id: 'footer.businessLicense' })}:</span> 0317342563
                </p>
                <p>
                  <span className="font-semibold">{formatMessage({ id: 'footer.firstIssuedOn' })}:</span>{' '}
                  {formatMessage({ id: 'footer.firstIssuedDate' })}
                </p>
                <p>
                  <span className="font-semibold">{formatMessage({ id: 'footer.address' })}:</span> 117/1B, đường Cống
                  Quỳnh, Phường Nguyễn Cư Trinh, Quận 1, TP. Hồ Chí Minh
                </p>
              </div>
            </div>
          )}

          {/* Legal Section - Takes 2 columns */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-base font-semibold">{formatMessage({ id: 'footer.legal' })}</h3>
            <div className="flex flex-col space-y-3">
              {[
                { id: 'term', url: 'https://ticket.flip.vn/legal' },
                { id: 'privacy', url: 'https://ticket.flip.vn/legal/privacy' },
                { id: 'dispute', url: 'https://ticket.flip.vn/legal/dispute' },
                { id: 'payment_privacy', url: 'https://ticket.flip.vn/legal/payment_privacy' },
              ].map((link) => (
                <a key={link.id} href={link.url} className="text-sm " target="_blank">
                  {formatMessage({ id: `footer.${link.id}` })}
                </a>
              ))}
            </div>
            {isProduction && (
              <a
                href="http://online.gov.vn/Home/WebDetails/127460"
                className="block w-[120px] h-[50px] relative"
                target="_blank"
              >
                <img
                  alt="Bộ Công Thương"
                  title="Bộ Công Thương"
                  src="https://flivnewbucket.s3.ap-southeast-1.amazonaws.com/uploads/landing///d85e8c32-1931-4a0f-91a3-3ae333dfc199.webp"
                  className="object-contain w-full h-full"
                />
              </a>
            )}
          </div>

          {/* Resources Section - Takes 2 columns */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-base font-semibold">{formatMessage({ id: 'footer.resources' })}</h3>
            <div className="flex flex-col space-y-3">
              <Link href="/whyus" className="text-sm ">
                {formatMessage({ id: 'footer.whyus' })}
              </Link>
              <Link href="https://ticket.flip.vn/blog" target="_blank" className="text-sm ">
                {formatMessage({ id: 'footer.blog' })}
              </Link>
              <Link href="https://ticket.flip.vn/" target="_blank" className="text-sm ">
                {formatMessage({ id: 'footer.help' })}
              </Link>
            </div>
          </div>

          {/* Social Section - Takes 2 columns */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-base font-semibold">{formatMessage({ id: 'footer.social' })}</h3>
            <div className="flex flex-col space-y-3">
              <Link href="https://www.facebook.com/fliphq" target="_blank" className="text-sm">
                Facebook
              </Link>
              <Link href="https://www.instagram.com/fliphq/" target="_blank" className="text-sm">
                Instagram
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-12 flex flex-col-reverse items-center justify-between space-y-4 space-y-reverse border-t border-neutral-300/80  dark:border-neutral-700 px-4 pt-8 md:flex-row md:space-y-0 md:px-6">
          <div className="flex items-center gap-4">
            <Image src="/icons/flip-grad.png" alt="Logo" width={20} height={20} />
            <span className="text-sm ">© {new Date().getFullYear()} Flip, Inc. Hello from Vietnam 🇻🇳</span>
          </div>

          <div className="flex items-center space-x-6">
            <Link href="https://ticket.flip.vn/legal/return_inspection" target="_blank" className="text-sm ">
              {formatMessage({ id: 'footer.return_inspection' })}
            </Link>
            <Link href="https://ticket.flip.vn/legal/shipping" target="_blank" className="text-sm ">
              {formatMessage({ id: 'footer.shipping' })}
            </Link>
            <Link href="https://ticket.flip.vn/legal/payment" target="_blank" className="text-sm ">
              {formatMessage({ id: 'footer.payment' })}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
