import { IntlShape } from 'react-intl';
import * as yup from 'yup';

export const getReceiverInformationSchema = (intl: IntlShape) => {
  const { formatMessage } = intl;

  return yup.object({
    name: yup.string().required(formatMessage({ id: 'checkout.validation.nameRequired' })),
    email: yup
      .string()
      .required(formatMessage({ id: 'checkout.validation.emailRequired' }))
      .email(formatMessage({ id: 'checkout.validation.emailInvalid' })),
    phone: yup.string().required(formatMessage({ id: 'checkout.validation.phoneRequired' })),
  });
};
