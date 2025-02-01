'use client';
import { RecoilRoot } from 'recoil';

type RecoilWrapperProps = {
  children: React.ReactNode;
};
export const RecoilWrapper = ({ children }: RecoilWrapperProps) => <RecoilRoot>{children}</RecoilRoot>;
