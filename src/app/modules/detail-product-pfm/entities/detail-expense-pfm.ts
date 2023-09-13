import { GenericResponse } from '@app/core/interfaces/generic-response.interface';

export interface PfmExpensesResponse extends GenericResponse {
  data: PfmExpenseData;
}

export interface PfmExpenseData {
  products: PfmExpenseV2[];
}

export interface PfmExpenseV2 {
  accountNumber: string;
  idProduct: string;
  expenses: PfmSubExpense;
  incomes: PfmSubExpense;
}

export interface PfmSubExpense {
  total: number;
  previousTotal: number;
  categories: PfmCategory[];
}

export interface PfmCategory {
  code: string;
  name: string;
  value: number;
  color: string;
}

export interface PfmExpensesSelect extends PfmCategory {
  category: string;
  icon: string;
  idProduct?: string;
  idType?: string;
  month?: string;
  year?: string;
}
