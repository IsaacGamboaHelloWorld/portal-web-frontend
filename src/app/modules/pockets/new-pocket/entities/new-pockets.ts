import { Product } from '../../../../core/models/products/product';

export interface IPocketFormOne {
  account_origin: Product;
  name: string;
  type: string;
}

export interface IPocketFormTwo {
  goal: number;
}

export interface IPocketFormThree {
  amount: number;
  recursive: number;
  period: string;
}

export interface INewPocketModuleState {
  categories: ICategoriesPocket;
  formOne: IPocketFormOne;
  formTwo: IPocketFormTwo;
  formThree: IPocketFormThree;
  returnedInfo: IAnswerPocket;
}

export interface ISendPocket {
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
