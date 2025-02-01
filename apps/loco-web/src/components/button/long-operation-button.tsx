'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Loader2, RefreshCcw } from 'lucide-react';

import { Dialog, DialogContent } from '@/components/shadcn/ui/dialog';
import { Progress } from '@/components/shadcn/ui/progress';
import { Button, ButtonProps } from '@/components/shadcn/ui/button';
import { Alert, AlertDescription } from '@/components/shadcn/ui/alert';
import { Card, CardFooter, CardContent, CardHeader, CardTitle } from '../shadcn/ui/card';
import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
import { toastError } from '@/lib/utils/toast';
import { useIntl } from 'react-intl';

interface LongOperationButtonProps extends Omit<ButtonProps, 'onClick' | 'loading'> {
  operation: () => Promise<void>;
  timeoutDuration?: number;
  initialDelay?: number;
  dialogContent: LongOperationDialogContent;
}

interface LongOperationDialogContent {
  initial: {
    title: string;
    message: string;
    subtitle: string;
  };
  error: {
    title: string;
    message: string;
    retry: string;
  };
}

export function LongOperationButton(props: LongOperationButtonProps) {
  const { operation, timeoutDuration = 30000, dialogContent, initialDelay = 3000 } = props;

  const { formatMessage } = useIntl();

  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [progress, setProgress] = useState(0);
  const [startTime, setStartTime] = useState(0);

  const popupTimer = useRef<NodeJS.Timeout | null>(null);

  const clearPopupTimer = useCallback(() => {
    if (popupTimer.current) {
      clearTimeout(popupTimer.current);
      popupTimer.current = null;
    }
  }, []);

  const onClick = useCallback(async () => {
    try {
      setIsLoading(true);
      await operation();
    } catch (error: any) {
      setError(error.toString());
    } finally {
      setIsLoading(false);
    }
  }, [operation]);

  const onRetry = useCallback(() => {
    setError(null);
    setStartTime(Date.now());
    onClick();
  }, [onClick, setError, setProgress, setStartTime]);

  useEffect(() => {
    if (!showPopup) {
      setProgress(0);
      setStartTime(Date.now());
      clearPopupTimer();
    }
  }, [showPopup]);

  useEffect(() => {
    var errorMessage = error;
    if (!showPopup && errorMessage) {
      toastError(errorMessage);
    }
    if (!showPopup && !isLoading) {
      setError(null);
      errorMessage = null;
    }
  }, [showPopup, isLoading, error]);

  useEffect(() => {
    if (isLoading && !showPopup) {
      if (!popupTimer.current) {
        popupTimer.current = setTimeout(() => {
          setStartTime(Date.now());
          setShowPopup(true);
        }, initialDelay);
      }
    }

    return () => clearPopupTimer();
  }, [isLoading, initialDelay, clearPopupTimer]);

  useEffect(() => {
    if (!showPopup) {
      return;
    }

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = (elapsed / timeoutDuration) * 100;

      if (newProgress >= 100) {
        setError(dialogContent.error.message);
        clearInterval(progressInterval);
      } else {
        setProgress(newProgress);
      }
    }, 100);

    const timeoutId = setTimeout(() => {
      setError(dialogContent.error.message);
    }, timeoutDuration);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(progressInterval);
    };
  }, [showPopup, timeoutDuration, startTime]);

  return (
    <>
      <Button {...props} onClick={onClick} loading={isLoading}>
        {props.children}
      </Button>
      <Dialog
        open={showPopup}
        onOpenChange={(open) => {
          if (!isLoading || error) {
            setShowPopup(open);
          }
        }}
      >
        <DialogContent className={'sm:max-w-md p-0 gap-0 [&>button]:hidden'}>
          <AnimatePresence mode="wait">
            <motion.div
              key={error ? 'timeout' : 'loading'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {error ? (
                <Card className="border-0 shadow-none">
                  <CardHeader className="pb-4 pt-6">
                    <CardTitle className="text-xl">{dialogContent.error.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Alert variant="destructive" className="border-2">
                      <AlertDescription className="text-sm">{error}</AlertDescription>
                    </Alert>
                  </CardContent>
                  <CardFooter className="pb-6 flex flex-row items-center justify-center gap-2">
                    <Button variant="outline" onClick={() => setShowPopup(false)} className="w-full" size="lg">
                      {formatMessage({ id: 'common.cancel' })}
                    </Button>
                    <Button onClick={onRetry} className="w-full" size="lg">
                      <RefreshCcw className="mr-2 h-4 w-4" />
                      {dialogContent.error.retry}
                    </Button>
                  </CardFooter>
                </Card>
              ) : (
                <Card className="border-0 shadow-none">
                  <CardHeader className="pb-4 pt-6">
                    <CardTitle className="text-2xl text-foreground">{dialogContent.initial.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mt-4 mb-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{dialogContent.initial.message}</span>
                        <Loader2 className="h-5 w-5 animate-spin text-primary" />
                      </div>
                      <Progress value={!isLoading && progress > 0 ? 100 : progress} className="h-2" />
                    </div>
                  </CardContent>
                  <CardFooter className="pb-6 text-start">
                    <p className="text-sm text-muted-foreground mx-auto text-start w-full">
                      {dialogContent.initial.subtitle}
                    </p>
                  </CardFooter>
                </Card>
              )}
            </motion.div>
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </>
  );
}
