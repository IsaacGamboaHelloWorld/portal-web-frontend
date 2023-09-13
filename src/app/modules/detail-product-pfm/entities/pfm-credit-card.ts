import { GenericResponse } from '@app/core/interfaces';

export interface IPfmCreditCardProduct {
  availableQuota: number;
  date: string;
  franchise: string;
  totalDebt: number;
  minimumPayment: number;
  billingDay: string;
  idProduct: string;
  rank: string;
  totalQuota: number;
  accountNumber: string;
  type: string;
  totalQuotaAdvance: number;
}

export interface IPfmCreditCardData {
  lastUpdate: string;
  products: IPfmCreditCardProduct[];
}

export interface PfmCreditCardResponse extends GenericResponse {
  data: IPfmCreditCardData;
}
