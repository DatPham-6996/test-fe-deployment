import { Button } from '../shadcn/ui/button';
import { useEffect, useState, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { FileIcon, FileWarningIcon } from 'lucide-react';
import { useIntl } from 'react-intl';

export type FileGenerationDialogProps = {
  title: string;
  description: string;
  timeoutInSeconds: number;
  checkIntervalInSeconds: number;
  onProgress: () => Promise<string | null | undefined>;
  onInitialize: () => Promise<void>;
  onCancel: () => void;
  onSuccess: () => void;
};

export default function FileGenerationDialog({
  title,
  description,
  checkIntervalInSeconds,
  timeoutInSeconds,
  onInitialize,
  onProgress,
  onCancel,
  onSuccess,
}: FileGenerationDialogProps) {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const { formatMessage } = useIntl();

  const animationIntervalRef = useRef<NodeJS.Timeout>();
  const timeoutIdRef = useRef<NodeJS.Timeout>();

  const handleDownload = useCallback((url: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = '';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  useEffect(() => {
    const initialize = async () => {
      try {
        await onInitialize();
        setIsInitialized(true);
      } catch (e) {
        console.error(e);
        setError('An unknown error occurred');
      }
    };
    initialize();
  }, [onInitialize]);

  useEffect(() => {
    if (!isInitialized) return;

    const interval = setInterval(async () => {
      try {
        const url = await onProgress();
        if (url && url !== '') {
          clearInterval(interval);
          handleDownload(url);
          if (animationIntervalRef.current) {
            console.log('clearing animation interval');
            clearInterval(animationIntervalRef.current);
          }
          if (timeoutIdRef.current) {
            console.log('clearing timeout');
            clearTimeout(timeoutIdRef.current);
          }
          setProgress(100);
          setTimeout(() => {
            onSuccess();
          }, 500);
        }
      } catch (e) {
        console.error(e);
        setError('An unknown error occurred');
      }
    }, checkIntervalInSeconds * 1000);

    return () => clearInterval(interval);
  }, [
    onProgress,
    checkIntervalInSeconds,
    onSuccess,
    isInitialized,
    animationIntervalRef,
    timeoutIdRef,
    handleDownload,
  ]);

  useEffect(() => {
    if (!isInitialized) return;

    let currentProgressStep = 0;
    let step = 0.5;

    const updateProgress = () => {
      currentProgressStep += step;
      const calculatedProgress = Math.round((Math.atan(currentProgressStep) / (Math.PI / 2)) * 100 * 1000) / 1000;

      setProgress(calculatedProgress);

      if (calculatedProgress >= 100) {
        if (animationIntervalRef.current) {
          clearInterval(animationIntervalRef.current);
        }
        if (timeoutIdRef.current) {
          clearTimeout(timeoutIdRef.current);
        }
      } else if (calculatedProgress >= 70) {
        step = 0.1;
      }
    };

    const startProgress = () => {
      animationIntervalRef.current = setInterval(updateProgress, 500);
    };

    if (progress === 0) {
      // Wait 1 second before starting if progress is 0
      const initialDelay = setTimeout(startProgress, 500);
      return () => clearTimeout(initialDelay);
    }

    timeoutIdRef.current = setTimeout(() => {
      if (animationIntervalRef.current) {
        clearInterval(animationIntervalRef.current);
      }
      onCancel();
    }, timeoutInSeconds * 1000);

    const clearTimers = () => {
      if (animationIntervalRef.current) {
        clearInterval(animationIntervalRef.current);
      }
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };

    return clearTimers;
  }, [timeoutInSeconds, onCancel, progress, isInitialized]);

  if (error) {
    return (
      <>
        <FileWarningIcon className="w-16 h-16 text-muted-foreground mb-4 sm:mb-0" />
        <p className="text-2xl font-bold mb-2 sm:mb-0">{formatMessage({ id: 'common.error' })}</p>
        <p className="text-base text-muted-foreground mb-8">{formatMessage({ id: 'system.errorAction' })} </p>
        <Button variant="default" onClick={onCancel} size={'lg'} className="w-full">
          {formatMessage({ id: 'common.cancel' })}
        </Button>
      </>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <p className="text-2xl font-bold self-start">{title}</p>
      <p className="text-base text-muted-foreground self-start">{description}</p>
      <CircularProgress progress={progress} className="my-6 md:my-4" icon={<FileIcon className="w-9 h-9" />} />
      <Button variant="outline" onClick={onCancel} size={'lg'} className="w-full">
        {formatMessage({ id: 'common.cancel' })}
      </Button>
    </div>
  );
}

interface CircularProgressProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  icon?: React.ReactNode;
}

function CircularProgress({ progress, size = 140, strokeWidth = 8, className, icon }: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle
          className="text-gray-300 dark:text-white"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className="text-primary dark:text-green-500"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{
            transition: 'stroke-dashoffset 0.5s ease',
          }}
        />
      </svg>
      <div className="absolute ">
        <div className="flex flex-col items-center gap-1">
          {icon}
          <span className="text-base font-medium">{Math.round(progress)}%</span>
        </div>
      </div>
    </div>
  );
}
