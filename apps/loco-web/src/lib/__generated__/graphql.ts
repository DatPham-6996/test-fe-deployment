import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  BigInt: { input: any; output: any; }
  DateTime: { input: any; output: any; }
  Decimal: { input: any; output: any; }
  JSON: { input: any; output: any; }
};

export type AcceptInviteInput = {
  displayName?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  inviteId: Scalars['ID']['input'];
  lastName?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  validationCode: Scalars['String']['input'];
};

export type AcceptPayoutRequestInput = {
  eventId: Scalars['ID']['input'];
  payoutId: Scalars['ID']['input'];
};

export type AcceptRefundRequestInput = {
  refundId: Scalars['ID']['input'];
};

export type Activity = {
  __typename?: 'Activity';
  actor: Scalars['String']['output'];
  extra_context?: Maybe<ExtraContext>;
  foreign_id: Scalars['String']['output'];
  group?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  message?: Maybe<Scalars['String']['output']>;
  object: Scalars['String']['output'];
  target: Scalars['String']['output'];
  time: Scalars['String']['output'];
  to?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  verb: Scalars['String']['output'];
};

export type Add_On_ServiceListRelationFilter = {
  every?: InputMaybe<Add_On_ServiceWhereInput>;
  none?: InputMaybe<Add_On_ServiceWhereInput>;
  some?: InputMaybe<Add_On_ServiceWhereInput>;
};

export type AddressCount = {
  __typename?: 'AddressCount';
  cart_cart_billing_address_idToaddress: Scalars['Int']['output'];
  cart_cart_shipping_address_idToaddress: Scalars['Int']['output'];
  claim_order: Scalars['Int']['output'];
  order_order_billing_address_idToaddress: Scalars['Int']['output'];
  order_order_shipping_address_idToaddress: Scalars['Int']['output'];
  swap: Scalars['Int']['output'];
};

export type AddressListRelationFilter = {
  every?: InputMaybe<AddressWhereInput>;
  none?: InputMaybe<AddressWhereInput>;
  some?: InputMaybe<AddressWhereInput>;
};

export type AddressNullableRelationFilter = {
  is?: InputMaybe<AddressWhereInput>;
  isNot?: InputMaybe<AddressWhereInput>;
};

export type ArtistCreateInput = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  bio?: InputMaybe<Scalars['String']['input']>;
  coverURL?: InputMaybe<Scalars['String']['input']>;
  facebookLikes?: InputMaybe<Scalars['String']['input']>;
  facebookURL?: InputMaybe<Scalars['String']['input']>;
  genre?: InputMaybe<Array<Scalars['String']['input']>>;
  handle: Scalars['String']['input'];
  instagramURL?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  profileImageURL?: InputMaybe<Scalars['String']['input']>;
  spotifyArtistID?: InputMaybe<Scalars['String']['input']>;
  spotifyFollowers?: InputMaybe<Scalars['Int']['input']>;
  spotifyURL?: InputMaybe<Scalars['String']['input']>;
  tagIds?: InputMaybe<Array<Scalars['String']['input']>>;
  tiktokURL?: InputMaybe<Scalars['String']['input']>;
};

export type ArtistUpdateInput = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  bio?: InputMaybe<Scalars['String']['input']>;
  coverURL?: InputMaybe<Scalars['String']['input']>;
  facebookLikes?: InputMaybe<Scalars['String']['input']>;
  facebookURL?: InputMaybe<Scalars['String']['input']>;
  genre?: InputMaybe<Array<Scalars['String']['input']>>;
  handle?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  instagramURL?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  profileImageURL?: InputMaybe<Scalars['String']['input']>;
  spotifyArtistID?: InputMaybe<Scalars['String']['input']>;
  spotifyFollowers?: InputMaybe<Scalars['Int']['input']>;
  spotifyURL?: InputMaybe<Scalars['String']['input']>;
  tagIds?: InputMaybe<Array<Scalars['String']['input']>>;
  tiktokURL?: InputMaybe<Scalars['String']['input']>;
};

export type BalanceTransactionsWhereInput = {
  formTime?: InputMaybe<Scalars['DateTime']['input']>;
  moneyFlow?: InputMaybe<Balance_Transaction_Money_Flow_Enum>;
  toTime?: InputMaybe<Scalars['DateTime']['input']>;
  transactionType?: InputMaybe<Balance_Transaction_Type_Enum>;
};

export type Batch_JobListRelationFilter = {
  every?: InputMaybe<Batch_JobWhereInput>;
  none?: InputMaybe<Batch_JobWhereInput>;
  some?: InputMaybe<Batch_JobWhereInput>;
};

export type BigIntFilter = {
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<NestedBigIntFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type BoolFilter = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  not?: InputMaybe<NestedBoolFilter>;
};

export type BoolNullableFilter = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  not?: InputMaybe<NestedBoolNullableFilter>;
};

export type Boundary = {
  x1: Scalars['String']['input'];
  x2: Scalars['String']['input'];
  y1: Scalars['String']['input'];
  y2: Scalars['String']['input'];
};

export enum BusinessLevelConfig {
  App = 'APP',
  Event = 'EVENT',
  Organization = 'ORGANIZATION'
}

export type CancelEventInviteInput = {
  eventId: Scalars['ID']['input'];
  id: Scalars['ID']['input'];
};

export type CancelOrganizationInviteInput = {
  id: Scalars['ID']['input'];
  organizationId: Scalars['ID']['input'];
};

export type CancelPayoutRequestInput = {
  eventId: Scalars['ID']['input'];
  payoutId: Scalars['ID']['input'];
};

export type CartCount = {
  __typename?: 'CartCount';
  cart_discounts: Scalars['Int']['output'];
  cart_gift_cards: Scalars['Int']['output'];
  custom_shipping_option: Scalars['Int']['output'];
  line_item: Scalars['Int']['output'];
  payment_payment_cart_idTocart: Scalars['Int']['output'];
  payment_session: Scalars['Int']['output'];
  refund: Scalars['Int']['output'];
  shipping_method: Scalars['Int']['output'];
};

export type CartListRelationFilter = {
  every?: InputMaybe<CartWhereInput>;
  none?: InputMaybe<CartWhereInput>;
  some?: InputMaybe<CartWhereInput>;
};

export type CartMetadataInput = {
  emailForTicket?: InputMaybe<Scalars['String']['input']>;
  userDisplayNameForTicket?: InputMaybe<Scalars['String']['input']>;
  userPhoneForTicket?: InputMaybe<Scalars['String']['input']>;
};

export type CartNullableRelationFilter = {
  is?: InputMaybe<CartWhereInput>;
  isNot?: InputMaybe<CartWhereInput>;
};

export enum CartRefundStatus {
  Refunded = 'REFUNDED',
  RefundRequired = 'REFUND_REQUIRED'
}

export type CartRelationFilter = {
  is?: InputMaybe<CartWhereInput>;
  isNot?: InputMaybe<CartWhereInput>;
};

export type Cart_DiscountsListRelationFilter = {
  every?: InputMaybe<Cart_DiscountsWhereInput>;
  none?: InputMaybe<Cart_DiscountsWhereInput>;
  some?: InputMaybe<Cart_DiscountsWhereInput>;
};

export type Cart_Gift_CardsListRelationFilter = {
  every?: InputMaybe<Cart_Gift_CardsWhereInput>;
  none?: InputMaybe<Cart_Gift_CardsWhereInput>;
  some?: InputMaybe<Cart_Gift_CardsWhereInput>;
};

export enum CategoryLevel {
  L1 = 'L1',
  L2 = 'L2',
  L3 = 'L3',
  Unknown = 'UNKNOWN'
}

export type ChannelData = {
  __typename?: 'ChannelData';
  name: Scalars['String']['output'];
  totalBuyers: Scalars['Int']['output'];
  totalVisitors: Scalars['Int']['output'];
  viewCount: Scalars['Int']['output'];
};

export type CheckInEventTicketInput = {
  checkInNotes?: InputMaybe<Scalars['String']['input']>;
  eventId: Scalars['ID']['input'];
  validationCode: Scalars['String']['input'];
};

export type CheckInEventTicketsInput = {
  checkInNotes?: InputMaybe<Scalars['String']['input']>;
  eventId: Scalars['ID']['input'];
  validationCodes: Array<Scalars['String']['input']>;
};

export type Claim_ImageListRelationFilter = {
  every?: InputMaybe<Claim_ImageWhereInput>;
  none?: InputMaybe<Claim_ImageWhereInput>;
  some?: InputMaybe<Claim_ImageWhereInput>;
};

export type Claim_ItemCount = {
  __typename?: 'Claim_itemCount';
  claim_image: Scalars['Int']['output'];
  claim_item_tags: Scalars['Int']['output'];
};

export type Claim_ItemListRelationFilter = {
  every?: InputMaybe<Claim_ItemWhereInput>;
  none?: InputMaybe<Claim_ItemWhereInput>;
  some?: InputMaybe<Claim_ItemWhereInput>;
};

export type Claim_ItemRelationFilter = {
  is?: InputMaybe<Claim_ItemWhereInput>;
  isNot?: InputMaybe<Claim_ItemWhereInput>;
};

export type Claim_Item_TagsListRelationFilter = {
  every?: InputMaybe<Claim_Item_TagsWhereInput>;
  none?: InputMaybe<Claim_Item_TagsWhereInput>;
  some?: InputMaybe<Claim_Item_TagsWhereInput>;
};

export type Claim_OrderCount = {
  __typename?: 'Claim_orderCount';
  claim_item: Scalars['Int']['output'];
  fulfillment: Scalars['Int']['output'];
  line_item: Scalars['Int']['output'];
  shipping_method: Scalars['Int']['output'];
};

export type Claim_OrderListRelationFilter = {
  every?: InputMaybe<Claim_OrderWhereInput>;
  none?: InputMaybe<Claim_OrderWhereInput>;
  some?: InputMaybe<Claim_OrderWhereInput>;
};

export type Claim_OrderNullableRelationFilter = {
  is?: InputMaybe<Claim_OrderWhereInput>;
  isNot?: InputMaybe<Claim_OrderWhereInput>;
};

export type Claim_OrderRelationFilter = {
  is?: InputMaybe<Claim_OrderWhereInput>;
  isNot?: InputMaybe<Claim_OrderWhereInput>;
};

export type Claim_TagCount = {
  __typename?: 'Claim_tagCount';
  claim_item_tags: Scalars['Int']['output'];
};

export type Claim_TagRelationFilter = {
  is?: InputMaybe<Claim_TagWhereInput>;
  isNot?: InputMaybe<Claim_TagWhereInput>;
};

export type CountryCount = {
  __typename?: 'CountryCount';
  address: Scalars['Int']['output'];
};

export type CountryListRelationFilter = {
  every?: InputMaybe<CountryWhereInput>;
  none?: InputMaybe<CountryWhereInput>;
  some?: InputMaybe<CountryWhereInput>;
};

export type CountryNullableRelationFilter = {
  is?: InputMaybe<CountryWhereInput>;
  isNot?: InputMaybe<CountryWhereInput>;
};

export type CreateAddOnServiceInput = {
  amount: Scalars['Int']['input'];
  description: Scalars['String']['input'];
  eventId: Scalars['ID']['input'];
  moneyFlow: Add_On_Service_Money_Flow_Enum;
  name: Scalars['String']['input'];
  organizationId: Scalars['ID']['input'];
};

export type CreateCollectionInput = {
  artistIds: Array<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  logoURL?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  public?: Scalars['Boolean']['input'];
};

export type CreateDiscountInput = {
  code: Scalars['String']['input'];
  endsAt?: InputMaybe<Scalars['DateTime']['input']>;
  eventId: Scalars['ID']['input'];
  isDisabled: Scalars['Boolean']['input'];
  organizationId: Scalars['ID']['input'];
  rule: CreateDiscountRuleInput;
  startsAt?: InputMaybe<Scalars['DateTime']['input']>;
  usageLimit?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateDiscountRuleInput = {
  allocation: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  type: Scalars['String']['input'];
  value: Scalars['Int']['input'];
};

export type CreateEventPayoutRequestInput = {
  amount: Scalars['Int']['input'];
  eventId: Scalars['ID']['input'];
  organizationId: Scalars['ID']['input'];
  payoutMethodId: Scalars['ID']['input'];
};

export type CreatePayoutMethodInput = {
  accountName: Scalars['String']['input'];
  accountNumber: Scalars['String']['input'];
  channelCode: Scalars['String']['input'];
  channelName: Scalars['String']['input'];
  organizationId: Scalars['ID']['input'];
};

export type CreateSubEventInput = {
  endAt: Scalars['DateTime']['input'];
  eventId: Scalars['ID']['input'];
  isDuplicateTier: Scalars['Boolean']['input'];
  offSale?: InputMaybe<Scalars['DateTime']['input']>;
  onSale?: InputMaybe<Scalars['DateTime']['input']>;
  organizationId: Scalars['ID']['input'];
  startAt: Scalars['DateTime']['input'];
};

export type CreateTicketTierInput = {
  background: Scalars['String']['input'];
  border: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  eventId: Scalars['ID']['input'];
  initialInventory: Scalars['Int']['input'];
  isVisible?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  organizationId: Scalars['ID']['input'];
  price: Scalars['Int']['input'];
  saleEndAt: Scalars['DateTime']['input'];
  saleStartAt: Scalars['DateTime']['input'];
};

export type CurrencyCount = {
  __typename?: 'CurrencyCount';
  money_amount: Scalars['Int']['output'];
  order: Scalars['Int']['output'];
  payment: Scalars['Int']['output'];
  region: Scalars['Int']['output'];
  store: Scalars['Int']['output'];
  store_currencies: Scalars['Int']['output'];
};

export type CurrencyRelationFilter = {
  is?: InputMaybe<CurrencyWhereInput>;
  isNot?: InputMaybe<CurrencyWhereInput>;
};

export type Custom_Shipping_OptionListRelationFilter = {
  every?: InputMaybe<Custom_Shipping_OptionWhereInput>;
  none?: InputMaybe<Custom_Shipping_OptionWhereInput>;
  some?: InputMaybe<Custom_Shipping_OptionWhereInput>;
};

export type CustomerCount = {
  __typename?: 'CustomerCount';
  address_address_customer_idTocustomer: Scalars['Int']['output'];
  cart: Scalars['Int']['output'];
  customer_group_customers: Scalars['Int']['output'];
  notification: Scalars['Int']['output'];
  order: Scalars['Int']['output'];
};

export type CustomerNullableRelationFilter = {
  is?: InputMaybe<CustomerWhereInput>;
  isNot?: InputMaybe<CustomerWhereInput>;
};

export type CustomerRelationFilter = {
  is?: InputMaybe<CustomerWhereInput>;
  isNot?: InputMaybe<CustomerWhereInput>;
};

export type Customer_GroupCount = {
  __typename?: 'Customer_groupCount';
  customer_group_customers: Scalars['Int']['output'];
  discount_condition_customer_group: Scalars['Int']['output'];
  price_list_customer_groups: Scalars['Int']['output'];
};

export type Customer_GroupRelationFilter = {
  is?: InputMaybe<Customer_GroupWhereInput>;
  isNot?: InputMaybe<Customer_GroupWhereInput>;
};

export type Customer_Group_CustomersListRelationFilter = {
  every?: InputMaybe<Customer_Group_CustomersWhereInput>;
  none?: InputMaybe<Customer_Group_CustomersWhereInput>;
  some?: InputMaybe<Customer_Group_CustomersWhereInput>;
};

export type DateTimeFilter = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<NestedDateTimeFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type DateTimeNullableFilter = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<NestedDateTimeNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type DecimalFilter = {
  equals?: InputMaybe<Scalars['Decimal']['input']>;
  gt?: InputMaybe<Scalars['Decimal']['input']>;
  gte?: InputMaybe<Scalars['Decimal']['input']>;
  in?: InputMaybe<Array<Scalars['Decimal']['input']>>;
  lt?: InputMaybe<Scalars['Decimal']['input']>;
  lte?: InputMaybe<Scalars['Decimal']['input']>;
  not?: InputMaybe<NestedDecimalFilter>;
  notIn?: InputMaybe<Array<Scalars['Decimal']['input']>>;
};

export type DeclineInviteInput = {
  inviteId: Scalars['ID']['input'];
};

export type DeleteDiscountInput = {
  discountId: Scalars['ID']['input'];
  eventId: Scalars['ID']['input'];
  organizationId: Scalars['ID']['input'];
};

export type DeleteEventMemberRoleInput = {
  eventId: Scalars['ID']['input'];
  memberId: Scalars['ID']['input'];
};

export type DeleteMyAccountInput = {
  accessToken: Scalars['String']['input'];
};

export type DeleteMyCardInput = {
  cardId: Scalars['ID']['input'];
};

export type DeleteOrganizationMemberRoleInput = {
  memberId: Scalars['ID']['input'];
  organizationId: Scalars['ID']['input'];
};

export type DeleteReservationSessionInput = {
  eventHandle: Scalars['String']['input'];
};

export type DeleteTicketTierInput = {
  eventId: Scalars['ID']['input'];
  organizationId: Scalars['ID']['input'];
  ticketTierId: Scalars['ID']['input'];
};

export enum DeliveryMethod {
  ETicket = 'E_TICKET',
  Mail = 'MAIL',
  PickUp = 'PICK_UP'
}

export type DeviceRegisterInput = {
  fcmToken: Scalars['String']['input'];
};

export type DeviceUnRegisterInput = {
  fcmToken: Scalars['String']['input'];
};

export type DiscountCount = {
  __typename?: 'DiscountCount';
  cart_discounts: Scalars['Int']['output'];
  discount_regions: Scalars['Int']['output'];
  line_item_adjustment: Scalars['Int']['output'];
  order_discounts: Scalars['Int']['output'];
  other_discount: Scalars['Int']['output'];
};

export type DiscountListRelationFilter = {
  every?: InputMaybe<DiscountWhereInput>;
  none?: InputMaybe<DiscountWhereInput>;
  some?: InputMaybe<DiscountWhereInput>;
};

export type DiscountNullableRelationFilter = {
  is?: InputMaybe<DiscountWhereInput>;
  isNot?: InputMaybe<DiscountWhereInput>;
};

export type DiscountRelationFilter = {
  is?: InputMaybe<DiscountWhereInput>;
  isNot?: InputMaybe<DiscountWhereInput>;
};

export type Discount_ConditionCount = {
  __typename?: 'Discount_conditionCount';
  discount_condition_customer_group: Scalars['Int']['output'];
  discount_condition_product: Scalars['Int']['output'];
  discount_condition_product_collection: Scalars['Int']['output'];
  discount_condition_product_tag: Scalars['Int']['output'];
  discount_condition_product_type: Scalars['Int']['output'];
};

export type Discount_ConditionListRelationFilter = {
  every?: InputMaybe<Discount_ConditionWhereInput>;
  none?: InputMaybe<Discount_ConditionWhereInput>;
  some?: InputMaybe<Discount_ConditionWhereInput>;
};

export type Discount_ConditionRelationFilter = {
  is?: InputMaybe<Discount_ConditionWhereInput>;
  isNot?: InputMaybe<Discount_ConditionWhereInput>;
};

export type Discount_Condition_Customer_GroupListRelationFilter = {
  every?: InputMaybe<Discount_Condition_Customer_GroupWhereInput>;
  none?: InputMaybe<Discount_Condition_Customer_GroupWhereInput>;
  some?: InputMaybe<Discount_Condition_Customer_GroupWhereInput>;
};

export type Discount_Condition_ProductListRelationFilter = {
  every?: InputMaybe<Discount_Condition_ProductWhereInput>;
  none?: InputMaybe<Discount_Condition_ProductWhereInput>;
  some?: InputMaybe<Discount_Condition_ProductWhereInput>;
};

export type Discount_Condition_Product_CollectionListRelationFilter = {
  every?: InputMaybe<Discount_Condition_Product_CollectionWhereInput>;
  none?: InputMaybe<Discount_Condition_Product_CollectionWhereInput>;
  some?: InputMaybe<Discount_Condition_Product_CollectionWhereInput>;
};

export type Discount_Condition_Product_TagListRelationFilter = {
  every?: InputMaybe<Discount_Condition_Product_TagWhereInput>;
  none?: InputMaybe<Discount_Condition_Product_TagWhereInput>;
  some?: InputMaybe<Discount_Condition_Product_TagWhereInput>;
};

export type Discount_Condition_Product_TypeListRelationFilter = {
  every?: InputMaybe<Discount_Condition_Product_TypeWhereInput>;
  none?: InputMaybe<Discount_Condition_Product_TypeWhereInput>;
  some?: InputMaybe<Discount_Condition_Product_TypeWhereInput>;
};

export type Discount_RegionsListRelationFilter = {
  every?: InputMaybe<Discount_RegionsWhereInput>;
  none?: InputMaybe<Discount_RegionsWhereInput>;
  some?: InputMaybe<Discount_RegionsWhereInput>;
};

export type Discount_RuleCount = {
  __typename?: 'Discount_ruleCount';
  discount: Scalars['Int']['output'];
  discount_condition: Scalars['Int']['output'];
  discount_rule_products: Scalars['Int']['output'];
};

export type Discount_RuleNullableRelationFilter = {
  is?: InputMaybe<Discount_RuleWhereInput>;
  isNot?: InputMaybe<Discount_RuleWhereInput>;
};

export type Discount_RuleRelationFilter = {
  is?: InputMaybe<Discount_RuleWhereInput>;
  isNot?: InputMaybe<Discount_RuleWhereInput>;
};

export type Discount_Rule_ProductsListRelationFilter = {
  every?: InputMaybe<Discount_Rule_ProductsWhereInput>;
  none?: InputMaybe<Discount_Rule_ProductsWhereInput>;
  some?: InputMaybe<Discount_Rule_ProductsWhereInput>;
};

export type Draft_OrderNullableRelationFilter = {
  is?: InputMaybe<Draft_OrderWhereInput>;
  isNot?: InputMaybe<Draft_OrderWhereInput>;
};

export enum EmailTemplateType {
  EventReminder = 'EVENT_REMINDER',
  InviteCreated = 'INVITE_CREATED',
  OrderFailedRefund = 'ORDER_FAILED_REFUND',
  PasswordlessSignInEmail = 'PASSWORDLESS_SIGN_IN_EMAIL',
  RequestRefundCreated = 'REQUEST_REFUND_CREATED',
  SignUpEmailVerification = 'SIGN_UP_EMAIL_VERIFICATION',
  TicketCreated = 'TICKET_CREATED',
  VerifyAndChangeEmail = 'VERIFY_AND_CHANGE_EMAIL'
}

export type EnumBusinessLevelConfigFilter = {
  equals?: InputMaybe<BusinessLevelConfig>;
  in?: InputMaybe<Array<BusinessLevelConfig>>;
  not?: InputMaybe<NestedEnumBusinessLevelConfigFilter>;
  notIn?: InputMaybe<Array<BusinessLevelConfig>>;
};

export type EnumCartRefundStatusNullableFilter = {
  equals?: InputMaybe<CartRefundStatus>;
  in?: InputMaybe<Array<CartRefundStatus>>;
  not?: InputMaybe<NestedEnumCartRefundStatusNullableFilter>;
  notIn?: InputMaybe<Array<CartRefundStatus>>;
};

export type EnumCategoryLevelFilter = {
  equals?: InputMaybe<CategoryLevel>;
  in?: InputMaybe<Array<CategoryLevel>>;
  not?: InputMaybe<NestedEnumCategoryLevelFilter>;
  notIn?: InputMaybe<Array<CategoryLevel>>;
};

export type EnumDeliveryMethodNullableListFilter = {
  equals?: InputMaybe<Array<DeliveryMethod>>;
  has?: InputMaybe<DeliveryMethod>;
  hasEvery?: InputMaybe<Array<DeliveryMethod>>;
  hasSome?: InputMaybe<Array<DeliveryMethod>>;
  isEmpty?: InputMaybe<Scalars['Boolean']['input']>;
};

export type EnumEmailTemplateTypeFilter = {
  equals?: InputMaybe<EmailTemplateType>;
  in?: InputMaybe<Array<EmailTemplateType>>;
  not?: InputMaybe<NestedEnumEmailTemplateTypeFilter>;
  notIn?: InputMaybe<Array<EmailTemplateType>>;
};

export type EnumEventStatusFilter = {
  equals?: InputMaybe<EventStatus>;
  in?: InputMaybe<Array<EventStatus>>;
  not?: InputMaybe<NestedEnumEventStatusFilter>;
  notIn?: InputMaybe<Array<EventStatus>>;
};

export type EnumGenderNullableFilter = {
  equals?: InputMaybe<Gender>;
  in?: InputMaybe<Array<Gender>>;
  not?: InputMaybe<NestedEnumGenderNullableFilter>;
  notIn?: InputMaybe<Array<Gender>>;
};

export type EnumInviteStatusFilter = {
  equals?: InputMaybe<InviteStatus>;
  in?: InputMaybe<Array<InviteStatus>>;
  not?: InputMaybe<NestedEnumInviteStatusFilter>;
  notIn?: InputMaybe<Array<InviteStatus>>;
};

export type EnumMediaTypeFilter = {
  equals?: InputMaybe<MediaType>;
  in?: InputMaybe<Array<MediaType>>;
  not?: InputMaybe<NestedEnumMediaTypeFilter>;
  notIn?: InputMaybe<Array<MediaType>>;
};

export type EnumPayment_Collection_Status_EnumFilter = {
  equals?: InputMaybe<Payment_Collection_Status_Enum>;
  in?: InputMaybe<Array<Payment_Collection_Status_Enum>>;
  not?: InputMaybe<NestedEnumPayment_Collection_Status_EnumFilter>;
  notIn?: InputMaybe<Array<Payment_Collection_Status_Enum>>;
};

export type EnumPayment_Collection_Type_EnumFilter = {
  equals?: InputMaybe<Payment_Collection_Type_Enum>;
  in?: InputMaybe<Array<Payment_Collection_Type_Enum>>;
  not?: InputMaybe<NestedEnumPayment_Collection_Type_EnumFilter>;
  notIn?: InputMaybe<Array<Payment_Collection_Type_Enum>>;
};

export type EnumReactionTypeFilter = {
  equals?: InputMaybe<ReactionType>;
  in?: InputMaybe<Array<ReactionType>>;
  not?: InputMaybe<NestedEnumReactionTypeFilter>;
  notIn?: InputMaybe<Array<ReactionType>>;
};

export type EnumReviewStatusFilter = {
  equals?: InputMaybe<ReviewStatus>;
  in?: InputMaybe<Array<ReviewStatus>>;
  not?: InputMaybe<NestedEnumReviewStatusFilter>;
  notIn?: InputMaybe<Array<ReviewStatus>>;
};

export type EnumReviewStatusTypeFilter = {
  equals?: InputMaybe<ReviewStatusType>;
  in?: InputMaybe<Array<ReviewStatusType>>;
  not?: InputMaybe<NestedEnumReviewStatusTypeFilter>;
  notIn?: InputMaybe<Array<ReviewStatusType>>;
};

export type EnumRoleEntityTypeFilter = {
  equals?: InputMaybe<RoleEntityType>;
  in?: InputMaybe<Array<RoleEntityType>>;
  not?: InputMaybe<NestedEnumRoleEntityTypeFilter>;
  notIn?: InputMaybe<Array<RoleEntityType>>;
};

export type EnumRoleNameFilter = {
  equals?: InputMaybe<RoleName>;
  in?: InputMaybe<Array<RoleName>>;
  not?: InputMaybe<NestedEnumRoleNameFilter>;
  notIn?: InputMaybe<Array<RoleName>>;
};

export type EnumTemplateEngineFilter = {
  equals?: InputMaybe<TemplateEngine>;
  in?: InputMaybe<Array<TemplateEngine>>;
  not?: InputMaybe<NestedEnumTemplateEngineFilter>;
  notIn?: InputMaybe<Array<TemplateEngine>>;
};

export type EnumTicketStatusFilter = {
  equals?: InputMaybe<TicketStatus>;
  in?: InputMaybe<Array<TicketStatus>>;
  not?: InputMaybe<NestedEnumTicketStatusFilter>;
  notIn?: InputMaybe<Array<TicketStatus>>;
};

export type EnumTicketTypeFilter = {
  equals?: InputMaybe<TicketType>;
  in?: InputMaybe<Array<TicketType>>;
  not?: InputMaybe<NestedEnumTicketTypeFilter>;
  notIn?: InputMaybe<Array<TicketType>>;
};

export type Enumadd_On_Service_Money_Flow_EnumFilter = {
  equals?: InputMaybe<Add_On_Service_Money_Flow_Enum>;
  in?: InputMaybe<Array<Add_On_Service_Money_Flow_Enum>>;
  not?: InputMaybe<NestedEnumadd_On_Service_Money_Flow_EnumFilter>;
  notIn?: InputMaybe<Array<Add_On_Service_Money_Flow_Enum>>;
};

export type Enumcart_Type_EnumFilter = {
  equals?: InputMaybe<Cart_Type_Enum>;
  in?: InputMaybe<Array<Cart_Type_Enum>>;
  not?: InputMaybe<NestedEnumcart_Type_EnumFilter>;
  notIn?: InputMaybe<Array<Cart_Type_Enum>>;
};

export type Enumclaim_Item_Reason_EnumFilter = {
  equals?: InputMaybe<Claim_Item_Reason_Enum>;
  in?: InputMaybe<Array<Claim_Item_Reason_Enum>>;
  not?: InputMaybe<NestedEnumclaim_Item_Reason_EnumFilter>;
  notIn?: InputMaybe<Array<Claim_Item_Reason_Enum>>;
};

export type Enumclaim_Order_Fulfillment_Status_EnumFilter = {
  equals?: InputMaybe<Claim_Order_Fulfillment_Status_Enum>;
  in?: InputMaybe<Array<Claim_Order_Fulfillment_Status_Enum>>;
  not?: InputMaybe<NestedEnumclaim_Order_Fulfillment_Status_EnumFilter>;
  notIn?: InputMaybe<Array<Claim_Order_Fulfillment_Status_Enum>>;
};

export type Enumclaim_Order_Payment_Status_EnumFilter = {
  equals?: InputMaybe<Claim_Order_Payment_Status_Enum>;
  in?: InputMaybe<Array<Claim_Order_Payment_Status_Enum>>;
  not?: InputMaybe<NestedEnumclaim_Order_Payment_Status_EnumFilter>;
  notIn?: InputMaybe<Array<Claim_Order_Payment_Status_Enum>>;
};

export type Enumclaim_Order_Type_EnumFilter = {
  equals?: InputMaybe<Claim_Order_Type_Enum>;
  in?: InputMaybe<Array<Claim_Order_Type_Enum>>;
  not?: InputMaybe<NestedEnumclaim_Order_Type_EnumFilter>;
  notIn?: InputMaybe<Array<Claim_Order_Type_Enum>>;
};

export type Enumdiscount_Condition_Operator_EnumFilter = {
  equals?: InputMaybe<Discount_Condition_Operator_Enum>;
  in?: InputMaybe<Array<Discount_Condition_Operator_Enum>>;
  not?: InputMaybe<NestedEnumdiscount_Condition_Operator_EnumFilter>;
  notIn?: InputMaybe<Array<Discount_Condition_Operator_Enum>>;
};

export type Enumdiscount_Condition_Type_EnumFilter = {
  equals?: InputMaybe<Discount_Condition_Type_Enum>;
  in?: InputMaybe<Array<Discount_Condition_Type_Enum>>;
  not?: InputMaybe<NestedEnumdiscount_Condition_Type_EnumFilter>;
  notIn?: InputMaybe<Array<Discount_Condition_Type_Enum>>;
};

export type Enumdiscount_Rule_Allocation_EnumNullableFilter = {
  equals?: InputMaybe<Discount_Rule_Allocation_Enum>;
  in?: InputMaybe<Array<Discount_Rule_Allocation_Enum>>;
  not?: InputMaybe<NestedEnumdiscount_Rule_Allocation_EnumNullableFilter>;
  notIn?: InputMaybe<Array<Discount_Rule_Allocation_Enum>>;
};

export type Enumdiscount_Rule_Type_EnumFilter = {
  equals?: InputMaybe<Discount_Rule_Type_Enum>;
  in?: InputMaybe<Array<Discount_Rule_Type_Enum>>;
  not?: InputMaybe<NestedEnumdiscount_Rule_Type_EnumFilter>;
  notIn?: InputMaybe<Array<Discount_Rule_Type_Enum>>;
};

export type Enumdiscount_Type_EnumFilter = {
  equals?: InputMaybe<Discount_Type_Enum>;
  in?: InputMaybe<Array<Discount_Type_Enum>>;
  not?: InputMaybe<NestedEnumdiscount_Type_EnumFilter>;
  notIn?: InputMaybe<Array<Discount_Type_Enum>>;
};

export type Enumdraft_Order_Status_EnumFilter = {
  equals?: InputMaybe<Draft_Order_Status_Enum>;
  in?: InputMaybe<Array<Draft_Order_Status_Enum>>;
  not?: InputMaybe<NestedEnumdraft_Order_Status_EnumFilter>;
  notIn?: InputMaybe<Array<Draft_Order_Status_Enum>>;
};

export type Enumorder_Fulfillment_Status_EnumFilter = {
  equals?: InputMaybe<Order_Fulfillment_Status_Enum>;
  in?: InputMaybe<Array<Order_Fulfillment_Status_Enum>>;
  not?: InputMaybe<NestedEnumorder_Fulfillment_Status_EnumFilter>;
  notIn?: InputMaybe<Array<Order_Fulfillment_Status_Enum>>;
};

export type Enumorder_Item_Change_Type_EnumFilter = {
  equals?: InputMaybe<Order_Item_Change_Type_Enum>;
  in?: InputMaybe<Array<Order_Item_Change_Type_Enum>>;
  not?: InputMaybe<NestedEnumorder_Item_Change_Type_EnumFilter>;
  notIn?: InputMaybe<Array<Order_Item_Change_Type_Enum>>;
};

export type Enumorder_Payment_Status_EnumFilter = {
  equals?: InputMaybe<Order_Payment_Status_Enum>;
  in?: InputMaybe<Array<Order_Payment_Status_Enum>>;
  not?: InputMaybe<NestedEnumorder_Payment_Status_EnumFilter>;
  notIn?: InputMaybe<Array<Order_Payment_Status_Enum>>;
};

export type Enumorder_Settlement_Status_EnumFilter = {
  equals?: InputMaybe<Order_Settlement_Status_Enum>;
  in?: InputMaybe<Array<Order_Settlement_Status_Enum>>;
  not?: InputMaybe<NestedEnumorder_Settlement_Status_EnumFilter>;
  notIn?: InputMaybe<Array<Order_Settlement_Status_Enum>>;
};

export type Enumorder_Status_EnumFilter = {
  equals?: InputMaybe<Order_Status_Enum>;
  in?: InputMaybe<Array<Order_Status_Enum>>;
  not?: InputMaybe<NestedEnumorder_Status_EnumFilter>;
  notIn?: InputMaybe<Array<Order_Status_Enum>>;
};

export type Enumpayment_Session_Status_EnumFilter = {
  equals?: InputMaybe<Payment_Session_Status_Enum>;
  in?: InputMaybe<Array<Payment_Session_Status_Enum>>;
  not?: InputMaybe<NestedEnumpayment_Session_Status_EnumFilter>;
  notIn?: InputMaybe<Array<Payment_Session_Status_Enum>>;
};

export type Enumpayout_Method_Account_Type_EnumFilter = {
  equals?: InputMaybe<Payout_Method_Account_Type_Enum>;
  in?: InputMaybe<Array<Payout_Method_Account_Type_Enum>>;
  not?: InputMaybe<NestedEnumpayout_Method_Account_Type_EnumFilter>;
  notIn?: InputMaybe<Array<Payout_Method_Account_Type_Enum>>;
};

export type Enumpayout_Settlement_Status_EnumFilter = {
  equals?: InputMaybe<Payout_Settlement_Status_Enum>;
  in?: InputMaybe<Array<Payout_Settlement_Status_Enum>>;
  not?: InputMaybe<NestedEnumpayout_Settlement_Status_EnumFilter>;
  notIn?: InputMaybe<Array<Payout_Settlement_Status_Enum>>;
};

export type Enumpayout_Status_EnumFilter = {
  equals?: InputMaybe<Payout_Status_Enum>;
  in?: InputMaybe<Array<Payout_Status_Enum>>;
  not?: InputMaybe<NestedEnumpayout_Status_EnumFilter>;
  notIn?: InputMaybe<Array<Payout_Status_Enum>>;
};

export type Enumprice_List_Status_EnumFilter = {
  equals?: InputMaybe<Price_List_Status_Enum>;
  in?: InputMaybe<Array<Price_List_Status_Enum>>;
  not?: InputMaybe<NestedEnumprice_List_Status_EnumFilter>;
  notIn?: InputMaybe<Array<Price_List_Status_Enum>>;
};

export type Enumprice_List_Type_EnumFilter = {
  equals?: InputMaybe<Price_List_Type_Enum>;
  in?: InputMaybe<Array<Price_List_Type_Enum>>;
  not?: InputMaybe<NestedEnumprice_List_Type_EnumFilter>;
  notIn?: InputMaybe<Array<Price_List_Type_Enum>>;
};

export type Enumproduct_Status_EnumFilter = {
  equals?: InputMaybe<Product_Status_Enum>;
  in?: InputMaybe<Array<Product_Status_Enum>>;
  not?: InputMaybe<NestedEnumproduct_Status_EnumFilter>;
  notIn?: InputMaybe<Array<Product_Status_Enum>>;
};

export type Enumreturn_Status_EnumFilter = {
  equals?: InputMaybe<Return_Status_Enum>;
  in?: InputMaybe<Array<Return_Status_Enum>>;
  not?: InputMaybe<NestedEnumreturn_Status_EnumFilter>;
  notIn?: InputMaybe<Array<Return_Status_Enum>>;
};

export type Enumshipping_Option_Price_Type_EnumFilter = {
  equals?: InputMaybe<Shipping_Option_Price_Type_Enum>;
  in?: InputMaybe<Array<Shipping_Option_Price_Type_Enum>>;
  not?: InputMaybe<NestedEnumshipping_Option_Price_Type_EnumFilter>;
  notIn?: InputMaybe<Array<Shipping_Option_Price_Type_Enum>>;
};

export type Enumshipping_Option_Requirement_Type_EnumFilter = {
  equals?: InputMaybe<Shipping_Option_Requirement_Type_Enum>;
  in?: InputMaybe<Array<Shipping_Option_Requirement_Type_Enum>>;
  not?: InputMaybe<NestedEnumshipping_Option_Requirement_Type_EnumFilter>;
  notIn?: InputMaybe<Array<Shipping_Option_Requirement_Type_Enum>>;
};

export type Enumshipping_Profile_Type_EnumFilter = {
  equals?: InputMaybe<Shipping_Profile_Type_Enum>;
  in?: InputMaybe<Array<Shipping_Profile_Type_Enum>>;
  not?: InputMaybe<NestedEnumshipping_Profile_Type_EnumFilter>;
  notIn?: InputMaybe<Array<Shipping_Profile_Type_Enum>>;
};

export type Enumswap_Fulfillment_Status_EnumFilter = {
  equals?: InputMaybe<Swap_Fulfillment_Status_Enum>;
  in?: InputMaybe<Array<Swap_Fulfillment_Status_Enum>>;
  not?: InputMaybe<NestedEnumswap_Fulfillment_Status_EnumFilter>;
  notIn?: InputMaybe<Array<Swap_Fulfillment_Status_Enum>>;
};

export type Enumswap_Payment_Status_EnumFilter = {
  equals?: InputMaybe<Swap_Payment_Status_Enum>;
  in?: InputMaybe<Array<Swap_Payment_Status_Enum>>;
  not?: InputMaybe<NestedEnumswap_Payment_Status_EnumFilter>;
  notIn?: InputMaybe<Array<Swap_Payment_Status_Enum>>;
};

export type Enumticketing_Refund_ReasonFilter = {
  equals?: InputMaybe<Ticketing_Refund_Reason>;
  in?: InputMaybe<Array<Ticketing_Refund_Reason>>;
  not?: InputMaybe<NestedEnumticketing_Refund_ReasonFilter>;
  notIn?: InputMaybe<Array<Ticketing_Refund_Reason>>;
};

export type Enumticketing_Refund_StatusFilter = {
  equals?: InputMaybe<Ticketing_Refund_Status>;
  in?: InputMaybe<Array<Ticketing_Refund_Status>>;
  not?: InputMaybe<NestedEnumticketing_Refund_StatusFilter>;
  notIn?: InputMaybe<Array<Ticketing_Refund_Status>>;
};

export type Enumuser_Role_EnumNullableFilter = {
  equals?: InputMaybe<User_Role_Enum>;
  in?: InputMaybe<Array<User_Role_Enum>>;
  not?: InputMaybe<NestedEnumuser_Role_EnumNullableFilter>;
  notIn?: InputMaybe<Array<User_Role_Enum>>;
};

export type EventCreateInput = {
  categoryId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  endAt: Scalars['DateTime']['input'];
  hasSeatMap: Scalars['Boolean']['input'];
  isMultipleDay?: InputMaybe<Scalars['Boolean']['input']>;
  location: EventCreateLocationInput;
  maxTicketPerOrder: Scalars['Int']['input'];
  media: Array<EventMediaInput>;
  name: Scalars['String']['input'];
  offSale?: InputMaybe<Scalars['DateTime']['input']>;
  onSale?: InputMaybe<Scalars['DateTime']['input']>;
  organizationId: Scalars['String']['input'];
  policy?: InputMaybe<Scalars['String']['input']>;
  startAt: Scalars['DateTime']['input'];
  venueId?: InputMaybe<Scalars['String']['input']>;
};

export type EventCreateLocationInput = {
  address: Scalars['String']['input'];
  city: Scalars['String']['input'];
  latitude: Scalars['Float']['input'];
  longitude: Scalars['Float']['input'];
};

export type EventMediaInput = {
  isCover: Scalars['Boolean']['input'];
  type: MediaType;
  url: Scalars['String']['input'];
};

export type EventSearchArgs = {
  cursor?: InputMaybe<FlipEventWhereUniqueInput>;
  orderBy?: InputMaybe<Array<FlipEventOrderByWithRelationInput>>;
  query?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  /** Section type to fetch */
  type?: InputMaybe<PlacementType>;
  where?: InputMaybe<FlipEventWhereInput>;
};

export type EventSearchResult = {
  __typename?: 'EventSearchResult';
  events: Array<FlipEvent>;
  pageInfo: PageInfo;
};

export type EventSortInput = {
  startAt?: InputMaybe<Scalars['String']['input']>;
};

export enum EventStatus {
  Cancelled = 'CANCELLED',
  Deleted = 'DELETED',
  Demo = 'DEMO',
  Draft = 'DRAFT',
  PendingReview = 'PENDING_REVIEW',
  Postponed = 'POSTPONED',
  Published = 'PUBLISHED',
  Rescheduled = 'RESCHEDULED'
}

export type EventWhereInput = {
  organizationHandle?: InputMaybe<Scalars['String']['input']>;
  organizationId?: InputMaybe<Scalars['String']['input']>;
  saleStatus?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<EventStatus>;
};

export type ExternalEventCreateInput = {
  address: Scalars['String']['input'];
  artistHandle?: InputMaybe<Scalars['String']['input']>;
  artistId?: InputMaybe<Scalars['String']['input']>;
  categoryId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  endAt: Scalars['DateTime']['input'];
  media: Array<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  organizationId?: InputMaybe<Scalars['String']['input']>;
  organizationName?: InputMaybe<Scalars['String']['input']>;
  startAt: Scalars['DateTime']['input'];
  ticketUrl: Scalars['String']['input'];
  venueId?: InputMaybe<Scalars['String']['input']>;
};

export type ExternalEventSortInput = {
  startAt?: InputMaybe<Scalars['String']['input']>;
};

export type ExternalEventUpdateInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  artistId?: InputMaybe<Scalars['String']['input']>;
  categoryId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  endAt?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['String']['input'];
  media?: InputMaybe<Array<Scalars['String']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
  organizationId?: InputMaybe<Scalars['String']['input']>;
  organizationName?: InputMaybe<Scalars['String']['input']>;
  reviewStatus?: InputMaybe<ReviewStatus>;
  startAt?: InputMaybe<Scalars['DateTime']['input']>;
  ticketUrl?: InputMaybe<Scalars['String']['input']>;
  venueId?: InputMaybe<Scalars['String']['input']>;
};

export type ExternalEventWhereInput = {
  artistHandle?: InputMaybe<Scalars['String']['input']>;
  organizationHandle?: InputMaybe<Scalars['String']['input']>;
  organizationId?: InputMaybe<Scalars['String']['input']>;
  reviewStatus?: InputMaybe<Scalars['String']['input']>;
};

export type ExtraContext = {
  __typename?: 'ExtraContext';
  content?: Maybe<Scalars['String']['output']>;
  deeplink?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type FeedArgs = {
  cursor?: InputMaybe<FlipVenueWhereUniqueInput>;
  take?: InputMaybe<Scalars['Int']['input']>;
  /** Placement type to render */
  type: PlacementType;
};

export type FinalizeOrdersByEventIdInput = {
  eventId: Scalars['ID']['input'];
};

export type FinalizeOrdersByIdInput = {
  id: Scalars['ID']['input'];
};

export type FinalizeOrdersResponse = {
  __typename?: 'FinalizeOrdersResponse';
  count: Scalars['Int']['output'];
};

export type FindManyIdCursorInput = {
  id: Scalars['ID']['input'];
};

export type FindManyInviteWhereInput = {
  status?: InputMaybe<Array<InviteStatus>>;
};

export type FindManyproductArgs = {
  cursor?: InputMaybe<ProductWhereUniqueInput>;
  distinct?: InputMaybe<Array<ProductScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ProductOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ProductWhereInput>;
};

export type FlipAddress = {
  __typename?: 'FlipAddress';
  FlipExternalEvent?: Maybe<Array<FlipExternalEvent>>;
  FlipVenue?: Maybe<Array<FlipVenue>>;
  _count: FlipAddressCount;
  address?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  events?: Maybe<Array<FlipEvent>>;
  id: Scalars['ID']['output'];
  label?: Maybe<Scalars['String']['output']>;
  latitude?: Maybe<Scalars['String']['output']>;
  longitude?: Maybe<Scalars['String']['output']>;
  organizations?: Maybe<Array<FlipOrganization>>;
  state?: Maybe<Scalars['String']['output']>;
  users?: Maybe<Array<FlipUser>>;
  zip?: Maybe<Scalars['String']['output']>;
};

export type FlipAddressCount = {
  __typename?: 'FlipAddressCount';
  FlipExternalEvent: Scalars['Int']['output'];
  FlipVenue: Scalars['Int']['output'];
  events: Scalars['Int']['output'];
  organizations: Scalars['Int']['output'];
  users: Scalars['Int']['output'];
};

export type FlipAddressListRelationFilter = {
  every?: InputMaybe<FlipAddressWhereInput>;
  none?: InputMaybe<FlipAddressWhereInput>;
  some?: InputMaybe<FlipAddressWhereInput>;
};

export type FlipAddressNullableRelationFilter = {
  is?: InputMaybe<FlipAddressWhereInput>;
  isNot?: InputMaybe<FlipAddressWhereInput>;
};

export type FlipAddressOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type FlipAddressOrderByWithRelationInput = {
  FlipExternalEvent?: InputMaybe<FlipExternalEventOrderByRelationAggregateInput>;
  FlipVenue?: InputMaybe<FlipVenueOrderByRelationAggregateInput>;
  address?: InputMaybe<SortOrderInput>;
  city?: InputMaybe<SortOrderInput>;
  events?: InputMaybe<FlipEventOrderByRelationAggregateInput>;
  id?: InputMaybe<SortOrder>;
  label?: InputMaybe<SortOrderInput>;
  latitude?: InputMaybe<SortOrderInput>;
  longitude?: InputMaybe<SortOrderInput>;
  organizations?: InputMaybe<FlipOrganizationOrderByRelationAggregateInput>;
  state?: InputMaybe<SortOrderInput>;
  users?: InputMaybe<FlipUserOrderByRelationAggregateInput>;
  zip?: InputMaybe<SortOrderInput>;
};

export type FlipAddressRelationFilter = {
  is?: InputMaybe<FlipAddressWhereInput>;
  isNot?: InputMaybe<FlipAddressWhereInput>;
};

export type FlipAddressWhereInput = {
  AND?: InputMaybe<Array<FlipAddressWhereInput>>;
  FlipExternalEvent?: InputMaybe<FlipExternalEventListRelationFilter>;
  FlipVenue?: InputMaybe<FlipVenueListRelationFilter>;
  NOT?: InputMaybe<Array<FlipAddressWhereInput>>;
  OR?: InputMaybe<Array<FlipAddressWhereInput>>;
  address?: InputMaybe<StringNullableFilter>;
  city?: InputMaybe<StringNullableFilter>;
  events?: InputMaybe<FlipEventListRelationFilter>;
  id?: InputMaybe<StringFilter>;
  label?: InputMaybe<StringNullableFilter>;
  latitude?: InputMaybe<StringNullableFilter>;
  longitude?: InputMaybe<StringNullableFilter>;
  organizations?: InputMaybe<FlipOrganizationListRelationFilter>;
  state?: InputMaybe<StringNullableFilter>;
  users?: InputMaybe<FlipUserListRelationFilter>;
  zip?: InputMaybe<StringNullableFilter>;
};

export type FlipAnswer = {
  __typename?: 'FlipAnswer';
  author: FlipUser;
  authorId: Scalars['String']['output'];
  content: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  question: FlipQuestion;
  questionId: Scalars['String']['output'];
};

export type FlipAnswerListRelationFilter = {
  every?: InputMaybe<FlipAnswerWhereInput>;
  none?: InputMaybe<FlipAnswerWhereInput>;
  some?: InputMaybe<FlipAnswerWhereInput>;
};

export type FlipAnswerOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type FlipAnswerWhereInput = {
  AND?: InputMaybe<Array<FlipAnswerWhereInput>>;
  NOT?: InputMaybe<Array<FlipAnswerWhereInput>>;
  OR?: InputMaybe<Array<FlipAnswerWhereInput>>;
  author?: InputMaybe<FlipUserRelationFilter>;
  authorId?: InputMaybe<StringFilter>;
  content?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  question?: InputMaybe<FlipQuestionRelationFilter>;
  questionId?: InputMaybe<StringFilter>;
};

export type FlipArtist = {
  __typename?: 'FlipArtist';
  _count: FlipArtistCount;
  active: Scalars['Boolean']['output'];
  bio?: Maybe<Scalars['String']['output']>;
  collections?: Maybe<Array<FlipCollection>>;
  coverURL?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  events?: Maybe<Array<FlipEvent>>;
  externalEvents?: Maybe<Array<FlipExternalEvent>>;
  facebookLikes?: Maybe<Scalars['String']['output']>;
  facebookURL?: Maybe<Scalars['String']['output']>;
  genre?: Maybe<Array<Scalars['String']['output']>>;
  handle: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  instagramURL?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  profileImageURL?: Maybe<Scalars['String']['output']>;
  shows?: Maybe<Array<FlipShow>>;
  spotifyArtistID?: Maybe<Scalars['String']['output']>;
  spotifyFollowers?: Maybe<Scalars['Int']['output']>;
  spotifyURL?: Maybe<Scalars['String']['output']>;
  tags?: Maybe<Array<FlipTag>>;
  tiktokURL?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type FlipArtistCount = {
  __typename?: 'FlipArtistCount';
  collections: Scalars['Int']['output'];
  events: Scalars['Int']['output'];
  externalEvents: Scalars['Int']['output'];
  shows: Scalars['Int']['output'];
  tags: Scalars['Int']['output'];
};

export type FlipArtistListRelationFilter = {
  every?: InputMaybe<FlipArtistWhereInput>;
  none?: InputMaybe<FlipArtistWhereInput>;
  some?: InputMaybe<FlipArtistWhereInput>;
};

export type FlipArtistOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type FlipArtistWhereInput = {
  AND?: InputMaybe<Array<FlipArtistWhereInput>>;
  NOT?: InputMaybe<Array<FlipArtistWhereInput>>;
  OR?: InputMaybe<Array<FlipArtistWhereInput>>;
  active?: InputMaybe<BoolFilter>;
  bio?: InputMaybe<StringNullableFilter>;
  collections?: InputMaybe<FlipCollectionListRelationFilter>;
  coverURL?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  events?: InputMaybe<FlipEventListRelationFilter>;
  externalEvents?: InputMaybe<FlipExternalEventListRelationFilter>;
  facebookLikes?: InputMaybe<StringNullableFilter>;
  facebookURL?: InputMaybe<StringNullableFilter>;
  genre?: InputMaybe<StringNullableListFilter>;
  handle?: InputMaybe<StringFilter>;
  id?: InputMaybe<IntFilter>;
  instagramURL?: InputMaybe<StringNullableFilter>;
  name?: InputMaybe<StringFilter>;
  profileImageURL?: InputMaybe<StringNullableFilter>;
  shows?: InputMaybe<FlipShowListRelationFilter>;
  spotifyArtistID?: InputMaybe<StringNullableFilter>;
  spotifyFollowers?: InputMaybe<IntNullableFilter>;
  spotifyURL?: InputMaybe<StringNullableFilter>;
  tags?: InputMaybe<FlipTagListRelationFilter>;
  tiktokURL?: InputMaybe<StringNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type FlipBanner = {
  __typename?: 'FlipBanner';
  _count: FlipBannerCount;
  actionURI?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  media?: Maybe<Array<FlipMedia>>;
  name: Scalars['String']['output'];
  title?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type FlipBannerCount = {
  __typename?: 'FlipBannerCount';
  media: Scalars['Int']['output'];
};

export type FlipBannerNullableRelationFilter = {
  is?: InputMaybe<FlipBannerWhereInput>;
  isNot?: InputMaybe<FlipBannerWhereInput>;
};

export type FlipBannerWhereInput = {
  AND?: InputMaybe<Array<FlipBannerWhereInput>>;
  NOT?: InputMaybe<Array<FlipBannerWhereInput>>;
  OR?: InputMaybe<Array<FlipBannerWhereInput>>;
  actionURI?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  media?: InputMaybe<FlipMediaListRelationFilter>;
  name?: InputMaybe<StringFilter>;
  title?: InputMaybe<StringNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type FlipCategory = {
  __typename?: 'FlipCategory';
  FlipExternalEvent?: Maybe<Array<FlipExternalEvent>>;
  _count: FlipCategoryCount;
  children?: Maybe<Array<FlipCategory>>;
  createdAt: Scalars['DateTime']['output'];
  event?: Maybe<Array<FlipEvent>>;
  id: Scalars['ID']['output'];
  imageURL?: Maybe<Scalars['String']['output']>;
  level: CategoryLevel;
  name: Scalars['String']['output'];
  parent?: Maybe<FlipCategory>;
  parentId?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  venue?: Maybe<Array<FlipVenue>>;
};

export type FlipCategoryCount = {
  __typename?: 'FlipCategoryCount';
  FlipExternalEvent: Scalars['Int']['output'];
  children: Scalars['Int']['output'];
  event: Scalars['Int']['output'];
  venue: Scalars['Int']['output'];
};

export type FlipCategoryListRelationFilter = {
  every?: InputMaybe<FlipCategoryWhereInput>;
  none?: InputMaybe<FlipCategoryWhereInput>;
  some?: InputMaybe<FlipCategoryWhereInput>;
};

export type FlipCategoryNullableRelationFilter = {
  is?: InputMaybe<FlipCategoryWhereInput>;
  isNot?: InputMaybe<FlipCategoryWhereInput>;
};

export type FlipCategoryOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type FlipCategoryOrderByWithRelationInput = {
  FlipExternalEvent?: InputMaybe<FlipExternalEventOrderByRelationAggregateInput>;
  children?: InputMaybe<FlipCategoryOrderByRelationAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  event?: InputMaybe<FlipEventOrderByRelationAggregateInput>;
  id?: InputMaybe<SortOrder>;
  imageURL?: InputMaybe<SortOrderInput>;
  level?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  parent?: InputMaybe<FlipCategoryOrderByWithRelationInput>;
  parentId?: InputMaybe<SortOrderInput>;
  updatedAt?: InputMaybe<SortOrder>;
  venue?: InputMaybe<FlipVenueOrderByRelationAggregateInput>;
};

export type FlipCategoryWhereInput = {
  AND?: InputMaybe<Array<FlipCategoryWhereInput>>;
  FlipExternalEvent?: InputMaybe<FlipExternalEventListRelationFilter>;
  NOT?: InputMaybe<Array<FlipCategoryWhereInput>>;
  OR?: InputMaybe<Array<FlipCategoryWhereInput>>;
  children?: InputMaybe<FlipCategoryListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  event?: InputMaybe<FlipEventListRelationFilter>;
  id?: InputMaybe<StringFilter>;
  imageURL?: InputMaybe<StringNullableFilter>;
  level?: InputMaybe<EnumCategoryLevelFilter>;
  name?: InputMaybe<StringFilter>;
  parent?: InputMaybe<FlipCategoryNullableRelationFilter>;
  parentId?: InputMaybe<StringNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  venue?: InputMaybe<FlipVenueListRelationFilter>;
};

export type FlipCheckoutConfig = {
  __typename?: 'FlipCheckoutConfig';
  businessLevel: BusinessLevelConfig;
  createdAt: Scalars['DateTime']['output'];
  event?: Maybe<FlipEvent>;
  eventId?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  offlineSalesEnabled: Scalars['Boolean']['output'];
  organization?: Maybe<FlipOrganization>;
  organizationId?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type FlipCheckoutConfigListRelationFilter = {
  every?: InputMaybe<FlipCheckoutConfigWhereInput>;
  none?: InputMaybe<FlipCheckoutConfigWhereInput>;
  some?: InputMaybe<FlipCheckoutConfigWhereInput>;
};

export type FlipCheckoutConfigOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type FlipCheckoutConfigWhereInput = {
  AND?: InputMaybe<Array<FlipCheckoutConfigWhereInput>>;
  NOT?: InputMaybe<Array<FlipCheckoutConfigWhereInput>>;
  OR?: InputMaybe<Array<FlipCheckoutConfigWhereInput>>;
  businessLevel?: InputMaybe<EnumBusinessLevelConfigFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  event?: InputMaybe<FlipEventNullableRelationFilter>;
  eventId?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  offlineSalesEnabled?: InputMaybe<BoolFilter>;
  organization?: InputMaybe<FlipOrganizationNullableRelationFilter>;
  organizationId?: InputMaybe<StringNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type FlipCollection = {
  __typename?: 'FlipCollection';
  _count: FlipCollectionCount;
  artists?: Maybe<Array<FlipArtist>>;
  author: FlipUser;
  authorId: Scalars['String']['output'];
  comments?: Maybe<Array<FlipComment>>;
  coverURL?: Maybe<Array<FlipMedia>>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  logoURL?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  public: Scalars['Boolean']['output'];
  reactions?: Maybe<Array<FlipReaction>>;
  updatedAt: Scalars['DateTime']['output'];
  venues?: Maybe<Array<FlipVenue>>;
};

export type FlipCollectionCount = {
  __typename?: 'FlipCollectionCount';
  artists: Scalars['Int']['output'];
  comments: Scalars['Int']['output'];
  coverURL: Scalars['Int']['output'];
  reactions: Scalars['Int']['output'];
  venues: Scalars['Int']['output'];
};

export type FlipCollectionListRelationFilter = {
  every?: InputMaybe<FlipCollectionWhereInput>;
  none?: InputMaybe<FlipCollectionWhereInput>;
  some?: InputMaybe<FlipCollectionWhereInput>;
};

export type FlipCollectionNullableRelationFilter = {
  is?: InputMaybe<FlipCollectionWhereInput>;
  isNot?: InputMaybe<FlipCollectionWhereInput>;
};

export type FlipCollectionOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type FlipCollectionWhereInput = {
  AND?: InputMaybe<Array<FlipCollectionWhereInput>>;
  NOT?: InputMaybe<Array<FlipCollectionWhereInput>>;
  OR?: InputMaybe<Array<FlipCollectionWhereInput>>;
  artists?: InputMaybe<FlipArtistListRelationFilter>;
  author?: InputMaybe<FlipUserRelationFilter>;
  authorId?: InputMaybe<StringFilter>;
  comments?: InputMaybe<FlipCommentListRelationFilter>;
  coverURL?: InputMaybe<FlipMediaListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  logoURL?: InputMaybe<StringNullableFilter>;
  name?: InputMaybe<StringFilter>;
  public?: InputMaybe<BoolFilter>;
  reactions?: InputMaybe<FlipReactionListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  venues?: InputMaybe<FlipVenueListRelationFilter>;
};

export type FlipComment = {
  __typename?: 'FlipComment';
  author: FlipUser;
  authorId: Scalars['String']['output'];
  collection?: Maybe<FlipCollection>;
  collectionId?: Maybe<Scalars['String']['output']>;
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type FlipCommentListRelationFilter = {
  every?: InputMaybe<FlipCommentWhereInput>;
  none?: InputMaybe<FlipCommentWhereInput>;
  some?: InputMaybe<FlipCommentWhereInput>;
};

export type FlipCommentOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type FlipCommentWhereInput = {
  AND?: InputMaybe<Array<FlipCommentWhereInput>>;
  NOT?: InputMaybe<Array<FlipCommentWhereInput>>;
  OR?: InputMaybe<Array<FlipCommentWhereInput>>;
  author?: InputMaybe<FlipUserRelationFilter>;
  authorId?: InputMaybe<StringFilter>;
  collection?: InputMaybe<FlipCollectionNullableRelationFilter>;
  collectionId?: InputMaybe<StringNullableFilter>;
  content?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<IntFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type FlipEmailTemplateConfig = {
  __typename?: 'FlipEmailTemplateConfig';
  businessLevel: BusinessLevelConfig;
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  engine: TemplateEngine;
  event?: Maybe<FlipEvent>;
  eventId?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  locale?: Maybe<Scalars['String']['output']>;
  metadata?: Maybe<Scalars['JSON']['output']>;
  organization?: Maybe<FlipOrganization>;
  organizationId?: Maybe<Scalars['String']['output']>;
  subject: Scalars['String']['output'];
  type: EmailTemplateType;
  updatedAt: Scalars['DateTime']['output'];
};

export type FlipEmailTemplateConfigListRelationFilter = {
  every?: InputMaybe<FlipEmailTemplateConfigWhereInput>;
  none?: InputMaybe<FlipEmailTemplateConfigWhereInput>;
  some?: InputMaybe<FlipEmailTemplateConfigWhereInput>;
};

export type FlipEmailTemplateConfigOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type FlipEmailTemplateConfigWhereInput = {
  AND?: InputMaybe<Array<FlipEmailTemplateConfigWhereInput>>;
  NOT?: InputMaybe<Array<FlipEmailTemplateConfigWhereInput>>;
  OR?: InputMaybe<Array<FlipEmailTemplateConfigWhereInput>>;
  businessLevel?: InputMaybe<EnumBusinessLevelConfigFilter>;
  content?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  engine?: InputMaybe<EnumTemplateEngineFilter>;
  event?: InputMaybe<FlipEventNullableRelationFilter>;
  eventId?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  locale?: InputMaybe<StringNullableFilter>;
  metadata?: InputMaybe<JsonNullableFilter>;
  organization?: InputMaybe<FlipOrganizationNullableRelationFilter>;
  organizationId?: InputMaybe<StringNullableFilter>;
  subject?: InputMaybe<StringFilter>;
  type?: InputMaybe<EnumEmailTemplateTypeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type FlipEvent = {
  __typename?: 'FlipEvent';
  _count: FlipEventCount;
  address?: Maybe<FlipAddress>;
  addressId?: Maybe<Scalars['String']['output']>;
  artists?: Maybe<Array<FlipArtist>>;
  category?: Maybe<FlipCategory>;
  categoryId?: Maybe<Scalars['String']['output']>;
  checkoutConfigs?: Maybe<Array<FlipCheckoutConfig>>;
  childEvents?: Maybe<Array<FlipEvent>>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  emailTemplateConfigs?: Maybe<Array<FlipEmailTemplateConfig>>;
  endAt: Scalars['DateTime']['output'];
  handle: Scalars['String']['output'];
  hasSeatMap: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  isGeneralAdmission: Scalars['Boolean']['output'];
  isMultipleDay: Scalars['Boolean']['output'];
  isOnSale: Scalars['Boolean']['output'];
  isParentEvent: Scalars['Boolean']['output'];
  isSoldOut: Scalars['Boolean']['output'];
  maxTicketPerOrder?: Maybe<Scalars['Int']['output']>;
  media?: Maybe<Array<FlipMedia>>;
  mediaCollection?: Maybe<Scalars['JSON']['output']>;
  name: Scalars['String']['output'];
  offsale?: Maybe<Scalars['DateTime']['output']>;
  onsale?: Maybe<Scalars['DateTime']['output']>;
  organization: FlipOrganization;
  organizationId: Scalars['String']['output'];
  parentEvent?: Maybe<FlipEvent>;
  parentEventId?: Maybe<Scalars['String']['output']>;
  policy?: Maybe<Scalars['String']['output']>;
  pricingConfigs?: Maybe<Array<FlipPricingConfig>>;
  reactions?: Maybe<Array<FlipReaction>>;
  seatMap?: Maybe<FlipSeatMap>;
  startAt: Scalars['DateTime']['output'];
  status: EventStatus;
  ticketTemplateConfigs?: Maybe<Array<FlipTicketTemplateConfig>>;
  ticketTiers?: Maybe<Array<FlipTicketTier>>;
  tickets?: Maybe<Array<FlipTicket>>;
  updatedAt: Scalars['DateTime']['output'];
  venue?: Maybe<FlipVenue>;
  venueId?: Maybe<Scalars['String']['output']>;
};

export type FlipEventCount = {
  __typename?: 'FlipEventCount';
  artists: Scalars['Int']['output'];
  checkoutConfigs: Scalars['Int']['output'];
  childEvents: Scalars['Int']['output'];
  emailTemplateConfigs: Scalars['Int']['output'];
  media: Scalars['Int']['output'];
  pricingConfigs: Scalars['Int']['output'];
  reactions: Scalars['Int']['output'];
  ticketTemplateConfigs: Scalars['Int']['output'];
  ticketTiers: Scalars['Int']['output'];
  tickets: Scalars['Int']['output'];
};

export type FlipEventListRelationFilter = {
  every?: InputMaybe<FlipEventWhereInput>;
  none?: InputMaybe<FlipEventWhereInput>;
  some?: InputMaybe<FlipEventWhereInput>;
};

export type FlipEventNullableRelationFilter = {
  is?: InputMaybe<FlipEventWhereInput>;
  isNot?: InputMaybe<FlipEventWhereInput>;
};

export type FlipEventOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type FlipEventOrderByWithRelationInput = {
  address?: InputMaybe<FlipAddressOrderByWithRelationInput>;
  addressId?: InputMaybe<SortOrderInput>;
  artists?: InputMaybe<FlipArtistOrderByRelationAggregateInput>;
  category?: InputMaybe<FlipCategoryOrderByWithRelationInput>;
  categoryId?: InputMaybe<SortOrderInput>;
  checkoutConfigs?: InputMaybe<FlipCheckoutConfigOrderByRelationAggregateInput>;
  childEvents?: InputMaybe<FlipEventOrderByRelationAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrderInput>;
  emailTemplateConfigs?: InputMaybe<FlipEmailTemplateConfigOrderByRelationAggregateInput>;
  endAt?: InputMaybe<SortOrder>;
  handle?: InputMaybe<SortOrder>;
  hasSeatMap?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  isGeneralAdmission?: InputMaybe<SortOrder>;
  isMultipleDay?: InputMaybe<SortOrder>;
  isParentEvent?: InputMaybe<SortOrder>;
  maxTicketPerOrder?: InputMaybe<SortOrderInput>;
  media?: InputMaybe<FlipMediaOrderByRelationAggregateInput>;
  mediaCollection?: InputMaybe<SortOrderInput>;
  name?: InputMaybe<SortOrder>;
  offsale?: InputMaybe<SortOrderInput>;
  onsale?: InputMaybe<SortOrderInput>;
  organization?: InputMaybe<FlipOrganizationOrderByWithRelationInput>;
  organizationId?: InputMaybe<SortOrder>;
  parentEvent?: InputMaybe<FlipEventOrderByWithRelationInput>;
  parentEventId?: InputMaybe<SortOrderInput>;
  policy?: InputMaybe<SortOrderInput>;
  pricingConfigs?: InputMaybe<FlipPricingConfigOrderByRelationAggregateInput>;
  reactions?: InputMaybe<FlipReactionOrderByRelationAggregateInput>;
  seatMap?: InputMaybe<FlipSeatMapOrderByWithRelationInput>;
  startAt?: InputMaybe<SortOrder>;
  status?: InputMaybe<SortOrder>;
  ticketTemplateConfigs?: InputMaybe<FlipTicketTemplateConfigOrderByRelationAggregateInput>;
  ticketTiers?: InputMaybe<FlipTicketTierOrderByRelationAggregateInput>;
  tickets?: InputMaybe<FlipTicketOrderByRelationAggregateInput>;
  updatedAt?: InputMaybe<SortOrder>;
  venue?: InputMaybe<FlipVenueOrderByWithRelationInput>;
  venueId?: InputMaybe<SortOrderInput>;
};

export type FlipEventRelationFilter = {
  is?: InputMaybe<FlipEventWhereInput>;
  isNot?: InputMaybe<FlipEventWhereInput>;
};

export type FlipEventWhereInput = {
  AND?: InputMaybe<Array<FlipEventWhereInput>>;
  NOT?: InputMaybe<Array<FlipEventWhereInput>>;
  OR?: InputMaybe<Array<FlipEventWhereInput>>;
  address?: InputMaybe<FlipAddressNullableRelationFilter>;
  addressId?: InputMaybe<StringNullableFilter>;
  artists?: InputMaybe<FlipArtistListRelationFilter>;
  category?: InputMaybe<FlipCategoryNullableRelationFilter>;
  categoryId?: InputMaybe<StringNullableFilter>;
  checkoutConfigs?: InputMaybe<FlipCheckoutConfigListRelationFilter>;
  childEvents?: InputMaybe<FlipEventListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringNullableFilter>;
  emailTemplateConfigs?: InputMaybe<FlipEmailTemplateConfigListRelationFilter>;
  endAt?: InputMaybe<DateTimeFilter>;
  handle?: InputMaybe<StringFilter>;
  hasSeatMap?: InputMaybe<BoolFilter>;
  id?: InputMaybe<StringFilter>;
  isGeneralAdmission?: InputMaybe<BoolFilter>;
  isMultipleDay?: InputMaybe<BoolFilter>;
  isParentEvent?: InputMaybe<BoolFilter>;
  maxTicketPerOrder?: InputMaybe<IntNullableFilter>;
  media?: InputMaybe<FlipMediaListRelationFilter>;
  mediaCollection?: InputMaybe<JsonNullableFilter>;
  name?: InputMaybe<StringFilter>;
  offsale?: InputMaybe<DateTimeNullableFilter>;
  onsale?: InputMaybe<DateTimeNullableFilter>;
  organization?: InputMaybe<FlipOrganizationRelationFilter>;
  organizationId?: InputMaybe<StringFilter>;
  parentEvent?: InputMaybe<FlipEventNullableRelationFilter>;
  parentEventId?: InputMaybe<StringNullableFilter>;
  policy?: InputMaybe<StringNullableFilter>;
  pricingConfigs?: InputMaybe<FlipPricingConfigListRelationFilter>;
  reactions?: InputMaybe<FlipReactionListRelationFilter>;
  seatMap?: InputMaybe<FlipSeatMapNullableRelationFilter>;
  startAt?: InputMaybe<DateTimeFilter>;
  status?: InputMaybe<EnumEventStatusFilter>;
  ticketTemplateConfigs?: InputMaybe<FlipTicketTemplateConfigListRelationFilter>;
  ticketTiers?: InputMaybe<FlipTicketTierListRelationFilter>;
  tickets?: InputMaybe<FlipTicketListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  venue?: InputMaybe<FlipVenueNullableRelationFilter>;
  venueId?: InputMaybe<StringNullableFilter>;
};

export type FlipEventWhereUniqueInput = {
  AND?: InputMaybe<Array<FlipEventWhereInput>>;
  NOT?: InputMaybe<Array<FlipEventWhereInput>>;
  OR?: InputMaybe<Array<FlipEventWhereInput>>;
  address?: InputMaybe<FlipAddressNullableRelationFilter>;
  addressId?: InputMaybe<StringNullableFilter>;
  artists?: InputMaybe<FlipArtistListRelationFilter>;
  category?: InputMaybe<FlipCategoryNullableRelationFilter>;
  categoryId?: InputMaybe<StringNullableFilter>;
  checkoutConfigs?: InputMaybe<FlipCheckoutConfigListRelationFilter>;
  childEvents?: InputMaybe<FlipEventListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringNullableFilter>;
  emailTemplateConfigs?: InputMaybe<FlipEmailTemplateConfigListRelationFilter>;
  endAt?: InputMaybe<DateTimeFilter>;
  handle?: InputMaybe<Scalars['String']['input']>;
  hasSeatMap?: InputMaybe<BoolFilter>;
  id?: InputMaybe<Scalars['String']['input']>;
  isGeneralAdmission?: InputMaybe<BoolFilter>;
  isMultipleDay?: InputMaybe<BoolFilter>;
  isParentEvent?: InputMaybe<BoolFilter>;
  maxTicketPerOrder?: InputMaybe<IntNullableFilter>;
  media?: InputMaybe<FlipMediaListRelationFilter>;
  mediaCollection?: InputMaybe<JsonNullableFilter>;
  name?: InputMaybe<StringFilter>;
  offsale?: InputMaybe<DateTimeNullableFilter>;
  onsale?: InputMaybe<DateTimeNullableFilter>;
  organization?: InputMaybe<FlipOrganizationRelationFilter>;
  organizationId?: InputMaybe<StringFilter>;
  parentEvent?: InputMaybe<FlipEventNullableRelationFilter>;
  parentEventId?: InputMaybe<StringNullableFilter>;
  policy?: InputMaybe<StringNullableFilter>;
  pricingConfigs?: InputMaybe<FlipPricingConfigListRelationFilter>;
  reactions?: InputMaybe<FlipReactionListRelationFilter>;
  seatMap?: InputMaybe<FlipSeatMapNullableRelationFilter>;
  startAt?: InputMaybe<DateTimeFilter>;
  status?: InputMaybe<EnumEventStatusFilter>;
  ticketTemplateConfigs?: InputMaybe<FlipTicketTemplateConfigListRelationFilter>;
  ticketTiers?: InputMaybe<FlipTicketTierListRelationFilter>;
  tickets?: InputMaybe<FlipTicketListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  venue?: InputMaybe<FlipVenueNullableRelationFilter>;
  venueId?: InputMaybe<StringNullableFilter>;
};

export type FlipExternalEvent = {
  __typename?: 'FlipExternalEvent';
  FlipMedia?: Maybe<Array<FlipMedia>>;
  _count: FlipExternalEventCount;
  address?: Maybe<FlipAddress>;
  addressId?: Maybe<Scalars['String']['output']>;
  artists?: Maybe<Array<FlipArtist>>;
  category?: Maybe<FlipCategory>;
  categoryId?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  endAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  isOnSale: Scalars['Boolean']['output'];
  mediaURLs?: Maybe<Array<Scalars['String']['output']>>;
  name: Scalars['String']['output'];
  organization?: Maybe<FlipOrganization>;
  organizationId?: Maybe<Scalars['String']['output']>;
  organizationName?: Maybe<Scalars['String']['output']>;
  reviewStatus: ReviewStatus;
  startAt: Scalars['DateTime']['output'];
  ticketUrl: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  venue?: Maybe<FlipVenue>;
  venueId?: Maybe<Scalars['String']['output']>;
};

export type FlipExternalEventCount = {
  __typename?: 'FlipExternalEventCount';
  FlipMedia: Scalars['Int']['output'];
  artists: Scalars['Int']['output'];
};

export type FlipExternalEventListRelationFilter = {
  every?: InputMaybe<FlipExternalEventWhereInput>;
  none?: InputMaybe<FlipExternalEventWhereInput>;
  some?: InputMaybe<FlipExternalEventWhereInput>;
};

export type FlipExternalEventNullableRelationFilter = {
  is?: InputMaybe<FlipExternalEventWhereInput>;
  isNot?: InputMaybe<FlipExternalEventWhereInput>;
};

export type FlipExternalEventOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type FlipExternalEventWhereInput = {
  AND?: InputMaybe<Array<FlipExternalEventWhereInput>>;
  FlipMedia?: InputMaybe<FlipMediaListRelationFilter>;
  NOT?: InputMaybe<Array<FlipExternalEventWhereInput>>;
  OR?: InputMaybe<Array<FlipExternalEventWhereInput>>;
  address?: InputMaybe<FlipAddressNullableRelationFilter>;
  addressId?: InputMaybe<StringNullableFilter>;
  artists?: InputMaybe<FlipArtistListRelationFilter>;
  category?: InputMaybe<FlipCategoryNullableRelationFilter>;
  categoryId?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringNullableFilter>;
  endAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  isOnSale?: InputMaybe<BoolFilter>;
  mediaURLs?: InputMaybe<StringNullableListFilter>;
  name?: InputMaybe<StringFilter>;
  organization?: InputMaybe<FlipOrganizationNullableRelationFilter>;
  organizationId?: InputMaybe<StringNullableFilter>;
  organizationName?: InputMaybe<StringNullableFilter>;
  reviewStatus?: InputMaybe<EnumReviewStatusFilter>;
  startAt?: InputMaybe<DateTimeFilter>;
  ticketUrl?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  venue?: InputMaybe<FlipVenueNullableRelationFilter>;
  venueId?: InputMaybe<StringNullableFilter>;
};

export type FlipInvite = {
  __typename?: 'FlipInvite';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  entityId: Scalars['String']['output'];
  entityType: RoleEntityType;
  expiresAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  inviter?: Maybe<FlipUser>;
  inviterId: Scalars['String']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  roleName: RoleName;
  status: InviteStatus;
  updatedAt: Scalars['DateTime']['output'];
  validationCode: Scalars['String']['output'];
};

export type FlipInviteListRelationFilter = {
  every?: InputMaybe<FlipInviteWhereInput>;
  none?: InputMaybe<FlipInviteWhereInput>;
  some?: InputMaybe<FlipInviteWhereInput>;
};

export type FlipInviteOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type FlipInviteWhereInput = {
  AND?: InputMaybe<Array<FlipInviteWhereInput>>;
  NOT?: InputMaybe<Array<FlipInviteWhereInput>>;
  OR?: InputMaybe<Array<FlipInviteWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  email?: InputMaybe<StringFilter>;
  entityId?: InputMaybe<StringFilter>;
  entityType?: InputMaybe<EnumRoleEntityTypeFilter>;
  expiresAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  inviter?: InputMaybe<FlipUserNullableRelationFilter>;
  inviterId?: InputMaybe<StringFilter>;
  metadata?: InputMaybe<JsonNullableFilter>;
  roleName?: InputMaybe<EnumRoleNameFilter>;
  status?: InputMaybe<EnumInviteStatusFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  validationCode?: InputMaybe<StringFilter>;
};

export type FlipMedia = {
  __typename?: 'FlipMedia';
  FlipExternalEvent?: Maybe<FlipExternalEvent>;
  FlipReview?: Maybe<FlipReview>;
  _count: FlipMediaCount;
  banner?: Maybe<FlipBanner>;
  bannerId?: Maybe<Scalars['String']['output']>;
  collection?: Maybe<FlipCollection>;
  collectionId?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  event?: Maybe<FlipEvent>;
  eventId?: Maybe<Scalars['String']['output']>;
  flipExternalEventId?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  reviewId?: Maybe<Scalars['String']['output']>;
  type: MediaType;
  updatedAt: Scalars['DateTime']['output'];
  url: Scalars['String']['output'];
  venues?: Maybe<Array<FlipVenue>>;
};

export type FlipMediaCount = {
  __typename?: 'FlipMediaCount';
  venues: Scalars['Int']['output'];
};

export type FlipMediaListRelationFilter = {
  every?: InputMaybe<FlipMediaWhereInput>;
  none?: InputMaybe<FlipMediaWhereInput>;
  some?: InputMaybe<FlipMediaWhereInput>;
};

export type FlipMediaOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type FlipMediaWhereInput = {
  AND?: InputMaybe<Array<FlipMediaWhereInput>>;
  FlipExternalEvent?: InputMaybe<FlipExternalEventNullableRelationFilter>;
  FlipReview?: InputMaybe<FlipReviewNullableRelationFilter>;
  NOT?: InputMaybe<Array<FlipMediaWhereInput>>;
  OR?: InputMaybe<Array<FlipMediaWhereInput>>;
  banner?: InputMaybe<FlipBannerNullableRelationFilter>;
  bannerId?: InputMaybe<StringNullableFilter>;
  collection?: InputMaybe<FlipCollectionNullableRelationFilter>;
  collectionId?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  event?: InputMaybe<FlipEventNullableRelationFilter>;
  eventId?: InputMaybe<StringNullableFilter>;
  flipExternalEventId?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  reviewId?: InputMaybe<StringNullableFilter>;
  type?: InputMaybe<EnumMediaTypeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  url?: InputMaybe<StringFilter>;
  venues?: InputMaybe<FlipVenueListRelationFilter>;
};

export type FlipOpeningHour = {
  __typename?: 'FlipOpeningHour';
  closeHour: Scalars['Int']['output'];
  closeMinute: Scalars['Int']['output'];
  day: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  openHour: Scalars['Int']['output'];
  openMinute: Scalars['Int']['output'];
  venue: FlipVenue;
  venueId: Scalars['String']['output'];
};

export type FlipOpeningHourListRelationFilter = {
  every?: InputMaybe<FlipOpeningHourWhereInput>;
  none?: InputMaybe<FlipOpeningHourWhereInput>;
  some?: InputMaybe<FlipOpeningHourWhereInput>;
};

export type FlipOpeningHourOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type FlipOpeningHourWhereInput = {
  AND?: InputMaybe<Array<FlipOpeningHourWhereInput>>;
  NOT?: InputMaybe<Array<FlipOpeningHourWhereInput>>;
  OR?: InputMaybe<Array<FlipOpeningHourWhereInput>>;
  closeHour?: InputMaybe<IntFilter>;
  closeMinute?: InputMaybe<IntFilter>;
  day?: InputMaybe<IntFilter>;
  id?: InputMaybe<StringFilter>;
  openHour?: InputMaybe<IntFilter>;
  openMinute?: InputMaybe<IntFilter>;
  venue?: InputMaybe<FlipVenueRelationFilter>;
  venueId?: InputMaybe<StringFilter>;
};

export type FlipOrganization = {
  __typename?: 'FlipOrganization';
  _count: FlipOrganizationCount;
  address?: Maybe<FlipAddress>;
  addressId?: Maybe<Scalars['String']['output']>;
  checkoutConfigs?: Maybe<Array<FlipCheckoutConfig>>;
  contactEmail?: Maybe<Scalars['String']['output']>;
  contactPhone?: Maybe<Scalars['String']['output']>;
  coverURL?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  emailTemplateConfigs?: Maybe<Array<FlipEmailTemplateConfig>>;
  events?: Maybe<Array<FlipEvent>>;
  externalEvents?: Maybe<Array<FlipExternalEvent>>;
  facebookLikes?: Maybe<Scalars['String']['output']>;
  facebookURL?: Maybe<Scalars['String']['output']>;
  handle: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  instagramURL?: Maybe<Scalars['String']['output']>;
  logoURL?: Maybe<Scalars['String']['output']>;
  metadata?: Maybe<Scalars['JSON']['output']>;
  name: Scalars['String']['output'];
  owner?: Maybe<FlipUser>;
  ownerId: Scalars['String']['output'];
  pricingConfigs?: Maybe<Array<FlipPricingConfig>>;
  tags?: Maybe<Array<FlipTag>>;
  ticketTemplateConfigs?: Maybe<Array<FlipTicketTemplateConfig>>;
  tiktokURL?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  websiteURL?: Maybe<Scalars['String']['output']>;
};

export type FlipOrganizationCount = {
  __typename?: 'FlipOrganizationCount';
  checkoutConfigs: Scalars['Int']['output'];
  emailTemplateConfigs: Scalars['Int']['output'];
  events: Scalars['Int']['output'];
  externalEvents: Scalars['Int']['output'];
  pricingConfigs: Scalars['Int']['output'];
  tags: Scalars['Int']['output'];
  ticketTemplateConfigs: Scalars['Int']['output'];
};

export type FlipOrganizationListRelationFilter = {
  every?: InputMaybe<FlipOrganizationWhereInput>;
  none?: InputMaybe<FlipOrganizationWhereInput>;
  some?: InputMaybe<FlipOrganizationWhereInput>;
};

export type FlipOrganizationNullableRelationFilter = {
  is?: InputMaybe<FlipOrganizationWhereInput>;
  isNot?: InputMaybe<FlipOrganizationWhereInput>;
};

export type FlipOrganizationOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type FlipOrganizationOrderByWithRelationInput = {
  address?: InputMaybe<FlipAddressOrderByWithRelationInput>;
  addressId?: InputMaybe<SortOrderInput>;
  checkoutConfigs?: InputMaybe<FlipCheckoutConfigOrderByRelationAggregateInput>;
  contactEmail?: InputMaybe<SortOrderInput>;
  contactPhone?: InputMaybe<SortOrderInput>;
  coverURL?: InputMaybe<SortOrderInput>;
  createdAt?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrderInput>;
  emailTemplateConfigs?: InputMaybe<FlipEmailTemplateConfigOrderByRelationAggregateInput>;
  events?: InputMaybe<FlipEventOrderByRelationAggregateInput>;
  externalEvents?: InputMaybe<FlipExternalEventOrderByRelationAggregateInput>;
  facebookLikes?: InputMaybe<SortOrderInput>;
  facebookURL?: InputMaybe<SortOrderInput>;
  handle?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  instagramURL?: InputMaybe<SortOrderInput>;
  logoURL?: InputMaybe<SortOrderInput>;
  metadata?: InputMaybe<SortOrderInput>;
  name?: InputMaybe<SortOrder>;
  owner?: InputMaybe<FlipUserOrderByWithRelationInput>;
  ownerId?: InputMaybe<SortOrder>;
  pricingConfigs?: InputMaybe<FlipPricingConfigOrderByRelationAggregateInput>;
  tags?: InputMaybe<FlipTagOrderByRelationAggregateInput>;
  ticketTemplateConfigs?: InputMaybe<FlipTicketTemplateConfigOrderByRelationAggregateInput>;
  tiktokURL?: InputMaybe<SortOrderInput>;
  updatedAt?: InputMaybe<SortOrder>;
  websiteURL?: InputMaybe<SortOrderInput>;
};

export type FlipOrganizationRelationFilter = {
  is?: InputMaybe<FlipOrganizationWhereInput>;
  isNot?: InputMaybe<FlipOrganizationWhereInput>;
};

export type FlipOrganizationWhereInput = {
  AND?: InputMaybe<Array<FlipOrganizationWhereInput>>;
  NOT?: InputMaybe<Array<FlipOrganizationWhereInput>>;
  OR?: InputMaybe<Array<FlipOrganizationWhereInput>>;
  address?: InputMaybe<FlipAddressNullableRelationFilter>;
  addressId?: InputMaybe<StringNullableFilter>;
  checkoutConfigs?: InputMaybe<FlipCheckoutConfigListRelationFilter>;
  contactEmail?: InputMaybe<StringNullableFilter>;
  contactPhone?: InputMaybe<StringNullableFilter>;
  coverURL?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringNullableFilter>;
  emailTemplateConfigs?: InputMaybe<FlipEmailTemplateConfigListRelationFilter>;
  events?: InputMaybe<FlipEventListRelationFilter>;
  externalEvents?: InputMaybe<FlipExternalEventListRelationFilter>;
  facebookLikes?: InputMaybe<StringNullableFilter>;
  facebookURL?: InputMaybe<StringNullableFilter>;
  handle?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  instagramURL?: InputMaybe<StringNullableFilter>;
  logoURL?: InputMaybe<StringNullableFilter>;
  metadata?: InputMaybe<JsonNullableFilter>;
  name?: InputMaybe<StringFilter>;
  owner?: InputMaybe<FlipUserNullableRelationFilter>;
  ownerId?: InputMaybe<StringFilter>;
  pricingConfigs?: InputMaybe<FlipPricingConfigListRelationFilter>;
  tags?: InputMaybe<FlipTagListRelationFilter>;
  ticketTemplateConfigs?: InputMaybe<FlipTicketTemplateConfigListRelationFilter>;
  tiktokURL?: InputMaybe<StringNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  websiteURL?: InputMaybe<StringNullableFilter>;
};

export type FlipPricingConfig = {
  __typename?: 'FlipPricingConfig';
  businessLevel: BusinessLevelConfig;
  createdAt: Scalars['DateTime']['output'];
  event?: Maybe<FlipEvent>;
  eventId?: Maybe<Scalars['String']['output']>;
  freeTicketFixedFee: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  organization?: Maybe<FlipOrganization>;
  organizationId?: Maybe<Scalars['String']['output']>;
  paidTicketFixedFee: Scalars['Int']['output'];
  paidTicketPercentageFee: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type FlipPricingConfigListRelationFilter = {
  every?: InputMaybe<FlipPricingConfigWhereInput>;
  none?: InputMaybe<FlipPricingConfigWhereInput>;
  some?: InputMaybe<FlipPricingConfigWhereInput>;
};

export type FlipPricingConfigOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type FlipPricingConfigWhereInput = {
  AND?: InputMaybe<Array<FlipPricingConfigWhereInput>>;
  NOT?: InputMaybe<Array<FlipPricingConfigWhereInput>>;
  OR?: InputMaybe<Array<FlipPricingConfigWhereInput>>;
  businessLevel?: InputMaybe<EnumBusinessLevelConfigFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  event?: InputMaybe<FlipEventNullableRelationFilter>;
  eventId?: InputMaybe<StringNullableFilter>;
  freeTicketFixedFee?: InputMaybe<IntFilter>;
  id?: InputMaybe<StringFilter>;
  organization?: InputMaybe<FlipOrganizationNullableRelationFilter>;
  organizationId?: InputMaybe<StringNullableFilter>;
  paidTicketFixedFee?: InputMaybe<IntFilter>;
  paidTicketPercentageFee?: InputMaybe<FloatFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type FlipQuestion = {
  __typename?: 'FlipQuestion';
  _count: FlipQuestionCount;
  answers?: Maybe<Array<FlipAnswer>>;
  author: FlipUser;
  authorId: Scalars['String']['output'];
  content: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  venue: FlipVenue;
  venueId: Scalars['String']['output'];
};

export type FlipQuestionCount = {
  __typename?: 'FlipQuestionCount';
  answers: Scalars['Int']['output'];
};

export type FlipQuestionListRelationFilter = {
  every?: InputMaybe<FlipQuestionWhereInput>;
  none?: InputMaybe<FlipQuestionWhereInput>;
  some?: InputMaybe<FlipQuestionWhereInput>;
};

export type FlipQuestionOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type FlipQuestionRelationFilter = {
  is?: InputMaybe<FlipQuestionWhereInput>;
  isNot?: InputMaybe<FlipQuestionWhereInput>;
};

export type FlipQuestionWhereInput = {
  AND?: InputMaybe<Array<FlipQuestionWhereInput>>;
  NOT?: InputMaybe<Array<FlipQuestionWhereInput>>;
  OR?: InputMaybe<Array<FlipQuestionWhereInput>>;
  answers?: InputMaybe<FlipAnswerListRelationFilter>;
  author?: InputMaybe<FlipUserRelationFilter>;
  authorId?: InputMaybe<StringFilter>;
  content?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  venue?: InputMaybe<FlipVenueRelationFilter>;
  venueId?: InputMaybe<StringFilter>;
};

export type FlipReaction = {
  __typename?: 'FlipReaction';
  collection?: Maybe<FlipCollection>;
  collectionId?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  event?: Maybe<FlipEvent>;
  eventId?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  type: ReactionType;
  updatedAt: Scalars['DateTime']['output'];
};

export type FlipReactionListRelationFilter = {
  every?: InputMaybe<FlipReactionWhereInput>;
  none?: InputMaybe<FlipReactionWhereInput>;
  some?: InputMaybe<FlipReactionWhereInput>;
};

export type FlipReactionOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type FlipReactionWhereInput = {
  AND?: InputMaybe<Array<FlipReactionWhereInput>>;
  NOT?: InputMaybe<Array<FlipReactionWhereInput>>;
  OR?: InputMaybe<Array<FlipReactionWhereInput>>;
  collection?: InputMaybe<FlipCollectionNullableRelationFilter>;
  collectionId?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  event?: InputMaybe<FlipEventNullableRelationFilter>;
  eventId?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<IntFilter>;
  type?: InputMaybe<EnumReactionTypeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type FlipReview = {
  __typename?: 'FlipReview';
  _count: FlipReviewCount;
  author: FlipUser;
  authorId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  media?: Maybe<Array<FlipMedia>>;
  rating: Scalars['Float']['output'];
  status: ReviewStatusType;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  venue: FlipVenue;
  venueId: Scalars['String']['output'];
};

export type FlipReviewCount = {
  __typename?: 'FlipReviewCount';
  media: Scalars['Int']['output'];
};

export type FlipReviewListRelationFilter = {
  every?: InputMaybe<FlipReviewWhereInput>;
  none?: InputMaybe<FlipReviewWhereInput>;
  some?: InputMaybe<FlipReviewWhereInput>;
};

export type FlipReviewNullableRelationFilter = {
  is?: InputMaybe<FlipReviewWhereInput>;
  isNot?: InputMaybe<FlipReviewWhereInput>;
};

export type FlipReviewOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type FlipReviewWhereInput = {
  AND?: InputMaybe<Array<FlipReviewWhereInput>>;
  NOT?: InputMaybe<Array<FlipReviewWhereInput>>;
  OR?: InputMaybe<Array<FlipReviewWhereInput>>;
  author?: InputMaybe<FlipUserRelationFilter>;
  authorId?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  media?: InputMaybe<FlipMediaListRelationFilter>;
  rating?: InputMaybe<FloatFilter>;
  status?: InputMaybe<EnumReviewStatusTypeFilter>;
  title?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  venue?: InputMaybe<FlipVenueRelationFilter>;
  venueId?: InputMaybe<StringFilter>;
};

export type FlipSeatMap = {
  __typename?: 'FlipSeatMap';
  createdAt: Scalars['DateTime']['output'];
  event: FlipEvent;
  eventId: Scalars['String']['output'];
  holdSeatRules: Scalars['JSON']['output'];
  id: Scalars['ID']['output'];
  tierRules: Scalars['JSON']['output'];
  updatedAt: Scalars['DateTime']['output'];
  url: Scalars['String']['output'];
};

export type FlipSeatMapNullableRelationFilter = {
  is?: InputMaybe<FlipSeatMapWhereInput>;
  isNot?: InputMaybe<FlipSeatMapWhereInput>;
};

export type FlipSeatMapOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>;
  event?: InputMaybe<FlipEventOrderByWithRelationInput>;
  eventId?: InputMaybe<SortOrder>;
  holdSeatRules?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  tierRules?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  url?: InputMaybe<SortOrder>;
};

export type FlipSeatMapWhereInput = {
  AND?: InputMaybe<Array<FlipSeatMapWhereInput>>;
  NOT?: InputMaybe<Array<FlipSeatMapWhereInput>>;
  OR?: InputMaybe<Array<FlipSeatMapWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  event?: InputMaybe<FlipEventRelationFilter>;
  eventId?: InputMaybe<StringFilter>;
  holdSeatRules?: InputMaybe<JsonFilter>;
  id?: InputMaybe<StringFilter>;
  tierRules?: InputMaybe<JsonFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  url?: InputMaybe<StringFilter>;
};

export type FlipShow = {
  __typename?: 'FlipShow';
  _count: FlipShowCount;
  artists?: Maybe<Array<FlipArtist>>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  handle: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  tags?: Maybe<Array<FlipTag>>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type FlipShowCount = {
  __typename?: 'FlipShowCount';
  artists: Scalars['Int']['output'];
  tags: Scalars['Int']['output'];
};

export type FlipShowListRelationFilter = {
  every?: InputMaybe<FlipShowWhereInput>;
  none?: InputMaybe<FlipShowWhereInput>;
  some?: InputMaybe<FlipShowWhereInput>;
};

export type FlipShowWhereInput = {
  AND?: InputMaybe<Array<FlipShowWhereInput>>;
  NOT?: InputMaybe<Array<FlipShowWhereInput>>;
  OR?: InputMaybe<Array<FlipShowWhereInput>>;
  artists?: InputMaybe<FlipArtistListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringNullableFilter>;
  handle?: InputMaybe<StringFilter>;
  id?: InputMaybe<IntFilter>;
  tags?: InputMaybe<FlipTagListRelationFilter>;
  title?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type FlipTag = {
  __typename?: 'FlipTag';
  _count: FlipTagCount;
  artists?: Maybe<Array<FlipArtist>>;
  id: Scalars['ID']['output'];
  label: Scalars['String']['output'];
  organizations?: Maybe<Array<FlipOrganization>>;
  shows?: Maybe<Array<FlipShow>>;
  subscribers?: Maybe<Array<FlipUser>>;
};

export type FlipTagCount = {
  __typename?: 'FlipTagCount';
  artists: Scalars['Int']['output'];
  organizations: Scalars['Int']['output'];
  shows: Scalars['Int']['output'];
  subscribers: Scalars['Int']['output'];
};

export type FlipTagListRelationFilter = {
  every?: InputMaybe<FlipTagWhereInput>;
  none?: InputMaybe<FlipTagWhereInput>;
  some?: InputMaybe<FlipTagWhereInput>;
};

export type FlipTagOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type FlipTagWhereInput = {
  AND?: InputMaybe<Array<FlipTagWhereInput>>;
  NOT?: InputMaybe<Array<FlipTagWhereInput>>;
  OR?: InputMaybe<Array<FlipTagWhereInput>>;
  artists?: InputMaybe<FlipArtistListRelationFilter>;
  id?: InputMaybe<StringFilter>;
  label?: InputMaybe<StringFilter>;
  organizations?: InputMaybe<FlipOrganizationListRelationFilter>;
  shows?: InputMaybe<FlipShowListRelationFilter>;
  subscribers?: InputMaybe<FlipUserListRelationFilter>;
};

export type FlipTicket = {
  __typename?: 'FlipTicket';
  checkInNotes?: Maybe<Scalars['String']['output']>;
  checkedInAt?: Maybe<Scalars['DateTime']['output']>;
  checkedInBy?: Maybe<Scalars['String']['output']>;
  checkedInByUser?: Maybe<FlipUser>;
  createdAt: Scalars['DateTime']['output'];
  event: FlipEvent;
  eventId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  owner: FlipUser;
  ownerId: Scalars['String']['output'];
  status: TicketStatus;
  ticketingOrderDisplayId?: Maybe<Scalars['String']['output']>;
  ticketingOrderId: Scalars['String']['output'];
  ticketingVariantId: Scalars['String']['output'];
  tier: FlipTicketTier;
  tierId: Scalars['String']['output'];
  type: TicketType;
  updatedAt: Scalars['DateTime']['output'];
  validationCode: Scalars['String']['output'];
};

export type FlipTicketListRelationFilter = {
  every?: InputMaybe<FlipTicketWhereInput>;
  none?: InputMaybe<FlipTicketWhereInput>;
  some?: InputMaybe<FlipTicketWhereInput>;
};

export type FlipTicketOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type FlipTicketTemplateConfig = {
  __typename?: 'FlipTicketTemplateConfig';
  businessLevel: BusinessLevelConfig;
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  engine: TemplateEngine;
  event?: Maybe<FlipEvent>;
  eventId?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  organization?: Maybe<FlipOrganization>;
  organizationId?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type FlipTicketTemplateConfigListRelationFilter = {
  every?: InputMaybe<FlipTicketTemplateConfigWhereInput>;
  none?: InputMaybe<FlipTicketTemplateConfigWhereInput>;
  some?: InputMaybe<FlipTicketTemplateConfigWhereInput>;
};

export type FlipTicketTemplateConfigOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type FlipTicketTemplateConfigWhereInput = {
  AND?: InputMaybe<Array<FlipTicketTemplateConfigWhereInput>>;
  NOT?: InputMaybe<Array<FlipTicketTemplateConfigWhereInput>>;
  OR?: InputMaybe<Array<FlipTicketTemplateConfigWhereInput>>;
  businessLevel?: InputMaybe<EnumBusinessLevelConfigFilter>;
  content?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  engine?: InputMaybe<EnumTemplateEngineFilter>;
  event?: InputMaybe<FlipEventNullableRelationFilter>;
  eventId?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  metadata?: InputMaybe<JsonNullableFilter>;
  organization?: InputMaybe<FlipOrganizationNullableRelationFilter>;
  organizationId?: InputMaybe<StringNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type FlipTicketTier = {
  __typename?: 'FlipTicketTier';
  FlipTicket?: Maybe<Array<FlipTicket>>;
  _count: FlipTicketTierCount;
  createdAt: Scalars['DateTime']['output'];
  deliveryMethods?: Maybe<Array<DeliveryMethod>>;
  description?: Maybe<Scalars['String']['output']>;
  event: FlipEvent;
  eventId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  initialInventory: Scalars['Int']['output'];
  isVisible: Scalars['Boolean']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  name: Scalars['String']['output'];
  price: Scalars['Int']['output'];
  saleEndAt: Scalars['DateTime']['output'];
  saleStartAt: Scalars['DateTime']['output'];
  totalCheckedIn: Scalars['Int']['output'];
  totalHeld: Scalars['Int']['output'];
  totalSold: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type FlipTicketTierCount = {
  __typename?: 'FlipTicketTierCount';
  FlipTicket: Scalars['Int']['output'];
};

export type FlipTicketTierListRelationFilter = {
  every?: InputMaybe<FlipTicketTierWhereInput>;
  none?: InputMaybe<FlipTicketTierWhereInput>;
  some?: InputMaybe<FlipTicketTierWhereInput>;
};

export type FlipTicketTierOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type FlipTicketTierRelationFilter = {
  is?: InputMaybe<FlipTicketTierWhereInput>;
  isNot?: InputMaybe<FlipTicketTierWhereInput>;
};

export type FlipTicketTierWhereInput = {
  AND?: InputMaybe<Array<FlipTicketTierWhereInput>>;
  FlipTicket?: InputMaybe<FlipTicketListRelationFilter>;
  NOT?: InputMaybe<Array<FlipTicketTierWhereInput>>;
  OR?: InputMaybe<Array<FlipTicketTierWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  deliveryMethods?: InputMaybe<EnumDeliveryMethodNullableListFilter>;
  description?: InputMaybe<StringNullableFilter>;
  event?: InputMaybe<FlipEventRelationFilter>;
  eventId?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  initialInventory?: InputMaybe<IntFilter>;
  isVisible?: InputMaybe<BoolFilter>;
  metadata?: InputMaybe<JsonNullableFilter>;
  name?: InputMaybe<StringFilter>;
  price?: InputMaybe<IntFilter>;
  saleEndAt?: InputMaybe<DateTimeFilter>;
  saleStartAt?: InputMaybe<DateTimeFilter>;
  totalCheckedIn?: InputMaybe<IntFilter>;
  totalHeld?: InputMaybe<IntFilter>;
  totalSold?: InputMaybe<IntFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type FlipTicketWhereInput = {
  AND?: InputMaybe<Array<FlipTicketWhereInput>>;
  NOT?: InputMaybe<Array<FlipTicketWhereInput>>;
  OR?: InputMaybe<Array<FlipTicketWhereInput>>;
  checkInNotes?: InputMaybe<StringNullableFilter>;
  checkedInAt?: InputMaybe<DateTimeNullableFilter>;
  checkedInBy?: InputMaybe<StringNullableFilter>;
  checkedInByUser?: InputMaybe<FlipUserNullableRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  event?: InputMaybe<FlipEventRelationFilter>;
  eventId?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  metadata?: InputMaybe<JsonNullableFilter>;
  owner?: InputMaybe<FlipUserRelationFilter>;
  ownerId?: InputMaybe<StringFilter>;
  status?: InputMaybe<EnumTicketStatusFilter>;
  ticketingOrderDisplayId?: InputMaybe<StringNullableFilter>;
  ticketingOrderId?: InputMaybe<StringFilter>;
  ticketingVariantId?: InputMaybe<StringFilter>;
  tier?: InputMaybe<FlipTicketTierRelationFilter>;
  tierId?: InputMaybe<StringFilter>;
  type?: InputMaybe<EnumTicketTypeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  validationCode?: InputMaybe<StringFilter>;
};

export type FlipUser = {
  __typename?: 'FlipUser';
  _count: FlipUserCount;
  address?: Maybe<Array<FlipAddress>>;
  answers?: Maybe<Array<FlipAnswer>>;
  bio?: Maybe<Scalars['String']['output']>;
  birthday?: Maybe<Scalars['DateTime']['output']>;
  checkedInTickets?: Maybe<Array<FlipTicket>>;
  collectionsOwned?: Maybe<Array<FlipCollection>>;
  comments?: Maybe<Array<FlipComment>>;
  coverImageURL?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  devices?: Maybe<Array<FlipUserDevice>>;
  displayName: Scalars['String']['output'];
  email: Scalars['String']['output'];
  firstName?: Maybe<Scalars['String']['output']>;
  gender?: Maybe<Gender>;
  id: Scalars['ID']['output'];
  identityNumber?: Maybe<Scalars['String']['output']>;
  identityVerified: Scalars['Boolean']['output'];
  invites?: Maybe<Array<FlipInvite>>;
  lastName?: Maybe<Scalars['String']['output']>;
  ownedOrganization?: Maybe<FlipOrganization>;
  phone?: Maybe<Scalars['String']['output']>;
  profileImageURL?: Maybe<Scalars['String']['output']>;
  questions?: Maybe<Array<FlipQuestion>>;
  reviews?: Maybe<Array<FlipReview>>;
  streamChatToken?: Maybe<Scalars['String']['output']>;
  tagsFollow?: Maybe<Array<FlipTag>>;
  tickets?: Maybe<Array<FlipTicket>>;
  updatedAt: Scalars['DateTime']['output'];
  userToEntities?: Maybe<Array<FlipUserToEntity>>;
  venuesFollowed?: Maybe<Array<FlipVenue>>;
};

export type FlipUserCount = {
  __typename?: 'FlipUserCount';
  address: Scalars['Int']['output'];
  answers: Scalars['Int']['output'];
  checkedInTickets: Scalars['Int']['output'];
  collectionsOwned: Scalars['Int']['output'];
  comments: Scalars['Int']['output'];
  devices: Scalars['Int']['output'];
  invites: Scalars['Int']['output'];
  questions: Scalars['Int']['output'];
  reviews: Scalars['Int']['output'];
  tagsFollow: Scalars['Int']['output'];
  tickets: Scalars['Int']['output'];
  userToEntities: Scalars['Int']['output'];
  venuesFollowed: Scalars['Int']['output'];
};

export type FlipUserDevice = {
  __typename?: 'FlipUserDevice';
  createdAt: Scalars['DateTime']['output'];
  fcmToken: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user?: Maybe<FlipUser>;
  userId: Scalars['String']['output'];
};

export type FlipUserDeviceListRelationFilter = {
  every?: InputMaybe<FlipUserDeviceWhereInput>;
  none?: InputMaybe<FlipUserDeviceWhereInput>;
  some?: InputMaybe<FlipUserDeviceWhereInput>;
};

export type FlipUserDeviceOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type FlipUserDeviceWhereInput = {
  AND?: InputMaybe<Array<FlipUserDeviceWhereInput>>;
  NOT?: InputMaybe<Array<FlipUserDeviceWhereInput>>;
  OR?: InputMaybe<Array<FlipUserDeviceWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  fcmToken?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<FlipUserNullableRelationFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type FlipUserListRelationFilter = {
  every?: InputMaybe<FlipUserWhereInput>;
  none?: InputMaybe<FlipUserWhereInput>;
  some?: InputMaybe<FlipUserWhereInput>;
};

export type FlipUserNullableRelationFilter = {
  is?: InputMaybe<FlipUserWhereInput>;
  isNot?: InputMaybe<FlipUserWhereInput>;
};

export type FlipUserOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type FlipUserOrderByWithRelationInput = {
  address?: InputMaybe<FlipAddressOrderByRelationAggregateInput>;
  answers?: InputMaybe<FlipAnswerOrderByRelationAggregateInput>;
  bio?: InputMaybe<SortOrderInput>;
  birthday?: InputMaybe<SortOrderInput>;
  checkedInTickets?: InputMaybe<FlipTicketOrderByRelationAggregateInput>;
  collectionsOwned?: InputMaybe<FlipCollectionOrderByRelationAggregateInput>;
  comments?: InputMaybe<FlipCommentOrderByRelationAggregateInput>;
  coverImageURL?: InputMaybe<SortOrderInput>;
  createdAt?: InputMaybe<SortOrder>;
  deletedAt?: InputMaybe<SortOrderInput>;
  devices?: InputMaybe<FlipUserDeviceOrderByRelationAggregateInput>;
  displayName?: InputMaybe<SortOrder>;
  email?: InputMaybe<SortOrder>;
  firstName?: InputMaybe<SortOrderInput>;
  gender?: InputMaybe<SortOrderInput>;
  id?: InputMaybe<SortOrder>;
  identityNumber?: InputMaybe<SortOrderInput>;
  identityVerified?: InputMaybe<SortOrder>;
  invites?: InputMaybe<FlipInviteOrderByRelationAggregateInput>;
  lastName?: InputMaybe<SortOrderInput>;
  ownedOrganization?: InputMaybe<FlipOrganizationOrderByWithRelationInput>;
  phone?: InputMaybe<SortOrderInput>;
  profileImageURL?: InputMaybe<SortOrderInput>;
  questions?: InputMaybe<FlipQuestionOrderByRelationAggregateInput>;
  reviews?: InputMaybe<FlipReviewOrderByRelationAggregateInput>;
  streamChatToken?: InputMaybe<SortOrderInput>;
  tagsFollow?: InputMaybe<FlipTagOrderByRelationAggregateInput>;
  tickets?: InputMaybe<FlipTicketOrderByRelationAggregateInput>;
  updatedAt?: InputMaybe<SortOrder>;
  userToEntities?: InputMaybe<FlipUserToEntityOrderByRelationAggregateInput>;
  venuesFollowed?: InputMaybe<FlipVenueOrderByRelationAggregateInput>;
};

export type FlipUserRelationFilter = {
  is?: InputMaybe<FlipUserWhereInput>;
  isNot?: InputMaybe<FlipUserWhereInput>;
};

export type FlipUserToEntity = {
  __typename?: 'FlipUserToEntity';
  createdAt: Scalars['DateTime']['output'];
  entityId: Scalars['String']['output'];
  entityType: RoleEntityType;
  id: Scalars['ID']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  roleName: RoleName;
  updatedAt: Scalars['DateTime']['output'];
  user?: Maybe<FlipUser>;
  userId: Scalars['String']['output'];
};

export type FlipUserToEntityListRelationFilter = {
  every?: InputMaybe<FlipUserToEntityWhereInput>;
  none?: InputMaybe<FlipUserToEntityWhereInput>;
  some?: InputMaybe<FlipUserToEntityWhereInput>;
};

export type FlipUserToEntityOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type FlipUserToEntityWhereInput = {
  AND?: InputMaybe<Array<FlipUserToEntityWhereInput>>;
  NOT?: InputMaybe<Array<FlipUserToEntityWhereInput>>;
  OR?: InputMaybe<Array<FlipUserToEntityWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  entityId?: InputMaybe<StringFilter>;
  entityType?: InputMaybe<EnumRoleEntityTypeFilter>;
  id?: InputMaybe<StringFilter>;
  metadata?: InputMaybe<JsonNullableFilter>;
  roleName?: InputMaybe<EnumRoleNameFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<FlipUserNullableRelationFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type FlipUserWhereInput = {
  AND?: InputMaybe<Array<FlipUserWhereInput>>;
  NOT?: InputMaybe<Array<FlipUserWhereInput>>;
  OR?: InputMaybe<Array<FlipUserWhereInput>>;
  address?: InputMaybe<FlipAddressListRelationFilter>;
  answers?: InputMaybe<FlipAnswerListRelationFilter>;
  bio?: InputMaybe<StringNullableFilter>;
  birthday?: InputMaybe<DateTimeNullableFilter>;
  checkedInTickets?: InputMaybe<FlipTicketListRelationFilter>;
  collectionsOwned?: InputMaybe<FlipCollectionListRelationFilter>;
  comments?: InputMaybe<FlipCommentListRelationFilter>;
  coverImageURL?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  deletedAt?: InputMaybe<DateTimeNullableFilter>;
  devices?: InputMaybe<FlipUserDeviceListRelationFilter>;
  displayName?: InputMaybe<StringFilter>;
  email?: InputMaybe<StringFilter>;
  firstName?: InputMaybe<StringNullableFilter>;
  gender?: InputMaybe<EnumGenderNullableFilter>;
  id?: InputMaybe<StringFilter>;
  identityNumber?: InputMaybe<StringNullableFilter>;
  identityVerified?: InputMaybe<BoolFilter>;
  invites?: InputMaybe<FlipInviteListRelationFilter>;
  lastName?: InputMaybe<StringNullableFilter>;
  ownedOrganization?: InputMaybe<FlipOrganizationNullableRelationFilter>;
  phone?: InputMaybe<StringNullableFilter>;
  profileImageURL?: InputMaybe<StringNullableFilter>;
  questions?: InputMaybe<FlipQuestionListRelationFilter>;
  reviews?: InputMaybe<FlipReviewListRelationFilter>;
  streamChatToken?: InputMaybe<StringNullableFilter>;
  tagsFollow?: InputMaybe<FlipTagListRelationFilter>;
  tickets?: InputMaybe<FlipTicketListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  userToEntities?: InputMaybe<FlipUserToEntityListRelationFilter>;
  venuesFollowed?: InputMaybe<FlipVenueListRelationFilter>;
};

export type FlipVenue = {
  __typename?: 'FlipVenue';
  _count: FlipVenueCount;
  about?: Maybe<Scalars['String']['output']>;
  address: FlipAddress;
  addressId: Scalars['String']['output'];
  categories?: Maybe<Array<FlipCategory>>;
  categoriesNorm?: Maybe<Array<Scalars['String']['output']>>;
  collections?: Maybe<Array<FlipCollection>>;
  coverImageURL?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  events?: Maybe<Array<FlipEvent>>;
  externalEvents?: Maybe<Array<FlipExternalEvent>>;
  fbPageHandler?: Maybe<Scalars['String']['output']>;
  fbPageId?: Maybe<Scalars['String']['output']>;
  fbPageToken?: Maybe<Scalars['String']['output']>;
  followers?: Maybe<Array<FlipUser>>;
  id: Scalars['ID']['output'];
  igHandler?: Maybe<Scalars['String']['output']>;
  isOnboarded: Scalars['Boolean']['output'];
  media?: Maybe<Array<FlipMedia>>;
  name: Scalars['String']['output'];
  openingHour?: Maybe<Array<FlipOpeningHour>>;
  phone?: Maybe<Scalars['String']['output']>;
  profileImageURL?: Maybe<Scalars['String']['output']>;
  questions?: Maybe<Array<FlipQuestion>>;
  reviews?: Maybe<Array<FlipReview>>;
  tag?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  website?: Maybe<Scalars['String']['output']>;
};

export type FlipVenueCount = {
  __typename?: 'FlipVenueCount';
  categories: Scalars['Int']['output'];
  collections: Scalars['Int']['output'];
  events: Scalars['Int']['output'];
  externalEvents: Scalars['Int']['output'];
  followers: Scalars['Int']['output'];
  media: Scalars['Int']['output'];
  openingHour: Scalars['Int']['output'];
  questions: Scalars['Int']['output'];
  reviews: Scalars['Int']['output'];
};

export type FlipVenueListRelationFilter = {
  every?: InputMaybe<FlipVenueWhereInput>;
  none?: InputMaybe<FlipVenueWhereInput>;
  some?: InputMaybe<FlipVenueWhereInput>;
};

export type FlipVenueNullableRelationFilter = {
  is?: InputMaybe<FlipVenueWhereInput>;
  isNot?: InputMaybe<FlipVenueWhereInput>;
};

export type FlipVenueOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type FlipVenueOrderByWithRelationInput = {
  about?: InputMaybe<SortOrderInput>;
  address?: InputMaybe<FlipAddressOrderByWithRelationInput>;
  addressId?: InputMaybe<SortOrder>;
  categories?: InputMaybe<FlipCategoryOrderByRelationAggregateInput>;
  categoriesNorm?: InputMaybe<SortOrder>;
  collections?: InputMaybe<FlipCollectionOrderByRelationAggregateInput>;
  coverImageURL?: InputMaybe<SortOrderInput>;
  createdAt?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrderInput>;
  email?: InputMaybe<SortOrderInput>;
  events?: InputMaybe<FlipEventOrderByRelationAggregateInput>;
  externalEvents?: InputMaybe<FlipExternalEventOrderByRelationAggregateInput>;
  fbPageHandler?: InputMaybe<SortOrderInput>;
  fbPageId?: InputMaybe<SortOrderInput>;
  fbPageToken?: InputMaybe<SortOrderInput>;
  followers?: InputMaybe<FlipUserOrderByRelationAggregateInput>;
  id?: InputMaybe<SortOrder>;
  igHandler?: InputMaybe<SortOrderInput>;
  isOnboarded?: InputMaybe<SortOrder>;
  media?: InputMaybe<FlipMediaOrderByRelationAggregateInput>;
  name?: InputMaybe<SortOrder>;
  openingHour?: InputMaybe<FlipOpeningHourOrderByRelationAggregateInput>;
  phone?: InputMaybe<SortOrderInput>;
  profileImageURL?: InputMaybe<SortOrderInput>;
  questions?: InputMaybe<FlipQuestionOrderByRelationAggregateInput>;
  reviews?: InputMaybe<FlipReviewOrderByRelationAggregateInput>;
  tag?: InputMaybe<SortOrderInput>;
  updatedAt?: InputMaybe<SortOrder>;
  website?: InputMaybe<SortOrderInput>;
};

export type FlipVenueRelationFilter = {
  is?: InputMaybe<FlipVenueWhereInput>;
  isNot?: InputMaybe<FlipVenueWhereInput>;
};

export type FlipVenueWhereInput = {
  AND?: InputMaybe<Array<FlipVenueWhereInput>>;
  NOT?: InputMaybe<Array<FlipVenueWhereInput>>;
  OR?: InputMaybe<Array<FlipVenueWhereInput>>;
  about?: InputMaybe<StringNullableFilter>;
  address?: InputMaybe<FlipAddressRelationFilter>;
  addressId?: InputMaybe<StringFilter>;
  categories?: InputMaybe<FlipCategoryListRelationFilter>;
  categoriesNorm?: InputMaybe<StringNullableListFilter>;
  collections?: InputMaybe<FlipCollectionListRelationFilter>;
  coverImageURL?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringNullableFilter>;
  email?: InputMaybe<StringNullableFilter>;
  events?: InputMaybe<FlipEventListRelationFilter>;
  externalEvents?: InputMaybe<FlipExternalEventListRelationFilter>;
  fbPageHandler?: InputMaybe<StringNullableFilter>;
  fbPageId?: InputMaybe<StringNullableFilter>;
  fbPageToken?: InputMaybe<StringNullableFilter>;
  followers?: InputMaybe<FlipUserListRelationFilter>;
  id?: InputMaybe<StringFilter>;
  igHandler?: InputMaybe<StringNullableFilter>;
  isOnboarded?: InputMaybe<BoolFilter>;
  media?: InputMaybe<FlipMediaListRelationFilter>;
  name?: InputMaybe<StringFilter>;
  openingHour?: InputMaybe<FlipOpeningHourListRelationFilter>;
  phone?: InputMaybe<StringNullableFilter>;
  profileImageURL?: InputMaybe<StringNullableFilter>;
  questions?: InputMaybe<FlipQuestionListRelationFilter>;
  reviews?: InputMaybe<FlipReviewListRelationFilter>;
  tag?: InputMaybe<StringNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  website?: InputMaybe<StringNullableFilter>;
};

export type FlipVenueWhereUniqueInput = {
  AND?: InputMaybe<Array<FlipVenueWhereInput>>;
  NOT?: InputMaybe<Array<FlipVenueWhereInput>>;
  OR?: InputMaybe<Array<FlipVenueWhereInput>>;
  about?: InputMaybe<StringNullableFilter>;
  address?: InputMaybe<FlipAddressRelationFilter>;
  addressId?: InputMaybe<StringFilter>;
  categories?: InputMaybe<FlipCategoryListRelationFilter>;
  categoriesNorm?: InputMaybe<StringNullableListFilter>;
  collections?: InputMaybe<FlipCollectionListRelationFilter>;
  coverImageURL?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringNullableFilter>;
  email?: InputMaybe<StringNullableFilter>;
  events?: InputMaybe<FlipEventListRelationFilter>;
  externalEvents?: InputMaybe<FlipExternalEventListRelationFilter>;
  fbPageHandler?: InputMaybe<Scalars['String']['input']>;
  fbPageId?: InputMaybe<Scalars['String']['input']>;
  fbPageToken?: InputMaybe<StringNullableFilter>;
  followers?: InputMaybe<FlipUserListRelationFilter>;
  id?: InputMaybe<Scalars['String']['input']>;
  igHandler?: InputMaybe<Scalars['String']['input']>;
  isOnboarded?: InputMaybe<BoolFilter>;
  media?: InputMaybe<FlipMediaListRelationFilter>;
  name?: InputMaybe<StringFilter>;
  openingHour?: InputMaybe<FlipOpeningHourListRelationFilter>;
  phone?: InputMaybe<StringNullableFilter>;
  profileImageURL?: InputMaybe<StringNullableFilter>;
  questions?: InputMaybe<FlipQuestionListRelationFilter>;
  reviews?: InputMaybe<FlipReviewListRelationFilter>;
  tag?: InputMaybe<StringNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  website?: InputMaybe<Scalars['String']['input']>;
};

export type FloatFilter = {
  equals?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<Scalars['Float']['input']>>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  not?: InputMaybe<NestedFloatFilter>;
  notIn?: InputMaybe<Array<Scalars['Float']['input']>>;
};

export type FloatNullableFilter = {
  equals?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<Scalars['Float']['input']>>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  not?: InputMaybe<NestedFloatNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Float']['input']>>;
};

export type FulfillmentCount = {
  __typename?: 'FulfillmentCount';
  fulfillment_item: Scalars['Int']['output'];
  tracking_link: Scalars['Int']['output'];
};

export type FulfillmentListRelationFilter = {
  every?: InputMaybe<FulfillmentWhereInput>;
  none?: InputMaybe<FulfillmentWhereInput>;
  some?: InputMaybe<FulfillmentWhereInput>;
};

export type FulfillmentRelationFilter = {
  is?: InputMaybe<FulfillmentWhereInput>;
  isNot?: InputMaybe<FulfillmentWhereInput>;
};

export type Fulfillment_ItemListRelationFilter = {
  every?: InputMaybe<Fulfillment_ItemWhereInput>;
  none?: InputMaybe<Fulfillment_ItemWhereInput>;
  some?: InputMaybe<Fulfillment_ItemWhereInput>;
};

export type Fulfillment_ProviderCount = {
  __typename?: 'Fulfillment_providerCount';
  fulfillment: Scalars['Int']['output'];
  region_fulfillment_providers: Scalars['Int']['output'];
  shipping_option: Scalars['Int']['output'];
};

export type Fulfillment_ProviderNullableRelationFilter = {
  is?: InputMaybe<Fulfillment_ProviderWhereInput>;
  isNot?: InputMaybe<Fulfillment_ProviderWhereInput>;
};

export type Fulfillment_ProviderRelationFilter = {
  is?: InputMaybe<Fulfillment_ProviderWhereInput>;
  isNot?: InputMaybe<Fulfillment_ProviderWhereInput>;
};

export type GeEventSeatMapInput = {
  eventId: Scalars['ID']['input'];
};

export type GeOrganizationBySaResponse = {
  __typename?: 'GeOrganizationBySAResponse';
  pageInfo: PageInfo;
  results: Array<FlipOrganization>;
};

export enum Gender {
  Female = 'FEMALE',
  Male = 'MALE',
  Other = 'OTHER'
}

export type GetAddOnServicesInput = {
  cursor?: InputMaybe<FindManyIdCursorInput>;
  eventId: Scalars['ID']['input'];
  organizationId: Scalars['ID']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type GetAddOnServicesResponse = {
  __typename?: 'GetAddOnServicesResponse';
  addOnServices: Array<Add_On_Service>;
  pageInfo: PageInfo;
};

export type GetBalanceTransactionsInput = {
  cursor?: InputMaybe<FindManyIdCursorInput>;
  eventId: Scalars['ID']['input'];
  organizationId: Scalars['ID']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<BalanceTransactionsWhereInput>;
};

export type GetBalanceTransactionsResponse = {
  __typename?: 'GetBalanceTransactionsResponse';
  balanceTransactions: Array<Balance>;
  pageInfo: PageInfo;
};

export type GetDiscountsInput = {
  cursor?: InputMaybe<FindManyIdCursorInput>;
  eventId: Scalars['ID']['input'];
  organizationId: Scalars['ID']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type GetDiscountsResponse = {
  __typename?: 'GetDiscountsResponse';
  pageInfo: PageInfo;
  results: Array<Discount>;
};

export type GetEventFinancialSummaryInput = {
  eventId: Scalars['ID']['input'];
  organizationId: Scalars['ID']['input'];
};

export type GetEventHandlesResponse = {
  __typename?: 'GetEventHandlesResponse';
  handle: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type GetEventMembersInput = {
  cursor?: InputMaybe<FindManyIdCursorInput>;
  eventId: Scalars['ID']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type GetEventOccurrencesInput = {
  cursor?: InputMaybe<FindManyIdCursorInput>;
  eventId: Scalars['ID']['input'];
  fromDate?: InputMaybe<Scalars['DateTime']['input']>;
  status?: InputMaybe<Array<EventStatus>>;
  take?: InputMaybe<Scalars['Int']['input']>;
  toDate?: InputMaybe<Scalars['DateTime']['input']>;
};

export type GetEventOccurrencesResponse = {
  __typename?: 'GetEventOccurrencesResponse';
  pageInfo: PageInfo;
  results: Array<FlipEvent>;
};

export type GetEventOrderFinancialSummaryResponse = {
  __typename?: 'GetEventOrderFinancialSummaryResponse';
  canceledOrdersCount: Scalars['Int']['output'];
  completedOrdersCount: Scalars['Int']['output'];
  pendingBalance: Scalars['Int']['output'];
  pendingOrdersCount: Scalars['Int']['output'];
  pendingSettlementOrdersCount: Scalars['Int']['output'];
  profitAmount: Scalars['Int']['output'];
  totalAddOnAmount: Scalars['Int']['output'];
  totalFeeAmount: Scalars['Int']['output'];
  totalOrdersCount: Scalars['Int']['output'];
  totalRevenueAmount: Scalars['Int']['output'];
};

export type GetEventSeatMapResponse = {
  __typename?: 'GetEventSeatMapResponse';
  gaSectionInventory: Scalars['JSON']['output'];
  heldSeats: Array<Scalars['String']['output']>;
  reservingSeats: Array<Scalars['String']['output']>;
  seatMapUrl: Scalars['String']['output'];
  soldSeats: Array<Scalars['String']['output']>;
};

export type GetEventViewsChartGroupByChannelInput = {
  eventId: Scalars['String']['input'];
  from: Scalars['DateTime']['input'];
  to: Scalars['DateTime']['input'];
};

export type GetEventViewsChartGroupByChannelResponse = {
  __typename?: 'GetEventViewsChartGroupByChannelResponse';
  unit: Scalars['String']['output'];
  xs: Array<Scalars['String']['output']>;
  ys: Array<Ys>;
};

export type GetEventsByOrganizationInput = {
  cursor?: InputMaybe<FindManyIdCursorInput>;
  organizationId: Scalars['ID']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<GetEventsByOrganizationWhereInput>;
};

export type GetEventsByOrganizationResponse = {
  __typename?: 'GetEventsByOrganizationResponse';
  pageInfo: PageInfo;
  results: Array<FlipEvent>;
};

export type GetEventsByOrganizationWhereInput = {
  q?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Array<EventStatus>>;
};

export type GetEventsInput = {
  cursor?: InputMaybe<FindManyIdCursorInput>;
  sort?: InputMaybe<EventSortInput>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<EventWhereInput>;
};

export type GetEventsResponse = {
  __typename?: 'GetEventsResponse';
  pageInfo: PageInfo;
  results: Array<FlipEvent>;
};

export type GetExternalEventsInput = {
  cursor?: InputMaybe<FindManyIdCursorInput>;
  sort?: InputMaybe<ExternalEventSortInput>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ExternalEventWhereInput>;
};

export type GetImageUploadLinkResponse = {
  __typename?: 'GetImageUploadLinkResponse';
  fileName: Scalars['String']['output'];
  type: Scalars['String']['output'];
  uploadUrl: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type GetInvitesResponse = {
  __typename?: 'GetInvitesResponse';
  invites: Array<GetInvitesWithUser>;
  pageInfo: PageInfo;
};

export type GetInvitesWithUser = {
  __typename?: 'GetInvitesWithUser';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  entityId: Scalars['String']['output'];
  entityType: RoleEntityType;
  expiresAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  invitedUser?: Maybe<InvitedUser>;
  inviter?: Maybe<FlipUser>;
  inviterId: Scalars['String']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  roleName: RoleName;
  status: InviteStatus;
  updatedAt: Scalars['DateTime']['output'];
};

export type GetManyInvitesInput = {
  cursor?: InputMaybe<FindManyIdCursorInput>;
  eventId?: InputMaybe<Scalars['ID']['input']>;
  organizationId?: InputMaybe<Scalars['ID']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<FindManyInviteWhereInput>;
};

export type GetMembersResponse = {
  __typename?: 'GetMembersResponse';
  members: Array<Member>;
  pageInfo: PageInfo;
};

export type GetMyEventWalletInput = {
  eventId: Scalars['ID']['input'];
  organizationId: Scalars['ID']['input'];
};

export type GetMyEventsInput = {
  organizationId: Scalars['ID']['input'];
  pagination?: InputMaybe<PaginationInput>;
};

export type GetMyEventsResponse = {
  __typename?: 'GetMyEventsResponse';
  events: Array<FlipEvent>;
  pagination: PaginationResponse;
};

export type GetMyInvitesInput = {
  cursor?: InputMaybe<FindManyIdCursorInput>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type GetMyInvitesResponse = {
  __typename?: 'GetMyInvitesResponse';
  invites: Array<MyInvite>;
  pageInfo: PageInfo;
};

export type GetMyOrdersInput = {
  cursor?: InputMaybe<FindManyIdCursorInput>;
  take?: InputMaybe<Scalars['Int']['input']>;
  type: Scalars['String']['input'];
};

export type GetMyOrdersResponse = {
  __typename?: 'GetMyOrdersResponse';
  orders: Array<MyOrders>;
  pageInfo: PageInfo;
};

export type GetOrCreateOfflineSaleCodeInput = {
  eventId: Scalars['ID']['input'];
  organizationId: Scalars['ID']['input'];
};

export type GetOrCreateOfflineSaleCodeResponse = {
  __typename?: 'GetOrCreateOfflineSaleCodeResponse';
  offlineSaleCode: Scalars['ID']['output'];
};

export type GetOrderDetailsInput = {
  cartId?: InputMaybe<Scalars['String']['input']>;
  orderId?: InputMaybe<Scalars['String']['input']>;
};

export type GetOrderDetailsResponse = {
  __typename?: 'GetOrderDetailsResponse';
  cartDisplayId?: Maybe<Scalars['String']['output']>;
  cartId?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  discount?: Maybe<Scalars['Int']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  event?: Maybe<FlipEvent>;
  eventId: Scalars['ID']['output'];
  fee?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  orderDisplayId?: Maybe<Scalars['String']['output']>;
  orderId?: Maybe<Scalars['String']['output']>;
  payment?: Maybe<PaymentData>;
  status?: Maybe<Scalars['String']['output']>;
  subTotal?: Maybe<Scalars['Int']['output']>;
  tax?: Maybe<Scalars['Int']['output']>;
  taxRate?: Maybe<Scalars['Float']['output']>;
  ticketCount: Scalars['Int']['output'];
  ticketTiers?: Maybe<Array<PurchasedTicketTier>>;
  tickets?: Maybe<Array<FlipTicket>>;
  total: Scalars['Int']['output'];
  type: DeliveryMethod;
};

export type GetOrderRefundFeeInput = {
  eventId: Scalars['ID']['input'];
  orderId: Scalars['ID']['input'];
  refundReason: Ticketing_Refund_Reason;
};

export type GetOrderRefundFeeResponse = {
  __typename?: 'GetOrderRefundFeeResponse';
  customerFee: Scalars['Int']['output'];
  details: Array<OrderRefundFee>;
  orderId: Scalars['ID']['output'];
  orderTotal: Scalars['Int']['output'];
  organizerFee: Scalars['Int']['output'];
  refundAmount: Scalars['Int']['output'];
  refundReason: Ticketing_Refund_Reason;
};

export type GetOrdersInput = {
  cursor?: InputMaybe<FindManyIdCursorInput>;
  eventId: Scalars['ID']['input'];
  q?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type GetOrdersResponse = {
  __typename?: 'GetOrdersResponse';
  orders: Array<GetOrdersResponseOrder>;
  pageInfo: PageInfo;
};

export type GetOrdersResponseItem = {
  __typename?: 'GetOrdersResponseItem';
  id: Scalars['ID']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  name: Scalars['String']['output'];
  quantity: Scalars['Int']['output'];
};

export type GetOrdersResponseOrder = {
  __typename?: 'GetOrdersResponseOrder';
  createdAt: Scalars['DateTime']['output'];
  discountTotal: Scalars['Int']['output'];
  event: FlipEvent;
  feeTotal: Scalars['Int']['output'];
  isCheckInAllowed: Scalars['Boolean']['output'];
  isRefundable: Scalars['Boolean']['output'];
  items: Array<GetOrdersResponseItem>;
  orderDisplayId: Scalars['String']['output'];
  orderId: Scalars['String']['output'];
  paymentMethod: Scalars['String']['output'];
  receiverEmail: Scalars['String']['output'];
  receiverName?: Maybe<Scalars['String']['output']>;
  settlementStatus: Order_Settlement_Status_Enum;
  status: Scalars['String']['output'];
  subtotal: Scalars['Int']['output'];
  ticketType: Scalars['String']['output'];
  total: Scalars['Int']['output'];
  user: GetOrdersResponseUser;
};

export type GetOrdersResponseUser = {
  __typename?: 'GetOrdersResponseUser';
  displayName: Scalars['String']['output'];
  email: Scalars['String']['output'];
};

export type GetOrganizationCheckoutConfigsInput = {
  eventId: Scalars['ID']['input'];
  organizationId: Scalars['ID']['input'];
};

export type GetOrganizationCheckoutConfigsResponse = {
  __typename?: 'GetOrganizationCheckoutConfigsResponse';
  isShowCheckoutOptions: Scalars['Boolean']['output'];
  offlineSalesEnabled: Scalars['Boolean']['output'];
};

export type GetOrganizationImageUploadLinkInput = {
  fileName: Scalars['String']['input'];
  organizationId: Scalars['ID']['input'];
};

export type GetOrganizationMembersInput = {
  cursor?: InputMaybe<FindManyIdCursorInput>;
  organizationId: Scalars['ID']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type GetOrganizationsBySaInput = {
  cursor?: InputMaybe<FindManyIdCursorInput>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<OrganizationsBySaWhereInput>;
};

export type GetPayoutMethodsInput = {
  eventId: Scalars['ID']['input'];
  organizationId: Scalars['ID']['input'];
};

export type GetPayoutRequestsInput = {
  cursor?: InputMaybe<FindManyIdCursorInput>;
  settlementStatus?: InputMaybe<Array<Payout_Settlement_Status_Enum>>;
  status?: InputMaybe<Array<Payout_Status_Enum>>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type GetPayoutRequestsResponse = {
  __typename?: 'GetPayoutRequestsResponse';
  pageInfo: PageInfo;
  results: Array<Payout>;
};

export type GetPayoutSummaryInput = {
  eventId: Scalars['ID']['input'];
  organizationId: Scalars['ID']['input'];
};

export type GetPayoutSummaryResponse = {
  __typename?: 'GetPayoutSummaryResponse';
  pendingPayOutCount: Scalars['Int']['output'];
  pendingPayoutAmount: Scalars['Int']['output'];
  totalPaidOutAmount: Scalars['Int']['output'];
  totalPaidOutCount: Scalars['Int']['output'];
};

export type GetPayoutsInput = {
  cursor?: InputMaybe<FindManyIdCursorInput>;
  eventId: Scalars['ID']['input'];
  organizationId: Scalars['ID']['input'];
  settlementStatus?: InputMaybe<Payout_Settlement_Status_Enum>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type GetPayoutsResponse = {
  __typename?: 'GetPayoutsResponse';
  pageInfo: PageInfo;
  payouts: Array<MyPayout>;
};

export type GetRefundReasonsResponse = {
  __typename?: 'GetRefundReasonsResponse';
  description: Scalars['String']['output'];
  id: Ticketing_Refund_Reason;
  name: Scalars['String']['output'];
};

export type GetRefundRequestsInput = {
  cursor?: InputMaybe<FindManyIdCursorInput>;
  reason?: InputMaybe<Ticketing_Refund_Reason>;
  status?: InputMaybe<Array<Ticketing_Refund_Status>>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type GetRequestRefundsResponse = {
  __typename?: 'GetRequestRefundsResponse';
  pageInfo: PageInfo;
  results: Array<Refund>;
};

export type GetReservationSessionByEventInput = {
  eventHandle: Scalars['String']['input'];
};

export type GetReservationSessionByEventResponse = {
  __typename?: 'GetReservationSessionByEventResponse';
  bufferTimeMs: Scalars['Int']['output'];
  cartId: Scalars['String']['output'];
  expireAt: Scalars['DateTime']['output'];
};

export type GetReservationSessionInput = {
  cartId: Scalars['ID']['input'];
};

export type GetReservationSessionResponse = {
  __typename?: 'GetReservationSessionResponse';
  bufferTimeMs: Scalars['Int']['output'];
  cartId: Scalars['String']['output'];
  expireAt: Scalars['DateTime']['output'];
  isCartCompleted: Scalars['Boolean']['output'];
};

export type GetTicketDetailsInput = {
  ticketIds: Array<Scalars['ID']['input']>;
};

export type GetTicketDetailsResponse = {
  __typename?: 'GetTicketDetailsResponse';
  checkInNotes?: Maybe<Scalars['String']['output']>;
  checkedInAt?: Maybe<Scalars['DateTime']['output']>;
  checkedInBy?: Maybe<Scalars['String']['output']>;
  checkedInByUser?: Maybe<FlipUser>;
  createdAt: Scalars['DateTime']['output'];
  event: FlipEvent;
  eventId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  owner: FlipUser;
  ownerId: Scalars['String']['output'];
  sectionName?: Maybe<Scalars['String']['output']>;
  status: TicketStatus;
  ticketingOrderDisplayId?: Maybe<Scalars['String']['output']>;
  ticketingOrderId: Scalars['String']['output'];
  ticketingVariantId: Scalars['String']['output'];
  tier: FlipTicketTier;
  tierId: Scalars['String']['output'];
  type: TicketType;
  updatedAt: Scalars['DateTime']['output'];
  validationCode: Scalars['String']['output'];
};

export type GetTicketHistoryInput = {
  pagination?: InputMaybe<PaginationInput>;
};

export type GetTicketHistoryResponse = {
  __typename?: 'GetTicketHistoryResponse';
  pagination: PaginationResponse;
  results: Array<FlipEvent>;
};

export type GetTicketOwnersInput = {
  eventId: Scalars['ID']['input'];
  status?: InputMaybe<TicketStatus>;
  ticketTierId?: InputMaybe<Scalars['String']['input']>;
};

export type GetTicketSalesByTierInput = {
  eventId: Scalars['ID']['input'];
};

export type GetTicketSalesByTierResponse = {
  __typename?: 'GetTicketSalesByTierResponse';
  tiers: Array<FlipTicketTier>;
  totalInitialInventory: Scalars['Int']['output'];
  totalRevenue: Scalars['Int']['output'];
  totalSold: Scalars['Int']['output'];
};

export type GetTicketSalesByTimeInput = {
  eventId: Scalars['ID']['input'];
  from: Scalars['DateTime']['input'];
  to: Scalars['DateTime']['input'];
  unit: Scalars['String']['input'];
};

export type GetTicketSalesByTimeResponse = {
  __typename?: 'GetTicketSalesByTimeResponse';
  unit: Scalars['String']['output'];
  x: Array<Scalars['DateTime']['output']>;
  y: Array<Scalars['BigInt']['output']>;
};

export type GetTicketTierInput = {
  eventId: Scalars['ID']['input'];
  loadToCache?: InputMaybe<Scalars['Boolean']['input']>;
};

export type GetTicketTierResponse = {
  __typename?: 'GetTicketTierResponse';
  FlipTicket?: Maybe<Array<FlipTicket>>;
  _count: FlipTicketTierCount;
  createdAt: Scalars['DateTime']['output'];
  deliveryMethods?: Maybe<Array<DeliveryMethod>>;
  description?: Maybe<Scalars['String']['output']>;
  event: FlipEvent;
  eventId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  initialInventory: Scalars['Int']['output'];
  isVisible: Scalars['Boolean']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  name: Scalars['String']['output'];
  price: Scalars['Int']['output'];
  reservingQuantity: Scalars['Int']['output'];
  saleEndAt: Scalars['DateTime']['output'];
  saleStartAt: Scalars['DateTime']['output'];
  totalCheckedIn: Scalars['Int']['output'];
  totalHeld: Scalars['Int']['output'];
  totalSold: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type GetTicketsByOrderIdInput = {
  eventId: Scalars['ID']['input'];
  orderId: Scalars['ID']['input'];
};

export type GetTotalEventDetailsViewInput = {
  eventId: Scalars['String']['input'];
};

export type GetTotalEventDetailsViewResponse = {
  __typename?: 'GetTotalEventDetailsViewResponse';
  last24HourCount: Scalars['Float']['output'];
  lastMonthCount: Scalars['Float']['output'];
  sameDayLastWeekCount: Scalars['Float']['output'];
  thisMonthCount: Scalars['Float']['output'];
};

export type GetTotalEventStatInput = {
  eventId: Scalars['String']['input'];
};

export type GetTotalEventStatResponse = {
  __typename?: 'GetTotalEventStatResponse';
  channels: Array<ChannelData>;
  totalViewCount: Scalars['Int']['output'];
};

export type GetTotalOrderByLocationInput = {
  eventId: Scalars['String']['input'];
};

export type GetTotalOrderByLocationResponse = {
  __typename?: 'GetTotalOrderByLocationResponse';
  cities: Array<Scalars['String']['output']>;
  totalByCity: Array<TotalByCity>;
  totalOfAllCities: Scalars['Float']['output'];
};

export type GetUserImageUploadLinkInput = {
  fileName: Scalars['String']['input'];
};

export type Gift_CardCount = {
  __typename?: 'Gift_cardCount';
  cart_gift_cards: Scalars['Int']['output'];
  gift_card_transaction: Scalars['Int']['output'];
  order_gift_cards: Scalars['Int']['output'];
};

export type Gift_CardListRelationFilter = {
  every?: InputMaybe<Gift_CardWhereInput>;
  none?: InputMaybe<Gift_CardWhereInput>;
  some?: InputMaybe<Gift_CardWhereInput>;
};

export type Gift_CardRelationFilter = {
  is?: InputMaybe<Gift_CardWhereInput>;
  isNot?: InputMaybe<Gift_CardWhereInput>;
};

export type Gift_Card_TransactionListRelationFilter = {
  every?: InputMaybe<Gift_Card_TransactionWhereInput>;
  none?: InputMaybe<Gift_Card_TransactionWhereInput>;
  some?: InputMaybe<Gift_Card_TransactionWhereInput>;
};

export type ImageCount = {
  __typename?: 'ImageCount';
  product_images: Scalars['Int']['output'];
};

export type ImageRelationFilter = {
  is?: InputMaybe<ImageWhereInput>;
  isNot?: InputMaybe<ImageWhereInput>;
};

export type IntFilter = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<NestedIntFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type IntNullableFilter = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<NestedIntNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type InventoryAndHeldInput = {
  id: Scalars['ID']['input'];
  initialInventory?: InputMaybe<Scalars['Float']['input']>;
  totalHeld: Scalars['Float']['input'];
};

export enum InviteStatus {
  Accepted = 'ACCEPTED',
  Active = 'ACTIVE',
  Canceled = 'CANCELED',
  Declined = 'DECLINED'
}

export type InviteUserToEventWithRoleInput = {
  email: Scalars['String']['input'];
  eventId: Scalars['String']['input'];
  roleName: RoleName;
  validDurationMs?: InputMaybe<Scalars['Int']['input']>;
};

export type InviteUserToEventWithRoleResponse = {
  __typename?: 'InviteUserToEventWithRoleResponse';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  entityId: Scalars['String']['output'];
  entityType: RoleEntityType;
  expiresAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  inviter?: Maybe<FlipUser>;
  inviterId: Scalars['String']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  roleName: RoleName;
  status: InviteStatus;
  updatedAt: Scalars['DateTime']['output'];
};

export type InviteUserToOrganizationWithRoleInput = {
  email: Scalars['String']['input'];
  organizationId: Scalars['String']['input'];
  roleName: RoleName;
  validDurationMs?: InputMaybe<Scalars['Int']['input']>;
};

export type InvitedUser = {
  __typename?: 'InvitedUser';
  displayName: Scalars['String']['output'];
  firstName?: Maybe<Scalars['String']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  profileImageURL?: Maybe<Scalars['String']['output']>;
};

export type JsonFilter = {
  array_contains?: InputMaybe<Scalars['JSON']['input']>;
  array_ends_with?: InputMaybe<Scalars['JSON']['input']>;
  array_starts_with?: InputMaybe<Scalars['JSON']['input']>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  gt?: InputMaybe<Scalars['JSON']['input']>;
  gte?: InputMaybe<Scalars['JSON']['input']>;
  lt?: InputMaybe<Scalars['JSON']['input']>;
  lte?: InputMaybe<Scalars['JSON']['input']>;
  not?: InputMaybe<Scalars['JSON']['input']>;
  path?: InputMaybe<Array<Scalars['String']['input']>>;
  string_contains?: InputMaybe<Scalars['String']['input']>;
  string_ends_with?: InputMaybe<Scalars['String']['input']>;
  string_starts_with?: InputMaybe<Scalars['String']['input']>;
};

export type JsonNullableFilter = {
  array_contains?: InputMaybe<Scalars['JSON']['input']>;
  array_ends_with?: InputMaybe<Scalars['JSON']['input']>;
  array_starts_with?: InputMaybe<Scalars['JSON']['input']>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  gt?: InputMaybe<Scalars['JSON']['input']>;
  gte?: InputMaybe<Scalars['JSON']['input']>;
  lt?: InputMaybe<Scalars['JSON']['input']>;
  lte?: InputMaybe<Scalars['JSON']['input']>;
  not?: InputMaybe<Scalars['JSON']['input']>;
  path?: InputMaybe<Array<Scalars['String']['input']>>;
  string_contains?: InputMaybe<Scalars['String']['input']>;
  string_ends_with?: InputMaybe<Scalars['String']['input']>;
  string_starts_with?: InputMaybe<Scalars['String']['input']>;
};

export type Line_ItemCount = {
  __typename?: 'Line_itemCount';
  claim_item: Scalars['Int']['output'];
  fulfillment_item: Scalars['Int']['output'];
  line_item_adjustment: Scalars['Int']['output'];
  line_item_tax_line: Scalars['Int']['output'];
  order_item_change_order_item_change_original_line_item_idToline_item: Scalars['Int']['output'];
  other_line_item: Scalars['Int']['output'];
  return_item: Scalars['Int']['output'];
};

export type Line_ItemListRelationFilter = {
  every?: InputMaybe<Line_ItemWhereInput>;
  none?: InputMaybe<Line_ItemWhereInput>;
  some?: InputMaybe<Line_ItemWhereInput>;
};

export type Line_ItemNullableRelationFilter = {
  is?: InputMaybe<Line_ItemWhereInput>;
  isNot?: InputMaybe<Line_ItemWhereInput>;
};

export type Line_ItemRelationFilter = {
  is?: InputMaybe<Line_ItemWhereInput>;
  isNot?: InputMaybe<Line_ItemWhereInput>;
};

export type Line_Item_AdjustmentListRelationFilter = {
  every?: InputMaybe<Line_Item_AdjustmentWhereInput>;
  none?: InputMaybe<Line_Item_AdjustmentWhereInput>;
  some?: InputMaybe<Line_Item_AdjustmentWhereInput>;
};

export type Line_Item_Tax_LineListRelationFilter = {
  every?: InputMaybe<Line_Item_Tax_LineWhereInput>;
  none?: InputMaybe<Line_Item_Tax_LineWhereInput>;
  some?: InputMaybe<Line_Item_Tax_LineWhereInput>;
};

export type MarkUserEmailAsVerifiedInput = {
  email: Scalars['String']['input'];
};

export enum MediaType {
  Image = 'IMAGE',
  Video = 'VIDEO'
}

export type Member = {
  __typename?: 'Member';
  createdAt: Scalars['DateTime']['output'];
  entityId: Scalars['String']['output'];
  entityType: RoleEntityType;
  id: Scalars['ID']['output'];
  isSuperAdmin: Scalars['Boolean']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  roleName: RoleName;
  updatedAt: Scalars['DateTime']['output'];
  user: MemberInfo;
  userId: Scalars['String']['output'];
};

export type MemberInfo = {
  __typename?: 'MemberInfo';
  displayName: Scalars['String']['output'];
  email: Scalars['String']['output'];
  firstName?: Maybe<Scalars['String']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  profileImageURL?: Maybe<Scalars['String']['output']>;
};

export type Money_AmountListRelationFilter = {
  every?: InputMaybe<Money_AmountWhereInput>;
  none?: InputMaybe<Money_AmountWhereInput>;
  some?: InputMaybe<Money_AmountWhereInput>;
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptInvite: FlipInvite;
  acceptPayoutRequest: Payout;
  acceptRefundRequest: Refund;
  cancelEventInvite: FlipInvite;
  cancelOrganizationInvite: FlipInvite;
  cancelPayoutRequest: Payout;
  checkInEventTicket: TicketCheckInResult;
  checkInEventTickets: Array<TicketCheckInResult>;
  createAddOnService: Add_On_Service;
  /** Create an artist */
  createArtist: FlipArtist;
  createArtistCollection: FlipCollection;
  createDiscount: Discount;
  /** Create a new event */
  createEvent: FlipEvent;
  createEventPayoutRequest: Payout;
  /** Create a new event */
  createExternalEvent: FlipExternalEvent;
  createPayoutMethod: Payout_Method;
  /** Create a sub event */
  createSubEvent: FlipEvent;
  createTicketTier: FlipTicketTier;
  declineInvite: FlipInvite;
  deleteDiscount: Discount;
  deleteEventMember: FlipUserToEntity;
  deleteMyAccount: Scalars['String']['output'];
  deleteMyCard: Card;
  deleteOrganizationMember: FlipUserToEntity;
  deleteReservationSession: Scalars['String']['output'];
  deleteTicketTier: FlipTicketTier;
  /** Device registration for notifications */
  deviceRegister: FlipUserDevice;
  /** Device registration for notifications */
  deviceUnregister: FlipUserDevice;
  finalizeOrdersByEventId: FinalizeOrdersResponse;
  finalizeOrdersById: FinalizeOrdersResponse;
  inviteUserToEventWithRole: InviteUserToEventWithRoleResponse;
  inviteUserToOrganizationWithRole: InviteUserToEventWithRoleResponse;
  /** Mark Read All Notification(s) */
  markReadAllNotification: NotificationFeed;
  /** Mark Read Notification(s) */
  markReadNotification: NotificationFeed;
  markUserEmailAsVerified: Scalars['String']['output'];
  /** Publish events by super admin */
  publishEvents: Array<Scalars['String']['output']>;
  requestOrderReport: RequestReportResponse;
  requestOrganizationPayoutReport: RequestReportResponse;
  requestPayoutReport: RequestReportResponse;
  requestRefund: Order;
  resendInvite: InviteUserToEventWithRoleResponse;
  saveCard: Card;
  sendPasswordlessSignInEmail: Scalars['String']['output'];
  sendSignUpVerificationEmail: Scalars['String']['output'];
  sendVerifyAndChangeEmailEmail: Scalars['String']['output'];
  signUpGetStream?: Maybe<FlipUser>;
  superAdminCreateOrganization: FlipOrganization;
  updateArtist: FlipArtist;
  updateCartMetadata: Cart;
  updateDiscount: Discount;
  updateEventHoldSeatsRules: FlipSeatMap;
  updateEventMemberRole: UpdateMemberResponse;
  updateOrganizationMemberRole: UpdateMemberResponse;
  updatePersonalInfo: FlipUser;
  /** Update event review status */
  updateReviewStatus: FlipExternalEvent;
  updateTicketTier: FlipTicketTier;
  updateTicketTierInventoryAndHold: Array<FlipTicketTier>;
  upsertEventSeatMap: FlipSeatMap;
  upsertOrganizationCheckoutConfigs: FlipCheckoutConfig;
};


export type MutationAcceptInviteArgs = {
  data: AcceptInviteInput;
};


export type MutationAcceptPayoutRequestArgs = {
  input: AcceptPayoutRequestInput;
};


export type MutationAcceptRefundRequestArgs = {
  input: AcceptRefundRequestInput;
};


export type MutationCancelEventInviteArgs = {
  data: CancelEventInviteInput;
};


export type MutationCancelOrganizationInviteArgs = {
  data: CancelOrganizationInviteInput;
};


export type MutationCancelPayoutRequestArgs = {
  input: CancelPayoutRequestInput;
};


export type MutationCheckInEventTicketArgs = {
  data: CheckInEventTicketInput;
};


export type MutationCheckInEventTicketsArgs = {
  data: CheckInEventTicketsInput;
};


export type MutationCreateAddOnServiceArgs = {
  input: CreateAddOnServiceInput;
};


export type MutationCreateArtistArgs = {
  input: ArtistCreateInput;
};


export type MutationCreateArtistCollectionArgs = {
  input: CreateCollectionInput;
};


export type MutationCreateDiscountArgs = {
  input: CreateDiscountInput;
};


export type MutationCreateEventArgs = {
  data: EventCreateInput;
};


export type MutationCreateEventPayoutRequestArgs = {
  input: CreateEventPayoutRequestInput;
};


export type MutationCreateExternalEventArgs = {
  data: ExternalEventCreateInput;
};


export type MutationCreatePayoutMethodArgs = {
  input: CreatePayoutMethodInput;
};


export type MutationCreateSubEventArgs = {
  input: CreateSubEventInput;
};


export type MutationCreateTicketTierArgs = {
  data: CreateTicketTierInput;
};


export type MutationDeclineInviteArgs = {
  data: DeclineInviteInput;
};


export type MutationDeleteDiscountArgs = {
  input: DeleteDiscountInput;
};


export type MutationDeleteEventMemberArgs = {
  data: DeleteEventMemberRoleInput;
};


export type MutationDeleteMyAccountArgs = {
  input: DeleteMyAccountInput;
};


export type MutationDeleteMyCardArgs = {
  input: DeleteMyCardInput;
};


export type MutationDeleteOrganizationMemberArgs = {
  data: DeleteOrganizationMemberRoleInput;
};


export type MutationDeleteReservationSessionArgs = {
  input: DeleteReservationSessionInput;
};


export type MutationDeleteTicketTierArgs = {
  data: DeleteTicketTierInput;
};


export type MutationDeviceRegisterArgs = {
  data: DeviceRegisterInput;
};


export type MutationDeviceUnregisterArgs = {
  data: DeviceUnRegisterInput;
};


export type MutationFinalizeOrdersByEventIdArgs = {
  input: FinalizeOrdersByEventIdInput;
};


export type MutationFinalizeOrdersByIdArgs = {
  input: FinalizeOrdersByIdInput;
};


export type MutationInviteUserToEventWithRoleArgs = {
  data: InviteUserToEventWithRoleInput;
};


export type MutationInviteUserToOrganizationWithRoleArgs = {
  data: InviteUserToOrganizationWithRoleInput;
};


export type MutationMarkReadNotificationArgs = {
  notificationIds: Array<Scalars['String']['input']>;
};


export type MutationMarkUserEmailAsVerifiedArgs = {
  input: MarkUserEmailAsVerifiedInput;
};


export type MutationPublishEventsArgs = {
  input: PublishEventsInput;
};


export type MutationRequestOrderReportArgs = {
  input: RequestOrderReportInput;
};


export type MutationRequestOrganizationPayoutReportArgs = {
  input: RequestOrganizationPayoutReportInput;
};


export type MutationRequestPayoutReportArgs = {
  input: RequestPayoutReportInput;
};


export type MutationRequestRefundArgs = {
  input: RequestRefundInput;
};


export type MutationResendInviteArgs = {
  data: ResendInviteInput;
};


export type MutationSaveCardArgs = {
  input: SaveCardInput;
};


export type MutationSendPasswordlessSignInEmailArgs = {
  data: SendPasswordlessSignInEmailInput;
};


export type MutationSendSignUpVerificationEmailArgs = {
  data: SendSignUpVerificationEmailInput;
};


export type MutationSendVerifyAndChangeEmailEmailArgs = {
  input: SendVerifyAndChangeEmailEmailInput;
};


export type MutationSuperAdminCreateOrganizationArgs = {
  data: SaCreateOrganizationInput;
};


export type MutationUpdateArtistArgs = {
  input: ArtistUpdateInput;
};


export type MutationUpdateCartMetadataArgs = {
  input: UpdateCartMetadataInput;
};


export type MutationUpdateDiscountArgs = {
  input: UpdateDiscountInput;
};


export type MutationUpdateEventHoldSeatsRulesArgs = {
  input: UpdateEventHoldSeatsRulesInput;
};


export type MutationUpdateEventMemberRoleArgs = {
  data: UpdateEventMemberRoleInput;
};


export type MutationUpdateOrganizationMemberRoleArgs = {
  data: UpdateOrganizationMemberRoleInput;
};


export type MutationUpdatePersonalInfoArgs = {
  data: UpdatePersonalInfoInput;
};


export type MutationUpdateReviewStatusArgs = {
  data: ExternalEventUpdateInput;
};


export type MutationUpdateTicketTierArgs = {
  data: UpdateTicketTierInput;
};


export type MutationUpdateTicketTierInventoryAndHoldArgs = {
  input: UpdateTicketTierInventoryAndHeldInput;
};


export type MutationUpsertEventSeatMapArgs = {
  input: UpsertEventSeatMapInput;
};


export type MutationUpsertOrganizationCheckoutConfigsArgs = {
  input: UpsertOrganizationCheckoutConfigsInput;
};

export type MyInvite = {
  __typename?: 'MyInvite';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  entityId: Scalars['String']['output'];
  entityType: RoleEntityType;
  event?: Maybe<MyInvitesEventInfo>;
  expiresAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  inviter?: Maybe<FlipUser>;
  inviterId: Scalars['String']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  organization?: Maybe<MyInvitesOrganizationInfo>;
  roleName: RoleName;
  status: InviteStatus;
  updatedAt: Scalars['DateTime']['output'];
  validationCode: Scalars['String']['output'];
};

export type MyInvitesEventInfo = {
  __typename?: 'MyInvitesEventInfo';
  _count?: Maybe<FlipEventCount>;
  address?: Maybe<FlipAddress>;
  addressId?: Maybe<Scalars['String']['output']>;
  artists?: Maybe<Array<FlipArtist>>;
  category?: Maybe<FlipCategory>;
  categoryId?: Maybe<Scalars['String']['output']>;
  checkoutConfigs?: Maybe<Array<FlipCheckoutConfig>>;
  childEvents?: Maybe<Array<FlipEvent>>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  emailTemplateConfigs?: Maybe<Array<FlipEmailTemplateConfig>>;
  endAt?: Maybe<Scalars['DateTime']['output']>;
  handle?: Maybe<Scalars['String']['output']>;
  hasSeatMap?: Maybe<Scalars['Boolean']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  isGeneralAdmission?: Maybe<Scalars['Boolean']['output']>;
  isMultipleDay?: Maybe<Scalars['Boolean']['output']>;
  isParentEvent?: Maybe<Scalars['Boolean']['output']>;
  maxTicketPerOrder?: Maybe<Scalars['Int']['output']>;
  media?: Maybe<Array<FlipMedia>>;
  mediaCollection?: Maybe<Scalars['JSON']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  offsale?: Maybe<Scalars['DateTime']['output']>;
  onsale?: Maybe<Scalars['DateTime']['output']>;
  organization?: Maybe<FlipOrganization>;
  organizationId?: Maybe<Scalars['String']['output']>;
  parentEvent?: Maybe<FlipEvent>;
  parentEventId?: Maybe<Scalars['String']['output']>;
  policy?: Maybe<Scalars['String']['output']>;
  pricingConfigs?: Maybe<Array<FlipPricingConfig>>;
  reactions?: Maybe<Array<FlipReaction>>;
  seatMap?: Maybe<FlipSeatMap>;
  startAt?: Maybe<Scalars['DateTime']['output']>;
  status?: Maybe<EventStatus>;
  ticketTemplateConfigs?: Maybe<Array<FlipTicketTemplateConfig>>;
  ticketTiers?: Maybe<Array<FlipTicketTier>>;
  tickets?: Maybe<Array<FlipTicket>>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  venue?: Maybe<FlipVenue>;
  venueId?: Maybe<Scalars['String']['output']>;
};

export type MyInvitesOrganizationInfo = {
  __typename?: 'MyInvitesOrganizationInfo';
  _count?: Maybe<FlipOrganizationCount>;
  address?: Maybe<FlipAddress>;
  addressId?: Maybe<Scalars['String']['output']>;
  checkoutConfigs?: Maybe<Array<FlipCheckoutConfig>>;
  contactEmail?: Maybe<Scalars['String']['output']>;
  contactPhone?: Maybe<Scalars['String']['output']>;
  coverURL?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  emailTemplateConfigs?: Maybe<Array<FlipEmailTemplateConfig>>;
  events?: Maybe<Array<FlipEvent>>;
  externalEvents?: Maybe<Array<FlipExternalEvent>>;
  facebookLikes?: Maybe<Scalars['String']['output']>;
  facebookURL?: Maybe<Scalars['String']['output']>;
  handle?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  instagramURL?: Maybe<Scalars['String']['output']>;
  logoURL?: Maybe<Scalars['String']['output']>;
  metadata?: Maybe<Scalars['JSON']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  owner?: Maybe<FlipUser>;
  ownerId?: Maybe<Scalars['String']['output']>;
  pricingConfigs?: Maybe<Array<FlipPricingConfig>>;
  tags?: Maybe<Array<FlipTag>>;
  ticketTemplateConfigs?: Maybe<Array<FlipTicketTemplateConfig>>;
  tiktokURL?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  websiteURL?: Maybe<Scalars['String']['output']>;
};

export type MyOrders = {
  __typename?: 'MyOrders';
  cartDisplayId?: Maybe<Scalars['String']['output']>;
  cartId?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  event?: Maybe<FlipEvent>;
  eventId: Scalars['ID']['output'];
  orderDisplayId?: Maybe<Scalars['String']['output']>;
  orderId?: Maybe<Scalars['String']['output']>;
  payment?: Maybe<PaymentData>;
  ticketCount: Scalars['Int']['output'];
  ticketTiers?: Maybe<Array<PurchasedTicketTier>>;
  total: Scalars['Int']['output'];
  type: DeliveryMethod;
};

export type MyPayout = {
  __typename?: 'MyPayout';
  amount: Scalars['Int']['output'];
  created_at: Scalars['DateTime']['output'];
  event_id: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  organization_id: Scalars['String']['output'];
  paid_at?: Maybe<Scalars['DateTime']['output']>;
  paid_by?: Maybe<Scalars['String']['output']>;
  paid_by_user?: Maybe<User>;
  payout_method: Payout_Method;
  payout_method_id: Scalars['String']['output'];
  requested_by: Scalars['String']['output'];
  requested_by_user: User;
  settlement_status: Payout_Settlement_Status_Enum;
  status: Payout_Status_Enum;
  updated_at: Scalars['DateTime']['output'];
};

export type NestedBigIntFilter = {
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<NestedBigIntFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type NestedBoolFilter = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  not?: InputMaybe<NestedBoolFilter>;
};

export type NestedBoolNullableFilter = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  not?: InputMaybe<NestedBoolNullableFilter>;
};

export type NestedDateTimeFilter = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<NestedDateTimeFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type NestedDateTimeNullableFilter = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<NestedDateTimeNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type NestedDecimalFilter = {
  equals?: InputMaybe<Scalars['Decimal']['input']>;
  gt?: InputMaybe<Scalars['Decimal']['input']>;
  gte?: InputMaybe<Scalars['Decimal']['input']>;
  in?: InputMaybe<Array<Scalars['Decimal']['input']>>;
  lt?: InputMaybe<Scalars['Decimal']['input']>;
  lte?: InputMaybe<Scalars['Decimal']['input']>;
  not?: InputMaybe<NestedDecimalFilter>;
  notIn?: InputMaybe<Array<Scalars['Decimal']['input']>>;
};

export type NestedEnumBusinessLevelConfigFilter = {
  equals?: InputMaybe<BusinessLevelConfig>;
  in?: InputMaybe<Array<BusinessLevelConfig>>;
  not?: InputMaybe<NestedEnumBusinessLevelConfigFilter>;
  notIn?: InputMaybe<Array<BusinessLevelConfig>>;
};

export type NestedEnumCartRefundStatusNullableFilter = {
  equals?: InputMaybe<CartRefundStatus>;
  in?: InputMaybe<Array<CartRefundStatus>>;
  not?: InputMaybe<NestedEnumCartRefundStatusNullableFilter>;
  notIn?: InputMaybe<Array<CartRefundStatus>>;
};

export type NestedEnumCategoryLevelFilter = {
  equals?: InputMaybe<CategoryLevel>;
  in?: InputMaybe<Array<CategoryLevel>>;
  not?: InputMaybe<NestedEnumCategoryLevelFilter>;
  notIn?: InputMaybe<Array<CategoryLevel>>;
};

export type NestedEnumEmailTemplateTypeFilter = {
  equals?: InputMaybe<EmailTemplateType>;
  in?: InputMaybe<Array<EmailTemplateType>>;
  not?: InputMaybe<NestedEnumEmailTemplateTypeFilter>;
  notIn?: InputMaybe<Array<EmailTemplateType>>;
};

export type NestedEnumEventStatusFilter = {
  equals?: InputMaybe<EventStatus>;
  in?: InputMaybe<Array<EventStatus>>;
  not?: InputMaybe<NestedEnumEventStatusFilter>;
  notIn?: InputMaybe<Array<EventStatus>>;
};

export type NestedEnumGenderNullableFilter = {
  equals?: InputMaybe<Gender>;
  in?: InputMaybe<Array<Gender>>;
  not?: InputMaybe<NestedEnumGenderNullableFilter>;
  notIn?: InputMaybe<Array<Gender>>;
};

export type NestedEnumInviteStatusFilter = {
  equals?: InputMaybe<InviteStatus>;
  in?: InputMaybe<Array<InviteStatus>>;
  not?: InputMaybe<NestedEnumInviteStatusFilter>;
  notIn?: InputMaybe<Array<InviteStatus>>;
};

export type NestedEnumMediaTypeFilter = {
  equals?: InputMaybe<MediaType>;
  in?: InputMaybe<Array<MediaType>>;
  not?: InputMaybe<NestedEnumMediaTypeFilter>;
  notIn?: InputMaybe<Array<MediaType>>;
};

export type NestedEnumPayment_Collection_Status_EnumFilter = {
  equals?: InputMaybe<Payment_Collection_Status_Enum>;
  in?: InputMaybe<Array<Payment_Collection_Status_Enum>>;
  not?: InputMaybe<NestedEnumPayment_Collection_Status_EnumFilter>;
  notIn?: InputMaybe<Array<Payment_Collection_Status_Enum>>;
};

export type NestedEnumPayment_Collection_Type_EnumFilter = {
  equals?: InputMaybe<Payment_Collection_Type_Enum>;
  in?: InputMaybe<Array<Payment_Collection_Type_Enum>>;
  not?: InputMaybe<NestedEnumPayment_Collection_Type_EnumFilter>;
  notIn?: InputMaybe<Array<Payment_Collection_Type_Enum>>;
};

export type NestedEnumReactionTypeFilter = {
  equals?: InputMaybe<ReactionType>;
  in?: InputMaybe<Array<ReactionType>>;
  not?: InputMaybe<NestedEnumReactionTypeFilter>;
  notIn?: InputMaybe<Array<ReactionType>>;
};

export type NestedEnumReviewStatusFilter = {
  equals?: InputMaybe<ReviewStatus>;
  in?: InputMaybe<Array<ReviewStatus>>;
  not?: InputMaybe<NestedEnumReviewStatusFilter>;
  notIn?: InputMaybe<Array<ReviewStatus>>;
};

export type NestedEnumReviewStatusTypeFilter = {
  equals?: InputMaybe<ReviewStatusType>;
  in?: InputMaybe<Array<ReviewStatusType>>;
  not?: InputMaybe<NestedEnumReviewStatusTypeFilter>;
  notIn?: InputMaybe<Array<ReviewStatusType>>;
};

export type NestedEnumRoleEntityTypeFilter = {
  equals?: InputMaybe<RoleEntityType>;
  in?: InputMaybe<Array<RoleEntityType>>;
  not?: InputMaybe<NestedEnumRoleEntityTypeFilter>;
  notIn?: InputMaybe<Array<RoleEntityType>>;
};

export type NestedEnumRoleNameFilter = {
  equals?: InputMaybe<RoleName>;
  in?: InputMaybe<Array<RoleName>>;
  not?: InputMaybe<NestedEnumRoleNameFilter>;
  notIn?: InputMaybe<Array<RoleName>>;
};

export type NestedEnumTemplateEngineFilter = {
  equals?: InputMaybe<TemplateEngine>;
  in?: InputMaybe<Array<TemplateEngine>>;
  not?: InputMaybe<NestedEnumTemplateEngineFilter>;
  notIn?: InputMaybe<Array<TemplateEngine>>;
};

export type NestedEnumTicketStatusFilter = {
  equals?: InputMaybe<TicketStatus>;
  in?: InputMaybe<Array<TicketStatus>>;
  not?: InputMaybe<NestedEnumTicketStatusFilter>;
  notIn?: InputMaybe<Array<TicketStatus>>;
};

export type NestedEnumTicketTypeFilter = {
  equals?: InputMaybe<TicketType>;
  in?: InputMaybe<Array<TicketType>>;
  not?: InputMaybe<NestedEnumTicketTypeFilter>;
  notIn?: InputMaybe<Array<TicketType>>;
};

export type NestedEnumadd_On_Service_Money_Flow_EnumFilter = {
  equals?: InputMaybe<Add_On_Service_Money_Flow_Enum>;
  in?: InputMaybe<Array<Add_On_Service_Money_Flow_Enum>>;
  not?: InputMaybe<NestedEnumadd_On_Service_Money_Flow_EnumFilter>;
  notIn?: InputMaybe<Array<Add_On_Service_Money_Flow_Enum>>;
};

export type NestedEnumcart_Type_EnumFilter = {
  equals?: InputMaybe<Cart_Type_Enum>;
  in?: InputMaybe<Array<Cart_Type_Enum>>;
  not?: InputMaybe<NestedEnumcart_Type_EnumFilter>;
  notIn?: InputMaybe<Array<Cart_Type_Enum>>;
};

export type NestedEnumclaim_Item_Reason_EnumFilter = {
  equals?: InputMaybe<Claim_Item_Reason_Enum>;
  in?: InputMaybe<Array<Claim_Item_Reason_Enum>>;
  not?: InputMaybe<NestedEnumclaim_Item_Reason_EnumFilter>;
  notIn?: InputMaybe<Array<Claim_Item_Reason_Enum>>;
};

export type NestedEnumclaim_Order_Fulfillment_Status_EnumFilter = {
  equals?: InputMaybe<Claim_Order_Fulfillment_Status_Enum>;
  in?: InputMaybe<Array<Claim_Order_Fulfillment_Status_Enum>>;
  not?: InputMaybe<NestedEnumclaim_Order_Fulfillment_Status_EnumFilter>;
  notIn?: InputMaybe<Array<Claim_Order_Fulfillment_Status_Enum>>;
};

export type NestedEnumclaim_Order_Payment_Status_EnumFilter = {
  equals?: InputMaybe<Claim_Order_Payment_Status_Enum>;
  in?: InputMaybe<Array<Claim_Order_Payment_Status_Enum>>;
  not?: InputMaybe<NestedEnumclaim_Order_Payment_Status_EnumFilter>;
  notIn?: InputMaybe<Array<Claim_Order_Payment_Status_Enum>>;
};

export type NestedEnumclaim_Order_Type_EnumFilter = {
  equals?: InputMaybe<Claim_Order_Type_Enum>;
  in?: InputMaybe<Array<Claim_Order_Type_Enum>>;
  not?: InputMaybe<NestedEnumclaim_Order_Type_EnumFilter>;
  notIn?: InputMaybe<Array<Claim_Order_Type_Enum>>;
};

export type NestedEnumdiscount_Condition_Operator_EnumFilter = {
  equals?: InputMaybe<Discount_Condition_Operator_Enum>;
  in?: InputMaybe<Array<Discount_Condition_Operator_Enum>>;
  not?: InputMaybe<NestedEnumdiscount_Condition_Operator_EnumFilter>;
  notIn?: InputMaybe<Array<Discount_Condition_Operator_Enum>>;
};

export type NestedEnumdiscount_Condition_Type_EnumFilter = {
  equals?: InputMaybe<Discount_Condition_Type_Enum>;
  in?: InputMaybe<Array<Discount_Condition_Type_Enum>>;
  not?: InputMaybe<NestedEnumdiscount_Condition_Type_EnumFilter>;
  notIn?: InputMaybe<Array<Discount_Condition_Type_Enum>>;
};

export type NestedEnumdiscount_Rule_Allocation_EnumNullableFilter = {
  equals?: InputMaybe<Discount_Rule_Allocation_Enum>;
  in?: InputMaybe<Array<Discount_Rule_Allocation_Enum>>;
  not?: InputMaybe<NestedEnumdiscount_Rule_Allocation_EnumNullableFilter>;
  notIn?: InputMaybe<Array<Discount_Rule_Allocation_Enum>>;
};

export type NestedEnumdiscount_Rule_Type_EnumFilter = {
  equals?: InputMaybe<Discount_Rule_Type_Enum>;
  in?: InputMaybe<Array<Discount_Rule_Type_Enum>>;
  not?: InputMaybe<NestedEnumdiscount_Rule_Type_EnumFilter>;
  notIn?: InputMaybe<Array<Discount_Rule_Type_Enum>>;
};

export type NestedEnumdiscount_Type_EnumFilter = {
  equals?: InputMaybe<Discount_Type_Enum>;
  in?: InputMaybe<Array<Discount_Type_Enum>>;
  not?: InputMaybe<NestedEnumdiscount_Type_EnumFilter>;
  notIn?: InputMaybe<Array<Discount_Type_Enum>>;
};

export type NestedEnumdraft_Order_Status_EnumFilter = {
  equals?: InputMaybe<Draft_Order_Status_Enum>;
  in?: InputMaybe<Array<Draft_Order_Status_Enum>>;
  not?: InputMaybe<NestedEnumdraft_Order_Status_EnumFilter>;
  notIn?: InputMaybe<Array<Draft_Order_Status_Enum>>;
};

export type NestedEnumorder_Fulfillment_Status_EnumFilter = {
  equals?: InputMaybe<Order_Fulfillment_Status_Enum>;
  in?: InputMaybe<Array<Order_Fulfillment_Status_Enum>>;
  not?: InputMaybe<NestedEnumorder_Fulfillment_Status_EnumFilter>;
  notIn?: InputMaybe<Array<Order_Fulfillment_Status_Enum>>;
};

export type NestedEnumorder_Item_Change_Type_EnumFilter = {
  equals?: InputMaybe<Order_Item_Change_Type_Enum>;
  in?: InputMaybe<Array<Order_Item_Change_Type_Enum>>;
  not?: InputMaybe<NestedEnumorder_Item_Change_Type_EnumFilter>;
  notIn?: InputMaybe<Array<Order_Item_Change_Type_Enum>>;
};

export type NestedEnumorder_Payment_Status_EnumFilter = {
  equals?: InputMaybe<Order_Payment_Status_Enum>;
  in?: InputMaybe<Array<Order_Payment_Status_Enum>>;
  not?: InputMaybe<NestedEnumorder_Payment_Status_EnumFilter>;
  notIn?: InputMaybe<Array<Order_Payment_Status_Enum>>;
};

export type NestedEnumorder_Settlement_Status_EnumFilter = {
  equals?: InputMaybe<Order_Settlement_Status_Enum>;
  in?: InputMaybe<Array<Order_Settlement_Status_Enum>>;
  not?: InputMaybe<NestedEnumorder_Settlement_Status_EnumFilter>;
  notIn?: InputMaybe<Array<Order_Settlement_Status_Enum>>;
};

export type NestedEnumorder_Status_EnumFilter = {
  equals?: InputMaybe<Order_Status_Enum>;
  in?: InputMaybe<Array<Order_Status_Enum>>;
  not?: InputMaybe<NestedEnumorder_Status_EnumFilter>;
  notIn?: InputMaybe<Array<Order_Status_Enum>>;
};

export type NestedEnumpayment_Session_Status_EnumFilter = {
  equals?: InputMaybe<Payment_Session_Status_Enum>;
  in?: InputMaybe<Array<Payment_Session_Status_Enum>>;
  not?: InputMaybe<NestedEnumpayment_Session_Status_EnumFilter>;
  notIn?: InputMaybe<Array<Payment_Session_Status_Enum>>;
};

export type NestedEnumpayout_Method_Account_Type_EnumFilter = {
  equals?: InputMaybe<Payout_Method_Account_Type_Enum>;
  in?: InputMaybe<Array<Payout_Method_Account_Type_Enum>>;
  not?: InputMaybe<NestedEnumpayout_Method_Account_Type_EnumFilter>;
  notIn?: InputMaybe<Array<Payout_Method_Account_Type_Enum>>;
};

export type NestedEnumpayout_Settlement_Status_EnumFilter = {
  equals?: InputMaybe<Payout_Settlement_Status_Enum>;
  in?: InputMaybe<Array<Payout_Settlement_Status_Enum>>;
  not?: InputMaybe<NestedEnumpayout_Settlement_Status_EnumFilter>;
  notIn?: InputMaybe<Array<Payout_Settlement_Status_Enum>>;
};

export type NestedEnumpayout_Status_EnumFilter = {
  equals?: InputMaybe<Payout_Status_Enum>;
  in?: InputMaybe<Array<Payout_Status_Enum>>;
  not?: InputMaybe<NestedEnumpayout_Status_EnumFilter>;
  notIn?: InputMaybe<Array<Payout_Status_Enum>>;
};

export type NestedEnumprice_List_Status_EnumFilter = {
  equals?: InputMaybe<Price_List_Status_Enum>;
  in?: InputMaybe<Array<Price_List_Status_Enum>>;
  not?: InputMaybe<NestedEnumprice_List_Status_EnumFilter>;
  notIn?: InputMaybe<Array<Price_List_Status_Enum>>;
};

export type NestedEnumprice_List_Type_EnumFilter = {
  equals?: InputMaybe<Price_List_Type_Enum>;
  in?: InputMaybe<Array<Price_List_Type_Enum>>;
  not?: InputMaybe<NestedEnumprice_List_Type_EnumFilter>;
  notIn?: InputMaybe<Array<Price_List_Type_Enum>>;
};

export type NestedEnumproduct_Status_EnumFilter = {
  equals?: InputMaybe<Product_Status_Enum>;
  in?: InputMaybe<Array<Product_Status_Enum>>;
  not?: InputMaybe<NestedEnumproduct_Status_EnumFilter>;
  notIn?: InputMaybe<Array<Product_Status_Enum>>;
};

export type NestedEnumreturn_Status_EnumFilter = {
  equals?: InputMaybe<Return_Status_Enum>;
  in?: InputMaybe<Array<Return_Status_Enum>>;
  not?: InputMaybe<NestedEnumreturn_Status_EnumFilter>;
  notIn?: InputMaybe<Array<Return_Status_Enum>>;
};

export type NestedEnumshipping_Option_Price_Type_EnumFilter = {
  equals?: InputMaybe<Shipping_Option_Price_Type_Enum>;
  in?: InputMaybe<Array<Shipping_Option_Price_Type_Enum>>;
  not?: InputMaybe<NestedEnumshipping_Option_Price_Type_EnumFilter>;
  notIn?: InputMaybe<Array<Shipping_Option_Price_Type_Enum>>;
};

export type NestedEnumshipping_Option_Requirement_Type_EnumFilter = {
  equals?: InputMaybe<Shipping_Option_Requirement_Type_Enum>;
  in?: InputMaybe<Array<Shipping_Option_Requirement_Type_Enum>>;
  not?: InputMaybe<NestedEnumshipping_Option_Requirement_Type_EnumFilter>;
  notIn?: InputMaybe<Array<Shipping_Option_Requirement_Type_Enum>>;
};

export type NestedEnumshipping_Profile_Type_EnumFilter = {
  equals?: InputMaybe<Shipping_Profile_Type_Enum>;
  in?: InputMaybe<Array<Shipping_Profile_Type_Enum>>;
  not?: InputMaybe<NestedEnumshipping_Profile_Type_EnumFilter>;
  notIn?: InputMaybe<Array<Shipping_Profile_Type_Enum>>;
};

export type NestedEnumswap_Fulfillment_Status_EnumFilter = {
  equals?: InputMaybe<Swap_Fulfillment_Status_Enum>;
  in?: InputMaybe<Array<Swap_Fulfillment_Status_Enum>>;
  not?: InputMaybe<NestedEnumswap_Fulfillment_Status_EnumFilter>;
  notIn?: InputMaybe<Array<Swap_Fulfillment_Status_Enum>>;
};

export type NestedEnumswap_Payment_Status_EnumFilter = {
  equals?: InputMaybe<Swap_Payment_Status_Enum>;
  in?: InputMaybe<Array<Swap_Payment_Status_Enum>>;
  not?: InputMaybe<NestedEnumswap_Payment_Status_EnumFilter>;
  notIn?: InputMaybe<Array<Swap_Payment_Status_Enum>>;
};

export type NestedEnumticketing_Refund_ReasonFilter = {
  equals?: InputMaybe<Ticketing_Refund_Reason>;
  in?: InputMaybe<Array<Ticketing_Refund_Reason>>;
  not?: InputMaybe<NestedEnumticketing_Refund_ReasonFilter>;
  notIn?: InputMaybe<Array<Ticketing_Refund_Reason>>;
};

export type NestedEnumticketing_Refund_StatusFilter = {
  equals?: InputMaybe<Ticketing_Refund_Status>;
  in?: InputMaybe<Array<Ticketing_Refund_Status>>;
  not?: InputMaybe<NestedEnumticketing_Refund_StatusFilter>;
  notIn?: InputMaybe<Array<Ticketing_Refund_Status>>;
};

export type NestedEnumuser_Role_EnumNullableFilter = {
  equals?: InputMaybe<User_Role_Enum>;
  in?: InputMaybe<Array<User_Role_Enum>>;
  not?: InputMaybe<NestedEnumuser_Role_EnumNullableFilter>;
  notIn?: InputMaybe<Array<User_Role_Enum>>;
};

export type NestedFloatFilter = {
  equals?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<Scalars['Float']['input']>>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  not?: InputMaybe<NestedFloatFilter>;
  notIn?: InputMaybe<Array<Scalars['Float']['input']>>;
};

export type NestedFloatNullableFilter = {
  equals?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<Scalars['Float']['input']>>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  not?: InputMaybe<NestedFloatNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Float']['input']>>;
};

export type NestedIntFilter = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<NestedIntFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type NestedIntNullableFilter = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<NestedIntNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type NestedStringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type NestedStringNullableFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<NestedStringNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type NotificationCount = {
  __typename?: 'NotificationCount';
  other_notification: Scalars['Int']['output'];
};

export type NotificationFeed = {
  __typename?: 'NotificationFeed';
  duration: Scalars['String']['output'];
  next: Scalars['String']['output'];
  results: Array<Result>;
  unread: Scalars['Int']['output'];
  unseen: Scalars['Int']['output'];
};

export type NotificationListRelationFilter = {
  every?: InputMaybe<NotificationWhereInput>;
  none?: InputMaybe<NotificationWhereInput>;
  some?: InputMaybe<NotificationWhereInput>;
};

export type NotificationNullableRelationFilter = {
  is?: InputMaybe<NotificationWhereInput>;
  isNot?: InputMaybe<NotificationWhereInput>;
};

export type Notification_ProviderCount = {
  __typename?: 'Notification_providerCount';
  notification: Scalars['Int']['output'];
};

export type Notification_ProviderNullableRelationFilter = {
  is?: InputMaybe<Notification_ProviderWhereInput>;
  isNot?: InputMaybe<Notification_ProviderWhereInput>;
};

export enum NullsOrder {
  First = 'first',
  Last = 'last'
}

export type OrderCount = {
  __typename?: 'OrderCount';
  Renamedreturn: Scalars['Int']['output'];
  claim_order: Scalars['Int']['output'];
  fulfillment: Scalars['Int']['output'];
  gift_card: Scalars['Int']['output'];
  gift_card_transaction: Scalars['Int']['output'];
  line_item: Scalars['Int']['output'];
  order_discounts: Scalars['Int']['output'];
  order_edit: Scalars['Int']['output'];
  order_gift_cards: Scalars['Int']['output'];
  payment: Scalars['Int']['output'];
  refund: Scalars['Int']['output'];
  shipping_method: Scalars['Int']['output'];
  swap: Scalars['Int']['output'];
};

export type OrderListRelationFilter = {
  every?: InputMaybe<OrderWhereInput>;
  none?: InputMaybe<OrderWhereInput>;
  some?: InputMaybe<OrderWhereInput>;
};

export type OrderNullableRelationFilter = {
  is?: InputMaybe<OrderWhereInput>;
  isNot?: InputMaybe<OrderWhereInput>;
};

export type OrderRefundFee = {
  __typename?: 'OrderRefundFee';
  amount: Scalars['Int']['output'];
  description: Scalars['String']['output'];
  feePayer: Scalars['String']['output'];
  name: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type OrderRelationFilter = {
  is?: InputMaybe<OrderWhereInput>;
  isNot?: InputMaybe<OrderWhereInput>;
};

export type Order_DiscountsListRelationFilter = {
  every?: InputMaybe<Order_DiscountsWhereInput>;
  none?: InputMaybe<Order_DiscountsWhereInput>;
  some?: InputMaybe<Order_DiscountsWhereInput>;
};

export type Order_EditCount = {
  __typename?: 'Order_editCount';
  line_item: Scalars['Int']['output'];
  order_item_change: Scalars['Int']['output'];
};

export type Order_EditListRelationFilter = {
  every?: InputMaybe<Order_EditWhereInput>;
  none?: InputMaybe<Order_EditWhereInput>;
  some?: InputMaybe<Order_EditWhereInput>;
};

export type Order_EditNullableRelationFilter = {
  is?: InputMaybe<Order_EditWhereInput>;
  isNot?: InputMaybe<Order_EditWhereInput>;
};

export type Order_EditRelationFilter = {
  is?: InputMaybe<Order_EditWhereInput>;
  isNot?: InputMaybe<Order_EditWhereInput>;
};

export type Order_Gift_CardsListRelationFilter = {
  every?: InputMaybe<Order_Gift_CardsWhereInput>;
  none?: InputMaybe<Order_Gift_CardsWhereInput>;
  some?: InputMaybe<Order_Gift_CardsWhereInput>;
};

export type Order_Item_ChangeListRelationFilter = {
  every?: InputMaybe<Order_Item_ChangeWhereInput>;
  none?: InputMaybe<Order_Item_ChangeWhereInput>;
  some?: InputMaybe<Order_Item_ChangeWhereInput>;
};

export type Order_Item_ChangeNullableRelationFilter = {
  is?: InputMaybe<Order_Item_ChangeWhereInput>;
  isNot?: InputMaybe<Order_Item_ChangeWhereInput>;
};

export type OrganizationReportStatusInput = {
  organizationId: Scalars['ID']['input'];
  reportId: Scalars['ID']['input'];
};

export type OrganizationsBySaWhereInput = {
  q?: InputMaybe<Scalars['String']['input']>;
};

export enum Payment_Collection_Status_Enum {
  Authorized = 'authorized',
  Awaiting = 'awaiting',
  Canceled = 'canceled',
  NotPaid = 'not_paid',
  PartiallyAuthorized = 'partially_authorized'
}

export enum Payment_Collection_Type_Enum {
  OrderEdit = 'order_edit'
}

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type PaginationInput = {
  page?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};

export type PaginationResponse = {
  __typename?: 'PaginationResponse';
  page: Scalars['Int']['output'];
  size?: Maybe<Scalars['Int']['output']>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type PaymentCount = {
  __typename?: 'PaymentCount';
  payment_collection_payments: Scalars['Int']['output'];
  refund: Scalars['Int']['output'];
};

export type PaymentData = {
  __typename?: 'PaymentData';
  data1?: Maybe<Scalars['String']['output']>;
  data2?: Maybe<Scalars['String']['output']>;
  provider?: Maybe<Scalars['String']['output']>;
};

export type PaymentListRelationFilter = {
  every?: InputMaybe<PaymentWhereInput>;
  none?: InputMaybe<PaymentWhereInput>;
  some?: InputMaybe<PaymentWhereInput>;
};

export type PaymentNullableRelationFilter = {
  is?: InputMaybe<PaymentWhereInput>;
  isNot?: InputMaybe<PaymentWhereInput>;
};

export type PaymentRelationFilter = {
  is?: InputMaybe<PaymentWhereInput>;
  isNot?: InputMaybe<PaymentWhereInput>;
};

export type Payment_CollectionCount = {
  __typename?: 'Payment_collectionCount';
  order_edit: Scalars['Int']['output'];
  payment_collection_payments: Scalars['Int']['output'];
  payment_collection_sessions: Scalars['Int']['output'];
};

export type Payment_CollectionListRelationFilter = {
  every?: InputMaybe<Payment_CollectionWhereInput>;
  none?: InputMaybe<Payment_CollectionWhereInput>;
  some?: InputMaybe<Payment_CollectionWhereInput>;
};

export type Payment_CollectionNullableRelationFilter = {
  is?: InputMaybe<Payment_CollectionWhereInput>;
  isNot?: InputMaybe<Payment_CollectionWhereInput>;
};

export type Payment_CollectionRelationFilter = {
  is?: InputMaybe<Payment_CollectionWhereInput>;
  isNot?: InputMaybe<Payment_CollectionWhereInput>;
};

export type Payment_Collection_PaymentsListRelationFilter = {
  every?: InputMaybe<Payment_Collection_PaymentsWhereInput>;
  none?: InputMaybe<Payment_Collection_PaymentsWhereInput>;
  some?: InputMaybe<Payment_Collection_PaymentsWhereInput>;
};

export type Payment_Collection_SessionsListRelationFilter = {
  every?: InputMaybe<Payment_Collection_SessionsWhereInput>;
  none?: InputMaybe<Payment_Collection_SessionsWhereInput>;
  some?: InputMaybe<Payment_Collection_SessionsWhereInput>;
};

export type Payment_ProviderCount = {
  __typename?: 'Payment_providerCount';
  region_payment_providers: Scalars['Int']['output'];
};

export type Payment_ProviderRelationFilter = {
  is?: InputMaybe<Payment_ProviderWhereInput>;
  isNot?: InputMaybe<Payment_ProviderWhereInput>;
};

export type Payment_SessionCount = {
  __typename?: 'Payment_sessionCount';
  payment_collection_sessions: Scalars['Int']['output'];
};

export type Payment_SessionListRelationFilter = {
  every?: InputMaybe<Payment_SessionWhereInput>;
  none?: InputMaybe<Payment_SessionWhereInput>;
  some?: InputMaybe<Payment_SessionWhereInput>;
};

export type Payment_SessionRelationFilter = {
  is?: InputMaybe<Payment_SessionWhereInput>;
  isNot?: InputMaybe<Payment_SessionWhereInput>;
};

export type PayoutListRelationFilter = {
  every?: InputMaybe<PayoutWhereInput>;
  none?: InputMaybe<PayoutWhereInput>;
  some?: InputMaybe<PayoutWhereInput>;
};

export type Payout_MethodCount = {
  __typename?: 'Payout_methodCount';
  payout: Scalars['Int']['output'];
};

export type Payout_MethodRelationFilter = {
  is?: InputMaybe<Payout_MethodWhereInput>;
  isNot?: InputMaybe<Payout_MethodWhereInput>;
};

export type Placement = {
  __typename?: 'Placement';
  actionRoute?: Maybe<Scalars['String']['output']>;
  data?: Maybe<Array<SectionData>>;
  dataQuery?: Maybe<Scalars['String']['output']>;
  header?: Maybe<Scalars['String']['output']>;
  iconUrl?: Maybe<Scalars['String']['output']>;
  placementType: PlacementType;
  subHeader?: Maybe<Scalars['String']['output']>;
};

export type PlacementResult = {
  __typename?: 'PlacementResult';
  placements: Array<Placement>;
};

export enum PlacementType {
  All = 'ALL',
  Deal = 'DEAL',
  Featured = 'FEATURED',
  FeaturedProducts = 'FEATURED_PRODUCTS',
  FeaturedStoreProduct = 'FEATURED_STORE_PRODUCT',
  New = 'NEW',
  Personalized = 'PERSONALIZED',
  PrimaryBanner = 'PRIMARY_BANNER',
  ProductFeed = 'PRODUCT_FEED',
  ProductGrid = 'PRODUCT_GRID',
  ProductHscroll = 'PRODUCT_HSCROLL'
}

export type Price_ListCount = {
  __typename?: 'Price_listCount';
  money_amount: Scalars['Int']['output'];
  price_list_customer_groups: Scalars['Int']['output'];
};

export type Price_ListNullableRelationFilter = {
  is?: InputMaybe<Price_ListWhereInput>;
  isNot?: InputMaybe<Price_ListWhereInput>;
};

export type Price_ListRelationFilter = {
  is?: InputMaybe<Price_ListWhereInput>;
  isNot?: InputMaybe<Price_ListWhereInput>;
};

export type Price_List_Customer_GroupsListRelationFilter = {
  every?: InputMaybe<Price_List_Customer_GroupsWhereInput>;
  none?: InputMaybe<Price_List_Customer_GroupsWhereInput>;
  some?: InputMaybe<Price_List_Customer_GroupsWhereInput>;
};

export type ProductCount = {
  __typename?: 'ProductCount';
  discount_condition_product: Scalars['Int']['output'];
  discount_rule_products: Scalars['Int']['output'];
  product_category_product: Scalars['Int']['output'];
  product_images: Scalars['Int']['output'];
  product_option: Scalars['Int']['output'];
  product_tags: Scalars['Int']['output'];
  product_tax_rate: Scalars['Int']['output'];
  product_variant: Scalars['Int']['output'];
};

export type ProductListRelationFilter = {
  every?: InputMaybe<ProductWhereInput>;
  none?: InputMaybe<ProductWhereInput>;
  some?: InputMaybe<ProductWhereInput>;
};

export type ProductNullableRelationFilter = {
  is?: InputMaybe<ProductWhereInput>;
  isNot?: InputMaybe<ProductWhereInput>;
};

export type ProductRelationFilter = {
  is?: InputMaybe<ProductWhereInput>;
  isNot?: InputMaybe<ProductWhereInput>;
};

export enum ProductScalarFieldEnum {
  CollectionId = 'collection_id',
  CreatedAt = 'created_at',
  DeletedAt = 'deleted_at',
  Description = 'description',
  Discountable = 'discountable',
  ExternalId = 'external_id',
  Handle = 'handle',
  Height = 'height',
  HsCode = 'hs_code',
  Id = 'id',
  IsGiftcard = 'is_giftcard',
  Length = 'length',
  Material = 'material',
  Metadata = 'metadata',
  MidCode = 'mid_code',
  OriginCountry = 'origin_country',
  Status = 'status',
  StoreId = 'store_id',
  Subtitle = 'subtitle',
  Thumbnail = 'thumbnail',
  Title = 'title',
  TypeId = 'type_id',
  UpdatedAt = 'updated_at',
  Weight = 'weight',
  Width = 'width'
}

export type Product_CategoryCount = {
  __typename?: 'Product_categoryCount';
  product_category_product: Scalars['Int']['output'];
};

export type Product_CategoryRelationFilter = {
  is?: InputMaybe<Product_CategoryWhereInput>;
  isNot?: InputMaybe<Product_CategoryWhereInput>;
};

export type Product_Category_ProductListRelationFilter = {
  every?: InputMaybe<Product_Category_ProductWhereInput>;
  none?: InputMaybe<Product_Category_ProductWhereInput>;
  some?: InputMaybe<Product_Category_ProductWhereInput>;
};

export type Product_CollectionCount = {
  __typename?: 'Product_collectionCount';
  discount_condition_product_collection: Scalars['Int']['output'];
  product: Scalars['Int']['output'];
};

export type Product_CollectionNullableRelationFilter = {
  is?: InputMaybe<Product_CollectionWhereInput>;
  isNot?: InputMaybe<Product_CollectionWhereInput>;
};

export type Product_CollectionRelationFilter = {
  is?: InputMaybe<Product_CollectionWhereInput>;
  isNot?: InputMaybe<Product_CollectionWhereInput>;
};

export type Product_ImagesListRelationFilter = {
  every?: InputMaybe<Product_ImagesWhereInput>;
  none?: InputMaybe<Product_ImagesWhereInput>;
  some?: InputMaybe<Product_ImagesWhereInput>;
};

export type Product_OptionCount = {
  __typename?: 'Product_optionCount';
  product_option_value: Scalars['Int']['output'];
};

export type Product_OptionListRelationFilter = {
  every?: InputMaybe<Product_OptionWhereInput>;
  none?: InputMaybe<Product_OptionWhereInput>;
  some?: InputMaybe<Product_OptionWhereInput>;
};

export type Product_OptionRelationFilter = {
  is?: InputMaybe<Product_OptionWhereInput>;
  isNot?: InputMaybe<Product_OptionWhereInput>;
};

export type Product_Option_ValueListRelationFilter = {
  every?: InputMaybe<Product_Option_ValueWhereInput>;
  none?: InputMaybe<Product_Option_ValueWhereInput>;
  some?: InputMaybe<Product_Option_ValueWhereInput>;
};

export type Product_Sales_ChannelListRelationFilter = {
  every?: InputMaybe<Product_Sales_ChannelWhereInput>;
  none?: InputMaybe<Product_Sales_ChannelWhereInput>;
  some?: InputMaybe<Product_Sales_ChannelWhereInput>;
};

export type Product_TagCount = {
  __typename?: 'Product_tagCount';
  discount_condition_product_tag: Scalars['Int']['output'];
  product_tags: Scalars['Int']['output'];
};

export type Product_TagRelationFilter = {
  is?: InputMaybe<Product_TagWhereInput>;
  isNot?: InputMaybe<Product_TagWhereInput>;
};

export type Product_TagsListRelationFilter = {
  every?: InputMaybe<Product_TagsWhereInput>;
  none?: InputMaybe<Product_TagsWhereInput>;
  some?: InputMaybe<Product_TagsWhereInput>;
};

export type Product_Tax_RateListRelationFilter = {
  every?: InputMaybe<Product_Tax_RateWhereInput>;
  none?: InputMaybe<Product_Tax_RateWhereInput>;
  some?: InputMaybe<Product_Tax_RateWhereInput>;
};

export type Product_TypeCount = {
  __typename?: 'Product_typeCount';
  discount_condition_product_type: Scalars['Int']['output'];
  product: Scalars['Int']['output'];
  product_type_tax_rate: Scalars['Int']['output'];
};

export type Product_TypeNullableRelationFilter = {
  is?: InputMaybe<Product_TypeWhereInput>;
  isNot?: InputMaybe<Product_TypeWhereInput>;
};

export type Product_TypeRelationFilter = {
  is?: InputMaybe<Product_TypeWhereInput>;
  isNot?: InputMaybe<Product_TypeWhereInput>;
};

export type Product_Type_Tax_RateListRelationFilter = {
  every?: InputMaybe<Product_Type_Tax_RateWhereInput>;
  none?: InputMaybe<Product_Type_Tax_RateWhereInput>;
  some?: InputMaybe<Product_Type_Tax_RateWhereInput>;
};

export type Product_VariantCount = {
  __typename?: 'Product_variantCount';
  claim_item: Scalars['Int']['output'];
  line_item: Scalars['Int']['output'];
  product_option_value: Scalars['Int']['output'];
};

export type Product_VariantListRelationFilter = {
  every?: InputMaybe<Product_VariantWhereInput>;
  none?: InputMaybe<Product_VariantWhereInput>;
  some?: InputMaybe<Product_VariantWhereInput>;
};

export type Product_VariantNullableRelationFilter = {
  is?: InputMaybe<Product_VariantWhereInput>;
  isNot?: InputMaybe<Product_VariantWhereInput>;
};

export type Product_VariantRelationFilter = {
  is?: InputMaybe<Product_VariantWhereInput>;
  isNot?: InputMaybe<Product_VariantWhereInput>;
};

export type PublishEventsInput = {
  eventIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type PurchasedTicketTier = {
  __typename?: 'PurchasedTicketTier';
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['Int']['output']>;
  quantity: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  addOnServices: GetAddOnServicesResponse;
  /** Get one artist */
  artist: FlipArtist;
  /** Get all artists */
  artists: Array<FlipArtist>;
  balanceTransactions: GetBalanceTransactionsResponse;
  currentUser: FlipUser;
  discounts: GetDiscountsResponse;
  /** Get event by handle */
  event: FlipEvent;
  /** Get Event By Id */
  eventById: FlipEvent;
  /** getEventOccurrence */
  eventOccurrences: GetEventOccurrencesResponse;
  /** Get all events */
  events: GetEventsResponse;
  /** Get Events By Organization */
  eventsByOrganization: GetEventsByOrganizationResponse;
  /** Get all external events */
  externalEvents: Array<FlipExternalEvent>;
  feed: PlacementResult;
  /** Get all notifications */
  getAllNotifications: NotificationFeed;
  /** Get banners */
  getBanner: Array<FlipBanner>;
  getCollection: FlipCollection;
  getEventHandles: Array<GetEventHandlesResponse>;
  getEventInvites: GetInvitesResponse;
  getEventMembers: GetMembersResponse;
  getEventOrderFinancialSummary: GetEventOrderFinancialSummaryResponse;
  getEventSeatMap: GetEventSeatMapResponse;
  getEventViewsChartGroupByChannel: GetEventViewsChartGroupByChannelResponse;
  getMyCards: Array<Card>;
  /** Get My Events */
  getMyEvents: GetMyEventsResponse;
  getMyInvites: GetMyInvitesResponse;
  getMyOrders: GetMyOrdersResponse;
  getMyOrganizations: Array<FlipOrganization>;
  getMyTickets: GetTicketHistoryResponse;
  getOrCreateOfflineSaleCode: GetOrCreateOfflineSaleCodeResponse;
  getOrderDetails: GetOrderDetailsResponse;
  getOrderRefundFee: GetOrderRefundFeeResponse;
  getOrders: GetOrdersResponse;
  getOrganizationImageUploadLink: GetImageUploadLinkResponse;
  getOrganizationInvites: GetInvitesResponse;
  getOrganizationMembers: GetMembersResponse;
  getPastEventTickets: GetTicketHistoryResponse;
  /** Get 1 product by id */
  getProduct: Product;
  /** Get a list of products */
  getProducts: Array<Product>;
  getRefundReasons: Array<GetRefundReasonsResponse>;
  getReservationSession: GetReservationSessionResponse;
  getReservationSessionByEvent?: Maybe<GetReservationSessionByEventResponse>;
  getTicketCheckInByTier: Array<TicketCheckInCount>;
  getTicketDetails: Array<GetTicketDetailsResponse>;
  getTicketIdsByOrder: Array<Scalars['ID']['output']>;
  getTicketOwners: Array<FlipUser>;
  getTicketSalesByTier: GetTicketSalesByTierResponse;
  getTicketSalesByTime: GetTicketSalesByTimeResponse;
  getTicketTiers: Array<GetTicketTierResponse>;
  getTicketsByOrderId: Array<FlipTicket>;
  getTotalEventDetailsViews: GetTotalEventDetailsViewResponse;
  getTotalEventStatsGroupByChannel: GetTotalEventStatResponse;
  getTotalOrdersByLocation: GetTotalOrderByLocationResponse;
  getUpcomingEventTickets: GetTicketHistoryResponse;
  getUserCollections: Array<FlipCollection>;
  getUserImageUploadLink: GetImageUploadLinkResponse;
  myEventWallet: Wallet;
  /** Get organization by handle */
  organization: FlipOrganization;
  organizationCheckoutConfigs: GetOrganizationCheckoutConfigsResponse;
  organizationReportStatus: ReportStatusResponse;
  /** Get organizations by super admin */
  organizations: GeOrganizationBySaResponse;
  /** Get parent event by handle */
  parentEvent: FlipEvent;
  payoutMethods: Array<Payout_Method>;
  payoutRequests: GetPayoutRequestsResponse;
  payoutSummary: GetPayoutSummaryResponse;
  payouts: GetPayoutsResponse;
  refundRequests: GetRequestRefundsResponse;
  reportStatus: ReportStatusResponse;
  searchEvent?: Maybe<EventSearchResult>;
  searchVenue?: Maybe<VenueSearchResult>;
  validateSeats: ValidateSeatsResponse;
  venueFeed: VenueSearchResult;
};


export type QueryAddOnServicesArgs = {
  input: GetAddOnServicesInput;
};


export type QueryArtistArgs = {
  handle: Scalars['String']['input'];
};


export type QueryBalanceTransactionsArgs = {
  input: GetBalanceTransactionsInput;
};


export type QueryDiscountsArgs = {
  input: GetDiscountsInput;
};


export type QueryEventArgs = {
  handle: Scalars['String']['input'];
};


export type QueryEventByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryEventOccurrencesArgs = {
  input: GetEventOccurrencesInput;
};


export type QueryEventsArgs = {
  input: GetEventsInput;
};


export type QueryEventsByOrganizationArgs = {
  input: GetEventsByOrganizationInput;
};


export type QueryExternalEventsArgs = {
  data: GetExternalEventsInput;
};


export type QueryGetAllNotificationsArgs = {
  limit: Scalars['Float']['input'];
  offset: Scalars['Float']['input'];
};


export type QueryGetCollectionArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetEventInvitesArgs = {
  data: GetManyInvitesInput;
};


export type QueryGetEventMembersArgs = {
  data: GetEventMembersInput;
};


export type QueryGetEventOrderFinancialSummaryArgs = {
  input: GetEventFinancialSummaryInput;
};


export type QueryGetEventSeatMapArgs = {
  input: GeEventSeatMapInput;
};


export type QueryGetEventViewsChartGroupByChannelArgs = {
  input: GetEventViewsChartGroupByChannelInput;
};


export type QueryGetMyEventsArgs = {
  data: GetMyEventsInput;
};


export type QueryGetMyInvitesArgs = {
  data: GetMyInvitesInput;
};


export type QueryGetMyOrdersArgs = {
  input: GetMyOrdersInput;
};


export type QueryGetMyTicketsArgs = {
  data: GetTicketHistoryInput;
};


export type QueryGetOrCreateOfflineSaleCodeArgs = {
  input: GetOrCreateOfflineSaleCodeInput;
};


export type QueryGetOrderDetailsArgs = {
  input: GetOrderDetailsInput;
};


export type QueryGetOrderRefundFeeArgs = {
  input: GetOrderRefundFeeInput;
};


export type QueryGetOrdersArgs = {
  input: GetOrdersInput;
};


export type QueryGetOrganizationImageUploadLinkArgs = {
  input: GetOrganizationImageUploadLinkInput;
};


export type QueryGetOrganizationInvitesArgs = {
  data: GetManyInvitesInput;
};


export type QueryGetOrganizationMembersArgs = {
  data: GetOrganizationMembersInput;
};


export type QueryGetPastEventTicketsArgs = {
  data: GetTicketHistoryInput;
};


export type QueryGetProductArgs = {
  args: ProductWhereUniqueInput;
};


export type QueryGetProductsArgs = {
  args: FindManyproductArgs;
};


export type QueryGetReservationSessionArgs = {
  input: GetReservationSessionInput;
};


export type QueryGetReservationSessionByEventArgs = {
  input: GetReservationSessionByEventInput;
};


export type QueryGetTicketCheckInByTierArgs = {
  eventId: Scalars['String']['input'];
};


export type QueryGetTicketDetailsArgs = {
  data: GetTicketDetailsInput;
};


export type QueryGetTicketIdsByOrderArgs = {
  orderId: Scalars['String']['input'];
};


export type QueryGetTicketOwnersArgs = {
  data: GetTicketOwnersInput;
};


export type QueryGetTicketSalesByTierArgs = {
  input: GetTicketSalesByTierInput;
};


export type QueryGetTicketSalesByTimeArgs = {
  input: GetTicketSalesByTimeInput;
};


export type QueryGetTicketTiersArgs = {
  data: GetTicketTierInput;
};


export type QueryGetTicketsByOrderIdArgs = {
  input: GetTicketsByOrderIdInput;
};


export type QueryGetTotalEventDetailsViewsArgs = {
  input: GetTotalEventDetailsViewInput;
};


export type QueryGetTotalEventStatsGroupByChannelArgs = {
  input: GetTotalEventStatInput;
};


export type QueryGetTotalOrdersByLocationArgs = {
  input: GetTotalOrderByLocationInput;
};


export type QueryGetUpcomingEventTicketsArgs = {
  data: GetTicketHistoryInput;
};


export type QueryGetUserImageUploadLinkArgs = {
  input: GetUserImageUploadLinkInput;
};


export type QueryMyEventWalletArgs = {
  input: GetMyEventWalletInput;
};


export type QueryOrganizationArgs = {
  handle: Scalars['String']['input'];
};


export type QueryOrganizationCheckoutConfigsArgs = {
  input: GetOrganizationCheckoutConfigsInput;
};


export type QueryOrganizationReportStatusArgs = {
  input: OrganizationReportStatusInput;
};


export type QueryOrganizationsArgs = {
  input: GetOrganizationsBySaInput;
};


export type QueryParentEventArgs = {
  handle: Scalars['String']['input'];
};


export type QueryPayoutMethodsArgs = {
  input: GetPayoutMethodsInput;
};


export type QueryPayoutRequestsArgs = {
  input: GetPayoutRequestsInput;
};


export type QueryPayoutSummaryArgs = {
  input: GetPayoutSummaryInput;
};


export type QueryPayoutsArgs = {
  input: GetPayoutsInput;
};


export type QueryRefundRequestsArgs = {
  input: GetRefundRequestsInput;
};


export type QueryReportStatusArgs = {
  input: ReportStatusInput;
};


export type QuerySearchEventArgs = {
  args: EventSearchArgs;
};


export type QuerySearchVenueArgs = {
  args: VenueSearchArgs;
};


export type QueryValidateSeatsArgs = {
  input: ValidateSeatsInput;
};


export type QueryVenueFeedArgs = {
  args: FeedArgs;
};

export enum QueryMode {
  Default = 'default',
  Insensitive = 'insensitive'
}

export enum ReactionType {
  Dislike = 'DISLIKE',
  Like = 'LIKE'
}

export type RefundListRelationFilter = {
  every?: InputMaybe<RefundWhereInput>;
  none?: InputMaybe<RefundWhereInput>;
  some?: InputMaybe<RefundWhereInput>;
};

export type RegionCount = {
  __typename?: 'RegionCount';
  cart: Scalars['Int']['output'];
  country: Scalars['Int']['output'];
  discount_regions: Scalars['Int']['output'];
  gift_card: Scalars['Int']['output'];
  money_amount: Scalars['Int']['output'];
  order: Scalars['Int']['output'];
  payment_collection: Scalars['Int']['output'];
  region_fulfillment_providers: Scalars['Int']['output'];
  region_payment_providers: Scalars['Int']['output'];
  shipping_option: Scalars['Int']['output'];
  tax_rates: Scalars['Int']['output'];
};

export type RegionListRelationFilter = {
  every?: InputMaybe<RegionWhereInput>;
  none?: InputMaybe<RegionWhereInput>;
  some?: InputMaybe<RegionWhereInput>;
};

export type RegionNullableRelationFilter = {
  is?: InputMaybe<RegionWhereInput>;
  isNot?: InputMaybe<RegionWhereInput>;
};

export type RegionRelationFilter = {
  is?: InputMaybe<RegionWhereInput>;
  isNot?: InputMaybe<RegionWhereInput>;
};

export type Region_Fulfillment_ProvidersListRelationFilter = {
  every?: InputMaybe<Region_Fulfillment_ProvidersWhereInput>;
  none?: InputMaybe<Region_Fulfillment_ProvidersWhereInput>;
  some?: InputMaybe<Region_Fulfillment_ProvidersWhereInput>;
};

export type Region_Payment_ProvidersListRelationFilter = {
  every?: InputMaybe<Region_Payment_ProvidersWhereInput>;
  none?: InputMaybe<Region_Payment_ProvidersWhereInput>;
  some?: InputMaybe<Region_Payment_ProvidersWhereInput>;
};

/** This model has been renamed to 'Renamedreturn' during introspection, because the original name 'return' is reserved. */
export type Renamedreturn = {
  __typename?: 'Renamedreturn';
  _count: RenamedreturnCount;
  claim_order?: Maybe<Claim_Order>;
  claim_order_id?: Maybe<Scalars['String']['output']>;
  created_at: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  idempotency_key?: Maybe<Scalars['String']['output']>;
  location_id?: Maybe<Scalars['String']['output']>;
  metadata?: Maybe<Scalars['JSON']['output']>;
  no_notification?: Maybe<Scalars['Boolean']['output']>;
  order?: Maybe<Order>;
  order_id?: Maybe<Scalars['String']['output']>;
  received_at?: Maybe<Scalars['DateTime']['output']>;
  refund_amount: Scalars['Int']['output'];
  return_item?: Maybe<Array<Return_Item>>;
  shipping_data?: Maybe<Scalars['JSON']['output']>;
  shipping_method?: Maybe<Shipping_Method>;
  status: Return_Status_Enum;
  swap?: Maybe<Swap>;
  swap_id?: Maybe<Scalars['String']['output']>;
  updated_at: Scalars['DateTime']['output'];
};

export type RenamedreturnCount = {
  __typename?: 'RenamedreturnCount';
  return_item: Scalars['Int']['output'];
};

export type RenamedreturnListRelationFilter = {
  every?: InputMaybe<RenamedreturnWhereInput>;
  none?: InputMaybe<RenamedreturnWhereInput>;
  some?: InputMaybe<RenamedreturnWhereInput>;
};

export type RenamedreturnNullableRelationFilter = {
  is?: InputMaybe<RenamedreturnWhereInput>;
  isNot?: InputMaybe<RenamedreturnWhereInput>;
};

export type RenamedreturnRelationFilter = {
  is?: InputMaybe<RenamedreturnWhereInput>;
  isNot?: InputMaybe<RenamedreturnWhereInput>;
};

export type RenamedreturnWhereInput = {
  AND?: InputMaybe<Array<RenamedreturnWhereInput>>;
  NOT?: InputMaybe<Array<RenamedreturnWhereInput>>;
  OR?: InputMaybe<Array<RenamedreturnWhereInput>>;
  claim_order?: InputMaybe<Claim_OrderNullableRelationFilter>;
  claim_order_id?: InputMaybe<StringNullableFilter>;
  created_at?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  idempotency_key?: InputMaybe<StringNullableFilter>;
  location_id?: InputMaybe<StringNullableFilter>;
  metadata?: InputMaybe<JsonNullableFilter>;
  no_notification?: InputMaybe<BoolNullableFilter>;
  order?: InputMaybe<OrderNullableRelationFilter>;
  order_id?: InputMaybe<StringNullableFilter>;
  received_at?: InputMaybe<DateTimeNullableFilter>;
  refund_amount?: InputMaybe<IntFilter>;
  return_item?: InputMaybe<Return_ItemListRelationFilter>;
  shipping_data?: InputMaybe<JsonNullableFilter>;
  shipping_method?: InputMaybe<Shipping_MethodNullableRelationFilter>;
  status?: InputMaybe<Enumreturn_Status_EnumFilter>;
  swap?: InputMaybe<SwapNullableRelationFilter>;
  swap_id?: InputMaybe<StringNullableFilter>;
  updated_at?: InputMaybe<DateTimeFilter>;
};

export enum ReportStatus {
  Completed = 'COMPLETED',
  Failed = 'FAILED',
  Pending = 'PENDING'
}

export type ReportStatusInput = {
  eventId: Scalars['ID']['input'];
  organizationId: Scalars['ID']['input'];
  reportId: Scalars['ID']['input'];
};

export type ReportStatusResponse = {
  __typename?: 'ReportStatusResponse';
  downloadUrl?: Maybe<Scalars['String']['output']>;
  reportId: Scalars['String']['output'];
  status: ReportStatus;
};

export type RequestOrderReportInput = {
  eventId: Scalars['ID']['input'];
  organizationId: Scalars['ID']['input'];
};

export type RequestOrganizationPayoutReportInput = {
  from: Scalars['DateTime']['input'];
  organizationId: Scalars['ID']['input'];
  to: Scalars['DateTime']['input'];
};

export type RequestPayoutReportInput = {
  eventId: Scalars['ID']['input'];
  organizationId: Scalars['ID']['input'];
};

export type RequestRefundInput = {
  eventId: Scalars['ID']['input'];
  note: Scalars['String']['input'];
  orderId: Scalars['ID']['input'];
  refundReason: Ticketing_Refund_Reason;
};

export type RequestReportResponse = {
  __typename?: 'RequestReportResponse';
  reportId: Scalars['String']['output'];
};

export type ResendInviteInput = {
  id: Scalars['ID']['input'];
  validDurationMs?: InputMaybe<Scalars['Int']['input']>;
};

export type Result = {
  __typename?: 'Result';
  activities: Array<Activity>;
  activity_count: Scalars['Int']['output'];
  actor_count: Scalars['Int']['output'];
  created_at: Scalars['String']['output'];
  group: Scalars['String']['output'];
  id: Scalars['String']['output'];
  is_read: Scalars['Boolean']['output'];
  is_seen: Scalars['Boolean']['output'];
  updated_at: Scalars['String']['output'];
  verb: Scalars['String']['output'];
};

export type Return_ItemListRelationFilter = {
  every?: InputMaybe<Return_ItemWhereInput>;
  none?: InputMaybe<Return_ItemWhereInput>;
  some?: InputMaybe<Return_ItemWhereInput>;
};

export type Return_ReasonCount = {
  __typename?: 'Return_reasonCount';
  other_return_reason: Scalars['Int']['output'];
  return_item: Scalars['Int']['output'];
};

export type Return_ReasonListRelationFilter = {
  every?: InputMaybe<Return_ReasonWhereInput>;
  none?: InputMaybe<Return_ReasonWhereInput>;
  some?: InputMaybe<Return_ReasonWhereInput>;
};

export type Return_ReasonNullableRelationFilter = {
  is?: InputMaybe<Return_ReasonWhereInput>;
  isNot?: InputMaybe<Return_ReasonWhereInput>;
};

export enum ReviewStatus {
  Approved = 'APPROVED',
  Pending = 'PENDING',
  Rejected = 'REJECTED'
}

export enum ReviewStatusType {
  Draft = 'DRAFT',
  PendingReview = 'PENDING_REVIEW',
  Published = 'PUBLISHED'
}

export enum RoleEntityType {
  All = 'ALL',
  Event = 'EVENT',
  Organization = 'ORGANIZATION'
}

export enum RoleName {
  EventAdmin = 'EVENT_ADMIN',
  EventMember = 'EVENT_MEMBER',
  OrganizationAdmin = 'ORGANIZATION_ADMIN',
  SuperAdmin = 'SUPER_ADMIN'
}

export type SaCreateOrganizationInput = {
  contactEmail?: InputMaybe<Scalars['String']['input']>;
  contactPhone?: InputMaybe<Scalars['String']['input']>;
  coverURL?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  facebookURL?: InputMaybe<Scalars['String']['input']>;
  handle?: InputMaybe<Scalars['String']['input']>;
  instagramURL?: InputMaybe<Scalars['String']['input']>;
  logoURL?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  ownerId: Scalars['ID']['input'];
  tiktokURL?: InputMaybe<Scalars['String']['input']>;
  websiteURL?: InputMaybe<Scalars['String']['input']>;
};

export type Sales_ChannelCount = {
  __typename?: 'Sales_channelCount';
  cart: Scalars['Int']['output'];
  order: Scalars['Int']['output'];
  product_sales_channel: Scalars['Int']['output'];
};

export type Sales_ChannelNullableRelationFilter = {
  is?: InputMaybe<Sales_ChannelWhereInput>;
  isNot?: InputMaybe<Sales_ChannelWhereInput>;
};

export type Sales_ChannelRelationFilter = {
  is?: InputMaybe<Sales_ChannelWhereInput>;
  isNot?: InputMaybe<Sales_ChannelWhereInput>;
};

export type SaveCardInput = {
  maskedCardNumber: Scalars['ID']['input'];
  metadata: Scalars['JSON']['input'];
  paymentMethodId: Scalars['ID']['input'];
  tokenId: Scalars['ID']['input'];
};

export type SectionData = FlipEvent | FlipVenue;

export type SendPasswordlessSignInEmailInput = {
  /** android package name */
  androidPackageName?: InputMaybe<Scalars['String']['input']>;
  /** email */
  email: Scalars['String']['input'];
  /** handle code in app */
  handleCodeInApp?: InputMaybe<Scalars['Boolean']['input']>;
  /** ios bundle id */
  iosBundleId?: InputMaybe<Scalars['String']['input']>;
  /** redirect url */
  redirectUrl?: InputMaybe<Scalars['String']['input']>;
};

export type SendSignUpVerificationEmailInput = {
  /** email */
  email: Scalars['String']['input'];
  /** firebase uid */
  id: Scalars['String']['input'];
};

export type SendVerifyAndChangeEmailEmailInput = {
  accessToken: Scalars['String']['input'];
  /** email */
  email: Scalars['String']['input'];
  /** email */
  newEmail: Scalars['String']['input'];
};

export type Shipping_MethodCount = {
  __typename?: 'Shipping_methodCount';
  shipping_method_tax_line: Scalars['Int']['output'];
};

export type Shipping_MethodListRelationFilter = {
  every?: InputMaybe<Shipping_MethodWhereInput>;
  none?: InputMaybe<Shipping_MethodWhereInput>;
  some?: InputMaybe<Shipping_MethodWhereInput>;
};

export type Shipping_MethodNullableRelationFilter = {
  is?: InputMaybe<Shipping_MethodWhereInput>;
  isNot?: InputMaybe<Shipping_MethodWhereInput>;
};

export type Shipping_MethodRelationFilter = {
  is?: InputMaybe<Shipping_MethodWhereInput>;
  isNot?: InputMaybe<Shipping_MethodWhereInput>;
};

export type Shipping_Method_Tax_LineListRelationFilter = {
  every?: InputMaybe<Shipping_Method_Tax_LineWhereInput>;
  none?: InputMaybe<Shipping_Method_Tax_LineWhereInput>;
  some?: InputMaybe<Shipping_Method_Tax_LineWhereInput>;
};

export type Shipping_OptionCount = {
  __typename?: 'Shipping_optionCount';
  custom_shipping_option: Scalars['Int']['output'];
  shipping_method: Scalars['Int']['output'];
  shipping_option_requirement: Scalars['Int']['output'];
  shipping_tax_rate: Scalars['Int']['output'];
};

export type Shipping_OptionListRelationFilter = {
  every?: InputMaybe<Shipping_OptionWhereInput>;
  none?: InputMaybe<Shipping_OptionWhereInput>;
  some?: InputMaybe<Shipping_OptionWhereInput>;
};

export type Shipping_OptionRelationFilter = {
  is?: InputMaybe<Shipping_OptionWhereInput>;
  isNot?: InputMaybe<Shipping_OptionWhereInput>;
};

export type Shipping_Option_RequirementListRelationFilter = {
  every?: InputMaybe<Shipping_Option_RequirementWhereInput>;
  none?: InputMaybe<Shipping_Option_RequirementWhereInput>;
  some?: InputMaybe<Shipping_Option_RequirementWhereInput>;
};

export type Shipping_ProfileCount = {
  __typename?: 'Shipping_profileCount';
  shipping_option: Scalars['Int']['output'];
};

export type Shipping_ProfileRelationFilter = {
  is?: InputMaybe<Shipping_ProfileWhereInput>;
  isNot?: InputMaybe<Shipping_ProfileWhereInput>;
};

export type Shipping_Tax_RateListRelationFilter = {
  every?: InputMaybe<Shipping_Tax_RateWhereInput>;
  none?: InputMaybe<Shipping_Tax_RateWhereInput>;
  some?: InputMaybe<Shipping_Tax_RateWhereInput>;
};

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export type SortOrderInput = {
  nulls?: InputMaybe<NullsOrder>;
  sort: SortOrder;
};

export type StoreCount = {
  __typename?: 'StoreCount';
  store_currencies: Scalars['Int']['output'];
};

export type StoreListRelationFilter = {
  every?: InputMaybe<StoreWhereInput>;
  none?: InputMaybe<StoreWhereInput>;
  some?: InputMaybe<StoreWhereInput>;
};

export type StoreNullableRelationFilter = {
  is?: InputMaybe<StoreWhereInput>;
  isNot?: InputMaybe<StoreWhereInput>;
};

export type StoreRelationFilter = {
  is?: InputMaybe<StoreWhereInput>;
  isNot?: InputMaybe<StoreWhereInput>;
};

export type Store_CurrenciesListRelationFilter = {
  every?: InputMaybe<Store_CurrenciesWhereInput>;
  none?: InputMaybe<Store_CurrenciesWhereInput>;
  some?: InputMaybe<Store_CurrenciesWhereInput>;
};

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type StringNullableFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type StringNullableListFilter = {
  equals?: InputMaybe<Array<Scalars['String']['input']>>;
  has?: InputMaybe<Scalars['String']['input']>;
  hasEvery?: InputMaybe<Array<Scalars['String']['input']>>;
  hasSome?: InputMaybe<Array<Scalars['String']['input']>>;
  isEmpty?: InputMaybe<Scalars['Boolean']['input']>;
};

export type SwapCount = {
  __typename?: 'SwapCount';
  fulfillment: Scalars['Int']['output'];
  line_item: Scalars['Int']['output'];
  shipping_method: Scalars['Int']['output'];
};

export type SwapListRelationFilter = {
  every?: InputMaybe<SwapWhereInput>;
  none?: InputMaybe<SwapWhereInput>;
  some?: InputMaybe<SwapWhereInput>;
};

export type SwapNullableRelationFilter = {
  is?: InputMaybe<SwapWhereInput>;
  isNot?: InputMaybe<SwapWhereInput>;
};

export type Tax_ProviderCount = {
  __typename?: 'Tax_providerCount';
  region: Scalars['Int']['output'];
};

export type Tax_ProviderNullableRelationFilter = {
  is?: InputMaybe<Tax_ProviderWhereInput>;
  isNot?: InputMaybe<Tax_ProviderWhereInput>;
};

export type Tax_RateCount = {
  __typename?: 'Tax_rateCount';
  product_tax_rate: Scalars['Int']['output'];
  product_type_tax_rate: Scalars['Int']['output'];
  shipping_tax_rate: Scalars['Int']['output'];
};

export type Tax_RateListRelationFilter = {
  every?: InputMaybe<Tax_RateWhereInput>;
  none?: InputMaybe<Tax_RateWhereInput>;
  some?: InputMaybe<Tax_RateWhereInput>;
};

export type Tax_RateRelationFilter = {
  is?: InputMaybe<Tax_RateWhereInput>;
  isNot?: InputMaybe<Tax_RateWhereInput>;
};

export enum TemplateEngine {
  Ejs = 'EJS',
  Handlebars = 'HANDLEBARS'
}

export type TicketCheckInCount = {
  __typename?: 'TicketCheckInCount';
  checkedInCount: Scalars['Int']['output'];
  ticketingVariantId: Scalars['String']['output'];
  ticketingVariantName: Scalars['String']['output'];
  totalCount: Scalars['Int']['output'];
};

export type TicketCheckInResult = {
  __typename?: 'TicketCheckInResult';
  checkInNotes?: Maybe<Scalars['String']['output']>;
  checkedInAt?: Maybe<Scalars['DateTime']['output']>;
  checkedInBy?: Maybe<Scalars['String']['output']>;
  checkedInByUser?: Maybe<FlipUser>;
  createdAt: Scalars['DateTime']['output'];
  event: FlipEvent;
  eventId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  owner: FlipUser;
  ownerId: Scalars['String']['output'];
  status: TicketStatus;
  /** @deprecated Deprecated. Use "tier" instead */
  ticketTierId: Scalars['String']['output'];
  ticketingOrderDisplayId?: Maybe<Scalars['String']['output']>;
  ticketingOrderId: Scalars['String']['output'];
  ticketingVariantId: Scalars['String']['output'];
  /** @deprecated Deprecated, incorrect value */
  ticketingVariantName: Scalars['String']['output'];
  tier: FlipTicketTier;
  tierId: Scalars['String']['output'];
  type: TicketType;
  updatedAt: Scalars['DateTime']['output'];
  validationCode: Scalars['String']['output'];
};

export enum TicketStatus {
  Active = 'ACTIVE',
  Canceled = 'CANCELED',
  CheckedIn = 'CHECKED_IN',
  CheckedOut = 'CHECKED_OUT'
}

export enum TicketType {
  GeneralAdmission = 'GENERAL_ADMISSION',
  SeatReservation = 'SEAT_RESERVATION'
}

export type TotalByCity = {
  __typename?: 'TotalByCity';
  count: Scalars['Float']['output'];
  name: Scalars['String']['output'];
};

export type Tracking_LinkListRelationFilter = {
  every?: InputMaybe<Tracking_LinkWhereInput>;
  none?: InputMaybe<Tracking_LinkWhereInput>;
  some?: InputMaybe<Tracking_LinkWhereInput>;
};

export type UpdateCartMetadataInput = {
  cartId: Scalars['ID']['input'];
  metadata: CartMetadataInput;
};

export type UpdateDiscountInput = {
  code: Scalars['String']['input'];
  discountId: Scalars['ID']['input'];
  endsAt?: InputMaybe<Scalars['DateTime']['input']>;
  eventId: Scalars['ID']['input'];
  isDisabled: Scalars['Boolean']['input'];
  organizationId: Scalars['ID']['input'];
  rule: CreateDiscountRuleInput;
  startsAt?: InputMaybe<Scalars['DateTime']['input']>;
  usageLimit?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateEventHoldSeatsRulesInput = {
  eventId: Scalars['ID']['input'];
  holdSeatRules: Scalars['JSON']['input'];
};

export type UpdateEventMemberRoleInput = {
  eventId: Scalars['ID']['input'];
  memberId: Scalars['ID']['input'];
  roleName: RoleName;
};

export type UpdateMemberResponse = {
  __typename?: 'UpdateMemberResponse';
  createdAt: Scalars['DateTime']['output'];
  entityId: Scalars['String']['output'];
  entityType: RoleEntityType;
  id: Scalars['ID']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  roleName: RoleName;
  updatedAt: Scalars['DateTime']['output'];
  user: MemberInfo;
  userId: Scalars['String']['output'];
};

export type UpdateOrganizationMemberRoleInput = {
  memberId: Scalars['ID']['input'];
  organizationId: Scalars['ID']['input'];
  roleName: RoleName;
};

export type UpdatePersonalInfoInput = {
  birthday?: InputMaybe<Scalars['DateTime']['input']>;
  displayName?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Gender>;
  identityNumber?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  profileImageURL?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateTicketTierInput = {
  background?: InputMaybe<Scalars['String']['input']>;
  border?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  eventId: Scalars['ID']['input'];
  initialInventory?: InputMaybe<Scalars['Int']['input']>;
  isVisible?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  organizationId: Scalars['ID']['input'];
  price?: InputMaybe<Scalars['Int']['input']>;
  saleEndAt?: InputMaybe<Scalars['DateTime']['input']>;
  saleStartAt?: InputMaybe<Scalars['DateTime']['input']>;
  ticketTierId: Scalars['ID']['input'];
};

export type UpdateTicketTierInventoryAndHeldInput = {
  eventId: Scalars['ID']['input'];
  organizationId: Scalars['ID']['input'];
  ticketTiers: Array<InventoryAndHeldInput>;
};

export type UpsertEventSeatMapInput = {
  eventId: Scalars['ID']['input'];
  holdSeatRules: Scalars['JSON']['input'];
  seatMapUrl: Scalars['String']['input'];
  tierRules: Scalars['JSON']['input'];
};

export type UpsertOrganizationCheckoutConfigsInput = {
  eventId: Scalars['ID']['input'];
  offlineSalesEnabled: Scalars['Boolean']['input'];
  organizationId: Scalars['ID']['input'];
};

export type UserCount = {
  __typename?: 'UserCount';
  add_on_service: Scalars['Int']['output'];
  batch_job: Scalars['Int']['output'];
  paid_payouts: Scalars['Int']['output'];
  requested_payouts: Scalars['Int']['output'];
};

export type UserNullableRelationFilter = {
  is?: InputMaybe<UserWhereInput>;
  isNot?: InputMaybe<UserWhereInput>;
};

export type UserRelationFilter = {
  is?: InputMaybe<UserWhereInput>;
  isNot?: InputMaybe<UserWhereInput>;
};

export type ValidateSeatsInput = {
  eventId: Scalars['String']['input'];
  seatIds: Array<Scalars['String']['input']>;
};

export type ValidateSeatsResponse = {
  __typename?: 'ValidateSeatsResponse';
  isValid: Scalars['Boolean']['output'];
  message?: Maybe<Scalars['String']['output']>;
};

export type VenueSearchArgs = {
  boundary?: InputMaybe<Boundary>;
  cursor?: InputMaybe<FlipVenueWhereUniqueInput>;
  query?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  /** Section type to fetch */
  type?: InputMaybe<PlacementType>;
  where?: InputMaybe<FlipVenueWhereInput>;
};

export type VenueSearchResult = {
  __typename?: 'VenueSearchResult';
  pageInfo: PageInfo;
  venues: Array<FlipVenue>;
};

export type Ys = {
  __typename?: 'YS';
  data: Array<Scalars['Float']['output']>;
  name: Scalars['String']['output'];
};

export type Add_On_Service = {
  __typename?: 'add_on_service';
  amount: Scalars['Int']['output'];
  created_at: Scalars['DateTime']['output'];
  created_by: Scalars['String']['output'];
  currency: Scalars['String']['output'];
  description: Scalars['String']['output'];
  event_id: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  money_flow: Add_On_Service_Money_Flow_Enum;
  name: Scalars['String']['output'];
  organization_id: Scalars['String']['output'];
  updated_at: Scalars['DateTime']['output'];
  user: User;
};

export type Add_On_ServiceWhereInput = {
  AND?: InputMaybe<Array<Add_On_ServiceWhereInput>>;
  NOT?: InputMaybe<Array<Add_On_ServiceWhereInput>>;
  OR?: InputMaybe<Array<Add_On_ServiceWhereInput>>;
  amount?: InputMaybe<IntFilter>;
  created_at?: InputMaybe<DateTimeFilter>;
  created_by?: InputMaybe<StringFilter>;
  currency?: InputMaybe<StringFilter>;
  description?: InputMaybe<StringFilter>;
  event_id?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  metadata?: InputMaybe<JsonNullableFilter>;
  money_flow?: InputMaybe<Enumadd_On_Service_Money_Flow_EnumFilter>;
  name?: InputMaybe<StringFilter>;
  organization_id?: InputMaybe<StringFilter>;
  updated_at?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserRelationFilter>;
};

export enum Add_On_Service_Money_Flow_Enum {
  In = 'IN',
  Out = 'OUT'
}

export type Address = {
  __typename?: 'address';
  _count: AddressCount;
  address_1?: Maybe<Scalars['String']['output']>;
  address_2?: Maybe<Scalars['String']['output']>;
  cart_cart_billing_address_idToaddress?: Maybe<Array<Cart>>;
  cart_cart_shipping_address_idToaddress?: Maybe<Array<Cart>>;
  city?: Maybe<Scalars['String']['output']>;
  claim_order?: Maybe<Array<Claim_Order>>;
  company?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Country>;
  country_code?: Maybe<Scalars['String']['output']>;
  created_at: Scalars['DateTime']['output'];
  customer_address_customer_idTocustomer?: Maybe<Customer>;
  customer_customer_billing_address_idToaddress?: Maybe<Customer>;
  customer_id?: Maybe<Scalars['String']['output']>;
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  first_name?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  last_name?: Maybe<Scalars['String']['output']>;
  metadata?: Maybe<Scalars['JSON']['output']>;
  order_order_billing_address_idToaddress?: Maybe<Array<Order>>;
  order_order_shipping_address_idToaddress?: Maybe<Array<Order>>;
  phone?: Maybe<Scalars['String']['output']>;
  postal_code?: Maybe<Scalars['String']['output']>;
  province?: Maybe<Scalars['String']['output']>;
  swap?: Maybe<Array<Swap>>;
  updated_at: Scalars['DateTime']['output'];
};

export type AddressWhereInput = {
  AND?: InputMaybe<Array<AddressWhereInput>>;
  NOT?: InputMaybe<Array<AddressWhereInput>>;
  OR?: InputMaybe<Array<AddressWhereInput>>;
  address_1?: InputMaybe<StringNullableFilter>;
  address_2?: InputMaybe<StringNullableFilter>;
  cart_cart_billing_address_idToaddress?: InputMaybe<CartListRelationFilter>;
  cart_cart_shipping_address_idToaddress?: InputMaybe<CartListRelationFilter>;
  city?: InputMaybe<StringNullableFilter>;
  claim_order?: InputMaybe<Claim_OrderListRelationFilter>;
  company?: InputMaybe<StringNullableFilter>;
  country?: InputMaybe<CountryNullableRelationFilter>;
  country_code?: InputMaybe<StringNullableFilter>;
  created_at?: InputMaybe<DateTimeFilter>;
  customer_address_customer_idTocustomer?: InputMaybe<CustomerNullableRelationFilter>;
  customer_customer_billing_address_idToaddress?: InputMaybe<CustomerNullableRelationFilter>;
  customer_id?: InputMaybe<StringNullableFilter>;
  deleted_at?: InputMaybe<DateTimeNullableFilter>;
  first_name?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  last_name?: InputMaybe<StringNullableFilter>;
  metadata?: InputMaybe<JsonNullableFilter>;
  order_order_billing_address_idToaddress?: InputMaybe<OrderListRelationFilter>;
  order_order_shipping_address_idToaddress?: InputMaybe<OrderListRelationFilter>;
  phone?: InputMaybe<StringNullableFilter>;
  postal_code?: InputMaybe<StringNullableFilter>;
  province?: InputMaybe<StringNullableFilter>;
  swap?: InputMaybe<SwapListRelationFilter>;
  updated_at?: InputMaybe<DateTimeFilter>;
};

export type Balance = {
  __typename?: 'balance';
  amount: Scalars['Int']['output'];
  channel_code?: Maybe<Scalars['String']['output']>;
  created_at: Scalars['DateTime']['output'];
  currency: Scalars['String']['output'];
  event_id: Scalars['String']['output'];
  event_wallet_amount_snapshot: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  money_flow: Balance_Transaction_Money_Flow_Enum;
  organization_id: Scalars['String']['output'];
  payment_gateway: Balance_Transaction_Payment_Gateway_Enum;
  reference_id: Scalars['String']['output'];
  transaction_method?: Maybe<Scalars['String']['output']>;
  transaction_type: Balance_Transaction_Type_Enum;
  updated_at: Scalars['DateTime']['output'];
};

export enum Balance_Transaction_Money_Flow_Enum {
  In = 'IN',
  Out = 'OUT'
}

export enum Balance_Transaction_Payment_Gateway_Enum {
  Xendit = 'XENDIT'
}

export enum Balance_Transaction_Type_Enum {
  AddOnService = 'ADD_ON_SERVICE',
  Order = 'ORDER',
  OrderFee = 'ORDER_FEE',
  Payout = 'PAYOUT',
  PayoutReversed = 'PAYOUT_REVERSED',
  RefundOrder = 'REFUND_ORDER',
  RefundOrderFee = 'REFUND_ORDER_FEE'
}

export type Batch_Job = {
  __typename?: 'batch_job';
  canceled_at?: Maybe<Scalars['DateTime']['output']>;
  completed_at?: Maybe<Scalars['DateTime']['output']>;
  confirmed_at?: Maybe<Scalars['DateTime']['output']>;
  context?: Maybe<Scalars['JSON']['output']>;
  created_at: Scalars['DateTime']['output'];
  created_by?: Maybe<Scalars['String']['output']>;
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  dry_run: Scalars['Boolean']['output'];
  failed_at?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  pre_processed_at?: Maybe<Scalars['DateTime']['output']>;
  processing_at?: Maybe<Scalars['DateTime']['output']>;
  result?: Maybe<Scalars['JSON']['output']>;
  type: Scalars['String']['output'];
  updated_at: Scalars['DateTime']['output'];
  user?: Maybe<User>;
};

export type Batch_JobWhereInput = {
  AND?: InputMaybe<Array<Batch_JobWhereInput>>;
  NOT?: InputMaybe<Array<Batch_JobWhereInput>>;
  OR?: InputMaybe<Array<Batch_JobWhereInput>>;
  canceled_at?: InputMaybe<DateTimeNullableFilter>;
  completed_at?: InputMaybe<DateTimeNullableFilter>;
  confirmed_at?: InputMaybe<DateTimeNullableFilter>;
  context?: InputMaybe<JsonNullableFilter>;
  created_at?: InputMaybe<DateTimeFilter>;
  created_by?: InputMaybe<StringNullableFilter>;
  deleted_at?: InputMaybe<DateTimeNullableFilter>;
  dry_run?: InputMaybe<BoolFilter>;
  failed_at?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<StringFilter>;
  pre_processed_at?: InputMaybe<DateTimeNullableFilter>;
  processing_at?: InputMaybe<DateTimeNullableFilter>;
  result?: InputMaybe<JsonNullableFilter>;
  type?: InputMaybe<StringFilter>;
  updated_at?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserNullableRelationFilter>;
};

export type Card = {
  __typename?: 'card';
  created_at: Scalars['DateTime']['output'];
  customer_email: Scalars['String']['output'];
  customer_id: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  masked_card_number: Scalars['String']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  payment_method_id: Scalars['String']['output'];
  token_id: Scalars['String']['output'];
  updated_at: Scalars['DateTime']['output'];
};

export type Cart = {
  __typename?: 'cart';
  _count: CartCount;
  address_cart_billing_address_idToaddress?: Maybe<Address>;
  address_cart_shipping_address_idToaddress?: Maybe<Address>;
  billing_address_id?: Maybe<Scalars['String']['output']>;
  cart_discounts?: Maybe<Array<Cart_Discounts>>;
  cart_gift_cards?: Maybe<Array<Cart_Gift_Cards>>;
  cart_total?: Maybe<Scalars['Int']['output']>;
  completed_at?: Maybe<Scalars['DateTime']['output']>;
  completion_attempt_at?: Maybe<Scalars['DateTime']['output']>;
  context?: Maybe<Scalars['JSON']['output']>;
  created_at: Scalars['DateTime']['output'];
  custom_shipping_option?: Maybe<Array<Custom_Shipping_Option>>;
  customer?: Maybe<Customer>;
  customer_id?: Maybe<Scalars['String']['output']>;
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  display_id: Scalars['String']['output'];
  draft_order?: Maybe<Draft_Order>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  idempotency_key?: Maybe<Scalars['String']['output']>;
  line_item?: Maybe<Array<Line_Item>>;
  metadata?: Maybe<Scalars['JSON']['output']>;
  order?: Maybe<Order>;
  payment_authorized_at?: Maybe<Scalars['DateTime']['output']>;
  payment_cart_payment_idTopayment?: Maybe<Payment>;
  payment_id?: Maybe<Scalars['String']['output']>;
  payment_payment_cart_idTocart?: Maybe<Array<Payment>>;
  payment_session?: Maybe<Array<Payment_Session>>;
  refund?: Maybe<Array<Refund>>;
  refund_status?: Maybe<CartRefundStatus>;
  region: Region;
  region_id: Scalars['String']['output'];
  sales_channel?: Maybe<Sales_Channel>;
  sales_channel_id?: Maybe<Scalars['String']['output']>;
  shipping_address_id?: Maybe<Scalars['String']['output']>;
  shipping_method?: Maybe<Array<Shipping_Method>>;
  swap?: Maybe<Swap>;
  type: Cart_Type_Enum;
  updated_at: Scalars['DateTime']['output'];
};

export type CartWhereInput = {
  AND?: InputMaybe<Array<CartWhereInput>>;
  NOT?: InputMaybe<Array<CartWhereInput>>;
  OR?: InputMaybe<Array<CartWhereInput>>;
  address_cart_billing_address_idToaddress?: InputMaybe<AddressNullableRelationFilter>;
  address_cart_shipping_address_idToaddress?: InputMaybe<AddressNullableRelationFilter>;
  billing_address_id?: InputMaybe<StringNullableFilter>;
  cart_discounts?: InputMaybe<Cart_DiscountsListRelationFilter>;
  cart_gift_cards?: InputMaybe<Cart_Gift_CardsListRelationFilter>;
  cart_total?: InputMaybe<IntNullableFilter>;
  completed_at?: InputMaybe<DateTimeNullableFilter>;
  completion_attempt_at?: InputMaybe<DateTimeNullableFilter>;
  context?: InputMaybe<JsonNullableFilter>;
  created_at?: InputMaybe<DateTimeFilter>;
  custom_shipping_option?: InputMaybe<Custom_Shipping_OptionListRelationFilter>;
  customer?: InputMaybe<CustomerNullableRelationFilter>;
  customer_id?: InputMaybe<StringNullableFilter>;
  deleted_at?: InputMaybe<DateTimeNullableFilter>;
  display_id?: InputMaybe<BigIntFilter>;
  draft_order?: InputMaybe<Draft_OrderNullableRelationFilter>;
  email?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  idempotency_key?: InputMaybe<StringNullableFilter>;
  line_item?: InputMaybe<Line_ItemListRelationFilter>;
  metadata?: InputMaybe<JsonNullableFilter>;
  order?: InputMaybe<OrderNullableRelationFilter>;
  payment_authorized_at?: InputMaybe<DateTimeNullableFilter>;
  payment_cart_payment_idTopayment?: InputMaybe<PaymentNullableRelationFilter>;
  payment_id?: InputMaybe<StringNullableFilter>;
  payment_payment_cart_idTocart?: InputMaybe<PaymentListRelationFilter>;
  payment_session?: InputMaybe<Payment_SessionListRelationFilter>;
  refund?: InputMaybe<RefundListRelationFilter>;
  refund_status?: InputMaybe<EnumCartRefundStatusNullableFilter>;
  region?: InputMaybe<RegionRelationFilter>;
  region_id?: InputMaybe<StringFilter>;
  sales_channel?: InputMaybe<Sales_ChannelNullableRelationFilter>;
  sales_channel_id?: InputMaybe<StringNullableFilter>;
  shipping_address_id?: InputMaybe<StringNullableFilter>;
  shipping_method?: InputMaybe<Shipping_MethodListRelationFilter>;
  swap?: InputMaybe<SwapNullableRelationFilter>;
  type?: InputMaybe<Enumcart_Type_EnumFilter>;
  updated_at?: InputMaybe<DateTimeFilter>;
};

export type Cart_Discounts = {
  __typename?: 'cart_discounts';
  cart: Cart;
  cart_id: Scalars['String']['output'];
  discount: Discount;
  discount_id: Scalars['String']['output'];
};

export type Cart_DiscountsWhereInput = {
  AND?: InputMaybe<Array<Cart_DiscountsWhereInput>>;
  NOT?: InputMaybe<Array<Cart_DiscountsWhereInput>>;
  OR?: InputMaybe<Array<Cart_DiscountsWhereInput>>;
  cart?: InputMaybe<CartRelationFilter>;
  cart_id?: InputMaybe<StringFilter>;
  discount?: InputMaybe<DiscountRelationFilter>;
  discount_id?: InputMaybe<StringFilter>;
};

export type Cart_Gift_Cards = {
  __typename?: 'cart_gift_cards';
  cart: Cart;
  cart_id: Scalars['String']['output'];
  gift_card: Gift_Card;
  gift_card_id: Scalars['String']['output'];
};

export type Cart_Gift_CardsWhereInput = {
  AND?: InputMaybe<Array<Cart_Gift_CardsWhereInput>>;
  NOT?: InputMaybe<Array<Cart_Gift_CardsWhereInput>>;
  OR?: InputMaybe<Array<Cart_Gift_CardsWhereInput>>;
  cart?: InputMaybe<CartRelationFilter>;
  cart_id?: InputMaybe<StringFilter>;
  gift_card?: InputMaybe<Gift_CardRelationFilter>;
  gift_card_id?: InputMaybe<StringFilter>;
};

export enum Cart_Type_Enum {
  Claim = 'claim',
  Default = 'default',
  DraftOrder = 'draft_order',
  PaymentLink = 'payment_link',
  Swap = 'swap'
}

export type Claim_Image = {
  __typename?: 'claim_image';
  claim_item: Claim_Item;
  claim_item_id: Scalars['String']['output'];
  created_at: Scalars['DateTime']['output'];
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  updated_at: Scalars['DateTime']['output'];
  url: Scalars['String']['output'];
};

export type Claim_ImageWhereInput = {
  AND?: InputMaybe<Array<Claim_ImageWhereInput>>;
  NOT?: InputMaybe<Array<Claim_ImageWhereInput>>;
  OR?: InputMaybe<Array<Claim_ImageWhereInput>>;
  claim_item?: InputMaybe<Claim_ItemRelationFilter>;
  claim_item_id?: InputMaybe<StringFilter>;
  created_at?: InputMaybe<DateTimeFilter>;
  deleted_at?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<StringFilter>;
  metadata?: InputMaybe<JsonNullableFilter>;
  updated_at?: InputMaybe<DateTimeFilter>;
  url?: InputMaybe<StringFilter>;
};

export type Claim_Item = {
  __typename?: 'claim_item';
  _count: Claim_ItemCount;
  claim_image?: Maybe<Array<Claim_Image>>;
  claim_item_tags?: Maybe<Array<Claim_Item_Tags>>;
  claim_order: Claim_Order;
  claim_order_id: Scalars['String']['output'];
  created_at: Scalars['DateTime']['output'];
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  item_id: Scalars['String']['output'];
  line_item: Line_Item;
  metadata?: Maybe<Scalars['JSON']['output']>;
  note?: Maybe<Scalars['String']['output']>;
  product_variant: Product_Variant;
  quantity: Scalars['Int']['output'];
  reason: Claim_Item_Reason_Enum;
  updated_at: Scalars['DateTime']['output'];
  variant_id: Scalars['String']['output'];
};

export type Claim_ItemWhereInput = {
  AND?: InputMaybe<Array<Claim_ItemWhereInput>>;
  NOT?: InputMaybe<Array<Claim_ItemWhereInput>>;
  OR?: InputMaybe<Array<Claim_ItemWhereInput>>;
  claim_image?: InputMaybe<Claim_ImageListRelationFilter>;
  claim_item_tags?: InputMaybe<Claim_Item_TagsListRelationFilter>;
  claim_order?: InputMaybe<Claim_OrderRelationFilter>;
  claim_order_id?: InputMaybe<StringFilter>;
  created_at?: InputMaybe<DateTimeFilter>;
  deleted_at?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<StringFilter>;
  item_id?: InputMaybe<StringFilter>;
  line_item?: InputMaybe<Line_ItemRelationFilter>;
  metadata?: InputMaybe<JsonNullableFilter>;
  note?: InputMaybe<StringNullableFilter>;
  product_variant?: InputMaybe<Product_VariantRelationFilter>;
  quantity?: InputMaybe<IntFilter>;
  reason?: InputMaybe<Enumclaim_Item_Reason_EnumFilter>;
  updated_at?: InputMaybe<DateTimeFilter>;
  variant_id?: InputMaybe<StringFilter>;
};

export enum Claim_Item_Reason_Enum {
  MissingItem = 'missing_item',
  Other = 'other',
  ProductionFailure = 'production_failure',
  WrongItem = 'wrong_item'
}

export type Claim_Item_Tags = {
  __typename?: 'claim_item_tags';
  claim_item: Claim_Item;
  claim_tag: Claim_Tag;
  item_id: Scalars['String']['output'];
  tag_id: Scalars['String']['output'];
};

export type Claim_Item_TagsWhereInput = {
  AND?: InputMaybe<Array<Claim_Item_TagsWhereInput>>;
  NOT?: InputMaybe<Array<Claim_Item_TagsWhereInput>>;
  OR?: InputMaybe<Array<Claim_Item_TagsWhereInput>>;
  claim_item?: InputMaybe<Claim_ItemRelationFilter>;
  claim_tag?: InputMaybe<Claim_TagRelationFilter>;
  item_id?: InputMaybe<StringFilter>;
  tag_id?: InputMaybe<StringFilter>;
};

export type Claim_Order = {
  __typename?: 'claim_order';
  Renamedreturn?: Maybe<Renamedreturn>;
  _count: Claim_OrderCount;
  address?: Maybe<Address>;
  canceled_at?: Maybe<Scalars['DateTime']['output']>;
  claim_item?: Maybe<Array<Claim_Item>>;
  created_at: Scalars['DateTime']['output'];
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  fulfillment?: Maybe<Array<Fulfillment>>;
  fulfillment_status: Claim_Order_Fulfillment_Status_Enum;
  id: Scalars['ID']['output'];
  idempotency_key?: Maybe<Scalars['String']['output']>;
  line_item?: Maybe<Array<Line_Item>>;
  metadata?: Maybe<Scalars['JSON']['output']>;
  no_notification?: Maybe<Scalars['Boolean']['output']>;
  order: Order;
  order_id: Scalars['String']['output'];
  payment_status: Claim_Order_Payment_Status_Enum;
  refund_amount?: Maybe<Scalars['Int']['output']>;
  shipping_address_id?: Maybe<Scalars['String']['output']>;
  shipping_method?: Maybe<Array<Shipping_Method>>;
  type: Claim_Order_Type_Enum;
  updated_at: Scalars['DateTime']['output'];
};

export type Claim_OrderWhereInput = {
  AND?: InputMaybe<Array<Claim_OrderWhereInput>>;
  NOT?: InputMaybe<Array<Claim_OrderWhereInput>>;
  OR?: InputMaybe<Array<Claim_OrderWhereInput>>;
  Renamedreturn?: InputMaybe<RenamedreturnNullableRelationFilter>;
  address?: InputMaybe<AddressNullableRelationFilter>;
  canceled_at?: InputMaybe<DateTimeNullableFilter>;
  claim_item?: InputMaybe<Claim_ItemListRelationFilter>;
  created_at?: InputMaybe<DateTimeFilter>;
  deleted_at?: InputMaybe<DateTimeNullableFilter>;
  fulfillment?: InputMaybe<FulfillmentListRelationFilter>;
  fulfillment_status?: InputMaybe<Enumclaim_Order_Fulfillment_Status_EnumFilter>;
  id?: InputMaybe<StringFilter>;
  idempotency_key?: InputMaybe<StringNullableFilter>;
  line_item?: InputMaybe<Line_ItemListRelationFilter>;
  metadata?: InputMaybe<JsonNullableFilter>;
  no_notification?: InputMaybe<BoolNullableFilter>;
  order?: InputMaybe<OrderRelationFilter>;
  order_id?: InputMaybe<StringFilter>;
  payment_status?: InputMaybe<Enumclaim_Order_Payment_Status_EnumFilter>;
  refund_amount?: InputMaybe<IntNullableFilter>;
  shipping_address_id?: InputMaybe<StringNullableFilter>;
  shipping_method?: InputMaybe<Shipping_MethodListRelationFilter>;
  type?: InputMaybe<Enumclaim_Order_Type_EnumFilter>;
  updated_at?: InputMaybe<DateTimeFilter>;
};

export enum Claim_Order_Fulfillment_Status_Enum {
  Canceled = 'canceled',
  Fulfilled = 'fulfilled',
  NotFulfilled = 'not_fulfilled',
  PartiallyFulfilled = 'partially_fulfilled',
  PartiallyReturned = 'partially_returned',
  PartiallyShipped = 'partially_shipped',
  RequiresAction = 'requires_action',
  Returned = 'returned',
  Shipped = 'shipped'
}

export enum Claim_Order_Payment_Status_Enum {
  Na = 'na',
  NotRefunded = 'not_refunded',
  Refunded = 'refunded'
}

export enum Claim_Order_Type_Enum {
  Refund = 'refund',
  Replace = 'replace'
}

export type Claim_Tag = {
  __typename?: 'claim_tag';
  _count: Claim_TagCount;
  claim_item_tags?: Maybe<Array<Claim_Item_Tags>>;
  created_at: Scalars['DateTime']['output'];
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  updated_at: Scalars['DateTime']['output'];
  value: Scalars['String']['output'];
};

export type Claim_TagWhereInput = {
  AND?: InputMaybe<Array<Claim_TagWhereInput>>;
  NOT?: InputMaybe<Array<Claim_TagWhereInput>>;
  OR?: InputMaybe<Array<Claim_TagWhereInput>>;
  claim_item_tags?: InputMaybe<Claim_Item_TagsListRelationFilter>;
  created_at?: InputMaybe<DateTimeFilter>;
  deleted_at?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<StringFilter>;
  metadata?: InputMaybe<JsonNullableFilter>;
  updated_at?: InputMaybe<DateTimeFilter>;
  value?: InputMaybe<StringFilter>;
};

export type Country = {
  __typename?: 'country';
  _count: CountryCount;
  address?: Maybe<Array<Address>>;
  display_name: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  iso_2: Scalars['String']['output'];
  iso_3: Scalars['String']['output'];
  name: Scalars['String']['output'];
  num_code: Scalars['Int']['output'];
  region?: Maybe<Region>;
  region_id?: Maybe<Scalars['String']['output']>;
};

export type CountryWhereInput = {
  AND?: InputMaybe<Array<CountryWhereInput>>;
  NOT?: InputMaybe<Array<CountryWhereInput>>;
  OR?: InputMaybe<Array<CountryWhereInput>>;
  address?: InputMaybe<AddressListRelationFilter>;
  display_name?: InputMaybe<StringFilter>;
  id?: InputMaybe<IntFilter>;
  iso_2?: InputMaybe<StringFilter>;
  iso_3?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  num_code?: InputMaybe<IntFilter>;
  region?: InputMaybe<RegionNullableRelationFilter>;
  region_id?: InputMaybe<StringNullableFilter>;
};

export type Currency = {
  __typename?: 'currency';
  _count: CurrencyCount;
  code: Scalars['ID']['output'];
  money_amount?: Maybe<Array<Money_Amount>>;
  name: Scalars['String']['output'];
  order?: Maybe<Array<Order>>;
  payment?: Maybe<Array<Payment>>;
  region?: Maybe<Array<Region>>;
  store?: Maybe<Array<Store>>;
  store_currencies?: Maybe<Array<Store_Currencies>>;
  symbol: Scalars['String']['output'];
  symbol_native: Scalars['String']['output'];
};

export type CurrencyWhereInput = {
  AND?: InputMaybe<Array<CurrencyWhereInput>>;
  NOT?: InputMaybe<Array<CurrencyWhereInput>>;
  OR?: InputMaybe<Array<CurrencyWhereInput>>;
  code?: InputMaybe<StringFilter>;
  money_amount?: InputMaybe<Money_AmountListRelationFilter>;
  name?: InputMaybe<StringFilter>;
  order?: InputMaybe<OrderListRelationFilter>;
  payment?: InputMaybe<PaymentListRelationFilter>;
  region?: InputMaybe<RegionListRelationFilter>;
  store?: InputMaybe<StoreListRelationFilter>;
  store_currencies?: InputMaybe<Store_CurrenciesListRelationFilter>;
  symbol?: InputMaybe<StringFilter>;
  symbol_native?: InputMaybe<StringFilter>;
};

export type Custom_Shipping_Option = {
  __typename?: 'custom_shipping_option';
  cart?: Maybe<Cart>;
  cart_id?: Maybe<Scalars['String']['output']>;
  created_at: Scalars['DateTime']['output'];
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  price: Scalars['Int']['output'];
  shipping_option: Shipping_Option;
  shipping_option_id: Scalars['String']['output'];
  updated_at: Scalars['DateTime']['output'];
};

export type Custom_Shipping_OptionWhereInput = {
  AND?: InputMaybe<Array<Custom_Shipping_OptionWhereInput>>;
  NOT?: InputMaybe<Array<Custom_Shipping_OptionWhereInput>>;
  OR?: InputMaybe<Array<Custom_Shipping_OptionWhereInput>>;
  cart?: InputMaybe<CartNullableRelationFilter>;
  cart_id?: InputMaybe<StringNullableFilter>;
  created_at?: InputMaybe<DateTimeFilter>;
  deleted_at?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<StringFilter>;
  metadata?: InputMaybe<JsonNullableFilter>;
  price?: InputMaybe<IntFilter>;
  shipping_option?: InputMaybe<Shipping_OptionRelationFilter>;
  shipping_option_id?: InputMaybe<StringFilter>;
  updated_at?: InputMaybe<DateTimeFilter>;
};

export type Customer = {
  __typename?: 'customer';
  _count: CustomerCount;
  address_address_customer_idTocustomer?: Maybe<Array<Address>>;
  address_customer_billing_address_idToaddress?: Maybe<Address>;
  billing_address_id?: Maybe<Scalars['String']['output']>;
  cart?: Maybe<Array<Cart>>;
  created_at: Scalars['DateTime']['output'];
  customer_group_customers?: Maybe<Array<Customer_Group_Customers>>;
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  first_name?: Maybe<Scalars['String']['output']>;
  has_account: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  last_name?: Maybe<Scalars['String']['output']>;
  metadata?: Maybe<Scalars['JSON']['output']>;
  notification?: Maybe<Array<Notification>>;
  order?: Maybe<Array<Order>>;
  password_hash?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  updated_at: Scalars['DateTime']['output'];
};

export type CustomerWhereInput = {
  AND?: InputMaybe<Array<CustomerWhereInput>>;
  NOT?: InputMaybe<Array<CustomerWhereInput>>;
  OR?: InputMaybe<Array<CustomerWhereInput>>;
  address_address_customer_idTocustomer?: InputMaybe<AddressListRelationFilter>;
  address_customer_billing_address_idToaddress?: InputMaybe<AddressNullableRelationFilter>;
  billing_address_id?: InputMaybe<StringNullableFilter>;
  cart?: InputMaybe<CartListRelationFilter>;
  created_at?: InputMaybe<DateTimeFilter>;
  customer_group_customers?: InputMaybe<Customer_Group_CustomersListRelationFilter>;
  deleted_at?: InputMaybe<DateTimeNullableFilter>;
  email?: InputMaybe<StringFilter>;
  first_name?: InputMaybe<StringNullableFilter>;
  has_account?: InputMaybe<BoolFilter>;
  id?: InputMaybe<StringFilter>;
  last_name?: InputMaybe<StringNullableFilter>;
  metadata?: InputMaybe<JsonNullableFilter>;
  notification?: InputMaybe<NotificationListRelationFilter>;
  order?: InputMaybe<OrderListRelationFilter>;
  password_hash?: InputMaybe<StringNullableFilter>;
  phone?: InputMaybe<StringNullableFilter>;
  updated_at?: InputMaybe<DateTimeFilter>;
};

export type Customer_Group = {
  __typename?: 'customer_group';
  _count: Customer_GroupCount;
  created_at: Scalars['DateTime']['output'];
  customer_group_customers?: Maybe<Array<Customer_Group_Customers>>;
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  discount_condition_customer_group?: Maybe<Array<Discount_Condition_Customer_Group>>;
  id: Scalars['ID']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  name: Scalars['String']['output'];
  price_list_customer_groups?: Maybe<Array<Price_List_Customer_Groups>>;
  updated_at: Scalars['DateTime']['output'];
};

export type Customer_GroupWhereInput = {
  AND?: InputMaybe<Array<Customer_GroupWhereInput>>;
  NOT?: InputMaybe<Array<Customer_GroupWhereInput>>;
  OR?: InputMaybe<Array<Customer_GroupWhereInput>>;
  created_at?: InputMaybe<DateTimeFilter>;
  customer_group_customers?: InputMaybe<Customer_Group_CustomersListRelationFilter>;
  deleted_at?: InputMaybe<DateTimeNullableFilter>;
  discount_condition_customer_group?: InputMaybe<Discount_Condition_Customer_GroupListRelationFilter>;
  id?: InputMaybe<StringFilter>;
  metadata?: InputMaybe<JsonNullableFilter>;
  name?: InputMaybe<StringFilter>;
  price_list_customer_groups?: InputMaybe<Price_List_Customer_GroupsListRelationFilter>;
  updated_at?: InputMaybe<DateTimeFilter>;
};

export type Customer_Group_Customers = {
  __typename?: 'customer_group_customers';
  customer: Customer;
  customer_group: Customer_Group;
  customer_group_id: Scalars['String']['output'];
  customer_id: Scalars['String']['output'];
};

export type Customer_Group_CustomersWhereInput = {
  AND?: InputMaybe<Array<Customer_Group_CustomersWhereInput>>;
  NOT?: InputMaybe<Array<Customer_Group_CustomersWhereInput>>;
  OR?: InputMaybe<Array<Customer_Group_CustomersWhereInput>>;
  customer?: InputMaybe<CustomerRelationFilter>;
  customer_group?: InputMaybe<Customer_GroupRelationFilter>;
  customer_group_id?: InputMaybe<StringFilter>;
  customer_id?: InputMaybe<StringFilter>;
};

export type Discount = {
  __typename?: 'discount';
  _count: DiscountCount;
  cart_discounts?: Maybe<Array<Cart_Discounts>>;
  code: Scalars['String']['output'];
  created_at: Scalars['DateTime']['output'];
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  discount?: Maybe<Discount>;
  discount_regions?: Maybe<Array<Discount_Regions>>;
  discount_rule?: Maybe<Discount_Rule>;
  ends_at?: Maybe<Scalars['DateTime']['output']>;
  event_id?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  is_disabled: Scalars['Boolean']['output'];
  is_dynamic: Scalars['Boolean']['output'];
  line_item_adjustment?: Maybe<Array<Line_Item_Adjustment>>;
  metadata?: Maybe<Scalars['JSON']['output']>;
  order_discounts?: Maybe<Array<Order_Discounts>>;
  organization_id?: Maybe<Scalars['String']['output']>;
  other_discount?: Maybe<Array<Discount>>;
  parent_discount_id?: Maybe<Scalars['String']['output']>;
  rule_id?: Maybe<Scalars['String']['output']>;
  starts_at: Scalars['DateTime']['output'];
  type: Discount_Type_Enum;
  updated_at: Scalars['DateTime']['output'];
  usage_count: Scalars['Int']['output'];
  usage_count_by_ticket: Scalars['Int']['output'];
  usage_limit?: Maybe<Scalars['Int']['output']>;
  valid_duration?: Maybe<Scalars['String']['output']>;
};

export type DiscountWhereInput = {
  AND?: InputMaybe<Array<DiscountWhereInput>>;
  NOT?: InputMaybe<Array<DiscountWhereInput>>;
  OR?: InputMaybe<Array<DiscountWhereInput>>;
  cart_discounts?: InputMaybe<Cart_DiscountsListRelationFilter>;
  code?: InputMaybe<StringFilter>;
  created_at?: InputMaybe<DateTimeFilter>;
  deleted_at?: InputMaybe<DateTimeNullableFilter>;
  discount?: InputMaybe<DiscountNullableRelationFilter>;
  discount_regions?: InputMaybe<Discount_RegionsListRelationFilter>;
  discount_rule?: InputMaybe<Discount_RuleNullableRelationFilter>;
  ends_at?: InputMaybe<DateTimeNullableFilter>;
  event_id?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  is_disabled?: InputMaybe<BoolFilter>;
  is_dynamic?: InputMaybe<BoolFilter>;
  line_item_adjustment?: InputMaybe<Line_Item_AdjustmentListRelationFilter>;
  metadata?: InputMaybe<JsonNullableFilter>;
  order_discounts?: InputMaybe<Order_DiscountsListRelationFilter>;
  organization_id?: InputMaybe<StringNullableFilter>;
  other_discount?: InputMaybe<DiscountListRelationFilter>;
  parent_discount_id?: InputMaybe<StringNullableFilter>;
  rule_id?: InputMaybe<StringNullableFilter>;
  starts_at?: InputMaybe<DateTimeFilter>;
  type?: InputMaybe<Enumdiscount_Type_EnumFilter>;
  updated_at?: InputMaybe<DateTimeFilter>;
  usage_count?: InputMaybe<IntFilter>;
  usage_count_by_ticket?: InputMaybe<IntFilter>;
  usage_limit?: InputMaybe<IntNullableFilter>;
  valid_duration?: InputMaybe<StringNullableFilter>;
};

export type Discount_Condition = {
  __typename?: 'discount_condition';
  _count: Discount_ConditionCount;
  created_at: Scalars['DateTime']['output'];
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  discount_condition_customer_group?: Maybe<Array<Discount_Condition_Customer_Group>>;
  discount_condition_product?: Maybe<Array<Discount_Condition_Product>>;
  discount_condition_product_collection?: Maybe<Array<Discount_Condition_Product_Collection>>;
  discount_condition_product_tag?: Maybe<Array<Discount_Condition_Product_Tag>>;
  discount_condition_product_type?: Maybe<Array<Discount_Condition_Product_Type>>;
  discount_rule: Discount_Rule;
  discount_rule_id: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  operator: Discount_Condition_Operator_Enum;
  type: Discount_Condition_Type_Enum;
  updated_at: Scalars['DateTime']['output'];
};

export type Discount_ConditionWhereInput = {
  AND?: InputMaybe<Array<Discount_ConditionWhereInput>>;
  NOT?: InputMaybe<Array<Discount_ConditionWhereInput>>;
  OR?: InputMaybe<Array<Discount_ConditionWhereInput>>;
  created_at?: InputMaybe<DateTimeFilter>;
  deleted_at?: InputMaybe<DateTimeNullableFilter>;
  discount_condition_customer_group?: InputMaybe<Discount_Condition_Customer_GroupListRelationFilter>;
  discount_condition_product?: InputMaybe<Discount_Condition_ProductListRelationFilter>;
  discount_condition_product_collection?: InputMaybe<Discount_Condition_Product_CollectionListRelationFilter>;
  discount_condition_product_tag?: InputMaybe<Discount_Condition_Product_TagListRelationFilter>;
  discount_condition_product_type?: InputMaybe<Discount_Condition_Product_TypeListRelationFilter>;
  discount_rule?: InputMaybe<Discount_RuleRelationFilter>;
  discount_rule_id?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  metadata?: InputMaybe<JsonNullableFilter>;
  operator?: InputMaybe<Enumdiscount_Condition_Operator_EnumFilter>;
  type?: InputMaybe<Enumdiscount_Condition_Type_EnumFilter>;
  updated_at?: InputMaybe<DateTimeFilter>;
};

export type Discount_Condition_Customer_Group = {
  __typename?: 'discount_condition_customer_group';
  condition_id: Scalars['String']['output'];
  created_at: Scalars['DateTime']['output'];
  customer_group: Customer_Group;
  customer_group_id: Scalars['String']['output'];
  discount_condition: Discount_Condition;
  metadata?: Maybe<Scalars['JSON']['output']>;
  updated_at: Scalars['DateTime']['output'];
};

export type Discount_Condition_Customer_GroupWhereInput = {
  AND?: InputMaybe<Array<Discount_Condition_Customer_GroupWhereInput>>;
  NOT?: InputMaybe<Array<Discount_Condition_Customer_GroupWhereInput>>;
  OR?: InputMaybe<Array<Discount_Condition_Customer_GroupWhereInput>>;
  condition_id?: InputMaybe<StringFilter>;
  created_at?: InputMaybe<DateTimeFilter>;
  customer_group?: InputMaybe<Customer_GroupRelationFilter>;
  customer_group_id?: InputMaybe<StringFilter>;
  discount_condition?: InputMaybe<Discount_ConditionRelationFilter>;
  metadata?: InputMaybe<JsonNullableFilter>;
  updated_at?: InputMaybe<DateTimeFilter>;
};

export enum Discount_Condition_Operator_Enum {
  In = 'in',
  NotIn = 'not_in'
}

export type Discount_Condition_Product = {
  __typename?: 'discount_condition_product';
  condition_id: Scalars['String']['output'];
  created_at: Scalars['DateTime']['output'];
  discount_condition: Discount_Condition;
  metadata?: Maybe<Scalars['JSON']['output']>;
  product: Product;
  product_id: Scalars['String']['output'];
  updated_at: Scalars['DateTime']['output'];
};

export type Discount_Condition_ProductOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type Discount_Condition_ProductWhereInput = {
  AND?: InputMaybe<Array<Discount_Condition_ProductWhereInput>>;
  NOT?: InputMaybe<Array<Discount_Condition_ProductWhereInput>>;
  OR?: InputMaybe<Array<Discount_Condition_ProductWhereInput>>;
  condition_id?: InputMaybe<StringFilter>;
  created_at?: InputMaybe<DateTimeFilter>;
  discount_condition?: InputMaybe<Discount_ConditionRelationFilter>;
  metadata?: InputMaybe<JsonNullableFilter>;
  product?: InputMaybe<ProductRelationFilter>;
  product_id?: InputMaybe<StringFilter>;
  updated_at?: InputMaybe<DateTimeFilter>;
};

export type Discount_Condition_Product_Collection = {
  __typename?: 'discount_condition_product_collection';
  condition_id: Scalars['String']['output'];
  created_at: Scalars['DateTime']['output'];
  discount_condition: Discount_Condition;
  metadata?: Maybe<Scalars['JSON']['output']>;
  product_collection: Product_Collection;
  product_collection_id: Scalars['String']['output'];
  updated_at: Scalars['DateTime']['output'];
};

export type Discount_Condition_Product_CollectionOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type Discount_Condition_Product_CollectionWhereInput = {
  AND?: InputMaybe<Array<Discount_Condition_Product_CollectionWhereInput>>;
  NOT?: InputMaybe<Array<Discount_Condition_Product_CollectionWhereInput>>;
  OR?: InputMaybe<Array<Discount_Condition_Product_CollectionWhereInput>>;
  condition_id?: InputMaybe<StringFilter>;
  created_at?: InputMaybe<DateTimeFilter>;
  discount_condition?: InputMaybe<Discount_ConditionRelationFilter>;
  metadata?: InputMaybe<JsonNullableFilter>;
  product_collection?: InputMaybe<Product_CollectionRelationFilter>;
  product_collection_id?: InputMaybe<StringFilter>;
  updated_at?: InputMaybe<DateTimeFilter>;
};

export type Discount_Condition_Product_Tag = {
  __typename?: 'discount_condition_product_tag';
  condition_id: Scalars['String']['output'];
  created_at: Scalars['DateTime']['output'];
  discount_condition: Discount_Condition;
  metadata?: Maybe<Scalars['JSON']['output']>;
  product_tag: Product_Tag;
  product_tag_id: Scalars['String']['output'];
  updated_at: Scalars['DateTime']['output'];
};

export type Discount_Condition_Product_TagWhereInput = {
  AND?: InputMaybe<Array<Discount_Condition_Product_TagWhereInput>>;
  NOT?: InputMaybe<Array<Discount_Condition_Product_TagWhereInput>>;
  OR?: InputMaybe<Array<Discount_Condition_Product_TagWhereInput>>;
  condition_id?: InputMaybe<StringFilter>;
  created_at?: InputMaybe<DateTimeFilter>;
  discount_condition?: InputMaybe<Discount_ConditionRelationFilter>;
  metadata?: InputMaybe<JsonNullableFilter>;
  product_tag?: InputMaybe<Product_TagRelationFilter>;
  product_tag_id?: InputMaybe<StringFilter>;
  updated_at?: InputMaybe<DateTimeFilter>;
};

export type Discount_Condition_Product_Type = {
  __typename?: 'discount_condition_product_type';
  condition_id: Scalars['String']['output'];
  created_at: Scalars['DateTime']['output'];
  discount_condition: Discount_Condition;
  metadata?: Maybe<Scalars['JSON']['output']>;
  product_type: Product_Type;
  product_type_id: Scalars['String']['output'];
  updated_at: Scalars['DateTime']['output'];
};

export type Discount_Condition_Product_TypeOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type Discount_Condition_Product_TypeWhereInput = {
  AND?: InputMaybe<Array<Discount_Condition_Product_TypeWhereInput>>;
  NOT?: InputMaybe<Array<Discount_Condition_Product_TypeWhereInput>>;
  OR?: InputMaybe<Array<Discount_Condition_Product_TypeWhereInput>>;
  condition_id?: InputMaybe<StringFilter>;
  created_at?: InputMaybe<DateTimeFilter>;
  discount_condition?: InputMaybe<Discount_ConditionRelationFilter>;
  metadata?: InputMaybe<JsonNullableFilter>;
  product_type?: InputMaybe<Product_TypeRelationFilter>;
  product_type_id?: InputMaybe<StringFilter>;
  updated_at?: InputMaybe<DateTimeFilter>;
};

export enum Discount_Condition_Type_Enum {
  CustomerGroups = 'customer_groups',
  ProductCollections = 'product_collections',
  ProductTags = 'product_tags',
  ProductTypes = 'product_types',
  Products = 'products'
}

export type Discount_Regions = {
  __typename?: 'discount_regions';
  discount: Discount;
  discount_id: Scalars['String']['output'];
  region: Region;
  region_id: Scalars['String']['output'];
};

export type Discount_RegionsWhereInput = {
  AND?: InputMaybe<Array<Discount_RegionsWhereInput>>;
  NOT?: InputMaybe<Array<Discount_RegionsWhereInput>>;
  OR?: InputMaybe<Array<Discount_RegionsWhereInput>>;
  discount?: InputMaybe<DiscountRelationFilter>;
  discount_id?: InputMaybe<StringFilter>;
  region?: InputMaybe<RegionRelationFilter>;
  region_id?: InputMaybe<StringFilter>;
};

export type Discount_Rule = {
  __typename?: 'discount_rule';
  _count: Discount_RuleCount;
  allocation?: Maybe<Discount_Rule_Allocation_Enum>;
  created_at: Scalars['DateTime']['output'];
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  discount?: Maybe<Array<Discount>>;
  discount_condition?: Maybe<Array<Discount_Condition>>;
  discount_rule_products?: Maybe<Array<Discount_Rule_Products>>;
  id: Scalars['ID']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  type: Discount_Rule_Type_Enum;
  updated_at: Scalars['DateTime']['output'];
  value: Scalars['Int']['output'];
};

export type Discount_RuleWhereInput = {
  AND?: InputMaybe<Array<Discount_RuleWhereInput>>;
  NOT?: InputMaybe<Array<Discount_RuleWhereInput>>;
  OR?: InputMaybe<Array<Discount_RuleWhereInput>>;
  allocation?: InputMaybe<Enumdiscount_Rule_Allocation_EnumNullableFilter>;
  created_at?: InputMaybe<DateTimeFilter>;
  deleted_at?: InputMaybe<DateTimeNullableFilter>;
  description?: InputMaybe<StringNullableFilter>;
  discount?: InputMaybe<DiscountListRelationFilter>;
  discount_condition?: InputMaybe<Discount_ConditionListRelationFilter>;
  discount_rule_products?: InputMaybe<Discount_Rule_ProductsListRelationFilter>;
  id?: InputMaybe<StringFilter>;
  metadata?: InputMaybe<JsonNullableFilter>;
  type?: InputMaybe<Enumdiscount_Rule_Type_EnumFilter>;
  updated_at?: InputMaybe<DateTimeFilter>;
  value?: InputMaybe<IntFilter>;
};

export enum Discount_Rule_Allocation_Enum {
  Item = 'item',
  Total = 'total'
}

export type Discount_Rule_Products = {
  __typename?: 'discount_rule_products';
  discount_rule: Discount_Rule;
  discount_rule_id: Scalars['String']['output'];
  product: Product;
  product_id: Scalars['String']['output'];
};

export type Discount_Rule_ProductsOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type Discount_Rule_ProductsWhereInput = {
  AND?: InputMaybe<Array<Discount_Rule_ProductsWhereInput>>;
  NOT?: InputMaybe<Array<Discount_Rule_ProductsWhereInput>>;
  OR?: InputMaybe<Array<Discount_Rule_ProductsWhereInput>>;
  discount_rule?: InputMaybe<Discount_RuleRelationFilter>;
  discount_rule_id?: InputMaybe<StringFilter>;
  product?: InputMaybe<ProductRelationFilter>;
  product_id?: InputMaybe<StringFilter>;
};

export enum Discount_Rule_Type_Enum {
  Fixed = 'fixed',
  FreeShipping = 'free_shipping',
  Percentage = 'percentage'
}

export enum Discount_Type_Enum {
  DiscountCode = 'DISCOUNT_CODE',
  OfflineSaleCode = 'OFFLINE_SALE_CODE'
}

export type Draft_Order = {
  __typename?: 'draft_order';
  canceled_at?: Maybe<Scalars['DateTime']['output']>;
  cart?: Maybe<Cart>;
  cart_id?: Maybe<Scalars['String']['output']>;
  completed_at?: Maybe<Scalars['DateTime']['output']>;
  created_at: Scalars['DateTime']['output'];
  display_id: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  idempotency_key?: Maybe<Scalars['String']['output']>;
  metadata?: Maybe<Scalars['JSON']['output']>;
  no_notification_order?: Maybe<Scalars['Boolean']['output']>;
  order_draft_order_order_idToorder?: Maybe<Order>;
  order_id?: Maybe<Scalars['String']['output']>;
  order_order_draft_order_idTodraft_order?: Maybe<Order>;
  status: Draft_Order_Status_Enum;
  updated_at: Scalars['DateTime']['output'];
};

export type Draft_OrderWhereInput = {
  AND?: InputMaybe<Array<Draft_OrderWhereInput>>;
  NOT?: InputMaybe<Array<Draft_OrderWhereInput>>;
  OR?: InputMaybe<Array<Draft_OrderWhereInput>>;
  canceled_at?: InputMaybe<DateTimeNullableFilter>;
  cart?: InputMaybe<CartNullableRelationFilter>;
  cart_id?: InputMaybe<StringNullableFilter>;
  completed_at?: InputMaybe<DateTimeNullableFilter>;
  created_at?: InputMaybe<DateTimeFilter>;
  display_id?: InputMaybe<IntFilter>;
  id?: InputMaybe<StringFilter>;
  idempotency_key?: InputMaybe<StringNullableFilter>;
  metadata?: InputMaybe<JsonNullableFilter>;
  no_notification_order?: InputMaybe<BoolNullableFilter>;
  order_draft_order_order_idToorder?: InputMaybe<OrderNullableRelationFilter>;
  order_id?: InputMaybe<StringNullableFilter>;
  order_order_draft_order_idTodraft_order?: InputMaybe<OrderNullableRelationFilter>;
  status?: InputMaybe<Enumdraft_Order_Status_EnumFilter>;
  updated_at?: InputMaybe<DateTimeFilter>;
};

export enum Draft_Order_Status_Enum {
  Completed = 'completed',
  Open = 'open'
}

export type Fulfillment = {
  __typename?: 'fulfillment';
  _count: FulfillmentCount;
  canceled_at?: Maybe<Scalars['DateTime']['output']>;
  claim_order?: Maybe<Claim_Order>;
  claim_order_id?: Maybe<Scalars['String']['output']>;
  created_at: Scalars['DateTime']['output'];
  data: Scalars['JSON']['output'];
  fulfillment_item?: Maybe<Array<Fulfillment_Item>>;
  fulfillment_provider?: Maybe<Fulfillment_Provider>;
  id: Scalars['ID']['output'];
  idempotency_key?: Maybe<Scalars['String']['output']>;
  location_id?: Maybe<Scalars['String']['output']>;
  metadata?: Maybe<Scalars['JSON']['output']>;
  no_notification?: Maybe<Scalars['Boolean']['output']>;
  order?: Maybe<Order>;
  order_id?: Maybe<Scalars['String']['output']>;
  provider_id?: Maybe<Scalars['String']['output']>;
  shipped_at?: Maybe<Scalars['DateTime']['output']>;
  swap?: Maybe<Swap>;
  swap_id?: Maybe<Scalars['String']['output']>;
  tracking_link?: Maybe<Array<Tracking_Link>>;
  tracking_numbers: Scalars['JSON']['output'];
  updated_at: Scalars['DateTime']['output'];
};

export type FulfillmentWhereInput = {
  AND?: InputMaybe<Array<FulfillmentWhereInput>>;
  NOT?: InputMaybe<Array<FulfillmentWhereInput>>;
  OR?: InputMaybe<Array<FulfillmentWhereInput>>;
  canceled_at?: InputMaybe<DateTimeNullableFilter>;
  claim_order?: InputMaybe<Claim_OrderNullableRelationFilter>;
  claim_order_id?: InputMaybe<StringNullableFilter>;
  created_at?: InputMaybe<DateTimeFilter>;
  data?: InputMaybe<JsonFilter>;
  fulfillment_item?: InputMaybe<Fulfillment_ItemListRelationFilter>;
  fulfillment_provider?: InputMaybe<Fulfillment_ProviderNullableRelationFilter>;
  id?: InputMaybe<StringFilter>;
  idempotency_key?: InputMaybe<StringNullableFilter>;
  location_id?: InputMaybe<StringNullableFilter>;
  metadata?: InputMaybe<JsonNullableFilter>;
  no_notification?: InputMaybe<BoolNullableFilter>;
  order?: InputMaybe<OrderNullableRelationFilter>;
  order_id?: InputMaybe<StringNullableFilter>;
  provider_id?: InputMaybe<StringNullableFilter>;
  shipped_at?: InputMaybe<DateTimeNullableFilter>;
  swap?: InputMaybe<SwapNullableRelationFilter>;
  swap_id?: InputMaybe<StringNullableFilter>;
  tracking_link?: InputMaybe<Tracking_LinkListRelationFilter>;
  tracking_numbers?: InputMaybe<JsonFilter>;
  updated_at?: InputMaybe<DateTimeFilter>;
};

export type Fulfillment_Item = {
  __typename?: 'fulfillment_item';
  fulfillment: Fulfillment;
  fulfillment_id: Scalars['String']['output'];
  item_id: Scalars['String']['output'];
  line_item: Line_Item;
  quantity: Scalars['Int']['output'];
};

export type Fulfillment_ItemWhereInput = {
  AND?: InputMaybe<Array<Fulfillment_ItemWhereInput>>;
  NOT?: InputMaybe<Array<Fulfillment_ItemWhereInput>>;
  OR?: InputMaybe<Array<Fulfillment_ItemWhereInput>>;
  fulfillment?: InputMaybe<FulfillmentRelationFilter>;
  fulfillment_id?: InputMaybe<StringFilter>;
  item_id?: InputMaybe<StringFilter>;
  line_item?: InputMaybe<Line_ItemRelationFilter>;
  quantity?: InputMaybe<IntFilter>;
};

export type Fulfillment_Provider = {
  __typename?: 'fulfillment_provider';
  _count: Fulfillment_ProviderCount;
  fulfillment?: Maybe<Array<Fulfillment>>;
  id: Scalars['ID']['output'];
  is_installed: Scalars['Boolean']['output'];
  region_fulfillment_providers?: Maybe<Array<Region_Fulfillment_Providers>>;
  shipping_option?: Maybe<Array<Shipping_Option>>;
};

export type Fulfillment_ProviderWhereInput = {
  AND?: InputMaybe<Array<Fulfillment_ProviderWhereInput>>;
  NOT?: InputMaybe<Array<Fulfillment_ProviderWhereInput>>;
  OR?: InputMaybe<Array<Fulfillment_ProviderWhereInput>>;
  fulfillment?: InputMaybe<FulfillmentListRelationFilter>;
  id?: InputMaybe<StringFilter>;
  is_installed?: InputMaybe<BoolFilter>;
  region_fulfillment_providers?: InputMaybe<Region_Fulfillment_ProvidersListRelationFilter>;
  shipping_option?: InputMaybe<Shipping_OptionListRelationFilter>;
};

export type Gift_Card = {
  __typename?: 'gift_card';
  _count: Gift_CardCount;
  balance: Scalars['Int']['output'];
  cart_gift_cards?: Maybe<Array<Cart_Gift_Cards>>;
  code: Scalars['String']['output'];
  created_at: Scalars['DateTime']['output'];
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  ends_at?: Maybe<Scalars['DateTime']['output']>;
  gift_card_transaction?: Maybe<Array<Gift_Card_Transaction>>;
  id: Scalars['ID']['output'];
  is_disabled: Scalars['Boolean']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  order?: Maybe<Order>;
  order_gift_cards?: Maybe<Array<Order_Gift_Cards>>;
  order_id?: Maybe<Scalars['String']['output']>;
  region: Region;
  region_id: Scalars['String']['output'];
  tax_rate?: Maybe<Scalars['Float']['output']>;
  updated_at: Scalars['DateTime']['output'];
  value: Scalars['Int']['output'];
};

export type Gift_CardWhereInput = {
  AND?: InputMaybe<Array<Gift_CardWhereInput>>;
  NOT?: InputMaybe<Array<Gift_CardWhereInput>>;
  OR?: InputMaybe<Array<Gift_CardWhereInput>>;
  balance?: InputMaybe<IntFilter>;
  cart_gift_cards?: InputMaybe<Cart_Gift_CardsListRelationFilter>;
  code?: InputMaybe<StringFilter>;
  created_at?: InputMaybe<DateTimeFilter>;
  deleted_at?: InputMaybe<DateTimeNullableFilter>;
  ends_at?: InputMaybe<DateTimeNullableFilter>;
  gift_card_transaction?: InputMaybe<Gift_Card_TransactionListRelationFilter>;
  id?: InputMaybe<StringFilter>;
  is_disabled?: InputMaybe<BoolFilter>;
  metadata?: InputMaybe<JsonNullableFilter>;
  order?: InputMaybe<OrderNullableRelationFilter>;
  order_gift_cards?: InputMaybe<Order_Gift_CardsListRelationFilter>;
  order_id?: InputMaybe<StringNullableFilter>;
  region?: InputMaybe<RegionRelationFilter>;
  region_id?: InputMaybe<StringFilter>;
  tax_rate?: InputMaybe<FloatNullableFilter>;
  updated_at?: InputMaybe<DateTimeFilter>;
  value?: InputMaybe<IntFilter>;
};

export type Gift_Card_Transaction = {
  __typename?: 'gift_card_transaction';
  amount: Scalars['Int']['output'];
  created_at: Scalars['DateTime']['output'];
  gift_card: Gift_Card;
  gift_card_id: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  is_taxable?: Maybe<Scalars['Boolean']['output']>;
  order: Order;
  order_id: Scalars['String']['output'];
  tax_rate?: Maybe<Scalars['Float']['output']>;
};

export type Gift_Card_TransactionWhereInput = {
  AND?: InputMaybe<Array<Gift_Card_TransactionWhereInput>>;
  NOT?: InputMaybe<Array<Gift_Card_TransactionWhereInput>>;
  OR?: InputMaybe<Array<Gift_Card_TransactionWhereInput>>;
  amount?: InputMaybe<IntFilter>;
  created_at?: InputMaybe<DateTimeFilter>;
  gift_card?: InputMaybe<Gift_CardRelationFilter>;
  gift_card_id?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  is_taxable?: InputMaybe<BoolNullableFilter>;
  order?: InputMaybe<OrderRelationFilter>;
  order_id?: InputMaybe<StringFilter>;
  tax_rate?: InputMaybe<FloatNullableFilter>;
};

export type Image = {
  __typename?: 'image';
  _count: ImageCount;
  created_at: Scalars['DateTime']['output'];
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  product_images?: Maybe<Array<Product_Images>>;
  updated_at: Scalars['DateTime']['output'];
  url: Scalars['String']['output'];
};

export type ImageWhereInput = {
  AND?: InputMaybe<Array<ImageWhereInput>>;
  NOT?: InputMaybe<Array<ImageWhereInput>>;
  OR?: InputMaybe<Array<ImageWhereInput>>;
  created_at?: InputMaybe<DateTimeFilter>;
  deleted_at?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<StringFilter>;
  metadata?: InputMaybe<JsonNullableFilter>;
  product_images?: InputMaybe<Product_ImagesListRelationFilter>;
  updated_at?: InputMaybe<DateTimeFilter>;
  url?: InputMaybe<StringFilter>;
};

/** This table contains check constraints and requires additional setup for migrations. Visit https://pris.ly/d/check-constraints for more info. */
export type Line_Item = {
  __typename?: 'line_item';
  _count: Line_ItemCount;
  allow_discounts: Scalars['Boolean']['output'];
  cart?: Maybe<Cart>;
  cart_id?: Maybe<Scalars['String']['output']>;
  claim_item?: Maybe<Array<Claim_Item>>;
  claim_order?: Maybe<Claim_Order>;
  claim_order_id?: Maybe<Scalars['String']['output']>;
  created_at: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  fulfilled_quantity?: Maybe<Scalars['Int']['output']>;
  fulfillment_item?: Maybe<Array<Fulfillment_Item>>;
  has_shipping?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  is_giftcard: Scalars['Boolean']['output'];
  is_return: Scalars['Boolean']['output'];
  line_item?: Maybe<Line_Item>;
  line_item_adjustment?: Maybe<Array<Line_Item_Adjustment>>;
  line_item_tax_line?: Maybe<Array<Line_Item_Tax_Line>>;
  metadata?: Maybe<Scalars['JSON']['output']>;
  order?: Maybe<Order>;
  order_edit?: Maybe<Order_Edit>;
  order_edit_id?: Maybe<Scalars['String']['output']>;
  order_id?: Maybe<Scalars['String']['output']>;
  order_item_change_order_item_change_line_item_idToline_item?: Maybe<Order_Item_Change>;
  order_item_change_order_item_change_original_line_item_idToline_item?: Maybe<Array<Order_Item_Change>>;
  original_item_id?: Maybe<Scalars['String']['output']>;
  other_line_item?: Maybe<Array<Line_Item>>;
  product_variant?: Maybe<Product_Variant>;
  quantity: Scalars['Int']['output'];
  return_item?: Maybe<Array<Return_Item>>;
  returned_quantity?: Maybe<Scalars['Int']['output']>;
  shipped_quantity?: Maybe<Scalars['Int']['output']>;
  should_merge: Scalars['Boolean']['output'];
  swap?: Maybe<Swap>;
  swap_id?: Maybe<Scalars['String']['output']>;
  thumbnail?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  unit_price: Scalars['Int']['output'];
  updated_at: Scalars['DateTime']['output'];
  variant_id?: Maybe<Scalars['String']['output']>;
};

export type Line_ItemWhereInput = {
  AND?: InputMaybe<Array<Line_ItemWhereInput>>;
  NOT?: InputMaybe<Array<Line_ItemWhereInput>>;
  OR?: InputMaybe<Array<Line_ItemWhereInput>>;
  allow_discounts?: InputMaybe<BoolFilter>;
  cart?: InputMaybe<CartNullableRelationFilter>;
  cart_id?: InputMaybe<StringNullableFilter>;
  claim_item?: InputMaybe<Claim_ItemListRelationFilter>;
  claim_order?: InputMaybe<Claim_OrderNullableRelationFilter>;
  claim_order_id?: InputMaybe<StringNullableFilter>;
  created_at?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringNullableFilter>;
  fulfilled_quantity?: InputMaybe<IntNullableFilter>;
  fulfillment_item?: InputMaybe<Fulfillment_ItemListRelationFilter>;
  has_shipping?: InputMaybe<BoolNullableFilter>;
  id?: InputMaybe<StringFilter>;
  is_giftcard?: InputMaybe<BoolFilter>;
  is_return?: InputMaybe<BoolFilter>;
  line_item?: InputMaybe<Line_ItemNullableRelationFilter>;
  line_item_adjustment?: InputMaybe<Line_Item_AdjustmentListRelationFilter>;
  line_item_tax_line?: InputMaybe<Line_Item_Tax_LineListRelationFilter>;
  metadata?: InputMaybe<JsonNullableFilter>;
  order?: InputMaybe<OrderNullableRelationFilter>;
  order_edit?: InputMaybe<Order_EditNullableRelationFilter>;
  order_edit_id?: InputMaybe<StringNullableFilter>;
  order_id?: InputMaybe<StringNullableFilter>;
  order_item_change_order_item_change_line_item_idToline_item?: InputMaybe<Order_Item_ChangeNullableRelationFilter>;
  order_item_change_order_item_change_original_line_item_idToline_item?: InputMaybe<Order_Item_ChangeListRelationFilter>;
  original_item_id?: InputMaybe<StringNullableFilter>;
  other_line_item?: InputMaybe<Line_ItemListRelationFilter>;
  product_variant?: InputMaybe<Product_VariantNullableRelationFilter>;
  quantity?: InputMaybe<IntFilter>;
  return_item?: InputMaybe<Return_ItemListRelationFilter>;
  returned_quantity?: InputMaybe<IntNullableFilter>;
  shipped_quantity?: InputMaybe<IntNullableFilter>;
  should_merge?: InputMaybe<BoolFilter>;
  swap?: InputMaybe<SwapNullableRelationFilter>;
  swap_id?: InputMaybe<StringNullableFilter>;
  thumbnail?: InputMaybe<StringNullableFilter>;
  title?: InputMaybe<StringFilter>;
  unit_price?: InputMaybe<IntFilter>;
  updated_at?: InputMaybe<DateTimeFilter>;
  variant_id?: InputMaybe<StringNullableFilter>;
};

export type Line_Item_Adjustment = {
  __typename?: 'line_item_adjustment';
  amount: Scalars['Decimal']['output'];
  description: Scalars['String']['output'];
  discount?: Maybe<Discount>;
  discount_id?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  item_id: Scalars['String']['output'];
  line_item: Line_Item;
  metadata?: Maybe<Scalars['JSON']['output']>;
};

export type Line_Item_AdjustmentWhereInput = {
  AND?: InputMaybe<Array<Line_Item_AdjustmentWhereInput>>;
  NOT?: InputMaybe<Array<Line_Item_AdjustmentWhereInput>>;
  OR?: InputMaybe<Array<Line_Item_AdjustmentWhereInput>>;
  amount?: InputMaybe<DecimalFilter>;
  description?: InputMaybe<StringFilter>;
  discount?: InputMaybe<DiscountNullableRelationFilter>;
  discount_id?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  item_id?: InputMaybe<StringFilter>;
  line_item?: InputMaybe<Line_ItemRelationFilter>;
  metadata?: InputMaybe<JsonNullableFilter>;
};

export type Line_Item_Tax_Line = {
  __typename?: 'line_item_tax_line';
  code?: Maybe<Scalars['String']['output']>;
  created_at: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  item_id: Scalars['String']['output'];
  line_item: Line_Item;
  metadata?: Maybe<Scalars['JSON']['output']>;
  name: Scalars['String']['output'];
  rate: Scalars['Float']['output'];
  updated_at: Scalars['DateTime']['output'];
};

export type Line_Item_Tax_LineWhereInput = {
  AND?: InputMaybe<Array<Line_Item_Tax_LineWhereInput>>;
  NOT?: InputMaybe<Array<Line_Item_Tax_LineWhereInput>>;
  OR?: InputMaybe<Array<Line_Item_Tax_LineWhereInput>>;
  code?: InputMaybe<StringNullableFilter>;
  created_at?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  item_id?: InputMaybe<StringFilter>;
  line_item?: InputMaybe<Line_ItemRelationFilter>;
  metadata?: InputMaybe<JsonNullableFilter>;
  name?: InputMaybe<StringFilter>;
  rate?: InputMaybe<FloatFilter>;
  updated_at?: InputMaybe<DateTimeFilter>;
};

export type Money_Amount = {
  __typename?: 'money_amount';
  amount: Scalars['Int']['output'];
  created_at: Scalars['DateTime']['output'];
  currency: Currency;
  currency_code: Scalars['String']['output'];
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  max_quantity?: Maybe<Scalars['Int']['output']>;
  min_quantity?: Maybe<Scalars['Int']['output']>;
  price_list?: Maybe<Price_List>;
  price_list_id?: Maybe<Scalars['String']['output']>;
  region?: Maybe<Region>;
  region_id?: Maybe<Scalars['String']['output']>;
  updated_at: Scalars['DateTime']['output'];
};

export type Money_AmountWhereInput = {
  AND?: InputMaybe<Array<Money_AmountWhereInput>>;
  NOT?: InputMaybe<Array<Money_AmountWhereInput>>;
  OR?: InputMaybe<Array<Money_AmountWhereInput>>;
  amount?: InputMaybe<IntFilter>;
  created_at?: InputMaybe<DateTimeFilter>;
  currency?: InputMaybe<CurrencyRelationFilter>;
  currency_code?: InputMaybe<StringFilter>;
  deleted_at?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<StringFilter>;
  max_quantity?: InputMaybe<IntNullableFilter>;
  min_quantity?: InputMaybe<IntNullableFilter>;
  price_list?: InputMaybe<Price_ListNullableRelationFilter>;
  price_list_id?: InputMaybe<StringNullableFilter>;
  region?: InputMaybe<RegionNullableRelationFilter>;
  region_id?: InputMaybe<StringNullableFilter>;
  updated_at?: InputMaybe<DateTimeFilter>;
};

export type Notification = {
  __typename?: 'notification';
  _count: NotificationCount;
  created_at: Scalars['DateTime']['output'];
  customer?: Maybe<Customer>;
  customer_id?: Maybe<Scalars['String']['output']>;
  data: Scalars['JSON']['output'];
  event_name?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  notification?: Maybe<Notification>;
  notification_provider?: Maybe<Notification_Provider>;
  other_notification?: Maybe<Array<Notification>>;
  parent_id?: Maybe<Scalars['String']['output']>;
  provider_id?: Maybe<Scalars['String']['output']>;
  resource_id: Scalars['String']['output'];
  resource_type: Scalars['String']['output'];
  to: Scalars['String']['output'];
  updated_at: Scalars['DateTime']['output'];
};

export type NotificationWhereInput = {
  AND?: InputMaybe<Array<NotificationWhereInput>>;
  NOT?: InputMaybe<Array<NotificationWhereInput>>;
  OR?: InputMaybe<Array<NotificationWhereInput>>;
  created_at?: InputMaybe<DateTimeFilter>;
  customer?: InputMaybe<CustomerNullableRelationFilter>;
  customer_id?: InputMaybe<StringNullableFilter>;
  data?: InputMaybe<JsonFilter>;
  event_name?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  notification?: InputMaybe<NotificationNullableRelationFilter>;
  notification_provider?: InputMaybe<Notification_ProviderNullableRelationFilter>;
  other_notification?: InputMaybe<NotificationListRelationFilter>;
  parent_id?: InputMaybe<StringNullableFilter>;
  provider_id?: InputMaybe<StringNullableFilter>;
  resource_id?: InputMaybe<StringFilter>;
  resource_type?: InputMaybe<StringFilter>;
  to?: InputMaybe<StringFilter>;
  updated_at?: InputMaybe<DateTimeFilter>;
};

export type Notification_Provider = {
  __typename?: 'notification_provider';
  _count: Notification_ProviderCount;
  id: Scalars['ID']['output'];
  is_installed: Scalars['Boolean']['output'];
  notification?: Maybe<Array<Notification>>;
};

export type Notification_ProviderWhereInput = {
  AND?: InputMaybe<Array<Notification_ProviderWhereInput>>;
  NOT?: InputMaybe<Array<Notification_ProviderWhereInput>>;
  OR?: InputMaybe<Array<Notification_ProviderWhereInput>>;
  id?: InputMaybe<StringFilter>;
  is_installed?: InputMaybe<BoolFilter>;
  notification?: InputMaybe<NotificationListRelationFilter>;
};

export type Order = {
  __typename?: 'order';
  Renamedreturn?: Maybe<Array<Renamedreturn>>;
  _count: OrderCount;
  address_order_billing_address_idToaddress?: Maybe<Address>;
  address_order_shipping_address_idToaddress?: Maybe<Address>;
  billing_address_id?: Maybe<Scalars['String']['output']>;
  canceled_at?: Maybe<Scalars['DateTime']['output']>;
  cart?: Maybe<Cart>;
  cart_id?: Maybe<Scalars['String']['output']>;
  claim_order?: Maybe<Array<Claim_Order>>;
  created_at: Scalars['DateTime']['output'];
  currency: Currency;
  currency_code: Scalars['String']['output'];
  customer: Customer;
  customer_id: Scalars['String']['output'];
  display_id: Scalars['Int']['output'];
  draft_order_draft_order_order_idToorder?: Maybe<Draft_Order>;
  draft_order_id?: Maybe<Scalars['String']['output']>;
  draft_order_order_draft_order_idTodraft_order?: Maybe<Draft_Order>;
  email: Scalars['String']['output'];
  event_id?: Maybe<Scalars['String']['output']>;
  external_id?: Maybe<Scalars['String']['output']>;
  fee_total?: Maybe<Scalars['Int']['output']>;
  fulfillment?: Maybe<Array<Fulfillment>>;
  fulfillment_status: Order_Fulfillment_Status_Enum;
  gift_card?: Maybe<Array<Gift_Card>>;
  gift_card_transaction?: Maybe<Array<Gift_Card_Transaction>>;
  id: Scalars['ID']['output'];
  idempotency_key?: Maybe<Scalars['String']['output']>;
  line_item?: Maybe<Array<Line_Item>>;
  metadata?: Maybe<Scalars['JSON']['output']>;
  no_notification?: Maybe<Scalars['Boolean']['output']>;
  order_discounts?: Maybe<Array<Order_Discounts>>;
  order_edit?: Maybe<Array<Order_Edit>>;
  order_gift_cards?: Maybe<Array<Order_Gift_Cards>>;
  order_total?: Maybe<Scalars['Int']['output']>;
  payment?: Maybe<Array<Payment>>;
  payment_status: Order_Payment_Status_Enum;
  refund?: Maybe<Array<Refund>>;
  region: Region;
  region_id: Scalars['String']['output'];
  sales_channel?: Maybe<Sales_Channel>;
  sales_channel_id?: Maybe<Scalars['String']['output']>;
  settlement_status: Order_Settlement_Status_Enum;
  shipping_address_id?: Maybe<Scalars['String']['output']>;
  shipping_method?: Maybe<Array<Shipping_Method>>;
  status: Order_Status_Enum;
  store_id?: Maybe<Scalars['String']['output']>;
  swap?: Maybe<Array<Swap>>;
  tax_rate?: Maybe<Scalars['Float']['output']>;
  updated_at: Scalars['DateTime']['output'];
};

export type OrderWhereInput = {
  AND?: InputMaybe<Array<OrderWhereInput>>;
  NOT?: InputMaybe<Array<OrderWhereInput>>;
  OR?: InputMaybe<Array<OrderWhereInput>>;
  Renamedreturn?: InputMaybe<RenamedreturnListRelationFilter>;
  address_order_billing_address_idToaddress?: InputMaybe<AddressNullableRelationFilter>;
  address_order_shipping_address_idToaddress?: InputMaybe<AddressNullableRelationFilter>;
  billing_address_id?: InputMaybe<StringNullableFilter>;
  canceled_at?: InputMaybe<DateTimeNullableFilter>;
  cart?: InputMaybe<CartNullableRelationFilter>;
  cart_id?: InputMaybe<StringNullableFilter>;
  claim_order?: InputMaybe<Claim_OrderListRelationFilter>;
  created_at?: InputMaybe<DateTimeFilter>;
  currency?: InputMaybe<CurrencyRelationFilter>;
  currency_code?: InputMaybe<StringFilter>;
  customer?: InputMaybe<CustomerRelationFilter>;
  customer_id?: InputMaybe<StringFilter>;
  display_id?: InputMaybe<IntFilter>;
  draft_order_draft_order_order_idToorder?: InputMaybe<Draft_OrderNullableRelationFilter>;
  draft_order_id?: InputMaybe<StringNullableFilter>;
  draft_order_order_draft_order_idTodraft_order?: InputMaybe<Draft_OrderNullableRelationFilter>;
  email?: InputMaybe<StringFilter>;
  event_id?: InputMaybe<StringNullableFilter>;
  external_id?: InputMaybe<StringNullableFilter>;
  fee_total?: InputMaybe<IntNullableFilter>;
  fulfillment?: InputMaybe<FulfillmentListRelationFilter>;
  fulfillment_status?: InputMaybe<Enumorder_Fulfillment_Status_EnumFilter>;
  gift_card?: InputMaybe<Gift_CardListRelationFilter>;
  gift_card_transaction?: InputMaybe<Gift_Card_TransactionListRelationFilter>;
  id?: InputMaybe<StringFilter>;
  idempotency_key?: InputMaybe<StringNullableFilter>;
  line_item?: InputMaybe<Line_ItemListRelationFilter>;
  metadata?: InputMaybe<JsonNullableFilter>;
  no_notification?: InputMaybe<BoolNullableFilter>;
  order_discounts?: InputMaybe<Order_DiscountsListRelationFilter>;
  order_edit?: InputMaybe<Order_EditListRelationFilter>;
  order_gift_cards?: InputMaybe<Order_Gift_CardsListRelationFilter>;
  order_total?: InputMaybe<IntNullableFilter>;
  payment?: InputMaybe<PaymentListRelationFilter>;
  payment_status?: InputMaybe<Enumorder_Payment_Status_EnumFilter>;
  refund?: InputMaybe<RefundListRelationFilter>;
  region?: InputMaybe<RegionRelationFilter>;
  region_id?: InputMaybe<StringFilter>;
  sales_channel?: InputMaybe<Sales_ChannelNullableRelationFilter>;
  sales_channel_id?: InputMaybe<StringNullableFilter>;
  settlement_status?: InputMaybe<Enumorder_Settlement_Status_EnumFilter>;
  shipping_address_id?: InputMaybe<StringNullableFilter>;
  shipping_method?: InputMaybe<Shipping_MethodListRelationFilter>;
  status?: InputMaybe<Enumorder_Status_EnumFilter>;
  store_id?: InputMaybe<StringNullableFilter>;
  swap?: InputMaybe<SwapListRelationFilter>;
  tax_rate?: InputMaybe<FloatNullableFilter>;
  updated_at?: InputMaybe<DateTimeFilter>;
};

export type Order_Discounts = {
  __typename?: 'order_discounts';
  discount: Discount;
  discount_id: Scalars['String']['output'];
  order: Order;
  order_id: Scalars['String']['output'];
};

export type Order_DiscountsWhereInput = {
  AND?: InputMaybe<Array<Order_DiscountsWhereInput>>;
  NOT?: InputMaybe<Array<Order_DiscountsWhereInput>>;
  OR?: InputMaybe<Array<Order_DiscountsWhereInput>>;
  discount?: InputMaybe<DiscountRelationFilter>;
  discount_id?: InputMaybe<StringFilter>;
  order?: InputMaybe<OrderRelationFilter>;
  order_id?: InputMaybe<StringFilter>;
};

export type Order_Edit = {
  __typename?: 'order_edit';
  _count: Order_EditCount;
  canceled_at?: Maybe<Scalars['DateTime']['output']>;
  canceled_by?: Maybe<Scalars['String']['output']>;
  confirmed_at?: Maybe<Scalars['DateTime']['output']>;
  confirmed_by?: Maybe<Scalars['String']['output']>;
  created_at: Scalars['DateTime']['output'];
  created_by: Scalars['String']['output'];
  declined_at?: Maybe<Scalars['DateTime']['output']>;
  declined_by?: Maybe<Scalars['String']['output']>;
  declined_reason?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  internal_note?: Maybe<Scalars['String']['output']>;
  line_item?: Maybe<Array<Line_Item>>;
  order: Order;
  order_id: Scalars['String']['output'];
  order_item_change?: Maybe<Array<Order_Item_Change>>;
  payment_collection?: Maybe<Payment_Collection>;
  payment_collection_id?: Maybe<Scalars['String']['output']>;
  requested_at?: Maybe<Scalars['DateTime']['output']>;
  requested_by?: Maybe<Scalars['String']['output']>;
  updated_at: Scalars['DateTime']['output'];
};

export type Order_EditWhereInput = {
  AND?: InputMaybe<Array<Order_EditWhereInput>>;
  NOT?: InputMaybe<Array<Order_EditWhereInput>>;
  OR?: InputMaybe<Array<Order_EditWhereInput>>;
  canceled_at?: InputMaybe<DateTimeNullableFilter>;
  canceled_by?: InputMaybe<StringNullableFilter>;
  confirmed_at?: InputMaybe<DateTimeNullableFilter>;
  confirmed_by?: InputMaybe<StringNullableFilter>;
  created_at?: InputMaybe<DateTimeFilter>;
  created_by?: InputMaybe<StringFilter>;
  declined_at?: InputMaybe<DateTimeNullableFilter>;
  declined_by?: InputMaybe<StringNullableFilter>;
  declined_reason?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  internal_note?: InputMaybe<StringNullableFilter>;
  line_item?: InputMaybe<Line_ItemListRelationFilter>;
  order?: InputMaybe<OrderRelationFilter>;
  order_id?: InputMaybe<StringFilter>;
  order_item_change?: InputMaybe<Order_Item_ChangeListRelationFilter>;
  payment_collection?: InputMaybe<Payment_CollectionNullableRelationFilter>;
  payment_collection_id?: InputMaybe<StringNullableFilter>;
  requested_at?: InputMaybe<DateTimeNullableFilter>;
  requested_by?: InputMaybe<StringNullableFilter>;
  updated_at?: InputMaybe<DateTimeFilter>;
};

export enum Order_Fulfillment_Status_Enum {
  Canceled = 'canceled',
  Fulfilled = 'fulfilled',
  NotFulfilled = 'not_fulfilled',
  PartiallyFulfilled = 'partially_fulfilled',
  PartiallyReturned = 'partially_returned',
  PartiallyShipped = 'partially_shipped',
  RequiresAction = 'requires_action',
  Returned = 'returned',
  Shipped = 'shipped'
}

export type Order_Gift_Cards = {
  __typename?: 'order_gift_cards';
  gift_card: Gift_Card;
  gift_card_id: Scalars['String']['output'];
  order: Order;
  order_id: Scalars['String']['output'];
};

export type Order_Gift_CardsWhereInput = {
  AND?: InputMaybe<Array<Order_Gift_CardsWhereInput>>;
  NOT?: InputMaybe<Array<Order_Gift_CardsWhereInput>>;
  OR?: InputMaybe<Array<Order_Gift_CardsWhereInput>>;
  gift_card?: InputMaybe<Gift_CardRelationFilter>;
  gift_card_id?: InputMaybe<StringFilter>;
  order?: InputMaybe<OrderRelationFilter>;
  order_id?: InputMaybe<StringFilter>;
};

export type Order_Item_Change = {
  __typename?: 'order_item_change';
  created_at: Scalars['DateTime']['output'];
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  line_item_id?: Maybe<Scalars['String']['output']>;
  line_item_order_item_change_line_item_idToline_item?: Maybe<Line_Item>;
  line_item_order_item_change_original_line_item_idToline_item?: Maybe<Line_Item>;
  order_edit: Order_Edit;
  order_edit_id: Scalars['String']['output'];
  original_line_item_id?: Maybe<Scalars['String']['output']>;
  type: Order_Item_Change_Type_Enum;
  updated_at: Scalars['DateTime']['output'];
};

export type Order_Item_ChangeWhereInput = {
  AND?: InputMaybe<Array<Order_Item_ChangeWhereInput>>;
  NOT?: InputMaybe<Array<Order_Item_ChangeWhereInput>>;
  OR?: InputMaybe<Array<Order_Item_ChangeWhereInput>>;
  created_at?: InputMaybe<DateTimeFilter>;
  deleted_at?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<StringFilter>;
  line_item_id?: InputMaybe<StringNullableFilter>;
  line_item_order_item_change_line_item_idToline_item?: InputMaybe<Line_ItemNullableRelationFilter>;
  line_item_order_item_change_original_line_item_idToline_item?: InputMaybe<Line_ItemNullableRelationFilter>;
  order_edit?: InputMaybe<Order_EditRelationFilter>;
  order_edit_id?: InputMaybe<StringFilter>;
  original_line_item_id?: InputMaybe<StringNullableFilter>;
  type?: InputMaybe<Enumorder_Item_Change_Type_EnumFilter>;
  updated_at?: InputMaybe<DateTimeFilter>;
};

export enum Order_Item_Change_Type_Enum {
  ItemAdd = 'item_add',
  ItemRemove = 'item_remove',
  ItemUpdate = 'item_update'
}

export enum Order_Payment_Status_Enum {
  Awaiting = 'awaiting',
  Canceled = 'canceled',
  Captured = 'captured',
  NotPaid = 'not_paid',
  PartiallyRefunded = 'partially_refunded',
  Refunded = 'refunded',
  RequiresAction = 'requires_action'
}

export enum Order_Settlement_Status_Enum {
  Pending = 'PENDING',
  Settled = 'SETTLED'
}

export enum Order_Status_Enum {
  Archived = 'archived',
  Canceled = 'canceled',
  Completed = 'completed',
  Pending = 'pending',
  RequiresAction = 'requires_action'
}

export type Payment = {
  __typename?: 'payment';
  _count: PaymentCount;
  amount: Scalars['Int']['output'];
  amount_refunded: Scalars['Int']['output'];
  canceled_at?: Maybe<Scalars['DateTime']['output']>;
  captured_at?: Maybe<Scalars['DateTime']['output']>;
  cart_cart_payment_idTopayment?: Maybe<Cart>;
  cart_id?: Maybe<Scalars['String']['output']>;
  cart_payment_cart_idTocart?: Maybe<Cart>;
  created_at: Scalars['DateTime']['output'];
  currency: Currency;
  currency_code: Scalars['String']['output'];
  data: Scalars['JSON']['output'];
  id: Scalars['ID']['output'];
  idempotency_key?: Maybe<Scalars['String']['output']>;
  metadata?: Maybe<Scalars['JSON']['output']>;
  order?: Maybe<Order>;
  order_id?: Maybe<Scalars['String']['output']>;
  payment_collection_payments?: Maybe<Array<Payment_Collection_Payments>>;
  provider_id: Scalars['String']['output'];
  refund?: Maybe<Array<Refund>>;
  swap?: Maybe<Swap>;
  swap_id?: Maybe<Scalars['String']['output']>;
  updated_at: Scalars['DateTime']['output'];
};

export type PaymentWhereInput = {
  AND?: InputMaybe<Array<PaymentWhereInput>>;
  NOT?: InputMaybe<Array<PaymentWhereInput>>;
  OR?: InputMaybe<Array<PaymentWhereInput>>;
  amount?: InputMaybe<IntFilter>;
  amount_refunded?: InputMaybe<IntFilter>;
  canceled_at?: InputMaybe<DateTimeNullableFilter>;
  captured_at?: InputMaybe<DateTimeNullableFilter>;
  cart_cart_payment_idTopayment?: InputMaybe<CartNullableRelationFilter>;
  cart_id?: InputMaybe<StringNullableFilter>;
  cart_payment_cart_idTocart?: InputMaybe<CartNullableRelationFilter>;
  created_at?: InputMaybe<DateTimeFilter>;
  currency?: InputMaybe<CurrencyRelationFilter>;
  currency_code?: InputMaybe<StringFilter>;
  data?: InputMaybe<JsonFilter>;
  id?: InputMaybe<StringFilter>;
  idempotency_key?: InputMaybe<StringNullableFilter>;
  metadata?: InputMaybe<JsonNullableFilter>;
  order?: InputMaybe<OrderNullableRelationFilter>;
  order_id?: InputMaybe<StringNullableFilter>;
  payment_collection_payments?: InputMaybe<Payment_Collection_PaymentsListRelationFilter>;
  provider_id?: InputMaybe<StringFilter>;
  refund?: InputMaybe<RefundListRelationFilter>;
  swap?: InputMaybe<SwapNullableRelationFilter>;
  swap_id?: InputMaybe<StringNullableFilter>;
  updated_at?: InputMaybe<DateTimeFilter>;
};

export type Payment_Collection = {
  __typename?: 'payment_collection';
  _count: Payment_CollectionCount;
  amount: Scalars['Int']['output'];
  authorized_amount?: Maybe<Scalars['Int']['output']>;
  created_at: Scalars['DateTime']['output'];
  created_by: Scalars['String']['output'];
  currency_code: Scalars['String']['output'];
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  order_edit?: Maybe<Array<Order_Edit>>;
  payment_collection_payments?: Maybe<Array<Payment_Collection_Payments>>;
  payment_collection_sessions?: Maybe<Array<Payment_Collection_Sessions>>;
  region: Region;
  region_id: Scalars['String']['output'];
  status: Payment_Collection_Status_Enum;
  type: Payment_Collection_Type_Enum;
  updated_at: Scalars['DateTime']['output'];
};

export type Payment_CollectionWhereInput = {
  AND?: InputMaybe<Array<Payment_CollectionWhereInput>>;
  NOT?: InputMaybe<Array<Payment_CollectionWhereInput>>;
  OR?: InputMaybe<Array<Payment_CollectionWhereInput>>;
  amount?: InputMaybe<IntFilter>;
  authorized_amount?: InputMaybe<IntNullableFilter>;
  created_at?: InputMaybe<DateTimeFilter>;
  created_by?: InputMaybe<StringFilter>;
  currency_code?: InputMaybe<StringFilter>;
  deleted_at?: InputMaybe<DateTimeNullableFilter>;
  description?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  metadata?: InputMaybe<JsonNullableFilter>;
  order_edit?: InputMaybe<Order_EditListRelationFilter>;
  payment_collection_payments?: InputMaybe<Payment_Collection_PaymentsListRelationFilter>;
  payment_collection_sessions?: InputMaybe<Payment_Collection_SessionsListRelationFilter>;
  region?: InputMaybe<RegionRelationFilter>;
  region_id?: InputMaybe<StringFilter>;
  status?: InputMaybe<EnumPayment_Collection_Status_EnumFilter>;
  type?: InputMaybe<EnumPayment_Collection_Type_EnumFilter>;
  updated_at?: InputMaybe<DateTimeFilter>;
};

export type Payment_Collection_Payments = {
  __typename?: 'payment_collection_payments';
  payment: Payment;
  payment_collection: Payment_Collection;
  payment_collection_id: Scalars['String']['output'];
  payment_id: Scalars['String']['output'];
};

export type Payment_Collection_PaymentsWhereInput = {
  AND?: InputMaybe<Array<Payment_Collection_PaymentsWhereInput>>;
  NOT?: InputMaybe<Array<Payment_Collection_PaymentsWhereInput>>;
  OR?: InputMaybe<Array<Payment_Collection_PaymentsWhereInput>>;
  payment?: InputMaybe<PaymentRelationFilter>;
  payment_collection?: InputMaybe<Payment_CollectionRelationFilter>;
  payment_collection_id?: InputMaybe<StringFilter>;
  payment_id?: InputMaybe<StringFilter>;
};

export type Payment_Collection_Sessions = {
  __typename?: 'payment_collection_sessions';
  payment_collection: Payment_Collection;
  payment_collection_id: Scalars['String']['output'];
  payment_session: Payment_Session;
  payment_session_id: Scalars['String']['output'];
};

export type Payment_Collection_SessionsWhereInput = {
  AND?: InputMaybe<Array<Payment_Collection_SessionsWhereInput>>;
  NOT?: InputMaybe<Array<Payment_Collection_SessionsWhereInput>>;
  OR?: InputMaybe<Array<Payment_Collection_SessionsWhereInput>>;
  payment_collection?: InputMaybe<Payment_CollectionRelationFilter>;
  payment_collection_id?: InputMaybe<StringFilter>;
  payment_session?: InputMaybe<Payment_SessionRelationFilter>;
  payment_session_id?: InputMaybe<StringFilter>;
};

export type Payment_Provider = {
  __typename?: 'payment_provider';
  _count: Payment_ProviderCount;
  id: Scalars['ID']['output'];
  is_installed: Scalars['Boolean']['output'];
  region_payment_providers?: Maybe<Array<Region_Payment_Providers>>;
};

export type Payment_ProviderWhereInput = {
  AND?: InputMaybe<Array<Payment_ProviderWhereInput>>;
  NOT?: InputMaybe<Array<Payment_ProviderWhereInput>>;
  OR?: InputMaybe<Array<Payment_ProviderWhereInput>>;
  id?: InputMaybe<StringFilter>;
  is_installed?: InputMaybe<BoolFilter>;
  region_payment_providers?: InputMaybe<Region_Payment_ProvidersListRelationFilter>;
};

export type Payment_Session = {
  __typename?: 'payment_session';
  _count: Payment_SessionCount;
  amount?: Maybe<Scalars['Int']['output']>;
  cart?: Maybe<Cart>;
  cart_id?: Maybe<Scalars['String']['output']>;
  created_at: Scalars['DateTime']['output'];
  data: Scalars['JSON']['output'];
  id: Scalars['ID']['output'];
  idempotency_key?: Maybe<Scalars['String']['output']>;
  is_initiated: Scalars['Boolean']['output'];
  is_selected?: Maybe<Scalars['Boolean']['output']>;
  payment_authorized_at?: Maybe<Scalars['DateTime']['output']>;
  payment_collection_sessions?: Maybe<Array<Payment_Collection_Sessions>>;
  provider_id: Scalars['String']['output'];
  status: Payment_Session_Status_Enum;
  updated_at: Scalars['DateTime']['output'];
};

export type Payment_SessionWhereInput = {
  AND?: InputMaybe<Array<Payment_SessionWhereInput>>;
  NOT?: InputMaybe<Array<Payment_SessionWhereInput>>;
  OR?: InputMaybe<Array<Payment_SessionWhereInput>>;
  amount?: InputMaybe<IntNullableFilter>;
  cart?: InputMaybe<CartNullableRelationFilter>;
  cart_id?: InputMaybe<StringNullableFilter>;
  created_at?: InputMaybe<DateTimeFilter>;
  data?: InputMaybe<JsonFilter>;
  id?: InputMaybe<StringFilter>;
  idempotency_key?: InputMaybe<StringNullableFilter>;
  is_initiated?: InputMaybe<BoolFilter>;
  is_selected?: InputMaybe<BoolNullableFilter>;
  payment_authorized_at?: InputMaybe<DateTimeNullableFilter>;
  payment_collection_sessions?: InputMaybe<Payment_Collection_SessionsListRelationFilter>;
  provider_id?: InputMaybe<StringFilter>;
  status?: InputMaybe<Enumpayment_Session_Status_EnumFilter>;
  updated_at?: InputMaybe<DateTimeFilter>;
};

export enum Payment_Session_Status_Enum {
  Authorized = 'authorized',
  Canceled = 'canceled',
  Error = 'error',
  Pending = 'pending',
  RequiresMore = 'requires_more'
}

export type Payout = {
  __typename?: 'payout';
  amount: Scalars['Int']['output'];
  created_at: Scalars['DateTime']['output'];
  event_id: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  organization_id: Scalars['String']['output'];
  paid_at?: Maybe<Scalars['DateTime']['output']>;
  paid_by?: Maybe<Scalars['String']['output']>;
  paid_by_user?: Maybe<User>;
  payout_method: Payout_Method;
  payout_method_id: Scalars['String']['output'];
  requested_by: Scalars['String']['output'];
  requested_by_user: User;
  settlement_status: Payout_Settlement_Status_Enum;
  status: Payout_Status_Enum;
  updated_at: Scalars['DateTime']['output'];
};

export type PayoutWhereInput = {
  AND?: InputMaybe<Array<PayoutWhereInput>>;
  NOT?: InputMaybe<Array<PayoutWhereInput>>;
  OR?: InputMaybe<Array<PayoutWhereInput>>;
  amount?: InputMaybe<IntFilter>;
  created_at?: InputMaybe<DateTimeFilter>;
  event_id?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  metadata?: InputMaybe<JsonNullableFilter>;
  organization_id?: InputMaybe<StringFilter>;
  paid_at?: InputMaybe<DateTimeNullableFilter>;
  paid_by?: InputMaybe<StringNullableFilter>;
  paid_by_user?: InputMaybe<UserNullableRelationFilter>;
  payout_method?: InputMaybe<Payout_MethodRelationFilter>;
  payout_method_id?: InputMaybe<StringFilter>;
  requested_by?: InputMaybe<StringFilter>;
  requested_by_user?: InputMaybe<UserRelationFilter>;
  settlement_status?: InputMaybe<Enumpayout_Settlement_Status_EnumFilter>;
  status?: InputMaybe<Enumpayout_Status_EnumFilter>;
  updated_at?: InputMaybe<DateTimeFilter>;
};

export type Payout_Method = {
  __typename?: 'payout_method';
  _count: Payout_MethodCount;
  account_name: Scalars['String']['output'];
  account_number: Scalars['String']['output'];
  account_type: Payout_Method_Account_Type_Enum;
  channel_code: Scalars['String']['output'];
  channel_name: Scalars['String']['output'];
  created_at: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  organization_id: Scalars['String']['output'];
  payout?: Maybe<Array<Payout>>;
  updated_at: Scalars['DateTime']['output'];
};

export type Payout_MethodWhereInput = {
  AND?: InputMaybe<Array<Payout_MethodWhereInput>>;
  NOT?: InputMaybe<Array<Payout_MethodWhereInput>>;
  OR?: InputMaybe<Array<Payout_MethodWhereInput>>;
  account_name?: InputMaybe<StringFilter>;
  account_number?: InputMaybe<StringFilter>;
  account_type?: InputMaybe<Enumpayout_Method_Account_Type_EnumFilter>;
  channel_code?: InputMaybe<StringFilter>;
  channel_name?: InputMaybe<StringFilter>;
  created_at?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  metadata?: InputMaybe<JsonNullableFilter>;
  organization_id?: InputMaybe<StringFilter>;
  payout?: InputMaybe<PayoutListRelationFilter>;
  updated_at?: InputMaybe<DateTimeFilter>;
};

export enum Payout_Method_Account_Type_Enum {
  BankAccount = 'BANK_ACCOUNT'
}

export enum Payout_Settlement_Status_Enum {
  Pending = 'PENDING',
  Settled = 'SETTLED'
}

export enum Payout_Status_Enum {
  Accepted = 'ACCEPTED',
  Cancelled = 'CANCELLED',
  Failed = 'FAILED',
  Pending = 'PENDING',
  Requested = 'REQUESTED',
  Reversed = 'REVERSED',
  Succeeded = 'SUCCEEDED'
}

export type Price_List = {
  __typename?: 'price_list';
  _count: Price_ListCount;
  created_at: Scalars['DateTime']['output'];
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  description: Scalars['String']['output'];
  ends_at?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  money_amount?: Maybe<Array<Money_Amount>>;
  name: Scalars['String']['output'];
  price_list_customer_groups?: Maybe<Array<Price_List_Customer_Groups>>;
  starts_at?: Maybe<Scalars['DateTime']['output']>;
  status: Price_List_Status_Enum;
  type: Price_List_Type_Enum;
  updated_at: Scalars['DateTime']['output'];
};

export type Price_ListWhereInput = {
  AND?: InputMaybe<Array<Price_ListWhereInput>>;
  NOT?: InputMaybe<Array<Price_ListWhereInput>>;
  OR?: InputMaybe<Array<Price_ListWhereInput>>;
  created_at?: InputMaybe<DateTimeFilter>;
  deleted_at?: InputMaybe<DateTimeNullableFilter>;
  description?: InputMaybe<StringFilter>;
  ends_at?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<StringFilter>;
  money_amount?: InputMaybe<Money_AmountListRelationFilter>;
  name?: InputMaybe<StringFilter>;
  price_list_customer_groups?: InputMaybe<Price_List_Customer_GroupsListRelationFilter>;
  starts_at?: InputMaybe<DateTimeNullableFilter>;
  status?: InputMaybe<Enumprice_List_Status_EnumFilter>;
  type?: InputMaybe<Enumprice_List_Type_EnumFilter>;
  updated_at?: InputMaybe<DateTimeFilter>;
};

export type Price_List_Customer_Groups = {
  __typename?: 'price_list_customer_groups';
  customer_group: Customer_Group;
  customer_group_id: Scalars['String']['output'];
  price_list: Price_List;
  price_list_id: Scalars['String']['output'];
};

export type Price_List_Customer_GroupsWhereInput = {
  AND?: InputMaybe<Array<Price_List_Customer_GroupsWhereInput>>;
  NOT?: InputMaybe<Array<Price_List_Customer_GroupsWhereInput>>;
  OR?: InputMaybe<Array<Price_List_Customer_GroupsWhereInput>>;
  customer_group?: InputMaybe<Customer_GroupRelationFilter>;
  customer_group_id?: InputMaybe<StringFilter>;
  price_list?: InputMaybe<Price_ListRelationFilter>;
  price_list_id?: InputMaybe<StringFilter>;
};

export enum Price_List_Status_Enum {
  Active = 'active',
  Draft = 'draft'
}

export enum Price_List_Type_Enum {
  Override = 'override',
  Sale = 'sale'
}

export type Product = {
  __typename?: 'product';
  _count: ProductCount;
  collection_id?: Maybe<Scalars['String']['output']>;
  created_at: Scalars['DateTime']['output'];
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  discount_condition_product?: Maybe<Array<Discount_Condition_Product>>;
  discount_rule_products?: Maybe<Array<Discount_Rule_Products>>;
  discountable: Scalars['Boolean']['output'];
  external_id?: Maybe<Scalars['String']['output']>;
  handle?: Maybe<Scalars['String']['output']>;
  height?: Maybe<Scalars['Int']['output']>;
  hs_code?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  is_giftcard: Scalars['Boolean']['output'];
  length?: Maybe<Scalars['Int']['output']>;
  material?: Maybe<Scalars['String']['output']>;
  metadata?: Maybe<Scalars['JSON']['output']>;
  mid_code?: Maybe<Scalars['String']['output']>;
  origin_country?: Maybe<Scalars['String']['output']>;
  product_category_product?: Maybe<Array<Product_Category_Product>>;
  product_collection?: Maybe<Product_Collection>;
  product_images?: Maybe<Array<Product_Images>>;
  product_option?: Maybe<Array<Product_Option>>;
  product_tags?: Maybe<Array<Product_Tags>>;
  product_tax_rate?: Maybe<Array<Product_Tax_Rate>>;
  product_type?: Maybe<Product_Type>;
  product_variant?: Maybe<Array<Product_Variant>>;
  status: Product_Status_Enum;
  store_id?: Maybe<Scalars['String']['output']>;
  subtitle?: Maybe<Scalars['String']['output']>;
  thumbnail?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  type_id?: Maybe<Scalars['String']['output']>;
  updated_at: Scalars['DateTime']['output'];
  weight?: Maybe<Scalars['Int']['output']>;
  width?: Maybe<Scalars['Int']['output']>;
};

export type ProductOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type ProductOrderByWithRelationInput = {
  collection_id?: InputMaybe<SortOrderInput>;
  created_at?: InputMaybe<SortOrder>;
  deleted_at?: InputMaybe<SortOrderInput>;
  description?: InputMaybe<SortOrderInput>;
  discount_condition_product?: InputMaybe<Discount_Condition_ProductOrderByRelationAggregateInput>;
  discount_rule_products?: InputMaybe<Discount_Rule_ProductsOrderByRelationAggregateInput>;
  discountable?: InputMaybe<SortOrder>;
  external_id?: InputMaybe<SortOrderInput>;
  handle?: InputMaybe<SortOrderInput>;
  height?: InputMaybe<SortOrderInput>;
  hs_code?: InputMaybe<SortOrderInput>;
  id?: InputMaybe<SortOrder>;
  is_giftcard?: InputMaybe<SortOrder>;
  length?: InputMaybe<SortOrderInput>;
  material?: InputMaybe<SortOrderInput>;
  metadata?: InputMaybe<SortOrderInput>;
  mid_code?: InputMaybe<SortOrderInput>;
  origin_country?: InputMaybe<SortOrderInput>;
  product_category_product?: InputMaybe<Product_Category_ProductOrderByRelationAggregateInput>;
  product_collection?: InputMaybe<Product_CollectionOrderByWithRelationInput>;
  product_images?: InputMaybe<Product_ImagesOrderByRelationAggregateInput>;
  product_option?: InputMaybe<Product_OptionOrderByRelationAggregateInput>;
  product_tags?: InputMaybe<Product_TagsOrderByRelationAggregateInput>;
  product_tax_rate?: InputMaybe<Product_Tax_RateOrderByRelationAggregateInput>;
  product_type?: InputMaybe<Product_TypeOrderByWithRelationInput>;
  product_variant?: InputMaybe<Product_VariantOrderByRelationAggregateInput>;
  status?: InputMaybe<SortOrder>;
  store_id?: InputMaybe<SortOrderInput>;
  subtitle?: InputMaybe<SortOrderInput>;
  thumbnail?: InputMaybe<SortOrderInput>;
  title?: InputMaybe<SortOrder>;
  type_id?: InputMaybe<SortOrderInput>;
  updated_at?: InputMaybe<SortOrder>;
  weight?: InputMaybe<SortOrderInput>;
  width?: InputMaybe<SortOrderInput>;
};

export type ProductWhereInput = {
  AND?: InputMaybe<Array<ProductWhereInput>>;
  NOT?: InputMaybe<Array<ProductWhereInput>>;
  OR?: InputMaybe<Array<ProductWhereInput>>;
  collection_id?: InputMaybe<StringNullableFilter>;
  created_at?: InputMaybe<DateTimeFilter>;
  deleted_at?: InputMaybe<DateTimeNullableFilter>;
  description?: InputMaybe<StringNullableFilter>;
  discount_condition_product?: InputMaybe<Discount_Condition_ProductListRelationFilter>;
  discount_rule_products?: InputMaybe<Discount_Rule_ProductsListRelationFilter>;
  discountable?: InputMaybe<BoolFilter>;
  external_id?: InputMaybe<StringNullableFilter>;
  handle?: InputMaybe<StringNullableFilter>;
  height?: InputMaybe<IntNullableFilter>;
  hs_code?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  is_giftcard?: InputMaybe<BoolFilter>;
  length?: InputMaybe<IntNullableFilter>;
  material?: InputMaybe<StringNullableFilter>;
  metadata?: InputMaybe<JsonNullableFilter>;
  mid_code?: InputMaybe<StringNullableFilter>;
  origin_country?: InputMaybe<StringNullableFilter>;
  product_category_product?: InputMaybe<Product_Category_ProductListRelationFilter>;
  product_collection?: InputMaybe<Product_CollectionNullableRelationFilter>;
  product_images?: InputMaybe<Product_ImagesListRelationFilter>;
  product_option?: InputMaybe<Product_OptionListRelationFilter>;
  product_tags?: InputMaybe<Product_TagsListRelationFilter>;
  product_tax_rate?: InputMaybe<Product_Tax_RateListRelationFilter>;
  product_type?: InputMaybe<Product_TypeNullableRelationFilter>;
  product_variant?: InputMaybe<Product_VariantListRelationFilter>;
  status?: InputMaybe<Enumproduct_Status_EnumFilter>;
  store_id?: InputMaybe<StringNullableFilter>;
  subtitle?: InputMaybe<StringNullableFilter>;
  thumbnail?: InputMaybe<StringNullableFilter>;
  title?: InputMaybe<StringFilter>;
  type_id?: InputMaybe<StringNullableFilter>;
  updated_at?: InputMaybe<DateTimeFilter>;
  weight?: InputMaybe<IntNullableFilter>;
  width?: InputMaybe<IntNullableFilter>;
};

export type ProductWhereUniqueInput = {
  AND?: InputMaybe<Array<ProductWhereInput>>;
  NOT?: InputMaybe<Array<ProductWhereInput>>;
  OR?: InputMaybe<Array<ProductWhereInput>>;
  collection_id?: InputMaybe<StringNullableFilter>;
  created_at?: InputMaybe<DateTimeFilter>;
  deleted_at?: InputMaybe<DateTimeNullableFilter>;
  description?: InputMaybe<StringNullableFilter>;
  discount_condition_product?: InputMaybe<Discount_Condition_ProductListRelationFilter>;
  discount_rule_products?: InputMaybe<Discount_Rule_ProductsListRelationFilter>;
  discountable?: InputMaybe<BoolFilter>;
  external_id?: InputMaybe<StringNullableFilter>;
  handle?: InputMaybe<StringNullableFilter>;
  height?: InputMaybe<IntNullableFilter>;
  hs_code?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<Scalars['String']['input']>;
  is_giftcard?: InputMaybe<BoolFilter>;
  length?: InputMaybe<IntNullableFilter>;
  material?: InputMaybe<StringNullableFilter>;
  metadata?: InputMaybe<JsonNullableFilter>;
  mid_code?: InputMaybe<StringNullableFilter>;
  origin_country?: InputMaybe<StringNullableFilter>;
  product_category_product?: InputMaybe<Product_Category_ProductListRelationFilter>;
  product_collection?: InputMaybe<Product_CollectionNullableRelationFilter>;
  product_images?: InputMaybe<Product_ImagesListRelationFilter>;
  product_option?: InputMaybe<Product_OptionListRelationFilter>;
  product_tags?: InputMaybe<Product_TagsListRelationFilter>;
  product_tax_rate?: InputMaybe<Product_Tax_RateListRelationFilter>;
  product_type?: InputMaybe<Product_TypeNullableRelationFilter>;
  product_variant?: InputMaybe<Product_VariantListRelationFilter>;
  status?: InputMaybe<Enumproduct_Status_EnumFilter>;
  store_id?: InputMaybe<StringNullableFilter>;
  subtitle?: InputMaybe<StringNullableFilter>;
  thumbnail?: InputMaybe<StringNullableFilter>;
  title?: InputMaybe<StringFilter>;
  type_id?: InputMaybe<StringNullableFilter>;
  updated_at?: InputMaybe<DateTimeFilter>;
  weight?: InputMaybe<IntNullableFilter>;
  width?: InputMaybe<IntNullableFilter>;
};

/** This table contains check constraints and requires additional setup for migrations. Visit https://pris.ly/d/check-constraints for more info. */
export type Product_Category = {
  __typename?: 'product_category';
  _count: Product_CategoryCount;
  created_at: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  handle: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  is_active?: Maybe<Scalars['Boolean']['output']>;
  is_internal?: Maybe<Scalars['Boolean']['output']>;
  metadata?: Maybe<Scalars['JSON']['output']>;
  mpath?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  parent_category_id?: Maybe<Scalars['String']['output']>;
  product_category_product?: Maybe<Array<Product_Category_Product>>;
  rank: Scalars['Int']['output'];
  updated_at: Scalars['DateTime']['output'];
};

export type Product_CategoryWhereInput = {
  AND?: InputMaybe<Array<Product_CategoryWhereInput>>;
  NOT?: InputMaybe<Array<Product_CategoryWhereInput>>;
  OR?: InputMaybe<Array<Product_CategoryWhereInput>>;
  created_at?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringFilter>;
  handle?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  is_active?: InputMaybe<BoolNullableFilter>;
  is_internal?: InputMaybe<BoolNullableFilter>;
  metadata?: InputMaybe<JsonNullableFilter>;
  mpath?: InputMaybe<StringNullableFilter>;
  name?: InputMaybe<StringFilter>;
  parent_category_id?: InputMaybe<StringNullableFilter>;
  product_category_product?: InputMaybe<Product_Category_ProductListRelationFilter>;
  rank?: InputMaybe<IntFilter>;
  updated_at?: InputMaybe<DateTimeFilter>;
};

export type Product_Category_Product = {
  __typename?: 'product_category_product';
  product: Product;
  product_category: Product_Category;
  product_category_id: Scalars['String']['output'];
  product_id: Scalars['String']['output'];
};

export type Product_Category_ProductOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type Product_Category_ProductWhereInput = {
  AND?: InputMaybe<Array<Product_Category_ProductWhereInput>>;
  NOT?: InputMaybe<Array<Product_Category_ProductWhereInput>>;
  OR?: InputMaybe<Array<Product_Category_ProductWhereInput>>;
  product?: InputMaybe<ProductRelationFilter>;
  product_category?: InputMaybe<Product_CategoryRelationFilter>;
  product_category_id?: InputMaybe<StringFilter>;
  product_id?: InputMaybe<StringFilter>;
};

export type Product_Collection = {
  __typename?: 'product_collection';
  _count: Product_CollectionCount;
  created_at: Scalars['DateTime']['output'];
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  discount_condition_product_collection?: Maybe<Array<Discount_Condition_Product_Collection>>;
  handle?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  product?: Maybe<Array<Product>>;
  store_id?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  updated_at: Scalars['DateTime']['output'];
};

export type Product_CollectionOrderByWithRelationInput = {
  created_at?: InputMaybe<SortOrder>;
  deleted_at?: InputMaybe<SortOrderInput>;
  discount_condition_product_collection?: InputMaybe<Discount_Condition_Product_CollectionOrderByRelationAggregateInput>;
  handle?: InputMaybe<SortOrderInput>;
  id?: InputMaybe<SortOrder>;
  metadata?: InputMaybe<SortOrderInput>;
  product?: InputMaybe<ProductOrderByRelationAggregateInput>;
  store_id?: InputMaybe<SortOrderInput>;
  title?: InputMaybe<SortOrder>;
  updated_at?: InputMaybe<SortOrder>;
};

export type Product_CollectionWhereInput = {
  AND?: InputMaybe<Array<Product_CollectionWhereInput>>;
  NOT?: InputMaybe<Array<Product_CollectionWhereInput>>;
  OR?: InputMaybe<Array<Product_CollectionWhereInput>>;
  created_at?: InputMaybe<DateTimeFilter>;
  deleted_at?: InputMaybe<DateTimeNullableFilter>;
  discount_condition_product_collection?: InputMaybe<Discount_Condition_Product_CollectionListRelationFilter>;
  handle?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  metadata?: InputMaybe<JsonNullableFilter>;
  product?: InputMaybe<ProductListRelationFilter>;
  store_id?: InputMaybe<StringNullableFilter>;
  title?: InputMaybe<StringFilter>;
  updated_at?: InputMaybe<DateTimeFilter>;
};

export type Product_Images = {
  __typename?: 'product_images';
  image: Image;
  image_id: Scalars['String']['output'];
  product: Product;
  product_id: Scalars['String']['output'];
};

export type Product_ImagesOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type Product_ImagesWhereInput = {
  AND?: InputMaybe<Array<Product_ImagesWhereInput>>;
  NOT?: InputMaybe<Array<Product_ImagesWhereInput>>;
  OR?: InputMaybe<Array<Product_ImagesWhereInput>>;
  image?: InputMaybe<ImageRelationFilter>;
  image_id?: InputMaybe<StringFilter>;
  product?: InputMaybe<ProductRelationFilter>;
  product_id?: InputMaybe<StringFilter>;
};

export type Product_Option = {
  __typename?: 'product_option';
  _count: Product_OptionCount;
  created_at: Scalars['DateTime']['output'];
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  product?: Maybe<Product>;
  product_id?: Maybe<Scalars['String']['output']>;
  product_option_value?: Maybe<Array<Product_Option_Value>>;
  title: Scalars['String']['output'];
  updated_at: Scalars['DateTime']['output'];
};

export type Product_OptionOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type Product_OptionWhereInput = {
  AND?: InputMaybe<Array<Product_OptionWhereInput>>;
  NOT?: InputMaybe<Array<Product_OptionWhereInput>>;
  OR?: InputMaybe<Array<Product_OptionWhereInput>>;
  created_at?: InputMaybe<DateTimeFilter>;
  deleted_at?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<StringFilter>;
  metadata?: InputMaybe<JsonNullableFilter>;
  product?: InputMaybe<ProductNullableRelationFilter>;
  product_id?: InputMaybe<StringNullableFilter>;
  product_option_value?: InputMaybe<Product_Option_ValueListRelationFilter>;
  title?: InputMaybe<StringFilter>;
  updated_at?: InputMaybe<DateTimeFilter>;
};

export type Product_Option_Value = {
  __typename?: 'product_option_value';
  created_at: Scalars['DateTime']['output'];
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  option_id: Scalars['String']['output'];
  product_option: Product_Option;
  product_variant: Product_Variant;
  updated_at: Scalars['DateTime']['output'];
  value: Scalars['String']['output'];
  variant_id: Scalars['String']['output'];
};

export type Product_Option_ValueWhereInput = {
  AND?: InputMaybe<Array<Product_Option_ValueWhereInput>>;
  NOT?: InputMaybe<Array<Product_Option_ValueWhereInput>>;
  OR?: InputMaybe<Array<Product_Option_ValueWhereInput>>;
  created_at?: InputMaybe<DateTimeFilter>;
  deleted_at?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<StringFilter>;
  metadata?: InputMaybe<JsonNullableFilter>;
  option_id?: InputMaybe<StringFilter>;
  product_option?: InputMaybe<Product_OptionRelationFilter>;
  product_variant?: InputMaybe<Product_VariantRelationFilter>;
  updated_at?: InputMaybe<DateTimeFilter>;
  value?: InputMaybe<StringFilter>;
  variant_id?: InputMaybe<StringFilter>;
};

export type Product_Sales_Channel = {
  __typename?: 'product_sales_channel';
  product_id: Scalars['String']['output'];
  sales_channel: Sales_Channel;
  sales_channel_id: Scalars['String']['output'];
};

export type Product_Sales_ChannelWhereInput = {
  AND?: InputMaybe<Array<Product_Sales_ChannelWhereInput>>;
  NOT?: InputMaybe<Array<Product_Sales_ChannelWhereInput>>;
  OR?: InputMaybe<Array<Product_Sales_ChannelWhereInput>>;
  product_id?: InputMaybe<StringFilter>;
  sales_channel?: InputMaybe<Sales_ChannelRelationFilter>;
  sales_channel_id?: InputMaybe<StringFilter>;
};

export enum Product_Status_Enum {
  Draft = 'draft',
  Proposed = 'proposed',
  Published = 'published',
  Rejected = 'rejected'
}

export type Product_Tag = {
  __typename?: 'product_tag';
  _count: Product_TagCount;
  created_at: Scalars['DateTime']['output'];
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  discount_condition_product_tag?: Maybe<Array<Discount_Condition_Product_Tag>>;
  id: Scalars['ID']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  product_tags?: Maybe<Array<Product_Tags>>;
  updated_at: Scalars['DateTime']['output'];
  value: Scalars['String']['output'];
};

export type Product_TagWhereInput = {
  AND?: InputMaybe<Array<Product_TagWhereInput>>;
  NOT?: InputMaybe<Array<Product_TagWhereInput>>;
  OR?: InputMaybe<Array<Product_TagWhereInput>>;
  created_at?: InputMaybe<DateTimeFilter>;
  deleted_at?: InputMaybe<DateTimeNullableFilter>;
  discount_condition_product_tag?: InputMaybe<Discount_Condition_Product_TagListRelationFilter>;
  id?: InputMaybe<StringFilter>;
  metadata?: InputMaybe<JsonNullableFilter>;
  product_tags?: InputMaybe<Product_TagsListRelationFilter>;
  updated_at?: InputMaybe<DateTimeFilter>;
  value?: InputMaybe<StringFilter>;
};

export type Product_Tags = {
  __typename?: 'product_tags';
  product: Product;
  product_id: Scalars['String']['output'];
  product_tag: Product_Tag;
  product_tag_id: Scalars['String']['output'];
};

export type Product_TagsOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type Product_TagsWhereInput = {
  AND?: InputMaybe<Array<Product_TagsWhereInput>>;
  NOT?: InputMaybe<Array<Product_TagsWhereInput>>;
  OR?: InputMaybe<Array<Product_TagsWhereInput>>;
  product?: InputMaybe<ProductRelationFilter>;
  product_id?: InputMaybe<StringFilter>;
  product_tag?: InputMaybe<Product_TagRelationFilter>;
  product_tag_id?: InputMaybe<StringFilter>;
};

export type Product_Tax_Rate = {
  __typename?: 'product_tax_rate';
  created_at: Scalars['DateTime']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  product: Product;
  product_id: Scalars['String']['output'];
  rate_id: Scalars['String']['output'];
  tax_rate: Tax_Rate;
  updated_at: Scalars['DateTime']['output'];
};

export type Product_Tax_RateOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type Product_Tax_RateWhereInput = {
  AND?: InputMaybe<Array<Product_Tax_RateWhereInput>>;
  NOT?: InputMaybe<Array<Product_Tax_RateWhereInput>>;
  OR?: InputMaybe<Array<Product_Tax_RateWhereInput>>;
  created_at?: InputMaybe<DateTimeFilter>;
  metadata?: InputMaybe<JsonNullableFilter>;
  product?: InputMaybe<ProductRelationFilter>;
  product_id?: InputMaybe<StringFilter>;
  rate_id?: InputMaybe<StringFilter>;
  tax_rate?: InputMaybe<Tax_RateRelationFilter>;
  updated_at?: InputMaybe<DateTimeFilter>;
};

export type Product_Type = {
  __typename?: 'product_type';
  _count: Product_TypeCount;
  created_at: Scalars['DateTime']['output'];
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  discount_condition_product_type?: Maybe<Array<Discount_Condition_Product_Type>>;
  id: Scalars['ID']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  product?: Maybe<Array<Product>>;
  product_type_tax_rate?: Maybe<Array<Product_Type_Tax_Rate>>;
  updated_at: Scalars['DateTime']['output'];
  value: Scalars['String']['output'];
};

export type Product_TypeOrderByWithRelationInput = {
  created_at?: InputMaybe<SortOrder>;
  deleted_at?: InputMaybe<SortOrderInput>;
  discount_condition_product_type?: InputMaybe<Discount_Condition_Product_TypeOrderByRelationAggregateInput>;
  id?: InputMaybe<SortOrder>;
  metadata?: InputMaybe<SortOrderInput>;
  product?: InputMaybe<ProductOrderByRelationAggregateInput>;
  product_type_tax_rate?: InputMaybe<Product_Type_Tax_RateOrderByRelationAggregateInput>;
  updated_at?: InputMaybe<SortOrder>;
  value?: InputMaybe<SortOrder>;
};

export type Product_TypeWhereInput = {
  AND?: InputMaybe<Array<Product_TypeWhereInput>>;
  NOT?: InputMaybe<Array<Product_TypeWhereInput>>;
  OR?: InputMaybe<Array<Product_TypeWhereInput>>;
  created_at?: InputMaybe<DateTimeFilter>;
  deleted_at?: InputMaybe<DateTimeNullableFilter>;
  discount_condition_product_type?: InputMaybe<Discount_Condition_Product_TypeListRelationFilter>;
  id?: InputMaybe<StringFilter>;
  metadata?: InputMaybe<JsonNullableFilter>;
  product?: InputMaybe<ProductListRelationFilter>;
  product_type_tax_rate?: InputMaybe<Product_Type_Tax_RateListRelationFilter>;
  updated_at?: InputMaybe<DateTimeFilter>;
  value?: InputMaybe<StringFilter>;
};

export type Product_Type_Tax_Rate = {
  __typename?: 'product_type_tax_rate';
  created_at: Scalars['DateTime']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  product_type: Product_Type;
  product_type_id: Scalars['String']['output'];
  rate_id: Scalars['String']['output'];
  tax_rate: Tax_Rate;
  updated_at: Scalars['DateTime']['output'];
};

export type Product_Type_Tax_RateOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type Product_Type_Tax_RateWhereInput = {
  AND?: InputMaybe<Array<Product_Type_Tax_RateWhereInput>>;
  NOT?: InputMaybe<Array<Product_Type_Tax_RateWhereInput>>;
  OR?: InputMaybe<Array<Product_Type_Tax_RateWhereInput>>;
  created_at?: InputMaybe<DateTimeFilter>;
  metadata?: InputMaybe<JsonNullableFilter>;
  product_type?: InputMaybe<Product_TypeRelationFilter>;
  product_type_id?: InputMaybe<StringFilter>;
  rate_id?: InputMaybe<StringFilter>;
  tax_rate?: InputMaybe<Tax_RateRelationFilter>;
  updated_at?: InputMaybe<DateTimeFilter>;
};

export type Product_Variant = {
  __typename?: 'product_variant';
  _count: Product_VariantCount;
  allow_backorder: Scalars['Boolean']['output'];
  barcode?: Maybe<Scalars['String']['output']>;
  claim_item?: Maybe<Array<Claim_Item>>;
  created_at: Scalars['DateTime']['output'];
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  ean?: Maybe<Scalars['String']['output']>;
  height?: Maybe<Scalars['Int']['output']>;
  hs_code?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  inventory_quantity: Scalars['Int']['output'];
  length?: Maybe<Scalars['Int']['output']>;
  line_item?: Maybe<Array<Line_Item>>;
  manage_inventory: Scalars['Boolean']['output'];
  material?: Maybe<Scalars['String']['output']>;
  metadata?: Maybe<Scalars['JSON']['output']>;
  mid_code?: Maybe<Scalars['String']['output']>;
  origin_country?: Maybe<Scalars['String']['output']>;
  product: Product;
  product_id: Scalars['String']['output'];
  product_option_value?: Maybe<Array<Product_Option_Value>>;
  sku?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  upc?: Maybe<Scalars['String']['output']>;
  updated_at: Scalars['DateTime']['output'];
  variant_rank?: Maybe<Scalars['Int']['output']>;
  weight?: Maybe<Scalars['Int']['output']>;
  width?: Maybe<Scalars['Int']['output']>;
};

export type Product_VariantOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type Product_VariantWhereInput = {
  AND?: InputMaybe<Array<Product_VariantWhereInput>>;
  NOT?: InputMaybe<Array<Product_VariantWhereInput>>;
  OR?: InputMaybe<Array<Product_VariantWhereInput>>;
  allow_backorder?: InputMaybe<BoolFilter>;
  barcode?: InputMaybe<StringNullableFilter>;
  claim_item?: InputMaybe<Claim_ItemListRelationFilter>;
  created_at?: InputMaybe<DateTimeFilter>;
  deleted_at?: InputMaybe<DateTimeNullableFilter>;
  ean?: InputMaybe<StringNullableFilter>;
  height?: InputMaybe<IntNullableFilter>;
  hs_code?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  inventory_quantity?: InputMaybe<IntFilter>;
  length?: InputMaybe<IntNullableFilter>;
  line_item?: InputMaybe<Line_ItemListRelationFilter>;
  manage_inventory?: InputMaybe<BoolFilter>;
  material?: InputMaybe<StringNullableFilter>;
  metadata?: InputMaybe<JsonNullableFilter>;
  mid_code?: InputMaybe<StringNullableFilter>;
  origin_country?: InputMaybe<StringNullableFilter>;
  product?: InputMaybe<ProductRelationFilter>;
  product_id?: InputMaybe<StringFilter>;
  product_option_value?: InputMaybe<Product_Option_ValueListRelationFilter>;
  sku?: InputMaybe<StringNullableFilter>;
  title?: InputMaybe<StringFilter>;
  upc?: InputMaybe<StringNullableFilter>;
  updated_at?: InputMaybe<DateTimeFilter>;
  variant_rank?: InputMaybe<IntNullableFilter>;
  weight?: InputMaybe<IntNullableFilter>;
  width?: InputMaybe<IntNullableFilter>;
};

export type Refund = {
  __typename?: 'refund';
  amount: Scalars['Int']['output'];
  cart?: Maybe<Cart>;
  cart_id?: Maybe<Scalars['String']['output']>;
  created_at: Scalars['DateTime']['output'];
  history_logs?: Maybe<Scalars['JSON']['output']>;
  id: Scalars['ID']['output'];
  idempotency_key?: Maybe<Scalars['String']['output']>;
  metadata?: Maybe<Scalars['JSON']['output']>;
  note?: Maybe<Scalars['String']['output']>;
  order?: Maybe<Order>;
  order_id?: Maybe<Scalars['String']['output']>;
  payment?: Maybe<Payment>;
  payment_id?: Maybe<Scalars['String']['output']>;
  reason: Ticketing_Refund_Reason;
  status: Ticketing_Refund_Status;
  updated_at: Scalars['DateTime']['output'];
};

export type RefundWhereInput = {
  AND?: InputMaybe<Array<RefundWhereInput>>;
  NOT?: InputMaybe<Array<RefundWhereInput>>;
  OR?: InputMaybe<Array<RefundWhereInput>>;
  amount?: InputMaybe<IntFilter>;
  cart?: InputMaybe<CartNullableRelationFilter>;
  cart_id?: InputMaybe<StringNullableFilter>;
  created_at?: InputMaybe<DateTimeFilter>;
  history_logs?: InputMaybe<JsonNullableFilter>;
  id?: InputMaybe<StringFilter>;
  idempotency_key?: InputMaybe<StringNullableFilter>;
  metadata?: InputMaybe<JsonNullableFilter>;
  note?: InputMaybe<StringNullableFilter>;
  order?: InputMaybe<OrderNullableRelationFilter>;
  order_id?: InputMaybe<StringNullableFilter>;
  payment?: InputMaybe<PaymentNullableRelationFilter>;
  payment_id?: InputMaybe<StringNullableFilter>;
  reason?: InputMaybe<Enumticketing_Refund_ReasonFilter>;
  status?: InputMaybe<Enumticketing_Refund_StatusFilter>;
  updated_at?: InputMaybe<DateTimeFilter>;
};

export type Region = {
  __typename?: 'region';
  _count: RegionCount;
  automatic_taxes: Scalars['Boolean']['output'];
  cart?: Maybe<Array<Cart>>;
  country?: Maybe<Array<Country>>;
  created_at: Scalars['DateTime']['output'];
  currency: Currency;
  currency_code: Scalars['String']['output'];
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  discount_regions?: Maybe<Array<Discount_Regions>>;
  gift_card?: Maybe<Array<Gift_Card>>;
  gift_cards_taxable: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  money_amount?: Maybe<Array<Money_Amount>>;
  name: Scalars['String']['output'];
  order?: Maybe<Array<Order>>;
  payment_collection?: Maybe<Array<Payment_Collection>>;
  region_fulfillment_providers?: Maybe<Array<Region_Fulfillment_Providers>>;
  region_payment_providers?: Maybe<Array<Region_Payment_Providers>>;
  shipping_option?: Maybe<Array<Shipping_Option>>;
  tax_code?: Maybe<Scalars['String']['output']>;
  tax_provider?: Maybe<Tax_Provider>;
  tax_provider_id?: Maybe<Scalars['String']['output']>;
  tax_rate: Scalars['Float']['output'];
  tax_rates?: Maybe<Array<Tax_Rate>>;
  updated_at: Scalars['DateTime']['output'];
};

export type RegionWhereInput = {
  AND?: InputMaybe<Array<RegionWhereInput>>;
  NOT?: InputMaybe<Array<RegionWhereInput>>;
  OR?: InputMaybe<Array<RegionWhereInput>>;
  automatic_taxes?: InputMaybe<BoolFilter>;
  cart?: InputMaybe<CartListRelationFilter>;
  country?: InputMaybe<CountryListRelationFilter>;
  created_at?: InputMaybe<DateTimeFilter>;
  currency?: InputMaybe<CurrencyRelationFilter>;
  currency_code?: InputMaybe<StringFilter>;
  deleted_at?: InputMaybe<DateTimeNullableFilter>;
  discount_regions?: InputMaybe<Discount_RegionsListRelationFilter>;
  gift_card?: InputMaybe<Gift_CardListRelationFilter>;
  gift_cards_taxable?: InputMaybe<BoolFilter>;
  id?: InputMaybe<StringFilter>;
  metadata?: InputMaybe<JsonNullableFilter>;
  money_amount?: InputMaybe<Money_AmountListRelationFilter>;
  name?: InputMaybe<StringFilter>;
  order?: InputMaybe<OrderListRelationFilter>;
  payment_collection?: InputMaybe<Payment_CollectionListRelationFilter>;
  region_fulfillment_providers?: InputMaybe<Region_Fulfillment_ProvidersListRelationFilter>;
  region_payment_providers?: InputMaybe<Region_Payment_ProvidersListRelationFilter>;
  shipping_option?: InputMaybe<Shipping_OptionListRelationFilter>;
  tax_code?: InputMaybe<StringNullableFilter>;
  tax_provider?: InputMaybe<Tax_ProviderNullableRelationFilter>;
  tax_provider_id?: InputMaybe<StringNullableFilter>;
  tax_rate?: InputMaybe<FloatFilter>;
  tax_rates?: InputMaybe<Tax_RateListRelationFilter>;
  updated_at?: InputMaybe<DateTimeFilter>;
};

export type Region_Fulfillment_Providers = {
  __typename?: 'region_fulfillment_providers';
  fulfillment_provider: Fulfillment_Provider;
  provider_id: Scalars['String']['output'];
  region: Region;
  region_id: Scalars['String']['output'];
};

export type Region_Fulfillment_ProvidersWhereInput = {
  AND?: InputMaybe<Array<Region_Fulfillment_ProvidersWhereInput>>;
  NOT?: InputMaybe<Array<Region_Fulfillment_ProvidersWhereInput>>;
  OR?: InputMaybe<Array<Region_Fulfillment_ProvidersWhereInput>>;
  fulfillment_provider?: InputMaybe<Fulfillment_ProviderRelationFilter>;
  provider_id?: InputMaybe<StringFilter>;
  region?: InputMaybe<RegionRelationFilter>;
  region_id?: InputMaybe<StringFilter>;
};

export type Region_Payment_Providers = {
  __typename?: 'region_payment_providers';
  payment_provider: Payment_Provider;
  provider_id: Scalars['String']['output'];
  region: Region;
  region_id: Scalars['String']['output'];
};

export type Region_Payment_ProvidersWhereInput = {
  AND?: InputMaybe<Array<Region_Payment_ProvidersWhereInput>>;
  NOT?: InputMaybe<Array<Region_Payment_ProvidersWhereInput>>;
  OR?: InputMaybe<Array<Region_Payment_ProvidersWhereInput>>;
  payment_provider?: InputMaybe<Payment_ProviderRelationFilter>;
  provider_id?: InputMaybe<StringFilter>;
  region?: InputMaybe<RegionRelationFilter>;
  region_id?: InputMaybe<StringFilter>;
};

export type Return_Item = {
  __typename?: 'return_item';
  Renamedreturn: Renamedreturn;
  is_requested: Scalars['Boolean']['output'];
  item_id: Scalars['String']['output'];
  line_item: Line_Item;
  metadata?: Maybe<Scalars['JSON']['output']>;
  note?: Maybe<Scalars['String']['output']>;
  quantity: Scalars['Int']['output'];
  reason_id?: Maybe<Scalars['String']['output']>;
  received_quantity?: Maybe<Scalars['Int']['output']>;
  requested_quantity?: Maybe<Scalars['Int']['output']>;
  return_id: Scalars['String']['output'];
  return_reason?: Maybe<Return_Reason>;
};

export type Return_ItemWhereInput = {
  AND?: InputMaybe<Array<Return_ItemWhereInput>>;
  NOT?: InputMaybe<Array<Return_ItemWhereInput>>;
  OR?: InputMaybe<Array<Return_ItemWhereInput>>;
  Renamedreturn?: InputMaybe<RenamedreturnRelationFilter>;
  is_requested?: InputMaybe<BoolFilter>;
  item_id?: InputMaybe<StringFilter>;
  line_item?: InputMaybe<Line_ItemRelationFilter>;
  metadata?: InputMaybe<JsonNullableFilter>;
  note?: InputMaybe<StringNullableFilter>;
  quantity?: InputMaybe<IntFilter>;
  reason_id?: InputMaybe<StringNullableFilter>;
  received_quantity?: InputMaybe<IntNullableFilter>;
  requested_quantity?: InputMaybe<IntNullableFilter>;
  return_id?: InputMaybe<StringFilter>;
  return_reason?: InputMaybe<Return_ReasonNullableRelationFilter>;
};

export type Return_Reason = {
  __typename?: 'return_reason';
  _count: Return_ReasonCount;
  created_at: Scalars['DateTime']['output'];
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  label: Scalars['String']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  other_return_reason?: Maybe<Array<Return_Reason>>;
  parent_return_reason_id?: Maybe<Scalars['String']['output']>;
  return_item?: Maybe<Array<Return_Item>>;
  return_reason?: Maybe<Return_Reason>;
  updated_at: Scalars['DateTime']['output'];
  value: Scalars['String']['output'];
};

export type Return_ReasonWhereInput = {
  AND?: InputMaybe<Array<Return_ReasonWhereInput>>;
  NOT?: InputMaybe<Array<Return_ReasonWhereInput>>;
  OR?: InputMaybe<Array<Return_ReasonWhereInput>>;
  created_at?: InputMaybe<DateTimeFilter>;
  deleted_at?: InputMaybe<DateTimeNullableFilter>;
  description?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  label?: InputMaybe<StringFilter>;
  metadata?: InputMaybe<JsonNullableFilter>;
  other_return_reason?: InputMaybe<Return_ReasonListRelationFilter>;
  parent_return_reason_id?: InputMaybe<StringNullableFilter>;
  return_item?: InputMaybe<Return_ItemListRelationFilter>;
  return_reason?: InputMaybe<Return_ReasonNullableRelationFilter>;
  updated_at?: InputMaybe<DateTimeFilter>;
  value?: InputMaybe<StringFilter>;
};

export enum Return_Status_Enum {
  Canceled = 'canceled',
  Received = 'received',
  Requested = 'requested',
  RequiresAction = 'requires_action'
}

export type Sales_Channel = {
  __typename?: 'sales_channel';
  _count: Sales_ChannelCount;
  cart?: Maybe<Array<Cart>>;
  created_at: Scalars['DateTime']['output'];
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  is_disabled: Scalars['Boolean']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  name: Scalars['String']['output'];
  order?: Maybe<Array<Order>>;
  product_sales_channel?: Maybe<Array<Product_Sales_Channel>>;
  store?: Maybe<Store>;
  updated_at: Scalars['DateTime']['output'];
};

export type Sales_ChannelWhereInput = {
  AND?: InputMaybe<Array<Sales_ChannelWhereInput>>;
  NOT?: InputMaybe<Array<Sales_ChannelWhereInput>>;
  OR?: InputMaybe<Array<Sales_ChannelWhereInput>>;
  cart?: InputMaybe<CartListRelationFilter>;
  created_at?: InputMaybe<DateTimeFilter>;
  deleted_at?: InputMaybe<DateTimeNullableFilter>;
  description?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  is_disabled?: InputMaybe<BoolFilter>;
  metadata?: InputMaybe<JsonNullableFilter>;
  name?: InputMaybe<StringFilter>;
  order?: InputMaybe<OrderListRelationFilter>;
  product_sales_channel?: InputMaybe<Product_Sales_ChannelListRelationFilter>;
  store?: InputMaybe<StoreNullableRelationFilter>;
  updated_at?: InputMaybe<DateTimeFilter>;
};

/** This table contains check constraints and requires additional setup for migrations. Visit https://pris.ly/d/check-constraints for more info. */
export type Shipping_Method = {
  __typename?: 'shipping_method';
  Renamedreturn?: Maybe<Renamedreturn>;
  _count: Shipping_MethodCount;
  cart?: Maybe<Cart>;
  cart_id?: Maybe<Scalars['String']['output']>;
  claim_order?: Maybe<Claim_Order>;
  claim_order_id?: Maybe<Scalars['String']['output']>;
  data: Scalars['JSON']['output'];
  id: Scalars['ID']['output'];
  order?: Maybe<Order>;
  order_id?: Maybe<Scalars['String']['output']>;
  price: Scalars['Int']['output'];
  return_id?: Maybe<Scalars['String']['output']>;
  shipping_method_tax_line?: Maybe<Array<Shipping_Method_Tax_Line>>;
  shipping_option: Shipping_Option;
  shipping_option_id: Scalars['String']['output'];
  swap?: Maybe<Swap>;
  swap_id?: Maybe<Scalars['String']['output']>;
};

export type Shipping_MethodWhereInput = {
  AND?: InputMaybe<Array<Shipping_MethodWhereInput>>;
  NOT?: InputMaybe<Array<Shipping_MethodWhereInput>>;
  OR?: InputMaybe<Array<Shipping_MethodWhereInput>>;
  Renamedreturn?: InputMaybe<RenamedreturnNullableRelationFilter>;
  cart?: InputMaybe<CartNullableRelationFilter>;
  cart_id?: InputMaybe<StringNullableFilter>;
  claim_order?: InputMaybe<Claim_OrderNullableRelationFilter>;
  claim_order_id?: InputMaybe<StringNullableFilter>;
  data?: InputMaybe<JsonFilter>;
  id?: InputMaybe<StringFilter>;
  order?: InputMaybe<OrderNullableRelationFilter>;
  order_id?: InputMaybe<StringNullableFilter>;
  price?: InputMaybe<IntFilter>;
  return_id?: InputMaybe<StringNullableFilter>;
  shipping_method_tax_line?: InputMaybe<Shipping_Method_Tax_LineListRelationFilter>;
  shipping_option?: InputMaybe<Shipping_OptionRelationFilter>;
  shipping_option_id?: InputMaybe<StringFilter>;
  swap?: InputMaybe<SwapNullableRelationFilter>;
  swap_id?: InputMaybe<StringNullableFilter>;
};

export type Shipping_Method_Tax_Line = {
  __typename?: 'shipping_method_tax_line';
  code?: Maybe<Scalars['String']['output']>;
  created_at: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  name: Scalars['String']['output'];
  rate: Scalars['Float']['output'];
  shipping_method: Shipping_Method;
  shipping_method_id: Scalars['String']['output'];
  updated_at: Scalars['DateTime']['output'];
};

export type Shipping_Method_Tax_LineWhereInput = {
  AND?: InputMaybe<Array<Shipping_Method_Tax_LineWhereInput>>;
  NOT?: InputMaybe<Array<Shipping_Method_Tax_LineWhereInput>>;
  OR?: InputMaybe<Array<Shipping_Method_Tax_LineWhereInput>>;
  code?: InputMaybe<StringNullableFilter>;
  created_at?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  metadata?: InputMaybe<JsonNullableFilter>;
  name?: InputMaybe<StringFilter>;
  rate?: InputMaybe<FloatFilter>;
  shipping_method?: InputMaybe<Shipping_MethodRelationFilter>;
  shipping_method_id?: InputMaybe<StringFilter>;
  updated_at?: InputMaybe<DateTimeFilter>;
};

/** This table contains check constraints and requires additional setup for migrations. Visit https://pris.ly/d/check-constraints for more info. */
export type Shipping_Option = {
  __typename?: 'shipping_option';
  _count: Shipping_OptionCount;
  admin_only: Scalars['Boolean']['output'];
  amount?: Maybe<Scalars['Int']['output']>;
  created_at: Scalars['DateTime']['output'];
  custom_shipping_option?: Maybe<Array<Custom_Shipping_Option>>;
  data: Scalars['JSON']['output'];
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  fulfillment_provider: Fulfillment_Provider;
  id: Scalars['ID']['output'];
  is_return: Scalars['Boolean']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  name: Scalars['String']['output'];
  price_type: Shipping_Option_Price_Type_Enum;
  profile_id: Scalars['String']['output'];
  provider_id: Scalars['String']['output'];
  region: Region;
  region_id: Scalars['String']['output'];
  shipping_method?: Maybe<Array<Shipping_Method>>;
  shipping_option_requirement?: Maybe<Array<Shipping_Option_Requirement>>;
  shipping_profile: Shipping_Profile;
  shipping_tax_rate?: Maybe<Array<Shipping_Tax_Rate>>;
  updated_at: Scalars['DateTime']['output'];
};

export type Shipping_OptionWhereInput = {
  AND?: InputMaybe<Array<Shipping_OptionWhereInput>>;
  NOT?: InputMaybe<Array<Shipping_OptionWhereInput>>;
  OR?: InputMaybe<Array<Shipping_OptionWhereInput>>;
  admin_only?: InputMaybe<BoolFilter>;
  amount?: InputMaybe<IntNullableFilter>;
  created_at?: InputMaybe<DateTimeFilter>;
  custom_shipping_option?: InputMaybe<Custom_Shipping_OptionListRelationFilter>;
  data?: InputMaybe<JsonFilter>;
  deleted_at?: InputMaybe<DateTimeNullableFilter>;
  fulfillment_provider?: InputMaybe<Fulfillment_ProviderRelationFilter>;
  id?: InputMaybe<StringFilter>;
  is_return?: InputMaybe<BoolFilter>;
  metadata?: InputMaybe<JsonNullableFilter>;
  name?: InputMaybe<StringFilter>;
  price_type?: InputMaybe<Enumshipping_Option_Price_Type_EnumFilter>;
  profile_id?: InputMaybe<StringFilter>;
  provider_id?: InputMaybe<StringFilter>;
  region?: InputMaybe<RegionRelationFilter>;
  region_id?: InputMaybe<StringFilter>;
  shipping_method?: InputMaybe<Shipping_MethodListRelationFilter>;
  shipping_option_requirement?: InputMaybe<Shipping_Option_RequirementListRelationFilter>;
  shipping_profile?: InputMaybe<Shipping_ProfileRelationFilter>;
  shipping_tax_rate?: InputMaybe<Shipping_Tax_RateListRelationFilter>;
  updated_at?: InputMaybe<DateTimeFilter>;
};

export enum Shipping_Option_Price_Type_Enum {
  Calculated = 'calculated',
  FlatRate = 'flat_rate'
}

export type Shipping_Option_Requirement = {
  __typename?: 'shipping_option_requirement';
  amount: Scalars['Int']['output'];
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  shipping_option: Shipping_Option;
  shipping_option_id: Scalars['String']['output'];
  type: Shipping_Option_Requirement_Type_Enum;
};

export type Shipping_Option_RequirementWhereInput = {
  AND?: InputMaybe<Array<Shipping_Option_RequirementWhereInput>>;
  NOT?: InputMaybe<Array<Shipping_Option_RequirementWhereInput>>;
  OR?: InputMaybe<Array<Shipping_Option_RequirementWhereInput>>;
  amount?: InputMaybe<IntFilter>;
  deleted_at?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<StringFilter>;
  shipping_option?: InputMaybe<Shipping_OptionRelationFilter>;
  shipping_option_id?: InputMaybe<StringFilter>;
  type?: InputMaybe<Enumshipping_Option_Requirement_Type_EnumFilter>;
};

export enum Shipping_Option_Requirement_Type_Enum {
  MaxSubtotal = 'max_subtotal',
  MinSubtotal = 'min_subtotal'
}

export type Shipping_Profile = {
  __typename?: 'shipping_profile';
  _count: Shipping_ProfileCount;
  created_at: Scalars['DateTime']['output'];
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  name: Scalars['String']['output'];
  shipping_option?: Maybe<Array<Shipping_Option>>;
  type: Shipping_Profile_Type_Enum;
  updated_at: Scalars['DateTime']['output'];
};

export type Shipping_ProfileWhereInput = {
  AND?: InputMaybe<Array<Shipping_ProfileWhereInput>>;
  NOT?: InputMaybe<Array<Shipping_ProfileWhereInput>>;
  OR?: InputMaybe<Array<Shipping_ProfileWhereInput>>;
  created_at?: InputMaybe<DateTimeFilter>;
  deleted_at?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<StringFilter>;
  metadata?: InputMaybe<JsonNullableFilter>;
  name?: InputMaybe<StringFilter>;
  shipping_option?: InputMaybe<Shipping_OptionListRelationFilter>;
  type?: InputMaybe<Enumshipping_Profile_Type_EnumFilter>;
  updated_at?: InputMaybe<DateTimeFilter>;
};

export enum Shipping_Profile_Type_Enum {
  Custom = 'custom',
  Default = 'default',
  GiftCard = 'gift_card'
}

export type Shipping_Tax_Rate = {
  __typename?: 'shipping_tax_rate';
  created_at: Scalars['DateTime']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  rate_id: Scalars['String']['output'];
  shipping_option: Shipping_Option;
  shipping_option_id: Scalars['String']['output'];
  tax_rate: Tax_Rate;
  updated_at: Scalars['DateTime']['output'];
};

export type Shipping_Tax_RateWhereInput = {
  AND?: InputMaybe<Array<Shipping_Tax_RateWhereInput>>;
  NOT?: InputMaybe<Array<Shipping_Tax_RateWhereInput>>;
  OR?: InputMaybe<Array<Shipping_Tax_RateWhereInput>>;
  created_at?: InputMaybe<DateTimeFilter>;
  metadata?: InputMaybe<JsonNullableFilter>;
  rate_id?: InputMaybe<StringFilter>;
  shipping_option?: InputMaybe<Shipping_OptionRelationFilter>;
  shipping_option_id?: InputMaybe<StringFilter>;
  tax_rate?: InputMaybe<Tax_RateRelationFilter>;
  updated_at?: InputMaybe<DateTimeFilter>;
};

export type Store = {
  __typename?: 'store';
  _count: StoreCount;
  created_at: Scalars['DateTime']['output'];
  currency: Currency;
  default_currency_code: Scalars['String']['output'];
  default_location_id?: Maybe<Scalars['String']['output']>;
  default_sales_channel_id?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  invite_link_template?: Maybe<Scalars['String']['output']>;
  metadata?: Maybe<Scalars['JSON']['output']>;
  name: Scalars['String']['output'];
  owner_id?: Maybe<Scalars['String']['output']>;
  payment_link_template?: Maybe<Scalars['String']['output']>;
  sales_channel?: Maybe<Sales_Channel>;
  store_currencies?: Maybe<Array<Store_Currencies>>;
  swap_link_template?: Maybe<Scalars['String']['output']>;
  updated_at: Scalars['DateTime']['output'];
  user?: Maybe<User>;
};

export type StoreWhereInput = {
  AND?: InputMaybe<Array<StoreWhereInput>>;
  NOT?: InputMaybe<Array<StoreWhereInput>>;
  OR?: InputMaybe<Array<StoreWhereInput>>;
  created_at?: InputMaybe<DateTimeFilter>;
  currency?: InputMaybe<CurrencyRelationFilter>;
  default_currency_code?: InputMaybe<StringFilter>;
  default_location_id?: InputMaybe<StringNullableFilter>;
  default_sales_channel_id?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  invite_link_template?: InputMaybe<StringNullableFilter>;
  metadata?: InputMaybe<JsonNullableFilter>;
  name?: InputMaybe<StringFilter>;
  owner_id?: InputMaybe<StringNullableFilter>;
  payment_link_template?: InputMaybe<StringNullableFilter>;
  sales_channel?: InputMaybe<Sales_ChannelNullableRelationFilter>;
  store_currencies?: InputMaybe<Store_CurrenciesListRelationFilter>;
  swap_link_template?: InputMaybe<StringNullableFilter>;
  updated_at?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserNullableRelationFilter>;
};

export type Store_Currencies = {
  __typename?: 'store_currencies';
  currency: Currency;
  currency_code: Scalars['String']['output'];
  store: Store;
  store_id: Scalars['String']['output'];
};

export type Store_CurrenciesWhereInput = {
  AND?: InputMaybe<Array<Store_CurrenciesWhereInput>>;
  NOT?: InputMaybe<Array<Store_CurrenciesWhereInput>>;
  OR?: InputMaybe<Array<Store_CurrenciesWhereInput>>;
  currency?: InputMaybe<CurrencyRelationFilter>;
  currency_code?: InputMaybe<StringFilter>;
  store?: InputMaybe<StoreRelationFilter>;
  store_id?: InputMaybe<StringFilter>;
};

export type Swap = {
  __typename?: 'swap';
  Renamedreturn?: Maybe<Renamedreturn>;
  _count: SwapCount;
  address?: Maybe<Address>;
  allow_backorder: Scalars['Boolean']['output'];
  canceled_at?: Maybe<Scalars['DateTime']['output']>;
  cart?: Maybe<Cart>;
  cart_id?: Maybe<Scalars['String']['output']>;
  confirmed_at?: Maybe<Scalars['DateTime']['output']>;
  created_at: Scalars['DateTime']['output'];
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  difference_due?: Maybe<Scalars['Int']['output']>;
  fulfillment?: Maybe<Array<Fulfillment>>;
  fulfillment_status: Swap_Fulfillment_Status_Enum;
  id: Scalars['ID']['output'];
  idempotency_key?: Maybe<Scalars['String']['output']>;
  line_item?: Maybe<Array<Line_Item>>;
  metadata?: Maybe<Scalars['JSON']['output']>;
  no_notification?: Maybe<Scalars['Boolean']['output']>;
  order: Order;
  order_id: Scalars['String']['output'];
  payment?: Maybe<Payment>;
  payment_status: Swap_Payment_Status_Enum;
  shipping_address_id?: Maybe<Scalars['String']['output']>;
  shipping_method?: Maybe<Array<Shipping_Method>>;
  updated_at: Scalars['DateTime']['output'];
};

export type SwapWhereInput = {
  AND?: InputMaybe<Array<SwapWhereInput>>;
  NOT?: InputMaybe<Array<SwapWhereInput>>;
  OR?: InputMaybe<Array<SwapWhereInput>>;
  Renamedreturn?: InputMaybe<RenamedreturnNullableRelationFilter>;
  address?: InputMaybe<AddressNullableRelationFilter>;
  allow_backorder?: InputMaybe<BoolFilter>;
  canceled_at?: InputMaybe<DateTimeNullableFilter>;
  cart?: InputMaybe<CartNullableRelationFilter>;
  cart_id?: InputMaybe<StringNullableFilter>;
  confirmed_at?: InputMaybe<DateTimeNullableFilter>;
  created_at?: InputMaybe<DateTimeFilter>;
  deleted_at?: InputMaybe<DateTimeNullableFilter>;
  difference_due?: InputMaybe<IntNullableFilter>;
  fulfillment?: InputMaybe<FulfillmentListRelationFilter>;
  fulfillment_status?: InputMaybe<Enumswap_Fulfillment_Status_EnumFilter>;
  id?: InputMaybe<StringFilter>;
  idempotency_key?: InputMaybe<StringNullableFilter>;
  line_item?: InputMaybe<Line_ItemListRelationFilter>;
  metadata?: InputMaybe<JsonNullableFilter>;
  no_notification?: InputMaybe<BoolNullableFilter>;
  order?: InputMaybe<OrderRelationFilter>;
  order_id?: InputMaybe<StringFilter>;
  payment?: InputMaybe<PaymentNullableRelationFilter>;
  payment_status?: InputMaybe<Enumswap_Payment_Status_EnumFilter>;
  shipping_address_id?: InputMaybe<StringNullableFilter>;
  shipping_method?: InputMaybe<Shipping_MethodListRelationFilter>;
  updated_at?: InputMaybe<DateTimeFilter>;
};

export enum Swap_Fulfillment_Status_Enum {
  Canceled = 'canceled',
  Fulfilled = 'fulfilled',
  NotFulfilled = 'not_fulfilled',
  PartiallyShipped = 'partially_shipped',
  RequiresAction = 'requires_action',
  Shipped = 'shipped'
}

export enum Swap_Payment_Status_Enum {
  Awaiting = 'awaiting',
  Canceled = 'canceled',
  Captured = 'captured',
  Confirmed = 'confirmed',
  DifferenceRefunded = 'difference_refunded',
  NotPaid = 'not_paid',
  PartiallyRefunded = 'partially_refunded',
  Refunded = 'refunded',
  RequiresAction = 'requires_action'
}

export type Tax_Provider = {
  __typename?: 'tax_provider';
  _count: Tax_ProviderCount;
  id: Scalars['ID']['output'];
  is_installed: Scalars['Boolean']['output'];
  region?: Maybe<Array<Region>>;
};

export type Tax_ProviderWhereInput = {
  AND?: InputMaybe<Array<Tax_ProviderWhereInput>>;
  NOT?: InputMaybe<Array<Tax_ProviderWhereInput>>;
  OR?: InputMaybe<Array<Tax_ProviderWhereInput>>;
  id?: InputMaybe<StringFilter>;
  is_installed?: InputMaybe<BoolFilter>;
  region?: InputMaybe<RegionListRelationFilter>;
};

export type Tax_Rate = {
  __typename?: 'tax_rate';
  _count: Tax_RateCount;
  code?: Maybe<Scalars['String']['output']>;
  created_at: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  name: Scalars['String']['output'];
  product_tax_rate?: Maybe<Array<Product_Tax_Rate>>;
  product_type_tax_rate?: Maybe<Array<Product_Type_Tax_Rate>>;
  rate?: Maybe<Scalars['Float']['output']>;
  region: Region;
  region_id: Scalars['String']['output'];
  shipping_tax_rate?: Maybe<Array<Shipping_Tax_Rate>>;
  updated_at: Scalars['DateTime']['output'];
};

export type Tax_RateWhereInput = {
  AND?: InputMaybe<Array<Tax_RateWhereInput>>;
  NOT?: InputMaybe<Array<Tax_RateWhereInput>>;
  OR?: InputMaybe<Array<Tax_RateWhereInput>>;
  code?: InputMaybe<StringNullableFilter>;
  created_at?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  metadata?: InputMaybe<JsonNullableFilter>;
  name?: InputMaybe<StringFilter>;
  product_tax_rate?: InputMaybe<Product_Tax_RateListRelationFilter>;
  product_type_tax_rate?: InputMaybe<Product_Type_Tax_RateListRelationFilter>;
  rate?: InputMaybe<FloatNullableFilter>;
  region?: InputMaybe<RegionRelationFilter>;
  region_id?: InputMaybe<StringFilter>;
  shipping_tax_rate?: InputMaybe<Shipping_Tax_RateListRelationFilter>;
  updated_at?: InputMaybe<DateTimeFilter>;
};

export enum Ticketing_Refund_Reason {
  CancelWithoutRefund = 'CANCEL_WITHOUT_REFUND',
  CustomerRequest = 'CUSTOMER_REQUEST',
  EventCancelled = 'EVENT_CANCELLED',
  FlipRequest = 'FLIP_REQUEST',
  OrganizerRequest = 'ORGANIZER_REQUEST'
}

export enum Ticketing_Refund_Status {
  Pending = 'PENDING',
  Refunded = 'REFUNDED'
}

export type Tracking_Link = {
  __typename?: 'tracking_link';
  created_at: Scalars['DateTime']['output'];
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  fulfillment: Fulfillment;
  fulfillment_id: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  idempotency_key?: Maybe<Scalars['String']['output']>;
  metadata?: Maybe<Scalars['JSON']['output']>;
  tracking_number: Scalars['String']['output'];
  updated_at: Scalars['DateTime']['output'];
  url?: Maybe<Scalars['String']['output']>;
};

export type Tracking_LinkWhereInput = {
  AND?: InputMaybe<Array<Tracking_LinkWhereInput>>;
  NOT?: InputMaybe<Array<Tracking_LinkWhereInput>>;
  OR?: InputMaybe<Array<Tracking_LinkWhereInput>>;
  created_at?: InputMaybe<DateTimeFilter>;
  deleted_at?: InputMaybe<DateTimeNullableFilter>;
  fulfillment?: InputMaybe<FulfillmentRelationFilter>;
  fulfillment_id?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  idempotency_key?: InputMaybe<StringNullableFilter>;
  metadata?: InputMaybe<JsonNullableFilter>;
  tracking_number?: InputMaybe<StringFilter>;
  updated_at?: InputMaybe<DateTimeFilter>;
  url?: InputMaybe<StringNullableFilter>;
};

export type User = {
  __typename?: 'user';
  _count: UserCount;
  add_on_service?: Maybe<Array<Add_On_Service>>;
  api_token?: Maybe<Scalars['String']['output']>;
  batch_job?: Maybe<Array<Batch_Job>>;
  created_at: Scalars['DateTime']['output'];
  deleted_at?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  first_name?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  last_name?: Maybe<Scalars['String']['output']>;
  metadata?: Maybe<Scalars['JSON']['output']>;
  paid_payouts?: Maybe<Array<Payout>>;
  password_hash?: Maybe<Scalars['String']['output']>;
  requested_payouts?: Maybe<Array<Payout>>;
  role?: Maybe<User_Role_Enum>;
  store?: Maybe<Store>;
  updated_at: Scalars['DateTime']['output'];
};

export type UserWhereInput = {
  AND?: InputMaybe<Array<UserWhereInput>>;
  NOT?: InputMaybe<Array<UserWhereInput>>;
  OR?: InputMaybe<Array<UserWhereInput>>;
  add_on_service?: InputMaybe<Add_On_ServiceListRelationFilter>;
  api_token?: InputMaybe<StringNullableFilter>;
  batch_job?: InputMaybe<Batch_JobListRelationFilter>;
  created_at?: InputMaybe<DateTimeFilter>;
  deleted_at?: InputMaybe<DateTimeNullableFilter>;
  email?: InputMaybe<StringFilter>;
  first_name?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  last_name?: InputMaybe<StringNullableFilter>;
  metadata?: InputMaybe<JsonNullableFilter>;
  paid_payouts?: InputMaybe<PayoutListRelationFilter>;
  password_hash?: InputMaybe<StringNullableFilter>;
  requested_payouts?: InputMaybe<PayoutListRelationFilter>;
  role?: InputMaybe<Enumuser_Role_EnumNullableFilter>;
  store?: InputMaybe<StoreNullableRelationFilter>;
  updated_at?: InputMaybe<DateTimeFilter>;
};

export enum User_Role_Enum {
  Admin = 'admin',
  Developer = 'developer',
  Member = 'member'
}

export type Wallet = {
  __typename?: 'wallet';
  amount: Scalars['String']['output'];
  created_at: Scalars['DateTime']['output'];
  currency: Scalars['String']['output'];
  event_id: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  organization_id: Scalars['String']['output'];
  type: Wallet_Type_Enum;
  updated_at: Scalars['DateTime']['output'];
};

export enum Wallet_Type_Enum {
  Event = 'EVENT',
  Organization = 'ORGANIZATION'
}

export type EventDetailsQueryVariables = Exact<{
  handle: Scalars['String']['input'];
}>;


export type EventDetailsQuery = { __typename?: 'Query', event: { __typename?: 'FlipEvent', id: string, handle: string, createdAt: any, updatedAt: any, name: string, description?: string | null, startAt: any, endAt: any, onsale?: any | null, offsale?: any | null, isOnSale: boolean, policy?: string | null, mediaCollection?: any | null, hasSeatMap: boolean, maxTicketPerOrder?: number | null, status: EventStatus, isMultipleDay: boolean, address?: { __typename?: 'FlipAddress', address?: string | null, city?: string | null, longitude?: string | null, latitude?: string | null, zip?: string | null } | null, venue?: { __typename?: 'FlipVenue', name: string } | null, organization: { __typename?: 'FlipOrganization', id: string, handle: string, name: string, description?: string | null, logoURL?: string | null, contactEmail?: string | null }, media?: Array<{ __typename?: 'FlipMedia', id: string, type: MediaType, url: string }> | null, parentEvent?: { __typename?: 'FlipEvent', id: string } | null } };

export type ParentEventQueryVariables = Exact<{
  handle: Scalars['String']['input'];
}>;


export type ParentEventQuery = { __typename?: 'Query', parentEvent: { __typename?: 'FlipEvent', id: string, handle: string, createdAt: any, updatedAt: any, name: string, description?: string | null, startAt: any, endAt: any, onsale?: any | null, offsale?: any | null, isOnSale: boolean, policy?: string | null, mediaCollection?: any | null, hasSeatMap: boolean, maxTicketPerOrder?: number | null, status: EventStatus, isMultipleDay: boolean, address?: { __typename?: 'FlipAddress', address?: string | null, city?: string | null, longitude?: string | null, latitude?: string | null, zip?: string | null } | null, venue?: { __typename?: 'FlipVenue', name: string } | null, organization: { __typename?: 'FlipOrganization', id: string, handle: string, name: string, description?: string | null, logoURL?: string | null, contactEmail?: string | null }, media?: Array<{ __typename?: 'FlipMedia', id: string, type: MediaType, url: string }> | null, parentEvent?: { __typename?: 'FlipEvent', id: string } | null } };

export type GetMyCardsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyCardsQuery = { __typename?: 'Query', getMyCards: Array<{ __typename?: 'card', id: string, customer_id: string, customer_email: string, token_id: string, masked_card_number: string, payment_method_id: string, metadata?: any | null, created_at: any, updated_at: any }> };

export type DeleteMyCardMutationVariables = Exact<{
  input: DeleteMyCardInput;
}>;


export type DeleteMyCardMutation = { __typename?: 'Mutation', deleteMyCard: { __typename?: 'card', id: string } };

export type DeleteMyAccountMutationVariables = Exact<{
  input: DeleteMyAccountInput;
}>;


export type DeleteMyAccountMutation = { __typename?: 'Mutation', deleteMyAccount: string };

export type SaveCardMutationVariables = Exact<{
  input: SaveCardInput;
}>;


export type SaveCardMutation = { __typename?: 'Mutation', saveCard: { __typename?: 'card', id: string } };

export type UpdatePersonalInfoMutationVariables = Exact<{
  data: UpdatePersonalInfoInput;
}>;


export type UpdatePersonalInfoMutation = { __typename?: 'Mutation', updatePersonalInfo: { __typename?: 'FlipUser', id: string } };

export type SendVerifyAndChangeEmailEmailMutationVariables = Exact<{
  input: SendVerifyAndChangeEmailEmailInput;
}>;


export type SendVerifyAndChangeEmailEmailMutation = { __typename?: 'Mutation', sendVerifyAndChangeEmailEmail: string };

export type ArtistsQueryVariables = Exact<{ [key: string]: never; }>;


export type ArtistsQuery = { __typename?: 'Query', artists: Array<{ __typename?: 'FlipArtist', handle: string, name: string, profileImageURL?: string | null, genre?: Array<string> | null, active: boolean }> };

export type EventsQueryVariables = Exact<{
  input: GetEventsInput;
}>;


export type EventsQuery = { __typename?: 'Query', events: { __typename?: 'GetEventsResponse', results: Array<{ __typename?: 'FlipEvent', id: string, handle: string, name: string, startAt: any, endAt: any, isOnSale: boolean, onsale?: any | null, offsale?: any | null, isMultipleDay: boolean, status: EventStatus, mediaCollection?: any | null, address?: { __typename?: 'FlipAddress', address?: string | null, city?: string | null, longitude?: string | null, latitude?: string | null, zip?: string | null } | null, venue?: { __typename?: 'FlipVenue', name: string } | null, organization: { __typename?: 'FlipOrganization', id: string, name: string, description?: string | null, logoURL?: string | null }, media?: Array<{ __typename?: 'FlipMedia', id: string, type: MediaType, url: string }> | null }> } };

export type EventFragmentFragment = { __typename?: 'FlipEvent', id: string, handle: string, name: string, startAt: any, endAt: any, isOnSale: boolean, onsale?: any | null, offsale?: any | null, isMultipleDay: boolean, status: EventStatus, mediaCollection?: any | null, address?: { __typename?: 'FlipAddress', address?: string | null, city?: string | null, longitude?: string | null, latitude?: string | null, zip?: string | null } | null, venue?: { __typename?: 'FlipVenue', name: string } | null, organization: { __typename?: 'FlipOrganization', id: string, name: string, description?: string | null, logoURL?: string | null }, media?: Array<{ __typename?: 'FlipMedia', id: string, type: MediaType, url: string }> | null };

export type OrderCard_EventFragment = { __typename?: 'FlipEvent', id: string, handle: string, name: string, startAt: any, endAt: any, isOnSale: boolean, status: EventStatus, mediaCollection?: any | null, hasSeatMap: boolean, media?: Array<{ __typename?: 'FlipMedia', id: string, type: MediaType, url: string }> | null };

export type EventCard_EventFragment = { __typename?: 'FlipEvent', id: string, handle: string, name: string, startAt: any, endAt: any, isOnSale: boolean, onsale?: any | null, offsale?: any | null, status: EventStatus, mediaCollection?: any | null, address?: { __typename?: 'FlipAddress', address?: string | null, city?: string | null, longitude?: string | null, latitude?: string | null, zip?: string | null } | null, venue?: { __typename?: 'FlipVenue', name: string } | null, organization: { __typename?: 'FlipOrganization', id: string, name: string, description?: string | null, logoURL?: string | null }, tickets?: Array<{ __typename?: 'FlipTicket', id: string }> | null, media?: Array<{ __typename?: 'FlipMedia', id: string, type: MediaType, url: string }> | null };

export type EventDetails_EventFragment = { __typename?: 'FlipEvent', id: string, handle: string, createdAt: any, updatedAt: any, name: string, description?: string | null, startAt: any, endAt: any, onsale?: any | null, offsale?: any | null, isOnSale: boolean, policy?: string | null, mediaCollection?: any | null, hasSeatMap: boolean, maxTicketPerOrder?: number | null, status: EventStatus, isMultipleDay: boolean, address?: { __typename?: 'FlipAddress', address?: string | null, city?: string | null, longitude?: string | null, latitude?: string | null, zip?: string | null } | null, venue?: { __typename?: 'FlipVenue', name: string } | null, organization: { __typename?: 'FlipOrganization', id: string, handle: string, name: string, description?: string | null, logoURL?: string | null, contactEmail?: string | null }, media?: Array<{ __typename?: 'FlipMedia', id: string, type: MediaType, url: string }> | null, parentEvent?: { __typename?: 'FlipEvent', id: string } | null };

export type ParentEventDetails_EventFragment = { __typename?: 'FlipEvent', id: string, handle: string, createdAt: any, updatedAt: any, name: string, description?: string | null, startAt: any, endAt: any, onsale?: any | null, offsale?: any | null, isOnSale: boolean, policy?: string | null, mediaCollection?: any | null, hasSeatMap: boolean, maxTicketPerOrder?: number | null, status: EventStatus, isMultipleDay: boolean, address?: { __typename?: 'FlipAddress', address?: string | null, city?: string | null, longitude?: string | null, latitude?: string | null, zip?: string | null } | null, venue?: { __typename?: 'FlipVenue', name: string } | null, organization: { __typename?: 'FlipOrganization', id: string, handle: string, name: string, description?: string | null, logoURL?: string | null, contactEmail?: string | null }, media?: Array<{ __typename?: 'FlipMedia', id: string, type: MediaType, url: string }> | null, parentEvent?: { __typename?: 'FlipEvent', id: string } | null };

export type UpdateCartMetadataMutationVariables = Exact<{
  input: UpdateCartMetadataInput;
}>;


export type UpdateCartMetadataMutation = { __typename?: 'Mutation', updateCartMetadata: { __typename?: 'cart', metadata?: any | null } };

export type DeleteReservationSessionMutationVariables = Exact<{
  input: DeleteReservationSessionInput;
}>;


export type DeleteReservationSessionMutation = { __typename?: 'Mutation', deleteReservationSession: string };

export type CreateEventPayoutRequestMutationVariables = Exact<{
  input: CreateEventPayoutRequestInput;
}>;


export type CreateEventPayoutRequestMutation = { __typename?: 'Mutation', createEventPayoutRequest: { __typename?: 'payout', id: string, metadata?: any | null, status: Payout_Status_Enum, created_at: any, updated_at: any, paid_by?: string | null, paid_at?: any | null, settlement_status: Payout_Settlement_Status_Enum, amount: number, event_id: string, organization_id: string, requested_by: string } };

export type CreateExternalEventMutationVariables = Exact<{
  data: ExternalEventCreateInput;
}>;


export type CreateExternalEventMutation = { __typename?: 'Mutation', createExternalEvent: { __typename?: 'FlipExternalEvent', id: string, name: string, startAt: any, endAt: any, isOnSale: boolean, ticketUrl: string, organizationName?: string | null, createdAt: any, updatedAt: any, mediaURLs?: Array<string> | null, address?: { __typename?: 'FlipAddress', address?: string | null, city?: string | null } | null, artists?: Array<{ __typename?: 'FlipArtist', handle: string }> | null, FlipMedia?: Array<{ __typename?: 'FlipMedia', url: string }> | null } };

export type UpsertOrganizationCheckoutConfigsMutationVariables = Exact<{
  input: UpsertOrganizationCheckoutConfigsInput;
}>;


export type UpsertOrganizationCheckoutConfigsMutation = { __typename?: 'Mutation', upsertOrganizationCheckoutConfigs: { __typename?: 'FlipCheckoutConfig', id: string } };

export type DeleteDiscountMutationVariables = Exact<{
  input: DeleteDiscountInput;
}>;


export type DeleteDiscountMutation = { __typename?: 'Mutation', deleteDiscount: { __typename?: 'discount', id: string } };

export type CreateDiscountsMutationVariables = Exact<{
  input: CreateDiscountInput;
}>;


export type CreateDiscountsMutation = { __typename?: 'Mutation', createDiscount: { __typename?: 'discount', id: string } };

export type UpdateDiscountsMutationVariables = Exact<{
  input: UpdateDiscountInput;
}>;


export type UpdateDiscountsMutation = { __typename?: 'Mutation', updateDiscount: { __typename?: 'discount', id: string } };

export type CreateEventMutationVariables = Exact<{
  data: EventCreateInput;
}>;


export type CreateEventMutation = { __typename?: 'Mutation', createEvent: { __typename?: 'FlipEvent', id: string } };

export type RequestPayoutReportMutationVariables = Exact<{
  input: RequestPayoutReportInput;
}>;


export type RequestPayoutReportMutation = { __typename?: 'Mutation', requestPayoutReport: { __typename?: 'RequestReportResponse', reportId: string } };

export type RequestOrderReportMutationVariables = Exact<{
  input: RequestOrderReportInput;
}>;


export type RequestOrderReportMutation = { __typename?: 'Mutation', requestOrderReport: { __typename?: 'RequestReportResponse', reportId: string } };

export type UpdateEventHoldSeatsRulesMutationVariables = Exact<{
  input: UpdateEventHoldSeatsRulesInput;
}>;


export type UpdateEventHoldSeatsRulesMutation = { __typename?: 'Mutation', updateEventHoldSeatsRules: { __typename?: 'FlipSeatMap', id: string } };

export type UpdateTicketTierInventoryAndHoldMutationVariables = Exact<{
  input: UpdateTicketTierInventoryAndHeldInput;
}>;


export type UpdateTicketTierInventoryAndHoldMutation = { __typename?: 'Mutation', updateTicketTierInventoryAndHold: Array<{ __typename?: 'FlipTicketTier', id: string }> };

export type SendPasswordlessSignInEmailMutationVariables = Exact<{
  data: SendPasswordlessSignInEmailInput;
}>;


export type SendPasswordlessSignInEmailMutation = { __typename?: 'Mutation', sendPasswordlessSignInEmail: string };

export type RequestOrganizationPayoutReportMutationVariables = Exact<{
  input: RequestOrganizationPayoutReportInput;
}>;


export type RequestOrganizationPayoutReportMutation = { __typename?: 'Mutation', requestOrganizationPayoutReport: { __typename?: 'RequestReportResponse', reportId: string } };

export type GetReservationSessionQueryVariables = Exact<{
  input: GetReservationSessionInput;
}>;


export type GetReservationSessionQuery = { __typename?: 'Query', getReservationSession: { __typename?: 'GetReservationSessionResponse', expireAt: any, bufferTimeMs: number, isCartCompleted: boolean } };

export type MyTicketsQueryVariables = Exact<{
  data: GetTicketHistoryInput;
}>;


export type MyTicketsQuery = { __typename?: 'Query', getMyTickets: { __typename?: 'GetTicketHistoryResponse', results: Array<{ __typename?: 'FlipEvent', id: string, handle: string, name: string, startAt: any, endAt: any, isOnSale: boolean, onsale?: any | null, offsale?: any | null, status: EventStatus, mediaCollection?: any | null, address?: { __typename?: 'FlipAddress', address?: string | null, city?: string | null, longitude?: string | null, latitude?: string | null, zip?: string | null } | null, venue?: { __typename?: 'FlipVenue', name: string } | null, organization: { __typename?: 'FlipOrganization', id: string, name: string, description?: string | null, logoURL?: string | null }, tickets?: Array<{ __typename?: 'FlipTicket', id: string }> | null, media?: Array<{ __typename?: 'FlipMedia', id: string, type: MediaType, url: string }> | null }> } };

export type TicketDetailsQueryVariables = Exact<{
  data: GetTicketDetailsInput;
}>;


export type TicketDetailsQuery = { __typename?: 'Query', getTicketDetails: Array<{ __typename?: 'GetTicketDetailsResponse', validationCode: string, checkedInBy?: string | null, status: TicketStatus, metadata?: any | null, ticketingVariantId: string, sectionName?: string | null, owner: { __typename?: 'FlipUser', displayName: string }, event: { __typename?: 'FlipEvent', id: string, name: string, startAt: any, endAt: any, hasSeatMap: boolean, status: EventStatus, address?: { __typename?: 'FlipAddress', address?: string | null } | null } }> };

export type MyOrderQueryVariables = Exact<{
  input: GetMyOrdersInput;
}>;


export type MyOrderQuery = { __typename?: 'Query', getMyOrders: { __typename?: 'GetMyOrdersResponse', orders: Array<{ __typename?: 'MyOrders', cartDisplayId?: string | null, orderDisplayId?: string | null, eventId: string, cartId?: string | null, total: number, ticketCount: number, type: DeliveryMethod, orderId?: string | null, createdAt: any, event?: { __typename?: 'FlipEvent', id: string, handle: string, name: string, startAt: any, endAt: any, isOnSale: boolean, status: EventStatus, mediaCollection?: any | null, hasSeatMap: boolean, media?: Array<{ __typename?: 'FlipMedia', id: string, type: MediaType, url: string }> | null } | null, ticketTiers?: Array<{ __typename: 'PurchasedTicketTier', id?: string | null, name?: string | null, quantity: number }> | null }>, pageInfo: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage: boolean, startCursor?: string | null } } };

export type GetOrderDetailsQueryVariables = Exact<{
  input: GetOrderDetailsInput;
}>;


export type GetOrderDetailsQuery = { __typename?: 'Query', getOrderDetails: { __typename?: 'GetOrderDetailsResponse', status?: string | null, cartDisplayId?: string | null, orderDisplayId?: string | null, eventId: string, cartId?: string | null, total: number, ticketCount: number, type: DeliveryMethod, orderId?: string | null, createdAt: any, discount?: number | null, email?: string | null, fee?: number | null, name?: string | null, subTotal?: number | null, tax?: number | null, taxRate?: number | null, ticketTiers?: Array<{ __typename: 'PurchasedTicketTier', id?: string | null, name?: string | null, quantity: number }> | null, event?: { __typename?: 'FlipEvent', id: string, handle: string, name: string, startAt: any, endAt: any, isOnSale: boolean, status: EventStatus, mediaCollection?: any | null, hasSeatMap: boolean, media?: Array<{ __typename?: 'FlipMedia', id: string, type: MediaType, url: string }> | null } | null, payment?: { __typename?: 'PaymentData', provider?: string | null } | null } };

export type GetEventViewsChartGroupByChannelQueryVariables = Exact<{
  input: GetEventViewsChartGroupByChannelInput;
}>;


export type GetEventViewsChartGroupByChannelQuery = { __typename?: 'Query', getEventViewsChartGroupByChannel: { __typename?: 'GetEventViewsChartGroupByChannelResponse', xs: Array<string>, unit: string, ys: Array<{ __typename?: 'YS', name: string, data: Array<number> }> } };

export type GetTotalEventStatsGroupByChannelQueryVariables = Exact<{
  input: GetTotalEventStatInput;
}>;


export type GetTotalEventStatsGroupByChannelQuery = { __typename?: 'Query', getTotalEventStatsGroupByChannel: { __typename?: 'GetTotalEventStatResponse', totalViewCount: number, channels: Array<{ __typename?: 'ChannelData', name: string, viewCount: number, totalVisitors: number, totalBuyers: number }> } };

export type GetTotalOrdersByLocationQueryVariables = Exact<{
  input: GetTotalOrderByLocationInput;
}>;


export type GetTotalOrdersByLocationQuery = { __typename?: 'Query', getTotalOrdersByLocation: { __typename?: 'GetTotalOrderByLocationResponse', totalOfAllCities: number, cities: Array<string>, totalByCity: Array<{ __typename?: 'TotalByCity', name: string, count: number }> } };

export type GetTotalEventDetailsViewsQueryVariables = Exact<{
  input: GetTotalEventDetailsViewInput;
}>;


export type GetTotalEventDetailsViewsQuery = { __typename?: 'Query', getTotalEventDetailsViews: { __typename?: 'GetTotalEventDetailsViewResponse', sameDayLastWeekCount: number, thisMonthCount: number, lastMonthCount: number, last24HourCount: number } };

export type GetMyOrganizationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyOrganizationsQuery = { __typename?: 'Query', getMyOrganizations: Array<{ __typename?: 'FlipOrganization', id: string, name: string, ownerId: string, description?: string | null, websiteURL?: string | null, contactEmail?: string | null, contactPhone?: string | null, logoURL?: string | null, metadata?: any | null }> };

export type GetMyEventsQueryVariables = Exact<{
  data: GetMyEventsInput;
}>;


export type GetMyEventsQuery = { __typename?: 'Query', getMyEvents: { __typename?: 'GetMyEventsResponse', events: Array<{ __typename?: 'FlipEvent', id: string, handle: string, createdAt: any, updatedAt: any, organizationId: string, name: string, description?: string | null, startAt: any, endAt: any, addressId?: string | null, venueId?: string | null, status: EventStatus, hasSeatMap: boolean, maxTicketPerOrder?: number | null, isMultipleDay: boolean, isParentEvent: boolean, media?: Array<{ __typename?: 'FlipMedia', id: string, type: MediaType, url: string }> | null, address?: { __typename?: 'FlipAddress', address?: string | null } | null, venue?: { __typename?: 'FlipVenue', name: string } | null }>, pagination: { __typename?: 'PaginationResponse', page: number, size?: number | null, total?: number | null } } };

export type GetSeatMapQueryVariables = Exact<{
  input: GeEventSeatMapInput;
}>;


export type GetSeatMapQuery = { __typename?: 'Query', getEventSeatMap: { __typename?: 'GetEventSeatMapResponse', seatMapUrl: string, heldSeats: Array<string>, reservingSeats: Array<string>, soldSeats: Array<string>, gaSectionInventory: any } };

export type GetReservationSessionByEventQueryVariables = Exact<{
  input: GetReservationSessionByEventInput;
}>;


export type GetReservationSessionByEventQuery = { __typename?: 'Query', getReservationSessionByEvent?: { __typename?: 'GetReservationSessionByEventResponse', expireAt: any, bufferTimeMs: number, cartId: string } | null };

export type GetEventFinancialSummaryQueryVariables = Exact<{
  input: GetEventFinancialSummaryInput;
}>;


export type GetEventFinancialSummaryQuery = { __typename?: 'Query', getEventOrderFinancialSummary: { __typename?: 'GetEventOrderFinancialSummaryResponse', totalRevenueAmount: number, totalFeeAmount: number, profitAmount: number, totalOrdersCount: number, completedOrdersCount: number, pendingOrdersCount: number, canceledOrdersCount: number, pendingBalance: number, totalAddOnAmount: number } };

export type GetPayoutMethodsQueryVariables = Exact<{
  input: GetPayoutMethodsInput;
}>;


export type GetPayoutMethodsQuery = { __typename?: 'Query', payoutMethods: Array<{ __typename?: 'payout_method', id: string, channel_code: string, channel_name: string, account_name: string, account_number: string }> };

export type PayoutsQueryVariables = Exact<{
  input: GetPayoutsInput;
}>;


export type PayoutsQuery = { __typename?: 'Query', payouts: { __typename?: 'GetPayoutsResponse', payouts: Array<{ __typename?: 'MyPayout', id: string, status: Payout_Status_Enum, settlement_status: Payout_Settlement_Status_Enum }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, startCursor?: string | null, endCursor?: string | null } } };

export type OrganizationQueryVariables = Exact<{
  handle: Scalars['String']['input'];
}>;


export type OrganizationQuery = { __typename?: 'Query', organization: { __typename?: 'FlipOrganization', id: string, contactEmail?: string | null, description?: string | null, handle: string, logoURL?: string | null, coverURL?: string | null, name: string, websiteURL?: string | null, facebookLikes?: string | null, facebookURL?: string | null, tiktokURL?: string | null, instagramURL?: string | null, tags?: Array<{ __typename?: 'FlipTag', label: string }> | null, address?: { __typename?: 'FlipAddress', address?: string | null, city?: string | null } | null } };

export type MyEventWalletQueryVariables = Exact<{
  input: GetMyEventWalletInput;
}>;


export type MyEventWalletQuery = { __typename?: 'Query', myEventWallet: { __typename?: 'wallet', id: string, type: Wallet_Type_Enum, amount: string, currency: string } };

export type PayoutSummaryQueryVariables = Exact<{
  input: GetPayoutSummaryInput;
}>;


export type PayoutSummaryQuery = { __typename?: 'Query', payoutSummary: { __typename?: 'GetPayoutSummaryResponse', totalPaidOutCount: number, totalPaidOutAmount: number, pendingPayoutAmount: number, pendingPayOutCount: number } };

export type ArtistQueryVariables = Exact<{
  handle: Scalars['String']['input'];
}>;


export type ArtistQuery = { __typename?: 'Query', artist: { __typename?: 'FlipArtist', id: string, handle: string, name: string, bio?: string | null, genre?: Array<string> | null, profileImageURL?: string | null, coverURL?: string | null, facebookURL?: string | null, tiktokURL?: string | null, instagramURL?: string | null, facebookLikes?: string | null, createdAt: any, updatedAt: any, spotifyArtistID?: string | null, spotifyFollowers?: number | null, spotifyURL?: string | null, events?: Array<{ __typename?: 'FlipEvent', name: string }> | null, shows?: Array<{ __typename?: 'FlipShow', title: string }> | null } };

export type ExternalEventsQueryVariables = Exact<{
  data: GetExternalEventsInput;
}>;


export type ExternalEventsQuery = { __typename?: 'Query', externalEvents: Array<{ __typename?: 'FlipExternalEvent', id: string, name: string, organizationName?: string | null, startAt: any, endAt: any, ticketUrl: string, mediaURLs?: Array<string> | null, address?: { __typename?: 'FlipAddress', address?: string | null, city?: string | null, longitude?: string | null, latitude?: string | null, zip?: string | null } | null, venue?: { __typename?: 'FlipVenue', name: string } | null, organization?: { __typename?: 'FlipOrganization', id: string, handle: string, name: string, description?: string | null, logoURL?: string | null, contactEmail?: string | null } | null }> };

export type PayoutRequestQueryVariables = Exact<{
  input: GetPayoutsInput;
}>;


export type PayoutRequestQuery = { __typename?: 'Query', payouts: { __typename?: 'GetPayoutsResponse', payouts: Array<{ __typename?: 'MyPayout', id: string, event_id: string, created_at: any, paid_at?: any | null, paid_by?: string | null, payout_method_id: string, amount: number, settlement_status: Payout_Settlement_Status_Enum, status: Payout_Status_Enum, updated_at: any, payout_method: { __typename?: 'payout_method', account_name: string, account_number: string, account_type: Payout_Method_Account_Type_Enum, channel_code: string, channel_name: string }, requested_by_user: { __typename?: 'user', last_name?: string | null, first_name?: string | null, email: string } }>, pageInfo: { __typename?: 'PageInfo', startCursor?: string | null, endCursor?: string | null, hasNextPage: boolean } } };

export type BalanceTransactionsQueryVariables = Exact<{
  input: GetBalanceTransactionsInput;
}>;


export type BalanceTransactionsQuery = { __typename?: 'Query', balanceTransactions: { __typename?: 'GetBalanceTransactionsResponse', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null, startCursor?: string | null }, balanceTransactions: Array<{ __typename?: 'balance', id: string, amount: number, transaction_type: Balance_Transaction_Type_Enum, transaction_method?: string | null, channel_code?: string | null, created_at: any, currency: string, event_id: string, event_wallet_amount_snapshot: string, metadata?: any | null, money_flow: Balance_Transaction_Money_Flow_Enum, payment_gateway: Balance_Transaction_Payment_Gateway_Enum, reference_id: string }> } };

export type GetOrCreateOfflineSaleCodeQueryVariables = Exact<{
  input: GetOrCreateOfflineSaleCodeInput;
}>;


export type GetOrCreateOfflineSaleCodeQuery = { __typename?: 'Query', getOrCreateOfflineSaleCode: { __typename?: 'GetOrCreateOfflineSaleCodeResponse', offlineSaleCode: string } };

export type OrganizationCheckoutConfigsQueryVariables = Exact<{
  input: GetOrganizationCheckoutConfigsInput;
}>;


export type OrganizationCheckoutConfigsQuery = { __typename?: 'Query', organizationCheckoutConfigs: { __typename?: 'GetOrganizationCheckoutConfigsResponse', offlineSalesEnabled: boolean, isShowCheckoutOptions: boolean } };

export type DiscountsQueryVariables = Exact<{
  input: GetDiscountsInput;
}>;


export type DiscountsQuery = { __typename?: 'Query', discounts: { __typename?: 'GetDiscountsResponse', pageInfo: { __typename?: 'PageInfo', startCursor?: string | null, endCursor?: string | null, hasNextPage: boolean }, results: Array<{ __typename?: 'discount', id: string, code: string, created_at: any, type: Discount_Type_Enum, is_disabled: boolean, is_dynamic: boolean, starts_at: any, ends_at?: any | null, usage_count: number, usage_limit?: number | null, usage_count_by_ticket: number, valid_duration?: string | null, discount_rule?: { __typename?: 'discount_rule', allocation?: Discount_Rule_Allocation_Enum | null, value: number, type: Discount_Rule_Type_Enum } | null }> } };

export type GetUserImageUploadLinkQueryVariables = Exact<{
  input: GetUserImageUploadLinkInput;
}>;


export type GetUserImageUploadLinkQuery = { __typename?: 'Query', getUserImageUploadLink: { __typename?: 'GetImageUploadLinkResponse', fileName: string, uploadUrl: string, url: string, type: string } };

export type GetOrganizationImageUploadLinkQueryVariables = Exact<{
  input: GetOrganizationImageUploadLinkInput;
}>;


export type GetOrganizationImageUploadLinkQuery = { __typename?: 'Query', getOrganizationImageUploadLink: { __typename?: 'GetImageUploadLinkResponse', fileName: string, uploadUrl: string, url: string, type: string } };

export type GetTicketIdsByOrderQueryVariables = Exact<{
  orderId: Scalars['String']['input'];
}>;


export type GetTicketIdsByOrderQuery = { __typename?: 'Query', getTicketIdsByOrder: Array<string> };

export type ReportStatusQueryVariables = Exact<{
  input: ReportStatusInput;
}>;


export type ReportStatusQuery = { __typename?: 'Query', reportStatus: { __typename?: 'ReportStatusResponse', reportId: string, status: ReportStatus, downloadUrl?: string | null } };

export type GetOrdersQueryVariables = Exact<{
  eventId: Scalars['ID']['input'];
  cursor?: InputMaybe<FindManyIdCursorInput>;
  q?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetOrdersQuery = { __typename?: 'Query', getOrders: { __typename?: 'GetOrdersResponse', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null }, orders: Array<{ __typename?: 'GetOrdersResponseOrder', createdAt: any, orderDisplayId: string, orderId: string, paymentMethod: string, status: string, ticketType: string, isRefundable: boolean, total: number, discountTotal: number, subtotal: number, receiverEmail: string, receiverName?: string | null, items: Array<{ __typename?: 'GetOrdersResponseItem', id: string, name: string, quantity: number, metadata?: any | null }>, user: { __typename?: 'GetOrdersResponseUser', displayName: string, email: string }, event: { __typename?: 'FlipEvent', id: string, isGeneralAdmission: boolean } }> } };

export type EventOccurrencesQueryVariables = Exact<{
  input: GetEventOccurrencesInput;
}>;


export type EventOccurrencesQuery = { __typename?: 'Query', eventOccurrences: { __typename?: 'GetEventOccurrencesResponse', results: Array<{ __typename?: 'FlipEvent', id: string, isOnSale: boolean, isMultipleDay: boolean, startAt: any, endAt: any, handle: string, isSoldOut: boolean, name: string, address?: { __typename?: 'FlipAddress', address?: string | null, city?: string | null } | null, venue?: { __typename?: 'FlipVenue', name: string } | null, media?: Array<{ __typename?: 'FlipMedia', id: string, type: MediaType, url: string }> | null }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null, startCursor?: string | null } } };

export type EventByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type EventByIdQuery = { __typename?: 'Query', eventById: { __typename?: 'FlipEvent', id: string, handle: string, name: string, startAt: any, endAt: any, onsale?: any | null, offsale?: any | null, hasSeatMap: boolean, maxTicketPerOrder?: number | null, isMultipleDay: boolean, isParentEvent: boolean, organizationId: string, media?: Array<{ __typename?: 'FlipMedia', id: string, url: string }> | null, seatMap?: { __typename?: 'FlipSeatMap', id: string, url: string, tierRules: any, holdSeatRules: any } | null } };

export type GetTicketTiersQueryVariables = Exact<{
  data: GetTicketTierInput;
}>;


export type GetTicketTiersQuery = { __typename?: 'Query', getTicketTiers: Array<{ __typename?: 'GetTicketTierResponse', id: string, name: string, description?: string | null, price: number, isVisible: boolean, saleStartAt: any, saleEndAt: any, initialInventory: number, totalSold: number, reservingQuantity: number, metadata?: any | null }> };

export type EventStatusQueryVariables = Exact<{
  handle: Scalars['String']['input'];
}>;


export type EventStatusQuery = { __typename?: 'Query', event: { __typename?: 'FlipEvent', id: string, handle: string, name: string, startAt: any, endAt: any, mediaCollection?: any | null, address?: { __typename?: 'FlipAddress', address?: string | null, city?: string | null, longitude?: string | null, latitude?: string | null, zip?: string | null } | null, venue?: { __typename?: 'FlipVenue', name: string } | null, organization: { __typename?: 'FlipOrganization', id: string, name: string, description?: string | null, logoURL?: string | null }, media?: Array<{ __typename?: 'FlipMedia', id: string, type: MediaType, url: string }> | null } };

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', currentUser: { __typename?: 'FlipUser', id: string, createdAt: any, updatedAt: any, displayName: string, firstName?: string | null, lastName?: string | null, email: string, phone?: string | null, gender?: Gender | null, coverImageURL?: string | null, profileImageURL?: string | null, bio?: string | null, birthday?: any | null, identityVerified: boolean, identityNumber?: string | null } };

export type OrganizationReportStatusQueryVariables = Exact<{
  input: OrganizationReportStatusInput;
}>;


export type OrganizationReportStatusQuery = { __typename?: 'Query', organizationReportStatus: { __typename?: 'ReportStatusResponse', status: ReportStatus, reportId: string, downloadUrl?: string | null } };

export type SendSignUpVerificationEmailMutationVariables = Exact<{
  data: SendSignUpVerificationEmailInput;
}>;


export type SendSignUpVerificationEmailMutation = { __typename?: 'Mutation', sendSignUpVerificationEmail: string };

export const EventFragmentFragmentDoc = gql`
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
export const OrderCard_EventFragmentDoc = gql`
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
export const EventCard_EventFragmentDoc = gql`
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
export const EventDetails_EventFragmentDoc = gql`
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
  maxTicketPerOrder
  status
  isMultipleDay
  parentEvent {
    id
  }
}
    `;
export const ParentEventDetails_EventFragmentDoc = gql`
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
  maxTicketPerOrder
  status
  isMultipleDay
  parentEvent {
    id
  }
}
    `;
export const EventDetailsDocument = gql`
    query EventDetails($handle: String!) {
  event(handle: $handle) {
    ...EventDetails_event
  }
}
    ${EventDetails_EventFragmentDoc}`;

/**
 * __useEventDetailsQuery__
 *
 * To run a query within a React component, call `useEventDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventDetailsQuery({
 *   variables: {
 *      handle: // value for 'handle'
 *   },
 * });
 */
export function useEventDetailsQuery(baseOptions: Apollo.QueryHookOptions<EventDetailsQuery, EventDetailsQueryVariables> & ({ variables: EventDetailsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EventDetailsQuery, EventDetailsQueryVariables>(EventDetailsDocument, options);
      }
export function useEventDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EventDetailsQuery, EventDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EventDetailsQuery, EventDetailsQueryVariables>(EventDetailsDocument, options);
        }
export function useEventDetailsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<EventDetailsQuery, EventDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<EventDetailsQuery, EventDetailsQueryVariables>(EventDetailsDocument, options);
        }
export type EventDetailsQueryHookResult = ReturnType<typeof useEventDetailsQuery>;
export type EventDetailsLazyQueryHookResult = ReturnType<typeof useEventDetailsLazyQuery>;
export type EventDetailsSuspenseQueryHookResult = ReturnType<typeof useEventDetailsSuspenseQuery>;
export type EventDetailsQueryResult = Apollo.QueryResult<EventDetailsQuery, EventDetailsQueryVariables>;
export const ParentEventDocument = gql`
    query ParentEvent($handle: String!) {
  parentEvent(handle: $handle) {
    ...ParentEventDetails_event
  }
}
    ${ParentEventDetails_EventFragmentDoc}`;

/**
 * __useParentEventQuery__
 *
 * To run a query within a React component, call `useParentEventQuery` and pass it any options that fit your needs.
 * When your component renders, `useParentEventQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useParentEventQuery({
 *   variables: {
 *      handle: // value for 'handle'
 *   },
 * });
 */
export function useParentEventQuery(baseOptions: Apollo.QueryHookOptions<ParentEventQuery, ParentEventQueryVariables> & ({ variables: ParentEventQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ParentEventQuery, ParentEventQueryVariables>(ParentEventDocument, options);
      }
export function useParentEventLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ParentEventQuery, ParentEventQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ParentEventQuery, ParentEventQueryVariables>(ParentEventDocument, options);
        }
export function useParentEventSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ParentEventQuery, ParentEventQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ParentEventQuery, ParentEventQueryVariables>(ParentEventDocument, options);
        }
export type ParentEventQueryHookResult = ReturnType<typeof useParentEventQuery>;
export type ParentEventLazyQueryHookResult = ReturnType<typeof useParentEventLazyQuery>;
export type ParentEventSuspenseQueryHookResult = ReturnType<typeof useParentEventSuspenseQuery>;
export type ParentEventQueryResult = Apollo.QueryResult<ParentEventQuery, ParentEventQueryVariables>;
export const GetMyCardsDocument = gql`
    query GetMyCards {
  getMyCards {
    id
    customer_id
    customer_email
    token_id
    masked_card_number
    payment_method_id
    metadata
    created_at
    updated_at
  }
}
    `;

/**
 * __useGetMyCardsQuery__
 *
 * To run a query within a React component, call `useGetMyCardsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyCardsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyCardsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyCardsQuery(baseOptions?: Apollo.QueryHookOptions<GetMyCardsQuery, GetMyCardsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyCardsQuery, GetMyCardsQueryVariables>(GetMyCardsDocument, options);
      }
export function useGetMyCardsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyCardsQuery, GetMyCardsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyCardsQuery, GetMyCardsQueryVariables>(GetMyCardsDocument, options);
        }
export function useGetMyCardsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetMyCardsQuery, GetMyCardsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMyCardsQuery, GetMyCardsQueryVariables>(GetMyCardsDocument, options);
        }
export type GetMyCardsQueryHookResult = ReturnType<typeof useGetMyCardsQuery>;
export type GetMyCardsLazyQueryHookResult = ReturnType<typeof useGetMyCardsLazyQuery>;
export type GetMyCardsSuspenseQueryHookResult = ReturnType<typeof useGetMyCardsSuspenseQuery>;
export type GetMyCardsQueryResult = Apollo.QueryResult<GetMyCardsQuery, GetMyCardsQueryVariables>;
export const DeleteMyCardDocument = gql`
    mutation DeleteMyCard($input: DeleteMyCardInput!) {
  deleteMyCard(input: $input) {
    id
  }
}
    `;
export type DeleteMyCardMutationFn = Apollo.MutationFunction<DeleteMyCardMutation, DeleteMyCardMutationVariables>;

/**
 * __useDeleteMyCardMutation__
 *
 * To run a mutation, you first call `useDeleteMyCardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMyCardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMyCardMutation, { data, loading, error }] = useDeleteMyCardMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteMyCardMutation(baseOptions?: Apollo.MutationHookOptions<DeleteMyCardMutation, DeleteMyCardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteMyCardMutation, DeleteMyCardMutationVariables>(DeleteMyCardDocument, options);
      }
export type DeleteMyCardMutationHookResult = ReturnType<typeof useDeleteMyCardMutation>;
export type DeleteMyCardMutationResult = Apollo.MutationResult<DeleteMyCardMutation>;
export type DeleteMyCardMutationOptions = Apollo.BaseMutationOptions<DeleteMyCardMutation, DeleteMyCardMutationVariables>;
export const DeleteMyAccountDocument = gql`
    mutation DeleteMyAccount($input: DeleteMyAccountInput!) {
  deleteMyAccount(input: $input)
}
    `;
export type DeleteMyAccountMutationFn = Apollo.MutationFunction<DeleteMyAccountMutation, DeleteMyAccountMutationVariables>;

/**
 * __useDeleteMyAccountMutation__
 *
 * To run a mutation, you first call `useDeleteMyAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMyAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMyAccountMutation, { data, loading, error }] = useDeleteMyAccountMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteMyAccountMutation(baseOptions?: Apollo.MutationHookOptions<DeleteMyAccountMutation, DeleteMyAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteMyAccountMutation, DeleteMyAccountMutationVariables>(DeleteMyAccountDocument, options);
      }
export type DeleteMyAccountMutationHookResult = ReturnType<typeof useDeleteMyAccountMutation>;
export type DeleteMyAccountMutationResult = Apollo.MutationResult<DeleteMyAccountMutation>;
export type DeleteMyAccountMutationOptions = Apollo.BaseMutationOptions<DeleteMyAccountMutation, DeleteMyAccountMutationVariables>;
export const SaveCardDocument = gql`
    mutation SaveCard($input: SaveCardInput!) {
  saveCard(input: $input) {
    id
  }
}
    `;
export type SaveCardMutationFn = Apollo.MutationFunction<SaveCardMutation, SaveCardMutationVariables>;

/**
 * __useSaveCardMutation__
 *
 * To run a mutation, you first call `useSaveCardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveCardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveCardMutation, { data, loading, error }] = useSaveCardMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSaveCardMutation(baseOptions?: Apollo.MutationHookOptions<SaveCardMutation, SaveCardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SaveCardMutation, SaveCardMutationVariables>(SaveCardDocument, options);
      }
export type SaveCardMutationHookResult = ReturnType<typeof useSaveCardMutation>;
export type SaveCardMutationResult = Apollo.MutationResult<SaveCardMutation>;
export type SaveCardMutationOptions = Apollo.BaseMutationOptions<SaveCardMutation, SaveCardMutationVariables>;
export const UpdatePersonalInfoDocument = gql`
    mutation UpdatePersonalInfo($data: UpdatePersonalInfoInput!) {
  updatePersonalInfo(data: $data) {
    id
  }
}
    `;
export type UpdatePersonalInfoMutationFn = Apollo.MutationFunction<UpdatePersonalInfoMutation, UpdatePersonalInfoMutationVariables>;

/**
 * __useUpdatePersonalInfoMutation__
 *
 * To run a mutation, you first call `useUpdatePersonalInfoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePersonalInfoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePersonalInfoMutation, { data, loading, error }] = useUpdatePersonalInfoMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdatePersonalInfoMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePersonalInfoMutation, UpdatePersonalInfoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePersonalInfoMutation, UpdatePersonalInfoMutationVariables>(UpdatePersonalInfoDocument, options);
      }
export type UpdatePersonalInfoMutationHookResult = ReturnType<typeof useUpdatePersonalInfoMutation>;
export type UpdatePersonalInfoMutationResult = Apollo.MutationResult<UpdatePersonalInfoMutation>;
export type UpdatePersonalInfoMutationOptions = Apollo.BaseMutationOptions<UpdatePersonalInfoMutation, UpdatePersonalInfoMutationVariables>;
export const SendVerifyAndChangeEmailEmailDocument = gql`
    mutation SendVerifyAndChangeEmailEmail($input: SendVerifyAndChangeEmailEmailInput!) {
  sendVerifyAndChangeEmailEmail(input: $input)
}
    `;
export type SendVerifyAndChangeEmailEmailMutationFn = Apollo.MutationFunction<SendVerifyAndChangeEmailEmailMutation, SendVerifyAndChangeEmailEmailMutationVariables>;

/**
 * __useSendVerifyAndChangeEmailEmailMutation__
 *
 * To run a mutation, you first call `useSendVerifyAndChangeEmailEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendVerifyAndChangeEmailEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendVerifyAndChangeEmailEmailMutation, { data, loading, error }] = useSendVerifyAndChangeEmailEmailMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSendVerifyAndChangeEmailEmailMutation(baseOptions?: Apollo.MutationHookOptions<SendVerifyAndChangeEmailEmailMutation, SendVerifyAndChangeEmailEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendVerifyAndChangeEmailEmailMutation, SendVerifyAndChangeEmailEmailMutationVariables>(SendVerifyAndChangeEmailEmailDocument, options);
      }
export type SendVerifyAndChangeEmailEmailMutationHookResult = ReturnType<typeof useSendVerifyAndChangeEmailEmailMutation>;
export type SendVerifyAndChangeEmailEmailMutationResult = Apollo.MutationResult<SendVerifyAndChangeEmailEmailMutation>;
export type SendVerifyAndChangeEmailEmailMutationOptions = Apollo.BaseMutationOptions<SendVerifyAndChangeEmailEmailMutation, SendVerifyAndChangeEmailEmailMutationVariables>;
export const ArtistsDocument = gql`
    query Artists {
  artists {
    handle
    name
    profileImageURL
    genre
    active
  }
}
    `;

/**
 * __useArtistsQuery__
 *
 * To run a query within a React component, call `useArtistsQuery` and pass it any options that fit your needs.
 * When your component renders, `useArtistsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useArtistsQuery({
 *   variables: {
 *   },
 * });
 */
export function useArtistsQuery(baseOptions?: Apollo.QueryHookOptions<ArtistsQuery, ArtistsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ArtistsQuery, ArtistsQueryVariables>(ArtistsDocument, options);
      }
export function useArtistsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ArtistsQuery, ArtistsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ArtistsQuery, ArtistsQueryVariables>(ArtistsDocument, options);
        }
export function useArtistsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ArtistsQuery, ArtistsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ArtistsQuery, ArtistsQueryVariables>(ArtistsDocument, options);
        }
export type ArtistsQueryHookResult = ReturnType<typeof useArtistsQuery>;
export type ArtistsLazyQueryHookResult = ReturnType<typeof useArtistsLazyQuery>;
export type ArtistsSuspenseQueryHookResult = ReturnType<typeof useArtistsSuspenseQuery>;
export type ArtistsQueryResult = Apollo.QueryResult<ArtistsQuery, ArtistsQueryVariables>;
export const EventsDocument = gql`
    query Events($input: GetEventsInput!) {
  events(input: $input) {
    results {
      ...EventFragment
    }
  }
}
    ${EventFragmentFragmentDoc}`;

/**
 * __useEventsQuery__
 *
 * To run a query within a React component, call `useEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEventsQuery(baseOptions: Apollo.QueryHookOptions<EventsQuery, EventsQueryVariables> & ({ variables: EventsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EventsQuery, EventsQueryVariables>(EventsDocument, options);
      }
export function useEventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EventsQuery, EventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EventsQuery, EventsQueryVariables>(EventsDocument, options);
        }
export function useEventsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<EventsQuery, EventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<EventsQuery, EventsQueryVariables>(EventsDocument, options);
        }
export type EventsQueryHookResult = ReturnType<typeof useEventsQuery>;
export type EventsLazyQueryHookResult = ReturnType<typeof useEventsLazyQuery>;
export type EventsSuspenseQueryHookResult = ReturnType<typeof useEventsSuspenseQuery>;
export type EventsQueryResult = Apollo.QueryResult<EventsQuery, EventsQueryVariables>;
export const UpdateCartMetadataDocument = gql`
    mutation UpdateCartMetadata($input: UpdateCartMetadataInput!) {
  updateCartMetadata(input: $input) {
    metadata
  }
}
    `;
export type UpdateCartMetadataMutationFn = Apollo.MutationFunction<UpdateCartMetadataMutation, UpdateCartMetadataMutationVariables>;

/**
 * __useUpdateCartMetadataMutation__
 *
 * To run a mutation, you first call `useUpdateCartMetadataMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCartMetadataMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCartMetadataMutation, { data, loading, error }] = useUpdateCartMetadataMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCartMetadataMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCartMetadataMutation, UpdateCartMetadataMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCartMetadataMutation, UpdateCartMetadataMutationVariables>(UpdateCartMetadataDocument, options);
      }
export type UpdateCartMetadataMutationHookResult = ReturnType<typeof useUpdateCartMetadataMutation>;
export type UpdateCartMetadataMutationResult = Apollo.MutationResult<UpdateCartMetadataMutation>;
export type UpdateCartMetadataMutationOptions = Apollo.BaseMutationOptions<UpdateCartMetadataMutation, UpdateCartMetadataMutationVariables>;
export const DeleteReservationSessionDocument = gql`
    mutation DeleteReservationSession($input: DeleteReservationSessionInput!) {
  deleteReservationSession(input: $input)
}
    `;
export type DeleteReservationSessionMutationFn = Apollo.MutationFunction<DeleteReservationSessionMutation, DeleteReservationSessionMutationVariables>;

/**
 * __useDeleteReservationSessionMutation__
 *
 * To run a mutation, you first call `useDeleteReservationSessionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteReservationSessionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteReservationSessionMutation, { data, loading, error }] = useDeleteReservationSessionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteReservationSessionMutation(baseOptions?: Apollo.MutationHookOptions<DeleteReservationSessionMutation, DeleteReservationSessionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteReservationSessionMutation, DeleteReservationSessionMutationVariables>(DeleteReservationSessionDocument, options);
      }
export type DeleteReservationSessionMutationHookResult = ReturnType<typeof useDeleteReservationSessionMutation>;
export type DeleteReservationSessionMutationResult = Apollo.MutationResult<DeleteReservationSessionMutation>;
export type DeleteReservationSessionMutationOptions = Apollo.BaseMutationOptions<DeleteReservationSessionMutation, DeleteReservationSessionMutationVariables>;
export const CreateEventPayoutRequestDocument = gql`
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
export type CreateEventPayoutRequestMutationFn = Apollo.MutationFunction<CreateEventPayoutRequestMutation, CreateEventPayoutRequestMutationVariables>;

/**
 * __useCreateEventPayoutRequestMutation__
 *
 * To run a mutation, you first call `useCreateEventPayoutRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEventPayoutRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEventPayoutRequestMutation, { data, loading, error }] = useCreateEventPayoutRequestMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateEventPayoutRequestMutation(baseOptions?: Apollo.MutationHookOptions<CreateEventPayoutRequestMutation, CreateEventPayoutRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateEventPayoutRequestMutation, CreateEventPayoutRequestMutationVariables>(CreateEventPayoutRequestDocument, options);
      }
export type CreateEventPayoutRequestMutationHookResult = ReturnType<typeof useCreateEventPayoutRequestMutation>;
export type CreateEventPayoutRequestMutationResult = Apollo.MutationResult<CreateEventPayoutRequestMutation>;
export type CreateEventPayoutRequestMutationOptions = Apollo.BaseMutationOptions<CreateEventPayoutRequestMutation, CreateEventPayoutRequestMutationVariables>;
export const CreateExternalEventDocument = gql`
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
export type CreateExternalEventMutationFn = Apollo.MutationFunction<CreateExternalEventMutation, CreateExternalEventMutationVariables>;

/**
 * __useCreateExternalEventMutation__
 *
 * To run a mutation, you first call `useCreateExternalEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateExternalEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createExternalEventMutation, { data, loading, error }] = useCreateExternalEventMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateExternalEventMutation(baseOptions?: Apollo.MutationHookOptions<CreateExternalEventMutation, CreateExternalEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateExternalEventMutation, CreateExternalEventMutationVariables>(CreateExternalEventDocument, options);
      }
export type CreateExternalEventMutationHookResult = ReturnType<typeof useCreateExternalEventMutation>;
export type CreateExternalEventMutationResult = Apollo.MutationResult<CreateExternalEventMutation>;
export type CreateExternalEventMutationOptions = Apollo.BaseMutationOptions<CreateExternalEventMutation, CreateExternalEventMutationVariables>;
export const UpsertOrganizationCheckoutConfigsDocument = gql`
    mutation UpsertOrganizationCheckoutConfigs($input: UpsertOrganizationCheckoutConfigsInput!) {
  upsertOrganizationCheckoutConfigs(input: $input) {
    id
  }
}
    `;
export type UpsertOrganizationCheckoutConfigsMutationFn = Apollo.MutationFunction<UpsertOrganizationCheckoutConfigsMutation, UpsertOrganizationCheckoutConfigsMutationVariables>;

/**
 * __useUpsertOrganizationCheckoutConfigsMutation__
 *
 * To run a mutation, you first call `useUpsertOrganizationCheckoutConfigsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpsertOrganizationCheckoutConfigsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upsertOrganizationCheckoutConfigsMutation, { data, loading, error }] = useUpsertOrganizationCheckoutConfigsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpsertOrganizationCheckoutConfigsMutation(baseOptions?: Apollo.MutationHookOptions<UpsertOrganizationCheckoutConfigsMutation, UpsertOrganizationCheckoutConfigsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpsertOrganizationCheckoutConfigsMutation, UpsertOrganizationCheckoutConfigsMutationVariables>(UpsertOrganizationCheckoutConfigsDocument, options);
      }
export type UpsertOrganizationCheckoutConfigsMutationHookResult = ReturnType<typeof useUpsertOrganizationCheckoutConfigsMutation>;
export type UpsertOrganizationCheckoutConfigsMutationResult = Apollo.MutationResult<UpsertOrganizationCheckoutConfigsMutation>;
export type UpsertOrganizationCheckoutConfigsMutationOptions = Apollo.BaseMutationOptions<UpsertOrganizationCheckoutConfigsMutation, UpsertOrganizationCheckoutConfigsMutationVariables>;
export const DeleteDiscountDocument = gql`
    mutation DeleteDiscount($input: DeleteDiscountInput!) {
  deleteDiscount(input: $input) {
    id
  }
}
    `;
export type DeleteDiscountMutationFn = Apollo.MutationFunction<DeleteDiscountMutation, DeleteDiscountMutationVariables>;

/**
 * __useDeleteDiscountMutation__
 *
 * To run a mutation, you first call `useDeleteDiscountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteDiscountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteDiscountMutation, { data, loading, error }] = useDeleteDiscountMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteDiscountMutation(baseOptions?: Apollo.MutationHookOptions<DeleteDiscountMutation, DeleteDiscountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteDiscountMutation, DeleteDiscountMutationVariables>(DeleteDiscountDocument, options);
      }
export type DeleteDiscountMutationHookResult = ReturnType<typeof useDeleteDiscountMutation>;
export type DeleteDiscountMutationResult = Apollo.MutationResult<DeleteDiscountMutation>;
export type DeleteDiscountMutationOptions = Apollo.BaseMutationOptions<DeleteDiscountMutation, DeleteDiscountMutationVariables>;
export const CreateDiscountsDocument = gql`
    mutation CreateDiscounts($input: CreateDiscountInput!) {
  createDiscount(input: $input) {
    id
  }
}
    `;
export type CreateDiscountsMutationFn = Apollo.MutationFunction<CreateDiscountsMutation, CreateDiscountsMutationVariables>;

/**
 * __useCreateDiscountsMutation__
 *
 * To run a mutation, you first call `useCreateDiscountsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDiscountsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDiscountsMutation, { data, loading, error }] = useCreateDiscountsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateDiscountsMutation(baseOptions?: Apollo.MutationHookOptions<CreateDiscountsMutation, CreateDiscountsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateDiscountsMutation, CreateDiscountsMutationVariables>(CreateDiscountsDocument, options);
      }
export type CreateDiscountsMutationHookResult = ReturnType<typeof useCreateDiscountsMutation>;
export type CreateDiscountsMutationResult = Apollo.MutationResult<CreateDiscountsMutation>;
export type CreateDiscountsMutationOptions = Apollo.BaseMutationOptions<CreateDiscountsMutation, CreateDiscountsMutationVariables>;
export const UpdateDiscountsDocument = gql`
    mutation UpdateDiscounts($input: UpdateDiscountInput!) {
  updateDiscount(input: $input) {
    id
  }
}
    `;
export type UpdateDiscountsMutationFn = Apollo.MutationFunction<UpdateDiscountsMutation, UpdateDiscountsMutationVariables>;

/**
 * __useUpdateDiscountsMutation__
 *
 * To run a mutation, you first call `useUpdateDiscountsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateDiscountsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateDiscountsMutation, { data, loading, error }] = useUpdateDiscountsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateDiscountsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateDiscountsMutation, UpdateDiscountsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateDiscountsMutation, UpdateDiscountsMutationVariables>(UpdateDiscountsDocument, options);
      }
export type UpdateDiscountsMutationHookResult = ReturnType<typeof useUpdateDiscountsMutation>;
export type UpdateDiscountsMutationResult = Apollo.MutationResult<UpdateDiscountsMutation>;
export type UpdateDiscountsMutationOptions = Apollo.BaseMutationOptions<UpdateDiscountsMutation, UpdateDiscountsMutationVariables>;
export const CreateEventDocument = gql`
    mutation CreateEvent($data: EventCreateInput!) {
  createEvent(data: $data) {
    id
  }
}
    `;
export type CreateEventMutationFn = Apollo.MutationFunction<CreateEventMutation, CreateEventMutationVariables>;

/**
 * __useCreateEventMutation__
 *
 * To run a mutation, you first call `useCreateEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEventMutation, { data, loading, error }] = useCreateEventMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateEventMutation(baseOptions?: Apollo.MutationHookOptions<CreateEventMutation, CreateEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateEventMutation, CreateEventMutationVariables>(CreateEventDocument, options);
      }
export type CreateEventMutationHookResult = ReturnType<typeof useCreateEventMutation>;
export type CreateEventMutationResult = Apollo.MutationResult<CreateEventMutation>;
export type CreateEventMutationOptions = Apollo.BaseMutationOptions<CreateEventMutation, CreateEventMutationVariables>;
export const RequestPayoutReportDocument = gql`
    mutation RequestPayoutReport($input: RequestPayoutReportInput!) {
  requestPayoutReport(input: $input) {
    reportId
  }
}
    `;
export type RequestPayoutReportMutationFn = Apollo.MutationFunction<RequestPayoutReportMutation, RequestPayoutReportMutationVariables>;

/**
 * __useRequestPayoutReportMutation__
 *
 * To run a mutation, you first call `useRequestPayoutReportMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRequestPayoutReportMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [requestPayoutReportMutation, { data, loading, error }] = useRequestPayoutReportMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRequestPayoutReportMutation(baseOptions?: Apollo.MutationHookOptions<RequestPayoutReportMutation, RequestPayoutReportMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RequestPayoutReportMutation, RequestPayoutReportMutationVariables>(RequestPayoutReportDocument, options);
      }
export type RequestPayoutReportMutationHookResult = ReturnType<typeof useRequestPayoutReportMutation>;
export type RequestPayoutReportMutationResult = Apollo.MutationResult<RequestPayoutReportMutation>;
export type RequestPayoutReportMutationOptions = Apollo.BaseMutationOptions<RequestPayoutReportMutation, RequestPayoutReportMutationVariables>;
export const RequestOrderReportDocument = gql`
    mutation RequestOrderReport($input: RequestOrderReportInput!) {
  requestOrderReport(input: $input) {
    reportId
  }
}
    `;
export type RequestOrderReportMutationFn = Apollo.MutationFunction<RequestOrderReportMutation, RequestOrderReportMutationVariables>;

/**
 * __useRequestOrderReportMutation__
 *
 * To run a mutation, you first call `useRequestOrderReportMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRequestOrderReportMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [requestOrderReportMutation, { data, loading, error }] = useRequestOrderReportMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRequestOrderReportMutation(baseOptions?: Apollo.MutationHookOptions<RequestOrderReportMutation, RequestOrderReportMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RequestOrderReportMutation, RequestOrderReportMutationVariables>(RequestOrderReportDocument, options);
      }
export type RequestOrderReportMutationHookResult = ReturnType<typeof useRequestOrderReportMutation>;
export type RequestOrderReportMutationResult = Apollo.MutationResult<RequestOrderReportMutation>;
export type RequestOrderReportMutationOptions = Apollo.BaseMutationOptions<RequestOrderReportMutation, RequestOrderReportMutationVariables>;
export const UpdateEventHoldSeatsRulesDocument = gql`
    mutation UpdateEventHoldSeatsRules($input: UpdateEventHoldSeatsRulesInput!) {
  updateEventHoldSeatsRules(input: $input) {
    id
  }
}
    `;
export type UpdateEventHoldSeatsRulesMutationFn = Apollo.MutationFunction<UpdateEventHoldSeatsRulesMutation, UpdateEventHoldSeatsRulesMutationVariables>;

/**
 * __useUpdateEventHoldSeatsRulesMutation__
 *
 * To run a mutation, you first call `useUpdateEventHoldSeatsRulesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateEventHoldSeatsRulesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateEventHoldSeatsRulesMutation, { data, loading, error }] = useUpdateEventHoldSeatsRulesMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateEventHoldSeatsRulesMutation(baseOptions?: Apollo.MutationHookOptions<UpdateEventHoldSeatsRulesMutation, UpdateEventHoldSeatsRulesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateEventHoldSeatsRulesMutation, UpdateEventHoldSeatsRulesMutationVariables>(UpdateEventHoldSeatsRulesDocument, options);
      }
export type UpdateEventHoldSeatsRulesMutationHookResult = ReturnType<typeof useUpdateEventHoldSeatsRulesMutation>;
export type UpdateEventHoldSeatsRulesMutationResult = Apollo.MutationResult<UpdateEventHoldSeatsRulesMutation>;
export type UpdateEventHoldSeatsRulesMutationOptions = Apollo.BaseMutationOptions<UpdateEventHoldSeatsRulesMutation, UpdateEventHoldSeatsRulesMutationVariables>;
export const UpdateTicketTierInventoryAndHoldDocument = gql`
    mutation UpdateTicketTierInventoryAndHold($input: UpdateTicketTierInventoryAndHeldInput!) {
  updateTicketTierInventoryAndHold(input: $input) {
    id
  }
}
    `;
export type UpdateTicketTierInventoryAndHoldMutationFn = Apollo.MutationFunction<UpdateTicketTierInventoryAndHoldMutation, UpdateTicketTierInventoryAndHoldMutationVariables>;

/**
 * __useUpdateTicketTierInventoryAndHoldMutation__
 *
 * To run a mutation, you first call `useUpdateTicketTierInventoryAndHoldMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTicketTierInventoryAndHoldMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTicketTierInventoryAndHoldMutation, { data, loading, error }] = useUpdateTicketTierInventoryAndHoldMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateTicketTierInventoryAndHoldMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTicketTierInventoryAndHoldMutation, UpdateTicketTierInventoryAndHoldMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTicketTierInventoryAndHoldMutation, UpdateTicketTierInventoryAndHoldMutationVariables>(UpdateTicketTierInventoryAndHoldDocument, options);
      }
export type UpdateTicketTierInventoryAndHoldMutationHookResult = ReturnType<typeof useUpdateTicketTierInventoryAndHoldMutation>;
export type UpdateTicketTierInventoryAndHoldMutationResult = Apollo.MutationResult<UpdateTicketTierInventoryAndHoldMutation>;
export type UpdateTicketTierInventoryAndHoldMutationOptions = Apollo.BaseMutationOptions<UpdateTicketTierInventoryAndHoldMutation, UpdateTicketTierInventoryAndHoldMutationVariables>;
export const SendPasswordlessSignInEmailDocument = gql`
    mutation SendPasswordlessSignInEmail($data: SendPasswordlessSignInEmailInput!) {
  sendPasswordlessSignInEmail(data: $data)
}
    `;
export type SendPasswordlessSignInEmailMutationFn = Apollo.MutationFunction<SendPasswordlessSignInEmailMutation, SendPasswordlessSignInEmailMutationVariables>;

/**
 * __useSendPasswordlessSignInEmailMutation__
 *
 * To run a mutation, you first call `useSendPasswordlessSignInEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendPasswordlessSignInEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendPasswordlessSignInEmailMutation, { data, loading, error }] = useSendPasswordlessSignInEmailMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSendPasswordlessSignInEmailMutation(baseOptions?: Apollo.MutationHookOptions<SendPasswordlessSignInEmailMutation, SendPasswordlessSignInEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendPasswordlessSignInEmailMutation, SendPasswordlessSignInEmailMutationVariables>(SendPasswordlessSignInEmailDocument, options);
      }
export type SendPasswordlessSignInEmailMutationHookResult = ReturnType<typeof useSendPasswordlessSignInEmailMutation>;
export type SendPasswordlessSignInEmailMutationResult = Apollo.MutationResult<SendPasswordlessSignInEmailMutation>;
export type SendPasswordlessSignInEmailMutationOptions = Apollo.BaseMutationOptions<SendPasswordlessSignInEmailMutation, SendPasswordlessSignInEmailMutationVariables>;
export const RequestOrganizationPayoutReportDocument = gql`
    mutation RequestOrganizationPayoutReport($input: RequestOrganizationPayoutReportInput!) {
  requestOrganizationPayoutReport(input: $input) {
    reportId
  }
}
    `;
export type RequestOrganizationPayoutReportMutationFn = Apollo.MutationFunction<RequestOrganizationPayoutReportMutation, RequestOrganizationPayoutReportMutationVariables>;

/**
 * __useRequestOrganizationPayoutReportMutation__
 *
 * To run a mutation, you first call `useRequestOrganizationPayoutReportMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRequestOrganizationPayoutReportMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [requestOrganizationPayoutReportMutation, { data, loading, error }] = useRequestOrganizationPayoutReportMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRequestOrganizationPayoutReportMutation(baseOptions?: Apollo.MutationHookOptions<RequestOrganizationPayoutReportMutation, RequestOrganizationPayoutReportMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RequestOrganizationPayoutReportMutation, RequestOrganizationPayoutReportMutationVariables>(RequestOrganizationPayoutReportDocument, options);
      }
export type RequestOrganizationPayoutReportMutationHookResult = ReturnType<typeof useRequestOrganizationPayoutReportMutation>;
export type RequestOrganizationPayoutReportMutationResult = Apollo.MutationResult<RequestOrganizationPayoutReportMutation>;
export type RequestOrganizationPayoutReportMutationOptions = Apollo.BaseMutationOptions<RequestOrganizationPayoutReportMutation, RequestOrganizationPayoutReportMutationVariables>;
export const GetReservationSessionDocument = gql`
    query GetReservationSession($input: GetReservationSessionInput!) {
  getReservationSession(input: $input) {
    expireAt
    bufferTimeMs
    isCartCompleted
  }
}
    `;

/**
 * __useGetReservationSessionQuery__
 *
 * To run a query within a React component, call `useGetReservationSessionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetReservationSessionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetReservationSessionQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetReservationSessionQuery(baseOptions: Apollo.QueryHookOptions<GetReservationSessionQuery, GetReservationSessionQueryVariables> & ({ variables: GetReservationSessionQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetReservationSessionQuery, GetReservationSessionQueryVariables>(GetReservationSessionDocument, options);
      }
export function useGetReservationSessionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetReservationSessionQuery, GetReservationSessionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetReservationSessionQuery, GetReservationSessionQueryVariables>(GetReservationSessionDocument, options);
        }
export function useGetReservationSessionSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetReservationSessionQuery, GetReservationSessionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetReservationSessionQuery, GetReservationSessionQueryVariables>(GetReservationSessionDocument, options);
        }
export type GetReservationSessionQueryHookResult = ReturnType<typeof useGetReservationSessionQuery>;
export type GetReservationSessionLazyQueryHookResult = ReturnType<typeof useGetReservationSessionLazyQuery>;
export type GetReservationSessionSuspenseQueryHookResult = ReturnType<typeof useGetReservationSessionSuspenseQuery>;
export type GetReservationSessionQueryResult = Apollo.QueryResult<GetReservationSessionQuery, GetReservationSessionQueryVariables>;
export const MyTicketsDocument = gql`
    query MyTickets($data: GetTicketHistoryInput!) {
  getMyTickets(data: $data) {
    results {
      ...EventCard_event
    }
  }
}
    ${EventCard_EventFragmentDoc}`;

/**
 * __useMyTicketsQuery__
 *
 * To run a query within a React component, call `useMyTicketsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyTicketsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyTicketsQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useMyTicketsQuery(baseOptions: Apollo.QueryHookOptions<MyTicketsQuery, MyTicketsQueryVariables> & ({ variables: MyTicketsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyTicketsQuery, MyTicketsQueryVariables>(MyTicketsDocument, options);
      }
export function useMyTicketsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyTicketsQuery, MyTicketsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyTicketsQuery, MyTicketsQueryVariables>(MyTicketsDocument, options);
        }
export function useMyTicketsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<MyTicketsQuery, MyTicketsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MyTicketsQuery, MyTicketsQueryVariables>(MyTicketsDocument, options);
        }
export type MyTicketsQueryHookResult = ReturnType<typeof useMyTicketsQuery>;
export type MyTicketsLazyQueryHookResult = ReturnType<typeof useMyTicketsLazyQuery>;
export type MyTicketsSuspenseQueryHookResult = ReturnType<typeof useMyTicketsSuspenseQuery>;
export type MyTicketsQueryResult = Apollo.QueryResult<MyTicketsQuery, MyTicketsQueryVariables>;
export const TicketDetailsDocument = gql`
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
    `;

/**
 * __useTicketDetailsQuery__
 *
 * To run a query within a React component, call `useTicketDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTicketDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTicketDetailsQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useTicketDetailsQuery(baseOptions: Apollo.QueryHookOptions<TicketDetailsQuery, TicketDetailsQueryVariables> & ({ variables: TicketDetailsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TicketDetailsQuery, TicketDetailsQueryVariables>(TicketDetailsDocument, options);
      }
export function useTicketDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TicketDetailsQuery, TicketDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TicketDetailsQuery, TicketDetailsQueryVariables>(TicketDetailsDocument, options);
        }
export function useTicketDetailsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<TicketDetailsQuery, TicketDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TicketDetailsQuery, TicketDetailsQueryVariables>(TicketDetailsDocument, options);
        }
export type TicketDetailsQueryHookResult = ReturnType<typeof useTicketDetailsQuery>;
export type TicketDetailsLazyQueryHookResult = ReturnType<typeof useTicketDetailsLazyQuery>;
export type TicketDetailsSuspenseQueryHookResult = ReturnType<typeof useTicketDetailsSuspenseQuery>;
export type TicketDetailsQueryResult = Apollo.QueryResult<TicketDetailsQuery, TicketDetailsQueryVariables>;
export const MyOrderDocument = gql`
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
    ${OrderCard_EventFragmentDoc}`;

/**
 * __useMyOrderQuery__
 *
 * To run a query within a React component, call `useMyOrderQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyOrderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyOrderQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useMyOrderQuery(baseOptions: Apollo.QueryHookOptions<MyOrderQuery, MyOrderQueryVariables> & ({ variables: MyOrderQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyOrderQuery, MyOrderQueryVariables>(MyOrderDocument, options);
      }
export function useMyOrderLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyOrderQuery, MyOrderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyOrderQuery, MyOrderQueryVariables>(MyOrderDocument, options);
        }
export function useMyOrderSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<MyOrderQuery, MyOrderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MyOrderQuery, MyOrderQueryVariables>(MyOrderDocument, options);
        }
export type MyOrderQueryHookResult = ReturnType<typeof useMyOrderQuery>;
export type MyOrderLazyQueryHookResult = ReturnType<typeof useMyOrderLazyQuery>;
export type MyOrderSuspenseQueryHookResult = ReturnType<typeof useMyOrderSuspenseQuery>;
export type MyOrderQueryResult = Apollo.QueryResult<MyOrderQuery, MyOrderQueryVariables>;
export const GetOrderDetailsDocument = gql`
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
    ${OrderCard_EventFragmentDoc}`;

/**
 * __useGetOrderDetailsQuery__
 *
 * To run a query within a React component, call `useGetOrderDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrderDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrderDetailsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetOrderDetailsQuery(baseOptions: Apollo.QueryHookOptions<GetOrderDetailsQuery, GetOrderDetailsQueryVariables> & ({ variables: GetOrderDetailsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrderDetailsQuery, GetOrderDetailsQueryVariables>(GetOrderDetailsDocument, options);
      }
export function useGetOrderDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrderDetailsQuery, GetOrderDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrderDetailsQuery, GetOrderDetailsQueryVariables>(GetOrderDetailsDocument, options);
        }
export function useGetOrderDetailsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetOrderDetailsQuery, GetOrderDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetOrderDetailsQuery, GetOrderDetailsQueryVariables>(GetOrderDetailsDocument, options);
        }
export type GetOrderDetailsQueryHookResult = ReturnType<typeof useGetOrderDetailsQuery>;
export type GetOrderDetailsLazyQueryHookResult = ReturnType<typeof useGetOrderDetailsLazyQuery>;
export type GetOrderDetailsSuspenseQueryHookResult = ReturnType<typeof useGetOrderDetailsSuspenseQuery>;
export type GetOrderDetailsQueryResult = Apollo.QueryResult<GetOrderDetailsQuery, GetOrderDetailsQueryVariables>;
export const GetEventViewsChartGroupByChannelDocument = gql`
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

/**
 * __useGetEventViewsChartGroupByChannelQuery__
 *
 * To run a query within a React component, call `useGetEventViewsChartGroupByChannelQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEventViewsChartGroupByChannelQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEventViewsChartGroupByChannelQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetEventViewsChartGroupByChannelQuery(baseOptions: Apollo.QueryHookOptions<GetEventViewsChartGroupByChannelQuery, GetEventViewsChartGroupByChannelQueryVariables> & ({ variables: GetEventViewsChartGroupByChannelQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEventViewsChartGroupByChannelQuery, GetEventViewsChartGroupByChannelQueryVariables>(GetEventViewsChartGroupByChannelDocument, options);
      }
export function useGetEventViewsChartGroupByChannelLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEventViewsChartGroupByChannelQuery, GetEventViewsChartGroupByChannelQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEventViewsChartGroupByChannelQuery, GetEventViewsChartGroupByChannelQueryVariables>(GetEventViewsChartGroupByChannelDocument, options);
        }
export function useGetEventViewsChartGroupByChannelSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetEventViewsChartGroupByChannelQuery, GetEventViewsChartGroupByChannelQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetEventViewsChartGroupByChannelQuery, GetEventViewsChartGroupByChannelQueryVariables>(GetEventViewsChartGroupByChannelDocument, options);
        }
export type GetEventViewsChartGroupByChannelQueryHookResult = ReturnType<typeof useGetEventViewsChartGroupByChannelQuery>;
export type GetEventViewsChartGroupByChannelLazyQueryHookResult = ReturnType<typeof useGetEventViewsChartGroupByChannelLazyQuery>;
export type GetEventViewsChartGroupByChannelSuspenseQueryHookResult = ReturnType<typeof useGetEventViewsChartGroupByChannelSuspenseQuery>;
export type GetEventViewsChartGroupByChannelQueryResult = Apollo.QueryResult<GetEventViewsChartGroupByChannelQuery, GetEventViewsChartGroupByChannelQueryVariables>;
export const GetTotalEventStatsGroupByChannelDocument = gql`
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

/**
 * __useGetTotalEventStatsGroupByChannelQuery__
 *
 * To run a query within a React component, call `useGetTotalEventStatsGroupByChannelQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTotalEventStatsGroupByChannelQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTotalEventStatsGroupByChannelQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetTotalEventStatsGroupByChannelQuery(baseOptions: Apollo.QueryHookOptions<GetTotalEventStatsGroupByChannelQuery, GetTotalEventStatsGroupByChannelQueryVariables> & ({ variables: GetTotalEventStatsGroupByChannelQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTotalEventStatsGroupByChannelQuery, GetTotalEventStatsGroupByChannelQueryVariables>(GetTotalEventStatsGroupByChannelDocument, options);
      }
export function useGetTotalEventStatsGroupByChannelLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTotalEventStatsGroupByChannelQuery, GetTotalEventStatsGroupByChannelQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTotalEventStatsGroupByChannelQuery, GetTotalEventStatsGroupByChannelQueryVariables>(GetTotalEventStatsGroupByChannelDocument, options);
        }
export function useGetTotalEventStatsGroupByChannelSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetTotalEventStatsGroupByChannelQuery, GetTotalEventStatsGroupByChannelQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTotalEventStatsGroupByChannelQuery, GetTotalEventStatsGroupByChannelQueryVariables>(GetTotalEventStatsGroupByChannelDocument, options);
        }
export type GetTotalEventStatsGroupByChannelQueryHookResult = ReturnType<typeof useGetTotalEventStatsGroupByChannelQuery>;
export type GetTotalEventStatsGroupByChannelLazyQueryHookResult = ReturnType<typeof useGetTotalEventStatsGroupByChannelLazyQuery>;
export type GetTotalEventStatsGroupByChannelSuspenseQueryHookResult = ReturnType<typeof useGetTotalEventStatsGroupByChannelSuspenseQuery>;
export type GetTotalEventStatsGroupByChannelQueryResult = Apollo.QueryResult<GetTotalEventStatsGroupByChannelQuery, GetTotalEventStatsGroupByChannelQueryVariables>;
export const GetTotalOrdersByLocationDocument = gql`
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

/**
 * __useGetTotalOrdersByLocationQuery__
 *
 * To run a query within a React component, call `useGetTotalOrdersByLocationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTotalOrdersByLocationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTotalOrdersByLocationQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetTotalOrdersByLocationQuery(baseOptions: Apollo.QueryHookOptions<GetTotalOrdersByLocationQuery, GetTotalOrdersByLocationQueryVariables> & ({ variables: GetTotalOrdersByLocationQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTotalOrdersByLocationQuery, GetTotalOrdersByLocationQueryVariables>(GetTotalOrdersByLocationDocument, options);
      }
export function useGetTotalOrdersByLocationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTotalOrdersByLocationQuery, GetTotalOrdersByLocationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTotalOrdersByLocationQuery, GetTotalOrdersByLocationQueryVariables>(GetTotalOrdersByLocationDocument, options);
        }
export function useGetTotalOrdersByLocationSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetTotalOrdersByLocationQuery, GetTotalOrdersByLocationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTotalOrdersByLocationQuery, GetTotalOrdersByLocationQueryVariables>(GetTotalOrdersByLocationDocument, options);
        }
export type GetTotalOrdersByLocationQueryHookResult = ReturnType<typeof useGetTotalOrdersByLocationQuery>;
export type GetTotalOrdersByLocationLazyQueryHookResult = ReturnType<typeof useGetTotalOrdersByLocationLazyQuery>;
export type GetTotalOrdersByLocationSuspenseQueryHookResult = ReturnType<typeof useGetTotalOrdersByLocationSuspenseQuery>;
export type GetTotalOrdersByLocationQueryResult = Apollo.QueryResult<GetTotalOrdersByLocationQuery, GetTotalOrdersByLocationQueryVariables>;
export const GetTotalEventDetailsViewsDocument = gql`
    query GetTotalEventDetailsViews($input: GetTotalEventDetailsViewInput!) {
  getTotalEventDetailsViews(input: $input) {
    sameDayLastWeekCount
    thisMonthCount
    lastMonthCount
    last24HourCount
  }
}
    `;

/**
 * __useGetTotalEventDetailsViewsQuery__
 *
 * To run a query within a React component, call `useGetTotalEventDetailsViewsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTotalEventDetailsViewsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTotalEventDetailsViewsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetTotalEventDetailsViewsQuery(baseOptions: Apollo.QueryHookOptions<GetTotalEventDetailsViewsQuery, GetTotalEventDetailsViewsQueryVariables> & ({ variables: GetTotalEventDetailsViewsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTotalEventDetailsViewsQuery, GetTotalEventDetailsViewsQueryVariables>(GetTotalEventDetailsViewsDocument, options);
      }
export function useGetTotalEventDetailsViewsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTotalEventDetailsViewsQuery, GetTotalEventDetailsViewsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTotalEventDetailsViewsQuery, GetTotalEventDetailsViewsQueryVariables>(GetTotalEventDetailsViewsDocument, options);
        }
export function useGetTotalEventDetailsViewsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetTotalEventDetailsViewsQuery, GetTotalEventDetailsViewsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTotalEventDetailsViewsQuery, GetTotalEventDetailsViewsQueryVariables>(GetTotalEventDetailsViewsDocument, options);
        }
export type GetTotalEventDetailsViewsQueryHookResult = ReturnType<typeof useGetTotalEventDetailsViewsQuery>;
export type GetTotalEventDetailsViewsLazyQueryHookResult = ReturnType<typeof useGetTotalEventDetailsViewsLazyQuery>;
export type GetTotalEventDetailsViewsSuspenseQueryHookResult = ReturnType<typeof useGetTotalEventDetailsViewsSuspenseQuery>;
export type GetTotalEventDetailsViewsQueryResult = Apollo.QueryResult<GetTotalEventDetailsViewsQuery, GetTotalEventDetailsViewsQueryVariables>;
export const GetMyOrganizationsDocument = gql`
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

/**
 * __useGetMyOrganizationsQuery__
 *
 * To run a query within a React component, call `useGetMyOrganizationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyOrganizationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyOrganizationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyOrganizationsQuery(baseOptions?: Apollo.QueryHookOptions<GetMyOrganizationsQuery, GetMyOrganizationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyOrganizationsQuery, GetMyOrganizationsQueryVariables>(GetMyOrganizationsDocument, options);
      }
export function useGetMyOrganizationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyOrganizationsQuery, GetMyOrganizationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyOrganizationsQuery, GetMyOrganizationsQueryVariables>(GetMyOrganizationsDocument, options);
        }
export function useGetMyOrganizationsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetMyOrganizationsQuery, GetMyOrganizationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMyOrganizationsQuery, GetMyOrganizationsQueryVariables>(GetMyOrganizationsDocument, options);
        }
export type GetMyOrganizationsQueryHookResult = ReturnType<typeof useGetMyOrganizationsQuery>;
export type GetMyOrganizationsLazyQueryHookResult = ReturnType<typeof useGetMyOrganizationsLazyQuery>;
export type GetMyOrganizationsSuspenseQueryHookResult = ReturnType<typeof useGetMyOrganizationsSuspenseQuery>;
export type GetMyOrganizationsQueryResult = Apollo.QueryResult<GetMyOrganizationsQuery, GetMyOrganizationsQueryVariables>;
export const GetMyEventsDocument = gql`
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

/**
 * __useGetMyEventsQuery__
 *
 * To run a query within a React component, call `useGetMyEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyEventsQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useGetMyEventsQuery(baseOptions: Apollo.QueryHookOptions<GetMyEventsQuery, GetMyEventsQueryVariables> & ({ variables: GetMyEventsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyEventsQuery, GetMyEventsQueryVariables>(GetMyEventsDocument, options);
      }
export function useGetMyEventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyEventsQuery, GetMyEventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyEventsQuery, GetMyEventsQueryVariables>(GetMyEventsDocument, options);
        }
export function useGetMyEventsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetMyEventsQuery, GetMyEventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMyEventsQuery, GetMyEventsQueryVariables>(GetMyEventsDocument, options);
        }
export type GetMyEventsQueryHookResult = ReturnType<typeof useGetMyEventsQuery>;
export type GetMyEventsLazyQueryHookResult = ReturnType<typeof useGetMyEventsLazyQuery>;
export type GetMyEventsSuspenseQueryHookResult = ReturnType<typeof useGetMyEventsSuspenseQuery>;
export type GetMyEventsQueryResult = Apollo.QueryResult<GetMyEventsQuery, GetMyEventsQueryVariables>;
export const GetSeatMapDocument = gql`
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

/**
 * __useGetSeatMapQuery__
 *
 * To run a query within a React component, call `useGetSeatMapQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSeatMapQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSeatMapQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetSeatMapQuery(baseOptions: Apollo.QueryHookOptions<GetSeatMapQuery, GetSeatMapQueryVariables> & ({ variables: GetSeatMapQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSeatMapQuery, GetSeatMapQueryVariables>(GetSeatMapDocument, options);
      }
export function useGetSeatMapLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSeatMapQuery, GetSeatMapQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSeatMapQuery, GetSeatMapQueryVariables>(GetSeatMapDocument, options);
        }
export function useGetSeatMapSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetSeatMapQuery, GetSeatMapQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSeatMapQuery, GetSeatMapQueryVariables>(GetSeatMapDocument, options);
        }
export type GetSeatMapQueryHookResult = ReturnType<typeof useGetSeatMapQuery>;
export type GetSeatMapLazyQueryHookResult = ReturnType<typeof useGetSeatMapLazyQuery>;
export type GetSeatMapSuspenseQueryHookResult = ReturnType<typeof useGetSeatMapSuspenseQuery>;
export type GetSeatMapQueryResult = Apollo.QueryResult<GetSeatMapQuery, GetSeatMapQueryVariables>;
export const GetReservationSessionByEventDocument = gql`
    query GetReservationSessionByEvent($input: GetReservationSessionByEventInput!) {
  getReservationSessionByEvent(input: $input) {
    expireAt
    bufferTimeMs
    cartId
  }
}
    `;

/**
 * __useGetReservationSessionByEventQuery__
 *
 * To run a query within a React component, call `useGetReservationSessionByEventQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetReservationSessionByEventQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetReservationSessionByEventQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetReservationSessionByEventQuery(baseOptions: Apollo.QueryHookOptions<GetReservationSessionByEventQuery, GetReservationSessionByEventQueryVariables> & ({ variables: GetReservationSessionByEventQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetReservationSessionByEventQuery, GetReservationSessionByEventQueryVariables>(GetReservationSessionByEventDocument, options);
      }
export function useGetReservationSessionByEventLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetReservationSessionByEventQuery, GetReservationSessionByEventQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetReservationSessionByEventQuery, GetReservationSessionByEventQueryVariables>(GetReservationSessionByEventDocument, options);
        }
export function useGetReservationSessionByEventSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetReservationSessionByEventQuery, GetReservationSessionByEventQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetReservationSessionByEventQuery, GetReservationSessionByEventQueryVariables>(GetReservationSessionByEventDocument, options);
        }
export type GetReservationSessionByEventQueryHookResult = ReturnType<typeof useGetReservationSessionByEventQuery>;
export type GetReservationSessionByEventLazyQueryHookResult = ReturnType<typeof useGetReservationSessionByEventLazyQuery>;
export type GetReservationSessionByEventSuspenseQueryHookResult = ReturnType<typeof useGetReservationSessionByEventSuspenseQuery>;
export type GetReservationSessionByEventQueryResult = Apollo.QueryResult<GetReservationSessionByEventQuery, GetReservationSessionByEventQueryVariables>;
export const GetEventFinancialSummaryDocument = gql`
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

/**
 * __useGetEventFinancialSummaryQuery__
 *
 * To run a query within a React component, call `useGetEventFinancialSummaryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEventFinancialSummaryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEventFinancialSummaryQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetEventFinancialSummaryQuery(baseOptions: Apollo.QueryHookOptions<GetEventFinancialSummaryQuery, GetEventFinancialSummaryQueryVariables> & ({ variables: GetEventFinancialSummaryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEventFinancialSummaryQuery, GetEventFinancialSummaryQueryVariables>(GetEventFinancialSummaryDocument, options);
      }
export function useGetEventFinancialSummaryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEventFinancialSummaryQuery, GetEventFinancialSummaryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEventFinancialSummaryQuery, GetEventFinancialSummaryQueryVariables>(GetEventFinancialSummaryDocument, options);
        }
export function useGetEventFinancialSummarySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetEventFinancialSummaryQuery, GetEventFinancialSummaryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetEventFinancialSummaryQuery, GetEventFinancialSummaryQueryVariables>(GetEventFinancialSummaryDocument, options);
        }
export type GetEventFinancialSummaryQueryHookResult = ReturnType<typeof useGetEventFinancialSummaryQuery>;
export type GetEventFinancialSummaryLazyQueryHookResult = ReturnType<typeof useGetEventFinancialSummaryLazyQuery>;
export type GetEventFinancialSummarySuspenseQueryHookResult = ReturnType<typeof useGetEventFinancialSummarySuspenseQuery>;
export type GetEventFinancialSummaryQueryResult = Apollo.QueryResult<GetEventFinancialSummaryQuery, GetEventFinancialSummaryQueryVariables>;
export const GetPayoutMethodsDocument = gql`
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

/**
 * __useGetPayoutMethodsQuery__
 *
 * To run a query within a React component, call `useGetPayoutMethodsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPayoutMethodsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPayoutMethodsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetPayoutMethodsQuery(baseOptions: Apollo.QueryHookOptions<GetPayoutMethodsQuery, GetPayoutMethodsQueryVariables> & ({ variables: GetPayoutMethodsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPayoutMethodsQuery, GetPayoutMethodsQueryVariables>(GetPayoutMethodsDocument, options);
      }
export function useGetPayoutMethodsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPayoutMethodsQuery, GetPayoutMethodsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPayoutMethodsQuery, GetPayoutMethodsQueryVariables>(GetPayoutMethodsDocument, options);
        }
export function useGetPayoutMethodsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetPayoutMethodsQuery, GetPayoutMethodsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPayoutMethodsQuery, GetPayoutMethodsQueryVariables>(GetPayoutMethodsDocument, options);
        }
export type GetPayoutMethodsQueryHookResult = ReturnType<typeof useGetPayoutMethodsQuery>;
export type GetPayoutMethodsLazyQueryHookResult = ReturnType<typeof useGetPayoutMethodsLazyQuery>;
export type GetPayoutMethodsSuspenseQueryHookResult = ReturnType<typeof useGetPayoutMethodsSuspenseQuery>;
export type GetPayoutMethodsQueryResult = Apollo.QueryResult<GetPayoutMethodsQuery, GetPayoutMethodsQueryVariables>;
export const PayoutsDocument = gql`
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

/**
 * __usePayoutsQuery__
 *
 * To run a query within a React component, call `usePayoutsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePayoutsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePayoutsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePayoutsQuery(baseOptions: Apollo.QueryHookOptions<PayoutsQuery, PayoutsQueryVariables> & ({ variables: PayoutsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PayoutsQuery, PayoutsQueryVariables>(PayoutsDocument, options);
      }
export function usePayoutsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PayoutsQuery, PayoutsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PayoutsQuery, PayoutsQueryVariables>(PayoutsDocument, options);
        }
export function usePayoutsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<PayoutsQuery, PayoutsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PayoutsQuery, PayoutsQueryVariables>(PayoutsDocument, options);
        }
export type PayoutsQueryHookResult = ReturnType<typeof usePayoutsQuery>;
export type PayoutsLazyQueryHookResult = ReturnType<typeof usePayoutsLazyQuery>;
export type PayoutsSuspenseQueryHookResult = ReturnType<typeof usePayoutsSuspenseQuery>;
export type PayoutsQueryResult = Apollo.QueryResult<PayoutsQuery, PayoutsQueryVariables>;
export const OrganizationDocument = gql`
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

/**
 * __useOrganizationQuery__
 *
 * To run a query within a React component, call `useOrganizationQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrganizationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrganizationQuery({
 *   variables: {
 *      handle: // value for 'handle'
 *   },
 * });
 */
export function useOrganizationQuery(baseOptions: Apollo.QueryHookOptions<OrganizationQuery, OrganizationQueryVariables> & ({ variables: OrganizationQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OrganizationQuery, OrganizationQueryVariables>(OrganizationDocument, options);
      }
export function useOrganizationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OrganizationQuery, OrganizationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OrganizationQuery, OrganizationQueryVariables>(OrganizationDocument, options);
        }
export function useOrganizationSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<OrganizationQuery, OrganizationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<OrganizationQuery, OrganizationQueryVariables>(OrganizationDocument, options);
        }
export type OrganizationQueryHookResult = ReturnType<typeof useOrganizationQuery>;
export type OrganizationLazyQueryHookResult = ReturnType<typeof useOrganizationLazyQuery>;
export type OrganizationSuspenseQueryHookResult = ReturnType<typeof useOrganizationSuspenseQuery>;
export type OrganizationQueryResult = Apollo.QueryResult<OrganizationQuery, OrganizationQueryVariables>;
export const MyEventWalletDocument = gql`
    query MyEventWallet($input: GetMyEventWalletInput!) {
  myEventWallet(input: $input) {
    id
    type
    amount
    currency
  }
}
    `;

/**
 * __useMyEventWalletQuery__
 *
 * To run a query within a React component, call `useMyEventWalletQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyEventWalletQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyEventWalletQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useMyEventWalletQuery(baseOptions: Apollo.QueryHookOptions<MyEventWalletQuery, MyEventWalletQueryVariables> & ({ variables: MyEventWalletQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyEventWalletQuery, MyEventWalletQueryVariables>(MyEventWalletDocument, options);
      }
export function useMyEventWalletLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyEventWalletQuery, MyEventWalletQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyEventWalletQuery, MyEventWalletQueryVariables>(MyEventWalletDocument, options);
        }
export function useMyEventWalletSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<MyEventWalletQuery, MyEventWalletQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MyEventWalletQuery, MyEventWalletQueryVariables>(MyEventWalletDocument, options);
        }
export type MyEventWalletQueryHookResult = ReturnType<typeof useMyEventWalletQuery>;
export type MyEventWalletLazyQueryHookResult = ReturnType<typeof useMyEventWalletLazyQuery>;
export type MyEventWalletSuspenseQueryHookResult = ReturnType<typeof useMyEventWalletSuspenseQuery>;
export type MyEventWalletQueryResult = Apollo.QueryResult<MyEventWalletQuery, MyEventWalletQueryVariables>;
export const PayoutSummaryDocument = gql`
    query PayoutSummary($input: GetPayoutSummaryInput!) {
  payoutSummary(input: $input) {
    totalPaidOutCount
    totalPaidOutAmount
    pendingPayoutAmount
    pendingPayOutCount
  }
}
    `;

/**
 * __usePayoutSummaryQuery__
 *
 * To run a query within a React component, call `usePayoutSummaryQuery` and pass it any options that fit your needs.
 * When your component renders, `usePayoutSummaryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePayoutSummaryQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePayoutSummaryQuery(baseOptions: Apollo.QueryHookOptions<PayoutSummaryQuery, PayoutSummaryQueryVariables> & ({ variables: PayoutSummaryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PayoutSummaryQuery, PayoutSummaryQueryVariables>(PayoutSummaryDocument, options);
      }
export function usePayoutSummaryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PayoutSummaryQuery, PayoutSummaryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PayoutSummaryQuery, PayoutSummaryQueryVariables>(PayoutSummaryDocument, options);
        }
export function usePayoutSummarySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<PayoutSummaryQuery, PayoutSummaryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PayoutSummaryQuery, PayoutSummaryQueryVariables>(PayoutSummaryDocument, options);
        }
export type PayoutSummaryQueryHookResult = ReturnType<typeof usePayoutSummaryQuery>;
export type PayoutSummaryLazyQueryHookResult = ReturnType<typeof usePayoutSummaryLazyQuery>;
export type PayoutSummarySuspenseQueryHookResult = ReturnType<typeof usePayoutSummarySuspenseQuery>;
export type PayoutSummaryQueryResult = Apollo.QueryResult<PayoutSummaryQuery, PayoutSummaryQueryVariables>;
export const ArtistDocument = gql`
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

/**
 * __useArtistQuery__
 *
 * To run a query within a React component, call `useArtistQuery` and pass it any options that fit your needs.
 * When your component renders, `useArtistQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useArtistQuery({
 *   variables: {
 *      handle: // value for 'handle'
 *   },
 * });
 */
export function useArtistQuery(baseOptions: Apollo.QueryHookOptions<ArtistQuery, ArtistQueryVariables> & ({ variables: ArtistQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ArtistQuery, ArtistQueryVariables>(ArtistDocument, options);
      }
export function useArtistLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ArtistQuery, ArtistQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ArtistQuery, ArtistQueryVariables>(ArtistDocument, options);
        }
export function useArtistSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ArtistQuery, ArtistQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ArtistQuery, ArtistQueryVariables>(ArtistDocument, options);
        }
export type ArtistQueryHookResult = ReturnType<typeof useArtistQuery>;
export type ArtistLazyQueryHookResult = ReturnType<typeof useArtistLazyQuery>;
export type ArtistSuspenseQueryHookResult = ReturnType<typeof useArtistSuspenseQuery>;
export type ArtistQueryResult = Apollo.QueryResult<ArtistQuery, ArtistQueryVariables>;
export const ExternalEventsDocument = gql`
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

/**
 * __useExternalEventsQuery__
 *
 * To run a query within a React component, call `useExternalEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useExternalEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExternalEventsQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useExternalEventsQuery(baseOptions: Apollo.QueryHookOptions<ExternalEventsQuery, ExternalEventsQueryVariables> & ({ variables: ExternalEventsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ExternalEventsQuery, ExternalEventsQueryVariables>(ExternalEventsDocument, options);
      }
export function useExternalEventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ExternalEventsQuery, ExternalEventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ExternalEventsQuery, ExternalEventsQueryVariables>(ExternalEventsDocument, options);
        }
export function useExternalEventsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ExternalEventsQuery, ExternalEventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ExternalEventsQuery, ExternalEventsQueryVariables>(ExternalEventsDocument, options);
        }
export type ExternalEventsQueryHookResult = ReturnType<typeof useExternalEventsQuery>;
export type ExternalEventsLazyQueryHookResult = ReturnType<typeof useExternalEventsLazyQuery>;
export type ExternalEventsSuspenseQueryHookResult = ReturnType<typeof useExternalEventsSuspenseQuery>;
export type ExternalEventsQueryResult = Apollo.QueryResult<ExternalEventsQuery, ExternalEventsQueryVariables>;
export const PayoutRequestDocument = gql`
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
    `;

/**
 * __usePayoutRequestQuery__
 *
 * To run a query within a React component, call `usePayoutRequestQuery` and pass it any options that fit your needs.
 * When your component renders, `usePayoutRequestQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePayoutRequestQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePayoutRequestQuery(baseOptions: Apollo.QueryHookOptions<PayoutRequestQuery, PayoutRequestQueryVariables> & ({ variables: PayoutRequestQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PayoutRequestQuery, PayoutRequestQueryVariables>(PayoutRequestDocument, options);
      }
export function usePayoutRequestLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PayoutRequestQuery, PayoutRequestQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PayoutRequestQuery, PayoutRequestQueryVariables>(PayoutRequestDocument, options);
        }
export function usePayoutRequestSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<PayoutRequestQuery, PayoutRequestQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PayoutRequestQuery, PayoutRequestQueryVariables>(PayoutRequestDocument, options);
        }
export type PayoutRequestQueryHookResult = ReturnType<typeof usePayoutRequestQuery>;
export type PayoutRequestLazyQueryHookResult = ReturnType<typeof usePayoutRequestLazyQuery>;
export type PayoutRequestSuspenseQueryHookResult = ReturnType<typeof usePayoutRequestSuspenseQuery>;
export type PayoutRequestQueryResult = Apollo.QueryResult<PayoutRequestQuery, PayoutRequestQueryVariables>;
export const BalanceTransactionsDocument = gql`
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
    `;

/**
 * __useBalanceTransactionsQuery__
 *
 * To run a query within a React component, call `useBalanceTransactionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useBalanceTransactionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBalanceTransactionsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useBalanceTransactionsQuery(baseOptions: Apollo.QueryHookOptions<BalanceTransactionsQuery, BalanceTransactionsQueryVariables> & ({ variables: BalanceTransactionsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BalanceTransactionsQuery, BalanceTransactionsQueryVariables>(BalanceTransactionsDocument, options);
      }
export function useBalanceTransactionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BalanceTransactionsQuery, BalanceTransactionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BalanceTransactionsQuery, BalanceTransactionsQueryVariables>(BalanceTransactionsDocument, options);
        }
export function useBalanceTransactionsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<BalanceTransactionsQuery, BalanceTransactionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<BalanceTransactionsQuery, BalanceTransactionsQueryVariables>(BalanceTransactionsDocument, options);
        }
export type BalanceTransactionsQueryHookResult = ReturnType<typeof useBalanceTransactionsQuery>;
export type BalanceTransactionsLazyQueryHookResult = ReturnType<typeof useBalanceTransactionsLazyQuery>;
export type BalanceTransactionsSuspenseQueryHookResult = ReturnType<typeof useBalanceTransactionsSuspenseQuery>;
export type BalanceTransactionsQueryResult = Apollo.QueryResult<BalanceTransactionsQuery, BalanceTransactionsQueryVariables>;
export const GetOrCreateOfflineSaleCodeDocument = gql`
    query GetOrCreateOfflineSaleCode($input: GetOrCreateOfflineSaleCodeInput!) {
  getOrCreateOfflineSaleCode(input: $input) {
    offlineSaleCode
  }
}
    `;

/**
 * __useGetOrCreateOfflineSaleCodeQuery__
 *
 * To run a query within a React component, call `useGetOrCreateOfflineSaleCodeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrCreateOfflineSaleCodeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrCreateOfflineSaleCodeQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetOrCreateOfflineSaleCodeQuery(baseOptions: Apollo.QueryHookOptions<GetOrCreateOfflineSaleCodeQuery, GetOrCreateOfflineSaleCodeQueryVariables> & ({ variables: GetOrCreateOfflineSaleCodeQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrCreateOfflineSaleCodeQuery, GetOrCreateOfflineSaleCodeQueryVariables>(GetOrCreateOfflineSaleCodeDocument, options);
      }
export function useGetOrCreateOfflineSaleCodeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrCreateOfflineSaleCodeQuery, GetOrCreateOfflineSaleCodeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrCreateOfflineSaleCodeQuery, GetOrCreateOfflineSaleCodeQueryVariables>(GetOrCreateOfflineSaleCodeDocument, options);
        }
export function useGetOrCreateOfflineSaleCodeSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetOrCreateOfflineSaleCodeQuery, GetOrCreateOfflineSaleCodeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetOrCreateOfflineSaleCodeQuery, GetOrCreateOfflineSaleCodeQueryVariables>(GetOrCreateOfflineSaleCodeDocument, options);
        }
export type GetOrCreateOfflineSaleCodeQueryHookResult = ReturnType<typeof useGetOrCreateOfflineSaleCodeQuery>;
export type GetOrCreateOfflineSaleCodeLazyQueryHookResult = ReturnType<typeof useGetOrCreateOfflineSaleCodeLazyQuery>;
export type GetOrCreateOfflineSaleCodeSuspenseQueryHookResult = ReturnType<typeof useGetOrCreateOfflineSaleCodeSuspenseQuery>;
export type GetOrCreateOfflineSaleCodeQueryResult = Apollo.QueryResult<GetOrCreateOfflineSaleCodeQuery, GetOrCreateOfflineSaleCodeQueryVariables>;
export const OrganizationCheckoutConfigsDocument = gql`
    query OrganizationCheckoutConfigs($input: GetOrganizationCheckoutConfigsInput!) {
  organizationCheckoutConfigs(input: $input) {
    offlineSalesEnabled
    isShowCheckoutOptions
  }
}
    `;

/**
 * __useOrganizationCheckoutConfigsQuery__
 *
 * To run a query within a React component, call `useOrganizationCheckoutConfigsQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrganizationCheckoutConfigsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrganizationCheckoutConfigsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useOrganizationCheckoutConfigsQuery(baseOptions: Apollo.QueryHookOptions<OrganizationCheckoutConfigsQuery, OrganizationCheckoutConfigsQueryVariables> & ({ variables: OrganizationCheckoutConfigsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OrganizationCheckoutConfigsQuery, OrganizationCheckoutConfigsQueryVariables>(OrganizationCheckoutConfigsDocument, options);
      }
export function useOrganizationCheckoutConfigsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OrganizationCheckoutConfigsQuery, OrganizationCheckoutConfigsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OrganizationCheckoutConfigsQuery, OrganizationCheckoutConfigsQueryVariables>(OrganizationCheckoutConfigsDocument, options);
        }
export function useOrganizationCheckoutConfigsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<OrganizationCheckoutConfigsQuery, OrganizationCheckoutConfigsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<OrganizationCheckoutConfigsQuery, OrganizationCheckoutConfigsQueryVariables>(OrganizationCheckoutConfigsDocument, options);
        }
export type OrganizationCheckoutConfigsQueryHookResult = ReturnType<typeof useOrganizationCheckoutConfigsQuery>;
export type OrganizationCheckoutConfigsLazyQueryHookResult = ReturnType<typeof useOrganizationCheckoutConfigsLazyQuery>;
export type OrganizationCheckoutConfigsSuspenseQueryHookResult = ReturnType<typeof useOrganizationCheckoutConfigsSuspenseQuery>;
export type OrganizationCheckoutConfigsQueryResult = Apollo.QueryResult<OrganizationCheckoutConfigsQuery, OrganizationCheckoutConfigsQueryVariables>;
export const DiscountsDocument = gql`
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
    `;

/**
 * __useDiscountsQuery__
 *
 * To run a query within a React component, call `useDiscountsQuery` and pass it any options that fit your needs.
 * When your component renders, `useDiscountsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDiscountsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDiscountsQuery(baseOptions: Apollo.QueryHookOptions<DiscountsQuery, DiscountsQueryVariables> & ({ variables: DiscountsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DiscountsQuery, DiscountsQueryVariables>(DiscountsDocument, options);
      }
export function useDiscountsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DiscountsQuery, DiscountsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DiscountsQuery, DiscountsQueryVariables>(DiscountsDocument, options);
        }
export function useDiscountsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<DiscountsQuery, DiscountsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<DiscountsQuery, DiscountsQueryVariables>(DiscountsDocument, options);
        }
export type DiscountsQueryHookResult = ReturnType<typeof useDiscountsQuery>;
export type DiscountsLazyQueryHookResult = ReturnType<typeof useDiscountsLazyQuery>;
export type DiscountsSuspenseQueryHookResult = ReturnType<typeof useDiscountsSuspenseQuery>;
export type DiscountsQueryResult = Apollo.QueryResult<DiscountsQuery, DiscountsQueryVariables>;
export const GetUserImageUploadLinkDocument = gql`
    query GetUserImageUploadLink($input: GetUserImageUploadLinkInput!) {
  getUserImageUploadLink(input: $input) {
    fileName
    uploadUrl
    url
    type
  }
}
    `;

/**
 * __useGetUserImageUploadLinkQuery__
 *
 * To run a query within a React component, call `useGetUserImageUploadLinkQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserImageUploadLinkQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserImageUploadLinkQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetUserImageUploadLinkQuery(baseOptions: Apollo.QueryHookOptions<GetUserImageUploadLinkQuery, GetUserImageUploadLinkQueryVariables> & ({ variables: GetUserImageUploadLinkQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserImageUploadLinkQuery, GetUserImageUploadLinkQueryVariables>(GetUserImageUploadLinkDocument, options);
      }
export function useGetUserImageUploadLinkLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserImageUploadLinkQuery, GetUserImageUploadLinkQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserImageUploadLinkQuery, GetUserImageUploadLinkQueryVariables>(GetUserImageUploadLinkDocument, options);
        }
export function useGetUserImageUploadLinkSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetUserImageUploadLinkQuery, GetUserImageUploadLinkQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserImageUploadLinkQuery, GetUserImageUploadLinkQueryVariables>(GetUserImageUploadLinkDocument, options);
        }
export type GetUserImageUploadLinkQueryHookResult = ReturnType<typeof useGetUserImageUploadLinkQuery>;
export type GetUserImageUploadLinkLazyQueryHookResult = ReturnType<typeof useGetUserImageUploadLinkLazyQuery>;
export type GetUserImageUploadLinkSuspenseQueryHookResult = ReturnType<typeof useGetUserImageUploadLinkSuspenseQuery>;
export type GetUserImageUploadLinkQueryResult = Apollo.QueryResult<GetUserImageUploadLinkQuery, GetUserImageUploadLinkQueryVariables>;
export const GetOrganizationImageUploadLinkDocument = gql`
    query GetOrganizationImageUploadLink($input: GetOrganizationImageUploadLinkInput!) {
  getOrganizationImageUploadLink(input: $input) {
    fileName
    uploadUrl
    url
    type
  }
}
    `;

/**
 * __useGetOrganizationImageUploadLinkQuery__
 *
 * To run a query within a React component, call `useGetOrganizationImageUploadLinkQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrganizationImageUploadLinkQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrganizationImageUploadLinkQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetOrganizationImageUploadLinkQuery(baseOptions: Apollo.QueryHookOptions<GetOrganizationImageUploadLinkQuery, GetOrganizationImageUploadLinkQueryVariables> & ({ variables: GetOrganizationImageUploadLinkQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrganizationImageUploadLinkQuery, GetOrganizationImageUploadLinkQueryVariables>(GetOrganizationImageUploadLinkDocument, options);
      }
export function useGetOrganizationImageUploadLinkLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrganizationImageUploadLinkQuery, GetOrganizationImageUploadLinkQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrganizationImageUploadLinkQuery, GetOrganizationImageUploadLinkQueryVariables>(GetOrganizationImageUploadLinkDocument, options);
        }
export function useGetOrganizationImageUploadLinkSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetOrganizationImageUploadLinkQuery, GetOrganizationImageUploadLinkQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetOrganizationImageUploadLinkQuery, GetOrganizationImageUploadLinkQueryVariables>(GetOrganizationImageUploadLinkDocument, options);
        }
export type GetOrganizationImageUploadLinkQueryHookResult = ReturnType<typeof useGetOrganizationImageUploadLinkQuery>;
export type GetOrganizationImageUploadLinkLazyQueryHookResult = ReturnType<typeof useGetOrganizationImageUploadLinkLazyQuery>;
export type GetOrganizationImageUploadLinkSuspenseQueryHookResult = ReturnType<typeof useGetOrganizationImageUploadLinkSuspenseQuery>;
export type GetOrganizationImageUploadLinkQueryResult = Apollo.QueryResult<GetOrganizationImageUploadLinkQuery, GetOrganizationImageUploadLinkQueryVariables>;
export const GetTicketIdsByOrderDocument = gql`
    query GetTicketIdsByOrder($orderId: String!) {
  getTicketIdsByOrder(orderId: $orderId)
}
    `;

/**
 * __useGetTicketIdsByOrderQuery__
 *
 * To run a query within a React component, call `useGetTicketIdsByOrderQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTicketIdsByOrderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTicketIdsByOrderQuery({
 *   variables: {
 *      orderId: // value for 'orderId'
 *   },
 * });
 */
export function useGetTicketIdsByOrderQuery(baseOptions: Apollo.QueryHookOptions<GetTicketIdsByOrderQuery, GetTicketIdsByOrderQueryVariables> & ({ variables: GetTicketIdsByOrderQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTicketIdsByOrderQuery, GetTicketIdsByOrderQueryVariables>(GetTicketIdsByOrderDocument, options);
      }
export function useGetTicketIdsByOrderLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTicketIdsByOrderQuery, GetTicketIdsByOrderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTicketIdsByOrderQuery, GetTicketIdsByOrderQueryVariables>(GetTicketIdsByOrderDocument, options);
        }
export function useGetTicketIdsByOrderSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetTicketIdsByOrderQuery, GetTicketIdsByOrderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTicketIdsByOrderQuery, GetTicketIdsByOrderQueryVariables>(GetTicketIdsByOrderDocument, options);
        }
export type GetTicketIdsByOrderQueryHookResult = ReturnType<typeof useGetTicketIdsByOrderQuery>;
export type GetTicketIdsByOrderLazyQueryHookResult = ReturnType<typeof useGetTicketIdsByOrderLazyQuery>;
export type GetTicketIdsByOrderSuspenseQueryHookResult = ReturnType<typeof useGetTicketIdsByOrderSuspenseQuery>;
export type GetTicketIdsByOrderQueryResult = Apollo.QueryResult<GetTicketIdsByOrderQuery, GetTicketIdsByOrderQueryVariables>;
export const ReportStatusDocument = gql`
    query ReportStatus($input: ReportStatusInput!) {
  reportStatus(input: $input) {
    reportId
    status
    downloadUrl
  }
}
    `;

/**
 * __useReportStatusQuery__
 *
 * To run a query within a React component, call `useReportStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useReportStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReportStatusQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useReportStatusQuery(baseOptions: Apollo.QueryHookOptions<ReportStatusQuery, ReportStatusQueryVariables> & ({ variables: ReportStatusQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ReportStatusQuery, ReportStatusQueryVariables>(ReportStatusDocument, options);
      }
export function useReportStatusLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ReportStatusQuery, ReportStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ReportStatusQuery, ReportStatusQueryVariables>(ReportStatusDocument, options);
        }
export function useReportStatusSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ReportStatusQuery, ReportStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ReportStatusQuery, ReportStatusQueryVariables>(ReportStatusDocument, options);
        }
export type ReportStatusQueryHookResult = ReturnType<typeof useReportStatusQuery>;
export type ReportStatusLazyQueryHookResult = ReturnType<typeof useReportStatusLazyQuery>;
export type ReportStatusSuspenseQueryHookResult = ReturnType<typeof useReportStatusSuspenseQuery>;
export type ReportStatusQueryResult = Apollo.QueryResult<ReportStatusQuery, ReportStatusQueryVariables>;
export const GetOrdersDocument = gql`
    query GetOrders($eventId: ID!, $cursor: FindManyIDCursorInput, $q: String) {
  getOrders(input: {eventId: $eventId, take: 20, q: $q, cursor: $cursor}) {
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
    `;

/**
 * __useGetOrdersQuery__
 *
 * To run a query within a React component, call `useGetOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrdersQuery({
 *   variables: {
 *      eventId: // value for 'eventId'
 *      cursor: // value for 'cursor'
 *      q: // value for 'q'
 *   },
 * });
 */
export function useGetOrdersQuery(baseOptions: Apollo.QueryHookOptions<GetOrdersQuery, GetOrdersQueryVariables> & ({ variables: GetOrdersQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrdersQuery, GetOrdersQueryVariables>(GetOrdersDocument, options);
      }
export function useGetOrdersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrdersQuery, GetOrdersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrdersQuery, GetOrdersQueryVariables>(GetOrdersDocument, options);
        }
export function useGetOrdersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetOrdersQuery, GetOrdersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetOrdersQuery, GetOrdersQueryVariables>(GetOrdersDocument, options);
        }
export type GetOrdersQueryHookResult = ReturnType<typeof useGetOrdersQuery>;
export type GetOrdersLazyQueryHookResult = ReturnType<typeof useGetOrdersLazyQuery>;
export type GetOrdersSuspenseQueryHookResult = ReturnType<typeof useGetOrdersSuspenseQuery>;
export type GetOrdersQueryResult = Apollo.QueryResult<GetOrdersQuery, GetOrdersQueryVariables>;
export const EventOccurrencesDocument = gql`
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
    `;

/**
 * __useEventOccurrencesQuery__
 *
 * To run a query within a React component, call `useEventOccurrencesQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventOccurrencesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventOccurrencesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEventOccurrencesQuery(baseOptions: Apollo.QueryHookOptions<EventOccurrencesQuery, EventOccurrencesQueryVariables> & ({ variables: EventOccurrencesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EventOccurrencesQuery, EventOccurrencesQueryVariables>(EventOccurrencesDocument, options);
      }
export function useEventOccurrencesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EventOccurrencesQuery, EventOccurrencesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EventOccurrencesQuery, EventOccurrencesQueryVariables>(EventOccurrencesDocument, options);
        }
export function useEventOccurrencesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<EventOccurrencesQuery, EventOccurrencesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<EventOccurrencesQuery, EventOccurrencesQueryVariables>(EventOccurrencesDocument, options);
        }
export type EventOccurrencesQueryHookResult = ReturnType<typeof useEventOccurrencesQuery>;
export type EventOccurrencesLazyQueryHookResult = ReturnType<typeof useEventOccurrencesLazyQuery>;
export type EventOccurrencesSuspenseQueryHookResult = ReturnType<typeof useEventOccurrencesSuspenseQuery>;
export type EventOccurrencesQueryResult = Apollo.QueryResult<EventOccurrencesQuery, EventOccurrencesQueryVariables>;
export const EventByIdDocument = gql`
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

/**
 * __useEventByIdQuery__
 *
 * To run a query within a React component, call `useEventByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useEventByIdQuery(baseOptions: Apollo.QueryHookOptions<EventByIdQuery, EventByIdQueryVariables> & ({ variables: EventByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EventByIdQuery, EventByIdQueryVariables>(EventByIdDocument, options);
      }
export function useEventByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EventByIdQuery, EventByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EventByIdQuery, EventByIdQueryVariables>(EventByIdDocument, options);
        }
export function useEventByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<EventByIdQuery, EventByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<EventByIdQuery, EventByIdQueryVariables>(EventByIdDocument, options);
        }
export type EventByIdQueryHookResult = ReturnType<typeof useEventByIdQuery>;
export type EventByIdLazyQueryHookResult = ReturnType<typeof useEventByIdLazyQuery>;
export type EventByIdSuspenseQueryHookResult = ReturnType<typeof useEventByIdSuspenseQuery>;
export type EventByIdQueryResult = Apollo.QueryResult<EventByIdQuery, EventByIdQueryVariables>;
export const GetTicketTiersDocument = gql`
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

/**
 * __useGetTicketTiersQuery__
 *
 * To run a query within a React component, call `useGetTicketTiersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTicketTiersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTicketTiersQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useGetTicketTiersQuery(baseOptions: Apollo.QueryHookOptions<GetTicketTiersQuery, GetTicketTiersQueryVariables> & ({ variables: GetTicketTiersQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTicketTiersQuery, GetTicketTiersQueryVariables>(GetTicketTiersDocument, options);
      }
export function useGetTicketTiersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTicketTiersQuery, GetTicketTiersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTicketTiersQuery, GetTicketTiersQueryVariables>(GetTicketTiersDocument, options);
        }
export function useGetTicketTiersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetTicketTiersQuery, GetTicketTiersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTicketTiersQuery, GetTicketTiersQueryVariables>(GetTicketTiersDocument, options);
        }
export type GetTicketTiersQueryHookResult = ReturnType<typeof useGetTicketTiersQuery>;
export type GetTicketTiersLazyQueryHookResult = ReturnType<typeof useGetTicketTiersLazyQuery>;
export type GetTicketTiersSuspenseQueryHookResult = ReturnType<typeof useGetTicketTiersSuspenseQuery>;
export type GetTicketTiersQueryResult = Apollo.QueryResult<GetTicketTiersQuery, GetTicketTiersQueryVariables>;
export const EventStatusDocument = gql`
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

/**
 * __useEventStatusQuery__
 *
 * To run a query within a React component, call `useEventStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventStatusQuery({
 *   variables: {
 *      handle: // value for 'handle'
 *   },
 * });
 */
export function useEventStatusQuery(baseOptions: Apollo.QueryHookOptions<EventStatusQuery, EventStatusQueryVariables> & ({ variables: EventStatusQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EventStatusQuery, EventStatusQueryVariables>(EventStatusDocument, options);
      }
export function useEventStatusLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EventStatusQuery, EventStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EventStatusQuery, EventStatusQueryVariables>(EventStatusDocument, options);
        }
export function useEventStatusSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<EventStatusQuery, EventStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<EventStatusQuery, EventStatusQueryVariables>(EventStatusDocument, options);
        }
export type EventStatusQueryHookResult = ReturnType<typeof useEventStatusQuery>;
export type EventStatusLazyQueryHookResult = ReturnType<typeof useEventStatusLazyQuery>;
export type EventStatusSuspenseQueryHookResult = ReturnType<typeof useEventStatusSuspenseQuery>;
export type EventStatusQueryResult = Apollo.QueryResult<EventStatusQuery, EventStatusQueryVariables>;
export const CurrentUserDocument = gql`
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

/**
 * __useCurrentUserQuery__
 *
 * To run a query within a React component, call `useCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
      }
export function useCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
        }
export function useCurrentUserSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
        }
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export type CurrentUserLazyQueryHookResult = ReturnType<typeof useCurrentUserLazyQuery>;
export type CurrentUserSuspenseQueryHookResult = ReturnType<typeof useCurrentUserSuspenseQuery>;
export type CurrentUserQueryResult = Apollo.QueryResult<CurrentUserQuery, CurrentUserQueryVariables>;
export const OrganizationReportStatusDocument = gql`
    query OrganizationReportStatus($input: OrganizationReportStatusInput!) {
  organizationReportStatus(input: $input) {
    status
    reportId
    downloadUrl
  }
}
    `;

/**
 * __useOrganizationReportStatusQuery__
 *
 * To run a query within a React component, call `useOrganizationReportStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrganizationReportStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrganizationReportStatusQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useOrganizationReportStatusQuery(baseOptions: Apollo.QueryHookOptions<OrganizationReportStatusQuery, OrganizationReportStatusQueryVariables> & ({ variables: OrganizationReportStatusQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OrganizationReportStatusQuery, OrganizationReportStatusQueryVariables>(OrganizationReportStatusDocument, options);
      }
export function useOrganizationReportStatusLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OrganizationReportStatusQuery, OrganizationReportStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OrganizationReportStatusQuery, OrganizationReportStatusQueryVariables>(OrganizationReportStatusDocument, options);
        }
export function useOrganizationReportStatusSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<OrganizationReportStatusQuery, OrganizationReportStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<OrganizationReportStatusQuery, OrganizationReportStatusQueryVariables>(OrganizationReportStatusDocument, options);
        }
export type OrganizationReportStatusQueryHookResult = ReturnType<typeof useOrganizationReportStatusQuery>;
export type OrganizationReportStatusLazyQueryHookResult = ReturnType<typeof useOrganizationReportStatusLazyQuery>;
export type OrganizationReportStatusSuspenseQueryHookResult = ReturnType<typeof useOrganizationReportStatusSuspenseQuery>;
export type OrganizationReportStatusQueryResult = Apollo.QueryResult<OrganizationReportStatusQuery, OrganizationReportStatusQueryVariables>;
export const SendSignUpVerificationEmailDocument = gql`
    mutation SendSignUpVerificationEmail($data: SendSignUpVerificationEmailInput!) {
  sendSignUpVerificationEmail(data: $data)
}
    `;
export type SendSignUpVerificationEmailMutationFn = Apollo.MutationFunction<SendSignUpVerificationEmailMutation, SendSignUpVerificationEmailMutationVariables>;

/**
 * __useSendSignUpVerificationEmailMutation__
 *
 * To run a mutation, you first call `useSendSignUpVerificationEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendSignUpVerificationEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendSignUpVerificationEmailMutation, { data, loading, error }] = useSendSignUpVerificationEmailMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSendSignUpVerificationEmailMutation(baseOptions?: Apollo.MutationHookOptions<SendSignUpVerificationEmailMutation, SendSignUpVerificationEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendSignUpVerificationEmailMutation, SendSignUpVerificationEmailMutationVariables>(SendSignUpVerificationEmailDocument, options);
      }
export type SendSignUpVerificationEmailMutationHookResult = ReturnType<typeof useSendSignUpVerificationEmailMutation>;
export type SendSignUpVerificationEmailMutationResult = Apollo.MutationResult<SendSignUpVerificationEmailMutation>;
export type SendSignUpVerificationEmailMutationOptions = Apollo.BaseMutationOptions<SendSignUpVerificationEmailMutation, SendSignUpVerificationEmailMutationVariables>;