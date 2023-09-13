import { Product } from '../../../../core/models/products/product';

export interface IMovePocketResp {
  success: boolean;
  errorMessage?: null;
  specificErrorMessage?: null;
  approvalId?: string;
  request?: object;
  rqUid?: string;
}

export interface IPocketFormOne {
  account_origin: Product;
  name: string;
  type: string;
}

export interface IMoveMoneyPocketModuleState {
  categories: ICategoriesPocket;
  formOne: IPocketFormOne;
  returnedInfo: IAnswerPocket;
}

export interface ISendMovePocket {
  parentAccountId: string;
  parentAccountType: string;
  pocketName: string;
  pocketPeriod: string;
  savingAmount: number;
  periodicAmount: number;
  openingAmount: number;
  category: string;
}

export interface IAnswerPocket {
  success: boolean;
  errorMessage?: string;
  loading: boolean;
  loaded: boolean;
  error: boolean;
  request?: object;
  rqUid?: string;
}

export interface ICategoriesPocket {
  categories: string[];
  success: boolean;
  errorMessage?: string;
  loading: boolean;
  loaded: boolean;
  error: boolean;
}

export const SAVE_TOKEN = 'Ahorro';
