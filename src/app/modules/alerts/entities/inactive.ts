export interface IInactiveAlertRequest {
  id?: string;
  idType?: string;
  alertsId?: string[];
  companyId?: string;
  ipAddress?: string;
}

export interface IInactiveAlertResponse {
  success: string;
  statusCode: string;
  errorMessage: string;
  specificErrorMessage: string;
}
