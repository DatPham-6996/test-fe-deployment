import { GET_ORGANIZATION } from '@/graphql/queries';
import { FlipOrganization } from '@/lib/__generated__/graphql';
import { getClient } from '@/lib/utils/apollo-client';
import { Metadata } from 'next';
import OrganizationDetails from './organization-details';

export async function generateMetadata({ params }: { params: { organization_handle: string } }): Promise<Metadata> {
  try {
    const {
      data: { organization },
    } = await getClient().query<{ organization: FlipOrganization | null }>({
      query: GET_ORGANIZATION,
      variables: { handle: params?.organization_handle },
    });

    if (!organization) {
      return {
        title: 'Not Found',
        description: 'The page you are looking for does not exist',
      };
    }

    return {
      title: organization.name,
      description: organization.description,
      openGraph: {
        title: organization.name,
        description: organization.description ?? '',
        images: organization?.logoURL ?? '',
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
export default function OrganizationDetailsPage() {
  return <OrganizationDetails />;
}
