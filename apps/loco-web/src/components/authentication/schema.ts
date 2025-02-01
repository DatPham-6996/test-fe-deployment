import { IntlShape } from 'react-intl';
import * as yup from 'yup';

const PASSWORD_MIN_LENGTH = 8;

export const getForgotPasswordSchema = (intl: IntlShape) => {
  const { formatMessage } = intl;

  return yup.object({
    email: yup
      .string()
      .required(formatMessage({ id: 'authentication.validation.emailRequired' }))
      .email(formatMessage({ id: 'authentication.validation.emailInvalid' })),
  });
};

export const getSignUpSchema = (intl: IntlShape) => {
  const { formatMessage } = intl;

  return yup.object({
    name: yup.string().required(formatMessage({ id: 'authentication.validation.nameRequired' })),
    email: yup
      .string()
      .required(formatMessage({ id: 'authentication.validation.emailRequired' }))
      .email(formatMessage({ id: 'authentication.validation.emailInvalid' })),
    password: yup
      .string()
      .required(formatMessage({ id: 'authentication.validation.passwordRequired' }))
      .min(
        PASSWORD_MIN_LENGTH,
        formatMessage({ id: 'authentication.validation.minLengthPassword' }, { length: PASSWORD_MIN_LENGTH })
      )
      .matches(/[^A-Za-z0-9]/, formatMessage({ id: 'authentication.validation.passwordInvalid' })),
    repassword: yup
      .string()
      .required(formatMessage({ id: 'authentication.validation.repasswordRequired' }))
      .oneOf([yup.ref('password')], formatMessage({ id: 'authentication.validation.passwordNotMatch' })),
  });
};

export const getLoginSchema = (intl: IntlShape) => {
  const { formatMessage } = intl;

  return yup.object({
    email: yup
      .string()
      .required(formatMessage({ id: 'authentication.validation.emailRequired' }))
      .email(formatMessage({ id: 'authentication.validation.emailInvalid' })),
    password: yup
      .string()
      .required(formatMessage({ id: 'authentication.validation.passwordRequired' }))
      .min(
        PASSWORD_MIN_LENGTH,
        formatMessage({ id: 'authentication.validation.minLengthPassword' }, { length: PASSWORD_MIN_LENGTH })
      )
      .matches(/[^A-Za-z0-9]/, formatMessage({ id: 'authentication.validation.passwordInvalid' })),
  });
};

export const getPasswordlessLoginSchema = (intl: IntlShape) => {
  const { formatMessage } = intl;

  return yup.object({
    email: yup
      .string()
      .required(formatMessage({ id: 'authentication.validation.emailRequired' }))
      .email(formatMessage({ id: 'authentication.validation.emailInvalid' })),
  });
};
