import { useEffect, useState } from 'react';

type AutoHideWrapperProps = {
  autoHideIcon?: number;
  children: React.ReactNode;
};

const DEFAULT_AUTO_HIDE_SECOND = 1000;

export const AutoHideWrapper = ({ autoHideIcon = DEFAULT_AUTO_HIDE_SECOND, children }: AutoHideWrapperProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, autoHideIcon);

    return () => clearTimeout(timer);
  }, [autoHideIcon]);

  if (!isVisible) {
    return null;
  }

  return <>{children}</>;
};
