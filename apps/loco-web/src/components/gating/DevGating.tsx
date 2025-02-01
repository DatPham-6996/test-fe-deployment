'use client'; // without this, apollo client will be missing since its initialized on client

import { ContentCenterNarrow } from '@/containers/content-center/ContentCenterNarrow';
import { FlipLayout } from '@/containers/flip-layout';
import { useAuth } from '@/state-management/hooks/useAuth';
import { Terminal } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../shadcn/ui/alert';

export default function DevGating() {
  const { isLoggedIn, openLoginModal } = useAuth();

  if (!isLoggedIn) {
    openLoginModal();
    return null;
  }

  return (
    <FlipLayout>
      <ContentCenterNarrow>
        <div className=" flex flex-col items-center justify-center gap-6 w-full my-9">
          <Alert>
            <Terminal size={12} />
            <AlertTitle>Hé lô!</AlertTitle>
            <AlertDescription>
              Cảm ơn bạn đã ghé thăm. Tính năng đang trong quá trình phát triển, quay lại sớm nhé!
            </AlertDescription>
          </Alert>
        </div>
      </ContentCenterNarrow>
    </FlipLayout>
  );
}
