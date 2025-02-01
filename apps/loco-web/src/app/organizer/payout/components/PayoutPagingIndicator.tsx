import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/components/shadcn/ui/pagination';
import classNames from 'classnames';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

export function PayoutPagingIndicator({
  onLoadNextPage,
  onLoadPreviousPage,
  currentPage,
  hasNextPage,
  className,
}: {
  onLoadNextPage: () => void;
  onLoadPreviousPage: () => void;
  currentPage: number;
  hasNextPage: boolean;
  className?: string;
}) {
  const canGoToPreviousPage = currentPage > 1;
  const canGoToNextPage = hasNextPage;

  const handleLoadNextPage = () => {
    if (canGoToNextPage) {
      onLoadNextPage();
    }
  };

  const handleLoadPreviousPage = () => {
    if (canGoToPreviousPage) {
      onLoadPreviousPage();
    }
  };

  return (
    <Pagination className={className}>
      <PaginationContent>
        <PaginationItem>
          <PaginationLink
            onClick={handleLoadPreviousPage}
            className={classNames({
              'cursor-pointer': canGoToPreviousPage,
              'cursor-not-allowed': !canGoToPreviousPage,
              'opacity-30': !canGoToPreviousPage,
            })}
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </PaginationLink>
        </PaginationItem>
        {canGoToPreviousPage && (
          <PaginationItem>
            <PaginationLink className="cursor-pointer" onClick={handleLoadPreviousPage}>
              {currentPage - 1}
            </PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationLink isActive={true} className="cursor-default">
            {currentPage}
          </PaginationLink>
        </PaginationItem>
        {canGoToNextPage && (
          <PaginationItem>
            <PaginationLink className="cursor-pointer" onClick={handleLoadNextPage}>
              {currentPage + 1}
            </PaginationLink>
          </PaginationItem>
        )}
        {canGoToNextPage && (
          <PaginationItem>
            <PaginationLink
              onClick={handleLoadNextPage}
              className={classNames({
                'cursor-pointer': canGoToNextPage,
                'cursor-not-allowed': !canGoToNextPage,
                'opacity-30': !canGoToNextPage,
              })}
            >
              <ChevronRightIcon className="h-4 w-4" />
            </PaginationLink>
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
