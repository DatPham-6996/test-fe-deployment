import { FORM_ERROR, setIn } from 'final-form';
import { ValidationError } from 'yup';

export function formatPrice(price: string, currency: string = 'VND'): string {
  const numberPrice = Number(price) || 0;

  // Check if price is a valid number
  if (isNaN(numberPrice)) {
    console.error('Invalid price: The price must be a valid number.');
  }

  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0, // No decimal places for VND as standard
  }).format(numberPrice);
}

type Options = {
  context?: object;
  formatErrorMessagesWith?: (message: string) => string;
};

const transformYupErrorToFormError = (
  errors: ValidationError[],
  formatErrorMessagesWith = (message: string) => message
) => errors.reduce((acc, { path, message }) => setIn(acc, path || FORM_ERROR, formatErrorMessagesWith(message)), {});

export function validateYupSchema(schema: any, options?: Options) {
  return (values: any) => {
    try {
      schema.validateSync(values, { abortEarly: false, context: options?.context });
    } catch (error) {
      if (ValidationError.isError(error)) {
        return transformYupErrorToFormError(error.inner, options?.formatErrorMessagesWith);
      }
      throw new Error(error as any);
    }
  };
}

export function getTicketTypeDisplay(ticketType: string) {
  switch (ticketType) {
    case 'E_TICKET':
      return 'Vé điện tử';
    default:
      return 'Vé thường';
  }
}
