import { Button } from '@/components/shadcn/ui/button';
import { Input } from '@/components/shadcn/ui/input';
import { toastError } from '@/lib/utils/toast';
import { type Cart } from '@medusajs/medusa';
import { useGateValue } from '@statsig/react-bindings';
import { CircleCheckIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { DiscountCodeType } from '@/lib/utils/constants';
import { postApplyDiscount, postRemoveDiscount } from '@/lib/api/flip-ticketing/v1/applyDiscount';

export default function DiscountBox({
  cart,
  loadingCart,
  refetchCart,
}: {
  cart: Cart;
  loadingCart: boolean;
  refetchCart: () => void;
}): JSX.Element {
  const intl = useIntl();
  const isDiscountEnabled = useGateValue('discount-code');
  const [discountCode, setDiscountCode] = useState('');
  const [isOfflineSale, setIsOfflineSale] = useState(false);
  const [isMutatingDiscount, setIsMutatingDiscount] = useState(false);
  const [hasDiscount, setHasDiscount] = useState(false);

  const onApplyDiscount = async () => {
    setIsMutatingDiscount(true);
    try {
      await postApplyDiscount(cart.id, discountCode);
      refetchCart();
    } catch (error) {
      toastError(`${intl.formatMessage({ id: 'checkout.discount.discountFailure' })}`);
      setIsMutatingDiscount(false);
      return;
    }
  };

  const onRemoveDiscount = async () => {
    setIsMutatingDiscount(true);
    try {
      await postRemoveDiscount(cart.id);
      refetchCart();
    } catch (error) {
      toastError(`${intl.formatMessage({ id: 'checkout.discount.removeDiscountFailure' })}`);
      setIsMutatingDiscount(false);
      return;
    }
  };

  useEffect(() => {
    if (loadingCart || !cart) {
      return;
    }

    const hasDiscount = cart.discounts && cart.discounts.length > 0;
    const isOfflineSale = hasDiscount && cart.discounts.some((d) => d.type === DiscountCodeType.OFFLINE_SALE_CODE);

    setIsOfflineSale(isOfflineSale);

    /// If the cart has a discount but the discount_total is 0, remove the discount
    ///
    /// There's currently an issue with Medusa where a discount code limited to event A
    /// can be applied to event B. The discount is applied but the discount_total is still 0.
    /// Normally, Medusa would throw a not_allowed error.
    ///
    if (hasDiscount && (!cart?.discount_total || cart?.discount_total === 0)) {
      onRemoveDiscount();
      toastError(`${intl.formatMessage({ id: 'checkout.discount.discountFailure' })}`);
      return;
    }

    setHasDiscount(hasDiscount);

    if (isMutatingDiscount) {
      setIsMutatingDiscount(false);
    }

    if (hasDiscount && discountCode !== cart?.discounts?.[0]?.code) {
      setDiscountCode(cart?.discounts?.[0]?.code);
    } else if (!hasDiscount && discountCode !== '') {
      setDiscountCode('');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart, loadingCart]);

  if (!isDiscountEnabled || isOfflineSale) {
    return <></>;
  }

  return (
    <div className="flex flex-row gap-2 justify-center items-center">
      <div className="w-full relative">
        <Input
          placeholder={intl.formatMessage({ id: 'checkout.discount.addDiscount' })}
          fullWidth
          value={discountCode}
          disabled={isMutatingDiscount}
          readOnly={hasDiscount}
          onChange={(event) => {
            setDiscountCode(event.target.value);
          }}
          className="h-11"
        />
        {
          <CircleCheckIcon
            size={28}
            className={classNames(
              'transition-all absolute right-3 top-1/2 -translate-y-1/2 fill-green-500 stroke-white',
              {
                'opacity-100 scale-100': hasDiscount,
                'opacity-0 scale-25': !hasDiscount,
              }
            )}
          />
        }
      </div>
      <Button
        variant="secondary"
        disabled={loadingCart || isMutatingDiscount || (!hasDiscount && discountCode.length == 0)}
        loading={loadingCart || isMutatingDiscount}
        className={classNames('transition-all h-11', {
          'w-24': hasDiscount,
          'w-36': !hasDiscount,
        })}
        onClick={hasDiscount ? onRemoveDiscount : onApplyDiscount}
      >
        {hasDiscount
          ? intl.formatMessage({ id: 'checkout.discount.removeDiscount' })
          : intl.formatMessage({ id: 'checkout.discount.applyDiscount' })}
      </Button>
    </div>
  );
}
