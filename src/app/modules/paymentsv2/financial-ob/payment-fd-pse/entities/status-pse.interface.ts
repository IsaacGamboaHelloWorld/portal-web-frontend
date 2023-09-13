import { GenericResponse } from '@app/core/interfaces/generic-response.interface';
import { IBanksPse } from './banks-pse.interface';
export interface IPaymentPseStatusRequest {
  paymentId: string;
}

export interface IStatusPaymentData {
  currentCommerceCode: string;
  productType: string;
  productId: string;
  amount: number;
  bank: IBanksPse;
  paymentType: string;
  firstName: string;
  lastName: string;
  description: string;
  emailAddress: string;
  legalUserType: string;
  invoice: string;
  redirectUrl: string;
  status: string;
  statusCode: string; // 4 -> Aprobada | 2 -> Rechazada
}

export interface IPaymentPseStatusResponse extends GenericResponse {
  paymentData: IStatusPaymentData;
  approvalId: string;
}
