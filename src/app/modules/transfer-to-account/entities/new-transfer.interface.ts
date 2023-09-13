import { GenericResponse } from '@app/core/interfaces/generic-response.interface';
import { Product } from '@app/core/models/products/product';
import { IProductAffiliationElement } from './product-destination.interface';
export interface IStepNewTransfer {
  step: number;
}
export interface IResNewTransfer extends GenericResponse {
  approvalId?: number | string;
  response?: any;
  success: boolean;
  errorMessage?: string;
  specificErrorMessage?: string;
  errorMessageCode?: number;
  errorStatusCode?: string;
}
export interface NewTransfer {
  origin_transfer: string;
  account_origin: Product;
  account_destination: IProductAffiliationElement;
  notes: string;
  scheduledTransfer: boolean;
  dueDate: any;
  transactionCost: string;
  transferInformation: TransferInformation;
  companyId: string;
  accountFromInformation: AccountFromInformation;
  requestId: number;
  invoiceNumber: string;
  accountToInformation: AccountToInformation;
}

export interface TransferInformation {
  amount: string;
}

export interface AccountFromInformation {
  accountIdentifier: string;
  productType: string;
  nickName: string;
}

export interface AccountToInformation {
  bank: string;
  isNewAccount: boolean;
  name: string;
  identificationNumber: string;
  accountIdentifier: string;
  bankName: string;
  identificationType: string;
  productType: string;
  isFavorite: boolean;
  nickName: string;
}
export interface IScheduleTransferCreate {
  approvalId: string;
  errorMessage: string;
  specificErrorMessage: string;
  scheduleId: number;
  success: boolean;
  dateTime: string;
  errorStatusCode: string;
  request: object;
  response: object;
}
