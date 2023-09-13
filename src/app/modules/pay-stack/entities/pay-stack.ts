import { GenericResponse } from '@app/core/interfaces/generic-response.interface';
import { Product } from '@app/core/models/products/product';
import { IBillerDetailResponse } from '@app/modules/paymentsv2/public-services/payment/entities/new-payment';

export interface StepLineTime {
  step: number;
}

export interface IPayStackFormOne {
  account_origin?: Product;
  payroll?: object;
  type_payment?: object;
  number_payroll?: number;
  month?: string;
  period?: string;
  amount?: number;
  invoiceNumber?: string;
}

export interface IDatePayStack {
  date: Date;
}

export interface IAnswerPayRoll extends GenericResponse {
  approvalId?: string;
  agreements?: IAgreements[];
}

export interface IAgreements {
  organizationIdType: string;
  organizationId: string;
  entityName: string;
  industryCode: string;
  image: string;
  phoneType: string;
  phone: string;
  category: string;
  address: string;
  cityId: string;
  city: string;
  partialPayment: boolean;
  active: boolean;
  onlinePayment: string;
  svcId: string;
  noBillerMainReference: string;
  bankName: string;
  bankCode: string;
}

export interface IAnswerInformation {
  approvalId?: string;
  errorMessage?: string;
  specificErrorMessage?: string;
  invoiceNumber?: string;
  nie?: string;
  amount?: string;
  success?: boolean;
  loading?: boolean;
}

export interface ISendInformation {
  requestId?: string;
  ipAddress?: string;
  id?: string;
  idType?: string;
  pilaInformation: object;
}

export interface IAnswerPayStack extends GenericResponse {
  approvalId?: string;
  date?: string;
  billerPayment?: IBillerPayment;
}

export interface ISendPayStack {
  id?: string;
  idType?: string;
  companyId?: string;
  ipAddress?: string;
  billerPayment?: object;
}

export interface IBillerPayment {
  originAccountId?: string;
  originAccountType?: string;
  originAccountBank?: string;
  amount?: number;
  currencyCode?: string;
  primaryBillerAmount?: string;
  primaryBillerCurrencyCode?: string;
  secondaryBillerAmount?: string;
  secondaryBillerCurrencyCode?: string;
  billerId?: string;
  billerName?: string;
  billerNickName?: string;
  contract?: string;
  invoice?: string;
  dueDate?: string;
  scheduledDate?: string;
  expirationDate?: string;
  isScheduledPayment?: boolean;
  isDonePayment?: boolean;
}

export interface IPayStackModuleState {
  formOne: IPayStackFormOne;
  step: StepLineTime;
  payment: PilaPaymentResponse;
  date: IDatePayStack;
  information: IAnswerInformation;
  billerInfo: IBillerDetailResponse;
  payroll: IAnswerPayRoll;
}

export interface PilaPaymentRequest {
  originAccount: AccountData;
  payment: PilaPaymentInformation;
  currentSystemDate?: number;
}

export interface AccountData {
  accountId: string;
  accountType: string;
  nickName: string;
}

export interface PilaPaymentInformation {
  billerId: string;
  billerName: string;
  nie: string;
  invoice: string;
  amount: number;
}

export interface PilaPaymentResponse extends GenericResponse {
  approvalId: string;
  additionalErrorCode: string;
  additionalErrorMessage: string;
}
