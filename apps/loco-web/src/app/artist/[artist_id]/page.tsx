import { GET_ARTIST } from '@/graphql/queries';
import { FlipArtist } from '@/lib/__generated__/graphql';
import { getClient } from '@/lib/utils/apollo-client';
import { Metadata } from 'next';
import ArtistDetails from './artist-details';

export async function generateMetadata({ params }: { params: { artist_id: string } }): Promise<Metadata> {
  try {
    const {
      data: { artist },
    } = await getClient().query<{ artist: FlipArtist | null }>({
      query: GET_ARTIST,
      variables: { handle: params?.artist_id },
    });

    if (!artist) {
      return {
        title: 'Not Found',
        description: 'The page you are looking for does not exist',
      };
    }

    return {
      title: artist.name,
      description: artist.bio,
      openGraph: {
        title: artist.name,
        description: 'Các event event của ' + artist.name + ' trên flip.vn',
        tags: ['flip', 'event', 'artist', 'concert', 'music', 'live', artist.name],
        images: artist?.profileImageURL ?? '',
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
export default function ArtistDetailsPage() {
  return <ArtistDetails />;
}
