import { Button } from '@/components/shadcn/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/shadcn/ui/form';
import { Input } from '@/components/shadcn/ui/input';
import { useDeleteMyCardMutation, useGetMyCardsQuery, useSaveCardMutation } from '@/lib/__generated__/graphql';
import { CARD_VERIFICATION_PREFIX, SPINNER_DARK_COLOR, SPINNER_LIGHT_COLOR } from '@/lib/utils/constants';
import { toastError, toastSuccess } from '@/lib/utils/toast';
import { useIsDarkTheme } from '@/state-management/hooks/useIsDarkMode';
import { gql } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import cardValidator from 'card-validator';
import classnames from 'classnames';
import { User } from 'firebase/auth';
import { CreditCardIcon } from 'lucide-react';
import { useMeCustomer } from 'medusa-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { PulseLoader } from 'react-spinners';
import * as yup from 'yup';
import { DeleteCardAlert } from '../alert/DeleteCardAlert';
import { Calendar, Trash } from '../icon';
import { MasterCard } from '../icon/MasterCard';
import { VisaCard } from '../icon/VisaCard';

const SAVE_CARD = gql`
  mutation SaveCard($input: SaveCardInput!) {
    saveCard(input: $input) {
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

export const MyPaymentMethod = ({ firebaseUser }: { firebaseUser: User | null }) => {
  const [openAddCredit, setOpenAddCredit] = useState(false);
  const { formatMessage } = useIntl();
  const { customer: flipCustomer } = useMeCustomer();
  const {
    loading: myCardsLoading,
    data: myCardsData,
    refetch: refetchMyCards,
  } = useGetMyCardsQuery({ fetchPolicy: 'no-cache' });
  const [saveCard] = useSaveCardMutation();
  const [deleteMyCard] = useDeleteMyCardMutation();
  const [deleteCardAlertOpen, setDeleteCardAlertOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<{ masked_card_number: string; id: string }>();
  const Xendit = (window as any).Xendit;
  const verificationId = Date.now();
  const isDarkMode = useIsDarkTheme();

  useEffect(() => {
    if (!Xendit) {
      toastError(formatMessage({ id: 'payment.card.error' }));
      return;
    }

    Xendit.setPublishableKey(process.env.NEXT_PUBLIC_XENDIT_PUBLIC_KEY);
  }, [Xendit, formatMessage, setOpenAddCredit, myCardsData]);

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
      isMultipleUse: true,
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
  }): Promise<PaymentMethod> => {
    const { cardNumber, cardholderName, expiryDate, cvv } = values;

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
          reusability: 'MULTIPLE_USE',
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
      if (isCartVerificationFinished) {
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

  const onSubmit = async (values: { cardNumber: string; cardholderName: string; expiryDate: string; cvv: string }) => {
    const { cardNumber, expiryDate } = values;

    if (!firebaseUser?.emailVerified) {
      toastError(formatMessage({ id: 'me.personalInfo.emailNotVerified' }));
      return;
    }

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

      const actionUrl = paymentMethod.actions?.[0]?.url;
      if (actionUrl) {
        await actionHandler({ url: actionUrl, windowReference });
      } else {
        windowReference.close();
      }

      await saveCard({
        variables: {
          input: {
            paymentMethodId: paymentMethod.id,
            tokenId: paymentMethod.card.card_information.token_id,
            maskedCardNumber: paymentMethod.card.card_information.masked_card_number,
            metadata: paymentMethod.card,
          },
        },
      });

      toastSuccess(formatMessage({ id: 'payment.card.saveCardSuccessfully' }));
      await refetchMyCards();
      setOpenAddCredit(false);
    } catch (error: TODO) {
      if (error.message.toLowerCase().includes('expiration date')) {
        toastError(formatMessage({ id: 'payment.card.expiryDateNotValid' }));
        return;
      }

      if (error.message.toLowerCase().includes('card number')) {
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

  const getCardIcon = (cardType: string | undefined) => {
    switch (cardType) {
      case 'VISA':
        return <VisaCard size={32} className="my-4 mr-2" />;

      case 'MASTERCARD':
        return <MasterCard size={32} className="my-4 mr-2" />;

      default:
        return (
          <div className="flex h-[46px] items-center">
            <CreditCardIcon className="w-[46px]" />
          </div>
        );
    }
  };

  const formatCardMaskNumber = (maskNumber: string): string => {
    return maskNumber.replaceAll('X', '*');
  };

  if (myCardsLoading) {
    return (
      <div className="flex w-full items-center justify-center">
        <PulseLoader size={10} color={isDarkMode ? SPINNER_LIGHT_COLOR : SPINNER_DARK_COLOR} />
      </div>
    );
  }

  return (
    <div>
      <div className="pb-4 flex-col">
        <h1 className="text-3xl font-medium mt-8">{formatMessage({ id: 'me.personalInfo.myCard' })}</h1>
        <span className="text-muted-foreground text-base font-normal">
          {formatMessage({ id: 'me.personalInfo.paymentMethodDescription' })}
        </span>
      </div>
      <div className="w-full px-1">
        {!openAddCredit && (
          <div className="flex-col">
            {myCardsData?.getMyCards?.map((card) => (
              <div key={card.payment_method_id} className="pb-2 flex items-center">
                <div className="flex items-center gap-4">
                  {getCardIcon(card.metadata?.card_information?.network)}
                  <div className="flex-grow">{formatCardMaskNumber(card.masked_card_number)}</div>
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
        )}

        <DeleteCardAlert
          onSubmit={() => deleteCard(selectedCard?.id ?? '')}
          maskCardNumber={formatCardMaskNumber(selectedCard?.masked_card_number ?? '')}
          open={deleteCardAlertOpen}
          setOpen={setDeleteCardAlertOpen}
        />

        {!openAddCredit && (
          <div>
            <Button
              className={classnames('w-full mt-0 mb-2', {
                'mt-5': myCardsData?.getMyCards?.length !== 0,
              })}
              onClick={() => {
                if (!firebaseUser?.emailVerified) {
                  toastError(formatMessage({ id: 'me.personalInfo.emailNotVerified' }));
                  return;
                }
                setOpenAddCredit(true);
              }}
            >
              {formatMessage({ id: 'me.personalInfo.addPaymentMethod' })}
            </Button>
          </div>
        )}

        {openAddCredit && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mb-2">
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
                        type="password"
                        hideEyeIcon={true}
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

              <Button type="submit" className="w-full !mt-5" loading={form.formState.isSubmitting}>
                {formatMessage({ id: 'payment.card.saveCard' })}
              </Button>
            </form>
          </Form>
        )}
      </div>
    </div>
  );
};
