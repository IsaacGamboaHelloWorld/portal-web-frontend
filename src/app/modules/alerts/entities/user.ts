export interface IUserAlertRequest {
  id?: string;
  idType?: string;
}

export interface IUserAlertResponse {
  success: boolean;
  statusCode: number;
  errorMessage: string;
  specificErrorMessage: string;
  data: object[];
  loaded?: boolean;
  loading?: boolean;
}

export interface IUserAlert {
  alertId: string;
  alertKey: string;
  alertName: string;
  alertGroupKey: string;
  alertGroupName: object[];
  alertsAdmType?: string;
  daysBefore?: string;
  accountInformation?: IAccountInfo;
  frequencies?: object[];
  alertStatus?: string;
  destinations?: object[];
}
export interface IAccountInfo {
  accountId: string;
  accountType: string;
  accountName: string;
  bankInfo: object;
}
