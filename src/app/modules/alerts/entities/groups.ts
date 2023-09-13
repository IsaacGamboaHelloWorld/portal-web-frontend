export interface IGroupsAlertRequest {
  id?: string;
  idType?: string;
}

export interface IGroupsAlertResponse {
  success: boolean;
  statusCode: number;
  errorMessage: string;
  specificErrorMessage: string;
  data: object[];
}
