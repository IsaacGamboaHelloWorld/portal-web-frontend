import { GenericResponse } from '@app/core/interfaces/generic-response.interface';
import { Product } from '../../../core/models/products/product';

export interface StepLineTime {
  step: number;
}

export interface IPaymentTaxesFormOne {
  account_origin: Product;
  city: object;
  taxe: object;
  reference: number;
  amount: number;
}

export interface IPaymentTaxesFormTwo {
  goal: number;
}
export interface IDatePaymentTaxes {
  date: object;
}

export interface IPaymentTaxesFormThree {
  amount: number;
  recursive: number;
  period: string;
}

export interface INewPaymentTaxesModuleState {
  cities: ICities;
  taxes: ITaxes;
  reference: IReference;
  formOne: IPaymentTaxesFormOne;
  formTwo: IPaymentTaxesFormTwo;
  formThree: IPaymentTaxesFormThree;
  returnedInfo: IAnswerPaymentTaxes;
  step: StepLineTime;
  date: IDatePaymentTaxes;
  payment: IAnswerPaymentTaxes;
}

export interface ISendPaymentTaxes {
  id?: string;
  idType?: string;
  ipAddress?: string;
  accountId?: string;
  accountType?: string;
  cityId?: string;
  serviceCode?: string;
  optServiceCode?: string;
  nie?: string;
  invoiceNumber?: string;
  amount?: string;
  currencyCode?: string;
  references?: string[];
  serviceCompanyName?: string;
  originNickName?: string;
}

export interface IAnswerPaymentTaxes extends GenericResponse {
  approvalId: string;
}

export interface ICategoriesPaymentTaxes {
  categories: string[];
  success: boolean;
  errorMessage?: string;
  loading: boolean;
  loaded: boolean;
  error: boolean;
}

export const SAVE_TOKEN = 'Ahorro';

export interface IReference {
  success: boolean;
  errorMessage?: string;
  loading: boolean;
  loaded: boolean;
  error: boolean;
  approvalId: any;
  specificErrorMessage: any;
  amount: number;
  currencyCode: string;
  effectiveDate: any;
  expirationDate: any;
  dueDate: any;
}

export interface ITaxes {
  agreements: string[];
  success: boolean;
  errorMessage?: string;
  loading: boolean;
  loaded: boolean;
  error: boolean;
  approvalId: any;
  specificErrorMessage: any;
}

export interface ICities {
  cities: string[];
  success: boolean;
  errorMessage?: string;
  loading: boolean;
  loaded: boolean;
  error: boolean;
}
