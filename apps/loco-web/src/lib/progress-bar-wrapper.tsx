'use client';
// import NextTopLoader from 'nextjs-toploader';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import React from 'react';

const ProgressBarProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {/* <NextTopLoader color="#fbe134" showSpinner={false}/> */}
      <ProgressBar
        height="4px"
        color="#fbe134"
        options={{
          showSpinner: false,
        }}
        shallowRouting
      />
      {children}
    </>
  );
};

export default ProgressBarProvider;
