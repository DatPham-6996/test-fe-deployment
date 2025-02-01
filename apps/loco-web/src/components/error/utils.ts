import { ApolloError } from '@apollo/client';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';

type ErrorObject = {
  message: string;
  status: StatusCodes;
};

export function parseError(error: any): ErrorObject {
  if (error instanceof ApolloError) {
    if (error.graphQLErrors.length && error.graphQLErrors[0].extensions.status === StatusCodes.NOT_FOUND) {
      return {
        status: StatusCodes.NOT_FOUND,
        message: error.graphQLErrors[0].message,
      };
    }
  }
  return {
    status: StatusCodes.INTERNAL_SERVER_ERROR,
    message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
  };
}
