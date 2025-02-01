import { useEffect, useState } from 'react';

type TimersProps = {
  minutes: number;
  callback?: () => void;
};

const MIN_IN_SECONDS = 60;
const SECOND_IN_MILLISECONDS = 1000;

const Timers = ({ minutes, callback }: TimersProps) => {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    setTimeLeft(Math.round(minutes * MIN_IN_SECONDS));
  }, [minutes]);

  useEffect(() => {
    // Save intervalId to clear the interval when the component re-renders
    const intervalId = setInterval(() => {
      if (timeLeft <= 0) {
        callback && callback();
        clearInterval(intervalId);
        return;
      }

      setTimeLeft(timeLeft - 1);
    }, SECOND_IN_MILLISECONDS);

    // Clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
  }, [callback, timeLeft]);

  const minutesLeft = Math.floor(timeLeft / MIN_IN_SECONDS);
  const secondsLeft = timeLeft % MIN_IN_SECONDS;

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center justify-center w-10 h-10 rounded bg-neutral-100 dark:bg-secondary">
        <p className="text-lg font-bold ">{minutesLeft.toString().padStart(2, '0')}</p>
      </div>
      <p className="text-lg font-medium">:</p>
      <div className="flex items-center justify-center w-10 h-10 rounded bg-neutral-100 dark:bg-secondary">
        <p className="text-lg font-bold ">{secondsLeft.toString().padStart(2, '0')}</p>
      </div>
    </div>
  );
};

export { Timers };
