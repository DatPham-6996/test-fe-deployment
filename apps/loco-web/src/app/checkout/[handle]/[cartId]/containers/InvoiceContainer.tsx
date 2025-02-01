'use client';
import { CardBody, Card, CardHeader } from '@/components/card';
import { useResponsiveDialog } from '@/components/responsive-dialog/responsive-dialog-context';
import { Switch } from '@/components/shadcn/ui/switch';
import {
  useAddCartInvoiceMutation,
  useGetCartInvoiceLazyQuery,
  useOrganizationCheckoutConfigsQuery,
  useRemoveCartInvoiceMutation,
} from '@/lib/__generated__/graphql';
import { Cart } from '@medusajs/medusa';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { Button } from '@/components/shadcn/ui/button';
import { toastError, toastSuccess, toastWarn } from '@/lib/utils/toast';
import { useCheckoutInfo } from '../components/hook/useCheckoutInfo';
import { Separator } from '@/components/shadcn/ui/separator';
import { InvoiceForm, InvoiceSchemaType } from '../components/InvoiceForm';
import { InfoIcon, PencilIcon } from 'lucide-react';
import classNames from 'classnames';

export type InvoiceContainerProps = {
  cart: Omit<Cart, 'refundable_amount' | 'refunded_total'>;
  organizationName: string;
  eventId: string;
  organizationId: string;
  isOfflineSale: boolean;
};

export type Invoice = {
  name: string;
  email: string;
  phone: string;
  address: string;
  taxCode: string | null;
};

export default function InvoiceContainer({
  cart,
  organizationName,
  eventId,
  organizationId,
  isOfflineSale,
}: InvoiceContainerProps) {
  const { formatMessage } = useIntl();
  const { openDialog, closeDialog } = useResponsiveDialog();
  const [invoice, setInvoice] = useState<Invoice | undefined>();
  const { email, displayName, phone } = useCheckoutInfo();
  const [getCartInvoice] = useGetCartInvoiceLazyQuery({
    variables: {
      input: {
        cartId: cart.id,
      },
    },
    onCompleted: (data) => {
      if (data.cartInvoice) {
        setInvoice({
          name: data.cartInvoice.name,
          email: data.cartInvoice.email,
          phone: data.cartInvoice.phone,
          address: data.cartInvoice.address,
          taxCode: data.cartInvoice.tax_code || null,
        });
      }
    },
  });

  const [addCartInvoice] = useAddCartInvoiceMutation();
  const [removeCartInvoice] = useRemoveCartInvoiceMutation();
  const { data: organizationCheckoutConfigData } = useOrganizationCheckoutConfigsQuery({
    variables: { input: { eventId: eventId, organizationId: organizationId } },
    fetchPolicy: 'network-only',
  });

  const organizerEnabledInvoice = organizationCheckoutConfigData?.organizationCheckoutConfigs.invoiceEnabled ?? false;

  const visible = organizerEnabledInvoice;
  const enabled = organizerEnabledInvoice && !isOfflineSale;

  useEffect(() => {
    getCartInvoice();
  }, [cart.id]);

  useEffect(() => {
    if (isOfflineSale && invoice) {
      onRemoveInvoice({
        onSuccess: () => {
          toastWarn(formatMessage({ id: 'checkout.invoice.removedForOfflineSale' }));
        },
      });
    }
  }, [isOfflineSale]);

  const onUpdateInvoice = async (data: InvoiceSchemaType) => {
    try {
      if (invoice) {
        await removeCartInvoice({ variables: { input: { cartId: cart.id } } });
      }
      const result = await addCartInvoice({
        variables: {
          input: {
            cartId: cart.id,
            ...data,
          },
        },
      });
      const returnedInvoice = result.data?.addCartInvoice;
      if (returnedInvoice) {
        setInvoice({
          name: returnedInvoice.name,
          email: returnedInvoice.email,
          phone: returnedInvoice.phone,
          address: returnedInvoice.address,
          taxCode: returnedInvoice.tax_code || null,
        });
      }
      closeDialog();
    } catch (error) {
      toastError(formatMessage({ id: 'common.error' }));
    }
  };

  const onRemoveInvoice = async (params?: { onSuccess?: () => void }) => {
    const previousInvoice = invoice;
    try {
      setInvoice(undefined);
      await removeCartInvoice({ variables: { input: { cartId: cart.id } } });
      if (params?.onSuccess) {
        params.onSuccess();
      } else {
        toastSuccess(formatMessage({ id: 'checkout.invoice.removeSuccess' }));
      }
    } catch (error) {
      setInvoice(previousInvoice);
      toastError(formatMessage({ id: 'checkout.invoice.updateFailed' }));
    }
  };

  const onAddInvoice = async () => {
    openDialog(
      <InvoiceForm
        data={invoice}
        onChange={onUpdateInvoice}
        onRemove={async () => {
          closeDialog();

          if (!invoice) return;
          await onRemoveInvoice();
        }}
        defaultValues={{
          name: displayName,
          email: email,
          phone: phone?.toString() || '',
        }}
      />
    );
  };

  const onToggleInvoice = (value: boolean) => {
    if (value) {
      onAddInvoice();
    } else {
      onRemoveInvoice();
    }
  };

  const CurrentInvoiceCard = () => {
    if (!invoice) return null;
    return (
      <div className="flex flex-col gap-3 bg-muted p-4 rounded-md text-sm">
        <div className="flex flex-row justify-between">
          <p className="flex-1 truncate">{formatMessage({ id: 'checkout.invoice.name' })} </p>
          <span className="flex-1 font-medium text-end">{invoice.name}</span>
        </div>
        <Separator className="dark:bg-gray-700" />

        <div className="flex flex-row justify-between">
          <p className="flex-1 truncate">{formatMessage({ id: 'checkout.invoice.email' })} </p>
          <span className="flex-1 font-medium text-end">{invoice.email}</span>
        </div>
        <Separator className="dark:bg-gray-700" />

        <div className="flex flex-row justify-between">
          <p className="flex-1 truncate">{formatMessage({ id: 'checkout.invoice.phone' })} </p>
          <span className="flex-1 font-medium text-end">{invoice.phone}</span>
        </div>
        <Separator className="dark:bg-gray-700" />

        <div className="flex flex-row justify-between">
          <p className="flex-1 truncate">{formatMessage({ id: 'checkout.invoice.taxCode' })} </p>
          <span className="flex-1 font-medium text-end">{invoice.taxCode}</span>
        </div>
        <Separator className="dark:bg-gray-700" />

        <div className="flex flex-row justify-between">
          <p className="flex-1 truncate">{formatMessage({ id: 'checkout.invoice.address' })} </p>
          <span className="flex-1 font-medium text-end">{invoice.address}</span>
        </div>
      </div>
    );
  };

  const EditInvoiceButton = () => {
    return (
      <Button variant="outline" className="w-full mt-4 gap-2" onClick={onAddInvoice}>
        <PencilIcon className="w-5 h-5" />
        {formatMessage({ id: 'checkout.invoice.edit' })}
      </Button>
    );
  };

  const InvoiceWarning = () => {
    return (
      <div className="flex flex-row gap-2 items-center px-4 py-3 mb-3 bg-blue-50 dark:bg-blue-600 rounded-md">
        <InfoIcon className="w-5 h-5 text-blue-500 dark:text-blue-50" />
        <p className="text-sm text-blue-500 dark:text-blue-50">
          {formatMessage({ id: 'checkout.invoice.warning' }, { organizationName })}
        </p>
      </div>
    );
  };

  if (!visible) return null;

  return (
    <Card className={classNames({ 'pb-2': !invoice, 'grayscale pointer-events-none opacity-30': !enabled })}>
      <CardHeader
        title={formatMessage({ id: 'checkout.invoice.heading' })}
        subTitle={formatMessage({ id: 'checkout.invoice.subHeading' })}
        rightPanel={<Switch checked={!!invoice} onCheckedChange={onToggleInvoice} />}
      />
      {invoice && (
        <CardBody>
          <InvoiceWarning />
          <CurrentInvoiceCard />
          <EditInvoiceButton />
        </CardBody>
      )}
    </Card>
  );
}
