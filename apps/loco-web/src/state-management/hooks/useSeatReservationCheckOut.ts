import { getOrCreateSeatAndSectionVariantIds } from '@/lib/api/flip-ticketing/v1/seatProductVariant';
import { DEFAULT_REGION } from '@/lib/utils/constants';
import { toastError } from '@/lib/utils/toast';
import { useCart, useRegions } from 'medusa-react';
import { useParams, useRouter } from 'next/navigation';
import { useIntl } from 'react-intl';
import { useAuth } from './useAuth';
import { useLoginGate } from './useLoginGate';

export function useSeatReservationCheckOut() {
  const { currentUser } = useAuth();
  const { formatMessage } = useIntl();
  const { createCart, setCart } = useCart();
  const { regions } = useRegions();
  const router = useRouter();
  const params = useParams();
  const { handle } = params;
  const defaultRegion = regions?.find((region) => region.name === DEFAULT_REGION);
  const { checkLogin } = useLoginGate();

  const toCheckout = async (
    selectedEntitiesIds: string[],
    selectedSeatsIds: Set<string>,
    eventId: string,
    setLoading?: (loading: boolean) => void
  ): Promise<void> => {
    const loggedIn = await checkLogin(setLoading);

    if (!loggedIn) return;
    setLoading?.(true);
    try {
      /**
       * Check if the seat and section variant ids exist if not, create them
       * We should move this to Event Server
       */
      const variantIds = await getOrCreateSeatAndSectionVariantIds(
        eventId,
        Array.from(selectedSeatsIds),
        selectedEntitiesIds
          .filter((entityId) => !selectedSeatsIds.has(entityId))
          // We transformed sectionId to sectionId-uuid to avoid rendering issue, so we need to get the original sectionId
          .map((transformedSectionId) => transformedSectionId.split('-')[0])
      );

      // Check if the section variant ids exist if not, create them
      // We should move this to Event Server

      const cartParams =
        variantIds && variantIds.length > 0
          ? {
              items: Object.entries(
                variantIds.reduce(
                  (acc, variantId) => {
                    acc[variantId] = (acc[variantId] || 0) + 1;
                    return acc;
                  },
                  {} as Record<string, number>
                )
              ).map(([variantId, quantity]) => ({
                variant_id: variantId,
                quantity,
              })),
            }
          : {};

      const { cart } = await createCart.mutateAsync({
        region_id: defaultRegion?.id,
        ...cartParams,
      });

      cart.metadata = {
        emailForTicket: currentUser?.email,
      };

      setCart(cart);

      router.push(`/checkout/${handle}/${cart.id}`);
    } catch (error: any) {
      let errorMessage = error?.response?.data?.message ?? '';
      if (errorMessage.includes('more than available quantity')) {
        errorMessage = formatMessage({ id: 'seatReservation.seatNotAvailable' });
      }
      if (errorMessage !== '') {
        throw new Error(errorMessage);
      }
      throw error;
    } finally {
      setLoading?.(false);
    }
  };

  return { toCheckout };
}
