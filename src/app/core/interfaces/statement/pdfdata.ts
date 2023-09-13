import { IAccountInfo } from './acountInfo';

export interface IPdfdata {
  account: IAccountInfo;
  data: string;
  base64: string;
  name: string;
  type: string;
  accountInformation?: IAccountInfo;
  success?: boolean;
  loading?: boolean;
  loaded?: boolean;
  errorMessage?: string;
  specificErrorMessage?: string;
}
