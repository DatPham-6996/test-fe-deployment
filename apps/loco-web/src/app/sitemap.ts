import { getClient } from '@/lib/utils/apollo-client';
import { gql } from '@apollo/client';
import { MetadataRoute } from 'next';

const GET_EVENT_HANDLES = gql`
  query GetEventHandles {
    getEventHandles {
      handle
      updatedAt
    }
  }
`;

type EventHandle = {
  handle: string;
  updatedAt: string;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://flip.vn';
  const homepage = {
    url: baseUrl,
    lastModified: new Date(),
  };

  try {
    const { data } = await getClient().query<{ getEventHandles: EventHandle[] }>({ query: GET_EVENT_HANDLES });

    const events = data?.getEventHandles?.map((event) => ({
      url: `${baseUrl}/events/${event.handle}`,
      lastModified: new Date(event.updatedAt),
    }));

    return [homepage, ...events];
  } catch (error) {
    return [homepage];
  }
}
