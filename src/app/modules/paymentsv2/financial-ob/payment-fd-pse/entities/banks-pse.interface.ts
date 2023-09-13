import { GenericResponse } from '@app/core/interfaces/generic-response.interface';

export interface BanksPseResponse extends GenericResponse {
  banks: IBanksPse[];
  approvalId: string;
}

export interface IBanksPse {
  bankName: string;
  bankId: string;
}
