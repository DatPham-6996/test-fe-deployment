import { Skeleton } from '@/components/shadcn/ui/skeleton';

export function SkeletonCard({ index }: { index: number }) {
  return <Skeleton key={index} className="w-full h-[250px] max-w-[600px] rounded-xl" />;
}
