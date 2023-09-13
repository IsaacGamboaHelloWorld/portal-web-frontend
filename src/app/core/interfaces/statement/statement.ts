import { IAccountInfo } from './acountInfo';
import { IPeriodItem } from './period';

export interface IStatement {
  account: IAccountInfo;
  periods: IPeriodItem[];
  success: boolean;
  errorMesg?: string;
  errorMessage?: string;
  type: string;
}

export interface IStatementDs {
  account: IAccountInfo;
  periods: IPeriodItem[];
  type: string;
  errorMessage?: string;
  success: boolean;
  loading: boolean;
}
