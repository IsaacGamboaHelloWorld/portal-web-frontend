import { GenericResponse } from '@app/core/interfaces/generic-response.interface';

export interface ICertificateAccountRequest {
  accountId: string;
  accountType: string;
  includeBalance: boolean;
  recipient: string;
}

export interface IIncomeTaxTCResponse extends GenericResponse {
  documentResponse: IDocumentTaxTCResponse[];
}

export interface IDocumentTaxTCResponse {
  dateStored: string;
  name: string;
  documentTypeId: string;
  documentId: string;
  type: string;
  keyword: IKeyboardTaxTC[];
  trnImage: ITrnImage[];
  latestRevision: string;
}

export interface IKeyboardTaxTC {
  condition: any;
  name: string;
  value: string;
  operator: any;
}

export interface ITrnImage {
  documentType: string;
  binData: string;
}

export interface IIncomeTaxesResponse {
  errorMessage: string;
  fileUrl: string;
  base64: string;
  name: string;
  success: boolean;
}
