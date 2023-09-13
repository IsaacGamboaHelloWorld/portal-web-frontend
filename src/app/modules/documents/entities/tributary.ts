export interface TributaryState {
  tributary: ITributary;
  tributaryIncome: IincomeTax;
  tributaryIncomeTaxTC: IincomeTaxTC;
  tributaryRac: IincomeRac;
}

export interface ITributary {
  errorMessage: string;
  fileUrl: string;
  base64: string;
  name: string;
  success: boolean;
}

export interface IincomeTax {
  errorMessage: string;
  fileUrl: string;
  base64: string;
  name: string;
  success: boolean;
}
export interface IincomeTaxTC {
  errorMessage?: string;
  fileUrl?: string;
  base64?: string;
  name?: string;
  success?: boolean;
  documentResponse?: Array<[]>;
  approvalId?: string;
  dateTime?: string;
  specificErrorMessage?: string;
}

export interface IincomeRac {
  dateTime?: string;
  specificErrorMessage?: string;
  errorMessage?: string;
  base64?: string;
  name?: string;
  success?: boolean;
  approvalId?: string;
}

export interface IOptionAssets {
  ID: string;
  TEXT: string;
  STATUS: string;
  NAME_ADMIN: string;
}
