export interface ITributaryGmf {
  fileUrl: string;
  base64: string;
  name: string;
}

export interface ITributaryRetention {
  fileUrl: string;
  base64: string;
  name: string;
}

export interface IincomeTaxTC {
  fileUrl: string;
  base64: string;
  name: string;
  documentResponse: Array<[]>;
  approvalId?: string;
  dateTime?: string;
  specificErrorMessage: string;
}
