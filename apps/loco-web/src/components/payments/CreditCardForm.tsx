import { Button } from '@/components/shadcn/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/shadcn/ui/form';
import { Input } from '@/components/shadcn/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/shadcn/ui/radio-group';
import { Switch } from '@/components/shadcn/ui/switch';
import { useDeleteMyCardMutation, useGetMyCardsQuery } from '@/lib/__generated__/graphql';
import {
  CARD_VERIFICATION_PREFIX,
  CART_PAYMENT_SUCCEEDED_PREFIX,
  SPINNER_DARK_COLOR,
  SPINNER_LIGHT_COLOR,
} from '@/lib/utils/constants';
import { toastError, toastSuccess } from '@/lib/utils/toast';
import { useCompleteCartWithRetry } from '@/state-management/hooks/useCompleteCartWithRetry';
import { useIsDarkTheme } from '@/state-management/hooks/useIsDarkMode';
import { gql } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import cardValidator from 'card-validator';
import classnames from 'classnames';
import { CreditCardIcon, PlusIcon } from 'lucide-react';
import { useMeCustomer, useUpdatePaymentSession } from 'medusa-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { PulseLoader } from 'react-spinners';
import * as yup from 'yup';
import { DeleteCardAlert } from '../alert/DeleteCardAlert';
import { Calendar, Trash } from '../icon';
import { MasterCard } from '../icon/MasterCard';
import { VisaCard } from '../icon/VisaCard';
import { CardPaymentInfo, PaymentsProps } from './type';

const GET_MY_CARDS = gql`
  query GetMyCards {
    getMyCards {
      id
      customer_id
      customer_email
      token_id
      masked_card_number
      payment_method_id
      metadata
      created_at
      updated_at
    }
  }
`;

const DELETE_MY_CARD = gql`
  mutation DeleteMyCard($input: DeleteMyCardInput!) {
    deleteMyCard(input: $input) {
      id
    }
  }
`;

type PaymentMethod = {
  id: string;
  actions: TODO[];
  card: {
    card_information: {
      token_id: string;
      masked_card_number: string;
      [k: string]: unknown;
    };
  };
  [k: string]: unknown;
};

export const CreditCardForm = ({ onPaymentClick, paymentInfo }: PaymentsProps) => {
  const cartId = (paymentInfo as CardPaymentInfo).cartId;
  const [openAddCredit, setOpenAddCredit] = useState(false);
  const { formatMessage } = useIntl();
  const { mutateAsync: updatePaymentSession } = useUpdatePaymentSession(cartId);
  const { mutateAsync: completeCart } = useCompleteCartWithRetry(cartId);
  const { customer: flipCustomer } = useMeCustomer();
  const {
    loading: myCardsLoading,
    data: myCardsData,
    refetch: refetchMyCards,
  } = useGetMyCardsQuery({ fetchPolicy: 'no-cache' });
  const [deleteMyCard] = useDeleteMyCardMutation();
  const [selectedPaymentMethodId, setSelectedPaymentMethodId] = useState<string>();
  const [paymentSubmitting, setPaymentSubmitting] = useState<boolean>(false);
  const [deleteCardAlertOpen, setDeleteCardAlertOpen] = useState<boolean>(false);
  const [selectedCard, setSelectedCard] = useState<{ masked_card_number: string; id: string }>();
  const Xendit = (window as any).Xendit;
  const verificationId = cartId;
  const isDarkMode = useIsDarkTheme();

  useEffect(() => {
    if (paymentInfo?.paymentMethod !== 'card') {
      toastError(formatMessage({ id: 'payment.card.error' }));
      return;
    }

    if (!Xendit) {
      toastError(formatMessage({ id: 'payment.card.error' }));
      return;
    }

    Xendit.setPublishableKey(process.env.NEXT_PUBLIC_XENDIT_PUBLIC_KEY);

    setSelectedPaymentMethodId(myCardsData?.getMyCards[0]?.payment_method_id);
    if (myCardsData?.getMyCards?.length === 0) {
      setOpenAddCredit(true);
    }
  }, [paymentInfo, Xendit, formatMessage, setOpenAddCredit, myCardsData]);

  const formSchema = yup.object({
    cardNumber: yup
      .string()
      .length(16, formatMessage({ id: 'payment.card.cardNumberNotValid' }))
      .required(formatMessage({ id: 'payment.card.cardNumberNotEmpty' })),
    cardholderName: yup.string().required(formatMessage({ id: 'payment.card.cardholderNameNotEmpty' })),
    expiryDate: yup
      .string()
      .required(formatMessage({ id: 'payment.card.expiryDateNotEmpty' }))
      .length(5, formatMessage({ id: 'payment.card.expiryDateNotValid' }))
      .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, {
        message: formatMessage({ id: 'payment.card.expiryDateNotValid' }),
      }),
    cvv: yup
      .string()
      .length(3, formatMessage({ id: 'payment.card.cvvNotValid' }))
      .required(formatMessage({ id: 'payment.card.cvvNotEmpty' })),
    isMultipleUse: yup.boolean().required(),
  });

  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      isMultipleUse: false,
    },
  });

  const deleteCard = async (cardId: string) => {
    try {
      await deleteMyCard({ variables: { input: { cardId } } });

      toastSuccess(formatMessage({ id: 'payment.card.deleteCardSuccessfully' }));
      refetchMyCards();
    } catch (error) {
      toastError(formatMessage({ id: 'payment.card.error' }));
    }
  };

  const createPaymentMethod = async (values: {
    cardNumber: string;
    cardholderName: string;
    expiryDate: string;
    cvv: string;
    isMultipleUse: boolean;
  }): Promise<PaymentMethod> => {
    const { cardNumber, cardholderName, expiryDate, cvv, isMultipleUse } = values;

    return new Promise((resolve, reject) => {
      Xendit.payment.createPaymentMethod(
        {
          type: 'CARD',
          card: {
            currency: 'VND',
            channel_properties: {
              success_return_url: `${process.env.NEXT_PUBLIC_XENDIT_CARD_AUTHENTICATION_CALLBACK_URL}?verification_id=${verificationId}`,
              failure_return_url: `${process.env.NEXT_PUBLIC_XENDIT_CARD_AUTHENTICATION_CALLBACK_URL}?verification_id=${verificationId}`,
            },
            card_information: {
              card_number: cardNumber,
              expiry_month: expiryDate.split('/')[0],
              expiry_year: '20' + expiryDate.split('/')[1],
              cvv,
              cardholder_name: cardholderName,
            },
          },
          reusability: isMultipleUse ? 'MULTIPLE_USE' : 'ONE_TIME_USE',
          customer_id: flipCustomer?.metadata.xenditCustomerId, // Xendit customer
        },
        (err: TODO, resp: TODO) => {
          if (err) {
            reject(err);
          } else {
            resolve(resp);
          }
        }
      );
    });
  };

  const redirectToCardVerification = (params: { url: string; windowReference: Window }) => {
    const { url, windowReference } = params;

    windowReference.location = url;
    return windowReference;
  };

  const waitUntilPopupWindowClosed = (popupWindow: Window) => {
    return new Promise((resolve) => {
      const intervalId = setInterval(() => {
        if (popupWindow?.closed) {
          clearInterval(intervalId);
          resolve(void 0);
        }
      }, 500);
    });
  };

  const listenToVerificationEvent = (params: { popupWindow: Window }) => {
    const { popupWindow } = params;
    const intervalId = setInterval(() => {
      const cardVerificationKey = `${CARD_VERIFICATION_PREFIX}${verificationId}`;
      const isCartVerificationFinished = localStorage.getItem(cardVerificationKey) === 'true';
      const isPaymentSucceeded = sessionStorage.getItem(`${CART_PAYMENT_SUCCEEDED_PREFIX}${cartId}`) === 'true';
      if (isPaymentSucceeded || isCartVerificationFinished) {
        popupWindow.close();
      }

      if (popupWindow.closed) {
        localStorage.removeItem(cardVerificationKey);
        clearInterval(intervalId);
      }
    }, 500);
  };

  const actionHandler = async (params: { url: string; windowReference: Window }) => {
    const popupWindow = redirectToCardVerification({
      url: params.url,
      windowReference: params.windowReference,
    });

    if (!popupWindow) {
      throw new Error("Can't open card verification popup window");
    }

    listenToVerificationEvent({ popupWindow });

    await waitUntilPopupWindowClosed(popupWindow);
  };

  const onSubmit = async (values: {
    cardNumber: string;
    cardholderName: string;
    expiryDate: string;
    cvv: string;
    isMultipleUse: boolean;
  }) => {
    const { isMultipleUse, cardNumber, expiryDate } = values;

    let windowReference;
    try {
      if (!cardValidator.number(cardNumber).isValid) {
        throw new Error(`Invalid card number`);
      }

      if (!cardValidator.expirationDate(expiryDate).isValid) {
        throw new Error(`Invalid card expiration date`);
      }

      windowReference = openLoadingWindow();

      const paymentMethod = await createPaymentMethod(values);

      if (!isMultipleUse) {
        return paymentHandler({ paymentMethodId: paymentMethod.id, windowReference });
      }

      const actionUrl = paymentMethod.actions?.[0]?.url;
      if (actionUrl) {
        await actionHandler({ url: actionUrl, windowReference });
      } else {
        windowReference.close();
      }

      await updatePaymentSession({
        provider_id: 'card',
        data: {
          cardInfo: {
            paymentMethodId: paymentMethod.id,
            tokenId: paymentMethod.card.card_information.token_id,
            maskedCardNumber: paymentMethod.card.card_information.masked_card_number,
            metadata: paymentMethod.card,
            isMultipleUse,
          },
        },
      });

      toastSuccess(formatMessage({ id: 'payment.card.saveCardSuccessfully' }));
      await refetchMyCards();
      setSelectedPaymentMethodId(paymentMethod.id);
      setOpenAddCredit(false);
    } catch (error: TODO) {
      if (error.message.toLowerCase().includes('expiration date')) {
        toastError(formatMessage({ id: 'payment.card.expiryDateNotValid' }));
        return;
      }

      if (error.message.toLowerCase().includes('card')) {
        toastError(formatMessage({ id: 'payment.card.cardNumberNotValid' }));
        return;
      }

      toastError(formatMessage({ id: 'payment.card.saveCardFailed' }));
      windowReference?.close();
    }
  };

  const openLoadingWindow = (params?: { width?: number; height?: number }) => {
    const { width = 400, height = 500 } = params ?? {};

    const left = (screen.width - width) / 2;
    const top = (screen.height - height) / 2;
    const options = `width=${width},height=${height},top=${top},left=${left}`;

    const windowReference = window.open(
      `${process.env.NEXT_PUBLIC_XENDIT_CARD_AUTHENTICATION_CALLBACK_URL}`,
      'popup',
      options
    );

    if (!windowReference) {
      throw new Error("Can't open card verification popup window");
    }

    return windowReference;
  };

  const paymentHandler = async (params: { paymentMethodId: string | undefined; windowReference?: Window | null }) => {
    setPaymentSubmitting(true);

    let windowReference;
    try {
      windowReference = params.windowReference ?? openLoadingWindow();

      const storeCartsRes = await updatePaymentSession({
        provider_id: 'card',
        data: {
          cardInfo: { paymentMethodId: params.paymentMethodId },
        },
      });

      const actionUrl = (storeCartsRes.cart.payment_session?.data as TODO)?.actions?.[0]?.url;
      if (actionUrl) {
        await actionHandler({ url: actionUrl, windowReference });
      } else {
        windowReference.close();
      }

      const isPaymentSucceeded = sessionStorage.getItem(`${CART_PAYMENT_SUCCEEDED_PREFIX}${cartId}`) === 'true';
      if (isPaymentSucceeded) {
        return;
      }

      const completeCartRes = await completeCart();
      if (!completeCartRes?.data?.completed_at) {
        throw new Error('Attempt to complete the cart failed');
      }

      toastSuccess(formatMessage({ id: 'payment.notification.completeTransferSuccessfully' }), {
        toastId: 'completeTransferSuccessfully',
      });
      await onPaymentClick();
    } catch (error) {
      toastError(formatMessage({ id: 'payment.notification.paymentError' }));
      setPaymentSubmitting(false);
    } finally {
      windowReference?.close();
    }
  };

  const getCardIcon = (cardType: string | undefined) => {
    switch (cardType) {
      case 'VISA':
        return <VisaCard size={32} className="m-4" />;

      case 'MASTERCARD':
        return <MasterCard size={32} className="m-4" />;

      default:
        return (
          <div className="h-[46px] flex items-center">
            <CreditCardIcon className="w-[46px]" />
          </div>
        );
    }
  };

  const formatCardMaskNumber = (maskNumber: string): string => {
    return maskNumber.replaceAll('X', '*');
  };

  if (paymentInfo?.paymentMethod !== 'card') {
    return <></>;
  }

  if (myCardsLoading) {
    return (
      <div className="flex items-center justify-center w-full">
        <PulseLoader size={10} color={isDarkMode ? SPINNER_LIGHT_COLOR : SPINNER_DARK_COLOR} />
      </div>
    );
  }

  return (
    <div className="w-full px-1">
      {!openAddCredit && (
        <RadioGroup value={selectedPaymentMethodId}>
          <div className="flex flex-col">
            {myCardsData?.getMyCards?.map((card) => (
              <div key={card.payment_method_id} className="flex items-center pb-2">
                <div className="flex gap-4 items-center">
                  <div
                    className="flex gap-1 items-center cursor-pointer"
                    onClick={() => setSelectedPaymentMethodId(card.payment_method_id)}
                  >
                    <RadioGroupItem value={card.payment_method_id} />
                    {getCardIcon(card.metadata?.card_information?.network)}
                    <p className="text-sm font-medium">{formatCardMaskNumber(card.masked_card_number)}</p>
                  </div>
                  <div
                    onClick={() => {
                      setDeleteCardAlertOpen(true);
                      setSelectedCard(card);
                    }}
                  >
                    <Trash className="cursor-pointer" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </RadioGroup>
      )}

      <DeleteCardAlert
        onSubmit={() => deleteCard(selectedCard?.id ?? '')}
        maskCardNumber={formatCardMaskNumber(selectedCard?.masked_card_number ?? '')}
        open={deleteCardAlertOpen}
        setOpen={setDeleteCardAlertOpen}
      />

      {!openAddCredit && (
        <div>
          <a
            onClick={() => setOpenAddCredit(true)}
            className={classnames('text-blue-700 text-xs font-bold flex gap-x-1 items-center cursor-pointer w-fit', {
              'mt-5 mb-8': myCardsData?.getMyCards?.length !== 0,
            })}
          >
            <PlusIcon size={16} className="stroke-blue-700" />
            {formatMessage({ id: 'payment.addNewCard' })}
          </a>
        </div>
      )}

      {!openAddCredit && (
        <div className="mt-5">
          <Button
            className="w-full"
            onClick={() => paymentHandler({ paymentMethodId: selectedPaymentMethodId })}
            loading={paymentSubmitting}
          >
            {formatMessage({ id: 'payment.submitPayment' })}
          </Button>
        </div>
      )}

      {openAddCredit && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mb-2">
            <div className="flex gap-3 flex-wrap w-full max-[500px]:flex-col">
              <FormField
                control={form.control}
                name="cardNumber"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel htmlFor="cardNumber" className="text-sm font-medium">
                      {formatMessage({ id: 'payment.card.cardNumber' })}
                    </FormLabel>
                    <FormControl>
                      <Input
                        maxLength={16}
                        placeholder={formatMessage({ id: 'payment.card.enterCardNumber' })}
                        {...field}
                        onChange={(e) => {
                          let inputValue = e.target.value;
                          inputValue = inputValue.replace(/\D/g, '');
                          field.onChange(inputValue);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cardholderName"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel htmlFor="cardholderName" className="text-sm font-medium">
                      {formatMessage({ id: 'payment.card.cardholderName' })}
                    </FormLabel>
                    <FormControl>
                      <Input placeholder={formatMessage({ id: 'payment.card.enterCardholderName' })} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-3  w-full max-[500px]:flex-col">
              <FormField
                control={form.control}
                name="expiryDate"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel htmlFor="expiryDate" className="text-sm font-medium">
                      {formatMessage({ id: 'payment.card.expiryDate' })}
                    </FormLabel>
                    <FormControl>
                      <div className="w-full relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2" />
                        <Input
                          className="pl-10"
                          maxLength={5}
                          type="text"
                          placeholder={formatMessage({ id: 'payment.card.enterExpiryDate' })}
                          {...field}
                          onChange={(e) => {
                            let inputValue = e.target.value;
                            if ([3].includes(inputValue.length) && inputValue[inputValue.length - 1] === '/') {
                              field.onChange(inputValue);
                              return;
                            }

                            if ([4].includes(inputValue.length) && inputValue[inputValue.length - 1] === '/') {
                              return;
                            }

                            // Remove non-numeric characters
                            inputValue = inputValue.replace(/\D/g, '');
                            // Format date as MM/YY
                            if (inputValue.length <= 2) {
                              field.onChange(inputValue);
                            } else {
                              field.onChange(`${inputValue.slice(0, 2)}/${inputValue.slice(2)}`);
                            }
                          }}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cvv"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel htmlFor="cvv" className="text-sm font-medium">
                      {formatMessage({ id: 'payment.card.cvv' })}
                    </FormLabel>
                    <FormControl>
                      <Input
                        maxLength={3}
                        placeholder={formatMessage({ id: 'payment.card.enterCvv' })}
                        {...field}
                        onChange={(e) => {
                          let inputValue = e.target.value;
                          inputValue = inputValue.replace(/\D/g, '');
                          field.onChange(inputValue);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="isMultipleUse"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between items-center w-full">
                    <div>
                      <p className="text-sm font-medium">
                        {formatMessage({ id: 'payment.creditOrVisaCard.saveCardInformation' })}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatMessage({ id: 'payment.creditOrVisaCard.saveCardInformationDescription' })}
                      </p>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" loading={form.formState.isSubmitting || paymentSubmitting}>
              {form.getValues('isMultipleUse')
                ? formatMessage({ id: 'payment.card.saveCard' })
                : formatMessage({ id: 'payment.submitPayment' })}
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
};
