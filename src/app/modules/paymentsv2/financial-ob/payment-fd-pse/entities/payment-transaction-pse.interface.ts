import { GenericResponse } from '@app/core/interfaces/generic-response.interface';
import { TypePaymentPse } from '../constants/type-payment-pse.enum';
import { TypePerson } from '../constants/type-person.enum';
import { IBanksPse } from './banks-pse.interface';

export interface IPaymentPseRequest {
  paymentData: IPaymentData;
}

export interface IPaymentData {
  commerceCode: string; /// For this case #BANCO POPULAR ( LIBRE DESTINO, LEASING Y OTRAS CARTERAS CORPORATIVAS )
  productType: string;
  productId: string;
  amount: number;
  bank: IBanksPse;
  paymentType: TypePaymentPse; /// 1 -> Pago CPV | 2 -> Pago Normal | 3 -> Pago de Obligación | 4 -> Pago de impuesto
  firstName: string;
  lastName: string;
  description: string;
  emailAddress: string;
  legalUserType: TypePerson; /// 1 -> Persona Natural  | 2 -> Persona Juridica
  invoice: string;
  redirectSuccessUrl: string;
}

export interface IPaymentPseResponse extends GenericResponse {
  token: string;
  paymentId: string;
  pseUrlRedirect: string;
  approvalId: string;
}
