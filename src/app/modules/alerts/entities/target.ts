export interface ITargetAlertRequest {
  id?: string;
  idType?: string;
}

export interface ITargetAlertResponse {
  success: boolean;
  statusCode: number;
  errorMessage: string;
  specificErrorMessage: string;
  data: object[];
}
