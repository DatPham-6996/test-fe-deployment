import { PARENT_EVENT_DETAILS_FRAGMENT } from '@/graphql/fragments';
import { FlipEvent } from '@/lib/__generated__/graphql';
import { getClient } from '@/lib/utils/apollo-client';
import { gql } from '@apollo/client';
import { Metadata } from 'next';
import EventDetails from './event-details';
import { htmlToText } from 'html-to-text';

const PARENT_EVENT_QUERY = gql`
  ${PARENT_EVENT_DETAILS_FRAGMENT}
  query ParentEvent($handle: String!) {
    parentEvent(handle: $handle) {
      ...ParentEventDetails_event
    }
  }
`;

export async function generateMetadata({ params }: { params: { handle: string } }): Promise<Metadata> {
  try {
    const {
      data: { parentEvent: event },
    } = await getClient().query<{ parentEvent: FlipEvent | null }>({
      query: PARENT_EVENT_QUERY,
      variables: { handle: params?.handle },
    });

    if (!event) {
      return {
        title: 'Not Found',
        description: 'The page you are looking for does not exist',
      };
    }

    const eventDescription = htmlToText(event.description ?? '', { wordwrap: 130 });

    return {
      title: event.name,
      description: eventDescription,
      openGraph: {
        title: event.name,
        description: eventDescription,
        images: event?.media?.filter((item) => item.type === 'IMAGE').map((item) => item.url),
      },
    };
  } catch (error) {
    return {
      title: 'Not Found',
      description: 'The page you are looking for does not exist',
    };
  }
}

// Wrapper for SEO purpose
export default function EventDetailsPage() {
  return <EventDetails />;
}
