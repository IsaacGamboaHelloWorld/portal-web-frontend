import { IAccountInfo } from '@app/core/interfaces/statement/acountInfo';

export interface IExtracts {
  fileUrl: string;
  base64: string;
  name: string;
  type: string;
  accountInformation: IAccountInfo;
  success: boolean;
  loading: boolean;
  loaded: boolean;
  errorMessage: string;
  specificErrorMessage: string;
}
