import { Card, CardBody } from '@/components/card';
import { Button } from '@/components/shadcn/ui/button';
import {
  useGetOrCreateOfflineSaleCodeLazyQuery,
  useOrganizationCheckoutConfigsQuery,
} from '@/lib/__generated__/graphql';
import { postApplyDiscount, postRemoveDiscount } from '@/lib/api/flip-ticketing/v1/applyDiscount';
import { DiscountCodeType } from '@/lib/utils/constants';
import { toastError } from '@/lib/utils/toast';
import { type Cart } from '@medusajs/medusa';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip';
import { useGateValue } from '@statsig/react-bindings';
import classNames from 'classnames';
import { InfoIcon, MailPlus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

export default function OrganizationOptions({
  cart,
  loadingCart,
  refetchCart,
  eventId,
  organizationId,
}: {
  cart: Cart;
  loadingCart: boolean;
  eventId: string;
  organizationId: string;
  refetchCart: () => void;
}): JSX.Element {
  const { formatMessage } = useIntl();
  const isFeatureEnable = useGateValue('organization-checkout-option');
  const [isSubmitting, setIsSubmitting] = useState(true);
  const [isAppliedDiscount, setIsAppliedDiscount] = useState(true);
  const [getOrCreateOfflineSaleCode] = useGetOrCreateOfflineSaleCodeLazyQuery();
  const { data: organizationCheckoutConfigData } = useOrganizationCheckoutConfigsQuery({
    variables: { input: { eventId, organizationId } },
    fetchPolicy: 'network-only',
  });
  const [isApplied, setIsApplied] = useState(false);

  const isShowCheckoutOptions =
    organizationCheckoutConfigData?.organizationCheckoutConfigs.isShowCheckoutOptions ?? false;
  const offlineSalesEnabled = organizationCheckoutConfigData?.organizationCheckoutConfigs.offlineSalesEnabled ?? false;

  const onApplyOfflineSaleCode = async () => {
    try {
      setIsSubmitting(true);
      const result = await getOrCreateOfflineSaleCode({
        variables: {
          input: { eventId, organizationId },
        },
      });

      const offlineSaleCode = result.data?.getOrCreateOfflineSaleCode?.offlineSaleCode;
      if (!offlineSaleCode) {
        throw new Error('Offline sale code is not available');
      }

      await postApplyDiscount(cart.id, offlineSaleCode);
      refetchCart();
    } catch (error) {
      toastError(`${formatMessage({ id: 'checkout.organizationOptions.offlineSale.error' })}`);
      setIsSubmitting(false);
    }
  };

  const onRemoveOfflineSaleCode = async () => {
    setIsSubmitting(true);

    try {
      await postRemoveDiscount(cart.id);
      refetchCart();
    } catch (error) {
      toastError(`${formatMessage({ id: 'checkout.organizationOptions.offlineSale.error' })}`);
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (loadingCart || !cart) {
      return;
    }

    const isApplied =
      cart.discounts?.length > 0 && cart.discounts.some((d) => d.type === DiscountCodeType.OFFLINE_SALE_CODE);
    const isAppliedDiscount =
      cart.discounts?.length > 0 && cart.discounts.some((d) => d.type === DiscountCodeType.DISCOUNT_CODE);
    setIsAppliedDiscount(isAppliedDiscount);

    /// If the cart has a discount but the discount_total is 0, remove the discount
    ///
    /// There's currently an issue with Medusa where a discount code limited to event A
    /// can be applied to event B. The discount is applied but the discount_total is still 0.
    /// Normally, Medusa would throw a not_allowed error.
    ///
    if (isApplied && (!cart?.discount_total || cart?.discount_total === 0)) {
      onRemoveOfflineSaleCode();
      toastError(`${formatMessage({ id: 'checkout.discount.discountFailure' })}`);
      return;
    }

    setIsApplied(isApplied);

    if (isSubmitting) {
      setIsSubmitting(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart, loadingCart]);

  if (!isFeatureEnable || !isShowCheckoutOptions) {
    return <></>;
  }

  const renderOrganizationOptionsTooltip = () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <InfoIcon size={16} />
        </TooltipTrigger>
        <TooltipContent>
          <Card className="">
            <p className="px-3">{formatMessage({ id: 'checkout.organizationOptions.infoTooltip.availableFor' })}</p>
          </Card>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  return (
    <Card>
      <div className="pl-5 flex items-center gap-2">
        <div className="text-base font-semibold ">{formatMessage({ id: 'checkout.organizationOptions.title' })}</div>
        {renderOrganizationOptionsTooltip()}
      </div>
      <CardBody>
        <div className="my-1">
          <div className="flex flex-row gap-2 justify-center">
            <div className="w-full relative">
              <div className="flex flex-col gap-2">
                <div className="flex gap-4 items-start">
                  <div>
                    <MailPlus size={18} className="stroke-muted-foreground" />
                  </div>
                  <div className="flex flex-col gap-1 ">
                    <p className="text-sm">
                      {formatMessage({ id: 'checkout.organizationOptions.checkoutAsOfflineSale' })}
                    </p>
                    <div className="flex flex-col text-sm gap-1">
                      {/* <p className="">{formatMessage({ id: 'checkout.organizationOptions.offlineSale.availableFor' })}</p> */}
                      <ul className="list-disc pl-5">
                        <li>{formatMessage({ id: 'checkout.organizationOptions.offlineSale.outsideFlip' })}</li>
                        <li>{formatMessage({ id: 'checkout.organizationOptions.offlineSale.invitation' })}</li>
                      </ul>
                      <p className="text-xs">
                        {formatMessage({ id: 'checkout.organizationOptions.offlineSale.feeNote' })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Button
              variant="secondary"
              disabled={loadingCart || isSubmitting || isAppliedDiscount || !offlineSalesEnabled}
              loading={loadingCart || isSubmitting}
              className={classNames('transition-all', {
                'w-24': isApplied,
                'w-36': !isApplied,
              })}
              onClick={isApplied ? onRemoveOfflineSaleCode : onApplyOfflineSaleCode}
            >
              {!offlineSalesEnabled
                ? formatMessage({ id: 'checkout.organizationOptions.offlineSale.disable' })
                : isApplied
                  ? formatMessage({ id: 'checkout.organizationOptions.offlineSale.cancel' })
                  : formatMessage({ id: 'checkout.organizationOptions.offlineSale.apply' })}
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
