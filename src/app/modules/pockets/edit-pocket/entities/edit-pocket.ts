export interface IEditPocketRequest {
  category: string;
  parentAccountId: string;
  parentAccountType: string;
  periodicAmount: number;
  pocketId: string;
  pocketName: string;
  pocketPeriod: string;
  pocketType: string;
  savingAmount: number;
}

export interface IDeletePocketRequest {
  pocketId: string;
  pocketType: string;
  parentAccountId: string;
  parentAccountType: string;
}

export interface IEditPocketResponse {
  success: boolean;
  errorMessage?: string;
}

export interface IDeletePocketResponse {
  success: boolean;
  errorMessage?: string;
  request?: object;
  rqUid?: string;
}

export interface IEditPocketModuleState {
  categories: ICategoriesEPocket;
  formOne: IPocketEFormOne;
}

export interface ICategoriesEPocket {
  categories: string[];
  success: boolean;
  errorMessage?: string;
  loading: boolean;
  loaded: boolean;
  error: boolean;
}

export interface IPocketEFormOne {
  name: string;
  type: string;
  goal: number;
  amount: number;
  recursive: number;
  period: string;
}
