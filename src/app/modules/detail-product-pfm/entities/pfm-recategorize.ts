import { GenericResponse } from '@app/core/interfaces';

export interface PfmRecategorizeResponse extends GenericResponse {
  success: boolean;
}

export interface PfmRecategorizeRequest {
  transactions: PfmTransactionMoviments[];
  idCategory: string;
}

export interface PfmTransactionMoviments {
  id: string;
}
