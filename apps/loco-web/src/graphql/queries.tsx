import { gql } from '@apollo/client';
import { EVENT_CARD_FRAGMENT, ORDER_CARD_FRAGMENT } from './fragments';

export const GET_RESERVATION_SESSION = gql`
  query GetReservationSession($input: GetReservationSessionInput!) {
    getReservationSession(input: $input) {
      expireAt
      bufferTimeMs
      isCartCompleted
    }
  }
`;

export const GET_TICKET_DETAILS = gql`
  ${EVENT_CARD_FRAGMENT}
  query MyTickets($data: GetTicketHistoryInput!) {
    getMyTickets(data: $data) {
      results {
        ...EventCard_event
      }
    }
  }
`;

export const TICKET_DETAILS_QUERY = gql(`
  query TicketDetails($data: GetTicketDetailsInput!) {
    getTicketDetails(data: $data) {
      validationCode
      checkedInBy
      status
      owner {
        displayName
      }
      event {
        id
        name
        startAt
        endAt
        hasSeatMap
        status
        address {
          address
        }
      }
      metadata
      ticketingVariantId
      sectionName
    }
  }
`);

export const ORDER_FEED_QUERY = gql`
  ${ORDER_CARD_FRAGMENT}
  query MyOrder($input: GetMyOrdersInput!) {
    getMyOrders(input: $input) {
      orders {
        cartDisplayId
        orderDisplayId
        eventId
        event {
          ...OrderCard_event
        }
        cartId
        total
        ticketCount
        type
        orderId
        createdAt
        ticketTiers {
          id
          name
          quantity
          __typename
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        startCursor
      }
    }
  }
`;

export const ORDER_DETAILS_QUERY = gql`
  ${ORDER_CARD_FRAGMENT}
  query GetOrderDetails($input: GetOrderDetailsInput!) {
    getOrderDetails(input: $input) {
      status
      cartDisplayId
      orderDisplayId
      eventId
      cartId
      total
      ticketCount
      type
      orderId
      createdAt
      ticketTiers {
        id
        name
        quantity
        __typename
      }
      event {
        ...OrderCard_event
      }
      discount
      email
      fee
      name
      subTotal
      tax
      taxRate
      payment {
        provider
      }
    }
  }
`;

export const GET_EVENT_VIEWS_CHART_GROUP_BY_CHANNEL = gql`
  query GetEventViewsChartGroupByChannel($input: GetEventViewsChartGroupByChannelInput!) {
    getEventViewsChartGroupByChannel(input: $input) {
      xs
      ys {
        name
        data
      }
      unit
    }
  }
`;

export const GET_TOTAL_EVENTS_STATS_GROUP_BY_CHANNEL = gql`
  query GetTotalEventStatsGroupByChannel($input: GetTotalEventStatInput!) {
    getTotalEventStatsGroupByChannel(input: $input) {
      channels {
        name
        viewCount
        totalVisitors
        totalBuyers
      }
      totalViewCount
    }
  }
`;

export const GET_TOTAL_ORDERS_BY_LOCATION = gql`
  query GetTotalOrdersByLocation($input: GetTotalOrderByLocationInput!) {
    getTotalOrdersByLocation(input: $input) {
      totalByCity {
        name
        count
      }
      totalOfAllCities
      cities
    }
  }
`;

export const GET_TOTAL_EVENT_DETAILS_VIEWS = gql`
  query GetTotalEventDetailsViews($input: GetTotalEventDetailsViewInput!) {
    getTotalEventDetailsViews(input: $input) {
      sameDayLastWeekCount
      thisMonthCount
      lastMonthCount
      last24HourCount
    }
  }
`;

export const GET_MY_ORGANIZATIONS = gql`
  query GetMyOrganizations {
    getMyOrganizations {
      id
      name
      ownerId
      description
      websiteURL
      contactEmail
      contactPhone
      logoURL
      metadata
    }
  }
`;

export const GET_MY_EVENTS = gql`
  query GetMyEvents($data: GetMyEventsInput!) {
    getMyEvents(data: $data) {
      events {
        id
        handle
        createdAt
        updatedAt
        organizationId
        name
        description
        startAt
        endAt
        addressId
        venueId
        status
        hasSeatMap
        maxTicketPerOrder
        isMultipleDay
        isParentEvent
        media {
          id
          type
          url
        }
        address {
          address
        }
        venue {
          name
        }
      }
      pagination {
        page
        size
        total
      }
    }
  }
`;

export const GET_EVENT_SEAT_MAP = gql`
  query GetSeatMap($input: GeEventSeatMapInput!) {
    getEventSeatMap(input: $input) {
      seatMapUrl
      heldSeats
      reservingSeats
      soldSeats
      gaSectionInventory
    }
  }
`;

export const GET_RESERVATION_SESSION_BY_EVENT = gql`
  query GetReservationSessionByEvent($input: GetReservationSessionByEventInput!) {
    getReservationSessionByEvent(input: $input) {
      expireAt
      bufferTimeMs
      cartId
    }
  }
`;

export const GET_EVENT_FINANCIAL_SUMMARY = gql`
  query GetEventFinancialSummary($input: GetEventFinancialSummaryInput!) {
    getEventOrderFinancialSummary(input: $input) {
      totalRevenueAmount
      totalFeeAmount
      profitAmount
      totalOrdersCount
      completedOrdersCount
      pendingOrdersCount
      canceledOrdersCount
      pendingBalance
      totalAddOnAmount
    }
  }
`;

export const GET_PAYOUT_METHODS = gql`
  query GetPayoutMethods($input: GetPayoutMethodsInput!) {
    payoutMethods(input: $input) {
      id
      channel_code
      channel_name
      account_name
      account_number
    }
  }
`;

export const GET_PAYOUTS = gql`
  query Payouts($input: GetPayoutsInput!) {
    payouts(input: $input) {
      payouts {
        id
        status
        settlement_status
      }
      pageInfo {
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
`;

export const GET_ORGANIZATION = gql`
  query Organization($handle: String!) {
    organization(handle: $handle) {
      id
      contactEmail
      description
      handle
      logoURL
      coverURL
      name
      websiteURL
      facebookLikes
      facebookURL
      tiktokURL
      instagramURL
      tags {
        label
      }
      address {
        address
        city
      }
    }
  }
`;

export const GET_MY_EVENT_WALLET = gql`
  query MyEventWallet($input: GetMyEventWalletInput!) {
    myEventWallet(input: $input) {
      id
      type
      amount
      currency
    }
  }
`;

export const GET_PAYOUT_SUMMARY = gql`
  query PayoutSummary($input: GetPayoutSummaryInput!) {
    payoutSummary(input: $input) {
      totalPaidOutCount
      totalPaidOutAmount
      pendingPayoutAmount
      pendingPayOutCount
    }
  }
`;

export const GET_ARTIST = gql`
  query Artist($handle: String!) {
    artist(handle: $handle) {
      id
      handle
      name
      bio
      genre
      profileImageURL
      coverURL
      facebookURL
      tiktokURL
      instagramURL
      facebookLikes
      createdAt
      updatedAt
      spotifyArtistID
      spotifyFollowers
      spotifyURL
      events {
        name
      }
      shows {
        title
      }
    }
  }
`;

export const GET_EXTERNAL_EVENTS = gql`
  query ExternalEvents($data: GetExternalEventsInput!) {
    externalEvents(data: $data) {
      id
      name
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
      organizationName
      organization {
        id
        handle
        name
        description
        logoURL
        contactEmail
      }
      startAt
      endAt
      ticketUrl
      mediaURLs
    }
  }
`;

const GET_PAYOUT_REQUESTS = gql(`
  query PayoutRequest($input: GetPayoutsInput!) {
  payouts(input: $input) {
    payouts {
      id
      event_id
      created_at
      paid_at
      paid_by
      payout_method_id
      payout_method {
        account_name
        account_number
        account_type
        channel_code
        channel_name
      }
      amount
      settlement_status
      status
      updated_at
      requested_by_user {
        last_name
        first_name
        email
      }
    }
    pageInfo {
      startCursor
      endCursor
      hasNextPage
    }
  }
}
`);

const GET_BALANCE_TRANSACTIONS = gql(`
  query balanceTransactions($input: GetBalanceTransactionsInput!) {
    balanceTransactions(input: $input) {
      pageInfo {
        hasNextPage
        endCursor
      startCursor
    }
    balanceTransactions {
      id
      amount
      transaction_type
      transaction_method
      channel_code
      created_at
      currency
      event_id
      event_wallet_amount_snapshot
      metadata
      money_flow
      payment_gateway
      reference_id
    }
  }
}
`);

const GET_OR_CREATE_OFFLINE_SALE_CODE = gql(`
  query GetOrCreateOfflineSaleCode($input: GetOrCreateOfflineSaleCodeInput!) {
    getOrCreateOfflineSaleCode(input: $input) {
      offlineSaleCode
    }
  }
`);

const GET_ORGANIZATION_CHECKOUT_CONFIGS = gql(`
  query OrganizationCheckoutConfigs($input: GetOrganizationCheckoutConfigsInput!) {
    organizationCheckoutConfigs(input: $input) {
      offlineSalesEnabled
      isShowCheckoutOptions
    }
  }
`);

const GET_DISCOUNTS = gql(`
  query Discounts($input: GetDiscountsInput!) {
  discounts(input: $input) {
    pageInfo {
      startCursor
      endCursor
      hasNextPage
    }
    results {
      id
      code
      created_at
      type
      is_disabled
      is_dynamic
      starts_at
      ends_at
      usage_count
      usage_limit
      usage_count_by_ticket
      valid_duration
      discount_rule {
        allocation
        value
        type
      }
    }
  }
}
`);

export const GET_USER_IMAGE_UPLOAD_LINK = gql(`
  query GetUserImageUploadLink($input: GetUserImageUploadLinkInput!) {
    getUserImageUploadLink(input: $input) {
      fileName
      uploadUrl
      url
      type
    }
  }
`);

export const GET_ORGANIZATION_IMAGE_UPLOAD_LINK = gql(`
  query GetOrganizationImageUploadLink($input: GetOrganizationImageUploadLinkInput!) {
    getOrganizationImageUploadLink(input: $input) {
      fileName
      uploadUrl
      url
      type
    }
  }
`);

export const GET_TICKET_IDS_BY_ORDER_ID = gql(`
  query GetTicketIdsByOrder($orderId: String!) {
    getTicketIdsByOrder(orderId: $orderId)
  }
`);

export const REPORT_STATUS = gql(`
  query ReportStatus($input: ReportStatusInput!) {
    reportStatus(input: $input) {
      reportId
      status
      downloadUrl
    }
  }
`);

export const GET_EVENT_ORDERS = gql(`
  query GetOrders($eventId: ID!, $cursor: FindManyIDCursorInput, $q: String) {
    getOrders(input: {
      eventId: $eventId,
      take: 20,
      q: $q,
      cursor: $cursor
    }) {
      pageInfo {
        hasNextPage
        endCursor
      }
      orders {
        createdAt
        items {
          id
          name
          quantity
          metadata
        }
        orderDisplayId
        orderId
        paymentMethod
        status
        ticketType
        user {
          displayName
          email
        }
        event {
          id
          isGeneralAdmission
        }
        isRefundable
        total
        discountTotal
        subtotal
        receiverEmail
        receiverName
      }
    }
  }
`);

export const GET_EVENT_OCCURRENCES = gql(`
query EventOccurrences($input: GetEventOccurrencesInput!) {
  eventOccurrences(input: $input) {
    results {
      id
      address {
        address
        city
      }
      isOnSale
      isMultipleDay
      venue {
        name
      }
      startAt
      endAt
      handle
      isSoldOut
      name
      media {
        id
        type
        url
      }
    }
    pageInfo {
      hasNextPage
      endCursor
      startCursor
    }
  }
}
`);

export const GET_EVENT_BY_ID = gql`
  query EventById($id: String!) {
    eventById(id: $id) {
      id
      handle
      name
      startAt
      endAt
      onsale
      offsale
      hasSeatMap
      maxTicketPerOrder
      isMultipleDay
      isParentEvent
      organizationId
      media {
        id
        url
      }
      seatMap {
        id
        url
        tierRules
        holdSeatRules
      }
    }
  }
`;

export const GET_TICKET_TIER = gql`
  query GetTicketTiers($data: GetTicketTierInput!) {
    getTicketTiers(data: $data) {
      id
      name
      description
      price
      isVisible
      saleStartAt
      saleEndAt
      initialInventory
      totalSold
      reservingQuantity
      metadata
    }
  }
`;

export const query = gql`
  query EventStatus($handle: String!) {
    event(handle: $handle) {
      id
      handle
      name
      startAt
      endAt
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
      media {
        id
        type
        url
      }
      mediaCollection
    }
  }
`;

export const GET_CURRENT_USER = gql`
  query CurrentUser {
    currentUser {
      id
      createdAt
      updatedAt
      displayName
      firstName
      lastName
      email
      phone
      gender
      coverImageURL
      profileImageURL
      bio
      birthday
      identityVerified
      identityNumber
    }
  }
`;

export const ORGANIZATION_REPORT_STATUS = gql(`
  query OrganizationReportStatus($input: OrganizationReportStatusInput!) {
    organizationReportStatus(input: $input) {
      status
      reportId
      downloadUrl
    }
  }
`);
