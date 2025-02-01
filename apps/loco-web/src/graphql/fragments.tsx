import { gql } from '@apollo/client';
/**
 *
 * This is a fragment for the event object
 * Please consider using useFragment to get the object again after the query happened.
 * For example after calling query for event in Details Page > pass event ID to get event from fragment on Checkout Page
 * Note that you need a key to determine which event to fetch again. Read this, find usefragment:
 * https://www.apollographql.com/docs/react/data/fragments/
 *
 * Naming convention: ComponentName_key (e.g. EventDetails_event)
 */

export const EVENT_FRAGMENT = gql`
  fragment EventFragment on FlipEvent {
    id
    handle
    name
    startAt
    endAt
    isOnSale
    onsale
    offsale
    isMultipleDay
    address {
      address
      city
      longitude
      latitude
      zip
    }
    venue {
      name
    }
    organization {
      id
      name
      description
      logoURL
    }
    status
    mediaCollection
    media {
      id
      type
      url
    }
  }
`;

export const ORDER_CARD_FRAGMENT = gql`
  fragment OrderCard_event on FlipEvent {
    id
    handle
    name
    startAt
    endAt
    isOnSale
    status
    mediaCollection
    media {
      id
      type
      url
    }
    hasSeatMap
  }
`;

export const EVENT_CARD_FRAGMENT = gql`
  fragment EventCard_event on FlipEvent {
    id
    handle
    name
    startAt
    endAt
    isOnSale
    onsale
    offsale
    address {
      address
      city
      longitude
      latitude
      zip
    }
    venue {
      name
    }
    organization {
      id
      name
      description
      logoURL
    }
    tickets {
      id
    }
    status
    mediaCollection
    media {
      id
      type
      url
    }
  }
`;

export const EVENT_DETAILS_FRAGMENT = gql`
  fragment EventDetails_event on FlipEvent {
    id
    handle
    createdAt
    updatedAt
    name
    description
    startAt
    endAt
    onsale
    offsale
    isOnSale
    policy
    address {
      address
      city
      longitude
      latitude
      zip
    }
    venue {
      name
    }
    organization {
      id
      handle
      name
      description
      logoURL
      contactEmail
    }
    media {
      id
      type
      url
    }
    mediaCollection
    hasSeatMap
    hasWaitingRoom
    maxTicketPerOrder
    status
    isMultipleDay
    parentEvent {
      id
    }
  }
`;

export const PARENT_EVENT_DETAILS_FRAGMENT = gql`
  fragment ParentEventDetails_event on FlipEvent {
    id
    handle
    createdAt
    updatedAt
    name
    description
    startAt
    endAt
    onsale
    offsale
    isOnSale
    policy
    address {
      address
      city
      longitude
      latitude
      zip
    }
    venue {
      name
    }
    organization {
      id
      handle
      name
      description
      logoURL
      contactEmail
    }
    media {
      id
      type
      url
    }
    mediaCollection
    hasSeatMap
    hasWaitingRoom
    maxTicketPerOrder
    status
    isMultipleDay
    parentEvent {
      id
    }
  }
`;
