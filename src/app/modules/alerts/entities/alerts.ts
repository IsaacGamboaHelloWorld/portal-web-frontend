import { Product } from '../../../core/models/products/product';

export const A_TC = '17';
export const A_SP = '18';
export const A_CC = '20';
export interface ISearchUserAlertsRequest {
  id: string;
  idType: string;
}

export interface ISearchUserAlertsResponse {
  success: boolean;
  alerts: IAlert[];
  errorMessage: string;
}

export interface IAlertObj {
  alert: IAlert;
  target: ITarget;
  status: IStatus;
  product: Product;
}

export interface IAlert {
  id: string;
  key: string;
  name: string;
  group: string;
  groupName: string;
  daysBefore: string;
}

export interface IStatus {
  code: string;
  description: string;
}

export interface ITarget {
  id: string;
  key: string;
  nick: string;
  value: string;
}

export interface ICreateUserAlertRequest {
  id?: string;
  idType?: string;
  alert: IAlertDetail;
}

export interface IAlertDetail {
  daysBefore: string;
  key?: string;
  groupKey: string;
  type: string;
  detail: [
    {
      product: object;
      targets: string[];
    },
  ];
}

export interface ICreateUserAlertResponse {
  success: string;
}

export interface ISection {
  title: string;
  alerts: IAlert[];
}

// -- Objects in reducers
export interface IAlertsReducer {
  data: IAlert[];
  loading: boolean;
  loaded: boolean;
  error: boolean;
  errorMessage: string;
}

export interface IAlertFormOne {
  type_prod: string;
}

export interface IAlertFormTwo {
  select_product: IFinancialOpAlerts | IPublicServiceAlerts;
}

export interface IAlertFormThree {
  type_alert: string;
  target_user: string;
}

export interface IFinancialOpAlerts {
  accountId: string;
  accountType: string;
  bank: string;
  loanName: string;
  bankName: string;
  newLoan: boolean;
}

export interface IPublicServiceAlerts {
  amount: string | number;
  primaryBillerAmount?: string | number;
  primaryBillerCurrencyCode?: string;
  secondaryBillerAmount?: string | number;
  secondaryBillerCurrencyCode?: string;
  biller: boolean;
  billerId: string;
  billerName: string;
  billerNickname?: string;
  billerNickName?: string;
  contract: string;
  currencyCode: string;
  dueDate: string;
  expirationDate: string;
  invoice: string;
  isDonePayment: boolean;
  isScheduledPayment: boolean;
  originAccountId: string;
  originAccountType: string;
  scheduledDate?: string;
  accountType?: string;
  accountId?: string;
  bank?: string;
  secondaryAmount?: string;
  secondaryCurrencyCode?: string;
  debtWithMainBiller?: string;
  paymentType?: string;
  maxAmount?: string;
  daysBeforeAfterExpiration?: string;
  reference?: string;
  isBiller?: boolean;
}

export interface IinfoUser {
  email: string;
  phoneNumber: string;
  errorMessage: string;
  success: boolean;
  request?: object;
  dateTime?: string;
  loading?: boolean;
}

export interface StepLineTime {
  step: number;
}
