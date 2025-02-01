import { useEffect, useState } from 'react';

const SystemClock = () => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const timeString = new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
        timeZoneName: 'short',
      }).format(now);
      setCurrentTime(timeString);
    }, 1000); // Update the time every second

    return () => {
      clearInterval(timer); // Clear the interval on component unmount
    };
  }, []);

  return <p className="text-sm hidden md:block dark:text-neutral-100 text-neutral-600">{currentTime}</p>;
};

export default SystemClock;
