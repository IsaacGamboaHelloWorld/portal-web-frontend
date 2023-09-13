import { GenericResponse } from '@app/core/interfaces/generic-response.interface';
import { Product } from '@core/models/products/product';
import { IPublicService } from '../../entities/public-services';

export interface IPaymentBill {
  amount: string | number;
  primaryBillerAmount?: string | number;
  primaryBillerCurrencyCode?: string;
  secondaryBillerAmount?: string | number;
  secondaryBillerCurrencyCode?: string;
  biller: boolean;
  billerId: string;
  billerName: string;
  billerNickName: string;
  billerNickname?: string;
  contract: string;
  currencyCode: string;
  dueDate: string;
  expirationDate: string;
  invoice: string;
  isDonePayment: boolean;
  isScheduledPayment: boolean;
  originAccountId: string;
  originAccountType: string;
  originAccountBank: string;
  scheduledDate?: string;
  accountType?: string;
  accountId?: string;
  bank?: string;
  secondaryAmount?: string;
  secondaryCurrencyCode?: string;
}

export interface IServicePublicRequest {
  originAccountId: string;
  originAccountType: string;
  amount: string | number;
  biller: boolean;
  billerId: string;
  billerName: string;
  billerNickName: string;
  contract: string;
  invoice: string;
  dueDate: string;
  scheduledDate: string;
  expirationDate: string;
  isScheduledPayment: boolean;
  isDonePayment: boolean;
  primaryBillerAmount: string | number;
  primaryBillerCurrencyCode: string;
  reference: string;
  secondaryBillerAmount: string | number;
  secondaryBillerCurrencyCode: string;
  currencyCode: string;
  originAccountBank: string;
}

export interface IServicePublicResponse extends GenericResponse {
  date: string;
  approvalId: number;
  billerPayment: IPaymentBill;
}

export interface IPaymentFormOne {
  account_origin: Product;
  service_destination: IPublicService;
}

export interface IPaymentFormTwo {
  amount: string;
}

export interface ISuccessServicePayment {
  data: IServicePublicResponse;
  errorMessage?: string;
  loading: boolean;
  loaded: boolean;
  error: boolean;
  specificErrorCode?: string;
}

export interface IBillerDetailResponse {
  approvalId?: string;
  success?: boolean;
  errorMessage?: string;
  specificErrorMessage?: string;
  description?: string;
  date?: string;
  billerPayment: IPublicService;
}

export interface IBillerDetailRequest {
  billerId: string;
  contract: string;
}
