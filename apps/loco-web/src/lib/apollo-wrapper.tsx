'use client';

import { ApolloLink, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { RetryLink } from '@apollo/client/link/retry';
import { fromPromise } from '@apollo/client/link/utils';
import {
  ApolloNextAppProvider,
  NextSSRApolloClient,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr';
import { firebaseAuth } from './firebase';
import { useLocale } from '@/locale/intl-provider-wrapper';

function makeClient() {
  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_SCHEMA_PATH,
  });
  const authLink = setContext(async (_, { headers }) => {
    await firebaseAuth.authStateReady();
    const user = firebaseAuth.currentUser;
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const locale = typeof window !== 'undefined' ? window.localStorage.getItem('current_locale') || 'vi' : 'vi';
    let token = '';

    if (user) {
      token = await user.getIdToken();
    }

    return {
      headers: {
        timezone,
        ...headers,
        ...(token && token.length > 0 ? { authorization: `Bearer ${token}` } : {}),
        'Accept-Language': locale,
      },
    };
  });

  const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        switch (err.extensions.code) {
          case 'UNAUTHENTICATED':
            if (!firebaseAuth.currentUser) {
              // TODO: redirect to login page
              window.location.href = '/';
              return;
            }

            return fromPromise(
              firebaseAuth.currentUser
                .getIdToken(true)
                .then((token) => {
                  const oldHeaders = operation.getContext().headers;
                  operation.setContext({
                    headers: {
                      ...oldHeaders,
                      authorization: token,
                    },
                  });
                })
                .catch(() => {
                  // TODO: redirect to login page
                  window.location.href = '/';
                  return;
                })
            ).flatMap(() => forward(operation));
        }
      }
    }

    if (networkError) {
      console.error(`[Network error]: ${networkError}`);
    }
  });

  const retryLink = new RetryLink();

  const isServer = typeof window === 'undefined';
  const links = [errorLink, retryLink, authLink, httpLink];
  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            getMyTickets: {
              // Don't cache separate results based on
              // any of this field's arguments.
              keyArgs: false,
              // Concatenate the incoming list items with
              // the existing list items.
              merge(existing = [], incoming) {
                const nexts = incoming?.results || [];
                if (Array.isArray(nexts)) {
                  return [...existing, ...nexts];
                } else {
                  // If incoming is not iterable, log a warning or handle as appropriate
                  console.warn('Expected incoming to be an array, received:', nexts);
                  // Return existing to avoid breaking the application
                  return nexts;
                }
              },
            },
          },
        },
      },
    }),
    link: ApolloLink.from(
      isServer
        ? [
            new SSRMultipartLink({
              stripDefer: true,
            }),
            ...links,
          ]
        : links
    ),
  });
}

export function ApolloWrapper({ children }: { children: React.ReactNode }) {
  return <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>;
}
