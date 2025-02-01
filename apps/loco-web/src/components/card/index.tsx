import { twMerge } from 'tailwind-merge';
import { Card as CardCN } from '../shadcn/ui/card';
import { Separator } from '../shadcn/ui/separator';

type CardProps = {
  className?: string;
  children: React.ReactNode;
};

export const Card = ({ children, className }: CardProps) => {
  return <CardCN className={twMerge('pb-5 pt-4 shadow-none dark:border-2 ', className)}>{children}</CardCN>;
};

type CardHeaderProps = {
  title: string;
  subTitle?: string;
  icon?: React.ReactNode;
  rightPanel?: React.ReactNode;
  withSeparator?: boolean;
};

export function CardHeader({
  icon = null,
  title,
  subTitle,
  rightPanel = null,
  withSeparator = false,
}: CardHeaderProps) {
  return (
    <div className="px-5">
      <div className="flex justify-between pb-2">
        <div className="flex items-center gap-2">
          {icon && <div className="font-semibold">{icon}</div>}
          <div className="flex flex-col">
            <p className="text-base font-semibold">{title}</p>
            {subTitle && <p className="text-muted-foreground text-xs font-normal">{subTitle}</p>}
          </div>
        </div>
        {rightPanel}
      </div>
      {withSeparator && <Separator />}
    </div>
  );
}

type CardBodyProps = {
  className?: string;
  children: React.ReactNode;
};

export function CardBody({ children, className }: CardBodyProps) {
  return <div className={twMerge('px-5 pt-3', className)}>{children}</div>;
}
