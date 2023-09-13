import { GenericResponse } from '@app/core/interfaces/generic-response.interface';

export interface PfmItemsResponse extends GenericResponse {
  data: PfmItemCategoryData;
}

export interface PfmItemCategoryData {
  categories: PfmItemCategory[];
}

export interface PfmItemCategory {
  code: string;
  name: string;
  color: string;
}

export interface PfmItemsRequest {
  type: TypeItemPfm;
}

export interface ITypeItemPfm {
  C: string; // Incomes
  D: string; // Expenses
}

export type TypeItemPfm = keyof ITypeItemPfm;
