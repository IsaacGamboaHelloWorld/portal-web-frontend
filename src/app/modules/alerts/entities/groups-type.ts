export interface IGroupsTypeAlertRequest {
  id?: string;
  idType?: string;
  alertGroupKey?: number;
}

export interface IGroupsTypeAlertResponse {
  success: boolean;
  statusCode: number;
  errorMessage: string;
  specificErrorMessage: string;
  data: object[];
}
