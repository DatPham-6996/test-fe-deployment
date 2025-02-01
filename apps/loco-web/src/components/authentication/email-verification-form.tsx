import { useEffect, useState } from 'react';
import { Form } from 'react-final-form';
import { useIntl } from 'react-intl';
import { Button } from '../shadcn/ui/button';

export type EmailVerificationFormProps = {
  onSubmit: () => void;
};

export const EmailVerificationForm = ({ onSubmit }: EmailVerificationFormProps) => {
  const [lastClickedTime, setLastClickedTime] = useState<number | null>(Date.now());
  const coolDownDuration = 60000; // 60 seconds cool-down
  const [timeRemaining, setTimeRemaining] = useState<number | null>(coolDownDuration);

  const intl = useIntl();
  const { formatMessage } = intl;

  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (lastClickedTime) {
        const elapsedTime = Date.now() - lastClickedTime;
        const remainingTime = coolDownDuration - elapsedTime;
        if (remainingTime <= 0) {
          setTimeRemaining(null);
          setLastClickedTime(null);
        } else {
          setTimeRemaining(remainingTime);
        }
      }
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [lastClickedTime]);

  const handleOnSubmit = async () => {
    await onSubmit();
    setLastClickedTime(Date.now());
    setTimeRemaining(coolDownDuration);
  };

  return (
    <Form
      onSubmit={handleOnSubmit}
      render={({ handleSubmit, submitting, submitSucceeded, submitError, errors }) => {
        return (
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-5">
              <Button
                fullWidth
                loading={submitting}
                success={submitSucceeded}
                error={submitError}
                disabled={timeRemaining !== null}
                variant={timeRemaining ? 'outline' : 'default'}
              >
                {formatMessage({ id: 'authentication.resendVerificationEmail' }) +
                  (timeRemaining ? ` (${Math.ceil(timeRemaining / 1000)})` : '')}
              </Button>
            </div>
          </form>
        );
      }}
    />
  );
};
