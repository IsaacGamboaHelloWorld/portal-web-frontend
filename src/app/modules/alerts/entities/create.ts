export interface ICreateAlertRequest {
  id?: string;
  idType?: string;
  ipAddress?: string;
  companyId?: string;
  alert?: IAlertCreate[];
}

export interface IAlertCreate {
  daysBefore: string;
  key: string;
  groupKey: string;
  companyId: string;
  type: string;
  detail: object[];
}

export interface ICreateAlertResponse {
  success: string;
  statusCode: string;
  errorMessage: string;
  specificErrorMessage: string;
  data: object[];
}
