import { GenericResponse } from 'app/core/interfaces/generic-response.interface';

export interface PfmProductResponse extends GenericResponse {
  data: PfmProductData;
}

export interface PfmProductData {
  products: PfmProduct[];
  savings: PfmSaving;
}

export interface PfmProduct {
  accountNumber: string;
  idProduct: string;
  type: string;
  incomes: number;
  expenses: number;
  balance: number;
  previousBalance: number;
  overdraft: number;
  totalIncomes: number;
}

export interface PfmSaving {
  beforeSavings: number;
  currentSavings: number;
}
