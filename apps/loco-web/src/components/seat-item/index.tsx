import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import { formatPrice } from '@/lib/utils/format';
import { Trash2Icon } from 'lucide-react';
import { Warning } from '../icon/Warning';
import { Separator } from '../shadcn/ui/separator';

type SeatItemProps = {
  key: string;
  sectionId: string;
  sectionName: string;
  seatId: string;
  seatSection: string;
  seatRow: string;
  seatPosition: string;
  tierName: string;
  unitPrice: string;
  itemDetails: string;
  tierBackgroundColor: string;
  tierBorderColor: string;
  onRemove: () => void;
  type: 'seat' | 'section';
};

const SelectedEntityItem = ({
  key,
  tierName: title,
  unitPrice,
  itemDetails,
  onRemove,
  tierBackgroundColor,
  tierBorderColor,
  seatPosition,
  seatSection,
  seatRow,
  seatId,
  type,
  sectionId,
  sectionName,
}: SeatItemProps) => {
  const { formatMessage } = useIntl();

  function SeatColumnItem(label: string, value: string, className?: string) {
    return (
      <div className={classNames('flex flex-col', className)}>
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <p className="text-foreground text-xl font-medium">{value}</p>
      </div>
    );
  }

  return (
    <motion.div
      key={key}
      initial={{ opacity: 0.75, scale: 0.85, translateY: '20%' }}
      animate={{ opacity: 1, scale: 1, translateY: '0' }}
      whileHover={{ scale: 1.05 }}
    >
      <div className="flex flex-row sm:flex-col w-full py-3 bg-white dark:bg-muted rounded-md border">
        <div className="flex grow basis-2 sm:flex-1 flex-col border-r sm:border-none">
          <div className="flex flex-row justify-items-center items-center gap-3 px-5 pb-2 sm:pb-0">
            <div
              className={`rounded-full w-3 h-3 border-2`}
              style={{ backgroundColor: tierBackgroundColor, borderColor: tierBorderColor }}
            />
            <p className="font-medium text-base sm:text-lg" style={{ color: tierBorderColor }}>
              {title.toUpperCase()}
            </p>
          </div>

          {type === 'seat' && (
            <div className="flex flex-row gap-2 place-content-between mt-2 px-5">
              {SeatColumnItem(
                formatMessage({ id: 'seatReservation.section' }).toUpperCase(),
                sectionName || '-',
                'items-start'
              )}
              {SeatColumnItem(formatMessage({ id: 'seatReservation.row' }).toUpperCase(), seatRow, 'items-center')}
              {SeatColumnItem(
                formatMessage({ id: 'seatReservation.position' }).toUpperCase(),
                seatPosition,
                'items-end'
              )}
            </div>
          )}

          {type === 'section' && (
            <>
              <div className="flex flex-row gap-2 place-content-between mt-2 px-5">
                {SeatColumnItem(
                  formatMessage({ id: 'seatReservation.section' }).toUpperCase() +
                    ` (${formatMessage({ id: 'seatReservation.generalAdmission' }).toUpperCase()})`,
                  sectionName || '-',
                  'items-start'
                )}
              </div>
            </>
          )}

          <Separator className="hidden sm:block my-3 dark:bg-slate-600" />

          {itemDetails && (
            <div className="flex items-start gap-1 px-5">
              <Warning className="h-2 w-2 relative" />
              <p className="text-[11px] font-normal">{itemDetails}</p>
            </div>
          )}
        </div>

        <div className="flex basis-1 flex-col sm:flex-row items-end sm:items-center justify-start place-content-between px-5">
          <div className="flex flex-col grow">
            <p className="font-medium text-base sm:text-xl text-foreground">{formatPrice(unitPrice)}</p>
          </div>
          <div onClick={onRemove} className="hover:cursor-pointer">
            <Trash2Icon size={20} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SelectedEntityItem;
