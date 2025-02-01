'use client';

import classNames from 'classnames';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/shadcn/ui/tooltip';

export function NavItem({
  id,
  idx,
  data,
  onClick,
  className,
  isCollapsedNav,
  selected,
}: {
  id?: string;
  idx: number;
  data: { name: string; icon: React.ReactNode };
  onClick?: () => any;
  className?: classNames.Argument;
  isCollapsedNav: boolean;
  selected: boolean;
}) {
  return (
    <TooltipProvider key={idx}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={classNames(
              'flex items-center rounded-lg border border-transparent hover:border-foreground dark:hover:border-white w-full gap-2 cursor-pointer p-3',
              {
                'justify-center': isCollapsedNav,
                'border dark:border-white': selected,
              },
              className
            )}
            onClick={onClick}
          >
            <div
              className={classNames('flex-none w-5 h-5', {
                'text-foreground': selected,
              })}
            >
              {data.icon}
            </div>
            <span
              className={classNames('whitespace-nowrap overflow-hidden text-ellipsis text-sm', {
                hidden: isCollapsedNav,
                'text-foreground': selected,
              })}
            >
              {data.name}
            </span>
          </div>
        </TooltipTrigger>
        <TooltipContent side="right">{data.name}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
