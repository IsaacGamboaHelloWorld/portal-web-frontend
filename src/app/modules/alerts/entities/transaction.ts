export interface ITransactionAlertRequest {
  id?: string;
  idType?: string;
}

export interface ITransactionAlertResponse {
  success: string;
  statusCode: string;
  errorMessage: string;
  specificErrorMessage: string;
  data: object[];
}
