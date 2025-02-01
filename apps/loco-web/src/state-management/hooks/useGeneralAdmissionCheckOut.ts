import { DEFAULT_REGION } from '@/lib/utils/constants';
import { toastError } from '@/lib/utils/toast';
import { useCart, useRegions } from 'medusa-react';
import { useParams, useRouter } from 'next/navigation';
import { useIntl } from 'react-intl';
import { useAuth } from './useAuth';
import { useLoginGate } from './useLoginGate';

export type SelectedItem = {
  value: string;
  quantity: number;
};

export function useGeneralAdmissionCheckout() {
  const { isLoggedIn, openLoginModal, currentUser, openEmailVerificationModal, sendSignUpVerificationEmail } =
    useAuth();
  const { formatMessage } = useIntl();
  const { createCart, updateCart, setCart } = useCart();
  const { regions } = useRegions();
  const router = useRouter();
  const params = useParams();
  const { handle } = params;
  const defaultRegion = regions?.find((region) => region.name === DEFAULT_REGION);
  const { checkLogin } = useLoginGate();

  const toCheckout = async (
    selectedItems: SelectedItem[] | null,
    setLoading?: (loading: boolean) => void
  ): Promise<void> => {
    const loggedIn = await checkLogin(setLoading);

    if (!loggedIn) return;
    const params =
      selectedItems && selectedItems.length > 0
        ? {
            items: selectedItems.map((item) => {
              return {
                variant_id: item.value,
                quantity: item.quantity,
              };
            }),
          }
        : {};

    try {
      const { cart } = await createCart.mutateAsync({
        region_id: defaultRegion?.id,
        ...params,
      });
      cart.metadata = {
        emailForTicket: currentUser?.email,
      };
      setCart(cart);

      router.push(`/checkout/${handle}/${cart.id}`);
    } catch (error: any) {
      let errorMessage = error?.response?.data?.message ?? '';
      if (errorMessage.includes('more than available quantity')) {
        errorMessage = formatMessage({ id: 'eventDetail.ticketAvailableExceeded' });
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
