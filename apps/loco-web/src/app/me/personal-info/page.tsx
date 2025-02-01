'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/shadcn/ui/avatar';
import { FlipLayout } from '@/containers/flip-layout';
import { format } from 'date-fns-tz';
import { InfoIcon, PencilLine, PhoneIcon, PlusIcon } from 'lucide-react';
import { ReactNode, useEffect } from 'react';
import { useIntl } from 'react-intl';

import { Calendar, Email } from '@/components/icon';
import { BadgeCheck } from '@/components/icon/BadgeCheck';
import { Gender as GenderIcon } from '@/components/icon/Gender';
import { PersonalCard } from '@/components/icon/PersonalCard';
import { RedInfoCircle } from '@/components/icon/ReadInfoCircle';
import { UploadAvatar } from '@/components/icon/UploadAvatar';
import { DeleteAccountForm } from '@/components/personal-info/DeleteAccountForm';
import { MyPaymentMethod } from '@/components/personal-info/MyPaymentMethod';
import { AvatarForm } from '@/components/personal-info/avatar-form';
import { BirthdayForm } from '@/components/personal-info/birthday-form';
import { DisplayNameForm } from '@/components/personal-info/display-name-form';
import { EmailForm } from '@/components/personal-info/email-form';
import { GenderForm } from '@/components/personal-info/gender-form';
import { IdentityNumberForm } from '@/components/personal-info/identity-number-form';
import { PasswordForm } from '@/components/personal-info/password-form';
import { PhoneNumberForm } from '@/components/personal-info/phone-number-form';
import { useResponsiveDialog } from '@/components/responsive-dialog/responsive-dialog-context';
import { Button } from '@/components/shadcn/ui/button';
import { CoolDownButton } from '@/components/shadcn/ui/cool-down-button';
import { Separator } from '@/components/shadcn/ui/separator';
import { Gender, useCurrentUserQuery } from '@/lib/__generated__/graphql';
import { useLogEvent } from '@/lib/hooks/useLogEvent';
import { toastError, toastSuccess } from '@/lib/utils/toast';
import { useAuth } from '@/state-management/hooks/useAuth';
import { useIsDarkTheme } from '@/state-management/hooks/useIsDarkMode';
import { useRouter } from 'next-nprogress-bar';
import { useSearchParams } from 'next/navigation';
import { ClipLoader } from 'react-spinners';


export default function PersonalInfo() {
  const router = useRouter();
  const { formatMessage } = useIntl();
  const { currentUser: firebaseUser, isLoggedIn, sendSignUpVerificationEmail, openLoginModal } = useAuth();
  const searchParams = useSearchParams();
  const isRedirectedFromEmailVerify = searchParams.get('verifyEmail') && firebaseUser?.emailVerified;
  const { logEvent } = useLogEvent();
  const isDarkMode = useIsDarkTheme();

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace('/');
      openLoginModal();
    }
  }, [isLoggedIn, openLoginModal, router]);

  const { data, loading, refetch } = useCurrentUserQuery({ fetchPolicy: 'no-cache' });
  const flipUser = data?.currentUser;

  const { openDialog } = useResponsiveDialog();

  const getEditIcon = (editForm: ReactNode) => (
    <PencilLine size={16} className="min-w-[16px] cursor-pointer " onClick={() => openDialog(editForm)} />
  );

  const formatGender = (gender?: Gender | null) => {
    switch (gender) {
      case Gender.Male:
        return formatMessage({ id: 'me.personalInfo.male' });

      case Gender.Female:
        return formatMessage({ id: 'me.personalInfo.female' });

      case Gender.Other:
        return formatMessage({ id: 'me.personalInfo.other' });

      default:
        return;
    }
  };

  const onVerifyEmailClick = async () => {
    try {
      logEvent({
        eventName: 'personal_info_verify_email',
        value: firebaseUser?.email || '',
      });
      await sendSignUpVerificationEmail();
      toastSuccess(formatMessage({ id: 'authentication.sendEmailVerifySuccessfully' }));
    } catch (error) {
      toastError(formatMessage({ id: 'authentication.sendEmailVerifyFailed' }));
    }
  };

  if (loading) {
    return (
      <FlipLayout>
        <div className="container mx-auto px-8 md:px-32">
          <p className="text-foreground text-4xl font-semibold mt-4 mb-8">
            {formatMessage({ id: 'me.personalInfo.yourAccount' })}
          </p>
        </div>
        <ClipLoader className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      </FlipLayout>
    );
  }

  return (
    <FlipLayout>
      <div className="container mx-auto px-8 md:px-32">
        <p className="text-foreground text-4xl font-semibold mt-4 mb-8 md:text-left text-center">
          {formatMessage({ id: 'me.personalInfo.yourAccount' })}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 w-auto md:gap-16 gap-6">
          <div className="flex flex-col items-center gap-2">
            <div className="relative">
              <Avatar className="w-44 h-44 mb-5 border-2 border-muted">
                <AvatarImage src={flipUser?.profileImageURL ?? ''} alt="user-avatar" />
                <AvatarFallback className="bg-flip text-8xl">
                  {flipUser?.displayName?.charAt(0)?.toLocaleUpperCase() ?? 'U'}
                </AvatarFallback>
              </Avatar>
              <UploadAvatar
                size={40}
                className="right-[19px] bottom-[19px] absolute cursor-pointer"
                onClick={() => {
                  openDialog(<AvatarForm refetchUser={refetch} firebaseUser={firebaseUser!} />);
                }}
              />
            </div>
            <div className="flex items-center gap-2">
              <p className="text-center text-foreground font-semibold text-[22px]">{flipUser?.displayName}</p>
              {getEditIcon(
                <DisplayNameForm
                  displayName={flipUser?.displayName ?? formatMessage({ id: 'me.personalInfo.yourName' })}
                  firebaseUser={firebaseUser!}
                  refetchUser={refetch}
                />
              )}
            </div>
            <div className="flex">
              <p className="text-muted-foreground text-base font-normal">
                {formatMessage({ id: 'me.personalInfo.joinedAt' })}:{' '}
                {flipUser?.createdAt && format(new Date(flipUser?.createdAt), 'MM/dd/yyyy')}
              </p>
            </div>
            <Separator className="my-0 w-[180px] md:hidden border" />
          </div>

          <div className="flex flex-col gap-2 md:pt-6 pt-5">
            <div className="flex gap-4">
              <PhoneIcon size={24} color="#737373" />
              <div className="flex flex-col flex-grow gap-1">
                <p className="text-foreground text-base font-semibold">
                  {formatMessage({ id: 'me.personalInfo.phoneNumber' })}
                </p>
                <p className="min-h-6">{flipUser?.phone}</p>
              </div>
              {getEditIcon(
                <PhoneNumberForm phone={flipUser?.phone} refetchUser={refetch} firebaseUser={firebaseUser!} />
              )}
            </div>

            <Separator className="my-4 border" />

            <div className="flex gap-4">
              <PersonalCard size={24} />
              <div className="flex flex-col flex-grow gap-1">
                <p className="text-foreground text-base font-semibold">
                  {formatMessage({ id: 'me.personalInfo.identityNumber' })}
                </p>
                <p className="min-h-6">{flipUser?.identityNumber}</p>
              </div>
              {getEditIcon(
                <IdentityNumberForm
                  identityNumber={flipUser?.identityNumber}
                  refetchUser={refetch}
                  firebaseUser={firebaseUser!}
                />
              )}
            </div>

            <Separator className="my-4 border" />

            <div className="flex gap-4">
              <Email className="w-[24px] h-[24px]" />
              <div className="flex flex-col flex-grow gap-1">
                <p className="text-foreground text-base font-semibold">
                  {formatMessage({ id: 'me.personalInfo.email' })}
                </p>
                <div className="flex">
                  <p className="mr-2">{flipUser?.email}</p>
                  {firebaseUser?.emailVerified ? <BadgeCheck size={24} /> : <RedInfoCircle size={24} />}
                </div>
                {isRedirectedFromEmailVerify && (
                  <p className="text-sm font-light">{formatMessage({ id: 'me.personalInfo.emailVerified' })}</p>
                )}
                {!firebaseUser?.emailVerified && (
                  <p className="text-sm font-light">{formatMessage({ id: 'me.personalInfo.emailNotVerified' })}</p>
                )}
                {!firebaseUser?.emailVerified && (
                  <CoolDownButton
                    variant="ghost"
                    className="text-blue-700 text-sm font-medium cursor-pointer w-fit p-0"
                    onClick={onVerifyEmailClick}
                  >
                    {formatMessage({ id: 'me.personalInfo.verifyEmail' })}
                  </CoolDownButton>
                )}
              </div>
              {getEditIcon(<EmailForm email={flipUser?.email ?? ''} firebaseUser={firebaseUser} />)}
            </div>

            <Separator className="mt-4 md:hidden" />
          </div>

          <div className="flex flex-col gap-2 md:pt-6">
            <div className="flex gap-4">
              <Calendar size={24} />
              <div className="flex flex-col flex-grow gap-1">
                <p className="text-foreground text-base font-semibold">
                  {formatMessage({ id: 'me.personalInfo.birthday' })}
                </p>
                <p className="min-h-6">{flipUser?.birthday && format(new Date(flipUser?.birthday), 'MM/dd/yyyy')}</p>
              </div>
              {getEditIcon(
                <BirthdayForm birthday={flipUser?.birthday} refetchUser={refetch} firebaseUser={firebaseUser!} />
              )}
            </div>

            <Separator className="my-4 border" />

            <div className="flex gap-4">
              <GenderIcon size={24} />
              <div className="flex flex-col flex-grow gap-1">
                <p className="text-foreground text-base font-semibold">
                  {formatMessage({ id: 'me.personalInfo.gender' })}
                </p>
                <p className="min-h-6">{formatGender(flipUser?.gender)}</p>
              </div>
              {getEditIcon(<GenderForm gender={flipUser?.gender} refetchUser={refetch} firebaseUser={firebaseUser!} />)}
            </div>

            <Separator className="my-4 hidden md:block border" />

            {/* TODO: Enable later */}
            {/* <Flex gap="4"> */}
            {/* <Email className="w-[24px] h-[24px] min-w-[24px]" />
              <Flex direction="column" className="flex-grow" gap="1">
                <p className="text-foreground text-base font-semibold">
                  {formatMessage({ id: 'me.personalInfo.address' })}
                </p>
                <p>{'TODO'}</p>
              </Flex>
              {getEditIcon(<AddressForm />)} */}
            {/* </Flex> */}
          </div>
        </div>

        <Separator className="md:mt-8 md:mb-4 mt-6 mb-8 border" />

        <div className="flex flex-col md:flex-row md:justify-between md:items-center md:gap-6">
          <div>
            <p className="text-foreground text-lg font-semibold">
              {formatMessage({ id: 'me.personalInfo.changePasswordTitle' })}
            </p>
            <p className="text-muted-foreground text-base font-normal">
              {formatMessage({ id: 'me.personalInfo.changePasswordDescription' })}
            </p>
          </div>
          <Button
            size={'sm'}
            onClick={() => openDialog(<PasswordForm firebaseUser={firebaseUser} />)}
            className="w-44 max-w-[210px] my-7"
          >
            {formatMessage({ id: 'me.personalInfo.changePassword' })}
          </Button>
        </div>

        <Separator className="mb-4 border" />

        <div className="flex flex-col md:flex-row md:justify-between md:items-center md:gap-6">
          <div>
            <p className="text-foreground text-lg font-semibold">
              {formatMessage({ id: 'me.personalInfo.paymentMethodTitle' })}
            </p>
            <p className="text-muted-foreground text-base font-normal">
              {formatMessage({ id: 'me.personalInfo.paymentMethodDescription' })}
            </p>
          </div>
          <Button
            size={'sm'}
            className="w-44 max-w-[210px] my-7"
            onClick={() => openDialog(<MyPaymentMethod firebaseUser={firebaseUser} />)}
          >
            <PlusIcon color={isDarkMode ? `#000` : `#FACC15`} size={16} className="mr-2" />
            {formatMessage({ id: 'me.personalInfo.addPaymentMethod' })}
          </Button>
        </div>

        <Separator className="mb-4 border" />

        <div className="flex flex-col md:flex-row md:justify-between md:items-center md:gap-6">
          <div>
            <p className="text-foreground text-lg font-semibold">
              {formatMessage({ id: 'me.personalInfo.deleteAccountTitle' })}
            </p>
            <p className="text-muted-foreground text-base font-normal">
              {formatMessage({ id: 'me.personalInfo.deleteAccountDescription' })}
            </p>
          </div>
          <Button
            size={'sm'}
            className="w-44 max-w-[210px] my-7"
            onClick={() => openDialog(<DeleteAccountForm firebaseUser={firebaseUser} />)}
          >
            <InfoIcon color={isDarkMode ? `#000` : `#FACC15`} size={16} className="mr-2" />
            {formatMessage({ id: 'me.personalInfo.deleteAccount' })}
          </Button>
        </div>
      </div>
    </FlipLayout>
  );
}
