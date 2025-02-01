import { gql } from '@apollo/client';

export const UPDATE_CART_METADATA = gql`
  mutation UpdateCartMetadata($input: UpdateCartMetadataInput!) {
    updateCartMetadata(input: $input) {
      metadata
    }
  }
`;

export const DELETE_RESERVATION_SESSION = gql`
  mutation DeleteReservationSession($input: DeleteReservationSessionInput!) {
    deleteReservationSession(input: $input)
  }
`;

export const CREATE_PAYOUT_REQUEST = gql`
  mutation CreateEventPayoutRequest($input: CreateEventPayoutRequestInput!) {
    createEventPayoutRequest(input: $input) {
      id
      metadata
      status
      created_at
      updated_at
      paid_by
      paid_at
      settlement_status
      amount
      event_id
      organization_id
      requested_by
    }
  }
`;

export const CREATE_EXTERNAL_EVENT = gql`
  mutation CreateExternalEvent($data: ExternalEventCreateInput!) {
    createExternalEvent(data: $data) {
      id
      name
      startAt
      endAt
      isOnSale
      ticketUrl
      organizationName
      createdAt
      updatedAt
      mediaURLs
      address {
        address
        city
      }
      artists {
        handle
      }
      FlipMedia {
        url
      }
    }
  }
`;

export const UPSERT_ORGANIZATION_CHECKOUT_CONFIGS = gql`
  mutation UpsertOrganizationCheckoutConfigs($input: UpsertOrganizationCheckoutConfigsInput!) {
    upsertOrganizationCheckoutConfigs(input: $input) {
      id
    }
  }
`;

const DELETE_DISCOUNT = gql(`
  mutation DeleteDiscount($input: DeleteDiscountInput!) {
    deleteDiscount(input: $input) {
      id
    }
  }
`);

const CREATE_DISCOUNT = gql(`
  mutation CreateDiscounts($input: CreateDiscountInput!) {
    createDiscount(input: $input) {
      id
    }
  }
`);

const UPDATE_DISCOUNT = gql(`
  mutation UpdateDiscounts($input: UpdateDiscountInput!) {
    updateDiscount(input: $input) {
      id
    }
  }
`);

export const CREATE_EVENT = gql`
  mutation CreateEvent($data: EventCreateInput!) {
    createEvent(data: $data) {
      id
    }
  }
`;

export const REQUEST_PAYOUT_REPORT = gql(`
  mutation RequestPayoutReport($input: RequestPayoutReportInput!) {
    requestPayoutReport(input: $input) {
      reportId
    }
  }
`);

export const REQUEST_ORDER_REPORT = gql(`
  mutation RequestOrderReport($input: RequestOrderReportInput!) {
    requestOrderReport(input: $input) {
      reportId
    }
  }
`);

export const UPDATE_EVENT_HOLD_SEATS_RULES = gql`
  mutation UpdateEventHoldSeatsRules($input: UpdateEventHoldSeatsRulesInput!) {
    updateEventHoldSeatsRules(input: $input) {
      id
    }
  }
`;

export const UPDATE_TICKET_TIER_INVENTORY_AND_HOLD = gql`
  mutation UpdateTicketTierInventoryAndHold($input: UpdateTicketTierInventoryAndHeldInput!) {
    updateTicketTierInventoryAndHold(input: $input) {
      id
    }
  }
`;

export const SEND_PASSWORDLESS_SIGN_IN_EMAIL = gql`
  mutation SendPasswordlessSignInEmail($data: SendPasswordlessSignInEmailInput!) {
    sendPasswordlessSignInEmail(data: $data)
  }
`;

export const REQUEST_ORGANIZATION_PAYOUT_REPORT = gql(`
  mutation RequestOrganizationPayoutReport($input: RequestOrganizationPayoutReportInput!) {
    requestOrganizationPayoutReport(input: $input) {
      reportId
    }
  }
`);

export const ADD_CART_INVOICE = gql(`
  mutation AddCartInvoice($input: AddCardInvoiceInput!){
    addCartInvoice(input: $input) {
      id
      email
      address
      name
      phone
      tax_code
    }
  }
`);

export const REMOVE_CART_INVOICE = gql(`
  mutation RemoveCartInvoice($input: RemoveCartInvoiceInput!) {
    removeCartInvoice(input: $input) {
      id
    }
  }
`);

export const REQUEST_ORGANIZATION_INVOICE_REPORT = gql(`
  mutation RequestOrganizationInvoiceReport($input: RequestOrganizationInvoiceReportInput!) {
    requestOrganizationInvoiceReport(input: $input) {
      reportId
    }
  }
`);
