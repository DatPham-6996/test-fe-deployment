import { useCheckoutInfo } from '@/app/checkout/[handle]/[cartId]/components/hook/useCheckoutInfo';
import { Email, Phone, ProfileCircle } from '@/components/icon';
import { useResponsiveDialog } from '@/components/responsive-dialog/responsive-dialog-context';
import { useIsDarkTheme } from '@/state-management/hooks/useIsDarkMode';
import { PencilLine } from 'lucide-react';
import { ReactNode, useCallback, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { ClipLoader } from 'react-spinners';
import { Card, CardBody, CardHeader } from '../../components/card';
import { UpdateEmailTicketForm } from './form/UpdateEmailTicketForm';
import { UpdateNameTicketForm } from './form/UpdateNameTicketForm';
import { UpdateUserPhoneTicketForm } from './form/UpdatePhoneTicketForm';

export function ReceiverInformation({ cartId, onValidationChange }: { cartId: string; onValidationChange: (isValid: boolean) => void }) {
  const { openDialog } = useResponsiveDialog();
  const intl = useIntl();
  const { formatMessage } = intl;
  const noInfoText = formatMessage({ id: 'checkout.receiverInfo.noInfo' });
  const { email, setEmail, displayName, setDisplayName, phone, setPhone, loading } = useCheckoutInfo();
  const isDarkMode = useIsDarkTheme();

  const data = [
    {
      icon: <ProfileCircle />,
      heading: formatMessage({ id: 'checkout.receiverInfo.name' }),
      content: displayName,
      editForm: <UpdateNameTicketForm name={displayName} setName={setDisplayName} cartId={cartId} />,
      required: true,
    },
    {
      icon: <Email />,
      heading: formatMessage({ id: 'checkout.receiverInfo.email' }),
      content: email,
      editForm: <UpdateEmailTicketForm email={email} setEmail={setEmail} cartId={cartId} />,
      required: true,
    },
    {
      icon: <Phone />,
      heading: formatMessage({ id: 'checkout.receiverInfo.phone' }),
      content: phone,
      editForm: <UpdateUserPhoneTicketForm
        phone={phone?.toString() ?? ''}
        setPhone={setPhone}
        cartId={cartId}
      />,
      required: true,
    },
  ];

  const getEditIcon = (editForm: ReactNode) =>
    editForm && (
      <PencilLine
        size={16}
        color={isDarkMode ? '#737373' : '#0A0A0A'}
        className="min-w-[16px] cursor-pointer"
        onClick={() => openDialog(editForm)}
      />
    );

  const renderLoading = () => {
    return (
      <div className="flex flex-col items-center py-7">
        <ClipLoader />
      </div>
    );
  };

  const validateFields = useCallback(() => {
    const isEmailValid = Boolean(email?.trim().length > 0);
    const isNameValid = Boolean(displayName?.trim().length > 0);
    const isPhoneValid = Boolean(phone && phone?.trim().length > 0);

    const isValid = isEmailValid && isNameValid && isPhoneValid;
    onValidationChange(isValid);
  }, [email, displayName, phone, onValidationChange]);

  useEffect(() => {
    validateFields();
  }, [email, displayName, phone, validateFields]);

  return (
    <Card>
      <CardHeader
        title={formatMessage({ id: 'checkout.receiverInfo.heading' })}
        subTitle={formatMessage({ id: 'checkout.receiverInfo.subHeading' })}
        withSeparator={true}
      />

      <CardBody>
        {loading && renderLoading()}
        {!loading && (
          <div className="flex flex-col gap-4">
            {data.map((item, index) => (
              <div className="flex gap-3 items-start" key={index}>
                <div>{item.icon}</div>
                <div className="flex flex-col gap-1.5">
                  <p className="text-sm">
                    {item.heading}{' '}
                    {item.required ? <span className="text-destructive text-sm font-bold">*</span> : null}
                  </p>

                  <div className="flex gap-2 items-center">
                    {item.content ? (
                      <p className="font-bold text-sm">{item.content}</p>
                    ) : (
                      <p className="text-sm italic text-muted-foreground">{noInfoText}</p>
                    )}
                    {getEditIcon(item.editForm)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardBody>
    </Card>
  );
}
