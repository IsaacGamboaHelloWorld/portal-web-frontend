import { GenericResponse } from '@app/core/interfaces';

export interface PfmMovimentRequest {
  month: string;
  year: string;
  idProduct: string;
  idCategory: string;
  total?: number;
  name?: string;
}

export interface PfmMovimentsResponse extends GenericResponse {
  data: PfmMovementData;
}

export interface PfmMovementData {
  type: string;
  movements: PfmMoviment[];
}

export interface PfmMoviment {
  id: string;
  date: string;
  value: number;
  description: string;
}
