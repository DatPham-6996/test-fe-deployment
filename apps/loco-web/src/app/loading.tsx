import Loader from '@/components/loading-indicator/Loader';
import { ContentCenterNarrow } from '@/containers/content-center/ContentCenterNarrow';
import { FlipLayout } from '@/containers/flip-layout';

export default function AppLoading() {
  return (
    <FlipLayout>
      <ContentCenterNarrow>
        <div className="flex flex-col align-middle">
          <Loader />
        </div>
      </ContentCenterNarrow>
    </FlipLayout>
  );
}
